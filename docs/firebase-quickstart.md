# Firebase Quickstart

## Prereqs
- Firebase project created
- Service account JSON for local seeding (optional)
- CLI: npm i -g firebase-tools

## Setup
```
npm i
cp .env.example .env.local
```

## Serve
```
npm run dev
```

## Deploy
```
firebase experiments:enable webframeworks
firebase deploy --only hosting
firebase deploy --only firestore:rules
# (if using functions) cd functions && npm run build && firebase deploy --only functions
```

## Rules
firestore.rules is included; deploy with:
```
firebase deploy --only firestore:rules
```

## Seeding data
If you want Firestore to be the source of truth:
```
npx ts-node scripts/seed-projects.ts
```
