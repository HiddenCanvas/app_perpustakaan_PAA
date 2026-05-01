import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const DashboardStats = () => {

  const [stats, setStats] = useState(null);

  useEffect(() => {

    const fetchStats = async () => {

      try {

        const res = await api.get('/members/dashboard');

        setStats(res.data.data.stats);

      } catch (err) {
        console.error(err);
      }

    };

    fetchStats();

  }, []);

  if (!stats) {
    return <p>Loading statistik...</p>;
  }

  return (

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

      <div className="bg-white p-5 rounded-xl shadow">
        <h3 className="text-gray-500">Total Buku</h3>
        <p className="text-3xl font-bold">
          {stats.totalBooks}
        </p>
      </div>

      <div className="bg-white p-5 rounded-xl shadow">
        <h3 className="text-gray-500">Member</h3>
        <p className="text-3xl font-bold">
          {stats.totalMembers}
        </p>
      </div>

      <div className="bg-white p-5 rounded-xl shadow">
        <h3 className="text-gray-500">Peminjaman</h3>
        <p className="text-3xl font-bold">
          {stats.totalLoans}
        </p>
      </div>

      <div className="bg-white p-5 rounded-xl shadow">
        <h3 className="text-gray-500">Terlambat</h3>
        <p className="text-3xl font-bold text-red-500">
          {stats.overdueLoans}
        </p>
      </div>

    </div>
    
  );
};

export default DashboardStats;