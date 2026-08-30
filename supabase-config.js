/**
 * supabase-config.js
 * 
 * SHARED SUPABASE CONFIGURATION
 * Enter your Supabase Project URL and Publishable Key below.
 * This file is loaded by both the public storefront and the admin dashboard.
 * 
 * WARNING: NEVER put your service_role, secret key, or database password in this file!
 */
window.CREWBREW_CONFIG = {
  // Enter your Supabase Project URL here (e.g. 'https://your-project-ref.supabase.co')
  supabaseUrl: 'https://hbepwgxweyxmgwsbasxc.supabase.co',

  // Enter your Supabase Publishable Key here (legacy anon keys are also supported)
  supabasePublishableKey: 'sb_publishable_iUbHiJPPdU_JoI8xjc-Kog_wXWmAaJx',

  // Set to true to activate the cloud backend, false to fall back to the local default catalog
  cloudEnabled: true
};
