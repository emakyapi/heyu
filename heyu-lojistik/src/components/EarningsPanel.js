// ============================================
// KONSTRUKT — Earnings Panel Component
// ============================================

import { EARNINGS_HISTORY, DRIVER_PROFILE } from '../data.js';
import { formatPrice } from '../utils.js';

export function renderEarningsPanel() {
  return `
    <div id="panel-earn" class="panel hidden">

      <!-- Hero Card -->
      <div class="earn-hero">
        <div class="earn-hero__week">Bu Ay — Haziran 2026</div>
        <div class="earn-hero__amount">${formatPrice(DRIVER_PROFILE.monthlyEarning)}</div>
        <div class="earn-hero__change">Geçen aya göre <span>+%14</span></div>
        <div class="stat-grid-dark">
          <div class="stat-cell-dark">
            <div class="stat-cell-dark__val">18</div>
            <div class="stat-cell-dark__lbl">Sefer</div>
          </div>
          <div class="stat-cell-dark">
            <div class="stat-cell-dark__val">${DRIVER_PROFILE.acceptanceRate}%</div>
            <div class="stat-cell-dark__lbl">Kabul</div>
          </div>
          <div class="stat-cell-dark">
            <div class="stat-cell-dark__val">312 t</div>
            <div class="stat-cell-dark__lbl">Toplam Yük</div>
          </div>
        </div>
      </div>

      <!-- History -->
      <div class="sec-label">Son Seferler</div>
      <div class="card" style="padding:12px 13px;margin-bottom:10px">
        ${EARNINGS_HISTORY.map(renderTxItem).join('')}
      </div>

      <!-- Report Button -->
      <button
        onclick="alert('Güzergah analizi yakında! (API entegrasyonu gerektirir)')"
        class="btn btn--primary btn--full"
        style="margin-bottom:14px;font-size:13px;font-weight:700;letter-spacing:0.5px;padding:13px">
        Detaylı Rapor &amp; Güzergah Analizi ↗
      </button>
    </div>
  `;
}

function renderTxItem(item) {
  return `
    <div class="tx-item">
      <div class="tx-icon"><i class="ti ti-${item.icon}"></i></div>
      <div class="tx-info">
        <div class="tx-title">
          ${item.from} → ${item.to}
          &nbsp;<span class="badge badge--steel">${item.type}</span>
        </div>
        <div class="tx-sub">${item.cargo} &nbsp;·&nbsp; ${item.weightTon} ton &nbsp;·&nbsp; ${item.date}</div>
      </div>
      <div class="tx-amount">+${formatPrice(item.amount)}</div>
    </div>
  `;
}
