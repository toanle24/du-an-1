import React,{useState,useEffect} from "react";
import {Redirect, Route,useParams} from 'react-router-dom';
import { authenticate, isAuthenticate } from './auth';
import { API } from '../config'
const PrivateSignin = () => {
    // const [user, setUser] = useState([]);
    // const { id } = useParams();
    // const{user} = authenticate()
    // useEffect(() => {
    //     const getUser = async () => {
    //       try {
    //         const { data } = await API.getAll(id);
    //         setUser(data.data);
          
    //       } catch (error) {
    //         console.log(error);
    //       }
    //     }
    //     getUser();
    //   }, [id]);
      
    //   const newProduct = user.filter((item)=>item.role==1)
    return (
         <Route render={()=>{  

            const newProduct = () =>{
                if(newProduct){
                    return <Redirect to={{pathname: '/admin'}}/>
                }else{
                    return <Redirect to={{pathname: '/user/userDashboard'}}/>
                }
            }                  
             
         }} />

         

         
    )
}

export default PrivateSignin
