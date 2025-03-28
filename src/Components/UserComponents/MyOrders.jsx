import React, { useState, useEffect } from 'react';
import { Card, Table, Badge, Spinner, Modal, Button } from 'flowbite-react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import TopBar from './TopBar';


const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPopup,setIsPopup] = useState(false)
  const [ selectedOrder,setSelectedOrder ] =useState(false)
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchOrders = async () => {
      const userId = currentUser.Email;
      try {
        const response = await axios.get(`http://localhost:5000/api/order/getmyorders/${userId}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = response.data.orderList;
        const filter = data.filter((order) => order.Email === currentUser.Email);
        setOrders(filter);
        console.log(filter);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch orders');
        setLoading(false);
      }
    };
    fetchOrders();
  }, [currentUser.Email]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-800 rounded">
        {error}
      </div>
    );
  }

  const handleViewDetails = (order) => {
     setIsPopup(true);
     setSelectedOrder(order);
  }

  const handleClosePopup = () => {
    setIsPopup(false);
    setSelectedOrder(null);
  }

  return (
    <>
    <TopBar />
    <div className="container mx-auto px-4 py-8">
      <Card>
        <h2 className="text-2xl font-bold mb-6">My Orders</h2>
        {orders.length === 0 ? (
          <p className="text-gray-600">No orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <Table striped>
              <Table.Head>
                <Table.HeadCell>Order ID</Table.HeadCell>
                <Table.HeadCell>Petrol Quantity</Table.HeadCell>
                <Table.HeadCell>Petrol Price</Table.HeadCell>
                <Table.HeadCell>Diesel Quantity</Table.HeadCell>
                <Table.HeadCell>Diesel Price</Table.HeadCell>
                <Table.HeadCell>Service Type</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell>
                  <span className="sr-only">Actions</span>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {orders.map((order,index) => (
                  <Table.Row key={order._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {index + 1}
                    </Table.Cell>
                    <Table.Cell className='bg-gray-100'>
                      {order.Petrol_Quantity ? `${order.Petrol_Quantity} L` : '-'}
                    </Table.Cell>
                    <Table.Cell className='bg-gray-100'>
                      {order.Petrol_Price ? `$${order.Petrol_Price.toFixed(2)}` : '-'}
                    </Table.Cell>
                    <Table.Cell className='bg-green-100'>
                      {order.Disel_Quantity ? `${order.Disel_Quantity} L` : '-'}
                    </Table.Cell>
                    <Table.Cell className='bg-green-100'>
                      {order.Disel_Price ? `$${order.Disel_Price.toFixed(2)}` : '-'}
                    </Table.Cell>
                    <Table.Cell className='bg-orange-100'>
                      {order.Service_Type || '-'}
                    </Table.Cell>
                    <Table.Cell>
                      <Badge 
                        color={
                          order.Status === 'Completed' ? 'success' : 
                          order.Status === 'Pending' ? 'warning' : 
                          'gray'
                        }
                      >
                        {order.Status}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell className='bg-red-100'>
                      <button 
                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                        onClick={() => handleViewDetails(order)}
                      >
                        View Details
                      </button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        )}
      </Card>

      {/* ViewDetails Popup */}
      {selectedOrder && (
        <Modal show={isPopup} size="xl" popup onClose={handleClosePopup}>
          <Modal.Header>Order Details</Modal.Header>
          <Modal.Body>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Order ID</p>
                  <p className="font-semibold">{selectedOrder._id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <Badge 
                    color={
                      selectedOrder.Status === 'Completed' ? 'success' : 
                      selectedOrder.Status === 'Pending' ? 'warning' : 
                      'gray'
                    }
                  >
                    {selectedOrder.Status}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Petrol Quantity</p>
                  <p>{selectedOrder.Petrol_Quantity ? `${selectedOrder.Petrol_Quantity} L` : 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Petrol Price</p>
                  <p>{selectedOrder.Petrol_Price ? `$${selectedOrder.Petrol_Price.toFixed(2)}` : 'N/A'}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Diesel Quantity</p>
                  <p>{selectedOrder.Disel_Quantity ? `${selectedOrder.Disel_Quantity} L` : 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Diesel Price</p>
                  <p>{selectedOrder.Disel_Price ? `$${selectedOrder.Disel_Price.toFixed(2)}` : 'N/A'}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Service Type</p>
                  <p>{selectedOrder.Service_Type || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p>{new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button outline gradientDuoTone="purpleToBlue" onClick={handleClosePopup}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
    </>
  );
};

export default MyOrders;