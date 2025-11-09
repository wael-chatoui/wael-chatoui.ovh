import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 'dummy-key-for-build');

export async function POST(request: NextRequest) {
try {
	const body = await request.json();
	const { name, email, serviceType, implementAI, message } = body;

	// Validate required fields
	if (!name || !email || !serviceType || !message) {
	return NextResponse.json(
		{ error: 'Missing required fields: name, email, serviceType, and message are required' },
		{ status: 400 }
	);
	}

	// Validate email format
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
	return NextResponse.json(
		{ error: 'Invalid email address format' },
		{ status: 400 }
	);
	}

	// Prepare email content
	const emailContent = `
	<h2>New Service Request from ${name}</h2>
	<p><strong>Email:</strong> ${email}</p>
	<p><strong>Service Type:</strong> ${serviceType}</p>
	<p><strong>AI Implementation:</strong> ${implementAI ? 'Yes' : 'No'}</p>
	<p><strong>Message:</strong></p>
	<p>${message}</p>
	`;

	// Send email using Resend
	const { data, error } = await resend.emails.send({
	from: 'Portfolio Contact <onboarding@resend.dev>', // You'll need to update this with your verified domain
	to: ['contact.fraawdrinn@gmail.com'], // Your email
	subject: `New Service Request: ${serviceType} from ${name}`,
	html: emailContent,
	replyTo: email, // Reply to the sender's email
	});

	if (error) {
	console.error('Resend error:', error);
	return NextResponse.json(
		{ error: 'Failed to send email', details: error.message },
		{ status: 500 }
	);
	}

	return NextResponse.json(
	{
		message: 'Email sent successfully',
		data
	},
	{ status: 200 }
	);

} catch (error) {
	console.error('API error:', error);
	return NextResponse.json(
	{ error: 'Internal server error' },
	{ status: 500 }
	);
}
}
