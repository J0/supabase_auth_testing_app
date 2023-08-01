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
  // Router.push('/enroll_page')
  return (
    <>
      <pre
        className="p-2 text-xs overflow-scroll bg-gray-200 max-h-100 rounded"
        style={{ maxHeight: 150 }}
      ></pre>
    </>
  );
}
