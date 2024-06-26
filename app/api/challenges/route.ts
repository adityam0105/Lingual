import { NextResponse } from "next/server";
import db from "@/db/drizzle";

import { challenges } from "@/db/schema";
import { isAdmin } from "@/lib/admin";

export async function GET(req: Request) {
  
  if (!isAdmin()) {
    return new NextResponse("unAuthorized", { status: 401 });
  }
  const data = await db.query.challenges.findMany();

  return NextResponse.json(data);
}

export async function POST(req: Request) {
 
  if (!isAdmin()) {
    return new NextResponse("unAuthorized", { status: 401 });
  }
  const body = await req.json();

  const data = await db
    .insert(challenges)
    .values({
      ...body,
    })
    .returning();

  return NextResponse.json(data[0]);
}