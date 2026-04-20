 "use client"
 import axios from "axios";
 import { useUser } from '@clerk/nextjs';
import React, { useContext, useEffect, useState } from 'react'
import { UserDetailcontext } from "../context/UserDetailContext";

 export type UserDetail={
    name:string,
    email:string,
    credits:number

}
 
 const Provider=(
    {children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
     const {user}=useUser();
     const [UserDetail,setUserDetail]=useState<any>()

     useEffect(()=>{
        user&&CreateNewUser();
     },[user])

    const CreateNewUser = async () =>{
        const result = await axios.post('/api/users');
        console.log(result.data);
        setUserDetail(result.data);
    }
   return (
     
     <>
        <UserDetailcontext.Provider value={{UserDetail,setUserDetail}}>
        {children}
        </UserDetailcontext.Provider>
        </>
   )
 }
 
 export default Provider