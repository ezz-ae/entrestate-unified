set -euo pipefail

# 1) Remove all duplicate "(public)" routes that clash with canonical paths
find src/app -type d -name '(public)' -prune -exec rm -rf {} +

# 2) Define the richest source tree (quotes matter: spaces + parentheses)
BASE="imports/fullfinal/entrestate.com -ecosystem-final/entrestate-ecosystem-main/src/app"

# Helper: safe copy (will create target, overwrite if exists)
copydir () {
  local SRC="$1"
  local DST="$2"
  mkdir -p "$DST"
  rsync -a --delete "$SRC/" "$DST/"
}

echo "[copy] public education surfaces"
copydir "$BASE/(public)/whatsmap"            "src/app/whatsmap"
copydir "$BASE/(public)/discover"            "src/app/discover"
copydir "$BASE/(public)/live-market-dashboard" "src/app/live-market-dashboard"
copydir "$BASE/(public)/library"             "src/app/library"
copydir "$BASE/(public)/solutions"           "src/app/solutions"
copydir "$BASE/(public)/blog"                "src/app/blog"
copydir "$BASE/(public)/docs"                "src/app/docs"
copydir "$BASE/(public)/about"               "src/app/about"

# 3) Workspace (/me) dashboards (the living suite UIs)
echo "[copy] workspace dashboards"
copydir "$BASE/(workspace)/me"               "src/app/me"
# If you want to be explicit for key suites, you can re-copy them after the blanket:
copydir "$BASE/(workspace)/me/listing-portal"     "src/app/me/listing-portal"
copydir "$BASE/(workspace)/me/meta-intelligence"  "src/app/me/meta-intelligence"

# 4) APIs those pages expect (pdf, search, flows, user, listings, whatsmap, etc.)
echo "[copy] API routes"
copydir "$BASE/api" "src/app/api"

# 5) Keep only one robots & sitemap implementation (prefer folder routes)
# Remove file-based variants if present to silence duplicate warnings
rm -f src/app/robots.ts src/app/sitemap.ts || true

echo "---- DONE ----"
echo "Now run:"
echo "  pnpm install"
echo "  pnpm run dev"
