<script setup>
import { store } from '../store/finance';
import StatsCard from '../components/StatsCard.vue';
import FinanceChart from '../components/FinanceChart.vue';
import { Wallet, ArrowUpCircle, ArrowDownCircle, Clock, Trash2 } from 'lucide-vue-next';

const formatCurrency = (val) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(val);
};

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  });
};
</script>

<template>
  <div class="view-container">
    <header class="page-header">
      <h1>Financial <span class="gradient-text">Overview</span></h1>
      <p class="text-muted">Pantau kesehatan finansial Anda dalam satu dashboard.</p>
    </header>

    <div class="stats-grid">
      <StatsCard title="Total Saldo" :amount="store.balance" type="balance" :icon="Wallet" />
      <StatsCard title="Total Pemasukan" :amount="store.income" type="income" :icon="ArrowUpCircle" />
      <StatsCard title="Total Pengeluaran" :amount="store.expense" type="expense" :icon="ArrowDownCircle" />
    </div>

    <div class="main-grid">
      <div class="glass-card chart-section">
        <h3 class="section-title">Tren Keuangan</h3>
        <FinanceChart :transactions="store.transactions" />
      </div>

      <div class="glass-card activity-section">
        <div class="section-header">
          <h3 class="section-title">Aktivitas Terakhir</h3>
          <Clock :size="18" class="text-muted" />
        </div>
        
        <div class="transaction-list">
          <div v-if="store.transactions.length === 0" class="empty-state">
            Belum ada data transaksi.
          </div>
          <div v-for="t in store.transactions" :key="t.id" class="transaction-item">
            <div class="t-icon" :class="t.type">
              <ArrowUpCircle v-if="t.type === 'income'" :size="18" />
              <ArrowDownCircle v-else :size="18" />
            </div>
            <div class="t-details">
              <p class="t-note">{{ t.category || t.note }}</p>
              <p class="t-date">{{ formatDate(t.date) }}</p>
            </div>
            <div class="t-amount" :class="t.type">
              {{ t.type === 'income' ? '+' : '-' }} {{ formatCurrency(t.amount) }}
            </div>
            <button @click="store.deleteTransaction(t.id)" class="delete-btn">
              <Trash2 :size="16" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-header { margin-bottom: 2.5rem; }
.page-header h1 { font-size: 2.5rem; margin-bottom: 0.5rem; }

.stats-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.main-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
}

.section-title {
  margin-bottom: 1.5rem;
  font-size: 1.125rem;
  font-weight: 600;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.transaction-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 400px;
  overflow-y: auto;
  padding-right: 0.5rem;
}

.transaction-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border);
}

.transaction-item:last-child { border-bottom: none; }

.t-icon {
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
}
.t-icon.income { color: var(--success); }
.t-icon.expense { color: var(--danger); }

.t-details { flex: 1; }
.t-note { font-weight: 500; margin-bottom: 0.25rem; }
.t-date { font-size: 0.75rem; color: var(--text-muted); }

.t-amount { font-weight: 600; }
.t-amount.income { color: var(--success); }
.t-amount.expense { color: var(--danger); }

.delete-btn {
  background: transparent;
  color: var(--text-muted);
  opacity: 0;
  transition: opacity 0.2s;
}

.transaction-item:hover .delete-btn { opacity: 1; }
.delete-btn:hover { color: var(--danger); }

.empty-state {
  text-align: center;
  color: var(--text-muted);
  padding: 2rem;
}

@media (max-width: 1024px) {
  .main-grid { grid-template-columns: 1fr; }
}
</style>
