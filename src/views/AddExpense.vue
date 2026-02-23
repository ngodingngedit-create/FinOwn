<script setup>
import { ref, computed } from 'vue';
import { store } from '../store/finance';
import { ArrowLeft, MinusCircle, Pin, Trash2, Calendar, NotepadText } from 'lucide-vue-next';

const emit = defineEmits(['navigate']);

const amount = ref('');
const category = ref('Makanan');
const customCategory = ref('');
const source = ref('Bank');
const date = ref(new Date().toISOString().split('T')[0]);
const noteContent = ref('');

const categories = ['Makanan', 'Transportasi', 'Belanja', 'Kesehatan', 'Lainnya'];
const sources = ['Bank', 'E-Wallet', 'Tunai'];

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

const handleSubmit = () => {
  if (!amount.value || amount.value <= 0) return;
  
  const finalCategory = category.value === 'Lainnya' ? customCategory.value : category.value;
  
  store.addTransaction({
    type: 'expense',
    amount: parseFloat(amount.value),
    category: finalCategory || 'Expense',
    note: finalCategory || 'Pengeluaran',
    source: source.value,
    date: new Date(date.value).toISOString()
  });
  
  emit('navigate', 'dashboard');
};

const handleAddNote = () => {
  if (!noteContent.value.trim()) return;
  store.addNote(noteContent.value);
  noteContent.value = '';
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

    <div class="expense-grid">
      <!-- Expense Form -->
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
          
          <div class="grid-2">
            <div class="form-group">
              <label>Jenis Pengeluaran</label>
              <select v-model="category" required>
                <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
              </select>
            </div>

            <div class="form-group">
              <label>Sumber Dana</label>
              <select v-model="source" required>
                <option v-for="s in sources" :key="s" :value="s">{{ s }}</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label>Tanggal</label>
            <div class="input-with-icon">
              <Calendar :size="18" class="input-icon" />
              <input v-model="date" type="date" required>
            </div>
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

      <!-- Daily Notes Section -->
      <div class="glass-card notes-section">
        <div class="section-header">
          <div class="header-title">
            <NotepadText :size="20" class="text-primary" />
            <h3 class="section-title">Catatan Harian</h3>
          </div>
        </div>

        <div class="note-input-group">
          <textarea 
            v-model="noteContent" 
            placeholder="Tulis catatan hari ini..."
            rows="3"
          ></textarea>
          <button @click="handleAddNote" class="btn-primary btn-sm">
            Submit Note
          </button>
        </div>

        <div class="notes-list">
          <div v-if="store.notes.length === 0" class="empty-notes">
            Belum ada catatan hari ini.
          </div>
          <div v-for="note in store.notes" :key="note.id" class="note-item" :class="{ 'is-pinned': note.pinned }">
            <div class="note-header">
              <span class="note-date">{{ formatDate(note.date) }}</span>
              <div class="note-actions">
                <button @click="store.togglePinNote(note.id)" class="action-btn" :class="{ 'active': note.pinned }">
                  <Pin :size="16" />
                </button>
                <button @click="store.deleteNote(note.id)" class="action-btn delete">
                  <Trash2 :size="16" />
                </button>
              </div>
            </div>
            <p class="note-content">{{ note.content }}</p>
          </div>
        </div>
      </div>
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

.expense-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 2rem;
  align-items: start;
}

.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-card {
  width: 100%;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
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

.input-with-icon {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 1rem;
  color: var(--text-muted);
}

.input-with-icon input {
  padding-left: 3rem;
  width: 100%;
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

/* Notes Section Styles */
.notes-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: 100%;
  max-height: 600px;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.note-input-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

textarea {
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  padding: 1rem;
  color: var(--text-main);
  font-family: inherit;
  resize: none;
}

textarea:focus {
  outline: none;
  border-color: var(--primary);
  background: rgba(255, 255, 255, 0.08);
}

.btn-sm {
  padding: 0.6rem 1rem;
  font-size: 0.875rem;
  align-self: flex-end;
}

.notes-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
  padding-right: 0.5rem;
}

.note-item {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  padding: 1rem;
  transition: all 0.2s;
}

.note-item.is-pinned {
  border-color: var(--primary);
  background: rgba(var(--primary-rgb), 0.05);
}

.note-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.note-date {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.note-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  background: transparent;
  color: var(--text-muted);
  padding: 0.25rem;
  border-radius: 0.35rem;
  transition: all 0.2s;
}

.action-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-main);
}

.action-btn.active {
  color: var(--primary);
}

.action-btn.delete:hover {
  color: var(--danger);
  background: rgba(var(--danger-rgb), 0.1);
}

.note-content {
  font-size: 0.9375rem;
  line-height: 1.5;
  white-space: pre-wrap;
}

.empty-notes {
  text-align: center;
  color: var(--text-muted);
  padding: 2rem;
  font-style: italic;
}

@media (max-width: 1024px) {
  .expense-grid {
    grid-template-columns: 1fr;
  }
}
</style>
