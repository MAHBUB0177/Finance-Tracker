// Dashboard.tsx
'use client';

import React from 'react';
import ChartList from './chart';


const transactions = [
  { id: '1', description: 'Grocery shopping', amount: -50.25, category: 'Food', date: '2025-04-01' },
  { id: '2', description: 'Monthly salary', amount: 3000, category: 'Salary', date: '2025-04-02' },
  { id: '3', description: 'Online purchase', amount: -75.0, category: 'Rent', date: '2025-04-03' },
  { id: '4', description: 'Freelance payment', amount: 1200, category: 'Entertainment', date: '2025-04-04' },
  { id: '5', description: 'Dinner at restaurant', amount: -80.5, category: 'Food', date: '2025-04-05' },
  { id: '6', description: 'Gym membership', amount: -45, category: 'Health', date: '2025-04-06' },
  { id: '7', description: 'Coffee', amount: -5, category: 'Food', date: '2025-04-07' },
  { id: '8', description: 'Train ticket', amount: -15.75, category: 'salary', date: '2025-04-08' },
  { id: '9', description: 'Internet bill', amount: -60, category: 'Utilities', date: '2025-04-09' },
  { id: '10', description: 'Electricity bill', amount: -120.45, category: 'Utilities', date: '2025-04-10' },
  { id: '11', description: 'Movie night', amount: -30, category: 'Entertainment', date: '2025-04-11' },
  { id: '12', description: 'Cashback', amount: 10, category: 'Income', date: '2025-04-12' },
  { id: '13', description: 'Book purchase', amount: -25, category: 'Education', date: '2025-04-13' },
  { id: '14', description: 'Bonus', amount: 500, category: 'Income', date: '2025-04-14' },
  { id: '15', description: 'Snacks', amount: -8, category: 'Food', date: '2025-04-15' },
];
const Dashboard = () => {
  const labels = ['Income', 'expenses ', ]
  const incomeMap: Record<string, number> = {};
  const expenseMap: Record<string, number> = {};

  transactions.forEach(({ amount, category }) => {
    const cat = category.toLowerCase();
    if (amount >= 0) {
      incomeMap[cat] = (incomeMap[cat] || 0) + amount;
    } else {
      expenseMap[cat] = (expenseMap[cat] || 0) + Math.abs(amount);
    }
  });

  const categories = Array.from(new Set([...Object.keys(incomeMap), ...Object.keys(expenseMap)]));
  const incomeData = categories.map(cat => incomeMap[cat] || 0);
  const expenseData = categories.map(cat => expenseMap[cat] || 0);

  const data = {
    labels: categories.map(cat => cat.charAt(0).toUpperCase() + cat.slice(1)),
    datasets: [
      {
        label: 'Income',
        data: incomeData,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Expenses',
        data: expenseData,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  // const data = {
  //   labels,
  //   datasets: [
  //     {
  //       label: 'My First Dataset',
  //       data: [65, 59, ],
  //       backgroundColor: [
  //         'rgba(255, 99, 132, 0.2)',
  //         'rgba(255, 159, 64, 0.2)',
  //         'rgba(255, 205, 86, 0.2)',
  //         'rgba(75, 192, 192, 0.2)',
  //         'rgba(54, 162, 235, 0.2)',
  //         'rgba(153, 102, 255, 0.2)',
  //         'rgba(201, 203, 207, 0.2)',
  //       ],
  //       borderColor: [
  //         'rgb(255, 99, 132)',
  //         'rgb(255, 159, 64)',
  //         'rgb(255, 205, 86)',
  //         'rgb(75, 192, 192)',
  //         'rgb(54, 162, 235)',
  //         'rgb(153, 102, 255)',
  //         'rgb(201, 203, 207)',
  //       ],
  //       borderWidth: 1,
  //     },
  //   ],
  // }
  return (
    <div className=''>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 pb-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Total Orders</h2>
          <p className="text-2xl font-bold text-green-600">12</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Pending Orders</h2>
          <p className="text-2xl font-bold text-yellow-600">3</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Total Spent</h2>
          <p className="text-2xl font-bold text-blue-600">$500.00</p>
        </div>
      </div>

      {/* Bar Chart */}
      <ChartList data={data} />
    </div>
  );
};

export default Dashboard;
