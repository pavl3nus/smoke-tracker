export interface SmokeLog {
  id: string;
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

export type UpdateSmokeLog = {
  id: string;
  count: number;
  reason: string;
  notes?: string;
  date: string;      
  createdAt: string;
};

export interface SmokeLogFormData {
  date: Date;
  count: number;
  reason: string;
  notes?: string;
}