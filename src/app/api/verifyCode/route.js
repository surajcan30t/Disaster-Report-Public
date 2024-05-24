import { Twilio } from 'twilio';
import { NextResponse } from 'next/server';

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const serviceSid = process.env.SERVICE_SID;

const client = new Twilio(accountSid, authToken);

export async function POST(req, res) {
    const { phoneNumber, code } = await req.json();
    console.log(phoneNumber, code);
    
    try {
        const verificationCheck = await client.verify.v2.services(serviceSid)
        .verificationChecks
        .create({ to: phoneNumber, code });
        return NextResponse.json(verificationCheck, { status: 200 });
    } catch (error) {
      console.error(error);
        return NextResponse.json({ error: 'Failed to verify code' }, { status: 500 });
    }
  
}
