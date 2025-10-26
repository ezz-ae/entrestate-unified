# Appstore (Internal Marketplace)

The Appstore lists installable suites:
- Meta Suite (campaign launcher)
- Listing Portal Pro (Bayut/Property Finder sync)
- SuperSeller CRM (leads + WA followups)
- Reality Designer (creative hub)

## Data model
users/{uid}/apps/{appId} -> { installedAt, config, permissions }

## UI
/appstore shows cards with requirements and an Install button (TODO: connect to the data model).
