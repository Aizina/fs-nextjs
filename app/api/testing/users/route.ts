import { NextRequest, NextResponse } from "next/server";

import bcrypt from "bcryptjs";
import { db } from "../../../../db";
import { users } from "../../../../db/schema";

export async function POST(request: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      {
        error: "This endpoint is not available in production",
      },
      { status: 403 }
    );
  }

  const body = await request.json();

  const { username, name, password } = body;

  if (
    typeof username !== "string" ||
    typeof name !== "string" ||
    typeof password !== "string" ||
    !username.trim() ||
    !name.trim() ||
    !password
  ) {
    return NextResponse.json(
      { error: "Invalid user data" },
      { status: 400 }
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const result = await db
    .insert(users)
    .values({
      username,
      name,
      passwordHash,
    })
    .onConflictDoNothing({
      target: users.username,
    })
    .returning({
      id: users.id,
      username: users.username,
      name: users.name,
    });

  if (result.length === 0) {
    return NextResponse.json(
      { error: "Username already exists" },
      { status: 409 }
    );
  }

  return NextResponse.json(
    result[0],
    { status: 201 }
  );
}