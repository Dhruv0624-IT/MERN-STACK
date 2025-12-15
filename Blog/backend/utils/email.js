import nodemailer from "nodemailer";
import dns from "dns/promises";


async function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT) || 587;
  const secure = String(process.env.SMTP_SECURE || "false").toLowerCase() === "true";
  const auth = { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS };

  if (!host || !auth.user || !auth.pass) {
    throw new Error("SMTP_HOST, SMTP_USER, and SMTP_PASS are required in .env");
  }

  let resolved = host;
  try {
    const { address } = await dns.lookup(host, { family: 4 });
    resolved = address;
  } catch {
    
  }

  return nodemailer.createTransport({
    host: resolved,
    port,
    secure,
    auth,
    tls: { servername: host },
    connectionTimeout: 5000, 
    greetingTimeout: 5000,
  });
}


export async function verifyMailer() {
  try {
    const transporter = await createTransporter();
    await transporter.verify();
    console.log(" SMTP connection verified");
    return true;
  } catch (err) {
    throw new Error(`SMTP verification failed: ${err?.message || err}`);
  }
}


export async function sendOtpEmail(to, code) {
  const fromName = process.env.MAIL_FROM_NAME || "Blog App";
  const fromEmail = (process.env.MAIL_FROM_EMAIL || process.env.SMTP_USER).toLowerCase();

  if (!to) throw new Error("Recipient email is required");

  try {
    const transporter = await createTransporter();

    const info = await transporter.sendMail({
      from: `${fromName} <${fromEmail}>`,
      to,
      subject: "Your OTP Code",
      text: `Your OTP code is ${code}. It will expire in 10 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height:1.5; color:#333;">
          <h2>${fromName} - OTP Verification</h2>
          <p>Your OTP code is <strong>${code}</strong>.</p>
          <p>It will expire in 10 minutes.</p>
          <hr>
          <p style="font-size:12px; color:#666;">If you did not request this, please ignore this email.</p>
        </div>
      `,
    });

    console.log(` OTP email sent to ${to}: messageId=${info.messageId}`);
    return info;
  } catch (err) {
    const msg = err?.response?.toString?.() || err?.message || String(err);
    throw new Error(`Failed to send OTP email: ${msg}`);
  }
}
