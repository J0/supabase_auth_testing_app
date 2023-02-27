import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Router from 'next/router'
import {supabase} from '../components/init'
import { createClient } from '@supabase/supabase-js'


const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  async function signOut() {
           const { error } = await supabase.auth.signOut()
           console.log(error)
  }
  async function signUp() {
  console.log("Hello")
  const { data, error } = await supabase.auth.signUp({
  email: 'exam123a@email.com',
  password: 'example-password',
})
}
async function signIn() {
const { data } = await supabase.auth.signInWithPassword({
  email: 'exam123a@email.com',
  password: 'example-password',
})
console.log(data)

}
async function createAdminUser() {

const { data, error } = await supabase.auth.admin.createUser({
  phone: '1234567890',
  phone_confirm: true
})
   console.log("hello")
}

async function getData() {
const {mfa_data, mfa_error} = await supabase.from('test_mfa_table').select('id')
console.log(mfa_data)
console.log(mfa_error)
}

async function getAAL() {

const { data, error } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel()
const { currentLevel, nextLevel, currentAuthenticationMethods } = data
console.log(data)
console.log(currentLevel)
console.log(nextLevel)

}
// Router.push('/enroll_page')
  return (
    <>
     <div>Some stuff here </div>
     <button onClick={createAdminUser}>Create an admin user</button>
     <button onClick={signUp}>Sign Up</button>
     <button onClick={signOut}>Sign Out </button>
     <button onClick={signIn}>Sign In </button>
     <button onClick={getAAL}>Get AAL Level </button>
     <button onClick={getData}> Fetch Data </button>
    </>
  )
}
