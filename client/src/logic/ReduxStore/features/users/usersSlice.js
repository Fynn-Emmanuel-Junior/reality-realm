import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    currentuser: null,
    loading: false,
    error: null
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true
        },
        signInSuccess: (state,action) => {
            state.loading = false
            state.currentuser = action.payload
            state.error = null
        },
        signInFailure: (state,action) => { 
            state.loading = false
            state.error = action.payload
        },

        updateUserStart: (state) => {
            state.loading = true
        },
        updateUserSuccess: (state,action) => {
            state.loading = false
            state.currentuser = action.payload
            state.error = null
        },
        updateUserFailure: (state,action) => {
            state.loading = false
            state.error = action.payload
        },

        deleteUserSucess: (state,action) => {
            state.currentuser = null
            state.loading = false
            state.error = null
        },

        signOut: (state,action) => {
            state.currentuser = null
            state.loading = false
            state.error = null
        }
    },
 
})

export const selectLoading = (state) => state.users.loading
export const selectError = (state) =>   state.users.error
export const selectCurrentUser = (state) => state.users.currentuser

export  const { 
    signInStart,
    signInSuccess,
    signInFailure ,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    deleteUserSucess,
    signOut
} = usersSlice.actions

export default usersSlice.reducer