import { 
  Title, 
  Table, 
  Text, 
  Card,
} from '@mantine/core';
import { useSmokeLogs } from '../hooks/useSmokeLogs';
import { SmokeLogActions } from '../components/SmokeLogActions';

export default function HistoryPage() {
  const { data: smokeLogs, isLoading, error } = useSmokeLogs();

  if (isLoading) return <Text>Загрузка...</Text>;
  if (error) return <Text>Ошибка загрузки данных</Text>;

  const rows = smokeLogs?.map((smokeLog) => (
    <Table.Tr key={smokeLog.id}>
      <Table.Td>{new Date(smokeLog.date).toLocaleDateString('ru-RU')}</Table.Td>
      <Table.Td>{new Date(smokeLog.date).toLocaleTimeString('ru-RU')}</Table.Td>
      <Table.Td>{smokeLog.count}</Table.Td>
      <Table.Td>
        <Text tt="capitalize">
          {smokeLog.reason === 'stress' && 'Стресс'}
          {smokeLog.reason === 'coffee' && 'С кофе'}
          {smokeLog.reason === 'boredom' && 'От скуки'}
          {smokeLog.reason === 'social' && 'В компании'}
          {smokeLog.reason === 'other' && 'Другое'}
        </Text>
      </Table.Td>
      <Table.Td>{smokeLog.notes || '-'}</Table.Td>
      <Table.Td>
        <SmokeLogActions
          smokeLog={smokeLog}
          onEdit={() => {}}
        />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div>
      <Title order={1} mb="md">История записей</Title>
      
      <Card shadow="sm" p="lg" withBorder>
        <Table.ScrollContainer minWidth={800}>
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Дата</Table.Th>
                <Table.Th>Время</Table.Th>
                <Table.Th>Количество</Table.Th>
                <Table.Th>Причина</Table.Th>
                <Table.Th>Заметки</Table.Th>
                <Table.Th>Действия</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {rows?.length ? rows : (
                <Table.Tr>
                  <Table.Td colSpan={6}>
                    <Text ta="center" c="dimmed" py="md">Нет записей</Text>
                  </Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Card>
    </div>
  );
}