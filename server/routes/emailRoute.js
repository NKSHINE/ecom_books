const express = require("express");
const { google } = require("googleapis");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const oAuth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    // Use refresh token or manually authorized token for real app
    oAuth2Client.setCredentials({
      // This needs a token with Gmail access.
      refresh_token: "" // get this manually from OAuth Playground
    });

    const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

    const messageParts = [
      `From: Me <${process.env.EMAIL_FROM}>`,
      `To: ${process.env.EMAIL_TO}`,
      "Subject: 🎉 Order Confirmation",
      "MIME-Version: 1.0",
      "Content-Type: text/plain; charset=utf-8",
      "",
      "Thank you for your order. Your books will be shipped soon!"
    ];

    const message = messageParts.join("\n");
    const encodedMessage = Buffer.from(message).toString("base64").replace(/\+/g, "-").replace(/\//g, "_");

    await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedMessage
      }
    });

    res.send("Email sent ✅");
  } catch (err) {
    console.error("Gmail API error", err);
    res.status(500).send("Failed to send email");
  }
});

module.exports = router;
