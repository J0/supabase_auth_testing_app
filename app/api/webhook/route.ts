// app/api/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Webhook } from "standardwebhooks"; // Replace with actual webhook library

// Types
interface EmailData {
    token: string;
  token_hash: string;
  redirect_to: string;
  email_action_type: string;
  site_url?: string;
  token_new?: string;
  token_hash_new?: string;
}

interface WebhookPayload {
  user: {
    id: string;
    email: string;
  };
  email_data: EmailData;
}

// Helper function to get UNIX timestamp
const getUNIXTimeStamp = () => Math.floor(Date.now() / 1000);

// Helper function to sign webhook (for local development)
const signWebhookHeader = (
  webhook: Webhook,
  headers: Record<string, string>,
  payload: string
): Record<string, string> => {
  const whId = headers["webhook-id"];
  const whTimestamp = headers["webhook-timestamp"];
  const date = new Date(Number(whTimestamp) * 1000);
  const signature = webhook.sign(whId, date, payload);
  headers["webhook-signature"] = signature;
  return headers;
};

export async function POST(request: NextRequest) {
  try {
    // Retrieve Request's Payload & Headers
    const payload = await request.text();
    let headers = Object.fromEntries(request.headers.entries());
    const timestampnow = getUNIXTimeStamp();

    // Debug logging
    console.log("----TESTING WEBHOOK 000 timestampnow", timestampnow);
    console.log("----TESTING WEBHOOK 000 payload", payload);
    console.log("----TESTING WEBHOOK 000 headers", headers);

    // Get webhook secret from environment variable
    const hookSecret = process.env.SUPABASE_WEBHOOK_SEND_EMAIL_HOOK_SECRET
      ?.toString()
      ?.replace("v1,whsec_", "");

    if (!hookSecret) {
      throw new Error("Webhook secret is not configured");
    }

    console.log("----TESTING WEBHOOK 000 hookSecret", hookSecret);

    // Initialize Webhook Verification
    const wh = new Webhook(hookSecret);
    console.log("----TESTING WEBHOOK 000 wh", wh);

    // Handle local development webhook signing
    if (request.nextUrl.hostname === "localhost") {
      headers = signWebhookHeader(wh, headers, payload);
    }

    console.log("----TESTING WEBHOOK BBB");

    // Verify webhook and extract data
    const { user, email_data } = wh.verify(payload, headers) as WebhookPayload;

    // Process the webhook data
    // Add your business logic here

    return NextResponse.json({
      status: 200,
      message: "Webhook processed successfully",
      data: { userId: user.id, emailAction: email_data.email_action_type }
    });

  } catch (err) {
    console.error("\n❌ Server Error. Please Try Again Later.", err);

    return NextResponse.json(
      {
        status: 500,
        code: "server_error",
        message: "Internal server error",
        data: process.env.NODE_ENV === 'development' ? err : undefined
      },
      { status: 500 }
    );
  }
}
