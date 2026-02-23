<script setup>
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Filler } from 'chart.js';
import { computed } from 'vue';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Filler);

const props = defineProps({
  transactions: Array
});

const chartData = computed(() => {
  // Simple grouping by date for the last 7 days or entries
  const last7 = props.transactions.slice(0, 7).reverse();
  
  return {
    labels: last7.map(t => new Date(t.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })),
    datasets: [
      {
        label: 'Flow Transaksi',
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderColor: '#6366f1',
        data: last7.map(t => t.type === 'income' ? t.amount : -t.amount),
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#6366f1',
        pointBorderColor: '#fff',
        pointHoverRadius: 6
      }
    ]
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#1e293b',
      titleColor: '#f8fafc',
      bodyColor: '#94a3b8',
      padding: 12,
      displayColors: false
    }
  },
  scales: {
    padding: 0,
    y: {
      grid: { color: 'rgba(255, 255, 255, 0.05)' },
      ticks: { color: '#94a3b8' }
    },
    x: {
      grid: { display: false },
      ticks: { color: '#94a3b8' }
    }
  }
};
</script>

<template>
  <div class="chart-container">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<style scoped>
.chart-container {
  height: 300px;
  width: 100%;
}
</style>
