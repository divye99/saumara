import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    await resend.emails.send({
      from: 'Saumara <onboarding@resend.dev>',
      to: 'divye2014@gmail.com',
      subject: '✨ New Ritual Letter Subscriber',
      html: `
        <div style="font-family: Georgia, serif; max-width: 480px; margin: 0 auto; padding: 40px 32px; background: #1C3A2E; color: #F5F0E8;">
          <p style="font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: #C9A96E; margin: 0 0 24px;">The Ritual Letter</p>
          <h1 style="font-size: 28px; font-weight: 300; margin: 0 0 16px; line-height: 1.3;">New subscriber</h1>
          <p style="font-size: 14px; font-weight: 300; color: rgba(245,240,232,0.7); margin: 0 0 32px; line-height: 1.6;">
            Someone just signed up to receive The Ritual Letter from Saumara.
          </p>
          <div style="background: rgba(201,169,110,0.15); border-left: 2px solid #C9A96E; padding: 16px 20px; margin-bottom: 32px;">
            <p style="font-size: 13px; color: #C9A96E; margin: 0 0 4px; letter-spacing: 0.1em; text-transform: uppercase; font-size: 10px;">Subscriber email</p>
            <p style="font-size: 16px; font-weight: 300; margin: 0; color: #F5F0E8;">${email}</p>
          </div>
          <p style="font-size: 11px; color: rgba(245,240,232,0.4); margin: 0;">saumara.com · Rituals for the Mindful Self</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Newsletter error:', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
