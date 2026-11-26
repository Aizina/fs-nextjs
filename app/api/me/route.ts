import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../db";
import { users } from "../../../db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const authorization = request.headers.get(
    "authorization"
  );

  const match = authorization?.match(
    /^Bearer\s+(\S+)$/i
  );

  if (!match) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const token = match[1];

  const result = await db
    .select({
      id: users.id,
      username: users.username,
      name: users.name,
    })
    .from(users)
    .where(eq(users.token, token))
    .limit(1);

  const user = result[0];

  if (!user) {
    return NextResponse.json(
      { error: "Invalid token" },
      { status: 401 }
    );
  }

  return NextResponse.json(user, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}