<script setup>
import { ref } from 'vue';
import Sidebar from './components/Sidebar.vue';
import Dashboard from './views/Dashboard.vue';
import AddIncome from './views/AddIncome.vue';
import AddExpense from './views/AddExpense.vue';

const currentView = ref('dashboard');

const navigate = (view) => {
  currentView.value = view;
};
</script>

<template>
  <div class="app-layout">
    <Sidebar @navigate="navigate" :current-view="currentView" />
    
    <main class="main-content">
      <transition name="fade" mode="out-in">
        <component 
          :is="currentView === 'dashboard' ? Dashboard : (currentView === 'income' ? AddIncome : AddExpense)" 
          @navigate="navigate"
        />
      </transition>
    </main>
  </div>
</template>

<style>
.app-layout {
  display: flex;
  width: 100%;
}

.main-content {
  flex: 1;
  padding: 3rem;
  max-width: 1400px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .app-layout {
    flex-direction: column;
  }
  .main-content {
    padding: 1.5rem;
    padding-bottom: 80px;
  }
}
</style>
