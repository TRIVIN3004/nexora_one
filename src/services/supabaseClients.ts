import { createClient } from '@supabase/supabase-js';

// ============================================================================
// NEXORA ONE - UNIFIED SUPABASE CLIENT REGISTRY
// Developed by Trivin
// ============================================================================

// 1. Daily Progress Report (DPR) & Attendance Core Database
export const DPR_SUPABASE_URL = 'https://qwvdyyeyzpqtxqzithso.supabase.co';
export const DPR_SUPABASE_ANON_KEY = 'sb_publishable_BpSLx7DlTk4I5weA9fK1Yg_JSvA8tWa';

export const dprSupabase = createClient(DPR_SUPABASE_URL, DPR_SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});

// 2. Nexora Connect Cloud Database (Meetings, Webinars, Tickets, Knowledge Base)
export const CONNECT_SUPABASE_URL = 'https://fygjvahzrgkuyevgvbik.supabase.co';
export const CONNECT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5Z2p2YWh6cmdrdXlldmd2YmlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3MTI1MjEsImV4cCI6MjEwMzI4ODUyMX0.lEO4pb7EM0d2X9J_eT9AlXU0imzMFsq6Sqe-0xtM7a4';

export const connectSupabase = createClient(CONNECT_SUPABASE_URL, CONNECT_SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false
  }
});

// 3. PRDAMS Digital Acknowledgement & Verification Database
export const PRDAMS_SUPABASE_URL = 'https://kuvlsmcdxxfspabovunh.supabase.co';
export const PRDAMS_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1dmxzbWNkeHhmc3BhYm92dW5oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUxNDY2NjAsImV4cCI6MjEwMDcyMjY2MH0.xRinJ1v9bNhhY9BdRM4xdyAyBIJw0Y2jehk1ya-jjxw';

export const prdamsSupabase = createClient(PRDAMS_SUPABASE_URL, PRDAMS_SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false
  }
});

// 4. Internship Portal Cloud Gateway
export const INTERNSHIP_SUPABASE_URL = 'https://eyfpckbiggamoqcukdvg.supabase.co';
export const INTERNSHIP_DB_POOLER = 'postgresql://postgres.eyfpckbiggamoqcukdvg:Trivinsakthi%40123@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?sslmode=require';
