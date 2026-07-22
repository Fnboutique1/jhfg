// Supabase Edge Function: create-checkout-session
//
// Deploy with:
//   supabase functions deploy create-checkout-session
//
// Required secrets (set once via the Supabase CLI or Dashboard):
//   supabase secrets set STRIPE_SECRET_KEY=sk_live_xxx
//   supabase secrets set SITE_URL=https://fnformation.com
//
// This function is called from the website's course detail page. It creates
// a Stripe Checkout Session server-side (so the secret key never touches the
// browser) and returns the session URL, which the frontend redirects to.

import { serve } from 'https://deno.land/std@0.203.0/http/server.ts';

const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY') ?? '';
const SITE_URL = Deno.env.get('SITE_URL') ?? 'https://fnformation.com';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { courseId, courseName, priceEur, email } = await req.json();

    if (!courseId || !courseName || !priceEur) {
      return new Response(JSON.stringify({ error: 'Missing courseId, courseName or priceEur' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Stripe expects amounts in the smallest currency unit (cents for EUR).
    const amountCents = Math.round(Number(priceEur) * 100);

    const params = new URLSearchParams();
    params.set('mode', 'payment');
    params.set('success_url', `${SITE_URL}/#/portal?checkout=success`);
    params.set('cancel_url', `${SITE_URL}/#/courses/${courseId}?checkout=cancelled`);
    params.set('line_items[0][quantity]', '1');
    params.set('line_items[0][price_data][currency]', 'eur');
    params.set('line_items[0][price_data][unit_amount]', String(amountCents));
    params.set('line_items[0][price_data][product_data][name]', courseName);
    params.set('metadata[course_id]', courseId);
    params.set('metadata[course_name]', courseName);
    if (email) {
      params.set('customer_email', email);
    }

    const stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const session = await stripeRes.json();

    if (!stripeRes.ok) {
      return new Response(JSON.stringify({ error: session.error?.message ?? 'Stripe error' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
