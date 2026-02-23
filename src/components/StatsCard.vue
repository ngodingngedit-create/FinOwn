<script setup>
defineProps({
  title: String,
  amount: Number,
  type: String, // 'balance', 'income', 'expense'
  icon: Object
});

const formatCurrency = (val) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(val);
};
</script>

<template>
  <div class="glass-card stat-card">
    <div class="header">
      <span class="title">{{ title }}</span>
      <div class="icon-wrap" :class="type">
        <component :is="icon" :size="20" />
      </div>
    </div>
    <div class="amount" :class="type">{{ formatCurrency(amount) }}</div>
  </div>
</template>

<style scoped>
.stat-card {
  flex: 1;
  min-width: 250px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.title {
  color: var(--text-muted);
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.icon-wrap {
  padding: 0.5rem;
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
}

.icon-wrap.balance { color: var(--primary); }
.icon-wrap.income { color: var(--success); }
.icon-wrap.expense { color: var(--danger); }

.amount {
  font-size: 1.75rem;
  font-weight: 700;
}

.amount.income { color: var(--success); }
.amount.expense { color: var(--danger); }
</style>
