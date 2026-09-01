import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const name = request.nextUrl.searchParams.get("name")?.trim();

  if (!name) {
    return NextResponse.json(
      { error: "Location name is required" },
      { status: 400 }
    );
  }

  const url = new URL("https://geocoding-api.open-meteo.com/v1/search");
  url.searchParams.set("name", name);
  url.searchParams.set("count", "5");
  url.searchParams.set("language", "en");
  url.searchParams.set("format", "json");

  try {
    const response = await fetch(url.toString(), {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Geocoding service failed" },
        { status: 502 }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      results: data.results ?? [],
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to search for location" },
      { status: 500 }
    );
  }
}
