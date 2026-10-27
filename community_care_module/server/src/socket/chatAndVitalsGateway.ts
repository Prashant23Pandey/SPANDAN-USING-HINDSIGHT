import { Server as SocketIOServer, Socket } from 'socket.io';
import { ChannelMessagePayload, PatientVitals } from '../types';

export function setupChatAndVitalsGateway(io: SocketIOServer): void {
  const chatNamespace = io.of('/gateway');

  chatNamespace.on('connection', (socket: Socket) => {
    const userId = socket.handshake.query.userId as string;
    const userRole = socket.handshake.query.role as string;

    if (userId) {
      socket.join(`user_${userId}`);
    }

    console.log(`[Gateway] Connected: User ${userId} (${userRole}) [Socket ID: ${socket.id}]`);

    // ------------------------------------------------------------------------
    // 1. CHANNEL SUBSCRIPTION (Peer Forums, Expert Q&A, Care Team Channels)
    // ------------------------------------------------------------------------
    socket.on('channel:join', ({ channelId }: { channelId: string }) => {
      socket.join(`channel_${channelId}`);
      console.log(`[Channel] User ${userId} joined channel_${channelId}`);
    });

    socket.on('channel:leave', ({ channelId }: { channelId: string }) => {
      socket.leave(`channel_${channelId}`);
    });

    // ------------------------------------------------------------------------
    // 2. E2EE CHAT & VOICE NOTE MESSAGE DISPATCH
    // ------------------------------------------------------------------------
    socket.on('message:send', async (data: ChannelMessagePayload) => {
      const messageWithMeta: ChannelMessagePayload = {
        ...data,
        id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString()
      };

      // Regional Translation Trigger Hook (e.g. Bhashini / IndicTrans / Cloud Translate API)
      if (data.messageType === 'text' && data.originalLanguage) {
        messageWithMeta.translations = await mockRegionalTranslate(
          data.encryptedPayload,
          data.originalLanguage
        );
      }

      // Broadcast to all channel subscribers
      chatNamespace.to(`channel_${data.channelId}`).emit('message:received', messageWithMeta);

      // Acknowledge sender
      socket.emit('message:sent_ack', {
        tempId: data.id,
        persistedId: messageWithMeta.id,
        timestamp: messageWithMeta.createdAt
      });
    });

    // ------------------------------------------------------------------------
    // 3. REAL-TIME BLE VITALS TELEMETRY STREAM
    // Streams BLE blood pressure, fetal doppler heart rate, SpO2 into
    // the clinician's tele-consultation side drawer in real-time
    // ------------------------------------------------------------------------
    socket.on('vitals:stream_ble_packet', (vitals: PatientVitals) => {
      // Validate vitals safety thresholds
      const isAbnormal = checkAbnormalVitals(vitals);
      const enrichedVitals: PatientVitals = {
        ...vitals,
        isAbnormalAlert: isAbnormal,
        recordedAt: new Date().toISOString()
      };

      // Broadcast telemetry to the active tele-consult session or care team drawer
      if (vitals.sessionId) {
        chatNamespace.to(`consult_vitals_${vitals.sessionId}`).emit('vitals:telemetry_update', enrichedVitals);
      } else {
        chatNamespace.to(`mother_vitals_${vitals.motherId}`).emit('vitals:telemetry_update', enrichedVitals);
      }

      // If critical abnormal readings detected (e.g., Fetal Heart Rate < 110 or BP > 140/90)
      if (isAbnormal) {
        chatNamespace.to(`mother_vitals_${vitals.motherId}`).emit('vitals:critical_alert', {
          motherId: vitals.motherId,
          vitals: enrichedVitals,
          alertText: 'WARNING: Maternal Blood Pressure or FHR outside safe range.'
        });
      }

      // Asynchronously push vitals telemetry update to Hindsight AI memory
      pushVitalsToHindsightService(enrichedVitals).catch((err: Error) => {
        // Non-blocking fire-and-forget: never disrupts real-time WebSocket flow
        console.warn('[Hindsight Gateway Bridge] Notice:', err.message);
      });
    });

    // Clinician subscribing to patient's active vitals stream
    socket.on('vitals:subscribe_mother_drawer', ({ motherId }: { motherId: string }) => {
      socket.join(`mother_vitals_${motherId}`);
    });

    socket.on('disconnect', () => {
      console.log(`[Gateway] Disconnected: User ${userId}`);
    });
  });
}

/**
 * Clinical Threshold Evaluator for Maternal Vitals
 */
function checkAbnormalVitals(v: PatientVitals): boolean {
  if (v.systolicBp && v.systolicBp >= 140) return true; // Gestational Hypertension
  if (v.diastolicBp && v.diastolicBp >= 90) return true;
  if (v.fetalHeartRateBpm && (v.fetalHeartRateBpm < 110 || v.fetalHeartRateBpm > 160)) return true; // Fetal distress
  if (v.spo2Percentage && v.spo2Percentage < 94) return true; // Hypoxemia
  return false;
}

/**
 * Mock Regional Translation Engine for Indian Languages (Hindi, Bengali, Telugu, Tamil, Kannada)
 */
async function mockRegionalTranslate(text: string, srcLang: string): Promise<Record<string, string>> {
  return {
    en: 'Medical review advised based on symptoms.',
    hi: 'लक्षणों के आधार पर चिकित्सकीय सलाह आवश्यक है।',
    bn: 'উপসর্গের ভিত্তিতে চিকিৎসকের পরামর্শ প্রয়োজন।',
    te: 'లక్షణాల ఆధారంగా వైద్యుని సంప్రదింపు అవసరం.',
    ta: 'அறிகுறிகளின் அடிப்படையில் மருத்துவ ஆலோசனை தேவை.'
  };
}

/**
 * Asynchronously pushes patient vitals & telemetry context to Hindsight AI memory service.
 * Dispatches non-blocking HTTP POST without delaying WebSocket threads.
 */
async function pushVitalsToHindsightService(v: PatientVitals): Promise<void> {
  try {
    const rawMotherId = v.motherId || '1';
    const numId = parseInt(rawMotherId.replace(/\D/g, ''), 10) || 1;
    const readingSummary = `MHR: ${v.maternalHeartRateBpm || 'N/A'} bpm, FHR: ${v.fetalHeartRateBpm || 'N/A'} bpm, BP: ${v.systolicBp || 'N/A'}/${v.diastolicBp || 'N/A'}, SpO2: ${v.spo2Percentage || 'N/A'}%`;

    const payload = {
      patient_id: numId,
      alert_type: 'ble_telemetry_vitals',
      severity: v.isAbnormalAlert ? 'warning' : 'info',
      reading_value: readingSummary,
      description: v.isAbnormalAlert
        ? `Abnormal maternal/fetal vitals threshold flagged during live telemetry streaming. ${readingSummary}`
        : `Routine BLE telemetry vitals stream recorded. ${readingSummary}`,
      metadata: {
        mother_id: v.motherId,
        session_id: v.sessionId,
        temp_c: v.bodyTempCelsius,
        fetal_hr: v.fetalHeartRateBpm,
        maternal_hr: v.maternalHeartRateBpm,
        systolic_bp: v.systolicBp,
        diastolic_bp: v.diastolicBp,
        spo2: v.spo2Percentage,
        is_abnormal: v.isAbnormalAlert,
        source: 'community_care_ble_gateway',
        timestamp: v.recordedAt || new Date().toISOString()
      }
    };

    const endpoint = process.env.HINDSIGHT_SERVICE_URL || 'http://localhost/SPANDAN/api/hindsight_service.php?action=log_sensor_alert';

    if (typeof fetch === 'function') {
      await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } else {
      const http = require('http');
      const url = new URL(endpoint);
      const postData = JSON.stringify(payload);
      const req = http.request({
        hostname: url.hostname,
        port: url.port || 80,
        path: url.pathname + url.search,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        }
      });
      req.on('error', () => {});
      req.write(postData);
      req.end();
    }
  } catch (err) {
    // Non-blocking fire-and-forget
  }
}
