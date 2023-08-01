import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Router from 'next/router'
import {supabase} from '@/components/init'
import { createClient } from '@supabase/supabase-js'


export default function Admin() {
async function invite() {
const { data, error } = await supabase.auth.admin.inviteUserByEmail('joel+inviteduser@supabase.io', {
data: {
  special: 'email'
}

})

}

async function signUp() {
console.log("Hello")
const { data, error } = await supabase.auth.signUp({
email: 'joel+18@supabase.com',
password: 'examplepassword',
})
}

async function createAdminUser() {

const { data, error } = await supabase.auth.admin.createUser({
  email: 'joel+3333333@supabase.io',
  user_metadata: { name: 'Yoda' },
  app_metadata: { name: 'other' }
})
}


async function generateSignUpLink() {

const { data, error } = await supabase.auth.admin.generateLink({
  type: 'signup',
  email: 'email@example.com',
  password: 'secret'
})
console.log(data)
}


return (
  <>
    <button onClick={signUp}>Sign Up (Email)</button>
    <button onClick={createAdminUser}>Create an admin user</button>
    <button onClick={invite}> Invite a user </button>
    <button onClick={generateSignUpLink}> Generate Signup Link </button>
  </>
)
}
