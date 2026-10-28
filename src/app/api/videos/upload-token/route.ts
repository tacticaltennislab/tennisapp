import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { InsufficientCreditsError, creditsNeeded, getBalance, isFootageKind, resolveCreditAccount } from "@/lib/credits";

const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB

function parsePayload(raw: string | null) {
  let data: { analysisType?: unknown; durationMinutes?: unknown; academyId?: unknown } = {};
  try {
    data = raw ? JSON.parse(raw) : {};
  } catch {
    // An unreadable payload is treated as a plain stroke analysis, the cheapest case.
  }
  return {
    analysisType: isFootageKind(data.analysisType) ? data.analysisType : ("stroke" as const),
    durationMinutes: typeof data.durationMinutes === "number" ? data.durationMinutes : undefined,
    academyId: typeof data.academyId === "string" && data.academyId ? data.academyId : null,
  };
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (_pathname, clientPayload) => {
        // Refuse the upload up front when the balance cannot cover it. The credits themselves are taken
        // when the submission is registered (POST /api/videos), in one transaction with the submission.
        const payload = parsePayload(clientPayload);
        const account = await resolveCreditAccount(session.user.id, payload.academyId);
        if (!account) throw new Error("You cannot use that academy's credits.");
        const needed = creditsNeeded(payload.analysisType, payload.durationMinutes);
        const balance = await getBalance(account);
        if (balance < needed) throw new InsufficientCreditsError(needed, balance);
        return {
          allowedContentTypes: ["video/*"],
          addRandomSuffix: true,
          maximumSizeInBytes: MAX_FILE_SIZE,
        };
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed." },
      { status: 400 }
    );
  }
}
