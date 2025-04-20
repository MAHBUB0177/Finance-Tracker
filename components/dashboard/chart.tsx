import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartData,
    ChartOptions,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
  import React from 'react';
  
  // ✅ REGISTER the required components
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
  
  type Props = {
    data: ChartData<'bar'>;
  };
  
  const ChartList: React.FC<Props> = ({ data }) => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Income vs. Expenses by Category',
          },
        },
      };
  
    return (
      <div >
        <div className="w-full h-[400px]">
      <Bar data={data} options={options} />
    </div>
      </div>
    );
  };
  
  export default ChartList;
  