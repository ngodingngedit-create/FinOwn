<script setup>
import { ref } from 'vue';
import { store } from '../store/finance';
import { ArrowLeft, MinusCircle } from 'lucide-vue-next';

const emit = defineEmits(['navigate']);

const amount = ref('');
const category = ref('Makanan');
const customCategory = ref('');

const categories = ['Makanan', 'Transportasi', 'Belanja', 'Kesehatan', 'Lainnya'];

const handleSubmit = () => {
  if (!amount.value || amount.value <= 0) return;
  
  const finalCategory = category.value === 'Lainnya' ? customCategory.value : category.value;
  
  store.addTransaction({
    type: 'expense',
    amount: parseFloat(amount.value),
    category: finalCategory || 'Expense',
    note: finalCategory || 'Pengeluaran'
  });
  
  emit('navigate', 'dashboard');
};
</script>

<template>
  <div class="view-container">
    <button @click="$emit('navigate', 'dashboard')" class="back-link">
      <ArrowLeft :size="18" /> Back to Dashboard
    </button>

    <header class="page-header">
      <h1>Catat <span class="gradient-text">Pengeluaran</span></h1>
      <p class="text-muted">Pantau terus pengeluaran agar tetap hemat dan terkendali.</p>
    </header>

    <div class="glass-card form-card">
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>Jumlah Pengeluaran (IDR)</label>
          <input 
            v-model="amount" 
            type="number" 
            placeholder="Contoh: 15000" 
            required
            min="1"
          >
        </div>
        
        <div class="form-group">
          <label>Jenis Pengeluaran</label>
          <select v-model="category" required>
            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
          </select>
        </div>

        <transition name="fade">
          <div v-if="category === 'Lainnya'" class="form-group">
            <label>Keterangan Lainnya</label>
            <input 
              v-model="customCategory" 
              type="text" 
              placeholder="Contoh: Parkir, Sedekah"
              required
            >
          </div>
        </transition>

        <button type="submit" class="btn-primary w-full expense-btn">
          <MinusCircle :size="20" /> Simpan Pengeluaran
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.back-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  color: var(--text-muted);
  margin-bottom: 2rem;
  padding: 0;
}
.back-link:hover { color: var(--text-main); }

.page-header { margin-bottom: 2.5rem; }
.page-header h1 { font-size: 2.5rem; margin-bottom: 0.5rem; }

.form-card {
  max-width: 500px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-muted);
}

.w-full {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1rem;
}

.expense-btn {
  background: var(--danger);
}
.expense-btn:hover {
  background: #dc2626;
}
</style>
