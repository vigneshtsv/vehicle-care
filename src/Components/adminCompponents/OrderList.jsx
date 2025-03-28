import axios from "axios";
import React, { useEffect, useState } from "react";
import { CheckCircle, RefreshCcw, Loader } from "lucide-react";
import AdminTopBarPage from "./AdminTopBarPage";
import { Card } from "flowbite-react";
import Footer from "../UserComponents/Footer";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";


export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const {currentUser} = useSelector(state => state.user)
  console.log(currentUser);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/order/deliveryboydata`, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });

      if(response.status===200){
        setOrders(response.data.deliveryBoy);
        toast.success('OrderList for Admin Panel')
        console.log(response.data.deliveryBoy); 
      }
      
    } catch (error) {
      console.error("orders fetching Error:", error);
      toast.error('orderlist fetching Error:')
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getStatusIcon = (Status) => {
    if(Status === 'Completed'){
      return <CheckCircle className="text-green-500" size={20} />;
    }else if(Status === 'Waiting'){
      return <Loader className="text-yellow-500" size={20} />;
    }else if(Status === 'Processing'){
      return <RefreshCcw className="text-red-500 animate-spin dealy" size={20} />;
    }else{
      return null;
    }
  };

  return (
    <div>
      <AdminTopBarPage />
      <Card className="max-w-6xl mx-auto">
      <div class="border-2 border-red-500 p-4 rounded-lg text-lg font-semibold my-5">
        <h1 className="text-4xl font-bold text-gray-900 text-center">ORDER MANAGEGMENT</h1>
        </div>
        <div className="flex justify-between items-center mb-4">
          <table className="w-full text-sm text-left">
            <thead className="text-gray-700 bg-gray-50">
              <tr>
                <th className="px-6 bg-green-200 py-3 w-16">No</th>
                <th className="px-6 bg-green-100 py-3">Email</th>
                <th className="px-6 bg-green-200 py-3">Petrol Quantity</th>
                <th className="px-6 bg-green-100 py-3">Petrol Price</th>
                <th className="px-6 bg-green-200 py-3">Disel Quantity</th>
                <th className="px-6 bg-green-100 py-3">Disel Price</th>
                <th className="px-6 bg-green-200 py-3">Service_Type</th>
                <th className="px-6 bg-green-100 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={order.id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="px-6 bg-slate-100 py-4">{index + 1}</td>
                  <td className="px-6 bg-pink-100 py-4">{order.Email}</td>
                  <td className="px-6 bg-slate-100 py-4">{order.Petrol_Quantity != null && order.Petrol_Quantity >= 0 ?`${order.Petrol_Quantity} Ltr`:'-'}</td>
                  <td className="px-6 bg-pink-100 py-4">
                    {order.Petrol_Price != null && order.Petrol_Price >= 0 ? `₹ ${order.Petrol_Price.toFixed(2)}` : '-'}
                  </td>
                  <td className="px-6 bg-slate-100 py-4">{order.Disel_Quantity != null && order.Disel_Quantity >= 0 ?`${order.Disel_Quantity} Ltr`:'-'}</td>
                  <td className="px-6 bg-pink-100 py-4">
                  {order.Disel_Price != null && order.Disel_Price >= 0 ? `₹ ${order.Disel_Price.toFixed(2)}` : '-'}
                  </td>
                  <td className="px-6 bg-slate-100 py-4">{order.Service_Type === ''? '-' : `${order.Problem_Type}`}</td>
                  <td className="px-6 bg-pink-100 py-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.Status)}
                      <span>{order.Status}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <Footer />
    </div>
  );
}
