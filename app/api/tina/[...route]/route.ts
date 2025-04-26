import { NextResponse } from "next/server"

// This is a placeholder API route that will be replaced by the TinaCMS API
// when the TinaCMS CLI is run and the generated files are created
export async function GET() {
  return NextResponse.json(
    { message: "TinaCMS API not yet configured. Please run the TinaCMS CLI to generate the API." },
    { status: 503 },
  )
}

export async function POST() {
  return NextResponse.json(
    { message: "TinaCMS API not yet configured. Please run the TinaCMS CLI to generate the API." },
    { status: 503 },
  )
}
