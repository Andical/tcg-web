# RoW-TCG — Mapa (guía para navegación y cambios)

> Web **landing / promocional** de **Ravens of War** (estudio "Fantasy Dungeon Studio"). Incluye registro de
> cuenta contra el backend. Auto-cargado por Claude Code al trabajar aquí. Si cambias el endpoint o el contrato
> de registro, **actualiza este documento**.
>
> Verificado contra el código: 2026-06-27. Web estática (HTML + CSS + JS vanilla, **sin build ni framework**).

---

## 1. Qué es y rol

Sitio web público de marketing del juego: hero con trailer, info de modos (PvP/PvE/Historia), comunidad
(Discord/Instagram/YouTube), sección "El Creador" (Ángel Jiménez "Uromir"), galería de imágenes, y un
**formulario de registro de cuenta** que llama directamente a la API de `go-server`. Bilingüe **es/en**.
Distribución prevista: Steam (próximamente) e Itch.io.

> No es la app del juego (eso es `godot-client`); es la web de captación. Lo único "funcional" más allá de
> mostrar contenido es el **registro** (y enlazar al reset de contraseña vía `web-forgot-password`).

---

## 2. Estructura de archivos

```
RoW-TCG/
├─ index.html                  → ⭐ TODA la web: maquetación + i18n + galería + registro (JS inline al final)
├─ css/
│   ├─ main.css                → ⭐ estilos REALES (referenciado por index.html)
│   └─ styles.css              → ⚠️ LEGACY, NO referenciado (ver §6)
├─ js/
│   └─ script.js              → ⚠️ LEGACY, NO referenciado (ver §6)
├─ assets/
│   ├─ gallery/gallery.json    → lista de imágenes de la galería (["1.png", ...])
│   ├─ gallery/*.png           → imágenes de la galería
│   ├─ collection.PNG, steam.svg, Itch.svg, itch-icon.svg → arte/iconos
```
Dependencias externas (CDN): **Lucide** (iconos, `data-lucide=...`) y **Google Fonts** (Cinzel/Inter). Sin npm.

---

## 3. Lógica (script inline de `index.html`, ~línea 317 en adelante)

- **i18n**: objeto `translations` (es/en) + atributos `data-i18n` / `data-i18n-placeholder`. `setLanguage(lang)`
  recorre el DOM y traduce; persiste en `localStorage`. Toggle con `#lang-toggle`.
- **Galería**: `loadGalleryImages()` hace `fetch('assets/gallery/gallery.json')` → modal con prev/next,
  thumbnails, teclado (←/→/Esc) y swipe táctil. **Para añadir imágenes: editar `gallery.json`** (+ subir el PNG).
- **Menú móvil**, efecto scroll de navbar, iconos Lucide (`lucide.createIcons()`).
- **Registro** (`enviarRegistro()`): valida en cliente (username 3–16, **solo letras**; password ≥6; confirmación),
  capitaliza el username, y llama al backend (§4).

---

## 4. Contrato con go-server (registro)

```js
const API_SERVER = 'https://portal-deeper-winning-biz.trycloudflare.com';  // ⚠️ túnel efímero, ver §6
// 1) GET  ${API_SERVER}/api/server-info        → obtiene client_version
// 2) POST ${API_SERVER}/api/users              → registro
//    body: { username, email, password, avatar, cardback, client_version }
```
- Endpoint = `HandleUsers` de go-server (registro). Éxito si `response.ok && data.code === 'SUCCESS'`.
- Maneja códigos de error de go-server: `USER_EXISTS`, `MISSING_FIELDS`, `CLIENT_VERSION_INVALID`,
  `RATE_LIMIT_IP`, `RATE_LIMIT_EMAIL`.
- Avatar/cardback por defecto hardcodeados (`assets/avatars/male/human/7.jpg`, `assets/card_backs/default.jpeg`).
- El enlace "¿Olvidaste la contraseña?" lleva al flujo de [web-forgot-password](../web-forgot-password/CLAUDE.md).

---

## 5. Recetas — "dónde toco para cambiar X"

| Quiero… | Voy a… |
|---|---|
| Cambiar la URL del backend | `const API_SERVER` en el script inline de `index.html` — **el punto que más se rompe (§6)** |
| Cambiar textos / idiomas | objeto `translations` en el script inline de `index.html` |
| Cambiar maquetación / secciones | el `<body>` de `index.html` |
| Cambiar estilos | `css/main.css` (NO `styles.css`, que está muerto) |
| Añadir/quitar imágenes de galería | `assets/gallery/gallery.json` + subir el PNG a `assets/gallery/` |
| Cambiar validación o contrato de registro | `enviarRegistro()` en `index.html` **y** `HandleUsers` de go-server (deben coincidir) |
| Cambiar enlaces de comunidad | los `<a href>` (Discord `discord.gg/ubbDskXCSJ`, etc.) en `index.html` |

---

## 6. Gotchas

- **`js/script.js` y `css/styles.css` son CÓDIGO MUERTO**: el `index.html` actual **no los referencia** (usa
  script inline + `css/main.css`). `script.js` es una versión vieja (selectores por ID estilo Tailwind, postea a
  un inexistente `register.php`). No editarlos pensando que afectan a la web; ignorar o borrar.
- **URL del backend hardcodeada a un túnel Cloudflare efímero** (`*.trycloudflare.com`) — igual que en
  `web-forgot-password`. **Cambia al reiniciar el túnel**; si el registro "no conecta", actualizar `API_SERVER`.
  Idealmente sustituir por el dominio público estable del backend/gateway. (Misma URL aparece en ambas webs →
  conviene centralizarla.)
- **Web estática pura**: sin build. Para desplegar, se sirve tal cual (nginx/host estático), como
  `web-forgot-password`.
- El registro asume que go-server expone `/api/server-info` y `/api/users` accesibles vía CORS desde el navegador.
