import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Neispravan zahtjev.' }, { status: 400 })
  }

  const { name, email, service, message } = body as Record<string, string>

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: 'Obavezna polja: ime, email, poruka.' }, { status: 400 })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Neispravan email.' }, { status: 400 })
  }

  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS

  if (!smtpUser || !smtpPass) {
    console.error('SMTP credentials nisu postavljeni.')
    return NextResponse.json({ error: 'Servis za slanje emailova nije konfiguriran.' }, { status: 500 })
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? 'smtp.hostinger.com',
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: true,
    auth: { user: smtpUser, pass: smtpPass },
  })

  const text = [
    `Ime:    ${name.trim()}`,
    `Email:  ${email.trim()}`,
    `Usluga: ${service?.trim() || '-'}`,
    '',
    message.trim(),
  ].join('\n')

  try {
    await transporter.sendMail({
      from: `"ArtBeatZone Web" <${smtpUser}>`,
      to: smtpUser,
      replyTo: email.trim(),
      subject: `Upit s web stranice — ${name.trim()}`,
      text,
    })
  } catch (err) {
    console.error('Greška pri slanju emaila:', err)
    return NextResponse.json({ error: 'Slanje nije uspjelo. Pokušajte ponovo.' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
