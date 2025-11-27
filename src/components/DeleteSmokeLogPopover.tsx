import { Popover, Button, Text, Group } from '@mantine/core';
import { useDeleteSmokeLog } from '../hooks/useSmokeLogs';
import type { SmokeLog } from '../types/smoke';
import { useState } from 'react';

interface DeleteSmokeLogPopoverProps {
  smokeLog: SmokeLog;
  children: (props: { open: () => void }) => React.ReactNode;
}

export function DeleteSmokeLogPopover({ smokeLog, children }: DeleteSmokeLogPopoverProps) {
  const [opened, setOpened] = useState(false);
  const deleteMutation = useDeleteSmokeLog();

  const handleConfirmDelete = () => {
    deleteMutation.mutate(smokeLog.id, {
      onSuccess: () => {
        setOpened(false);
      },
    });
  };

  return (
    <Popover
      opened={opened}
      onChange={setOpened}
      position="bottom"
      withArrow
      shadow="md"
      width={300}
    >
      <Popover.Target>
        {children({ open: () => setOpened(true) })}
      </Popover.Target>

      <Popover.Dropdown>
        <Text size="sm" mb="md">
          Удалить запись от {new Date(smokeLog.date).toLocaleString('ru-RU')}?
        </Text>
        <Group justify="flex-end">
          <Button 
            variant="subtle" 
            size="xs" 
            onClick={() => setOpened(false)}
            disabled={deleteMutation.isPending}
          >
            Отмена
          </Button>
          <Button 
            color="red" 
            size="xs" 
            onClick={handleConfirmDelete}
            loading={deleteMutation.isPending}
          >
            Удалить
          </Button>
        </Group>
      </Popover.Dropdown>
    </Popover>
  );
}