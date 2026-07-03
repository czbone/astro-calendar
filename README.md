# Astro Calendar Example

An Astro calendar sample using [FullCalendar](https://fullcalendar.io/) with Tailwind CSS.

![Calendar Screenshot](https://github.com/user-attachments/assets/ad352e7d-3d34-4034-8a5f-21ca3eb21c8d)

## Features

- Month calendar view with Japanese locale
- Japanese holiday integration via [holidays-jp API](https://holidays-jp.github.io/)
- Sample event API endpoints
- Tailwind CSS based styling
- SSR with the Node.js standalone adapter

## Tech Stack

- Astro v7.x
- React v19.x
- FullCalendar v6.x
- Tailwind CSS v4.x
- TypeScript v6.x
- ESLint 10 / Prettier / Sass

## Prerequisites

- Node.js >= 22.12.0 (even-numbered versions only)
- pnpm >= 11.9.0

## Setup

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Build and preview the production output:

```bash
pnpm build
pnpm preview
```

Start the production server (Node.js standalone adapter):

```bash
pnpm build
pnpm start
```

Run lint:

```bash
pnpm lint
```

Format files:

```bash
pnpm format
```

## Related Projects

- [ufcal](https://github.com/ufcal/ufcal) - Advanced calendar implementation with enhanced features and customization options

## License

[MIT](./LICENSE)