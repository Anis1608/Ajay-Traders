import nodemailer from 'nodemailer';
export const fromSubmit = async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  // Create a transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "ajaytradersajayyadav@gmail.com",
      pass: "rmnx bsce tkcq trlw" // Use an App Password if you have 2FA enabled
    }
  });

  let mailOptions = {
    from: "ajaytradersajayyadav@gmail.com",
    to: "ajaytred34@gmail.com",
    subject: subject || 'New Contact Form Submission',
    text: `
      Name: ${name}
      Email: ${email || 'Not provided'}
      Phone: ${phone}
      Subject: ${subject || 'No subject'}
      Message: ${message}
    `,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email || 'Not provided'}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Subject:</strong> ${subject || 'No subject'}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send email.',
      error: error.message 
    });
  }
};