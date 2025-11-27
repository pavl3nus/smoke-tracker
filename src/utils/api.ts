import axios from 'axios';
import type { CreateSmokeLog, SmokeLog } from '../types/smoke';

const API_BASE = 'http://localhost:3001';

export const api = axios.create({
  baseURL: API_BASE,
});

export const smokeLogsApi = {
  getAll: () => api.get<SmokeLog[]>('/smokeLogs'),
  getById: (id: number) => api.get<SmokeLog>(`/smokeLogs/${id}`),
  create: (data: CreateSmokeLog) => api.post<SmokeLog>('/smokeLogs', data),
  update: (id: number, data: Partial<CreateSmokeLog>) => api.put<SmokeLog>(`/smokeLogs/${id}`, data),
  delete: (id: number) => api.delete(`/smokeLogs/${id}`),
};