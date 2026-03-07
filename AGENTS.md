# ColorMeHex

> Words are worth 16 million colors

A Vue 3 + Vite PWA that converts text into hex colors using a hash algorithm.

## Stack

- **Framework**: Vue 3 (Composition API)
- **Build**: Vite 7
- **Testing**: Playwright
- **Package Manager**: pnpm
- **PWA**: vite-plugin-pwa with Workbox

## Commands

| Command                    | Description          |
| -------------------------- | -------------------- |
| `pnpm dev`                 | Start dev server     |
| `pnpm build`               | Build for production |
| `pnpm test`                | Run Playwright tests |
| `pnpm lint`                | Run ESLint           |
| `pnpm generate-pwa-assets` | Regenerate PWA icons |

## Project Structure

- `src/App.vue` - Main app component (all logic in single file)
- `src/main.js` - Entry point
- `tests/app.spec.ts` - Playwright tests
- `vite.config.ts` - Vite + PWA config
- `eslint.config.js` - ESLint config (Vue 3 + Prettier)

## Key Features

- Text → hex color via hash algorithm (`hashCode` → `intToRGB`)
- Birthday mode with confetti (canvas-confetti)
- Clipboard copy & native share
- URL query params: `?text=Kevin&birthday`
- SEO via @unhead/vue

## Linting & Formatting

- **ESLint**: Vue 3 essential rules + Prettier compatibility
- **Prettier**: Used via ESLint integration and pre-commit hook (pretty-quick)
- Run `pnpm lint` to check

## Notes

- All app logic is in a single `App.vue` file
- Uses CSS variables for dynamic theming based on generated color
- Inverted text color computed via `invert-color` library
