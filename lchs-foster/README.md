# LCHS Foster experience — GitHub Pages prototype

## Upload to your existing GitHub Pages repository
1. Extract this ZIP on your computer.
2. In the Licking-County-Humane-Society/LCHS repository, select Add file → Upload files.
3. Drag the extracted `lchs-foster` folder into the upload area. Do not upload the ZIP itself.
4. Commit the changes and wait for the Pages deployment to finish.
5. If Pages still publishes this repository from its root, open:
   https://licking-county-humane-society.github.io/LCHS/lchs-foster/

The address above is the expected address after upload, not an already deployed page.
You can also double-click index.html to try it locally. No build or dependencies needed.

## Demo walkthrough
- Explore the overview and begin the application.
- Use sample information. Required fields validate before proceeding.
- Choose Rent to see the landlord acknowledgment.
- Choose Yes for pets to see vaccination and spay/neuter questions.
- Review the summary and preview submission.
- Preview the orientation invitation, select an example time, and preview confirmation.
- Clear demo & start over resets entries. No local storage, uploads, analytics, emails, or server requests are used by the form.

## Before production
This is a proposed experience, not an exact replacement of the current application. It uses an adult acknowledgment instead of collecting date of birth, and a primary-interest selector instead of the original multiple-choice interests. Staff must approve all fields and final policy/legal wording. Confirm short-stay/return rules, vet record requirements and collection method, response timeframe, and coordinator details.

GitHub Pages hosts static files; this prototype cannot receive applications, review applicants, send email, reserve appointments, or send reminders. Connect an approved form backend and calendar service before enabling real submissions. Keep application review as the gate before sending a scheduling invitation; hiding a scheduling URL alone is not access control. Configure dates, America/New_York timezone, availability, conflict prevention, cancellation/rescheduling, confirmations and reminders in the actual booking service. Never commit applicant data or API secrets to GitHub.

Source reference: https://lchspets.org/foster-application/ and the coordinator email supplied by Gary. Proposed scheduling and conditional-form behavior are demonstration features, not claims about the current system.

## Validation
Inline JavaScript syntax checked; HTML structure checked for duplicate IDs and missing label targets. No browser-based visual or interaction test was performed.
