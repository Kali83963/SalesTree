exports.welcomeEmail = ({
    name = '',
    time = new Date(),
  }) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to SalesTree</title>
    <style>
      /* CSS styles for the email */
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        background-color: #fff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      h1, p {
        margin-bottom: 20px;
      }
      .button {
        display: inline-block;
        background-color: #007bff;
        color: #fff;
        text-decoration: none;
        padding: 10px 20px;
        border-radius: 4px;
      }
    </style>
    </head>
    <body>
    <div class="container">
      <h1>Welcome to SalesTree!</h1>
      <p>Dear ${name},</p>
      <p>We're thrilled to have you join SalesTree, your all-in-one POS and inventory management solution. With SalesTree, you can streamline your business operations, manage your inventory efficiently, and provide excellent service to your customers.</p>
      <p>Here are a few things you can do with SalesTree:</p>
      <ul>
        <li>Manage your inventory in real-time</li>
        <li>Track sales and generate reports</li>
        <li>Create and manage customer profiles</li>
        <li>Set up promotions and discounts</li>
      </ul>
      <p>To get started, simply log in to your account using the button below:</p>
      <a href="[SalesTree URL]" class="button">Log In to SalesTree</a>
      <p>If you have any questions or need assistance, our support team is here to help. Just reply to this email, and we'll get back to you as soon as possible.</p>
      <p>Thank you for choosing SalesTree!</p>
      <p>Best regards,<br>The SalesTree Team</p>
    </div>
    </body>
    </html>
      `;
  };


exports.resetPasswordLink = (
token
) => {
  return `
  <p>You requested a password reset. Click <a href="${process.env.CLIENT_URL}/account/reset/password/${token}">here</a> ${process.env.CLIENT_URL}/account/reset/password/${token} to reset your password.</p>
  `
}