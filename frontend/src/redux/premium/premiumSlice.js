import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    ispremium:false , 
  }

  const userSlice = createSlice({
    name:'premium',
    initialState,
    reducers:{
        premiumVerify:(state ,action)=>{
            if(action.payload){
                state.ispremium = true;
            }
           
        }
        
    }
});

export const {premiumVerify} = userSlice.actions;
export default userSlice.reducer;