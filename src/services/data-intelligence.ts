
import data from '@/lib/placeholder-data.json';

export interface Project {
    id: string;
    name: string;
    developer: string;
    area: string;
    priceFrom: string;
    country: string;
    city: string;
    status: string;
    tags: string[];
    thumbnailUrl: string;
}

export class DataIntelligenceService {
    private static instance: DataIntelligenceService;
    private projects: Project[];

    private constructor() {
        this.projects = data.projects as Project[];
    }

    public static getInstance(): DataIntelligenceService {
        if (!DataIntelligenceService.instance) {
            DataIntelligenceService.instance = new DataIntelligenceService();
        }
        return DataIntelligenceService.instance;
    }

    public getAllProjects(): Project[] {
        return this.projects;
    }

    public getProjectById(id: string): Project | undefined {
        return this.projects.find(p => p.id === id);
    }
}
