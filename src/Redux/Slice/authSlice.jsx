import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  currentUser:null,
  error:null,
  loading:false,
}


const userSlice = createSlice({
  name: 'userRole',
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
    }
  }
})

//Export actions
export const {signInStart,signInSuccess,signInFailure} = userSlice.actions;
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