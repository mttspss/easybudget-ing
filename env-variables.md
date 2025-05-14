# Environment Variables Required

Copy these environment variables to your `.env` file:

```
# MongoDB
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/budgetapp?retryWrites=true&w=majority"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"

# OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Stripe
STRIPE_SECRET_KEY="your-stripe-secret-key"
STRIPE_WEBHOOK_SECRET="your-stripe-webhook-secret"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your-stripe-publishable-key"
```

1. Per MongoDB Atlas:
   - Crea un account gratuito su MongoDB Atlas
   - Crea un nuovo cluster
   - Configura l'accesso di rete (Network Access) per il tuo IP
   - Crea un utente del database
   - Ottieni la stringa di connessione e sostituisci username, password e cluster con i tuoi valori

2. Per NextAuth.js Secret:
   - Genera un secret sicuro eseguendo: `openssl rand -base64 32`

3. Per Google OAuth:
   - Vai alla console Google Cloud, crea un progetto
   - Configura le credenziali OAuth, con redirect URI: `http://localhost:3000/api/auth/callback/google`

4. Per Stripe:
   - Crea un account su Stripe
   - Ottieni le chiavi API dal pannello di controllo sviluppatori 