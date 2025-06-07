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
    signOutSuccess : (state) => {      
      state.currentUser = null;
    }
  }
})

//Export actions
export const {signInStart,signInSuccess,signInFailure,setCurrentUser,userList,signOutSuccess} = userSlice.actions;
export default userSlice.reducer;


