# Email Setup Guide

This guide will help you set up the email functionality for the contact form on your portfolio website.

## Overview

The contact form uses [Resend](https://resend.com/) to send emails. Resend is a modern email API that's perfect for Next.js applications.

## Setup Steps

### 1. Create a Resend Account

1. Go to [https://resend.com/](https://resend.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Get Your API Key

1. Log in to your Resend dashboard
2. Navigate to **API Keys** in the sidebar
3. Click **Create API Key**
4. Give it a name (e.g., "Portfolio Contact Form")
5. Copy the API key (it will only be shown once!)

### 3. Add API Key to Environment Variables

1. Open the `.env.local` file in your project root
2. Replace `your_resend_api_key_here` with your actual API key:

```env
RESEND_API_KEY=re_your_actual_api_key_here
```

### 4. Configure Your Email Domain (Optional but Recommended)

By default, Resend uses `onboarding@resend.dev` as the sender email. For production, you should:

1. Add and verify your own domain in Resend dashboard
2. Update the `from` field in `/app/api/contact/route.ts`:

```typescript
from: 'Your Name <noreply@yourdomain.com>',
```

### 5. Update Recipient Email

The email is currently sent to `contact.fraawdrinn@gmail.com`. To change this:

1. Open `/app/api/contact/route.ts`
2. Update the `to` field:

```typescript
to: ['your-email@example.com'],
```

### 6. Test the Form

1. Start your development server: `npm run dev`
2. Navigate to `/services`
3. Fill out and submit the form
4. Check your email inbox

## Free Tier Limits

Resend's free tier includes:
- 100 emails per day
- 3,000 emails per month
- Perfect for personal portfolios!

## Troubleshooting

### Email not sending?

1. **Check API Key**: Make sure your `RESEND_API_KEY` is correctly set in `.env.local`
2. **Restart Server**: After changing environment variables, restart your dev server
3. **Check Console**: Look for error messages in your terminal or browser console
4. **Verify Domain**: If using a custom domain, ensure it's verified in Resend

### Email goes to spam?

1. **Verify Domain**: Add and verify your domain in Resend
2. **SPF/DKIM**: Resend automatically handles these when you verify your domain
3. **Content**: Avoid spam trigger words in your email content

## Form Fields

The contact form collects the following information:
- **Name**: The sender's full name
- **Email Address**: The sender's email (validated and used as reply-to address)
- **Service Type**: Dropdown with options (Landing Page, E-commerce, Blog, Other)
- **Implementing AI?**: Checkbox for AI integration preference
- **Message**: Detailed project description

## Email Template Customization

To customize the email template, edit the `emailContent` variable in `/app/api/contact/route.ts`:

```typescript
const emailContent = `
  <h2>New Service Request from ${name}</h2>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Service Type:</strong> ${serviceType}</p>
  <p><strong>AI Implementation:</strong> ${implementAI ? 'Yes' : 'No'}</p>
  <p><strong>Message:</strong></p>
  <p>${message}</p>
`;
```

You can add HTML styling, logos, or any other content you want.

**Note:** The sender's email is automatically set as the `replyTo` address, so you can reply directly to their email from your inbox.

## Security Notes

- Never commit your `.env.local` file to version control
- The `.env.local` file is already in `.gitignore`
- Keep your API key secret and secure
- Regenerate your API key if it's ever exposed

## Support

- Resend Documentation: [https://resend.com/docs](https://resend.com/docs)
- Resend Support: [https://resend.com/support](https://resend.com/support)

---

**Ready to go!** Once you've completed these steps, your contact form will send emails directly to your inbox whenever someone submits a service request.
