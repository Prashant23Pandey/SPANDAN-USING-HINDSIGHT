/**
 * ============================================================================
 * BELLYBAND — PRIMARY CLINICAL DASHBOARD VIEW (/dashboard/clinical)
 * File: view-clinical.js
 *
 * Features:
 * - Doctor's daily appointment queue & patient calendar
 * - Live BLE Wearable Vitals Telemetry Drawer (Maternal HR, FHR, BP with alert, SpO2, Temp, Waveform ticker)
 * - Interactive Tele-Consultation Video Hub simulation (camera/mic toggles, live stream, notes)
 * - e-Prescription Builder with instant drug dosage generator & printable prescription preview
 * ============================================================================
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.ClinicalDashboardView = factory();
  }
})(typeof window !== 'undefined' ? window : this, function () {
  'use strict';

  let appointments = [
    { id: 'APT-1', patient: 'Meera Patel', regNo: 'REG-4421', week: 'W34', time: '09:30 AM', type: 'High Risk Review', status: 'Urgent', bp: '148/94 mmHg', alert: true },
    { id: 'APT-2', patient: 'Ananya Sharma', regNo: 'REG-3108', week: 'W28', time: '10:15 AM', type: 'Routine ANC Scan', status: 'Waiting', bp: '118/76 mmHg', alert: false },
    { id: 'APT-3', patient: 'Radha Iyer', regNo: 'REG-5520', week: 'W20', time: '11:00 AM', type: 'Tele-Consultation', status: 'Remote', bp: '122/80 mmHg', alert: false },
    { id: 'APT-4', patient: 'Sunita Verma', regNo: 'REG-2219', week: 'W38', time: '11:45 AM', type: 'Pre-Labor Assessment', status: 'Confirmed', bp: '130/84 mmHg', alert: false },
  ];

  let currentVitals = {
    patientName: 'Meera Patel (Week 34)',
    maternalHR: 94,
    fetalHR: 138,
    bpSys: 148,
    bpDia: 94,
    spO2: 98,
    temp: '37.2°C',
    uterineActivity: 'Low (12 mmHg)',
    hasAlert: true
  };

  let vitalsInterval = null;
  let inCall = false;

  function render(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <!-- View Header -->
      <div class="view-header-row">
        <div class="view-heading-group">
          <div class="view-eyebrow" style="color:var(--c-doctor);">🩺 Clinical Practitioner Workspace</div>
          <h1 class="view-main-title">Doctor's Clinical Console</h1>
          <p class="view-description">High-risk obstetric triage, continuous BLE band bio-signals, tele-consultation hub, and digital prescription issuance.</p>
        </div>
        <div class="view-actions-group">
          <a href="../../dashboard/ai_memory_insights.php" class="btn-core btn-secondary" style="border-color:rgba(6,182,212,0.4); color:#06B6D4; text-decoration:none; display:inline-flex; align-items:center; gap:6px;">🧠 Hindsight AI Insights</a>
          <button class="btn-core btn-secondary" id="btnOpenEHRDrawer">📂 Open Full EHR</button>
          <button class="btn-core btn-primary-role" style="--role-color:var(--c-doctor);" id="btnLaunchTeleconsult">📹 Start Tele-Consult</button>
        </div>
      </div>

      <!-- KPI Grid -->
      <div class="kpi-cards-grid">
        <div class="kpi-stat-card">
          <div class="kpi-card-glow-edge" style="background:linear-gradient(90deg, transparent, var(--c-doctor), transparent);"></div>
          <div class="kpi-top-row">
            <div class="kpi-icon-pill" style="--role-color:var(--c-doctor); --role-bg:var(--c-doctor-bg);">📅</div>
            <span class="kpi-trend-pill kpi-trend-up">Next: 09:30 AM</span>
          </div>
          <div class="kpi-stat-value">4</div>
          <div class="kpi-stat-label">Appointments Remaining Today</div>
        </div>

        <div class="kpi-stat-card">
          <div class="kpi-card-glow-edge" style="background:linear-gradient(90deg, transparent, var(--c-doctor), transparent);"></div>
          <div class="kpi-top-row">
            <div class="kpi-icon-pill" style="--role-color:var(--c-doctor); --role-bg:var(--c-doctor-bg);">💓</div>
            <span class="kpi-trend-pill kpi-trend-crit">1 Active Alert</span>
          </div>
          <div class="kpi-stat-value" style="color:#F87171;">148/94</div>
          <div class="kpi-stat-label">Hypertension Spike Flagged</div>
        </div>

        <div class="kpi-stat-card">
          <div class="kpi-card-glow-edge" style="background:linear-gradient(90deg, transparent, var(--c-doctor), transparent);"></div>
          <div class="kpi-top-row">
            <div class="kpi-icon-pill" style="--role-color:var(--c-doctor); --role-bg:var(--c-doctor-bg);">📹</div>
            <span class="kpi-trend-pill kpi-trend-up">HD WebRTC</span>
          </div>
          <div class="kpi-stat-value">2</div>
          <div class="kpi-stat-label">Scheduled Tele-Consults</div>
        </div>

        <div class="kpi-stat-card">
          <div class="kpi-card-glow-edge" style="background:linear-gradient(90deg, transparent, var(--c-doctor), transparent);"></div>
          <div class="kpi-top-row">
            <div class="kpi-icon-pill" style="--role-color:var(--c-doctor); --role-bg:var(--c-doctor-bg);">💊</div>
            <span class="kpi-trend-pill kpi-trend-up">Signed & Dispatched</span>
          </div>
          <div class="kpi-stat-value">18</div>
          <div class="kpi-stat-label">e-Prescriptions Issued (Week)</div>
        </div>
      </div>

      <!-- Main Layout Grid -->
      <div class="dashboard-grid-layout">
        <!-- Daily Appointment Queue -->
        <div class="col-span-7 dashboard-panel">
          <div class="panel-header-bar">
            <div class="panel-title-group">
              <span class="panel-main-title">📅 Today's Patient Queue & Calendar</span>
            </div>
            <span class="panel-badge">Apollo Maternity Hub</span>
          </div>
          <div class="panel-content-body no-padding">
            <div class="data-table-wrapper">
              <table class="custom-data-table" id="appointmentsTable">
                <thead>
                  <tr>
                    <th>Patient Name</th>
                    <th>Week</th>
                    <th>Slot</th>
                    <th>Category</th>
                    <th>Vitals Status</th>
                    <th style="text-align:right;">Actions</th>
                  </tr>
                </thead>
                <tbody id="appointmentsTableBody">
                  <!-- Rendered dynamically -->
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Live BLE Wearable Vitals Telemetry Drawer -->
        <div class="col-span-5 dashboard-panel">
          <div class="panel-header-bar">
            <div class="panel-title-group">
              <span class="panel-main-title">💓 Live BLE Vitals Stream</span>
            </div>
            <span class="status-pill active" id="liveVitalsPill">● STREAMING 50Hz</span>
          </div>
          <div class="panel-content-body">
            <div style="font-size:12.5px; font-weight:700; color:var(--text-secondary); margin-bottom:12px; display:flex; justify-content:space-between;">
              <span id="vitalsPatientName">${currentVitals.patientName}</span>
              <span style="color:#F87171; font-weight:800;">⚠️ STAGE 1 HTN</span>
            </div>

            <!-- Vitals Grid -->
            <div class="vitals-meter-grid">
              <div class="vitals-box" id="boxMHR">
                <div class="vitals-title">Maternal HR</div>
                <div class="vitals-val" id="valMHR">${currentVitals.maternalHR} <span style="font-size:11px;">BPM</span></div>
              </div>
              <div class="vitals-box" id="boxFHR">
                <div class="vitals-title">Fetal HR (FHR)</div>
                <div class="vitals-val" style="color:#06B6D4;" id="valFHR">${currentVitals.fetalHR} <span style="font-size:11px;">BPM</span></div>
              </div>
              <div class="vitals-box alert" id="boxBP">
                <div class="vitals-title">Blood Pressure</div>
                <div class="vitals-val" id="valBP">${currentVitals.bpSys}/${currentVitals.bpDia}</div>
              </div>
              <div class="vitals-box" id="boxSpO2">
                <div class="vitals-title">SpO₂ Level</div>
                <div class="vitals-val" id="valSpO2">${currentVitals.spO2}%</div>
              </div>
            </div>

            <!-- Waveform Canvas -->
            <div class="waveform-canvas-box">
              <canvas id="fetalHeartWaveCanvas" width="400" height="80" style="width:100%; height:100%;"></canvas>
            </div>

            <div style="margin-top:14px; display:flex; gap:10px;">
              <button class="btn-core btn-secondary btn-sm" style="flex:1;" id="btnCalibrateBLE">📡 Re-sync BLE Band</button>
              <button class="btn-core btn-danger btn-sm" style="flex:1;" id="btnTriggerClinicalAlert">🚨 Log HTN Note</button>
            </div>
          </div>
        </div>

        <!-- Tele-Consultation Video Hub -->
        <div class="col-span-6 dashboard-panel">
          <div class="panel-header-bar">
            <div class="panel-title-group">
              <span class="panel-main-title">📹 Tele-Consultation Video Hub</span>
            </div>
            <span class="status-pill active" id="teleconsultStatusBadge">WebRTC Ready</span>
          </div>
          <div class="panel-content-body">
            <div class="teleconsult-room-box" id="videoRoomBox">
              <div class="video-sim-overlay" id="videoSimOverlay">
                <div style="font-size:42px; margin-bottom:8px;">👩‍⚕️ ⇄ 🤰</div>
                <div style="font-weight:700; font-size:15px;">Encrypted HD Video Hub</div>
                <div style="font-size:12px; opacity:0.8;">Click "Start Consultation" to initiate WebRTC session with Meera Patel</div>
              </div>
              <div class="video-controls-bar">
                <button class="action-icon-btn" id="btnToggleCam" title="Toggle Camera">📷</button>
                <button class="action-icon-btn" id="btnToggleMic" title="Toggle Microphone">🎙️</button>
                <button class="action-icon-btn" id="btnToggleScreen" title="Share Screen">🖥️</button>
                <button class="btn-core btn-danger btn-sm" id="btnEndCall" style="display:none;">End Call</button>
              </div>
            </div>
            <div style="margin-top:14px; display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:12px; color:var(--text-muted);">End-to-End Encrypted Tele-Health Session</span>
              <button class="btn-core btn-primary-role btn-sm" style="--role-color:var(--c-doctor);" id="btnStartCallInline">Start Consultation</button>
            </div>
          </div>
        </div>

        <!-- e-Prescription Generator -->
        <div class="col-span-6 dashboard-panel">
          <div class="panel-header-bar">
            <div class="panel-title-group">
              <span class="panel-main-title">💊 e-Prescription Builder</span>
            </div>
            <span class="panel-badge">MCI Digital Signature Ready</span>
          </div>
          <div class="panel-content-body">
            <form id="rxBuilderForm">
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                <div class="form-input-group">
                  <label class="form-input-label">Patient</label>
                  <select id="rxPatientSelect" class="form-control-select">
                    <option value="Meera Patel">Meera Patel (Week 34 — High Risk)</option>
                    <option value="Ananya Sharma">Ananya Sharma (Week 28)</option>
                    <option value="Radha Iyer">Radha Iyer (Week 20)</option>
                  </select>
                </div>
                <div class="form-input-group">
                  <label class="form-input-label">Diagnosis / Indication</label>
                  <input type="text" id="rxDiagnosis" class="form-control-input" value="Gestational Hypertension & Mild Edema" />
                </div>
              </div>

              <div style="display:grid; grid-template-columns:2fr 1fr 1fr; gap:12px;">
                <div class="form-input-group">
                  <label class="form-input-label">Medication & Form</label>
                  <select id="rxDrugSelect" class="form-control-select">
                    <option value="Labetalol 100mg Tab">Labetalol 100mg (Antihypertensive)</option>
                    <option value="Ferrous Ascorbate 100mg + Folic Acid">Ferrous Ascorbate + Folic Acid</option>
                    <option value="Calcium Carbonate 500mg + Vit D3">Calcium Carbonate 500mg + D3</option>
                    <option value="Dydrogesterone 10mg">Dydrogesterone 10mg (Luteal Support)</option>
                  </select>
                </div>
                <div class="form-input-group">
                  <label class="form-input-label">Frequency</label>
                  <select id="rxFrequency" class="form-control-select">
                    <option value="1-0-1 (Twice Daily After Food)">1-0-1 (Twice Daily)</option>
                    <option value="1-0-0 (Morning After Food)">1-0-0 (Morning)</option>
                    <option value="0-0-1 (Night After Food)">0-0-1 (Night)</option>
                    <option value="SOS (As needed)">SOS (As Needed)</option>
                  </select>
                </div>
                <div class="form-input-group">
                  <label class="form-input-label">Duration</label>
                  <input type="text" id="rxDuration" class="form-control-input" value="14 Days" />
                </div>
              </div>

              <div class="form-input-group">
                <label class="form-input-label">Special Clinical Instructions & Dietary Precautions</label>
                <input type="text" id="rxInstructions" class="form-control-input" value="Monitor BP twice daily with BellyBand wearable. Low sodium diet. Return immediately if headache occurs." />
              </div>

              <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:10px;">
                <button type="button" class="btn-core btn-secondary btn-sm" id="btnPreviewRx">👁️ Preview e-Rx</button>
                <button type="submit" class="btn-core btn-primary-role" style="--role-color:var(--c-doctor);">✍️ Sign & Issue Prescription</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;

    renderAppointmentsTable();
    startWaveformSimulation();
    attachEvents();
  }

  function renderAppointmentsTable() {
    const tbody = document.getElementById('appointmentsTableBody');
    if (!tbody) return;

    tbody.innerHTML = appointments.map(apt => `
      <tr>
        <td>
          <div style="font-weight:700; color:var(--text-primary);">${apt.patient}</div>
          <div style="font-size:11.5px; color:var(--text-muted);">${apt.regNo}</div>
        </td>
        <td><span class="status-pill active" style="font-size:11px;">${apt.week}</span></td>
        <td><strong style="font-family:var(--font-mono); font-size:12.5px;">${apt.time}</strong></td>
        <td>${apt.type}</td>
        <td>
          ${apt.alert
            ? `<span class="status-pill critical" style="font-size:11px;">⚠️ ${apt.bp}</span>`
            : `<span class="status-pill active" style="font-size:11px;">✓ ${apt.bp}</span>`
          }
        </td>
        <td style="text-align:right;">
          <button class="btn-core btn-secondary btn-sm" onclick="ClinicalDashboardView.selectPatient('${apt.patient}')">Load Vitals</button>
        </td>
      </tr>
    `).join('');
  }

  function startWaveformSimulation() {
    const canvas = document.getElementById('fetalHeartWaveCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let x = 0;

    ctx.fillStyle = 'rgba(10, 15, 29, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (vitalsInterval) clearInterval(vitalsInterval);

    vitalsInterval = setInterval(() => {
      // Draw simulated ECG / FHR waveform
      ctx.fillStyle = 'rgba(10, 15, 29, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#06B6D4';
      ctx.lineWidth = 1.8;
      ctx.beginPath();

      const centerY = canvas.height / 2;
      for (let i = 0; i < canvas.width; i += 2) {
        const time = Date.now() * 0.005 + i * 0.05;
        const pulse = Math.sin(time) * 12 + (Math.random() - 0.5) * 4;
        const spike = Math.sin(time * 0.5) > 0.85 ? -25 : 0;
        const y = centerY + pulse + spike;
        if (i === 0) ctx.moveTo(i, y);
        else ctx.lineTo(i, y);
      }
      ctx.stroke();

      // Minor live fluctuations
      const hrFluctuation = Math.floor(Math.random() * 3) - 1;
      const elMHR = document.getElementById('valMHR');
      if (elMHR) elMHR.innerHTML = `${currentVitals.maternalHR + hrFluctuation} <span style="font-size:11px;">BPM</span>`;
    }, 200);
  }

  function attachEvents() {
    const startCallBtn = document.getElementById('btnStartCallInline');
    const endCallBtn = document.getElementById('btnEndCall');
    const simOverlay = document.getElementById('videoSimOverlay');
    const statusBadge = document.getElementById('teleconsultStatusBadge');

    if (startCallBtn) {
      startCallBtn.addEventListener('click', () => {
        inCall = true;
        simOverlay.innerHTML = `
          <div style="width:100%; height:100%; background:linear-gradient(135deg, #0F172A, #1E293B); display:flex; align-items:center; justify-content:space-around; padding:20px;">
            <div style="text-align:center;">
              <div style="font-size:54px;">🤰</div>
              <div style="font-weight:700; color:#38BDF8; font-size:15px; margin-top:8px;">Meera Patel (Week 34)</div>
              <span class="status-pill active" style="margin-top:6px;">● Live Connected (1080p)</span>
            </div>
            <div style="border-left:1px solid var(--border-glass); padding-left:20px; text-align:left;">
              <div style="font-size:12px; color:var(--text-muted);">LIVE VITALS OVERLAY</div>
              <div style="font-size:14px; font-weight:700; color:#F87171; margin-top:4px;">BP: 148/94 mmHg</div>
              <div style="font-size:14px; font-weight:700; color:#06B6D4;">FHR: 138 BPM</div>
            </div>
          </div>
        `;
        startCallBtn.style.display = 'none';
        endCallBtn.style.display = 'inline-flex';
        statusBadge.className = 'status-pill active';
        statusBadge.textContent = '● IN CALL (00:01)';
        if (window.BellyBandLayout) {
          window.BellyBandLayout.showToast('📹 WebRTC Tele-consultation session connected with Meera Patel.');
        }
      });
    }

    if (endCallBtn) {
      endCallBtn.addEventListener('click', () => {
        inCall = false;
        simOverlay.innerHTML = `
          <div style="font-size:42px; margin-bottom:8px;">👩‍⚕️ ⇄ 🤰</div>
          <div style="font-weight:700; font-size:15px;">Encrypted HD Video Hub</div>
          <div style="font-size:12px; opacity:0.8;">Call ended. Summary auto-saved to EHR.</div>
        `;
        startCallBtn.style.display = 'inline-flex';
        endCallBtn.style.display = 'none';
        statusBadge.className = 'status-pill offline';
        statusBadge.textContent = 'Call Finished';
      });
    }

    const rxForm = document.getElementById('rxBuilderForm');
    if (rxForm) {
      rxForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const patient = document.getElementById('rxPatientSelect').value;
        const drug = document.getElementById('rxDrugSelect').value;
        const freq = document.getElementById('rxFrequency').value;
        const duration = document.getElementById('rxDuration').value;

        if (window.BellyBandLayout) {
          window.BellyBandLayout.showModal({
            title: '💊 Digital Prescription Issued',
            body: `
              <div style="padding:16px; background:#fff; color:#0F172A; border-radius:var(--radius-md); font-family:var(--font-body);">
                <div style="display:flex; justify-content:space-between; border-bottom:2px solid #0F172A; padding-bottom:8px; margin-bottom:12px;">
                  <div>
                    <h3 style="margin:0; font-size:16px;">APOLLO MATERNITY CLINIC</h3>
                    <div style="font-size:11px; color:#64748B;">Dr. Priya Mehta, MD (OB-GYN) • MCI #88491</div>
                  </div>
                  <div style="text-align:right; font-size:11px;">
                    <div>Date: ${new Date().toLocaleDateString()}</div>
                    <div>Digital Ref: RX-${Date.now().toString().slice(-6)}</div>
                  </div>
                </div>
                <div style="margin-bottom:12px; font-size:12.5px;">
                  <strong>Patient:</strong> ${patient} | <strong>Diagnosis:</strong> Gestational HTN
                </div>
                <div style="background:#F1F5F9; padding:10px; border-radius:6px; margin-bottom:12px;">
                  <div style="font-weight:700; font-size:13.5px; color:#0284C7;">Rx: ${drug}</div>
                  <div style="font-size:12px; margin-top:2px;">Dosage: ${freq} for ${duration}</div>
                </div>
                <div style="font-size:11px; color:#475569;">
                  🔒 Digitally signed via BellyBand Cryptographic Health Vault.
                </div>
              </div>
            `,
            confirmText: 'Print & Send to Patient App',
            onConfirm: () => {
              window.BellyBandLayout.showToast(`✅ Prescription for ${patient} dispatched to patient mobile app.`);
              return true;
            }
          });
        }
      });
    }

    const previewRxBtn = document.getElementById('btnPreviewRx');
    if (previewRxBtn) {
      previewRxBtn.addEventListener('click', () => {
        rxForm.dispatchEvent(new Event('submit'));
      });
    }

    const alertBtn = document.getElementById('btnTriggerClinicalAlert');
    if (alertBtn) {
      alertBtn.addEventListener('click', () => {
        if (window.BellyBandLayout) {
          window.BellyBandLayout.showToast('🚨 Hypertension note added to Meera Patel EHR. SMS alert sent to family.');
        }
      });
    }
  }

  function selectPatient(name) {
    currentVitals.patientName = `${name}`;
    const nameEl = document.getElementById('vitalsPatientName');
    if (nameEl) nameEl.textContent = currentVitals.patientName;
    if (window.BellyBandLayout) {
      window.BellyBandLayout.showToast(`📡 Live BLE stream switched to ${name}.`);
    }
  }

  return {
    render,
    selectPatient
  };
});
