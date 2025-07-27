import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { name, email, phone, position, experience, education, coverLetter, resumeUrl } = req.body;

  try {
    // Create Nodemailer transporter (use App Password if Gmail)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // Email Content
    await transporter.sendMail({
      from: `"BioGuardian HR" <${process.env.GMAIL_USER}>`,
      to: "hr@bioguardian.net",
      subject: `New Job Application: ${position}`,
      html: `
        <h2>New Job Application Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Experience:</strong> ${experience}</p>
        <p><strong>Education:</strong> ${education}</p>
        <p><strong>Cover Letter:</strong></p>
        <p>${coverLetter}</p>
        ${resumeUrl ? `<p><a href="${resumeUrl}">📄 Download Resume</a></p>` : ""}
      `,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Email Error:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
}
