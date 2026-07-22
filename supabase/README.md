# Connecter Stripe + Supabase — Guide de déploiement

Le site (frontend) est déjà prêt à utiliser Stripe pour le paiement. Il ne
manque que le déploiement des deux fonctions serveur ("Edge Functions") dans
Supabase, qui font le lien sécurisé entre votre site et Stripe.

## Pourquoi ces fonctions sont nécessaires

Le site est un site statique (HTML/JS) hébergé sur Cloudflare/GitHub Pages —
il n'a pas de serveur. Or Stripe exige que la création d'une session de
paiement se fasse avec votre **clé secrète Stripe**, qui ne doit jamais
apparaître dans le code du site (n'importe qui pourrait la voler). Les Edge
Functions de Supabase servent de petit serveur intermédiaire : elles gardent
la clé secrète en sécurité et parlent à Stripe à votre place.

## Étape 1 — Installer l'outil Supabase CLI

```bash
npm install -g supabase
supabase login
```

## Étape 2 — Lier ce projet à votre projet Supabase

Depuis le dossier racine de ce projet :

```bash
supabase link --project-ref uiumwmdxkkqhnoktgoes
```

## Étape 3 — Créer votre compte Stripe et récupérer vos clés

Dans le [Dashboard Stripe](https://dashboard.stripe.com/apikeys) :
- Copiez la **Clé secrète** (`sk_live_...` ou `sk_test_...` pour tester d'abord)

## Étape 4 — Configurer les secrets sur Supabase

```bash
supabase secrets set STRIPE_SECRET_KEY=sk_live_votre_cle
supabase secrets set SITE_URL=https://fnformation.com
supabase secrets set SUPABASE_URL=https://uiumwmdxkkqhnoktgoes.supabase.co
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=votre_service_role_key
```

(La `service_role key` se trouve dans Supabase → Settings → API. Elle est
différente de la clé publique "anon" déjà utilisée dans le site — ne la
mettez JAMAIS dans le code du frontend.)

## Étape 5 — Créer la table des achats

Dans Supabase → SQL Editor, exécutez le contenu de :
`supabase/migrations/0001_purchases.sql`

## Étape 6 — Déployer les deux fonctions

```bash
supabase functions deploy create-checkout-session
supabase functions deploy stripe-webhook --no-verify-jwt
```

## Étape 7 — Connecter le webhook Stripe

Dans le [Dashboard Stripe → Webhooks](https://dashboard.stripe.com/webhooks) :
1. Ajoutez un endpoint : `https://uiumwmdxkkqhnoktgoes.supabase.co/functions/v1/stripe-webhook`
2. Sélectionnez l'événement `checkout.session.completed`
3. Copiez le "Signing secret" (`whsec_...`) affiché et ajoutez-le :

```bash
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_votre_secret
```

## Ce qui se passe automatiquement une fois tout branché

1. Un étudiant clique sur **"S'inscrire maintenant"** sur une page de cours
2. Il est redirigé vers la page de paiement sécurisée Stripe
3. Une fois le paiement effectué, Stripe informe votre fonction `stripe-webhook`
4. Le webhook crée automatiquement un compte pour l'étudiant et lui envoie un
   email pour définir son mot de passe
5. L'étudiant peut ensuite se connecter sur `/connection` et accéder à `/portal`

## Avant d'avoir terminé le déploiement

Tant que ces fonctions ne sont pas déployées, le bouton "S'inscrire
maintenant" affichera automatiquement le formulaire WhatsApp de secours — le
site reste donc pleinement fonctionnel entre-temps.

## Prochaine étape recommandée : la vidéo (Vimeo)

Une fois Stripe branché, il faudra remplacer les miniatures d'exemple du
Portail (`src/pages/PortalPage.tsx`) par vos vraies vidéos hébergées sur
Vimeo Pro (avec accès restreint par domaine). Prévenez-moi quand votre compte
Vimeo Pro est prêt et je ferai cette intégration.
