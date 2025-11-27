import { ActionIcon, Group, Tooltip } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import type { SmokeLog } from '../types/smoke';
import { DeleteSmokeLogPopover } from './DeleteSmokeLogPopover';

interface SmokeLogActionsProps {
  smokeLog: SmokeLog;
  onEdit: (smokeLog: SmokeLog) => void;
}

export function SmokeLogActions({ smokeLog, onEdit }: SmokeLogActionsProps) {
  return (
    <Group gap="xs" wrap="nowrap">
      <Tooltip label="Редактировать" position="top" withArrow>
        <ActionIcon 
          variant="light" 
          color="blue"
          onClick={() => onEdit(smokeLog)}
        >
          <IconEdit size="1rem" />
        </ActionIcon>
      </Tooltip>
      
      <DeleteSmokeLogPopover smokeLog={smokeLog}>
        {({ open }) => (
          <Tooltip label="Удалить" position="top" withArrow>
            <ActionIcon 
              variant="light"
              color="red" 
              onClick={open}
            >
              <IconTrash size="1rem" />
            </ActionIcon>
          </Tooltip>
        )}
      </DeleteSmokeLogPopover>
    </Group>
  );
}