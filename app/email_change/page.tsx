"use client"
import { supabase } from "@/components/init";
import { createClient } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";


export default function EmailChange() {
    const [inputText, setInputText] = useState("");

    async function executeEmailChange() {
        const { data, error } = await supabase.auth.updateUser({email: 'joel+anotheremail@supabase.io'})
        console.log('change')
    }

    async function verifyToken() {
        const { data, error } = await supabase.auth.verifyOtp({ token_hash: '', type: 'email_change'})
        console.log(data)
        console.log(error)
    }

    const handleChange = (e: any)=> {
      setInputText(e.target.value)
    };

    async function signUpWithEmail() {
        const { data, error } = await supabase.auth.signUp({
            email: 'joel+789@supabase.com',
            password: 'example-password',
        })

    }

    return (
        <div className="flex justify-center">
            <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Email To Verify</label>
                <input type="text" id="email" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required/>
            </div>
            <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Second Email</label>
                <input type="text" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required/>
            </div>
            <button className="bg-blue-700" onClick={executeEmailChange}>Email Change </button>
            <button className="bg-blue-700" onClick={verifyToken}>Verify Token </button>
            <button className="bg-blue-700" onClick={signUpWithEmail}>Sign Up with Email</button>

        </div>
    )
}
