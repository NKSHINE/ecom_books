const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
const REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN;
const SENDER_EMAIL = process.env.GMAIL_SENDER_EMAIL;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const sendOrderConfirmation = async (toEmail, order) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: SENDER_EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    const itemList = order.items.map(item =>
      `<li>${item.book_id?.title || "Book"} - Qty: ${item.quantity}</li>`
    ).join("");

    const mailOptions = {
      from: `BookStore 📚 <${SENDER_EMAIL}>`,
      to: toEmail,
      subject: "✅ Order Confirmation - BookStore",
      html: `
        <h2>Thank you for your order!</h2>
        <p><strong>Order Summary:</strong></p>
        <ul>${itemList}</ul>
        <p><strong>Total:</strong> ₹${order.total_price}</p>
        <p><strong>Shipping Address:</strong> ${order.shipping_address}</p>
        <p><strong>Payment Method:</strong> ${order.payment_method}</p>
        <p>Status: ${order.status}</p>
        <br/>
        <p>We’ll notify you once your order is shipped.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error("Email Error:", err.message);
  }
};

module.exports = sendOrderConfirmation;
