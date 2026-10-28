import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getAcademyCreditsForUser, getBalance } from "@/lib/credits";

export const dynamic = "force-dynamic";

/** The signed in user's own balance and the balances of the academies they belong to. */
export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }
  const [balance, academies] = await Promise.all([
    getBalance({ userId: session.user.id }),
    getAcademyCreditsForUser(session.user.id),
  ]);
  return NextResponse.json({
    balance,
    academies: academies.map((a) => ({ ...a, renewsAt: a.renewsAt ? a.renewsAt.toISOString() : null })),
  });
}
