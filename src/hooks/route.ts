import { NextResponse } from 'next/server';

// This simulates fetching live data from your Entrestate Cloud.
function getLiveMarketData() {
  return {
    transactions: Math.floor(Math.random() * 500) + 1200,
    avgPricePerSqFt: Math.floor(Math.random() * 150) + 1450,
    developerReputation: {
      topDeveloper: "Emaar",
      score: Math.floor(Math.random() * 5) + 93,
    },
    pipelineProjects: Math.floor(Math.random() * 20) + 80,
  };
}

export async function GET(request: Request) {
  const data = getLiveMarketData();
  return NextResponse.json(data);
}