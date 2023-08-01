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
  let [session, setSession] = useState();
  // Keep the session up to date
  supabase.auth.onAuthStateChange((_event, session) => {
    setSession(session);
  });
  useEffect(() => {
    async function session() {
      const { data, error } = await supabase.auth.getSession();
      if (error | !data) {
        setSession("");
      } else {
        setSession(data.session);
      }
    }
    session();
  }, []);

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    console.log(error);
  }
  async function signUp() {
    const { data, error } = await supabase.auth.signUp({
      email: "joel+somspecialemail@supabase.io",
      password: "example-password",
    });
  }
  async function signIn() {
    const { data } = await supabase.auth.signInWithPassword({
      email: "joel+anothertest@supabase.io",
      password: "example-password",
    });
    console.log(data);
  }
  async function createAdminUser() {
    const { data, error } = await supabase.auth.admin.createUser({
      email: "joel+123@supabase.com",
      phone_confirm: true,
    });
    console.log(data);
    console.log(error);
    console.log("hello");
  }

  async function getData() {
    // const {mfa_data, mfa_error} = await supabase.from('test_mfa_table').select('id')
    //console.log(mfa_data)
    console.log("test");
  }

  async function getAAL() {
    //const { data, error } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel()
    //const { currentLevel, nextLevel, currentAuthenticationMethods } = data
    //console.log(currentLevel)
    // console.log(nextLevel)
    console.log("test");
  }
  async function ssoSignIn() {
    const { data, error } = await supabase.auth.signInWithSSO({
      domain: "supabase.io",
    });
    console.log(error);
    window.location.replace(data.url);
  }
  async function oauthSignIn() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "notion",
      options: {
        redirectTo: "http://localhost:3000/enroll_page",
      },
    });
    console.log(data["token"]);
  }
  async function whatsAppSignIn() {
    const { data, error } = await supabase.auth.signInWithOtp({
      phone: "+18057126935",
    });
    console.log(error);
    console.log("triggered");
  }

  async function whatsAppSignUp() {
    const { data, error } = await supabase.auth.signUp({
      phone: "+573226767365",
      password: "testsupabasenow",
      options: {
        channel: "whatsapp",
      },
    });
  }

  async function magicLinkSignIn() {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: "joel+1232152151251@supabase.io",
      options: {
        emailRedirectTo: "http://localhost:3000/enroll_page",
      },
    });
  }

  async function updateUser() {
    const { data, error } = await supabase.auth.updateUser(
      { email: "joel+anotheremail@supabase.com" },
      { redirectTo: "https://www.google.com" }
    );
  }

  async function updatePhone() {
    const { data, error } = await supabase.auth.updateUser({
      phone: "+123456789",
    });
  }
  async function oidcSignIn() {
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: "google",
      token:
        "eyJhbGciOiJSUzI1NiIsImtpZCI6IjJkOWE1ZWY1YjEyNjIzYzkxNjcxYTcwOTNjYjMyMzMzM2NkMDdkMDkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIzODkyNTkzODk5OTctdjNlNTNmN3BiNnBqZWsxaDhxbG92dGdxNmlndHNyZm0uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIzODkyNTkzODk5OTctdjNlNTNmN3BiNnBqZWsxaDhxbG92dGdxNmlndHNyZm0uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDEyMzIwNTkwMTgwMDUzMzk5MzYiLCJoZCI6InN1cGFiYXNlLmlvIiwiZW1haWwiOiJqb2VsQHN1cGFiYXNlLmlvIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJabnNlYVlwanlQcWtOaGZvSEZ6MDBnIiwibmFtZSI6IkpvZWwgTGVlIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FBY0hUdGVuVFNtVm8yY3VPTk1LZW03TWZsTWoyVzgzTS1uNXJ3RmF4YmRrPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IkpvZWwiLCJmYW1pbHlfbmFtZSI6IkxlZSIsImxvY2FsZSI6ImVuLUdCIiwiaWF0IjoxNjg0OTk3NTA2LCJleHAiOjE2ODUwMDExMDZ9.E9dhIZjBY4_4TePAQyqdpLxh9WNAqrAJPZAGg2RD6SSQyBMw0bDeHSAVdwZf9xxrjtug_O3-FyJylopBFalvmhx9_bY_2b0SYI9AvbhpZ0N8Xid3yUN2JFY1IalDw67xkKKqmKnzkQshcS6AGQ7GclQdNIqwBJOyUhol_kHQyBHUE8JEuLIF3kjZn2ouN-64M53-bNPgBfrMX0QA2y5TM1YlpThsWwKR32e3BK-9EDCK_EnStEfq9nZWkOFAbgaEkhLEuoRLRsF2klLDANcQmIQxb9nOBJGfVfJrEfS2Ro7Dlbfpp0wo_FaQh-Ymf_cco_7RTNns-8fkD8UROA5gqw",
    });
    console.log(data);
    console.log(error);
  }
  async function verifyOTP(authCode) {
    const { data, error } = await supabase.auth.verifyOtp({
      phone: "+250798975129",
      token: "851029",
      type: "sms",
    });
  }

  // Router.push('/enroll_page')
  return (
    <>
      <button onClick={createAdminUser}>Create an admin user</button>
      <button onClick={signUp}>Sign Up (Email)</button>
      <button onClick={signOut}>Sign Out </button>
      <button onClick={signIn}>Sign In </button>
      <button onClick={getAAL}>Get AAL Level </button>
      <button onClick={getData}> Fetch Data </button>
      <button onClick={ssoSignIn}> SSO Sign In </button>
      <button onClick={whatsAppSignIn}> WhatsApp Sign In </button>
      <button onClick={whatsAppSignUp}> WhatsApp Sign Up </button>
      <button onClick={oauthSignIn}>OAuth Google Sign In </button>
      <button onClick={magicLinkSignIn}> Magic Link Sign In </button>
      <button onClick={updateUser}> Update User (Email) </button>
      <button onClick={updatePhone}> Update User (Phone) </button>
      <button onClick={oidcSignIn}> Sign In with OIDC </button>
      <button onClick={verifyOTP}> Verify OTP </button>

      <pre
        className="p-2 text-xs overflow-scroll bg-gray-200 max-h-100 rounded"
        style={{ maxHeight: 150 }}
      >
        {!session ? "None" : JSON.stringify(session, null, 2)}
      </pre>
    </>
  );
}
