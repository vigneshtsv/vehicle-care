import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  currentUser:null,
  error:null,
  loading:false,
  userList:null,
}


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers:{  
    signInStart : (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess : (state,action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure : (state,action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setCurrentUser : (state,action) => {
      state.currentUser = action.payload;
    },
    userList:(state,action) => {
      state.userList = action.payload;
    }
    // signOutSuccess : (state) => {       //!signOut method in used Redux
    //   state.currentUser = null;
    //   state.loading = false;
    //   state.error = null;
    // }
    
  }
})

//Export actions
export const {signInStart,signInSuccess,signInFailure,setCurrentUser,userList} = userSlice.actions;
//Export reducer
export default userSlice.reducer;


// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   currentUser: null,
//   error: null,
//   loading: false,
// };

// const userSlice = createSlice({
//   name: 'userRole',  // Lowercase to follow convention
//   initialState,
//   reducers: {
//     signInStart: (state) => {
//       state.loading = true;  // Set loading to true
//       state.error = null;    // Clear previous errors
//     },
//     signInSuccess: (state, action) => {
//       state.currentUser = action.payload;
//       state.loading = false;  // Reset loading
//       state.error = null;     // Clear errors
//     },
//     signInFailure: (state, action) => {
//       state.loading = false;  // Reset loading
//       state.error = action.payload; // Set error
//     },
//   },
// });

// // Export actions
// export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;

// // Export reducer
// export default userSlice.reducer;