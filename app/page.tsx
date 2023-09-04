"use client";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Router from "next/router";
import { supabase } from "../components/init";
import { createClient } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  async function sendWhatsAppMessage() {
    const { data, error } = await supabase.auth.signInWithOtp({
      phone: '+250798975129',
      /* options: {
       *   channel:'whatsapp',
       * } */
    })
    console.log(data)
    console.log(error)
  }
  async function signInWithAzure() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      scopes: 'email',
      redirectTo:'http://localhost:3000/enroll?param=dontwipe'
    },
  })
  }
  async function signInWithSSO() {
    console.log('test')
    const {data, error} = await supabase.auth.signInWithSSO({
      domain: 'supabase.io'
    })
    if (data?.url) {
      // redirect the user to the identity provider's authentication flow
      window.location.href = data.url
    }

  }
  async function selectSomething() {
    const { data, error } = await supabase
      .from('countries')
      .select('*')
    console.log(data)
  }
  async function signInWithEmailPassword() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'joel@supabase.io',
      password: 'testsupabasenow',
    })
    console.log(data)
    console.log(error)
  }
  // Router.push('/enroll_page')
  return (
    <>
      <button onClick={sendWhatsAppMessage}>Semd SMS</button>
      <button onClick={signInWithAzure}>Sign In With Azure</button>
      <button onClick={signInWithSSO}> Sign In With SSO </button>
      <button onClick={selectSomething}> Select </button>
      <button onClick={signInWithEmailPassword}> Sign In With Email Password </button>
      <pre
        className="p-2 text-xs overflow-scroll bg-gray-200 max-h-100 rounded"
        style={{ maxHeight: 150 }}
      ></pre>
    </>
  );
}
