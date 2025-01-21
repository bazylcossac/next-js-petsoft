import { prisma } from "@/lib/db";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
export async function POST(request: Request) {
  const data = await request.json();
  const signature = request.headers.get("stripe-signature");

  try {
    stripe.webhooks.constructEvent(
      data,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(err);
    return Response.json(null, { status: 400 });
  }

  await prisma.user.update({
    where: {
      email: data.data.object.customer_email,
    },
    data: {
      hasAccess: true,
    },
  });
  return Response.json(null, { status: 200 });
}
