# TravelTrucks

Вебзастосунок для компанії з оренди кемперів TravelTrucks: домашня сторінка, каталог із фільтрами та Load More, сторінка деталей кемпера з галереєю, відгуками та формою бронювання.

## Основні функції

- Каталог кемперів з бекенду (`https://campers-api.goit.study`)
- Фільтрація на бекенді через query-параметри: локація, тип кузова, двигун, трансмісія
- Пагінація Load More (по 4 картки) через `useInfiniteQuery` з урахуванням фільтрів
- Сторінка деталей: галерея (Swiper), відгуки з п'ятизірковою шкалою, форма бронювання з нотифікацією

## Стек

Next.js (App Router), TypeScript, TanStack Query, Axios, Swiper, React Icons, React Hot Toast.

## Встановлення та запуск

```bash
npm install
cp .env.example .env.local
npm run dev
```

Збірка: `npm run build`, запуск збірки: `npm start`, перевірка типів: `npm run typecheck`.

## Структура

- `src/lib/api`: типи, HTTP-клієнт та хуки TanStack Query
- `src/features/catalog`: стан фільтрів
- `src/features/booking`: валідація форми бронювання
- `src/utils`: допоміжні функції

## Автор

<!-- Вкажи ім'я, GitHub та посилання на деплой -->
