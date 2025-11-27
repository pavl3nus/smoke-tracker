import { Title, Text, Card } from '@mantine/core';

export default function HomePage() {
  return (
    <div>
      <Title order={1}>Дневник курильщика</Title>
      <Card shadow="sm" p="lg" mt="md">
        <Text>Статистика за сегодня: 0 сигарет</Text>
        <Text>Цель: не более 10 сигарет в день</Text>
      </Card>
    </div>
  );
}