import React from 'react'
import {useAuthState} from 'react-firebase-hooks/auth'
import {Navigate} from 'react-router-dom'
import auth from '../firebase.init'

const ProtectedRoute = ({children}) => {
 const [user , isLoading ] = useAuthState(auth)

 if(isLoading){
    console.log('Loading...')
 }
  if(!user){
    return <Navigate to = '/login'/>
  }
  return children ;
}

export default ProtectedRoute
