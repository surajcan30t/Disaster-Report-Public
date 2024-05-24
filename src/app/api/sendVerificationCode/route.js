import { NextResponse } from "next/server";
import { Twilio } from 'twilio';

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const serviceSid = process.env.SERVICE_SID;

const client = new Twilio(accountSid, authToken);

export  async function POST(req, res) {
  
    const { phoneNumber } = await req.json();
    console.log(phoneNumber)

    try {
      const verification = await client.verify.v2.services(serviceSid)
        .verifications
        .create({ to: phoneNumber, channel: 'sms' });

        return NextResponse.json(verification,{
            status:200
        })
      
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Failed to send verification code' },{
          status:500
      })
      
    }
  
}
