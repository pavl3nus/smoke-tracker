import { useState, useMemo } from 'react';
import type { SmokeLog } from '../types/smoke';
import { 
  SortSmokelogsByDate, 
  SortSmokelogsByCount, 
  sortSmokeLogsByReason 
} from '../utils/sort';

type SortField = 'date' | 'reason' | 'count';
type SortOrder = 'asc' | 'desc';

export function useSmokeLogsSorting(smokeLogs: SmokeLog[] | undefined) {
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  // Обработчик изменения поля сортировки
  const handleSortFieldChange = (value: string) => {
    setSortField(value as SortField);
  };

  // Обработчик изменения порядка сортировки
  const handleSortOrderChange = (checked: boolean) => {
    setSortOrder(checked ? 'asc' : 'desc');
  };

  // Отсортированные данные с использованием ваших функций
  const sortedLogs = useMemo(() => {
    if (!smokeLogs || smokeLogs.length === 0) return [];

    switch (sortField) {
      case 'date':
        return SortSmokelogsByDate(smokeLogs, sortOrder);
      
      case 'count':
        return SortSmokelogsByCount(smokeLogs, sortOrder);
      
      case 'reason':
        return sortSmokeLogsByReason(smokeLogs, sortOrder);
      
      default:
        return SortSmokelogsByDate(smokeLogs, 'desc');
    }
  }, [smokeLogs, sortField, sortOrder]);

  return {
    sortedLogs,
    sortField,
    sortOrder,
    handleSortFieldChange,
    handleSortOrderChange,
    // Для удобства - текстовые представления
    sortFieldText: {
      date: 'Дата',
      reason: 'Причина',
      count: 'Количество'
    }[sortField],
    sortOrderText: sortOrder === 'asc' ? 'по возрастанию' : 'по убыванию'
  };
}