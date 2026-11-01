# LCHS Tiny Gifts — GitHub Pages prototype

A mobile-friendly, static $3 donation concept. No backend, no payment requests, and no external JavaScript dependencies.

## Publish on GitHub Pages
1. Upload `index.html` and `fundraiser-sign.png` together to the root of your repository (for example, `LCHS`).
2. In the repository, open **Settings → Pages**.
3. Set **Deploy from a branch**, choose `main`, folder `/(root)`, then **Save**.
4. Visit `https://YOUR-USERNAME.github.io/LCHS/` (your actual URL depends on your username and repository).

## How it behaves
- iOS/iPhone: Apple Pay and Venmo demo buttons.
- Android: Google Pay and Venmo demo buttons.
- Desktop/unknown: all three demo buttons, plus iPhone/Android preview controls.
- Choosing any payment shows a clear **no payment was made** demo confirmation.

## IMPORTANT: printed QR codes
The QR code already embedded in the supplied sign will **not** change when a GitHub Pages prototype is published. To point scans to this prototype, regenerate the QR from the published URL and update the sign artwork. Device detection happens after visitors open the site.

## Before accepting real donations
Use the nonprofit's verified donation provider/payment account and approved payment links; don't collect card data on GitHub Pages. Confirm Apple Pay / Google Pay support from the actual processor, and verify Venmo deep linking / fallback before advertising it as active.
