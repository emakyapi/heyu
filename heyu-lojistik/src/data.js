// ============================================
// KONSTRUKT — Job Data Model & Sample Data
// ============================================

/**
 * @typedef {Object} Job
 * @property {string} id
 * @property {'tir'|'kamyon'} vehicleType
 * @property {'acil'|'normal'|'planli'} urgency
 * @property {number} price
 * @property {'fixed'|'negotiable'} priceType
 * @property {string} origin
 * @property {string} originDetail
 * @property {string} destination
 * @property {string} destinationDetail
 * @property {number} distanceKm
 * @property {string} duration
 * @property {string} route
 * @property {string} cargoType
 * @property {number} weightTon
 * @property {string[]} tags
 * @property {string} scheduledFor
 * @property {boolean} prepaid
 * @property {number} postedMinutesAgo
 */

export const SAMPLE_JOBS = [
  {
    id: 'JOB-001',
    vehicleType: 'tir',
    urgency: 'acil',
    price: 8400,
    priceType: 'fixed',
    origin: 'Gaziantep OSB, Çelik Yapı Fabrikası',
    originDetail: 'Yükleme — Hazır beton kalıp',
    destination: 'Adana, Seyhan Konut Şantiyesi',
    destinationDetail: 'Teslim — Vinç bekleniyor',
    distanceKm: 318,
    duration: '~4s 10dk',
    route: 'TEM Otoyolu',
    cargoType: 'Hazır Beton',
    weightTon: 22,
    tags: ['beton', 'acil'],
    scheduledFor: 'Bugün 14:00',
    prepaid: false,
    postedMinutesAgo: 3,
  },
  {
    id: 'JOB-002',
    vehicleType: 'kamyon',
    urgency: 'planli',
    price: 3200,
    priceType: 'fixed',
    origin: 'İstanbul, Başakşehir Agrega Deposu',
    originDetail: 'Yükleme — Kırma taş, agrega',
    destination: 'Esenyurt, Mega Rezidans Şantiyesi',
    destinationDetail: 'Teslim — Zemin kat temel dökümü',
    distanceKm: 47,
    duration: '~55 dk',
    route: 'E-80',
    cargoType: 'Agrega',
    weightTon: 14,
    tags: ['beton', 'kamyon'],
    scheduledFor: 'Yarın 08:00',
    prepaid: false,
    postedMinutesAgo: 12,
  },
  {
    id: 'JOB-003',
    vehicleType: 'tir',
    urgency: 'normal',
    price: 12750,
    priceType: 'fixed',
    origin: 'Ankara, Ostim Çelik Profil A.Ş.',
    originDetail: 'Yükleme — Çelik I-kiriş, bağlantı',
    destination: 'İzmir, Çiğli Endüstri Bölgesi',
    destinationDetail: 'Teslim — Fabrika çelik iskelet',
    distanceKm: 470,
    duration: '~5s 20dk',
    route: 'O-4 / TEM',
    cargoType: 'Çelik Profil',
    weightTon: 24,
    tags: ['tir'],
    scheduledFor: '3 gün sonra',
    prepaid: true,
    postedMinutesAgo: 28,
  },
  {
    id: 'JOB-004',
    vehicleType: 'kamyon',
    urgency: 'normal',
    price: 1850,
    priceType: 'fixed',
    origin: 'Bursa, Nilüfer Tuğla Fabrikası',
    originDetail: 'Yükleme — Tuğla, briket blok',
    destination: 'Bursa, Osmangazi Okul Şantiyesi',
    destinationDetail: 'Teslim — Kâgir duvar inşaatı',
    distanceKm: 22,
    duration: '~30 dk',
    route: 'D-200',
    cargoType: 'Tuğla',
    weightTon: 8,
    tags: ['kamyon'],
    scheduledFor: 'Bugün 17:00',
    prepaid: false,
    postedMinutesAgo: 45,
  },
];

export const DRIVER_PROFILE = {
  id: 'DRV-00882',
  initials: 'MK',
  name: 'Mehmet Karataş',
  vehicleModel: 'MAN TGX 18.460',
  plate: '34 KNT 881',
  vehicleType: 'TIR',
  capacityTon: 24,
  capacityM3: 92,
  rating: 4.8,
  totalTrips: 243,
  monthlyEarning: 18450,
  acceptanceRate: 91,
  memberSince: '8 ay',
  city: 'İstanbul',
};

export const EARNINGS_HISTORY = [
  { id: 1, from: 'Ankara', to: 'İzmir', type: 'TIR', cargo: 'Çelik Profil', weightTon: 24, amount: 12750, date: 'Bugün', icon: 'truck' },
  { id: 2, from: 'Konya', to: 'Ankara', type: 'Kamyon', cargo: 'Hazır Beton Kalıp', weightTon: 16, amount: 4100, date: 'Dün', icon: 'building-factory-2' },
  { id: 3, from: 'Kocaeli', to: 'İstanbul', type: 'Kamyon', cargo: 'Agrega / Kırma Taş', weightTon: 18, amount: 1600, date: 'Dün', icon: 'mountain' },
  { id: 4, from: 'Sakarya', to: 'Bursa', type: 'TIR', cargo: 'Demir Donatı', weightTon: 22, amount: 7200, date: '2 gün önce', icon: 'tools' },
];
