import { notifications } from "@mantine/notifications";

export function notify(color : string, title : string, text : string) {
    notifications.show({
        withBorder: true,
        radius: "lg",
        autoClose: 2000,
        title: title,
        message: text,
        color: color,
    });
}