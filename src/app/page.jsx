"use client";
import React, { useState, useEffect } from 'react';
import supabase from './supabase-client'
import MangroveGuardMain from '@/components/MangroveGuardMain';
import HeroSection from '../components/HeroSection';

const page = () => {
  
  return (
    <>
      
      <MangroveGuardMain />
    </>
  );
};

export default page;
