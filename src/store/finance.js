import { reactive, watch } from 'vue';

const STORAGE_KEY = 'finown_data';

const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
  transactions: [],
  balance: 0,
  income: 0,
  expense: 0,
  notes: []
};

export const store = reactive({
  transactions: savedData.transactions,
  balance: savedData.balance,
  income: savedData.income,
  expense: savedData.expense,
  notes: savedData.notes || [],

  addTransaction(transaction) {
    const newTransaction = {
      id: Date.now(),
      date: transaction.date || new Date().toISOString(),
      source: transaction.source || '',
      ...transaction
    };

    this.transactions.unshift(newTransaction);

    if (transaction.type === 'income') {
      this.balance += transaction.amount;
      this.income += transaction.amount;
    } else {
      this.balance -= transaction.amount;
      this.expense += transaction.amount;
    }

    this.save();
  },

  deleteTransaction(id) {
    const index = this.transactions.findIndex(t => t.id === id);
    if (index !== -1) {
      const t = this.transactions[index];
      if (t.type === 'income') {
        this.balance -= t.amount;
        this.income -= t.amount;
      } else {
        this.balance += t.amount;
        this.expense -= t.amount;
      }
      this.transactions.splice(index, 1);
      this.save();
    }
  },

  addNote(content) {
    const newNote = {
      id: Date.now(),
      content: content,
      date: new Date().toISOString(),
      pinned: false
    };
    this.notes.unshift(newNote);
    this.save();
  },

  deleteNote(id) {
    const index = this.notes.findIndex(n => n.id === id);
    if (index !== -1) {
      this.notes.splice(index, 1);
      this.save();
    }
  },

  togglePinNote(id) {
    const note = this.notes.find(n => n.id === id);
    if (note) {
      note.pinned = !note.pinned;
      // Re-sort notes: pinned first, then by date desc
      this.notes.sort((a, b) => {
        if (a.pinned === b.pinned) {
          return new Date(b.date) - new Date(a.date);
        }
        return a.pinned ? -1 : 1;
      });
      this.save();
    }
  },

  save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      transactions: this.transactions,
      balance: this.balance,
      income: this.income,
      expense: this.expense,
      notes: this.notes
    }));
  }
});
