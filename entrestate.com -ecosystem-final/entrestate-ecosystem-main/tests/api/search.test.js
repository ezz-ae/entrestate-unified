
import { GET } from '@/app/api/search/route';
import { DataIntelligenceService } from '@/services/data-intelligence';

jest.mock('@/services/data-intelligence', () => ({
  DataIntelligenceService: {
    getInstance: jest.fn(() => ({
      getAllProjects: jest.fn(() => [
        { id: '1', name: 'Emaar Beachfront', developer: 'Emaar', area: 'Dubai Harbour' },
        { id: '2', name: 'Damac Lagoons', developer: 'Damac', area: 'Dubailand' },
      ]),
    })),
  },
}));

describe('GET /api/search', () => {
  it('should return all projects when no query is provided', async () => {
    const req = { nextUrl: { searchParams: new URLSearchParams() } };
    const res = await GET(req);
    const data = await res.json();
    expect(data.length).toBe(2);
  });

  it('should return filtered projects when a query is provided', async () => {
    const req = { nextUrl: { searchParams: new URLSearchParams('q=emaar') } };
    const res = await GET(req);
    const data = await res.json();
    expect(data.length).toBe(1);
    expect(data[0].name).toBe('Emaar Beachfront');
  });
});
