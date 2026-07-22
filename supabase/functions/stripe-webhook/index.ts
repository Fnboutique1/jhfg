// Supabase Edge Function: stripe-webhook
//
// Deploy with:
//   supabase functions deploy stripe-webhook --no-verify-jwt
//
// Required secrets:
//   supabase secrets set STRIPE_SECRET_KEY=sk_live_xxx
//   supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_xxx   (from Stripe Dashboard -> Webhooks)
//   supabase secrets set SUPABASE_SERVICE_ROLE_KEY=eyJ...  (Project Settings -> API -> service_role)
//
// In the Stripe Dashboard, add a webhook endpoint pointing to:
//   https://<project-ref>.supabase.co/functions/v1/stripe-webhook
// listening for the "checkout.session.completed" event.
//
// What this does when a payment succeeds:
//   1. Verifies the event really came from Stripe (signature check)
//   2. Creates (or reuses) a Supabase Auth user for the student's email
//   3. Sends them a password-setup email so they can log in to /portal
//   4. Records the purchase in the `purchases` table

import Stripe from 'npm:stripe@17';
import { createClient } from 'npm:@supabase/supabase-js@2';

const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY') ?? '';
const STRIPE_WEBHOOK_SECRET = Deno.env.get('STRIPE_WEBHOOK_SECRET') ?? '';
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? '';
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
const SITE_URL = Deno.env.get('SITE_URL') ?? 'https://fnformation.com';

const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' });
const supabaseAdmin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

Deno.serve(async (req) => {
  const signature = req.headers.get('stripe-signature');
  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(body, signature ?? '', STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return new Response(`Webhook signature verification failed: ${err}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_details?.email ?? session.customer_email;
    const courseId = session.metadata?.course_id ?? 'unknown';
    const courseName = session.metadata?.course_name ?? 'Cours FN Formation';
    const amountEur = (session.amount_total ?? 0) / 100;

    if (email) {
      // Create the student's account if they don't already have one, and
      // send them an email to set their password.
      const { data: existing } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 1, email } as never);
      let userId = existing?.users?.[0]?.id;

      if (!userId) {
        const { data: invited, error: inviteError } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
          redirectTo: `${SITE_URL}/#/connection`,
        });
        if (inviteError) console.error('inviteUserByEmail error', inviteError);
        userId = invited?.user?.id;
      }

      await supabaseAdmin.from('purchases').insert({
        user_id: userId ?? null,
        email,
        course_id: courseId,
        course_name: courseName,
        amount_eur: amountEur,
        stripe_session_id: session.id,
        stripe_payment_intent: typeof session.payment_intent === 'string' ? session.payment_intent : null,
        status: 'paid',
      });
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
});
