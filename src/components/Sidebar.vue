<script setup>
import { LayoutDashboard, TrendingUp, TrendingDown } from 'lucide-vue-next';

defineEmits(['navigate']);
</script>

<template>
  <aside class="sidebar">
    <div class="logo">
      <h2 class="gradient-text">FinOwn</h2>
    </div>
    
    <nav>
      <button @click="$emit('navigate', 'dashboard')" class="nav-item">
        <LayoutDashboard :size="20" />
        <span>Dashboard</span>
      </button>
      <button @click="$emit('navigate', 'income')" class="nav-item">
        <TrendingUp :size="20" />
        <span>Tambah Pemasukan</span>
      </button>
      <button @click="$emit('navigate', 'expense')" class="nav-item">
        <TrendingDown :size="20" />
        <span>Tambah Pengeluaran</span>
      </button>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 280px;
  background: var(--bg-card);
  border-right: 1px solid var(--border);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.logo h2 {
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: -1px;
}

nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  color: var(--text-muted);
  background: transparent;
  width: 100%;
  text-align: left;
  border-radius: 0.75rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-main);
}

.nav-item.active {
  background: var(--primary);
  color: white;
}
</style>
