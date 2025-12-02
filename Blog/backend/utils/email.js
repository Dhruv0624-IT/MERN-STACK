import nodemailer from "nodemailer";
import dns from "dns/promises";

async function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT) || 587;
  const secure = String(process.env.SMTP_SECURE || "false").toLowerCase() === "true";
  const auth = { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS };

  let resolved = host;
  try {
    // Force IPv4 to avoid ::1 resolution issues on some systems
    const { address } = await dns.lookup(host, { family: 4 });
    resolved = address;
  } catch {
    // fallback to original hostname
  }

  return nodemailer.createTransport({
    host: resolved,
    port,
    secure,
    auth,
    tls: { servername: host },
  });
}

export async function verifyMailer() {
  try {
    const transporter = await createTransporter();
    await transporter.verify();
    return true;
  } catch (err) {
    throw new Error(`SMTP verification failed: ${err?.message || err}`);
  }
}

export async function sendOtpEmail(to, code) {
  const fromName = process.env.MAIL_FROM_NAME || "Blog App";
  const fromEmail = process.env.MAIL_FROM_EMAIL || process.env.SMTP_USER;
  try {
    const transporter = await createTransporter();
    const info = await transporter.sendMail({
      from: `${fromName} <${fromEmail}>`,
      to,
      subject: "Your OTP Code",
      text: `Your OTP code is ${code}. It will expire in 10 minutes.`,
      html: `<p>Your OTP code is <b>${code}</b>.</p><p>It will expire in 10 minutes.</p>`,
    });
    return info;
  } catch (err) {
    // Re-throw with a clearer message to surface in API
    const msg = err?.response?.toString?.() || err?.message || String(err);
    throw new Error(`Failed to send OTP email: ${msg}`);
  }
}
