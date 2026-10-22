# LCHS volunteer forms — GitHub Pages edition

A responsive, static form for the supplied LCHS volunteer waiver, social media agreement and photo/video release. Volunteers read the agreements, draw or type signatures, and download one completed PDF to email themselves. This does **not** send email automatically.

## Publish on GitHub Pages

1. Unzip this download on your computer.
2. In a new GitHub repository, choose **Add file → Upload files**.
3. Upload the **contents** of the `lchs-volunteer-forms` folder, including the `assets` folder. `index.html` should be at the repository root.
4. Commit the files to `main`.
5. In **Settings → Pages**, select **Deploy from a branch**, branch **main**, folder **/(root)**, and Save.
6. Open the address GitHub provides once deployment completes.

For an existing website repository, upload the folder as `volunteer-forms/` and link to `volunteer-forms/`. All asset URLs are relative, so GitHub project URLs and subdirectories work. No build, npm installation, plugin or API key is required.

## Volunteer experience

- Phone-friendly controls and touch drawing; a typed signature alternative.
- Separate signatures for the waiver, social media agreement and selected photo choice.
- Neither photo option is preselected. Only the selected section is completed in the PDF.
- Guardian information/signature for minors; under-16 chaperone choices and a separate guardian signature.
- All four PDF pages are retained. Staff signature and irrelevant sections stay blank.
- Completed fields and signature artwork are flattened into the downloaded PDF.
- Nothing is uploaded or emailed. Entries live in page memory only and are cleared on reload/close. No analytics, external fonts, CDN requests, browser storage or third-party scripts are used. Normal web hosting access logs can still record page visits.
- The signed PDF is saved by the volunteer’s browser. On a phone, the browser may offer an open/share/save flow instead of a desktop-style download.

## Files

- `index.html`, `styles.css`, `app.js`: interface and validation.
- `pdf.js`: PDF generation and mapping to the supplied packet.
- `assets/content.js`: original agreement text displayed on screen.
- `assets/template.js`: embedded blank PDF bytes for browser-local generation.
- `assets/blank-packet.pdf`: downloadable blank packet.
- `assets/pdf-lib.min.js`: bundled pdf-lib 1.17.1 (MIT); license included.
- `assets/logo.png`: logo from the supplied LCHS waiver.

Keep the displayed agreements and PDF template synchronized if LCHS changes wording. Replacing only the blank PDF does not replace the embedded template. The form currently uses Latin-script PDF fonts; a clear validation message prevents unsupported text from producing a broken PDF. Drawn signatures support any script.

## Future WordPress/hosting integration

The folder can be hosted as a standalone page on their existing domain or embedded in an iframe. Directly pasting all JavaScript into a WordPress page editor may be filtered; retain the static assets or integrate through a theme/plugin.

Automatic email requires a server-side endpoint or a form/email service. GitHub Pages does not run PHP or server code. Never put email-service credentials in this public JavaScript. Confirm the existing host’s server/email capabilities before choosing that integration.

## Scope

This is a download-only prototype for LCHS to review before organization-wide use. It adds no certificate-based digital signature, identity verification, server timestamp, submission receipt or audit trail. The drawn/typed signatures are visual electronic signatures placed on the PDF; no claim of legal sufficiency or LCHS approval is made.

Before rolling out, try adult and minor workflows on the actual phone/browser combinations volunteers use, and verify that the downloaded copy retains all entries and signatures.
