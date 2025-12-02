import { useQuery, useQueryClient } from '@tanstack/react-query';
import { tipsApi } from '../utils/api';

export function useRandomTip() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['randomTip'],
    queryFn: async () => {
      const response = await tipsApi.getAll();
      const tips = response.data;
      
      if (!tips || tips.length === 0) {
        return null;
      }
      
      const randomIndex = Math.floor(Math.random() * tips.length);
      const randomTip = tips[randomIndex];
      
      return randomTip;
    },

    staleTime: 5 * 60 * 1000, // 5 минут
  });

  const refreshTip = () => {
    queryClient.invalidateQueries({ queryKey: ['randomTip'] });
  };

  return {
    tip: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    refreshTip,
  };
}

export function useAllTips() {
  return useQuery({
    queryKey: ['allTips'],
    queryFn: async () => {
      const response = await tipsApi.getAll();
      return response.data;
    },
  });
}