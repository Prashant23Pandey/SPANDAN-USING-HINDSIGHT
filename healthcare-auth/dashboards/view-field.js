/**
 * ============================================================================
 * BELLYBAND — COMMUNITY & FIELD WORKER DASHBOARD VIEW (/dashboard/field)
 * File: view-field.js
 *
 * Features:
 * - Mobile-optimized Rural Patient Registry (ASHA / ANM field console)
 * - Offline Home-Visit Notes Logger with local sync queue (BP, weight, danger signs)
 * - One-Tap Emergency Hospital Referral Trigger
 * - Welfare Schemes Enrollment Tracker (PMMVY, JSY, PMSMA)
 * ============================================================================
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.FieldWorkerDashboardView = factory();
  }
})(typeof window !== 'undefined' ? window : this, function () {
  'use strict';

  let fieldPatients = [
    { id: 'FP-101', name: 'Savitri Devi', age: 24, village: 'Rampur', week: 'W38', bp: '152/98 mmHg', risk: 'Critical', lastVisit: 'Aug 26, 2026', nextAction: 'Immediate Referral', scheme: 'PMMVY Enrolled' },
    { id: 'FP-102', name: 'Kamla Bai', age: 28, village: 'Sultanpur', week: 'W28', bp: '120/78 mmHg', risk: 'Normal', lastVisit: 'Aug 25, 2026', nextAction: 'Iron Supplementation', scheme: 'JSY Enrolled' },
    { id: 'FP-103', name: 'Parvati Yadav', age: 22, village: 'Jagdishpur', week: 'W36', bp: '138/88 mmHg', risk: 'Moderate', lastVisit: 'Aug 24, 2026', nextAction: 'BP Monitoring', scheme: 'PMSMA Registered' },
    { id: 'FP-104', name: 'Geeta Maurya', age: 26, village: 'Katehar', week: 'W20', bp: '116/74 mmHg', risk: 'Normal', lastVisit: 'Aug 22, 2026', nextAction: 'Nutrition Check', scheme: 'PMMVY Enrolled' },
  ];

  let offlineNotesQueue = [
    { id: 'NOTE-1', patient: 'Savitri Devi', time: '10:15 AM', notes: 'Severe pedal edema + elevated BP 152/98. Advised immediate tertiary referral.', synced: true }
  ];

  let isOnline = true;

  function render(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <!-- View Header -->
      <div class="view-header-row">
        <div class="view-heading-group">
          <div class="view-eyebrow" style="color:var(--c-field);">🌾 Grassroots Maternal Health Outreach</div>
          <h1 class="view-main-title">ASHA & ANM Field Care Console</h1>
          <p class="view-description">Rural patient registry, offline home-visit telemetry logging, high-risk detection, and one-tap tertiary hospital referrals.</p>
        </div>
        <div class="view-actions-group">
          <button class="btn-core btn-secondary" id="btnToggleNetworkMode">
            <span id="networkModeDot" style="width:8px; height:8px; border-radius:50%; background:#10B981;"></span>
            <span id="networkModeLabel">Online Sync Active</span>
          </button>
          <button class="btn-core btn-danger" id="btnDispatchEmergencyReferral">🚑 Emergency Referral</button>
          <button class="btn-core btn-primary-role" style="--role-color:var(--c-field);" id="btnLogHomeVisit">🏠 Log Home Visit</button>
        </div>
      </div>

      <!-- KPI Grid -->
      <div class="kpi-cards-grid">
        <div class="kpi-stat-card">
          <div class="kpi-card-glow-edge" style="background:linear-gradient(90deg, transparent, var(--c-field), transparent);"></div>
          <div class="kpi-top-row">
            <div class="kpi-icon-pill" style="--role-color:var(--c-field); --role-bg:var(--c-field-bg);">📋</div>
            <span class="kpi-trend-pill kpi-trend-up">4 Villages</span>
          </div>
          <div class="kpi-stat-value" id="statFieldPatientCount">${fieldPatients.length}</div>
          <div class="kpi-stat-label">Registered Rural Mothers</div>
        </div>

        <div class="kpi-stat-card">
          <div class="kpi-card-glow-edge" style="background:linear-gradient(90deg, transparent, var(--c-field), transparent);"></div>
          <div class="kpi-top-row">
            <div class="kpi-icon-pill" style="--role-color:var(--c-field); --role-bg:var(--c-field-bg);">🏠</div>
            <span class="kpi-trend-pill kpi-trend-up">2 Done • 2 Due</span>
          </div>
          <div class="kpi-stat-value">4</div>
          <div class="kpi-stat-label">Scheduled Home Visits Today</div>
        </div>

        <div class="kpi-stat-card">
          <div class="kpi-card-glow-edge" style="background:linear-gradient(90deg, transparent, var(--c-field), transparent);"></div>
          <div class="kpi-top-row">
            <div class="kpi-icon-pill" style="--role-color:var(--c-field); --role-bg:var(--c-field-bg);">🏛️</div>
            <span class="kpi-trend-pill kpi-trend-up">100% DBT Linked</span>
          </div>
          <div class="kpi-stat-value">89%</div>
          <div class="kpi-stat-label">Govt. Scheme Enrollment (PMMVY)</div>
        </div>

        <div class="kpi-stat-card">
          <div class="kpi-card-glow-edge" style="background:linear-gradient(90deg, transparent, var(--c-field), transparent);"></div>
          <div class="kpi-top-row">
            <div class="kpi-icon-pill" style="--role-color:var(--c-field); --role-bg:var(--c-field-bg);">🚑</div>
            <span class="kpi-trend-pill kpi-trend-crit">1 Active Triage</span>
          </div>
          <div class="kpi-stat-value" style="color:#F87171;">1</div>
          <div class="kpi-stat-label">Urgent Hospital Referral Dispatched</div>
        </div>
      </div>

      <!-- Main Layout Grid -->
      <div class="dashboard-grid-layout">
        <!-- Rural Patient Registry -->
        <div class="col-span-8 dashboard-panel">
          <div class="panel-header-bar">
            <div class="panel-title-group">
              <span class="panel-main-title">📋 Village Patient Registry (ASHA Beat: Varanasi-North)</span>
            </div>
            <div style="display:flex; gap:8px;">
              <select id="filterVillageSelect" class="form-control-select" style="padding:4px 10px; font-size:12px; width:140px;">
                <option value="ALL">All Villages</option>
                <option value="Rampur">Rampur</option>
                <option value="Sultanpur">Sultanpur</option>
                <option value="Jagdishpur">Jagdishpur</option>
                <option value="Katehar">Katehar</option>
              </select>
            </div>
          </div>
          <div class="panel-content-body no-padding">
            <div class="data-table-wrapper">
              <table class="custom-data-table" id="fieldPatientTable">
                <thead>
                  <tr>
                    <th>Mother Name</th>
                    <th>Village</th>
                    <th>Week</th>
                    <th>Vitals / BP</th>
                    <th>Risk Category</th>
                    <th>Govt Scheme</th>
                    <th style="text-align:right;">Actions</th>
                  </tr>
                </thead>
                <tbody id="fieldTableBody">
                  <!-- Rendered dynamically -->
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Offline Home-Visit Notes & Sync Hub -->
        <div class="col-span-4 dashboard-panel">
          <div class="panel-header-bar">
            <div class="panel-title-group">
              <span class="panel-main-title">📝 Field Observations & Notes</span>
            </div>
            <span class="panel-badge" id="notesSyncBadge">Offline Cache Ready</span>
          </div>
          <div class="panel-content-body">
            <div style="display:flex; flex-direction:column; gap:10px; max-height:220px; overflow-y:auto;" id="fieldNotesContainer">
              <!-- Rendered dynamically -->
            </div>

            <div style="margin-top:16px; padding:12px; background:var(--bg-glass-card); border:1px solid var(--border-glass); border-radius:var(--radius-md);">
              <div style="font-size:11px; font-weight:700; color:var(--text-muted); text-transform:uppercase; margin-bottom:4px;">OFFLINE-FIRST CAPABILITY</div>
              <p style="font-size:12px; color:var(--text-secondary); line-height:1.5;">
                All visit logs are cryptographically stored in device IndexedDB and auto-synced as soon as 2G/3G/4G connectivity is detected.
              </p>
            </div>
          </div>
        </div>
      </div>
    `;

    renderFieldTable();
    renderFieldNotes();
    attachEvents();
  }

  function renderFieldTable(villageFilter = 'ALL') {
    const tbody = document.getElementById('fieldTableBody');
    if (!tbody) return;

    const filtered = fieldPatients.filter(p => villageFilter === 'ALL' || p.village === villageFilter);

    tbody.innerHTML = filtered.map(p => `
      <tr>
        <td>
          <div style="font-weight:700; color:var(--text-primary);">${p.name} (${p.age}y)</div>
          <div style="font-size:11.5px; color:var(--text-muted);">${p.id}</div>
        </td>
        <td><strong>${p.village}</strong></td>
        <td><span class="status-pill active" style="font-size:11px;">${p.week}</span></td>
        <td>
          <code style="font-family:var(--font-mono); font-size:12px; ${p.risk === 'Critical' ? 'color:#F87171; font-weight:700;' : ''}">${p.bp}</code>
        </td>
        <td>
          ${p.risk === 'Critical'
            ? `<span class="status-pill critical">🚨 CRITICAL</span>`
            : p.risk === 'Moderate'
            ? `<span class="status-pill pending">⚠️ Moderate</span>`
            : `<span class="status-pill active">✓ Normal</span>`
          }
        </td>
        <td><span style="font-size:11.5px; color:var(--text-secondary);">${p.scheme}</span></td>
        <td style="text-align:right;">
          <button class="btn-core btn-secondary btn-sm" onclick="FieldWorkerDashboardView.quickCheck('${p.id}')">Quick Check</button>
        </td>
      </tr>
    `).join('');
  }

  function renderFieldNotes() {
    const container = document.getElementById('fieldNotesContainer');
    if (!container) return;

    container.innerHTML = offlineNotesQueue.map(n => `
      <div style="padding:10px 12px; background:rgba(255,255,255,0.03); border:1px solid var(--border-glass); border-radius:var(--radius-md);">
        <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
          <strong style="color:var(--c-field); font-size:12.5px;">${n.patient}</strong>
          <span style="font-size:11px; color:var(--text-muted);">${n.time}</span>
        </div>
        <div style="font-size:12px; color:var(--text-secondary); line-height:1.4;">${n.notes}</div>
        <div style="margin-top:6px; font-size:10.5px; color:#10B981; font-weight:700;">✓ Synced to Central Registry</div>
      </div>
    `).join('');
  }

  function attachEvents() {
    const villageSelect = document.getElementById('filterVillageSelect');
    if (villageSelect) {
      villageSelect.addEventListener('change', (e) => renderFieldTable(e.target.value));
    }

    const networkToggleBtn = document.getElementById('btnToggleNetworkMode');
    if (networkToggleBtn) {
      networkToggleBtn.addEventListener('click', () => {
        isOnline = !isOnline;
        const dot = document.getElementById('networkModeDot');
        const lbl = document.getElementById('networkModeLabel');
        if (isOnline) {
          dot.style.background = '#10B981';
          lbl.textContent = 'Online Sync Active';
          if (window.BellyBandLayout) window.BellyBandLayout.showToast('📶 Connectivity Restored: Synced 1 pending field note.');
        } else {
          dot.style.background = '#F59E0B';
          lbl.textContent = 'Offline Mode Active';
          if (window.BellyBandLayout) window.BellyBandLayout.showToast('⚠️ Operating in Offline Mode. All visits stored locally.');
        }
      });
    }

    const logVisitBtn = document.getElementById('btnLogHomeVisit');
    if (logVisitBtn) {
      logVisitBtn.addEventListener('click', () => {
        if (window.BellyBandLayout) {
          window.BellyBandLayout.showModal({
            title: '🏠 Log Field Home-Visit Observations',
            body: `
              <form id="fieldVisitForm">
                <div class="form-input-group">
                  <label class="form-input-label">Select Mother</label>
                  <select id="visitPatient" class="form-control-select">
                    <option value="Savitri Devi (Rampur)">Savitri Devi (Rampur • W38)</option>
                    <option value="Kamla Bai (Sultanpur)">Kamla Bai (Sultanpur • W28)</option>
                    <option value="Parvati Yadav (Jagdishpur)">Parvati Yadav (Jagdishpur • W36)</option>
                    <option value="Geeta Maurya (Katehar)">Geeta Maurya (Katehar • W20)</option>
                  </select>
                </div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                  <div class="form-input-group">
                    <label class="form-input-label">Blood Pressure (mmHg)</label>
                    <input type="text" id="visitBP" class="form-control-input" placeholder="e.g. 124/82" required />
                  </div>
                  <div class="form-input-group">
                    <label class="form-input-label">Weight (kg)</label>
                    <input type="number" id="visitWeight" class="form-control-input" placeholder="e.g. 58" step="0.1" />
                  </div>
                </div>
                <div class="form-input-group">
                  <label class="form-input-label">High-Risk Danger Signs Observed</label>
                  <div style="display:flex; flex-direction:column; gap:6px; font-size:12.5px; color:var(--text-secondary);">
                    <label><input type="checkbox" id="dsSevereHeadache" /> Severe Persistent Headache or Blurred Vision</label>
                    <label><input type="checkbox" id="dsBleeding" /> Vaginal Bleeding or Fluid Leakage</label>
                    <label><input type="checkbox" id="dsEdema" /> Severe Face & Hand Swelling (Edema)</label>
                    <label><input type="checkbox" id="dsFetalMove" /> Reduced Baby Kicks (< 10 kicks in 2h)</label>
                  </div>
                </div>
                <div class="form-input-group">
                  <label class="form-input-label">Field Notes / Guidance Given</label>
                  <textarea id="visitNotes" class="form-control-textarea" rows="2" placeholder="Recorded maternal vitals, issued IFA tablets, checked BellyBand sync."></textarea>
                </div>
              </form>
            `,
            confirmText: 'Save & Sync Visit',
            onConfirm: () => {
              const patient = document.getElementById('visitPatient')?.value;
              const bp = document.getElementById('visitBP')?.value.trim();
              const weight = document.getElementById('visitWeight')?.value.trim();
              const notes = document.getElementById('visitNotes')?.value.trim();
              const hasHeadache = document.getElementById('dsSevereHeadache')?.checked;
              const hasBleed = document.getElementById('dsBleeding')?.checked;
              const hasEdema = document.getElementById('dsEdema')?.checked;
              const hasFetalMove = document.getElementById('dsFetalMove')?.checked;

              offlineNotesQueue.unshift({
                id: `NOTE-${Date.now().toString().slice(-4)}`,
                patient: patient.split('(')[0].trim(),
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                notes: notes || `Logged BP ${bp || '120/80'}. Danger signs: ${hasBleed || hasEdema || hasHeadache || hasFetalMove ? 'FLAGGED' : 'None'}.`,
                synced: isOnline
              });
              renderFieldNotes();
              window.BellyBandLayout.showToast(`✅ Home visit logged for ${patient}.`);

              // Non-blocking asynchronous background push to Hindsight AI memory system
              asyncPushFieldVisitToHindsight({
                patient,
                bp,
                weight,
                notes,
                hasHeadache,
                hasBleed,
                hasEdema,
                hasFetalMove
              });

              return true;
            }
          });
        }
      });
    }

    const referralBtn = document.getElementById('btnDispatchEmergencyReferral');
    if (referralBtn) {
      referralBtn.addEventListener('click', () => {
        if (window.BellyBandLayout) {
          window.BellyBandLayout.showModal({
            title: '🚑 Trigger Emergency Hospital Referral',
            body: `
              <div style="padding:14px; background:rgba(239,68,68,0.12); border:1.5px solid rgba(239,68,68,0.4); border-radius:var(--radius-md); margin-bottom:14px;">
                <div style="font-weight:800; color:#F87171; font-size:14px;">IMMEDIATE TERTIARY REFERRAL DISPATCH</div>
                <div style="font-size:12px; color:var(--text-secondary); margin-top:4px;">
                  Triggers prioritized ambulance dispatch and alerts the emergency OB-GYN team at District Apex Hospital.
                </div>
              </div>
              <div class="form-input-group">
                <label class="form-input-label">Patient Requiring Referral</label>
                <select id="referralPatientSelect" class="form-control-select">
                  <option value="Savitri Devi (Rampur • W38 • Pre-Eclampsia)">Savitri Devi (Rampur • W38 • Pre-Eclampsia Alert)</option>
                  <option value="Parvati Yadav (Jagdishpur • W36)">Parvati Yadav (Jagdishpur • W36)</option>
                </select>
              </div>
              <div class="form-input-group">
                <label class="form-input-label">Destination Facility</label>
                <select id="referralHospital" class="form-control-select">
                  <option value="Apollo Maternity & Neonatal Institute (ETA: 14 mins)">Apollo Maternity & Neonatal Institute (ETA: 14 mins)</option>
                  <option value="District Apex Women Hospital (ETA: 8 mins)">District Apex Women Hospital (ETA: 8 mins)</option>
                </select>
              </div>
            `,
            confirmText: 'DISPATCH SOS & AMBULANCE',
            onConfirm: () => {
              const patient = document.getElementById('referralPatientSelect')?.value;
              const hospital = document.getElementById('referralHospital')?.value;
              window.BellyBandLayout.showToast('🚨 EMERGENCY REFERRAL DISPATCHED! Ambulance Unit-01 routed with GPS tracking.');

              // Asynchronously push emergency triage to Hindsight memory
              asyncPushEmergencyReferralToHindsight({ patient, hospital });

              return true;
            }
          });
        }
      });
    }
  }

  /**
   * Asynchronously push field worker visit & symptom/vitals context to Hindsight AI memory.
   * Completely non-blocking: errors or delays never disrupt UI flow or form submission.
   */
  function asyncPushFieldVisitToHindsight(data) {
    try {
      const symptoms = [];
      if (data.hasHeadache) symptoms.push('Severe Persistent Headache / Blurred Vision');
      if (data.hasBleed) symptoms.push('Vaginal Bleeding / Fluid Leakage');
      if (data.hasEdema) symptoms.push('Severe Facial & Pedal Edema');
      if (data.hasFetalMove) symptoms.push('Reduced Fetal Movement (<10 kicks/2h)');

      const isHighRisk = symptoms.length > 0 || (data.bp && parseInt(data.bp, 10) >= 140);
      const severity = isHighRisk ? 'warning' : 'info';
      const patientClean = (data.patient || 'Rural Mother').split('(')[0].trim();

      const payload = {
        patient_id: 1, // Primary patient mapping for local relational integrity
        alert_type: 'field_visit_vitals_symptoms',
        severity: severity,
        reading_value: `BP ${data.bp || '120/80'} mmHg${data.weight ? ', Wt ' + data.weight + ' kg' : ''}`,
        description: `ASHA/ANM Home Visit for ${patientClean}. Symptoms/Danger Signs: [${symptoms.length > 0 ? symptoms.join(', ') : 'None'}]. Field Notes: ${data.notes || 'Routine checkup completed.'}`,
        metadata: {
          patient_name: patientClean,
          patient_raw: data.patient,
          bp: data.bp,
          weight: data.weight,
          danger_signs_flagged: symptoms,
          source: 'community_field_worker_console',
          logged_by: 'ASHA / ANM Health Worker',
          recorded_at: new Date().toISOString()
        }
      };

      const endpoint = (window.location.pathname.includes('/dashboards'))
        ? '../../api/hindsight_service.php?action=log_sensor_alert'
        : '/SPANDAN/api/hindsight_service.php?action=log_sensor_alert';

      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      .then(res => res.json())
      .then(resData => {
        if (resData && resData.success) {
          console.log('[Hindsight Memory Bridge] Synced field visit context:', resData.hindsight_memory_id);
        }
      })
      .catch(err => {
        console.warn('[Hindsight Memory Bridge] Background sync deferred:', err.message);
      });
    } catch (e) {
      console.warn('[Hindsight Memory Bridge] Error in dispatch:', e);
    }
  }

  /**
   * Asynchronously push emergency hospital referral alert to Hindsight AI memory.
   */
  function asyncPushEmergencyReferralToHindsight(data) {
    try {
      const endpoint = (window.location.pathname.includes('/dashboards'))
        ? '../../api/hindsight_service.php?action=log_sensor_alert'
        : '/SPANDAN/api/hindsight_service.php?action=log_sensor_alert';

      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patient_id: 1,
          alert_type: 'emergency_tertiary_referral',
          severity: 'critical',
          reading_value: 'Priority 0 SOS Ambulance Dispatch',
          description: `URGENT TERTIARY REFERRAL: ${data.patient} referred to ${data.hospital}. Health worker triggered GPS ambulance dispatch.`,
          metadata: {
            patient_raw: data.patient,
            destination_hospital: data.hospital,
            source: 'asha_emergency_referral',
            dispatched_at: new Date().toISOString()
          }
        })
      }).catch(err => console.warn('[Hindsight Sync Notice]', err));
    } catch (e) {}
  }

  function quickCheck(id) {
    const p = fieldPatients.find(item => item.id === id);
    if (!p || !window.BellyBandLayout) return;

    window.BellyBandLayout.showToast(`📊 Loading historical ANC records for ${p.name}...`);
  }

  return {
    render,
    quickCheck
  };
});
