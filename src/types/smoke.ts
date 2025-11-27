export interface SmokeLog {
  id: number;
  date: string;
  count: number;
  reason: string;
  notes?: string;
  createdAt: string;
}

export interface CreateSmokeLog {
  date: string;
  count: number;
  reason: string;
  notes?: string;
}

export type UpdateSmokeLog = Partial<CreateSmokeLog>;

export interface SmokeLogFormData {
  date: Date;
  count: number;
  reason: string;
  notes?: string;
}