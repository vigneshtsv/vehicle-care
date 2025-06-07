// import React, { useState, useEffect } from 'react';
// import { Button,Card,Label,TextInput,Select,Modal,Alert,Table,Spinner } from 'flowbite-react';
// import {HiOutlineExclamationCircle,HiTrash,HiPencil,HiPlus} from 'react-icons/hi';
// import AdminTopBarPage from './AdminTopBarPage';
// import { useDispatch } from 'react-redux';
// import axios from 'axios';
// import Footer from '../UserComponents/Footer';
// import { toast } from 'react-toastify';


// const ROLES = ['Admin', 'Customer', 'PetrolStation', 'DeliveryBoy', 'ServiceMan'];

// const initialFormData = {
//   FirstName: '',
//   LastName: '',
//   Email: '',
//   PhoneNumber: '',
//   Role: ROLES[0],
//   Password: ''
// };

// const UserList = () => {
//   // State management
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [selectedRole, setSelectedRole] = useState('All');
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentUser, setCurrentUser] = useState(initialFormData);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isFormModalOpen, setIsFormModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [userToDelete, setUserToDelete] = useState(null);
  
//   //console.log(currentUser.Email);
  
//   console.log(currentUser);
  
//   // API base URL - should be in environment variable
//   const API_BASE_URL = 'http://localhost:5000/api';
//   const ROLES = ['Admin', 'Customer', 'PetrolStation', 'DeliveryBoy', 'ServiceMan'];
   
   
 
//   useEffect(() => {
//     fetchUsers();
//   }, []);
  
//   useEffect(() => {
//       if (selectedRole === 'All') {
//         setFilteredUsers(users);
//       } else {
//         setFilteredUsers(users.filter(user => user.Role === selectedRole));
//       }
//   },[selectedRole,users]);
  

//   const fetchUsers = async () => {
//     setIsLoading(true);
//     try {
//       const response = await axios.get(`${API_BASE_URL}/admin/getalluserdata`);
//       console.log(response);
//       const fetchdata = response.data.users
//       console.log(fetchdata);
      
//       setUsers(fetchdata);
//       setFilteredUsers(fetchdata)
//       setError(null);
//     } catch (err) {
//       setError('Failed to load users. Please try again later.');
//       console.error('Error fetching users:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       return;
//     }

//     setError(null);
//     setIsLoading(true);
    
//     try {
//       const endpoint = isEditing 
//         ? `${API_BASE_URL}/admin/updateuser/${currentUser._id}`
//         : `${API_BASE_URL}/auth/register`;  
      
//       const response = await fetch(endpoint, {  
//         method: isEditing ? 'PUT' : 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         },
//         body: JSON.stringify({
//           ...currentUser,
//           FirstName: currentUser.FirstName,
//           LastName: currentUser.LastName,
//           Email: currentUser.Email,
//           PhoneNumber: currentUser.PhoneNumber,
//           Role: currentUser.Role,
//           Password: currentUser.Password
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || `Failed to ${isEditing ? 'update' : 'create'} user`);
//       }
      
//       await fetchUsers();
//       toast.success(`User ${isEditing ? 'updated' : 'created'} successfully!`);
//       resetForm();
//       setIsFormModalOpen(false);
//     } catch (err) {
//       setError(`Failed to ${isEditing ? 'update' : 'create'} user: ${err.message}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDeleteUser = async () => {
//     if (!userToDelete?._id) return;
    
//     try {
//       setIsLoading(true);
//       const response = await fetch(`${API_BASE_URL}/admin/deleteuser/${userToDelete._id}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//       });
      
//       if (!response.ok) {
//         throw new Error('Failed to delete user');
//       }
      
//       await fetchUsers();
//       toast.success('User deleted successfully!');
//       setIsDeleteModalOpen(false);
//       setUserToDelete(null);
//     } catch (err) {
//       setError('Failed to delete user. Please try again.');
//       console.error('Error deleting user:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   console.log(filteredUsers);
  
//   const validateForm = () => {
//     if (!currentUser.Email || !currentUser.FirstName || (!isEditing && !currentUser.Password)) {
//       setError('Please fill in all required fields');
//       return false;
//     }
    
//     if (!isValidEmail(currentUser.Email)) {
//       setError('Please enter a valid email address');
//       return false;
//     }
    
//     return true;
//   };

//   const isValidEmail = (Email) => {
//     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email);
//   };

//   const resetForm = () => {
//     setCurrentUser(initialFormData);
//     setIsEditing(false);
//     setError(null);
//   };

//   const handleEditUser = (user) => {
//     setIsEditing(true);
//     setCurrentUser({
//       ...user,
//       password: '',
//       FirstName: user.FirstName,
//       LastName: user.LastName,
//       Email: user.Email,
//       Role: user.Role,
//       PhoneNumber: user.PhoneNumber
//     });
//     setIsFormModalOpen(true);
//   };

//   return (
//     <div className='bg-red-400 w-full min-h-screen'>
//       <AdminTopBarPage />
//       <Card className="flex flex-col overflow-x-auto userlistbg mb-5 shadow-xl m-4 sm:p-6 rounded-xl">
//       <div className='flex flex-col sm:flex-row justify-between gap-10 p-4 sm:px-6 lg:px-8'>
//           <div class="border-2 border-red-500 p-4 rounded-lg text-lg font-semibold">
//            <h1 className="text-lg sm:text-4xl font-bold text-gray-900 text-center">USER MANAGEMENT</h1>
//           </div>
//          <button 
//          className='flex justify-end p-2 border-2 border-red-500 rounded-lg text-lg font-semibold hover:bg-red-600'
//          onClick={() => {
//            resetForm();
//            setIsFormModalOpen(true);
//          }}>
//            <HiPlus className="mr-2 h-4 w-4" />
//            Add User
//          </button>
//       </div>
      
//       {error && (
//         <Alert color="failure" className="mb-4">
//           <HiOutlineExclamationCircle className="mr-2 h-4 w-4" />
//           <span>{error}</span>
//         </Alert>
//       )}
//       <div className="mb-4">
//         <Select
//           value={selectedRole}
//           onChange={(e) => setSelectedRole(e.target.value)}
//           className="w-48"
//         >
//           <option value="All">All Roles</option>
//           {ROLES.map(Role => (
//             <option key={Role} value={Role}>
//               {Role}
//             </option>
//           ))}
//           {console.log(ROLES)}
          
//         </Select>
//       </div>
      
//       <div className="overflow-x-auto">
//         {isLoading ? (
//           <div className="text-center py-4">
//             <Spinner size="lg" />
//           </div>
//         ) : (
//           <Table hoverable >
//             <Table.Head>
//               <Table.HeadCell>Name</Table.HeadCell>
//               <Table.HeadCell>Email</Table.HeadCell>
//               <Table.HeadCell>Role</Table.HeadCell>
//               <Table.HeadCell>
//                 <span className="sr-only">Actions</span>
//               </Table.HeadCell>
//             </Table.Head>
//             <Table.Body className="divide-y">
//               {filteredUsers.length === 0 ? (
//                 <Table.Row>
//                   <Table.Cell colSpan={4} className="text-center py-4">
//                     No users found
//                   </Table.Cell>
//                 </Table.Row>
//               ) : (
//                 filteredUsers.map(user => (
//                   <Table.Row key={user.id} className="bg-transparent">
//                     <Table.Cell className="font-medium text-gray-700 border-2">
//                       {user.FirstName} {user.LastName}
//                     </Table.Cell>
//                     <Table.Cell className="font-medium text-gray-700 border-2">{user.Email}</Table.Cell>
//                     <Table.Cell className="font-medium text-gray-700 border-2">{user.Role}</Table.Cell>
//                     <Table.Cell className="border-2">
//                       <div className="flex justify-end gap-2">
//                         <button
//                           className='flex justify-end p-2 border-2 border-black rounded-lg text-lg font-semibold hover:bg-red-600 text-black'
//                           onClick={() => handleEditUser(user)}
//                         >
//                           <HiPencil className="text-gray-700 h-4 w-4" />
//                         </button>
//                         <button
//                           className='flex justify-end p-2 border-2 border-black rounded-lg text-lg font-semibold hover:bg-red-600'
//                           onClick={() => {
//                             setUserToDelete(user);
//                             setIsDeleteModalOpen(true);
//                           }}
//                         >
//                           <HiTrash className="text-gray-700 h-4 w-4" />
//                         </button>
//                       </div>
//                     </Table.Cell>
//                   </Table.Row>
//                 ))
//               )}
//             </Table.Body>
//           </Table>
//         )}
//       </div>
//       {/* User Form Modal */}
//       <Modal
//         show={isFormModalOpen}
//         onClose={() => {
//           resetForm();
//           setIsFormModalOpen(false);
//         }}
//       >
//         <Modal.Header>
//           {isEditing ? 'Edit User' : 'Add New User'}
//         </Modal.Header>
//         <Modal.Body>
//           <form className="space-y-4">
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <div className="mb-2 block">
//                   <Label htmlFor="FirstName" value="First Name" />
//                 </div>
//                 <TextInput
//                   id="FirstName"
//                   type="text"
//                   value={currentUser.FirstName}
//                   onChange={(e) => setCurrentUser({ 
//                     ...currentUser, 
//                     FirstName: e.target.value 
//                   })}
//                   required
//                 />
//               </div>
//               <div>
//                 <div className="mb-2 block">
//                   <Label htmlFor="lastName" value="Last Name" />
//                 </div>
//                 <TextInput
//                   id="LastName"
//                   type="text"
//                   value={currentUser.LastName}
//                   onChange={(e) => setCurrentUser({ 
//                     ...currentUser, 
//                     LastName: e.target.value 
//                   })}
//                 />
//               </div>
//             </div>

//             <div>
//               <div className="mb-2 block">
//                 <Label htmlFor="email" value="Email" />
//               </div>
//               <TextInput
//                 id="Email"
//                 type="email"
//                 value={currentUser.Email}
//                 onChange={(e) => setCurrentUser({ 
//                   ...currentUser, 
//                   Email: e.target.value 
//                 })}
//                 required
//               />
//             </div>

//             <div>
//               <div className="mb-2 block">
//                 <Label htmlFor="phoneNumber" value="PhoneNumber" />
//               </div>
//               <TextInput
//                 id="PhoneNumber"
//                 type="tel"
//                 value={currentUser.PhoneNumber}
//                 onChange={(e) => setCurrentUser({ 
//                   ...currentUser, 
//                   PhoneNumber: e.target.value 
//                 })}
//               />
//             </div>

//             {!isEditing && (
//               <div>
//                 <div className="mb-2 block">
//                   <Label htmlFor="password" value="Password" />
//                 </div>
//                 <TextInput
//                   id="Password"
//                   type="password"
//                   value={currentUser.Password}
//                   onChange={(e) => setCurrentUser({ 
//                     ...currentUser, 
//                     Password: e.target.value 
//                   })}
//                   required={!isEditing}   
//                 />
//               </div>
//             )}

//             <div>
//               <div className="mb-2 block">
//                 <Label htmlFor="role" value="Role" />
//               </div>
//               <Select
//                 id="Role"
//                 value={currentUser.Role}
//                 onChange={(e) => setCurrentUser({ 
//                   ...currentUser, 
//                   Role: e.target.value 
//                 })}
//               >
//                 {ROLES.map(Role => (
//                   <option key={Role} value={Role}>
//                     {Role}
//                   </option>
//                 ))}
//               </Select>
//             </div>
//           </form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button
//             color="gray"
//             onClick={() => {
//               resetForm();
//               setIsFormModalOpen(false);
//             }}
//           >
//             Cancel
//           </Button>
//           <Button
//             color="success"
//             onClick={handleSubmit}
//             disabled={isLoading}
//           >
//             {isLoading ? (
//               <>
//                 <Spinner size="sm" className="mr-2" />
//                 {isEditing ? 'Updating...' : 'Adding...'}
//               </>
//             ) : (
//               isEditing ? 'Update User' : 'Add User'
//             )}
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Delete Confirmation Modal */}
//       <Modal
//         show={isDeleteModalOpen}
//         size="md"
//         popup
//         onClose={() => setIsDeleteModalOpen(false)}
//       >
//         <Modal.Header />
//         <Modal.Body>
//           <div className="text-center">
//             <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400" />
//             <h3 className="mb-5 text-lg font-normal text-gray-500">
//               Are you sure you want to delete {userToDelete?.FirstName}? This action cannot be undone.
//             </h3>
//             <div className="flex justify-center gap-4">
//               <Button
//                 color="failure"
//                 onClick={handleDeleteUser}
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <>
//                     <Spinner size="sm" className="mr-2" />
//                     Deleting...
//                   </>
//                 ) : (
//                   'Yes, delete user'
//                 )}
//               </Button>
//               <Button
//                 color="gray"
//                 onClick={() => setIsDeleteModalOpen(false)}
//               >
//                 No, cancel
//               </Button>
//             </div>
//           </div>
//         </Modal.Body>
//       </Modal>
//       </Card>
//       <Footer />
//     </div>
//   );
// };

// export default UserList;

import React, { useState, useEffect } from 'react';
import { Button,Card,Label,TextInput,Select,Modal,Alert,Table,Spinner } from 'flowbite-react';
import {HiOutlineExclamationCircle,HiTrash,HiPencil,HiPlus} from 'react-icons/hi';
import AdminTopBarPage from './AdminTopBarPage';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Footer from '../UserComponents/Footer';
import { toast } from 'react-toastify';


const ROLES = ['Admin', 'Customer', 'PetrolStation', 'DeliveryBoy', 'ServiceMan'];

const initialFormData = {
  FirstName: '',
  LastName: '',
  Email: '',
  PhoneNumber: '',
  Role: ROLES[0],
  Password: ''
};

const UserList = () => {
  // State management
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState('All');
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(initialFormData);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  
  
  // API base URL - should be in environment variable
  const API_BASE_URL = 'https://vehicle-care-api.onrender.com/api';
  const ROLES = ['Admin', 'Customer', 'PetrolStation', 'DeliveryBoy', 'ServiceMan'];
   
   
 
  useEffect(() => {
    fetchUsers();
  }, []);
  
  useEffect(() => {
      if (selectedRole === 'All') {
        setFilteredUsers(users);
      } else {
        setFilteredUsers(users.filter(user => user.Role === selectedRole));
      }
  },[selectedRole,users]);
  

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/getalluserdata`);
      // console.log(response);
      const fetchdata = response.data.users
      // console.log(fetchdata);
      
      setUsers(fetchdata);
      setFilteredUsers(fetchdata)
      setError(null);
    } catch (err) {
      setError('Failed to load users. Please try again later.');
      console.error('Error fetching users:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setError(null);
    setIsLoading(true);
    
    try {
      const endpoint = isEditing 
        ? `${API_BASE_URL}/admin/updateuser/${currentUser._id}`
        : `${API_BASE_URL}/auth/register`;  
      
      const response = await fetch(endpoint, {  
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          ...currentUser,
          FirstName: currentUser.FirstName,
          LastName: currentUser.LastName,
          Email: currentUser.Email,
          PhoneNumber: currentUser.PhoneNumber,
          Role: currentUser.Role,
          Password: currentUser.Password
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to ${isEditing ? 'update' : 'create'} user`);
      }
      
      await fetchUsers();
      resetForm();
      toast.success(`User ${isEditing ? 'updated' : 'created'} successfully!`);
      setIsFormModalOpen(false);
    } catch (err) {
      setError(`Failed to ${isEditing ? 'update' : 'create'} user: ${err.message}`);
      toast.error(`Failed to ${isEditing ? 'update' : 'create'} user: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!userToDelete?._id) return;
    
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/admin/deleteuser/${userToDelete._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      
      await fetchUsers();
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
      toast.success('User deleted successfully!');
    } catch (err) {
      setError('Failed to delete user. Please try again.');
      console.error('Error deleting user:', err);
      toast.error('Failed to delete user. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  console.log(filteredUsers);
  
  const validateForm = () => {
    if (!currentUser.Email || !currentUser.FirstName || (!isEditing && !currentUser.Password)) {
      setError('Please fill in all required fields');
      return false;
    }
    
    if (!isValidEmail(currentUser.Email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    return true;
  };

  const isValidEmail = (Email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email);
  };

  const resetForm = () => {
    setCurrentUser(initialFormData);
    setIsEditing(false);
    setError(null);
  };

  const handleEditUser = (user) => {
    setIsEditing(true);
    setCurrentUser({
      ...user,
      password: '',
      FirstName: user.FirstName,
      LastName: user.LastName,
      Email: user.Email,
      Role: user.Role,
      PhoneNumber: user.PhoneNumber
    });
    setIsFormModalOpen(true);
  };

  return (
    <div className='bg-red-400 w-full min-h-screen'>
      <AdminTopBarPage />
      <Card className="flex flex-col overflow-x-auto userlistbg mb-5 shadow-xl m-4 sm:p-6 rounded-xl">
      <div className='flex flex-col sm:flex-row justify-between gap-10 p-4 sm:px-6 lg:px-8'>
          <div class="border-2 border-red-500 p-4 rounded-lg text-lg font-semibold">
           <h1 className="text-lg sm:text-4xl font-bold text-gray-900 text-center">USER MANAGEMENT</h1>
          </div>
         <button 
         className='flex justify-end p-2 border-2 border-red-500 rounded-lg text-lg font-semibold hover:bg-red-600'
         onClick={() => {
           resetForm();
           setIsFormModalOpen(true);
         }}>
           <HiPlus className="mr-2 h-4 w-4" />
           Add User
         </button>
      </div>
      
      {error && (
        <Alert color="failure" className="mb-4">
          <HiOutlineExclamationCircle className="mr-2 h-4 w-4" />
          <span>{error}</span>
        </Alert>
      )}
      <div className="mb-4">
        <Select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="w-48"
        >
          <option value="All">All Roles</option>
          {ROLES.map(Role => (
            <option key={Role} value={Role}>
              {Role}
            </option>
          ))}
          {console.log(ROLES)}
          
        </Select>
      </div>
      
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="text-center py-4">
            <Spinner size="lg" />
          </div>
        ) : (
          <Table hoverable >
            <Table.Head>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Role</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Actions</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {filteredUsers.length === 0 ? (
                <Table.Row>
                  <Table.Cell colSpan={4} className="text-center py-4">
                    No users found
                  </Table.Cell>
                </Table.Row>
              ) : (
                filteredUsers.map(user => (
                  <Table.Row key={user.id} className="bg-transparent">
                    <Table.Cell className="font-medium text-gray-700 border-2">
                      {user.FirstName} {user.LastName}
                    </Table.Cell>
                    <Table.Cell className="font-medium text-gray-700 border-2">{user.Email}</Table.Cell>
                    <Table.Cell className="font-medium text-gray-700 border-2">{user.Role}</Table.Cell>
                    <Table.Cell className="border-2">
                      <div className="flex justify-end gap-2">
                        <button
                          className='flex justify-end p-2 border-2 border-black rounded-lg text-lg font-semibold hover:bg-red-600 text-black'
                          onClick={() => handleEditUser(user)}
                        >
                          <HiPencil className="text-gray-700 h-4 w-4" />
                        </button>
                        <button
                          className='flex justify-end p-2 border-2 border-black rounded-lg text-lg font-semibold hover:bg-red-600'
                          onClick={() => {
                            setUserToDelete(user);
                            setIsDeleteModalOpen(true);
                          }}
                        >
                          <HiTrash className="text-gray-700 h-4 w-4" />
                        </button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))
              )}
            </Table.Body>
          </Table>
        )}
      </div>
      {/* User Form Modal */}
      <Modal
        show={isFormModalOpen}
        onClose={() => {
          resetForm();
          setIsFormModalOpen(false);
        }}
      >
        <Modal.Header>
          {isEditing ? 'Edit User' : 'Add New User'}
        </Modal.Header>
        <Modal.Body>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="FirstName" value="First Name" />
                </div>
                <TextInput
                  id="FirstName"
                  type="text"
                  value={currentUser.FirstName}
                  onChange={(e) => setCurrentUser({ 
                    ...currentUser, 
                    FirstName: e.target.value 
                  })}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="lastName" value="Last Name" />
                </div>
                <TextInput
                  id="LastName"
                  type="text"
                  value={currentUser.LastName}
                  onChange={(e) => setCurrentUser({ 
                    ...currentUser, 
                    LastName: e.target.value 
                  })}
                />
              </div>
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Email" />
              </div>
              <TextInput
                id="Email"
                type="email"
                value={currentUser.Email}
                onChange={(e) => setCurrentUser({ 
                  ...currentUser, 
                  Email: e.target.value 
                })}
                required
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="phoneNumber" value="PhoneNumber" />
              </div>
              <TextInput
                id="PhoneNumber"
                type="tel"
                value={currentUser.PhoneNumber}
                onChange={(e) => setCurrentUser({ 
                  ...currentUser, 
                  PhoneNumber: e.target.value 
                })}
              />
            </div>

            {!isEditing && (
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password" value="Password" />
                </div>
                <TextInput
                  id="Password"
                  type="password"
                  value={currentUser.Password}
                  onChange={(e) => setCurrentUser({ 
                    ...currentUser, 
                    Password: e.target.value 
                  })}
                  required={!isEditing}   
                />
              </div>
            )}

            <div>
              <div className="mb-2 block">
                <Label htmlFor="role" value="Role" />
              </div>
              <Select
                id="Role"
                value={currentUser.Role}
                onChange={(e) => setCurrentUser({ 
                  ...currentUser, 
                  Role: e.target.value 
                })}
              >
                {ROLES.map(Role => (
                  <option key={Role} value={Role}>
                    {Role}
                  </option>
                ))}
              </Select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            color="gray"
            onClick={() => {
              resetForm();
              setIsFormModalOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            color="success"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner size="sm" className="mr-2" />
                {isEditing ? 'Updating...' : 'Adding...'}
              </>
            ) : (
              isEditing ? 'Update User' : 'Add User'
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        show={isDeleteModalOpen}
        size="md"
        popup
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400" />
            <h3 className="mb-5 text-lg font-normal text-gray-500">
              Are you sure you want to delete {userToDelete?.FirstName}? This action cannot be undone.
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={handleDeleteUser}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Spinner size="sm" className="mr-2" />
                    Deleting...
                  </>
                ) : (
                  'Yes, delete user'
                )}
              </Button>
              <Button
                color="gray"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      </Card>
      <Footer />
    </div>
  );
};

export default UserList;