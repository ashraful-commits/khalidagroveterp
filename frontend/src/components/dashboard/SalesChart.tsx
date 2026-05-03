'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export function SalesChart() {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1f2937',
        padding: 12,
        titleFont: { size: 14, family: 'Inter' },
        bodyFont: { size: 13, family: 'Inter' },
        cornerRadius: 8,
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#6b7280', font: { size: 11 } }
      },
      y: {
        grid: { color: '#f3f4f6' },
        ticks: { color: '#6b7280', font: { size: 11 } }
      }
    }
  };

  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Revenue',
        data: [32, 45, 38, 55, 48, 62, 58],
        borderColor: '#16a34a',
        backgroundColor: 'rgba(22, 163, 74, 0.05)',
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#fff',
        pointBorderWidth: 2,
      },
      {
        label: 'Target',
        data: [40, 40, 40, 50, 50, 50, 60],
        borderColor: '#94a3b8',
        borderDash: [5, 5],
        tension: 0,
        pointRadius: 0,
      }
    ],
  };

  return <Line options={options} data={data} />;
}
