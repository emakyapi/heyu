// ============================================
// KONSTRUKT — Active Sefer Panel (Leaflet Harita)
// ============================================

let currentStep = 1;
let map = null;
let truckMarker = null;
let animFrame = null;

const STEPS = [
  { label: 'Yükleme' },
  { label: 'Yolda' },
  { label: 'Teslim' },
  { label: 'Tamamlandı' },
];

const STEP_BTN_LABELS = [
  'Yüklemeyi Tamamladım',
  'Teslim Noktasına Vardım',
  'Teslimi Tamamla',
  'Görevi Kapat ✓',
];

const PROGRESS = [38, 65, 90, 100];

// Ankara Ostim → İzmir Çiğli gerçek koordinatlar
const ORIGIN = [39.9334, 32.8597];   // Ankara Ostim
const DEST   = [38.4946, 27.0505];   // İzmir Çiğli

// Ara noktalar (gerçek rota boyunca)
const ROUTE_POINTS = [
  [39.9334, 32.8597], // Ankara Ostim
  [39.7667, 32.4833], // Ankara çıkışı
  [39.4167, 31.4333], // Eskişehir yakını
  [39.7764, 30.5206], // Eskişehir
  [39.4167, 29.9833], // Kütahya
  [38.9637, 29.2422], // Uşak
  [38.6817, 28.3889], // Salihli
  [38.4946, 27.0505], // İzmir Çiğli
];

// Truck SVG ikonu
const TRUCK_ICON = L.divIcon({
  className: '',
  html: `<div style="
    width:36px;height:36px;
    background:#0d1b2a;
    border:3px solid #e8a020;
    border-radius:50%;
    display:flex;align-items:center;justify-content:center;
    box-shadow:0 0 0 6px rgba(232,160,32,0.25);
    animation:truckPing 2s infinite;
    font-size:16px;
  ">🚛</div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 18],
});

const ORIGIN_ICON = L.divIcon({
  className: '',
  html: `<div style="
    width:28px;height:28px;
    background:#2a9d5c;
    border:3px solid #fff;
    border-radius:50%;
    display:flex;align-items:center;justify-content:center;
    box-shadow:0 2px 8px rgba(0,0,0,0.3);
    font-size:13px;
  ">📦</div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

const DEST_ICON = L.divIcon({
  className: '',
  html: `<div style="
    width:28px;height:28px;
    background:#d64141;
    border:3px solid #fff;
    border-radius:50%;
    display:flex;align-items:center;justify-content:center;
    box-shadow:0 2px 8px rgba(0,0,0,0.3);
    font-size:13px;
  ">🏗️</div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

export function renderActivePanel() {
  return `
    <div id="panel-active" class="hidden">

      <!-- Gerçek Harita -->
      <div id="leaflet-map" style="height:240px;width:100%;z-index:1;"></div>

      <div class="panel" style="padding-top:12px">

        <!-- Active Banner -->
        <div class="active-banner">
          <div class="active-banner__head">
            <span class="badge badge--accent">Sefer Devam Ediyor</span>
            <span class="active-banner__title">Çelik Profil Sevkiyatı</span>
          </div>

          <!-- Step Track -->
          <div class="step-track" id="step-track">
            ${renderStepTrack()}
          </div>

          <!-- Progress -->
          <div class="progress-bar">
            <div class="progress-fill" id="prog-fill" style="width:${PROGRESS[currentStep]}%"></div>
          </div>

          <!-- Route -->
          <div class="active-banner__route">
            <div class="active-banner__route-item">
              <div class="abr-dot" style="background:var(--success)"></div>
              <div style="font-size:13px;color:#fff;font-weight:500">
                Ankara, Ostim Çelik Profil A.Ş.
                <span style="color:var(--steel3);font-weight:400"> — Yüklendi ✓</span>
              </div>
            </div>
            <div class="active-banner__route-item">
              <div style="width:9px;display:flex;justify-content:center">
                <div style="width:1.5px;height:14px;background:rgba(255,255,255,0.15)"></div>
              </div>
              <div style="font-size:11px;color:var(--steel3);padding-left:2px" id="route-eta">
                Kalan: ~3s 40dk &nbsp;·&nbsp; 290 km
              </div>
            </div>
            <div class="active-banner__route-item">
              <div class="abr-dot" style="background:var(--danger)"></div>
              <div style="font-size:13px;color:#fff;font-weight:500">
                İzmir, Çiğli Endüstri Bölgesi
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="active-banner__actions">
            <button class="btn btn--dark-ghost" style="flex:1" onclick="alert('Müşteri aranıyor: +90 532 *** ** 78')">
              <i class="ti ti-phone"></i> Ara
            </button>
            <button class="btn btn--dark-ghost" style="flex:1" onclick="window.centerMap()">
              <i class="ti ti-navigation"></i> Haritada Bul
            </button>
            <button class="btn btn--accent" style="flex:1" id="step-btn" onclick="window.nextStep()">
              ${STEP_BTN_LABELS[currentStep]}
            </button>
          </div>
        </div>

        <!-- Cargo Detail -->
        <div class="sec-label">Yük Detayı</div>
        <div class="card" style="margin-bottom:14px">
          <div class="detail-grid">
            <div class="detail-item">
              <div class="detail-item__label">Yük Türü</div>
              <div class="detail-item__value">Çelik I-Kiriş &amp; Profil</div>
            </div>
            <div class="detail-item">
              <div class="detail-item__label">Ağırlık</div>
              <div class="detail-item__value">24.000 kg</div>
            </div>
            <div class="detail-item">
              <div class="detail-item__label">Sipariş No</div>
              <div class="detail-item__value">#KNT-2024-0881</div>
            </div>
            <div class="detail-item">
              <div class="detail-item__label">Ücret</div>
              <div class="detail-item__value detail-item__value--success">₺12.750</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  `;
}

// Haritayı başlat — tab açılınca çağrılır
export function initMap() {
  if (map) return; // zaten başlatıldı

  const mapEl = document.getElementById('leaflet-map');
  if (!mapEl) return;

  // Orta nokta: rota ortası
  map = L.map('leaflet-map', {
    center: [39.2, 30.0],
    zoom: 6,
    zoomControl: true,
    attributionControl: false,
  });

  // OpenStreetMap tile (ücretsiz)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
  }).addTo(map);

  // Rota çizgisi
  const routeLine = L.polyline(ROUTE_POINTS, {
    color: '#e8a020',
    weight: 4,
    opacity: 0.85,
    dashArray: '10, 6',
  }).addTo(map);

  // Tamamlanan kısım (koyu lacivert)
  const doneLine = L.polyline(ROUTE_POINTS.slice(0, 3), {
    color: '#0d1b2a',
    weight: 4,
    opacity: 0.9,
  }).addTo(map);

  // Yükleme noktası marker
  L.marker(ORIGIN, { icon: ORIGIN_ICON })
    .addTo(map)
    .bindPopup('<b>📦 Yükleme Noktası</b><br>Ankara, Ostim Çelik Profil A.Ş.<br><small>Yüklendi ✓</small>');

  // Teslim noktası marker
  L.marker(DEST, { icon: DEST_ICON })
    .addTo(map)
    .bindPopup('<b>🏗️ Teslim Noktası</b><br>İzmir, Çiğli Endüstri Bölgesi<br><small>Bekleniyor...</small>');

  // TIR marker (şu an rota ortasında)
  const truckPos = ROUTE_POINTS[2];
  truckMarker = L.marker(truckPos, { icon: TRUCK_ICON })
    .addTo(map)
    .bindPopup('<b>🚛 MAN TGX — 34 KNT 881</b><br>Mehmet Karataş<br>Hız: 87 km/h');

  // Haritayı rotaya sığdır
  map.fitBounds(routeLine.getBounds(), { padding: [20, 20] });

  // TIR animasyonu — rota boyunca yavaşça ilerle
  animateTruck();
}

// TIR'ı rota üzerinde animate et
let animProgress = 0.25; // %25'ten başla (zaten yoldayız)
function animateTruck() {
  if (!truckMarker) return;
  animProgress += 0.0002;
  if (animProgress > 1) animProgress = 0;

  const pos = interpolateRoute(ROUTE_POINTS, animProgress);
  truckMarker.setLatLng(pos);

  animFrame = requestAnimationFrame(animateTruck);
}

// Rota üzerinde interpolasyon
function interpolateRoute(points, t) {
  const total = points.length - 1;
  const idx = Math.floor(t * total);
  const frac = (t * total) - idx;
  if (idx >= total) return points[total];
  const a = points[idx];
  const b = points[idx + 1];
  return [
    a[0] + (b[0] - a[0]) * frac,
    a[1] + (b[1] - a[1]) * frac,
  ];
}

window.centerMap = function() {
  if (map && truckMarker) {
    map.setView(truckMarker.getLatLng(), 8, { animate: true });
  }
};

function renderStepTrack() {
  let html = '';
  STEPS.forEach((step, i) => {
    let dotClass = 'step-dot';
    if (i < currentStep) dotClass += ' step-dot--done';
    else if (i === currentStep) dotClass += ' step-dot--current';
    html += `
      <div class="step-item">
        <div class="${dotClass}" id="dot-${i}"></div>
        <div class="step-label">${step.label}</div>
      </div>
    `;
    if (i < STEPS.length - 1) {
      const lineClass = i < currentStep ? 'step-connector step-connector--done' : 'step-connector';
      html += `<div class="${lineClass}" id="line-${i}"></div>`;
    }
  });
  return html;
}

function updateStepUI() {
  STEPS.forEach((_, i) => {
    const dot = document.getElementById(`dot-${i}`);
    if (!dot) return;
    dot.className = 'step-dot';
    if (i < currentStep) dot.classList.add('step-dot--done');
    else if (i === currentStep) dot.classList.add('step-dot--current');
    if (i < STEPS.length - 1) {
      const line = document.getElementById(`line-${i}`);
      if (line) line.className = i < currentStep ? 'step-connector step-connector--done' : 'step-connector';
    }
  });
  const fill = document.getElementById('prog-fill');
  if (fill) fill.style.width = PROGRESS[Math.min(currentStep, PROGRESS.length - 1)] + '%';
  const btn = document.getElementById('step-btn');
  if (btn) btn.textContent = STEP_BTN_LABELS[Math.min(currentStep, STEP_BTN_LABELS.length - 1)];
}

export function nextStep() {
  if (currentStep >= STEPS.length - 1) return;
  currentStep++;
  updateStepUI();
  if (currentStep === STEPS.length - 1) {
    if (animFrame) cancelAnimationFrame(animFrame);
    if (truckMarker) truckMarker.setLatLng(DEST);
    setTimeout(() => {
      alert('Sefer tamamlandı! ₺12.750 hesabınıza aktarılıyor.');
      window.switchTab('earn');
      currentStep = 1;
    }, 400);
  }
}
