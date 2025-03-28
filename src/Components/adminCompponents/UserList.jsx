// import React, { useState, useEffect } from 'react';
// import { Button,Card,Label,TextInput,Select,Modal,Alert,Table } from 'flowbite-react';
// import { HiOutlineExclamationCircle, HiTrash, HiPencil, HiPlus } from 'react-icons/hi';


// const ROLES = ['Admin', 'Customer', 'PetrolStation','DeliveryBoy','ServiceMan'];

// const initialFormData = {
//   FirstName:'',
//   LastName:'',
//   Email:'',
//   PhoneNumber:'',
//   Role:ROLES[0]
// }

// const UserList = () => {
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [selectedRole, setSelectedRole] = useState('all');
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentUser, setCurrentUser] = useState(initialFormData);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isFormModalOpen, setIsFormModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [userToDelete, setUserToDelete] = useState(null);
  
  
//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   useEffect(() => {
//     if (selectedRole === 'all') {
//       setFilteredUsers(users);
//     } else {
//       setFilteredUsers(users.filter(user => user.Role === selectedRole));
//     }
//   }, [selectedRole, users]);
  
//   const fetchUsers = async () => {
//     try {
//       setIsLoading(true);
//       const response = await fetch('http://localhost:5000/api/admin/getalluser');
//       if (!response.ok) throw new Error('Failed to fetch users');

//       const data = await response.json();
//       setUsers(data);
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
//     setError(null);
//     setIsLoading(true);
    
//     try {
//       const endpoint = isEditing 
//         ? `http://localhost:5000/api/admin/updateuser/${currentUser.id}`
//         : 'http://localhost:5000/api/auth/register';
      
//       const response = await fetch(endpoint, {
//         method: isEditing ? 'PUT' : 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(currentUser),
//       });

//       if (!response.ok) throw new Error('Failed to save user');
      
//       await fetchUsers();
//       resetForm();
//     } catch (err) {
//       setError(`Failed to ${isEditing ? 'update' : 'create'} user. Please try again.`);
//       console.error('Error saving user:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDeleteUser = async () => {
//     if (!userToDelete) return;
    
//     try {
//       setIsLoading(true);
//       const response = await fetch(`http://localhost:5000/api/admin/deleteuser/${userToDelete.id}`, {
//         method: 'DELETE',
//       });
//       if (!response.ok) throw new Error('Failed to delete user');
//       await fetchUsers();
//       setError(null);
//       setIsDeleteModalOpen(false);
//       setUserToDelete(null);
//     } catch (err) {
//       setError('Failed to delete user. Please try again.');
//       console.error('Error deleting user:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setCurrentUser(initialFormData);
//     setIsEditing(false);
//     setIsFormModalOpen(false);
//   };

//   const handleEditUser = (user) => {
//     setIsEditing(true);
//     setCurrentUser({ ...user, Password: '' });
//     setIsFormModalOpen(true);
//   };

//   return (
//     <Card className="max-w-4xl mx-auto">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold">User Management</h2>
//         <Button onClick={() => setIsFormModalOpen(true)}>
//           <HiPlus className="mr-2 h-4 w-4" />
//           Add User
//         </Button>
//       </div>

//       {error && (
//         <Alert color="failure" className="mb-4">
//           {error}
//         </Alert>
//       )}

//       <div className="mb-4">
//         <Select
//           value={selectedRole}
//           onChange={(e) => setSelectedRole(e.target.value)}
//           className="w-48"
//         >
//           <option value="all">All Roles</option>
//           {ROLES.map(Role => (
//             <option key={Role} value={Role} className="capitalize">
//               {Role}
//             </option>
//           ))}
//         </Select>
//       </div>

//       <Table>
//         <Table.Head>
//           <Table.HeadCell>Name</Table.HeadCell>
//           <Table.HeadCell>Email</Table.HeadCell>
//           <Table.HeadCell>Role</Table.HeadCell>
//           <Table.HeadCell>Actions</Table.HeadCell>
//         </Table.Head>
//         <Table.Body>
//           {filteredUsers.map(user => (
//             <Table.Row key={user.id}>
//               <Table.Cell>{user.FirstName}</Table.Cell>
//               <Table.Cell>{user.Email}</Table.Cell>
//               <Table.Cell className="capitalize">{user.Role}</Table.Cell>
//               <Table.Cell>
//                 <div className="flex justify-end space-x-2">
//                   <Button
//                     color="info"
//                     size="sm"
//                     onClick={() => handleEditUser(user)}
//                   >
//                     <HiPencil className="h-4 w-4" />
//                   </Button>
//                   <Button
//                     color="failure"
//                     size="sm"
//                     onClick={() => {
//                       setUserToDelete(user);
//                       setIsDeleteModalOpen(true);
//                     }}
//                   >
//                     <HiTrash className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </Table.Cell>
//             </Table.Row>
//           ))}
//         </Table.Body>
//       </Table>

//       {/* User Form Modal */}
//       <Modal
//         show={isFormModalOpen}
//         onClose={resetForm}
//       >
//         <Modal.Header>
//           {isEditing ? 'Edit User' : 'Add New User'}
//         </Modal.Header>
//         <Modal.Body>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <Label htmlFor="Name">Name</Label>
//               <TextInput
//                 id="FirstName"
//                 placeholder="Name"
//                 value={currentUser.FirstName}
//                 onChange={(e) => setCurrentUser({ ...currentUser, FirstName: e.target.value })}
//                 required
//               />
//             </div>
//             <div>
//               <Label htmlFor="email">Email</Label>
//               <TextInput
//                 id="Email"
//                 type="email"
//                 placeholder="Email"
//                 value={currentUser.Email}
//                 onChange={(e) => setCurrentUser({ ...currentUser, Email: e.target.value })}
//                 required
//               />
//             </div>
//             <div>
//               <Label htmlFor="password">Password</Label>
//               <TextInput
//                 id="Password"
//                 type="Password"
//                 placeholder="Password"
//                 value={currentUser.Password}
//                 onChange={(e) => setCurrentUser({ ...currentUser, Password: e.target.value })}
//                 required={!isEditing}
//               />
//             </div>
//             <div>
//               <Label htmlFor="role">Role</Label>
//               <Select
//                 id="Role"
//                 value={currentUser.Role}
//                 onChange={(e) => setCurrentUser({ ...currentUser, Role: e.target.value })}
//               >
//                 {ROLES.map(Role => (
//                   <option key={Role} value={Role} className="capitalize">
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
//             onClick={resetForm}
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={handleSubmit}
//             disabled={isLoading}
//           >
//             {isLoading ? 'Saving...' : isEditing ? 'Update User' : 'Add User'}
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Delete Confirmation Modal */}
//       <Modal
//         show={isDeleteModalOpen}
//         onClose={() => setIsDeleteModalOpen(false)}
//         size="md"
//       >
//         <Modal.Header>
//           Delete User
//         </Modal.Header>
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
//               >
//                 Yes, delete user
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
//     </Card>
//   );
// };

// export default UserList;


//!another one method for userlist

// import React, { useState, useEffect } from 'react';

// const UserList = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
// console.log(users);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/admin/getalluser');
//       const data = await response.json();
//       setUsers(data);
//       setLoading(false);
//     } catch (err) {
//       setError('Failed to fetch users');
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (userId) => {
//     if (window.confirm('Are you sure you want to delete this user?')) {
//       try {
//         await fetch(`http://localhost:5000/api/admin/deleteuser/${userId}`, {
//           method: 'DELETE',
//         });
//         setUsers(users.filter(user => user.id !== userId));
//       } catch (err) {
//         setError('Failed to delete user');
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div Role="status">
//           <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
//             <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
//           </svg>
//           <span className="sr-only">Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" Role="alert">
//         <span className="font-medium">Error!</span> {error}
//       </div>
//     );
//   }

//   return (
//     <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
//       <div className="p-4 bg-white">
//         <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
//       </div>
      
//       <table className="w-full text-sm text-left text-gray-500">
//         <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//           <tr>
//             <th scope="col" className="px-6 py-3">ID</th>
//             <th scope="col" className="px-6 py-3">Name</th>
//             <th scope="col" className="px-6 py-3">Email</th>
//             <th scope="col" className="px-6 py-3">Role</th>
//             <th scope="col" className="px-6 py-3">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
//               <td className="px-6 py-4">{user.id}</td>
//               <td className="px-6 py-4">{user.FistName}</td>
//               <td className="px-6 py-4">{user.LastName}</td>
//               <td className="px-6 py-4">{user.Email}</td>
//               <td className="px-6 py-4">
//                 <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
//                   {user.Role}
//                 </span>
//               </td>
//               <td className="px-6 py-4">
//                 <div className="flex space-x-2">
//                   <button
//                     type="button"
//                     onClick={() => window.location.href = `http://localhost:5000/api/admin/updateuser/${user.id}`}
//                     className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none"
//                   >
//                     <svg className="w-4 h-4 inline-block mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                       <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
//                       <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path>
//                     </svg>
//                     Edit
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => handleDelete(user.id)}
//                     className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none"
//                   >
//                     <svg className="w-4 h-4 inline-block mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                       <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path>
//                     </svg>
//                     Delete
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UserList;

//!another one claude.ai

import React, { useState, useEffect } from 'react';
import { Button,Card,Label,TextInput,Select,Modal,Alert,Table,Spinner } from 'flowbite-react';
import {HiOutlineExclamationCircle,HiTrash,HiPencil,HiPlus} from 'react-icons/hi';
import AdminTopBarPage from './AdminTopBarPage';
import { useDispatch } from 'react-redux';
import axios from 'axios';


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
  
  //console.log(currentUser.Email);
  
  console.log(currentUser);
  
  // API base URL - should be in environment variable
  const API_BASE_URL = 'http://localhost:5000/api';
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
      console.log(response);
      const fetchdata = response.data.users
      console.log(fetchdata);
      
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
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
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
      setIsFormModalOpen(false);
    } catch (err) {
      setError(`Failed to ${isEditing ? 'update' : 'create'} user: ${err.message}`);
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
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      
      await fetchUsers();
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
    } catch (err) {
      setError('Failed to delete user. Please try again.');
      console.error('Error deleting user:', err);
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
    <div>
      <AdminTopBarPage />
      <Card className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-4">
      <div class="border-2 border-red-500 p-4 rounded-lg text-lg font-semibold">
        <h1 className="text-4xl font-bold text-gray-900 text-center">USER MANAGEMENT</h1>
        </div>
        <Button 
        outline gradientDuoTone="cyanToBlue"
        onClick={() => {
          resetForm();
          setIsFormModalOpen(true);
        }}>
          <HiPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
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
      

      {isLoading ? (
        <div className="text-center py-4">
          <Spinner size="lg" />
        </div>
      ) : (
        <Table hoverable>
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
                <Table.Row key={user.id} className="bg-white">
                  <Table.Cell className="font-medium text-gray-900">
                    {user.FirstName} {user.LastName}
                  </Table.Cell>
                  <Table.Cell>{user.Email}</Table.Cell>
                  <Table.Cell className="capitalize">{user.Role}</Table.Cell>
                  <Table.Cell>
                    <div className="flex justify-end gap-2">
                      <Button
                        outline gradientDuoTone="greenToBlue"
                        size="sm"
                        onClick={() => handleEditUser(user)}
                      >
                        <HiPencil className="h-4 w-4" />
                      </Button>
                      <Button
                        outline gradientDuoTone="pinkToOrange"
                        size="sm"
                        onClick={() => {
                          setUserToDelete(user);
                          setIsDeleteModalOpen(true);
                        }}
                      >
                        <HiTrash className="h-4 w-4" />
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))
            )}
          </Table.Body>
        </Table>
      )}

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
    </div>
  );
};

export default UserList;