# Сервер комбо карт хомяка

Это проект на Next.js, развернутый на Vercel, который предоставляет API для получения комбо карт хомяка.

## Установка и запуск

### Требования

- Node.js (версия 12.x или выше)
- npm (версия 6.x или выше)

### Установка

1. Клонируйте репозиторий:

    ```bash
    git clone https://github.com/KOTBCTAKAHE/hamster-kombo-server
    cd hamster-kombo-server
    ```

2. Установите зависимости:

    ```bash
    npm install
    ```

### Запуск

1. Запустите сервер разработки:

    ```bash
    npm run dev
    ```

2. Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## API

### Получение комбо карт

**URL:** `/api/GetCombo`

**Метод:** `GET`

**Пример ответа:**

```json
{
  "combo": ["", "", ""],
  "date": ""
}
