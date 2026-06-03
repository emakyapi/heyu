// ============================================
// KONSTRUKT — Jobs Panel Component
// ============================================

import { SAMPLE_JOBS } from '../data.js';
import { formatPrice, minutesAgoLabel, renderBadge } from '../utils.js';

let jobs = [...SAMPLE_JOBS];
let activeFilter = 'all';

export function renderJobsPanel() {
  return `
    <div id="panel-jobs" class="panel">

      <!-- Notification Bar -->
      <div id="notif-bar" class="notif-bar">
        <div class="notif-bar__dot"></div>
        <div class="notif-bar__text">Yeni acil sevkiyat — Gaziantep OSB, 3.8 t hazır beton</div>
        <button class="notif-bar__close" onclick="window.closeNotif()">Kapat</button>
      </div>

      <!-- Filters -->
      <div class="sec-label" style="margin-top:48px">Filtrele</div>
      <div class="filter-scroll" id="filter-scroll">
        ${renderFilters()}
      </div>

      <!-- Job List -->
      <div class="sec-label">Açık Teklifler</div>
      <div id="jobs-list">
        ${jobs.map(renderJobCard).join('')}
      </div>
    </div>
  `;
}

function renderFilters() {
  const filters = [
    { key: 'all', label: `Tümü (${SAMPLE_JOBS.length})` },
    { key: 'tir', label: 'TIR' },
    { key: 'kamyon', label: 'Kamyon' },
    { key: 'acil', label: '⚡ Acil' },
    { key: 'beton', label: 'Beton / Agrega' },
  ];
  return filters
    .map(f => `<button class="filter-pill${f.key === activeFilter ? ' active' : ''}"
        onclick="window.filterJobs('${f.key}', this)">${f.label}</button>`)
    .join('');
}

function renderJobCard(job) {
  const urgencyBadge = job.urgency === 'acil'
    ? `<span class="badge badge--red">⚡ Acil</span>` : '';
  const prepaidBadge = job.prepaid
    ? `<span class="badge badge--green">Ön Ödemeli</span>` : '';
  const vehicleBadge = `<span class="badge badge--navy">${job.vehicleType.toUpperCase()}</span>`;
  const timeBadge = `<span class="badge badge--steel">${minutesAgoLabel(job.postedMinutesAgo)}</span>`;

  const cardClass = job.urgency === 'acil' ? 'job-card job-card--priority' : 'job-card';

  return `
    <div class="${cardClass}" data-id="${job.id}" data-type="${job.tags.join(' ')}">
      <div class="job-card__header">
        <div class="job-card__badges">
          ${urgencyBadge}
          ${vehicleBadge}
          ${prepaidBadge}
          ${timeBadge}
        </div>
        <div class="job-card__price">${formatPrice(job.price)} <span>sabit</span></div>
      </div>

      <div class="route-block">
        <div class="route-point">
          <div class="rp-dot rp-dot--origin"></div>
          <div>
            <div class="rp-address">${job.origin}</div>
            <div class="rp-sub">${job.originDetail}</div>
          </div>
        </div>
        <div class="route-point">
          <div class="rp-line"><div class="rp-line-inner"></div></div>
          <div class="rp-distance">${job.distanceKm} km &nbsp;·&nbsp; ${job.duration} &nbsp;·&nbsp; ${job.route}</div>
        </div>
        <div class="route-point">
          <div class="rp-dot rp-dot--dest"></div>
          <div>
            <div class="rp-address">${job.destination}</div>
            <div class="rp-sub">${job.destinationDetail}</div>
          </div>
        </div>
      </div>

      <div class="job-card__cargo-row">
        <div class="cargo-chip"><i class="ti ti-weight"></i> ${job.weightTon} ton</div>
        <div class="cargo-chip"><i class="ti ti-building-factory-2"></i> ${job.cargoType}</div>
        <div class="cargo-chip"><i class="ti ti-clock"></i> ${job.scheduledFor}</div>
      </div>

      <div class="job-card__actions">
        <button class="btn btn--accent btn--full" onclick="window.acceptJob('${job.id}', this)">
          <i class="ti ti-check"></i> Kabul Et
        </button>
        <button class="btn btn--ghost btn--icon" onclick="window.rejectJob('${job.id}', this)" title="Reddet">
          <i class="ti ti-x"></i>
        </button>
      </div>
    </div>
  `;
}

// ---- Exported handlers ----
export function filterJobs(type, btn) {
  activeFilter = type;
  document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('#jobs-list .job-card').forEach(card => {
    if (type === 'all') { card.style.display = ''; return; }
    card.style.display = card.dataset.type.includes(type) ? '' : 'none';
  });
}

export function rejectJob(id, btn) {
  const card = btn.closest('.job-card');
  card.style.transition = 'all 0.3s';
  card.style.opacity = '0';
  card.style.transform = 'translateX(20px)';
  setTimeout(() => {
    card.remove();
    jobs = jobs.filter(j => j.id !== id);
  }, 300);
}

export function closeNotif() {
  const el = document.getElementById('notif-bar');
  if (el) el.classList.add('hidden');
}
