# KONSTRUKT — İnşaat Lojistik Platformu
### Sürücü Uygulaması (Driver App)

---

## 📦 Proje Yapısı

```
konstrukt/
├── index.html                  ← Ana HTML giriş noktası
├── src/
│   ├── main.js                 ← Uygulama başlatıcısı & global handlers
│   ├── data.js                 ← Veri modelleri & örnek veriler
│   ├── utils.js                ← Yardımcı fonksiyonlar
│   ├── components/
│   │   ├── JobsPanel.js        ← İş teklifleri ekranı
│   │   ├── ActivePanel.js      ← Aktif sefer takip ekranı
│   │   ├── EarningsPanel.js    ← Kazanç & geçmiş seferler
│   │   └── ProfilePage.js      ← Profil, belgeler, ayarlar
│   └── styles/
│       ├── variables.css       ← Design tokens & CSS değişkenleri
│       ├── base.css            ← Reset & utility sınıfları
│       ├── components.css      ← Yeniden kullanılabilir bileşenler
│       └── driver-app.css      ← Uygulama layout stilleri
└── README.md
```

---

## 🚀 Kurulum & Çalıştırma

Herhangi bir build tool gerekmez. Sadece `index.html` dosyasını bir web sunucusunda açın.

### Seçenek 1 — VS Code Live Server
1. VS Code'da projeyi açın
2. `index.html` sağ tıklayın → **"Open with Live Server"**

### Seçenek 2 — Python ile
```bash
cd konstrukt
python3 -m http.server 3000
# Tarayıcıda: http://localhost:3000
```

### Seçenek 3 — Node.js ile
```bash
npx serve .
```

> **Not:** ES Modules kullandığından `file://` protokolüyle direkt açmak **çalışmaz**, bir sunucu gerekir.

---

## 🎨 Tasarım Sistemi

### Renk Paleti
| Token | Hex | Kullanım |
|---|---|---|
| `--navy` | `#0d1b2a` | Ana arka plan, header |
| `--navy2` | `#1b2d42` | Stats, tabs arka planı |
| `--navy3` | `#243b55` | Kartlar sol kenar |
| `--steel` | `#4a6282` | İkincil metin |
| `--steel3` | `#8fa3bc` | Placeholder, etiketler |
| `--accent` | `#e8a020` | CTA, vurgu, aktif durum |
| `--success` | `#2a9d5c` | Onaylı, başarılı |
| `--danger` | `#d64141` | Acil, hata |

### Tipografi
- **Başlıklar & Rakamlar:** `Barlow Condensed` (700–800)
- **Arayüz metni:** `Barlow` (400–600)

---

## 📱 Ekranlar

| Ekran | Bileşen | Açıklama |
|---|---|---|
| İş Teklifleri | `JobsPanel.js` | TIR/kamyon sevkiyat tekliflerini listeler, filtreler, kabul/ret |
| Aktif Sefer | `ActivePanel.js` | Canlı sefer takibi, adım ilerletme, müşteri iletişimi |
| Kazanç | `EarningsPanel.js` | Aylık özet, sefer geçmişi, güzergah analizi |
| Profil | `ProfilePage.js` | Kişisel bilgiler, belgeler, performans, ayarlar |

---

## 🔌 API Entegrasyonu (Sonraki Adımlar)

Gerçek bir backend ile entegre etmek için `data.js` içindeki statik veriler API çağrılarıyla değiştirilmeli:

```js
// Örnek: İş tekliflerini API'dan çek
async function fetchJobs(driverId) {
  const res = await fetch(`/api/v1/jobs?driver=${driverId}&status=open`);
  return res.json();
}

// Örnek: Teklifi kabul et
async function acceptJob(jobId, driverId) {
  const res = await fetch(`/api/v1/jobs/${jobId}/accept`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ driverId })
  });
  return res.json();
}
```

### Önerilen Backend Stack
- **API:** Node.js + Express veya Python + FastAPI
- **Veritabanı:** PostgreSQL (seferler, sürücüler, araçlar)
- **Gerçek Zamanlı:** Socket.io veya Firebase (canlı konum, anlık teklifler)
- **Harita:** Google Maps Platform veya Mapbox GL JS
- **Kimlik Doğrulama:** JWT + refresh token

---

## 📋 Geliştirme Yol Haritası

- [ ] Müşteri uygulaması (sipariş oluşturma, araç seçimi)
- [ ] Admin paneli (sürücü yönetimi, rota optimizasyonu, gelir raporları)
- [ ] Gerçek zamanlı konum takibi (WebSocket / GPS)
- [ ] Push notification sistemi
- [ ] Belge OCR otomatik onay
- [ ] Rota optimizasyon algoritması (çoklu sefer planlama)
- [ ] React Native mobil uygulama

---

## 📄 Lisans

Proje KONSTRUKT İnşaat Lojistik A.Ş. için geliştirilmiştir. Tüm hakları saklıdır.
