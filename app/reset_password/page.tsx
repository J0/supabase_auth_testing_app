"use client";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { EnrollMFA } from "@/components/Enroll";
import { supabase } from "@/components/init";
import React, { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function ResetPage() {
  return <div>Test</div>;
}
