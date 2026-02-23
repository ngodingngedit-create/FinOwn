<script setup>
import { ref } from 'vue';
import { LayoutDashboard, TrendingUp, TrendingDown, ChevronLeft, ChevronRight } from 'lucide-vue-next';

defineProps({
  currentView: String
});

defineEmits(['navigate']);

const isCollapsed = ref(false);

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};
</script>

<template>
  <aside class="sidebar" :class="{ 'collapsed': isCollapsed }">
    <div class="sidebar-header">
      <div class="logo">
        <h2 class="gradient-text">{{ isCollapsed ? 'F' : 'FinOwn' }}</h2>
      </div>
      <button @click="toggleSidebar" class="toggle-btn" :title="isCollapsed ? 'Expand' : 'Collapse'">
        <ChevronLeft v-if="!isCollapsed" :size="18" />
        <ChevronRight v-else :size="18" />
      </button>
    </div>
    
    <nav>
      <button 
        @click="$emit('navigate', 'dashboard')" 
        class="nav-item" 
        :class="{ 'active': currentView === 'dashboard' }"
        title="Dashboard"
      >
        <LayoutDashboard :size="20" />
        <span v-if="!isCollapsed">Dashboard</span>
      </button>
      <button 
        @click="$emit('navigate', 'income')" 
        class="nav-item" 
        :class="{ 'active': currentView === 'income' }"
        title="Tambah Pemasukan"
      >
        <TrendingUp :size="20" />
        <span v-if="!isCollapsed">Tambah Pemasukan</span>
      </button>
      <button 
        @click="$emit('navigate', 'expense')" 
        class="nav-item" 
        :class="{ 'active': currentView === 'expense' }"
        title="Tambah Pengeluaran"
      >
        <TrendingDown :size="20" />
        <span v-if="!isCollapsed">Tambah Pengeluaran</span>
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
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  height: 100vh;
  position: sticky;
  top: 0;
}

.sidebar.collapsed {
  width: 88px;
  padding: 2rem 1rem;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 40px;
}

.sidebar.collapsed .sidebar-header {
  justify-content: center;
  flex-direction: column;
  gap: 1.5rem;
}

.logo h2 {
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: -1px;
  transition: all 0.3s;
}

.sidebar.collapsed .logo h2 {
  font-size: 2rem;
}

.toggle-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border);
  color: var(--text-muted);
  width: 32px;
  height: 32px;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.toggle-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-main);
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
  white-space: nowrap;
  overflow: hidden;
}

.sidebar.collapsed .nav-item {
  justify-content: center;
  padding: 1rem 0;
  gap: 0;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-main);
}

.nav-item.active {
  background: var(--primary);
  color: white;
}

.nav-item span {
  transition: opacity 0.2s;
}

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
    padding: 1.5rem;
  }
  .sidebar.collapsed {
    width: 100%;
  }
  .toggle-btn {
    display: none;
  }
}
</style>
