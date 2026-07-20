# 🌊 Fluye — aprende inglés todos los días

**Fluye** es una aplicación web gratuita y de código abierto para que cualquier hispanohablante aprenda inglés desde cero hasta conversar con confianza. Todo está explicado en español, en sesiones cortas de 10–15 minutos, con un diseño pensado para el celular.

> Construida con React + Vite + Tailwind. El Tutor IA conversa en vivo usando la API de Claude (Anthropic).

## ✨ Funcionalidades

| Módulo | Qué hace |
|---|---|
| 📖 **Lecciones** | 15 lecciones en 3 niveles según el MCER (Básico A1–A2, Intermedio B1, Avanzado B2–C1): teoría en español, ejemplos con audio, tips de errores típicos de hispanohablantes y quiz de 5 preguntas. |
| 🃏 **Vocabulario** | 10 mazos temáticos (saludos, oficina, ventas, técnico industrial, viajes, supervivencia, salud, compras, vida diaria, números y horas) con pronunciación por voz del navegador. |
| 💬 **Tutor IA** | Conversaciones por escrito con Claude en 8 escenarios (entrevista, cliente, médico, aeropuerto, restaurante, tienda, conocer gente, libre). Responde en inglés, corrige en español 📝 y sugiere frases más naturales ✨. |
| 📈 **Progreso** | XP, títulos, racha diaria y medidor de fluidez. Todo se guarda automáticamente en tu navegador. |
| 🧭 **Intro + Manual** | Pantalla de bienvenida la primera vez y manual de uso integrado que se actualiza con cada versión. |
| 📲 **Instalable (PWA)** | Se instala en el celular como una app normal (icono propio, pantalla completa) y las lecciones y el vocabulario funcionan sin internet. |
| 💡 **Mejorar la app** | Buzón de sugerencias que se conecta con los *Issues* de este repositorio. |

## 🚀 Correr en tu computadora

Requisitos: [Node.js](https://nodejs.org) 18 o superior.

```bash
npm install     # instala dependencias
npm run dev     # abre la app en http://localhost:5173
```

Para generar la versión de producción:

```bash
npm run build   # crea la carpeta dist/
npm run preview # la sirve localmente para probarla
```

## 🔑 Activar el Tutor IA

El tutor usa la API de Claude, así que cada persona necesita su propia API key de Anthropic:

1. Crea una cuenta en [console.anthropic.com](https://console.anthropic.com) y genera una key en **Settings → API Keys**.
2. En la app, ve a la pestaña **Tutor IA**, pega tu key y toca **Guardar**.
3. La key se guarda **solo en tu navegador** (localStorage) y se usa únicamente para conversar con el tutor.

⚠️ **Nunca escribas tu API key dentro del código ni la subas a GitHub.** Cada mensaje al tutor consume unos pocos centavos de tu crédito de API; las lecciones y el vocabulario funcionan sin key y sin costo.

## 🌐 Publicar tu propia copia en GitHub Pages

1. Crea un repositorio en GitHub (por ejemplo `fluye`) y sube este proyecto a la rama `main`.
2. En `src/App.jsx`, cambia la constante `REPO_URL` por la URL de tu repositorio (para que el buzón de sugerencias apunte a tus Issues).
3. En GitHub: **Settings → Pages → Source: "GitHub Actions"**.
4. Listo: el workflow incluido (`.github/workflows/deploy.yml`) construye y publica la app automáticamente en cada push a `main`. Tu app quedará en `https://TU_USUARIO.github.io/fluye/`.

## 🗂️ Estructura del proyecto

```
fluye/
├── index.html                  # página base
├── src/
│   ├── main.jsx                # punto de entrada de React
│   ├── App.jsx                 # TODA la app: contenido, pantallas y lógica
│   └── index.css               # Tailwind
├── .github/workflows/deploy.yml# publicación automática en GitHub Pages
├── vite.config.js              # config de Vite (base "./" para Pages)
└── package.json
```

## ✏️ Personalizar el contenido

Todo el contenido vive en `src/App.jsx` como datos editables:

- `LEVELS` → lecciones (teoría, ejemplos, tips y quizzes).
- `DECKS` → mazos y tarjetas de vocabulario.
- `SCENARIOS` → escenarios del Tutor IA (puedes crear los tuyos: solo necesitan `opener` y `prompt`).
- `MANUAL` → manual de uso. **Si agregas funciones, documenta la versión en "Historial de versiones".**

## 🤝 Contribuir

¿Ideas, errores o contenido nuevo? Abre un [Issue](../../issues) o manda un Pull Request. Dentro de la app, la sección **Más → Mejorar la app** te ayuda a redactar el issue con un toque.

## 📚 Créditos y fuentes

- Niveles basados en el **MCER** (Marco Común Europeo de Referencia para las Lenguas, Consejo de Europa).
- Contenido pedagógico redactado con **Claude** (Anthropic), enfocado en errores frecuentes de hispanohablantes.
- Audio de pronunciación: **Web Speech API** del navegador. Iconos: [lucide](https://lucide.dev). Tipografías: Bricolage Grotesque y Public Sans (Google Fonts).

## 📄 Licencia

[MIT](LICENSE) — úsala, modifícala y compártela libremente.
