import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { smokeLogsApi } from '../utils/api';
import type { CreateSmokeLog } from '../types/smoke';

export function useSmokeLogs() {
  return useQuery({
    queryKey: ['smokeLogs'],
    queryFn: async () => {
      const response = await smokeLogsApi.getAll();
      return response.data;
    },
  });
}

export function useCreateSmokeLog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSmokeLog) => smokeLogsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['smokeLogs'] });
    },
  });
}

export function useDeleteSmokeLog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => smokeLogsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['smokeLogs'] });
    },
  });
}

export function useUpdateSmokeLog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CreateSmokeLog> }) => 
      smokeLogsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['smokeLogs'] });
    },
  });
}