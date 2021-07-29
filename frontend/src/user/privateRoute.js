import React from 'react'
import {Redirect, Route} from 'react-router-dom';
import {isAuthenticate} from './auth'
const PrivateRoute = ({children}) => {
    return (
         <Route render={()=>{
             return isAuthenticate() ? children : <Redirect to={{pathname: '/signin'}}/>
                    
         }} />

         

         
    )
}

export default PrivateRoute
