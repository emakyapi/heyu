// ============================================
// HEYU — Ana Uygulama (main.js)
// İnşaat Lojistik Platformu
// ============================================

import { currentTime } from './utils.js';

// ── State ──
let map       = null;
let isOnline  = true;
let userType  = 'sofor';
let sheetOpen = false;

const JOBS = [
  {
    badge:'acil', badgeTxt:'⚡ ACİL SEVKİYAT',
    title:'Hazır Beton Sevkiyatı', price:'₺8.400',
    from:'Gaziantep OSB, Çelik Yapı Fab.',
    to:'Adana, Seyhan Konut Şantiyesi',
    dist:'318 km · ~4s 10dk · TEM',
    chips:['22 ton','TIR','Bugün 14:00'],
    lat:37.05, lng:35.35
  },
  {
    badge:'norm', badgeTxt:'📦 İŞ TEKLİFİ',
    title:'Agrega Taşıma', price:'₺3.200',
    from:'İstanbul, Başakşehir Agrega Deposu',
    to:'Esenyurt, Mega Rezidans Şantiyesi',
    dist:'47 km · ~55 dk · E-80',
    chips:['14 ton','Kamyon','Yarın 08:00'],
    lat:40.98, lng:28.71
  },
  {
    badge:'norm', badgeTxt:'🏗️ BÜYÜK NAKLİYE',
    title:'Çelik Profil Sevkiyatı', price:'₺12.750',
    from:'Ankara, Ostim Çelik Profil A.Ş.',
    to:'İzmir, Çiğli Endüstri Bölgesi',
    dist:'470 km · ~5s 20dk · O-4/TEM',
    chips:['24 ton','TIR','3 gün sonra'],
    lat:39.93, lng:32.86
  },
];

// ── HTML Şablonları ──
function renderSplash() {
  return `
  <div class="screen" id="s-splash">
    <div class="splash-bg"><div class="splash-grid"></div></div>
    <div class="splash-content">
      <div style="display:flex;flex-direction:column;align-items:center;gap:10px">
        <div class="heyu-icon"><i class="ti ti-truck"></i></div>
        <div class="heyu-name">HEYU</div>
      </div>
      <div style="text-align:center">
        <div class="heyu-sub1">İnşaat Lojistik Platformu</div>
        <div class="heyu-sub2">Türkiye'nin inşaat sektörüne özel<br>TIR &amp; Kamyon lojistik ağı</div>
      </div>
      <div class="splash-actions">
        <button class="btn-splash-main" onclick="window.go('s-usertype')">
          Başla &nbsp;<i class="ti ti-arrow-right"></i>
        </button>
        <button class="btn-splash-sec" onclick="window.go('s-usertype')">
          Zaten hesabım var — Giriş Yap
        </button>
      </div>
      <div class="splash-footer">v1.0.0 &nbsp;·&nbsp; HEYU Lojistik A.Ş.</div>
    </div>
  </div>`;
}

function renderUserType() {
  return `
  <div class="screen hidden" id="s-usertype">
    <button class="back-btn" onclick="window.go('s-splash')"><i class="ti ti-arrow-left"></i></button>
    <div class="ut-top">
      <div class="ut-top-icon"><i class="ti ti-users"></i></div>
      <div class="ut-title">Nasıl Devam Edersiniz?</div>
      <div class="ut-sub">Hesap türünüzü seçin</div>
    </div>
    <div class="ut-list">
      <div class="ut-card" onclick="window.selectType('sofor')">
        <div class="ut-card-icon" style="background:rgba(42,157,92,.15)">🚛</div>
        <div class="ut-card-body">
          <div class="ut-card-title">ŞOFÖR / SÜRÜCÜ</div>
          <div class="ut-card-sub">İş tekliflerini görün, kabul edin ve sevkiyatları yönetin</div>
        </div>
        <i class="ti ti-chevron-right ut-card-arrow"></i>
      </div>
      <div class="ut-card" onclick="window.selectType('nakliyeci')">
        <div class="ut-card-icon" style="background:rgba(42,125,214,.15)">🏗️</div>
        <div class="ut-card-body">
          <div class="ut-card-title">NAKLİYECİ / FİRMA</div>
          <div class="ut-card-sub">Yük ilanı oluşturun, araç bulun ve sevkiyatları takip edin</div>
        </div>
        <i class="ti ti-chevron-right ut-card-arrow"></i>
      </div>
      <div class="ut-card" onclick="window.selectType('admin')">
        <div class="ut-card-icon" style="background:rgba(214,65,65,.15)">⚙️</div>
        <div class="ut-card-body">
          <div class="ut-card-title">YÖNETİCİ / ADMIN</div>
          <div class="ut-card-sub">Tüm platform operasyonlarını merkezi olarak yönetin</div>
        </div>
        <i class="ti ti-chevron-right ut-card-arrow"></i>
      </div>
    </div>
    <div class="ut-bottom">Hesabınız yok mu? &nbsp;<span>Ücretsiz Kayıt Ol →</span></div>
  </div>`;
}

function renderLogin() {
  return `
  <div class="screen hidden" id="s-login">
    <button class="back-btn" onclick="window.go('s-usertype')"><i class="ti ti-arrow-left"></i></button>
    <div class="login-top">
      <div class="login-badge" id="login-badge">🚛 &nbsp;ŞOFÖR GİRİŞİ</div>
      <div class="login-title">Hoş Geldiniz</div>
      <div class="login-sub">Hesabınıza giriş yapın</div>
    </div>
    <div class="login-body">
      <div class="fgroup">
        <div class="flabel">Telefon / E-posta</div>
        <div class="finput-wrap">
          <input class="finput" type="text" placeholder="+90 5__ ___ __ __"/>
          <i class="ti ti-phone finput-icon"></i>
        </div>
      </div>
      <div class="fgroup">
        <div class="flabel">Şifre</div>
        <div class="finput-wrap">
          <input class="finput" type="password" placeholder="••••••••" id="pass-input"/>
          <i class="ti ti-eye finput-icon" onclick="window.togglePass()"></i>
        </div>
      </div>
      <div class="fforgot">Şifremi Unuttum</div>
      <button class="btn-login" id="btn-login" onclick="window.doLogin()">Giriş Yap</button>
      <div class="fdivider"><span>veya</span></div>
      <button class="btn-register">Yeni Hesap Oluştur</button>
    </div>
    <div class="login-footer-txt">
      Giriş yaparak <span>Kullanım Koşulları</span>'nı ve
      <span>Gizlilik Politikası</span>'nı kabul etmiş olursunuz.
    </div>
  </div>`;
}

function renderSofor() {
  return `
  <div class="screen hidden" id="s-sofor">
    <div id="heyu-map"></div>
    <div class="map-ui">
      <div class="map-top-bar">
        <div class="map-logo">
          <i class="ti ti-truck" style="font-size:15px;color:var(--accent)"></i>
          <div class="map-logo-text">HEYU</div>
        </div>
        <div class="map-top-right">
          <div class="map-notif-btn">
            <i class="ti ti-bell"></i>
            <div class="notif-badge"></div>
          </div>
          <button class="map-online-pill on" id="online-pill" onclick="window.toggleOnline()">
            <div class="map-dot"></div>
            <span id="online-txt">Çevrimiçi</span>
          </button>
        </div>
      </div>

      <div style="flex:1;position:relative;pointer-events:none">
        <div class="map-job-pin" style="top:28%;left:22%" onclick="window.openJob(0)">
          <div class="mjp-bubble acil">⚡ ₺8.400</div>
        </div>
        <div class="map-job-pin" style="top:42%;right:18%" onclick="window.openJob(1)">
          <div class="mjp-bubble">₺3.200</div>
        </div>
        <div class="map-job-pin" style="top:60%;left:38%" onclick="window.openJob(2)">
          <div class="mjp-bubble">₺12.750</div>
        </div>
      </div>

      <div class="map-bottom">
        <div class="driver-chip">
          <div class="dc-av">MK</div>
          <div class="dc-info">
            <div class="dc-name">Mehmet Karataş</div>
            <div class="dc-vehicle">
              <i class="ti ti-truck" style="font-size:10px"></i>
              MAN TGX · 34 KNT 881
            </div>
          </div>
          <div class="dc-stats">
            <div><div class="dc-stat-v">4.8★</div><div class="dc-stat-l">Puan</div></div>
            <div><div class="dc-stat-v">243</div><div class="dc-stat-l">Sefer</div></div>
          </div>
        </div>

        <div class="job-sheet closed" id="job-sheet">
          <div class="js-handle"></div>
          <div id="js-content"></div>
        </div>

        <div class="sofor-nav">
          <div class="snav-item active"><i class="ti ti-map"></i>Harita</div>
          <div class="snav-item"><i class="ti ti-briefcase"></i>İşler</div>
          <div class="snav-item"><i class="ti ti-truck"></i>Seferim</div>
          <div class="snav-item"><i class="ti ti-wallet"></i>Kazanç</div>
          <div class="snav-item" onclick="window.go('s-usertype')">
            <i class="ti ti-user"></i>Profil
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

function renderNakliyeci() {
  return `
  <div class="screen hidden" id="s-nakliyeci">
    <div class="nak-hdr">
      <div class="nak-hdr-row">
        <div class="nak-logo-wrap">
          <div class="nak-logo-box"><i class="ti ti-truck"></i></div>
          <div class="nak-logo-name">HEYU</div>
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <div class="nak-bell"><i class="ti ti-bell"></i><div class="nak-bell-dot"></div></div>
          <div style="width:34px;height:34px;background:rgba(255,255,255,.08);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:var(--mist);cursor:pointer">EY</div>
        </div>
      </div>
      <div class="nak-welcome">Hoş Geldiniz 👋</div>
      <div class="nak-company">EMAK YAPI A.Ş.</div>
      <div class="nak-kpis">
        <div class="nak-kpi"><div class="nak-kpi-v acc">3</div><div class="nak-kpi-l">Aktif Sefer</div></div>
        <div class="nak-kpi"><div class="nak-kpi-v">18</div><div class="nak-kpi-l">Bu Ay</div></div>
        <div class="nak-kpi"><div class="nak-kpi-v acc">₺94K</div><div class="nak-kpi-l">Harcama</div></div>
      </div>
    </div>
    <div class="nak-body">
      <div class="nak-sec-lbl">Hızlı İşlemler</div>
      <div class="nak-actions">
        <div class="nak-ac">
          <div class="nak-ac-icon" style="background:#fff3db"><i class="ti ti-plus" style="font-size:20px;color:#b05e00"></i></div>
          <div class="nak-ac-title">Yük İlanı Oluştur</div>
          <div class="nak-ac-sub">TIR veya kamyon talep et</div>
        </div>
        <div class="nak-ac">
          <div class="nak-ac-icon" style="background:#e8edf5"><i class="ti ti-map-pin" style="font-size:20px;color:var(--navy3)"></i></div>
          <div class="nak-ac-title">Seferleri Takip Et</div>
          <div class="nak-ac-sub">Canlı konum ve durum</div>
        </div>
        <div class="nak-ac">
          <div class="nak-ac-icon" style="background:#f0fdf4"><i class="ti ti-users" style="font-size:20px;color:#166534"></i></div>
          <div class="nak-ac-title">Araç Bul</div>
          <div class="nak-ac-sub">Müsait TIR/kamyon</div>
        </div>
        <div class="nak-ac">
          <div class="nak-ac-icon" style="background:#fdeaea"><i class="ti ti-chart-bar" style="font-size:20px;color:var(--danger)"></i></div>
          <div class="nak-ac-title">Raporlar</div>
          <div class="nak-ac-sub">Maliyet &amp; analiz</div>
        </div>
      </div>
      <div class="nak-sec-lbl">Aktif Sevkiyatlar</div>
      <div class="ship-card live">
        <div class="sc-head"><div class="sc-id">#HYU-2024-0881</div><div class="sc-status yolda">Yolda 🚛</div></div>
        <div class="sc-route">
          <div class="sc-dot-g"></div>
          <span style="font-size:12px;color:var(--navy2);font-weight:500">Ankara, Ostim</span>
          <div class="sc-line"></div>
          <div class="sc-dot-r"></div>
          <span style="font-size:12px;color:var(--navy2);font-weight:500">İzmir, Çiğli</span>
        </div>
        <div class="sc-meta">
          <div class="sc-meta-item"><i class="ti ti-truck"></i>MAN TGX · 34 KNT 881</div>
          <div class="sc-meta-item"><i class="ti ti-weight"></i>24 ton</div>
          <div class="sc-meta-item"><i class="ti ti-clock"></i>3s 40dk kaldı</div>
        </div>
      </div>
      <div class="ship-card">
        <div class="sc-head"><div class="sc-id">#HYU-2024-0879</div><div class="sc-status bekle">Araç Bekleniyor</div></div>
        <div class="sc-route">
          <div class="sc-dot-g"></div>
          <span style="font-size:12px;color:var(--navy2);font-weight:500">İstanbul, Başakşehir</span>
          <div class="sc-line"></div>
          <div class="sc-dot-r"></div>
          <span style="font-size:12px;color:var(--navy2);font-weight:500">Esenyurt Şantiye</span>
        </div>
        <div class="sc-meta">
          <div class="sc-meta-item"><i class="ti ti-mountain"></i>14 ton agrega</div>
          <div class="sc-meta-item"><i class="ti ti-calendar"></i>Yarın 08:00</div>
        </div>
      </div>
      <div class="ship-card">
        <div class="sc-head"><div class="sc-id">#HYU-2024-0875</div><div class="sc-status done">Tamamlandı ✓</div></div>
        <div class="sc-route">
          <div class="sc-dot-g"></div>
          <span style="font-size:12px;color:var(--navy2);font-weight:500">Konya, OSB</span>
          <div class="sc-line"></div>
          <div class="sc-dot-r"></div>
          <span style="font-size:12px;color:var(--navy2);font-weight:500">Ankara Şantiye</span>
        </div>
        <div class="sc-meta">
          <div class="sc-meta-item"><i class="ti ti-building-factory-2"></i>16 ton beton</div>
          <div class="sc-meta-item" style="color:var(--success);font-weight:600">₺4.100 ödendi</div>
        </div>
      </div>
      <div style="height:14px"></div>
    </div>
    <div class="nak-nav">
      <div class="nnav-item active"><i class="ti ti-home"></i>Ana Sayfa</div>
      <div class="nnav-item"><i class="ti ti-map"></i>Harita</div>
      <div class="nnav-item"><i class="ti ti-truck"></i>Seferler</div>
      <div class="nnav-item"><i class="ti ti-chart-bar"></i>Rapor</div>
      <div class="nnav-item" onclick="window.go('s-usertype')"><i class="ti ti-user"></i>Profil</div>
    </div>
  </div>`;
}

// ── Harita ──
function initMap() {
  if (map) { setTimeout(() => map.invalidateSize(), 100); return; }
  const el = document.getElementById('heyu-map');
  if (!el) return;

  map = L.map('heyu-map', {
    center: [39.2, 34.5],
    zoom: 6,
    zoomControl: true,
    attributionControl: false,
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 }).addTo(map);

  // Sürücü ikonu
  const driverIcon = L.divIcon({
    className: '',
    html: `<div style="width:38px;height:38px;background:#0d1b2a;border:3px solid #e8a020;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:18px;box-shadow:0 0 0 8px rgba(232,160,32,.2)">🚛</div>`,
    iconSize: [38, 38], iconAnchor: [19, 19],
  });
  L.marker([41.01, 28.97], { icon: driverIcon }).addTo(map)
    .bindPopup('<b>📍 Konumunuz</b><br>İstanbul, Kadıköy');

  // İş pinleri
  JOBS.forEach((job, i) => {
    const isAcil = job.badge === 'acil';
    const icon = L.divIcon({
      className: '',
      html: `<div style="background:${isAcil?'#d64141':'#0d1b2a'};border:2px solid ${isAcil?'#ff8080':'#e8a020'};border-radius:9px;padding:4px 10px;font-size:12px;font-weight:700;color:${isAcil?'#fff':'#f5b835'};font-family:'Barlow Condensed',sans-serif;white-space:nowrap;box-shadow:0 2px 10px rgba(0,0,0,.4);cursor:pointer">${isAcil?'⚡ ':''} ${job.price}</div>`,
      iconSize: [null, null], iconAnchor: [0, 0],
    });
    L.marker([job.lat, job.lng], { icon })
      .addTo(map)
      .on('click', () => window.openJob(i));
  });

  // Rota çizgisi
  L.polyline([[39.93, 32.86],[39.2, 30.5],[38.49, 27.05]], {
    color: '#e8a020', weight: 3, opacity: .7, dashArray: '8,5',
  }).addTo(map);

  setTimeout(() => map.invalidateSize(), 150);
}

// ── Global Fonksiyonlar ──
window.go = function(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
  if (id === 's-sofor') setTimeout(initMap, 150);
};

window.selectType = function(type) {
  userType = type;
  const badges = { sofor: '🚛 &nbsp;ŞOFÖR GİRİŞİ', nakliyeci: '🏗️ &nbsp;NAKLİYECİ GİRİŞİ', admin: '⚙️ &nbsp;YÖNETİCİ GİRİŞİ' };
  document.getElementById('login-badge').innerHTML = badges[type];
  window.go('s-login');
};

window.doLogin = function() {
  if (userType === 'nakliyeci') window.go('s-nakliyeci');
  else window.go('s-sofor');
};

window.togglePass = function() {
  const el = document.getElementById('pass-input');
  el.type = el.type === 'password' ? 'text' : 'password';
};

window.toggleOnline = function() {
  isOnline = !isOnline;
  const pill = document.getElementById('online-pill');
  const txt  = document.getElementById('online-txt');
  pill.className = 'map-online-pill ' + (isOnline ? 'on' : 'off');
  txt.textContent = isOnline ? 'Çevrimiçi' : 'Çevrimdışı';
};

window.openJob = function(idx) {
  const j = JOBS[idx];
  document.getElementById('js-content').innerHTML = `
    <div class="js-badge ${j.badge}">${j.badgeTxt}</div>
    <div class="js-top">
      <div class="js-title">${j.title}</div>
      <div class="js-price">${j.price}<br><small>sabit ücret</small></div>
    </div>
    <div class="js-route">
      <div class="js-rp"><div class="js-dot-g"></div>${j.from}</div>
      <div class="js-rp"><div class="js-rline"><div class="js-rline-i"></div></div><div class="js-mid">${j.dist}</div></div>
      <div class="js-rp"><div class="js-dot-r"></div>${j.to}</div>
    </div>
    <div class="js-chips">${j.chips.map(c => `<div class="js-chip"><i class="ti ti-point"></i>${c}</div>`).join('')}</div>
    <div class="js-actions">
      <button class="js-accept" onclick="window.acceptJob()">
        <i class="ti ti-check"></i> Kabul Et &nbsp;— &nbsp;${j.price}
      </button>
      <button class="js-reject" onclick="window.closeSheet()"><i class="ti ti-x"></i></button>
    </div>`;
  document.getElementById('job-sheet').classList.remove('closed');
  sheetOpen = true;
};

window.closeSheet = function() {
  document.getElementById('job-sheet').classList.add('closed');
  sheetOpen = false;
};

window.acceptJob = function() {
  document.getElementById('js-content').innerHTML = `
    <div style="text-align:center;padding:14px 0 8px">
      <div style="font-size:40px;margin-bottom:10px">✅</div>
      <div style="font-family:var(--font-display);font-size:22px;font-weight:800;color:#fff;letter-spacing:.5px">İş Kabul Edildi!</div>
      <div style="font-size:13px;color:var(--steel3);margin-top:6px">Yükleme noktasına yönlendiriliyorsunuz...</div>
    </div>`;
  setTimeout(window.closeSheet, 2200);
};

// ── Boot ──
document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('app-root');
  root.innerHTML = `
    <div class="app">
      ${renderSplash()}
      ${renderUserType()}
      ${renderLogin()}
      ${renderSofor()}
      ${renderNakliyeci()}
    </div>
  `;
});
