import { Title, Card, Text, Stack, Group, SimpleGrid } from '@mantine/core';
import { useAllTips } from '../hooks/useRandomTip';
import { REASONS } from '../consts/reasons';
import { CATEGORY_CONFIG } from '../consts/catetegories';

export default function TipsPage() {
  const { data: tips, isLoading } = useAllTips();

  if (isLoading) return <Text>Загрузка советов...</Text>;

  const tipsByCategory = tips?.reduce((acc, tip) => {
    if (!acc[tip.category]) {
      acc[tip.category] = [];
    }
    acc[tip.category].push(tip);
    return acc;
  }, {} as Record<string, typeof tips>);

  return (
    <div style={{ padding: '20px' }}>
      <Title order={1} mb="xl">Полезные советы</Title>
      
      <Stack gap="xl">
        {tipsByCategory && Object.entries(tipsByCategory).map(([category, categoryTips]) => {
          const config = CATEGORY_CONFIG[category as keyof typeof CATEGORY_CONFIG] || CATEGORY_CONFIG.general;
          const reason = REASONS.find(r => r.value === category);
          
          return (
            <div key={category}>
              <Group mb="md">
                <Title order={2} size="h4">
                  {reason ? reason.label : config.label}
                </Title>
              </Group>
              
              <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
                {categoryTips.map((tip) => (
                  <Card 
                    key={tip.id}
                    shadow="sm" 
                    padding="lg" 
                    withBorder
                    style={{ borderLeft: `4px solid var(--mantine-color-${config.color}-6)` }}
                  >
                    <Text size="lg" mb="xs">
                      {tip.emoji} {tip.text}
                    </Text>
                  </Card>
                ))}
              </SimpleGrid>
            </div>
          );
        })}
      </Stack>
    </div>
  );
}