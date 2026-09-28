# GREEN-API Telegram Messenger

Веб-клиент для отправки и получения сообщений через [GREEN-API](https://green-api.com/) (Telegram).

## Запуск

```bash
yarn
yarn dev
```

Открой адрес из терминала (обычно `http://localhost:5173`).

## Вход

В кабинете GREEN-API создай **Telegram**-инстанс и скопируй:

1. `apiUrl`
2. `idInstance`
3. `apiTokenInstance`

Вставь их на странице логина.

## Использование

1. Создай чат по номеру (`79991234567`) или `@username`
2. Отправь сообщение
3. Входящие подтягиваются автоматически (long-poll)
