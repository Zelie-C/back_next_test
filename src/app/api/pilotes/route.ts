import { PrismaClient, Pilote } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient()

export async function GET(
  req: NextRequest
) {
  const pilotes = await prisma.pilote.findMany()
  return NextResponse.json({ pilotes })
}

export async function POST(
  req: NextRequest
) {
  const newPilote = await prisma.pilote.create({
    data: {
      name: "test",
      age: 18
    }
  })

  return NextResponse.json({ newPilote })
}
