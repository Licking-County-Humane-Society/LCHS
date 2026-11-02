# Pet Stories - personal Drive upload test

This package contains real upload code, NOT a preconnected account. Uploading this ZIP to GitHub alone will not activate Drive uploads. Extract it first. No Google credentials are included.

## 1. Put the webpage on GitHub Pages
Create a repository and upload index.html, app.js and config.js to its root (not the ZIP). Enable Settings > Pages > Deploy from a branch > main > /root. Your address is normally https://YOURNAME.github.io/REPOSITORY/ . The form can be viewed immediately, but uploads require steps 2-4.

## 2. Authorize your personal Google Drive
Create a test folder in Drive and copy the folder ID from its URL.
In https://console.cloud.google.com/ create a project, enable Google Drive API, configure Google Auth Platform consent for External / Testing, and add your own Gmail as a test user.
Create an OAuth client of type Web application. Add this authorized redirect URI:
https://developers.google.com/oauthplayground
Open https://developers.google.com/oauthplayground . In settings select Use your own OAuth credentials and enter your client ID and client secret. Select the Drive scope https://www.googleapis.com/auth/drive and authorize your personal account. Exchange the authorization code for tokens and copy the refresh token into your backend's secret settings.
This test uses the broad Drive scope to reach your existing folder. Review that permission carefully. A production version should use narrower drive.file access and an app-created folder or Google Picker. Testing-mode refresh tokens may expire after seven days; repeat authorization if needed. Never commit tokens, client secrets or your upload code to GitHub. Do not paste them into config.js.

## 3. Deploy the backend separately
Use a Node.js web-service host supporting Node 22+, HTTPS, streamed 100 MB requests and sufficiently long upload timeouts. GitHub Pages cannot run this server. Your own existing server can also run it.
Upload backend/server.mjs and backend/package.json. Working directory: backend. Start command: npm start. There are no npm dependencies.
Set environment variables listed in backend/.env.example in the host's private configuration:
- ALLOWED_ORIGIN: https://YOURNAME.github.io (no repository path or trailing slash)
- UPLOAD_CODE: a long random private test code, entered manually in the webpage
- GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN: from step 2
- GOOGLE_FOLDER_ID: the test folder ID
- PORT: supplied by your host; otherwise 3000
Do not upload a populated .env through GitHub's browser upload interface. The example file is intentionally blank.

## 4. Connect and test
Edit config.js to contain your backend HTTPS URL followed by /upload. Commit it.
Open the GitHub Pages site on your phone. Start with a 5-second clip. Enter pet details and the test code, and submit. Success is displayed only after Google returns a file ID. Follow the Drive link and inspect Details > Description: this holds the contributor, pet, story, permission and date. There is no separate spreadsheet in this version.
Check the file directly in Drive before retrying a failed/interrupted upload. Automatic retries are intentionally absent to avoid duplicate submissions. Next test a 31-second video (browser rejects), a file over 100 MB (rejected), wrong upload code, permission unchecked, and a valid larger video.

## Scope and limits
Personal testing only. No Google login for uploaders, but a private test code is required. Do not publish the code or use it as a public shelter service. No video is made public automatically. Duration is checked in the browser, not independently verified on the server; MIME type is not proof of video contents. 1080p is preferred, not enforced; no conversion is performed. Some HEVC/MOV videos cannot preview in every browser. Use compatible MP4 for the first test.
The server streams bytes and enforces 100,000,000 bytes. It permits one active upload per process. Production needs independent media inspection, abuse/rate controls, durable deduplication, interrupted-upload recovery and monitoring. Host limits may be below 100 MB. This package has syntax checks, but has NOT been tested end-to-end against your Google account or deployed host.

References:
https://developers.google.com/workspace/drive/api/guides/manage-uploads
https://developers.google.com/identity/protocols/oauth2/web-server
https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages


## Updated concept layout
Upload index.html, styles.css, app.js and config.js into the existing pet-upload folder. Preview mode is automatic while config.js contains the placeholder URL. The form validates and previews locally; no data is sent. Do not enter a code for preview mode. The backend remains included for future setup.
