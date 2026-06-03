// ============================================
// KONSTRUKT — Profile & Settings Page
// ============================================

import { DRIVER_PROFILE } from '../data.js';

export function renderProfilePage() {
  return `
    <div id="page-profile" class="hidden">

      <!-- Profile Header -->
      <div class="profile-header">
        <div class="profile-header__top">
          <button class="btn btn--dark-ghost" onclick="window.showDriverApp()" style="padding:6px 10px;font-size:13px">
            <i class="ti ti-arrow-left"></i> Geri
          </button>
          <span style="font-family:var(--font-display);font-size:16px;font-weight:700;color:#fff;letter-spacing:1px">Profilim</span>
          <button class="btn btn--dark-ghost" style="padding:6px 12px;font-size:13px">
            <i class="ti ti-edit"></i> Düzenle
          </button>
        </div>

        <div class="profile-hero">
          <div class="profile-avatar-wrap">
            <div class="profile-avatar">${DRIVER_PROFILE.initials}</div>
            <div class="profile-avatar-edit"><i class="ti ti-camera"></i></div>
          </div>
          <div style="flex:1">
            <div class="profile-name">${DRIVER_PROFILE.name}</div>
            <div class="profile-id">Sürücü ID: #KNT-${DRIVER_PROFILE.id}</div>
            <div class="profile-badges">
              <span class="profile-badge">★ ${DRIVER_PROFILE.rating} Puan</span>
              <span class="profile-badge">Üst Sürücü</span>
              <span class="profile-badge">${DRIVER_PROFILE.totalTrips} Sefer</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats -->
      <div class="stats-strip">
        <div class="stats-strip__cell">
          <div class="stats-strip__val">${DRIVER_PROFILE.totalTrips}</div>
          <div class="stats-strip__lbl">Toplam Sefer</div>
        </div>
        <div class="stats-strip__cell">
          <div class="stats-strip__val stats-strip__val--accent">₺24.6K</div>
          <div class="stats-strip__lbl">Toplam Kazanç</div>
        </div>
        <div class="stats-strip__cell">
          <div class="stats-strip__val">${DRIVER_PROFILE.acceptanceRate}%</div>
          <div class="stats-strip__lbl">Kabul Oranı</div>
        </div>
        <div class="stats-strip__cell">
          <div class="stats-strip__val">${DRIVER_PROFILE.memberSince}</div>
          <div class="stats-strip__lbl">Üyelik</div>
        </div>
      </div>

      <!-- Profile Tabs -->
      <div class="tabs">
        <div class="tab active" id="ptab-info"     onclick="switchProfileTab('info')">Bilgiler</div>
        <div class="tab"        id="ptab-docs"     onclick="switchProfileTab('docs')">Belgeler</div>
        <div class="tab"        id="ptab-perf"     onclick="switchProfileTab('perf')">Performans</div>
        <div class="tab"        id="ptab-settings" onclick="switchProfileTab('settings')">Ayarlar</div>
      </div>

      <!-- Info Panel -->
      <div id="ppanel-info" class="panel">
        <div class="sec-label">Kişisel Bilgiler</div>
        ${renderInfoRow('ti-user',            'Ad Soyad',        DRIVER_PROFILE.name)}
        ${renderInfoRow('ti-phone',           'Telefon',         '+90 532 *** ** 78')}
        ${renderInfoRow('ti-mail',            'E-posta',         'mehmet.k@email.com')}
        ${renderInfoRow('ti-map-pin',         'Şehir',           DRIVER_PROFILE.city + ', Pendik')}

        <div class="sec-label">Araç Bilgileri</div>
        ${renderInfoRow('ti-truck',           'Araç Modeli',     DRIVER_PROFILE.vehicleModel)}
        ${renderInfoRow('ti-license',         'Plaka',           DRIVER_PROFILE.plate)}
        ${renderInfoRow('ti-weight',          'Kapasite',        `${DRIVER_PROFILE.capacityTon} ton / ${DRIVER_PROFILE.capacityM3} m³`)}
        ${renderInfoRow('ti-id-badge-2',      'Ehliyet Sınıfı',  'C+E (TIR)')}

        <div class="sec-label">Banka Bilgileri</div>
        ${renderInfoRow('ti-building-bank',   'IBAN',            'TR** **** **** **** **** **91')}
        ${renderInfoRow('ti-calendar-dollar', 'Ödeme Günü',      'Her Pazartesi otomatik')}
      </div>

      <!-- Docs Panel -->
      <div id="ppanel-docs" class="panel hidden">
        <div class="sec-label">Zorunlu Belgeler</div>
        ${renderDocCard('ti-id-badge-2',        'Kimlik / TC Kimlik Kartı',  'Son güncelleme: 3 ay önce',      'ok',   'Onaylı')}
        ${renderDocCard('ti-license',           'Sürücü Belgesi (C+E)',      'Geçerlilik: 15.06.2028',         'ok',   'Onaylı')}
        ${renderDocCard('ti-file-certificate',  'Araç Muayenesi',            'Son kullanma: 20.07.2026',       'warn', 'Yakında Bitiyor')}
        ${renderDocCard('ti-shield-check',      'Trafik Sigortası',          'Geçerlilik: 01.03.2027',         'ok',   'Onaylı')}
        ${renderDocCard('ti-file-text',         'Kasko Sigortası',           'Yüklenmedi',                     'pend', 'Yükle')}
        ${renderDocCard('ti-building',          'Vergi Levhası',             'Son güncelleme: 1 ay önce',      'ok',   'Onaylı')}
        ${renderDocCard('ti-truck',             'Taşıt Kartı (K1)',          'Geçerlilik: 22.11.2026',         'ok',   'Onaylı')}
        <button class="btn btn--primary btn--full" style="margin-top:12px;margin-bottom:14px">
          <i class="ti ti-upload"></i> Yeni Belge Yükle
        </button>
      </div>

      <!-- Performance Panel -->
      <div id="ppanel-perf" class="panel hidden">
        <div class="sec-label">Bu Ay Performans</div>
        ${renderPerfBar('Kabul Oranı', '91%', 91, '#2a9d5c')}
        ${renderPerfBar('Zamanında Teslimat', '88%', 88, '#2a7dd6')}
        ${renderPerfBar('Müşteri Memnuniyeti', '4.8 / 5', 96, '#e8a020')}
        ${renderPerfBar('Tamamlama Oranı', '97%', 97, '#0d1b2a')}

        <div class="sec-label" style="margin-top:20px">Son Değerlendirmeler</div>
        ${renderReview('AY', 'Ayşe Yılmaz', '2 gün önce', 5, 'Çok özenli ve profesyoneldi. Çelik malzemeler hiç zarar görmedi.')}
        ${renderReview('KD', 'Kemal Doğan', '5 gün önce', 5, 'Zamanında teslim, güler yüzlü sürücü. Tekrar çalışacağız.')}
        ${renderReview('MS', 'Murat Sarı',  '1 hafta önce', 4, 'Genel iyi fakat biraz geç kaldı. Yine de kaliteli hizmet.')}
      </div>

      <!-- Settings Panel -->
      <div id="ppanel-settings" class="panel hidden">
        <div class="sec-label">Bildirimler</div>
        ${renderToggle('ti-bell',        'Yeni İş Teklifleri',     'Yakınınızdaki teklifleri anlık alın', true)}
        ${renderToggle('ti-message',     'Müşteri Mesajları',      'Yeni mesaj geldiğinde bildir',        true)}
        ${renderToggle('ti-coin',        'Ödeme Bildirimleri',     'Kazanç transferleri için bildir',     true)}
        ${renderToggle('ti-speakerphone','Kampanya ve Duyurular',  'Bonus ve promosyonlar',               false)}

        <div class="sec-label" style="margin-top:20px">Uygulama</div>
        ${renderMenuItem('ti-map',        '',      'Varsayılan Harita',    'Google Maps')}
        ${renderMenuItem('ti-language',   '',      'Dil',                  'Türkçe')}
        ${renderMenuItem('ti-lock',       '',      'Şifre Değiştir',       '')}
        ${renderMenuItem('ti-shield',     '',      'Gizlilik ve Güvenlik', '')}
        ${renderMenuItem('ti-headset',    '',      'Destek ve Yardım',     '')}

        <div class="sec-label" style="margin-top:20px">Hesap</div>
        ${renderMenuItem('ti-logout',    'red',   'Çıkış Yap',  '', true)}
        ${renderMenuItem('ti-user-x',    'red',   'Hesabı Sil', '', true)}
        <div style="height:14px"></div>
      </div>

      <!-- Bottom Nav -->
      <div class="bottom-nav">
        <div class="nav-item" onclick="window.showDriverApp(); window.switchTab('jobs')">
          <i class="ti ti-briefcase"></i>Teklifler
        </div>
        <div class="nav-item" onclick="window.showDriverApp(); window.switchTab('active')">
          <i class="ti ti-truck"></i>Aktif
        </div>
        <div class="nav-item" onclick="window.showDriverApp(); window.switchTab('earn')">
          <i class="ti ti-wallet"></i>Kazanç
        </div>
        <div class="nav-item active">
          <i class="ti ti-user"></i>Profil
        </div>
      </div>
    </div>
  `;
}

function renderInfoRow(icon, label, value) {
  return `
    <div class="info-row">
      <div class="info-icon"><i class="ti ${icon}"></i></div>
      <div class="info-content">
        <div class="info-content__label">${label}</div>
        <div class="info-content__value">${value}</div>
      </div>
      <i class="ti ti-chevron-right" style="color:var(--steel2);font-size:18px"></i>
    </div>
  `;
}

function renderDocCard(icon, name, sub, status, statusLabel) {
  return `
    <div class="doc-card">
      <div class="doc-icon doc-icon--${status}"><i class="ti ${icon}"></i></div>
      <div class="doc-info">
        <div class="doc-name">${name}</div>
        <div class="doc-sub">${sub}</div>
      </div>
      <span class="doc-status doc-status--${status}">${statusLabel}</span>
    </div>
  `;
}

function renderPerfBar(label, val, pct, color) {
  return `
    <div class="perf-bar-wrap">
      <div class="perf-bar-top">
        <span class="perf-bar-label">${label}</span>
        <span class="perf-bar-val">${val}</span>
      </div>
      <div class="perf-bar">
        <div class="perf-fill" style="width:${pct}%;background:${color}"></div>
      </div>
    </div>
  `;
}

function renderReview(initials, name, date, stars, text) {
  const filled = '★'.repeat(stars);
  const empty  = '★'.repeat(5 - stars);
  return `
    <div class="card" style="margin-bottom:8px">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
        <div style="width:30px;height:30px;border-radius:50%;background:var(--fog);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:var(--steel);flex-shrink:0">${initials}</div>
        <span style="font-size:13px;font-weight:500;color:var(--navy2);flex:1">${name}</span>
        <span style="font-size:11px;color:var(--steel2)">${date}</span>
      </div>
      <div style="color:#f59e0b;font-size:12px;margin-bottom:4px">
        ${filled}<span style="color:var(--fog)">${empty}</span>
      </div>
      <div style="font-size:13px;color:var(--steel2);line-height:1.5">${text}</div>
    </div>
  `;
}

function renderToggle(icon, label, sub, checked) {
  return `
    <div class="toggle-row">
      <div class="toggle-row__icon"><i class="ti ${icon}"></i></div>
      <div class="toggle-row__content">
        <div class="toggle-row__label">${label}</div>
        <div class="toggle-row__sub">${sub}</div>
      </div>
      <label class="toggle-switch">
        <input type="checkbox" ${checked ? 'checked' : ''}>
        <span class="toggle-slider"></span>
      </label>
    </div>
  `;
}

function renderMenuItem(icon, type, label, value = '', danger = false) {
  return `
    <div class="menu-item">
      <div class="menu-icon${type === 'red' ? ' menu-icon--red' : ''}">
        <i class="ti ${icon}"></i>
      </div>
      <span class="menu-label${danger ? ' menu-label--red' : ''}">${label}</span>
      ${value ? `<span style="font-size:13px;color:var(--steel2);margin-right:6px">${value}</span>` : ''}
      ${!danger ? `<i class="ti ti-chevron-right menu-arrow"></i>` : ''}
    </div>
  `;
}

// Profile tab switcher (exposed globally)
window.switchProfileTab = function(tab) {
  ['info', 'docs', 'perf', 'settings'].forEach(t => {
    const panel = document.getElementById(`ppanel-${t}`);
    const tabEl = document.getElementById(`ptab-${t}`);
    if (panel) panel.classList.toggle('hidden', t !== tab);
    if (tabEl) tabEl.classList.toggle('active', t === tab);
  });
};
