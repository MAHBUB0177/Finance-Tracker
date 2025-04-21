// Dashboard.tsx
'use client';

import React, { useEffect, useState } from 'react';
import ChartList from './chart';
import { GetTransactionsInfo } from '@/service/allApi';





type Transaction = {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string; // Or use `Date` if you're converting it to a Date object
};

const Dashboard = () => {


  const [transactionsList, setTransactionsList] = useState<Transaction[]>([]);
  const incomeMap: Record<string, number> = {};
  const expenseMap: Record<string, number> = {};

  transactionsList.forEach(({ amount, category }) => {
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

 

  const getCurrentUserInfo = async () => {
    try {
      const res = await GetTransactionsInfo();
      if (res?.data) {
        setTransactionsList(res?.data);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    getCurrentUserInfo();
  }, []);

  // Summary calculation
  const totalIncome = transactionsList
  .filter(tx => Number(tx.amount) > 0)
  .reduce((sum, tx) => sum + Number(tx.amount), 0);

const totalExpenses = transactionsList
  .filter(tx => Number(tx.amount) < 0)
  .reduce((sum, tx) => sum + Number(tx.amount), 0);

const balance = totalIncome + totalExpenses;

  return (
    <div className=''>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 pb-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Total Income</h2>
          <p className="text-2xl font-bold text-green-600">{totalIncome}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Total Expenses</h2>
          <p className="text-2xl font-bold text-yellow-600">{totalExpenses}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Total Balance</h2>
          <p className="text-2xl font-bold text-blue-600">{balance}</p>
        </div>
      </div>

      {/* Bar Chart */}
      <ChartList data={data} />
    </div>
  );
};

export default Dashboard;
