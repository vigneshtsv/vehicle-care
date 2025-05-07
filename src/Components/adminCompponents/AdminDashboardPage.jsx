import React, { useState } from 'react'
import AdminTopBarPage from './AdminTopBarPage.jsx'
import  Footer from '../UserComponents/Footer.jsx'


const recentOrders = [
  { id: 1, customer: 'vignesh', product: 'Product A', amount: 120, status: 'Completed' },
  { id: 2, customer: 'kamesh', product: 'Product B', amount: 200, status: 'Pending' },
  { id: 3, customer: 'hari harasuthan', product: 'Product C', amount: 150, status: 'Processing' },
  { id: 4, customer: 'naganathan', product: 'Product D', amount: 180, status: 'Completed' },
]



function AdminDashboardPage() {
  const[users, setUsers] = useState([]);
    
        
  return (
    
    <div>
      <AdminTopBarPage />
      <main className="p-6 min-h-screen admindashboardbg relative">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-white">Welcome back, Admin</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-r from-yellow-500 via-blue-500 to-yellow-500 relative border border-blue-700  rounded-lg shadow-2xl p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-full">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-white">Total Users</p>
                <h3 className="text-2xl font-bold text-white">{recentOrders.length}</h3>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-500 via-blue-500 to-yellow-500 relative border border-blue-700  rounded-lg shadow-2xl p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-full">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-white">Total Revenue</p>
                <h3 className="text-2xl font-bold text-white">$45,678</h3>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-500 via-blue-500 to-yellow-500 relative border border-blue-700  rounded-lg shadow-2xl p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-full">
                <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-white">Total Orders</p>
                <h3 className="text-2xl font-bold text-white">567</h3>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-500 via-blue-500 to-yellow-500 relative border border-blue-700  rounded-lg shadow-2xl p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-full">
                <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-white">Growth</p>
                <h3 className="text-2xl font-bold text-white">+23%</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Order Table */}
        <div className="bg-gradient-to-r from-teal-500 via-purple-500 to-yellow-500 relative rounded-lg shadow-lg p-6">
          <h5 className="text-xl font-bold mb-4">Recent Orders</h5>
          <div className="relative overflow-x-auto">
            <div className="mb-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search orders..."
                  className="block w-full p-2 pl-10 text-sm text-white border border-gray-300 rounded-3xl bg-transparent placeholder:text-white focus:ring-blue-500 focus:border-blue-500 shadow-xl"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-slate-300 border border-white">
                  <tr>
                    <th scope="col" className="px-6 py-3">Customer</th>
                    <th scope="col" className="px-6 py-3">Product</th>
                    <th scope="col" className="px-6 py-3">Amount</th>
                    <th scope="col" className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="bg-transparent border border-white shadow-lg hover:bg-gray-300 hover:text-gray-900 text-white">
                      <td className="px-6 py-4">{order.customer}</td>
                      <td className="px-6 py-4">{order.product}</td>
                      <td className="px-6 py-4">${order.amount}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${
                            order.status === 'Completed'
                              ? 'bg-green-100 text-green-800'
                              : order.status === 'Pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default AdminDashboardPage