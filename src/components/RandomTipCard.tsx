import { Card, Text, Group, Badge, Stack, ActionIcon, Loader } from '@mantine/core';
import { IconRefresh } from '@tabler/icons-react';
import { useRandomTip } from '../hooks/useRandomTip';
import { useState } from 'react';
import { CATEGORY_CONFIG } from '../consts/catetegories';

export function RandomTipCard() {
  const { tip, isLoading, isFetching, refreshTip } = useRandomTip();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    refreshTip();
    setIsRefreshing(false);
  };

  if (isLoading) {
    return (
      <Card shadow="sm" padding="lg" withBorder radius="md">
        <Group justify="center">
          <Loader size="sm" />
          <Text>Загрузка совета...</Text>
        </Group>
      </Card>
    );
  }

  if (!tip) {
    return (
      <Card shadow="sm" padding="lg" withBorder radius="md">
        <Text>Нет доступных советов</Text>
      </Card>
    );
  }

  const category = CATEGORY_CONFIG[tip.category] || CATEGORY_CONFIG.general;
  const loading = isFetching || isRefreshing;

  return (
    <Card shadow="sm" padding="lg" withBorder radius="md">
      <Stack gap="md">
        <Group justify="space-between" align="flex-start">
          <Group gap="xs">
            <Badge 
              color={category.color}
              variant="light"
              size="lg"
            >
              {category.label}
            </Badge>
          </Group>
          
          <ActionIcon 
            variant="subtle"
            onClick={handleRefresh}
            loading={loading}
            title="Новый случайный совет"
          >
            <IconRefresh size="1.2rem" />
          </ActionIcon>
        </Group>

        <Text size="xl" fw={600} style={{ lineHeight: 1.4, minHeight: '60px' }}>
          {tip.text}
        </Text>

        <Group justify="space-between" mt="sm">
          <Text size="sm" c="dimmed">
            Случайный совет • Обновляется по кнопке
          </Text>
        </Group>
      </Stack>
    </Card>
  );
}