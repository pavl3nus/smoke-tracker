import { Title, Card, Center } from '@mantine/core';
import { CreateSmokeLogForm } from '../components/CreateSmokeLogForm';

export default function AddPage() {
  return (
    <div>
      <Title order={1} mb="md">Добавить запись</Title>
      <Center>
        <Card withBorder>
        <CreateSmokeLogForm />
      </Card>
      </Center>
      
    </div>
  );
}