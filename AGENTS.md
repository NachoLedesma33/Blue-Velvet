# Blue-Velvet — Project Context

## Stack
- Vite + React + TypeScript + Tailwind CSS + localStorage
- Deployed on Vercel

## Contacts
- WhatsApp: +54 9 3547 65-0627
- Instagram: https://www.instagram.com/bluevelvet.pastry/

## Decisions
- WhatsApp bold: usar `*text*` (asteriscos simples). No soporta underline.
- Zoom overlay: fixed projection con spring easing, no inline scale.
- Sin stock count en UI, sin Package import.
- `overflow-x: hidden` en html/body global para evitar scroll horizontal.
- Preview de WhatsApp: renderiza *text* como bold con <strong> via utilidad renderWhatsAppText.

## Preferences
- Product images en `.webp` en `public/Tortas-images/`
- Admin panel solo vía `#/admin` en URL (sin botón visible)
- WhatsApp mensajes: tono profesional y cálido, sin emojis rotos

## Scripts
- `npm run dev` — dev server
- `npm run build` — production build
- `npm run lint` — eslint
- `npm run typecheck` — tsc --noEmit
- `npx playwright test` — E2E tests

## Known Issues
- Lint error preexistente: `goAdmin(page: any)` en e2e tests (línea 375)
