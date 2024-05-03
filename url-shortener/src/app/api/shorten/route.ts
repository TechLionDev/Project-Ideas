import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  if (!body.url) {
    return NextResponse.json({ error: "No URL provided" }, { status: 400 });
  }
  let prisma = new PrismaClient();

  let url = await prisma.uRL.create({
    data: {
      longURL: body.url,
      slug: await generateSlug()
    }
  });

  return NextResponse.json({ url: url });
}

async function generateSlug() {
    let prisma = new PrismaClient();
    let slug = Math.random().toString(36).substring(2, 8);
    let all = await prisma.uRL.findMany();
    let existing = all.find((u) => u.slug === slug);
    if (existing) {
        return generateSlug();
    }
    return slug;
}