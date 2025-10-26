export interface Lead { id: string; phone: string; name?: string; projectId?: string; stage: 'new'|'contacted'|'qualified'|'won'|'lost'; createdAt: number; }
export interface Campaign { id: string; name: string; status: 'PAUSED'|'ACTIVE'; budgetCents?: number; adAccount?: string; createdAt: number; }
export interface Listing { id: string; projectId: string; unit?: string; status: 'draft'|'validated'|'synced'; remote?: { bayutId?: string; pfId?: string }; createdAt: number; }
