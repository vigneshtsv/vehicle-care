// import { Alert, Button, Modal, TextInput } from "flowbite-react";
// import React, { useEffect, useRef, useState } from "react";
// import { HiInformationCircle, HiOutlineTrash } from "react-icons/hi";
// import { useDispatch, useSelector } from "react-redux";
// import { useLogout } from "./useLogout.jsx";


// const DashboardProfile = () => {
//   const dispatch = useDispatch();
//   let logout = useLogout();
//   const currentUser  = useSelector((state) => state.user);
//   const [formData, setFormData] = useState();
//   const [imageFile, setImageFile] = useState(null);
//   const [imageFileUrl, setImageFileUrl] = useState(null);
//   const [imageFileUploading, setImageFileUploading] = useState(false);
//   const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
//   const [imageFileUploadError, setImageFileUploadError] = useState(null);
//   const [isFormModalOpen, setIsFormModalOpen] = useState(false);
//   const filePickerRef = useRef();

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if(file){
//         setImageFile(file);
//         setImageFileUrl(URL.createObjectURL(file));
//     }
//     const Base64 = (file) =>
//       new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = () => resolve(reader.result);
//         reader.onerror = reject;
//       });

//     Base64(file).then(res => console.log(res));
//   };

//   useEffect(() => {
//     if (imageFile) {
//       uploadImage();
//     }
//   }, [imageFile]);

//   //!firebase image upload and storage part

//   const uploadImage = async () => {
//     setImageFileUploading(true);
//     setImageFileUploadError(null);
//     const storage = getStorage(app);
//     const fileName = new Date().getTime() + imageFile.name;
//     const storageRef = ref(storage, fileName);
//     const uploadTask = uploadBytesResumable(storageRef, imageFile);
//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         const progress =
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         setImageFileUploadProgress(progress.toFixed(0)); //10.6794764
//       },
//       (error) => {
//         setImageFileUploadError(
//           "Could not upload the image (File size must be less than 2MB"
//         );
//         setImageFileUrl(null);
//         setImageFileUploadProgress(null);
//         setImageFile(null);
//         setImageFileUploading(false);
//       },
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           setImageFileUrl(downloadURL);
//           setFormData({ ...formData, profilePicture: downloadURL });
//           setImageFileUploading(false);
//         });
//       }
//     );
//   };

  
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleDeleteAccount = async () => {
//     try {
//       // Add your account deletion logic here
//       console.log('Deleting account...');
//       setIsFormModalOpen(false);
//     } catch (err) {
//       setError('Failed to delete account');
//     }
//   };
//   \
//   return (
//     <div className="max-w-lg mx-auto p-4 w-full">
//       <h1 className="my-7 text-center font-semibold text-4xl">Profile</h1>
//       <form className="flex flex-col gap-5">
//         <input
//           type="file"
//           accept="image/*"
//           ref={filePickerRef}
//           onChange={handleImageChange}
//           hidden
//         />
//         <div
//           className="w-28 h-28 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
//           onClick={() => filePickerRef.current?.click()}
//         >
//           {imageFileUploadProgress && (
//             <CircularProgressbar
//               value={imageFileUploadProgress || 0}
//               text={`${imageFileUploadProgress}%`}
//               strokeWidth={5}
//               styles={{
//                 root: {
//                   width: "100%",
//                   height: "100%",
//                   position: "absolute",
//                   top: 0,
//                   left: 0,
//                 },
//                 path: {
//                   stroke: `rgba(62,150,200,${imageFileUploadProgress / 100})`,
//                 },
//               }}
//             />
//           )}
//           <img
//             src={imageFileUrl || currentUser.ProfilePicture}
//             alt="user"
//             className={`rounded-full w-full h-full object-cover border-4 border-pink-400 ${
//               imageFileUploadProgress &&
//               imageFileUploadProgress < 100 &&
//               "opacity-50"
//             }`}
//           />
//         </div>
//         {console.log(currentUser)}
//         {imageFileUploadError && (
//           <Alert color="failure" icon={HiInformationCircle} className="mt-5">
//             <span className="font-medium me-2">😍OOPS!</span>
//             {imageFileUploadError}
//           </Alert>
//         )}
//         <TextInput type="text" defaultValue={currentUser.FirstName} onChange={handleChange}/>
//         <TextInput type="email" defaultValue={currentUser.Email} onChange={handleChange}/>
//         <TextInput type="password" placeholder="********" onChange={handleChange}/>
//         <Button type="submit" outline gradientDuoTone="greenToBlue">
//           Click To Update
//         </Button>
//       </form>
//       <div className="text-red-600 flex justify-between mt-5" >
//         <span className="cursor-pointer">
//           <Button onClick={() => {setIsFormModalOpen(true)}} outline gradientDuoTone="pinkToOrange">Click to Delete Account</Button>
//         </span>
//         <span className="cursor-pointer" onClick={logout}> 
//           <Button outline gradientDuoTone="pinkToOrange">Click to Logged Out</Button>
//         </span>
//       </div>
//       <Modal show={isFormModalOpen} onClose={() => {setIsFormModalOpen(false)}}>
//            <Modal.Header>
//             <h3>confirm to delete</h3>
//            </Modal.Header>
//            <Modal.Body>
//           <div className="text-center">
//             <HiOutlineTrash className="mx-auto mb-4 h-14 w-14 text-gray-400" />
//             <h3 className="mb-5 text-lg font-normal text-gray-500">
//               Are you sure you want to delete this item?
//             </h3>
//             <div className="flex justify-center gap-4">
//               <Button
//                 color="failure"
//                 onClick={handleDeleteAccount}
//               >
//                 Yes, I'm sure
//               </Button>
//               <Button
//                 color="gray"
//                 onClick={() => setIsFormModalOpen(false)}
//               >
//                 No, cancel
//               </Button>
//             </div>
//           </div>
//         </Modal.Body>
//             </Modal>
      
//     </div>
//   );
// };

// export default DashboardProfile;



import { Alert, Button, Modal, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { HiInformationCircle, HiOutlineTrash } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useLogout } from "./useLogout.jsx";


const DashboardProfile = () => {
  const dispatch = useDispatch();
  let logout = useLogout();
  const {currentUser} = useSelector((state) => state.user); 
  const [formData, setFormData] = useState({
    FirstName: currentUser.FirstName || "",
    Email: currentUser.Email || "",
    Password: currentUser.Password || "",
    ProfilePicture: currentUser.ProfilePicture || "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imageBase64, setImageBase64] = useState(currentUser?.ProfilePicture || "");
  const [uploadProgress, selectUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleteModalOpen,setIsDeleteModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const filePickerRef = useRef(); 


  const updateImage = async (imageData) => {
    try {
      const endpoint =`http://localhost:5000/api/admin/updateuser/${currentUser?.Id}`;
      
      const response = await fetch(endpoint, {
        method:'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        },
        body: JSON.stringify({
          ...currentUser,
          ProfilePicture:imageData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save user');
      }
      
      await fetchUsers();
    } catch (err) {
      // setError(`Failed update`);
    } finally {
      // setIsLoading(false);
    }
  } 

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if(!file) return;

    if(file.size > 2 * 1024 * 1024) {
      setUploadError("File size must be less than 2MB");
      return;
    }
    setIsUploading(true);
    setUploadError(null);
    const convertToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    }
    try {
      const base64 = await convertToBase64(file);
      updateImage(base64);
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        selectUploadProgress(progress);
        if(progress >= 100) {
          clearInterval(interval);
          setImageBase64(base64);
          // setFormData({ ...formData, profilePicture: base64 });
          setIsUploading(false);
        }
      },100);
    } catch (error) {
      setUploadError('Failed to upload image');
      setIsUploading(false);
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log(formData);
  };

  
  const handleDeleteAccount = async () => {
    try {
      // Add your account deletion logic here
      console.log('Deleting account...');
      setIsFormModalOpen(false);
    } catch (err) {
      setError('Failed to delete account');
    }
  };

  const handleLogout = () => {
    logout();
    dispatch(signOutSuccess());
  }
  return (
    <div className="max-w-lg mx-auto p-4 w-full">
      <h1 className="my-7 text-center font-semibold text-4xl">Profile</h1>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="file"
          accept="image/*"
          ref={filePickerRef}
          onChange={handleImageChange}
          hidden
        />
        
        {/* Profile Picture */}
        <div
          className="relative w-28 h-28 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current?.click()}
        >
          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">
              <div className="w-full h-full relative">
                {/* Custom circular progress indicator */}
                <svg className="absolute inset-0" viewBox="0 0 100 100">
                  <circle
                    className="text-gray-300"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="transparent"
                    r="45"
                    cx="50"
                    cy="50"
                  />
                  <circle
                    className="text-blue-600"
                    strokeWidth="4"
                    strokeDasharray={283}
                    strokeDashoffset={283 - (283 * uploadProgress) / 100}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="45"
                    cx="50"
                    cy="50"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {uploadProgress}%
                  </span>
                </div>
              </div>
            </div>
          )}
          
          <img
            src={imageBase64 || "https://via.placeholder.com/150"}
            alt="Profile"
            className={`rounded-full w-full h-full object-cover border-4 border-pink-400 ${
              isUploading ? "opacity-50" : ""
            }`}
          />
        </div>
        
        {/* Error Alert */}
        {uploadError && (
          <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg flex items-center" role="alert">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd"></path>
            </svg>
            <span className="font-medium">Oops!</span> {uploadError}
          </div>
        )}
        
        {/* Form Inputs */}
        <div className="relative">
          <input
            id="FirstName"
            type="text"
            value={currentUser.FirstName}
            onChange={handleChange}
            className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          <label className="absolute text-sm text-gray-500 -top-2 left-2 bg-white px-1">First Name</label>
        </div>
        
        <div className="relative">
          <input
            id="Email"
            type="email"
            value={currentUser.Email}
            onChange={handleChange}
            className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          <label className="absolute text-sm text-gray-500 -top-2 left-2 bg-white px-1">Email</label>
        </div>
        
        <div className="relative">
          <input
            id="Password"
            type="password"
            value={currentUser.Password}
            onChange={handleChange}
            placeholder="********"
            className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          <label className="absolute text-sm text-gray-500 -top-2 left-2 bg-white px-1">Password</label>
        </div>
        
        {/* Update Button */}
        <button
          type="submit"
          className="text-white bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Click To Update
        </button>
      </form>
      
      {/* Account Actions */}
      <div className="flex justify-between mt-5">
        <button
          onClick={() => setIsDeleteModalOpen(true)}
          className="text-white bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 focus:ring-4 focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Click to Delete Account
        </button>
        
        <button
          onClick={handleLogout}
          className="text-white bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 focus:ring-4 focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Click to Logout
        </button>
      </div>
      
      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="mb-4 text-center">
              <svg className="mx-auto mb-4 w-14 h-14 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
              <h3 className="text-xl font-medium text-gray-900">Confirm to delete</h3>
              <p className="mt-2 text-gray-500">Are you sure you want to delete your account?</p>
            </div>
            
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDeleteAccount}
                className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Yes, I'm sure
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="text-gray-500 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5"
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardProfile;