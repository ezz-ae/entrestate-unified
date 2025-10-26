
import { NextRequest, NextResponse } from 'next/server';
import { DataIntelligenceService } from '@/services/data-intelligence';

export async function GET(req: NextRequest) {
  const mode = req.nextUrl.searchParams.get('mode') || 'fast';
  const query = req.nextUrl.searchParams.get('q') || '';

  const dataService = DataIntelligenceService.getInstance();
  const allProjects = dataService.getAllProjects();

  let results = [];

  if (mode === 'fast') {
    results = allProjects.filter(project =>
      project.name.toLowerCase().includes(query.toLowerCase()) ||
      project.developer.toLowerCase().includes(query.toLowerCase()) ||
      project.area.toLowerCase().includes(query.toLowerCase())
    );
  } else {
    // In a real application, you would use Gemini to interpret the query
    // and provide more intelligent results.
    results = allProjects;
  }

  return NextResponse.json(results);
}
