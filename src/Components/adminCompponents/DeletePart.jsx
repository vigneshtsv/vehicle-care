import React, { useState, useEffect } from 'react';

// Mock components - replace with your actual imports
const AdminTopBarPage = () => (
  <header className="bg-gray-800 text-white p-4">
    <h2 className="text-xl font-bold">Admin Panel</h2>
  </header>
);

const Footer = () => (
  <footer className="bg-gray-800 text-white p-4 text-center">
    <p>&copy; 2024 Admin Dashboard. All rights reserved.</p>
  </footer>
);

function AdminDashboardPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Fetch data from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/order/deliveryboydata');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setOrders(data.deliveryBoy || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError(err.message);
        // Fallback to sample data for demo
        setOrders([
          { id: 1, Email: 'vignesh@gmail.com', Quantity: 'petrol', Price: 95.50, 'Service Type': 'bike service', Status: 'Waiting' },
          { id: 2, Email: 'kamesh@gmail.com', Quantity: 'diesel', Price: 87.30, 'Service Type': 'bike service', Status: 'Processing' },
          { id: 3, Email: 'hari@gmail.com', Quantity: 'petrol', Price: 102.75, 'Service Type': 'bike service', Status: 'Completed' },
          { id: 4, Email: 'naganathan@gmail.com', Quantity: 'diesel', Price: 125.40, 'Service Type': 'bike service', Status: 'Waiting' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Calculate dashboard statistics
  const stats = {
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, order) => sum + (parseFloat(order.Price) || 0), 0),
    completedOrders: orders.filter(order => order.Status === 'Completed').length,
    pendingOrders: orders.filter(order => order.Status === 'Waiting' || order.Status === 'Processing').length,
    petrolOrders: orders.filter(order => order.Petrol_Quantity === 'petrol').length,
    dieselOrders: orders.filter(order => order.Disel_Quantity === 'diesel').length
  };

  // Filter orders based on search and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.Email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.Quantity?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order['Service Type']?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || order.Status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      case 'Waiting':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <AdminTopBarPage />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white text-xl">Loading dashboard data...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <AdminTopBarPage />
      
      <main className="p-6 min-h-screen">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Service Dashboard</h1>
          <p className="text-blue-200 text-lg">Welcome back, Admin</p>
          {error && (
            <div className="mt-4 p-4 bg-red-500 bg-opacity-20 border border-red-400 rounded-lg">
              <p className="text-red-200">⚠️ API Error: {error}. Showing sample data.</p>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-xl shadow-2xl p-6 transform hover:scale-105 transition-transform duration-200">
            <div className="flex items-center">
              <div className="p-3 bg-white bg-opacity-20 rounded-full">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M8 11v6a4 4 0 008 0v-6M8 11h8" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-white opacity-80">Total Orders</p>
                <h3 className="text-3xl font-bold text-white">{stats.totalOrders}</h3>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 rounded-xl shadow-2xl p-6 transform hover:scale-105 transition-transform duration-200">
            <div className="flex items-center">
              <div className="p-3 bg-white bg-opacity-20 rounded-full">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-white opacity-80">Total Revenue</p>
                <h3 className="text-3xl font-bold text-white">₹{stats.totalRevenue.toFixed(2)}</h3>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-xl shadow-2xl p-6 transform hover:scale-105 transition-transform duration-200">
            <div className="flex items-center">
              <div className="p-3 bg-white bg-opacity-20 rounded-full">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-white opacity-80">Completed</p>
                <h3 className="text-3xl font-bold text-white">{stats.completedOrders}</h3>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 rounded-xl shadow-2xl p-6 transform hover:scale-105 transition-transform duration-200">
            <div className="flex items-center">
              <div className="p-3 bg-white bg-opacity-20 rounded-full">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-white opacity-80">Pending</p>
                <h3 className="text-3xl font-bold text-white">{stats.pendingOrders}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Fuel Type Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl shadow-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white text-lg font-semibold">Petrol Orders</h4>
                <p className="text-3xl font-bold text-white">{stats.petrolOrders}</p>
              </div>
              <div className="text-6xl">⛽</div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-gray-600 to-gray-800 rounded-xl shadow-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white text-lg font-semibold">Diesel Orders</h4>
                <p className="text-3xl font-bold text-white">{stats.dieselOrders}</p>
              </div>
              <div className="text-6xl">🚛</div>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-2xl p-6 border border-white border-opacity-20">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-4 sm:mb-0">Service Orders</h2>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              {/* Search Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="All" className="text-gray-800">All Status</option>
                <option value="Waiting" className="text-gray-800">Waiting</option>
                <option value="Processing" className="text-gray-800">Processing</option>
                <option value="Completed" className="text-gray-800">Completed</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white border-opacity-20">
                  <th className="text-left py-3 px-4 text-white font-semibold">ID</th>
                  <th className="text-left py-3 px-4 text-white font-semibold">Customer Email</th>
                  <th className="text-left py-3 px-4 text-white font-semibold">Fuel Type</th>
                  <th className="text-left py-3 px-4 text-white font-semibold">Price</th>
                  <th className="text-left py-3 px-4 text-white font-semibold">Service</th>
                  <th className="text-left py-3 px-4 text-white font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order, index) => (
                    <tr key={order.id || index} className="border-b border-white border-opacity-10 hover:bg-white hover:bg-opacity-5 transition-colors duration-200">
                      <td className="py-4 px-4 text-white">{order.id || index + 1}</td>
                      <td className="py-4 px-4 text-white">{order.Email}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          order.Quantity === 'petrol' 
                            ? 'bg-amber-100 text-amber-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {order.Quantity}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-white font-semibold">₹{parseFloat(order.Price || 0).toFixed(2)}</td>
                      <td className="py-4 px-4 text-white">{order['Service Type']}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.Status)}`}>
                          {order.Status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-8 px-4 text-center text-white opacity-60">
                      No orders found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default AdminDashboardPage;