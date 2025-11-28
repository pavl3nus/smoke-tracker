import { Popover, TextInput, NumberInput, Chip, Button, Stack, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useUpdateSmokeLog } from '../hooks/useSmokeLogs';
import type { SmokeLog, UpdateSmokeLog } from '../types/smoke';
import { useState, useEffect } from 'react';
import { REASONS } from '../consts/reasons'

interface EditSmokeLogPopoverProps {
  smokeLog: SmokeLog;
  children: (props: { open: () => void }) => React.ReactNode;
}

interface EditFormValues {
  count: number;
  reason: string;
  notes: string;
}

export function EditSmokeLogPopover({ smokeLog, children }: EditSmokeLogPopoverProps) {
  const [opened, setOpened] = useState(false);
  const updateMutation = useUpdateSmokeLog();

  const form = useForm<EditFormValues>({
    initialValues: {
      count: smokeLog.count,
      reason: smokeLog.reason,
      notes: smokeLog.notes || '',
    },
  });

  useEffect(() => {
    if (opened) {
      form.setValues({
        count: smokeLog.count,
        reason: smokeLog.reason,
        notes: smokeLog.notes || '',
      });
    }
  }, [opened, smokeLog]);

  const handleSubmit = (values: EditFormValues) => {
    console.log('Submitting form:', values); // для отладки
    
    const updateData: UpdateSmokeLog = {
      id: smokeLog.id,
      count: values.count,
      reason: values.reason,
      notes: values.notes.trim() || undefined,
      date: smokeLog.date,           // сохраняем оригинальную дату
      createdAt: smokeLog.createdAt, // сохраняем оригинальную дату создания
    };

    updateMutation.mutate(
      { id: smokeLog.id, data: updateData },
      {
        onSuccess: () => {
          console.log('Update successful');
          setOpened(false);
        },
        onError: (error) => {
          console.error('Update failed:', error);
        }
      }
    );
  };

  const handleClose = () => {
    setOpened(false);
    form.reset();
  };

  return (
    <Popover
      opened={opened}
      onChange={setOpened}
      position="bottom"
      withArrow
      shadow="md"
      width={350}
      closeOnClickOutside={true}
      closeOnEscape={true}
    >
      <Popover.Target>
        {children({ open: () => setOpened(true) })}
      </Popover.Target>

      <Popover.Dropdown>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="sm">
            <NumberInput
              label="Количество сигарет"
              min={1}
              max={10}
              {...form.getInputProps('count')}
              size="xs"
            />

            <div>
                <label style={{ 
                    display: 'block', 
                    fontSize: 'var(--mantine-font-size-xs)',
                    fontWeight: 500,
                    marginBottom: '8px'
                    }}>
                    Причина
                </label>
                <Chip.Group
                value={form.values.reason}
                onChange={(value) => form.setFieldValue('reason', value.toString())}
                >
                <Group gap="xs" wrap="wrap">
                    {REASONS.map((reason) => (
                    <Chip
                        key={reason.value}
                        value={reason.value}
                        color={reason.color}
                        size="xs"
                        variant="filled"
                    >
                    {reason.label}
                    </Chip>
                    ))}
                    </Group>
                </Chip.Group>
            </div>

            <TextInput
              label="Заметки"
              placeholder="Дополнительные заметки..."
              {...form.getInputProps('notes')}
              size="xs"
            />

            <Group justify="flex-end" gap="xs">
              <Button 
                variant="subtle" 
                size="xs" 
                type="button"
                onClick={handleClose}
                disabled={updateMutation.isPending}
              >
                Отмена
              </Button>
              <Button 
                type="submit" 
                size="xs"
                loading={updateMutation.isPending}
              >
                Сохранить
              </Button>
            </Group>
          </Stack>
        </form>
      </Popover.Dropdown>
    </Popover>
  );
}