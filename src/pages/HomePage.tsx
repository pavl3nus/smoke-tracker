import { Title, Text, Card, Group, RingProgress, Grid } from '@mantine/core';
import { useSmokeLogs } from '../hooks/useSmokeLogs';
import { RandomTipCard } from '../components/RandomTipCard';

export default function HomePage() {
  const { data: smokeLogs } = useSmokeLogs();

  const today = new Date().toLocaleDateString('ru-RU');
  const todayLogs = smokeLogs?.filter(log => {
    return new Date(log.date).toLocaleDateString('ru-RU') == today
  }) || [];

  const todayCount = todayLogs.reduce((sum, log) => sum + log.count, 0);
  const dailyLimit = 10;
  const progress = Math.min((todayCount / dailyLimit) * 100, 100);

  return (
    <div>
      <Title order={1} mb="md">Дневник курильщика</Title>

      <Grid grow>
        <Grid.Col span={6}>
          <Card shadow="sm" p="lg">
            <Group justify="apart">
              <div>
                <Text size="lg" fw={500}>Сегодня</Text>
                <Text size="xl" fw={700}>
                  {todayCount} сигарет
                </Text>
                <Text>Цель: не более {dailyLimit} в день</Text>
              </div>
              <RingProgress
                size={80}
                thickness={8}
                sections={[{ value: progress, color: todayCount > dailyLimit ? 'red' : 'blue' }]}
                label={
                  <Text size="xs" ta="center">
                    {todayCount}/{dailyLimit}
                  </Text>
                }
              />
            </Group>
          </Card>
        </Grid.Col>

        <Grid.Col span={6}>
          <Card shadow="sm" p="lg">
            <Text size="lg" fw={500}>Общая статистика</Text>
            <Text mt="sm">Всего записей: {smokeLogs?.length || 0}</Text>
            <Text>Всего сигарет: {smokeLogs?.reduce((sum, log) => sum + log.count, 0) || 0}</Text>
          </Card>
        </Grid.Col>

        <Grid.Col span={12}>
          <RandomTipCard />
        </Grid.Col>
      </Grid>
    </div>
  );
}