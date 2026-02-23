import { reactive, watch } from 'vue';

const STORAGE_KEY = 'finown_data';

const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
  transactions: [],
  balance: 0,
  income: 0,
  expense: 0
};

export const store = reactive({
  transactions: savedData.transactions,
  balance: savedData.balance,
  income: savedData.income,
  expense: savedData.expense,

  addTransaction(transaction) {
    const newTransaction = {
      id: Date.now(),
      date: new Date().toISOString(),
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

  save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      transactions: this.transactions,
      balance: this.balance,
      income: this.income,
      expense: this.expense
    }));
  }
});
