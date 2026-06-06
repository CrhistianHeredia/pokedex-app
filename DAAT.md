# PokedexApp

## Overview
PokedexApp is an Angular-based project that serves as a Pokédex application. It was generated with Angular CLI version 13.2.2 and provides development server, build, and testing capabilities. The project appears to be a client-side web application for browsing Pokémon data.

## Tech Stack
- **Runtime:** Node.js
- **Framework:** Angular 13.2.2 (via Angular CLI)
- **Language:** TypeScript (tsconfig.json present)
- **Testing:** Karma test runner (configured by Angular CLI)
- **Package Manager:** npm (implied by package.json scripts)
- **Git:** Git repository detected

## Commands
- `ng` – Run Angular CLI commands  
- `start` – `ng serve` (development server on http://localhost:4200/)  
- `build` – `ng build` (production build to `dist/` directory)  
- `watch` – `ng build --watch --configuration development` (development build with watch mode)  
- `test` – `ng test` (unit tests via Karma)  

## Project Layout
- `src/` – Source code directory (contains all application source files, components, styles, etc.)  
- `README.md` – Project documentation  
- `tsconfig.json` – TypeScript configuration  
- `package.json` – Node.js package configuration (referenced but not scanned)  
- Top-level build output: `dist/` (not scanned)  

## Deploy a GitHub Pages

1. **Build para producción** con el `base-href` del repositorio:
   ```bash
   npx ng build --configuration=production --base-href="/pokedex-app/"
   ```

2. **Assets locales** (imágenes en `src/assets/`): usar rutas absolutas con prefijo `./` en los templates:
   ```html
   <img src="./assets/img/perfil.jpg" ...>
   ```
   No usar rutas relativas como `../../../assets/` porque fallan en producción con `base-href`.

3. **Budgets de CSS**: si el build falla por tamaño de CSS, aumentar los límites en `angular.json`:
   ```json
   {
     "type": "anyComponentStyle",
     "maximumWarning": "8kb",
     "maximumError": "12kb"
   }
   ```

4. **Publicar en gh-pages** (usa `angular-cli-ghpages`):
   ```bash
   npx angular-cli-ghpages --dir=dist/pokedex-app
   ```

5. **URL del sitio**: `https://<user>.github.io/<repo>/`
   - Ejemplo: `https://crhistianheredia.github.io/pokedex-app/`

> Nota: `angular-cli-ghpages` se instala automáticamente via `npx` si no está presente.

## Conventions
- Angular CLI standard project structure  
- TypeScript strict mode: TBD (tsconfig.json present but not inspected for strict flags)  
- Test framework: Karma (configured by Angular CLI)  
- No lint configurations detected in scan output  
- No custom ESLint or Prettier configurations visible  
- No end-to-end testing setup currently (noted in README)
