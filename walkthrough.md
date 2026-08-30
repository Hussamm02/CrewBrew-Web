# Supabase Integration Walkthrough

Follow these exact steps to complete the Supabase integration securely.

## 1. Database Setup
1. Review `supabase_schema.sql` located in your project root.
2. Open the [Supabase SQL Editor](https://app.supabase.com/) for your project.
3. Paste the contents of `supabase_schema.sql` and run it to create tables, triggers, and Row Level Security policies.

## 2. Configuration
3. Open `supabase-config.js` in your text editor.
4. Enter your Supabase Project URL and Publishable Anon Key.
   > [!WARNING]
   > Do NOT enter your `service_role`, secret key, or database password here.
5. Set `cloudEnabled: true` in `supabase-config.js` to activate the cloud backend for all visitors.

## 3. Starting the Project
5. Start the website through your existing development server (e.g., Live Server or `npx serve`).

## 4. Admin Setup & Data Migration
6. Open `/admin.html` and verify the Admin login screen appears securely. The sign-in button should be enabled, meaning the config was read correctly.
7. Log in using an email and password you created in your Supabase Auth dashboard.
8. Go to the **Database** tab. Click **Upload Local Catalog to Supabase**. Read the confirmation warning and proceed to push your local data to the cloud. You will see progress counters for each entity.

## 5. Verification
9. Open the storefront (`index.html`) in a separate browser or private window. Verify the public catalog reads correctly from Supabase.
