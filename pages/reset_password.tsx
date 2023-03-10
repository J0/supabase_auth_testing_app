

import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import {EnrollMFA} from '../components/Enroll'
import {supabase} from '../components/init'
import React, { useState, useEffect } from 'react';


const inter = Inter({ subsets: ['latin'] })
async function reset(supabase) {


const { data, error } = await supabase.auth
  .resetPasswordForEmail('joel@supabase.io', {
  redirectTo: 'http://localhost:3000/reset_password',
})

}
async function signUp(supabase) {
const {data, error} = await supabase.auth.signUp({email: 'joel+oldemail@supabase.io', password: 'testsupabasenow'})
}

async function signIn(supabase) {
const {data, error} = await supabase.auth.signInWithPassword({email: 'joel+oldemail@supabase.io', password: 'testsupabasenow'})
}

async function updateUser(supabase) {
  const { data, error } = await supabase.auth.updateUser({email: 'joel+replaceoldmail@supabase.io'})
}

async function verifyOtp(supabase) {
    const { data, error } = await supabase.auth.verifyOtp({email: 'joel+replaceoldmail@supabase.io', token: 'cf99093a39e133c4d20861fcce5cc390739042db77a1950e4391b12e', type:'email_change'})
}
export default function ResetPassword() {
const [authUserData, setAuthUserData] = useState('');
 useEffect(() => {
   supabase.auth.onAuthStateChange(async (event, session) => {
     if (event == "PASSWORD_RECOVERY") {
       const newPassword = prompt("What would you like your new password to be?");
       const { data, error } = await supabase.auth
         .updateUser({ password: newPassword })
         setAuthUserData(data)

       if (data) {
       alert("Password updated successfully!")
       alert(data)
       setAuthUserData(data)

       }
       if (error) alert("There was an error updating your password.")
     }
   })
 }, [])
 console.log(authUserData)


return (<>
     <button onClick={() =>reset(supabase)}>Reset Password</button>
     <button onClick={()=> signUp(supabase)}>Signup</button>
     <button onClick={()=> updateUser(supabase)}>Email Change</button>
     <button onClick={()=> verifyOtp(supabase)}>Verify email change</button>
     <button onClick={()=> signIn(supabase)}> Sign In </button>
    </>)
}
