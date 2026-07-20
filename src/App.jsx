import React, { useState, useEffect, useRef } from "react";
import {
  Home, BookOpen, Layers, MessageCircle, TrendingUp, ChevronLeft,
  ChevronRight, Check, X, Volume2, Flame, RotateCcw, Send, Award,
  Sparkles, Lock, Star, Zap, Menu, HelpCircle, Lightbulb, ChevronDown
} from "lucide-react";

/* ============================================================
   FLUYE — Inglés práctico para hispanohablantes
   Paleta "libro de texto + panel eléctrico":
   papel #F6F2E9 · tinta #22303A · verde #2E7D5B ·
   mostaza #E3A81F · cobalto #2F55A4 · vermellón #C7402A
   ============================================================ */

const C = {
  paper: "#F6F2E9",
  ink: "#22303A",
  sub: "#66727C",
  line: "#E3DCCB",
  card: "#FFFFFF",
  green: "#2E7D5B",
  greenSoft: "#E2EFE7",
  mustard: "#E3A81F",
  mustardSoft: "#F8ECCC",
  cobalt: "#2F55A4",
  cobaltSoft: "#E1E8F6",
  red: "#C7402A",
  redSoft: "#F7E2DD",
};

/* Cambia esto por la URL de TU repositorio al publicar en GitHub */
const REPO_URL = "https://github.com/NxchoRAMVEL14/Fluye";

const FONT_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Public+Sans:wght@400;500;600;700&display=swap');
.fy-root { font-family: 'Public Sans', system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
.fy-disp { font-family: 'Bricolage Grotesque', 'Public Sans', system-ui, sans-serif; }
.fy-num { font-variant-numeric: tabular-nums; }
@keyframes fy-pop { from { opacity: 0; transform: translateY(6px) scale(.98); } to { opacity: 1; transform: none; } }
.fy-pop { animation: fy-pop .28s ease both; }
@keyframes fy-needle { from { transform: rotate(-90deg); } }
@media (prefers-reduced-motion: reduce) {
  .fy-pop { animation: none; }
  * { transition: none !important; animation: none !important; }
}
`;

const XP_TITLES = ["Principiante", "Estudiante", "Conversador", "Intermedio", "Avanzado", "Casi fluido", "Fluido"];
const XP_PER_LEVEL = 120;

/* ============================ DATOS: LECCIONES ============================ */

const LEVELS = [
  {
    id: "basico",
    name: "Básico",
    cefr: "A1–A2",
    color: C.green,
    soft: C.greenSoft,
    blurb: "Los cimientos: entender y armar tus primeras frases.",
    lessons: [
      {
        id: "b1",
        title: "El verbo TO BE",
        subtitle: "ser y estar: am / is / are",
        minutes: 6,
        theory: [
          {
            heading: "Ser y estar en una sola palabra",
            text: "En inglés, «ser» y «estar» son el mismo verbo: to be. En presente solo tiene 3 formas: am (con I), is (con he/she/it) y are (con you/we/they).",
            examples: [
              { en: "I am an engineer.", es: "Soy ingeniero." },
              { en: "She is from León.", es: "Ella es de León." },
              { en: "We are ready.", es: "Estamos listos." },
            ],
          },
          {
            heading: "Las contracciones son lo normal",
            text: "Al hablar casi siempre se contrae: I am → I'm, you are → you're, she is → she's. Suenan mucho más naturales.",
            examples: [
              { en: "I'm Marco, nice to meet you.", es: "Soy Marco, mucho gusto." },
              { en: "It's expensive.", es: "Está caro." },
            ],
          },
          {
            heading: "Negar y preguntar",
            text: "Negativo: agrega not (isn't, aren't). Pregunta: invierte el orden, el verbo va primero.",
            examples: [
              { en: "He isn't here.", es: "Él no está aquí." },
              { en: "Are you ok?", es: "¿Estás bien?" },
              { en: "Is she your boss?", es: "¿Ella es tu jefa?" },
            ],
          },
        ],
        tip: "Error clásico: «I have 34 years» ❌. La edad usa to be: «I am 34 years old» ✔.",
        quiz: [
          { q: "«Yo soy ingeniero» → I ___ an engineer.", opts: ["am", "is", "are"], a: 0, ex: "Con I siempre va am." },
          { q: "«Ella está en la oficina» → She ___ in the office.", opts: ["am", "is", "are"], a: 1, ex: "he / she / it usan is." },
          { q: "La negativa correcta de «They are late»:", opts: ["They no are late.", "They aren't late.", "They isn't late."], a: 1, ex: "are + not = aren't." },
          { q: "¿Cómo preguntas «¿Estás cansado?»", opts: ["You are tired?", "Are you tired?", "Do you tired?"], a: 1, ex: "Con to be la pregunta invierte el orden: Are you…?" },
          { q: "It ___ my motorcycle.", opts: ["is", "are", "be"], a: 0, ex: "it usa is: It's my motorcycle." },
        ],
      },
      {
        id: "b2",
        title: "Presente simple",
        subtitle: "rutinas, hechos y la famosa -s",
        minutes: 7,
        theory: [
          {
            heading: "Para rutinas y hechos",
            text: "Úsalo para lo que haces siempre o lo que es verdad en general.",
            examples: [
              { en: "I work in sales.", es: "Trabajo en ventas." },
              { en: "The store opens at 9.", es: "La tienda abre a las 9." },
            ],
          },
          {
            heading: "La -s de he / she / it",
            text: "Con he, she, it el verbo lleva -s (o -es). Olvidarla es el error #1 de los hispanohablantes.",
            examples: [
              { en: "She works in León.", es: "Ella trabaja en León." },
              { en: "He watches TV at night.", es: "Él ve la tele en la noche." },
            ],
          },
          {
            heading: "Do / Does para preguntar y negar",
            text: "do (I/you/we/they) y does (he/she/it). Ojo: con does, el verbo regresa a su forma base.",
            examples: [
              { en: "Do you speak English?", es: "¿Hablas inglés?" },
              { en: "She doesn't like coffee.", es: "A ella no le gusta el café." },
            ],
          },
        ],
        tip: "Con does / doesn't el verbo pierde la -s: «She doesn't works» ❌ → «She doesn't work» ✔.",
        quiz: [
          { q: "He ___ at an electrical company.", opts: ["work", "works", "working"], a: 1, ex: "he → el verbo lleva -s." },
          { q: "___ you like tacos?", opts: ["Do", "Does", "Are"], a: 0, ex: "Con you se pregunta con Do." },
          { q: "«Ella no maneja»:", opts: ["She no drives.", "She doesn't drive.", "She doesn't drives."], a: 1, ex: "doesn't + verbo base (sin -s)." },
          { q: "We ___ in Guanajuato.", opts: ["lives", "live", "living"], a: 1, ex: "we usa el verbo base: live." },
          { q: "___ he speak English?", opts: ["Do", "Does", "Is"], a: 1, ex: "he pregunta con Does." },
        ],
      },
      {
        id: "b3",
        title: "Artículos y plurales",
        subtitle: "a / an / the y cómo hacer plurales",
        minutes: 6,
        theory: [
          {
            heading: "A / An: uno cualquiera",
            text: "a antes de sonido de consonante, an antes de sonido de vocal.",
            examples: [
              { en: "a motorcycle", es: "una moto" },
              { en: "an engineer", es: "un ingeniero" },
              { en: "an hour", es: "una hora (la h es muda)" },
            ],
          },
          {
            heading: "The: ese en específico",
            text: "the = el / la / los / las, cuando los dos saben exactamente de cuál hablan.",
            examples: [
              { en: "The client called.", es: "El cliente llamó." },
              { en: "Close the door, please.", es: "Cierra la puerta, por favor." },
            ],
          },
          {
            heading: "Plurales",
            text: "Regla general: +s. Después de s, x, ch, sh: +es. Irregulares clave: man→men, woman→women, child→children, person→people.",
            examples: [
              { en: "one box → two boxes", es: "una caja → dos cajas" },
              { en: "one child → three children", es: "un niño → tres niños" },
            ],
          },
        ],
        tip: "No uses «the» para generalizar: «The dogs are loyal» ❌ → «Dogs are loyal» ✔.",
        quiz: [
          { q: "I need ___ new laptop.", opts: ["a", "an", "the"], a: 0, ex: "«new» empieza con consonante → a." },
          { q: "She is ___ engineer.", opts: ["a", "an", "the"], a: 1, ex: "«engineer» empieza con sonido de vocal → an." },
          { q: "El plural de «person»:", opts: ["persons", "people", "peoples"], a: 1, ex: "people es el plural normal de person." },
          { q: "two ___", opts: ["box", "boxs", "boxes"], a: 2, ex: "Termina en x → +es." },
          { q: "___ sun is hot today.", opts: ["A", "An", "The"], a: 2, ex: "Es único y específico → the sun." },
        ],
      },
      {
        id: "b4",
        title: "Preguntas WH",
        subtitle: "what, where, when, who, why, how",
        minutes: 6,
        theory: [
          {
            heading: "Las palabras clave",
            text: "What (qué), Where (dónde), When (cuándo), Who (quién), Why (por qué), How (cómo).",
            examples: [
              { en: "Where are you from?", es: "¿De dónde eres?" },
              { en: "What do you do?", es: "¿A qué te dedicas?" },
            ],
          },
          {
            heading: "El orden importa",
            text: "Fórmula: WH + auxiliar (do/does/is/are) + sujeto + verbo.",
            examples: [
              { en: "When does the meeting start?", es: "¿Cuándo empieza la junta?" },
              { en: "Why are you late?", es: "¿Por qué llegas tarde?" },
            ],
          },
          {
            heading: "How + algo",
            text: "How much (precio / incontable), How many (contable), How long (duración), How often (frecuencia).",
            examples: [
              { en: "How much is it?", es: "¿Cuánto cuesta?" },
              { en: "How long does it take?", es: "¿Cuánto tarda?" },
            ],
          },
        ],
        tip: "Which en lugar de what cuando hay opciones limitadas: «Which color do you prefer, red or blue?»",
        quiz: [
          { q: "«¿Dónde trabajas?»", opts: ["Where do you work?", "Where you work?", "Where does you work?"], a: 0, ex: "WH + do + you + verbo." },
          { q: "___ is the meeting? — At 10 am.", opts: ["What", "When", "Who"], a: 1, ex: "Pregunta por tiempo → When." },
          { q: "«¿Cuánto cuesta?»", opts: ["How many is it?", "How much is it?", "How long is it?"], a: 1, ex: "Precio → How much." },
          { q: "___ do you go to the gym? — Twice a week.", opts: ["How often", "How long", "How much"], a: 0, ex: "Frecuencia → How often." },
          { q: "«¿Por qué llegas tarde?»", opts: ["Why you are late?", "Why are you late?", "Why do you late?"], a: 1, ex: "Con to be: Why + are + you…" },
        ],
      },
      {
        id: "b5",
        title: "Presente continuo",
        subtitle: "lo que está pasando ahora",
        minutes: 6,
        theory: [
          {
            heading: "Lo que pasa ahora",
            text: "be + verbo con -ing, para acciones en este momento o temporales.",
            examples: [
              { en: "I am learning English.", es: "Estoy aprendiendo inglés." },
              { en: "She is driving right now.", es: "Ella está manejando ahorita." },
            ],
          },
          {
            heading: "Continuo vs simple",
            text: "Simple = rutina. Continuo = ahora mismo.",
            examples: [
              { en: "I work in sales. (rutina)", es: "Trabajo en ventas." },
              { en: "I am working on a quote. (ahora)", es: "Estoy trabajando en una cotización." },
            ],
          },
          {
            heading: "También para planes cercanos",
            text: "Muy común para planes ya agendados.",
            examples: [
              { en: "We are traveling to Monterrey in August.", es: "Viajamos a Monterrey en agosto." },
            ],
          },
        ],
        tip: "Verbos de estado casi nunca van en -ing: want, need, like, know. «I am wanting» ❌ → «I want» ✔.",
        quiz: [
          { q: "Look! It ___ raining.", opts: ["is", "does", "has"], a: 0, ex: "be + -ing: it is raining." },
          { q: "«Estoy trabajando en una cotización.»", opts: ["I work on a quote.", "I am working on a quote.", "I working on a quote."], a: 1, ex: "Ahora mismo → am + working." },
          { q: "They ___ watching the game now.", opts: ["is", "are", "be"], a: 1, ex: "they → are." },
          { q: "¿Cuál es una RUTINA (no ahora)?", opts: ["She is calling a client.", "She calls clients every day.", "She is writing an email."], a: 1, ex: "«every day» = rutina → presente simple." },
          { q: "I ___ English to get a better job.", opts: ["am learning", "learning", "learn now"], a: 0, ex: "Proceso en curso → am learning." },
        ],
      },
    ],
  },
  {
    id: "intermedio",
    name: "Intermedio",
    cefr: "B1",
    color: C.mustard,
    soft: C.mustardSoft,
    blurb: "Pasado, futuro y matices: ya puedes contar historias.",
    lessons: [
      {
        id: "i1",
        title: "Pasado simple",
        subtitle: "-ed, irregulares y did",
        minutes: 8,
        theory: [
          {
            heading: "Regulares: +ed",
            text: "La mayoría de los verbos solo agregan -ed en pasado.",
            examples: [
              { en: "I worked late yesterday.", es: "Trabajé tarde ayer." },
              { en: "She called the supplier.", es: "Ella llamó al proveedor." },
            ],
          },
          {
            heading: "Irregulares que sí o sí necesitas",
            text: "go→went, have→had, do→did, make→made, get→got, say→said, come→came, see→saw, take→took, buy→bought.",
            examples: [
              { en: "We went to Monterrey.", es: "Fuimos a Monterrey." },
              { en: "I bought a new helmet.", es: "Compré un casco nuevo." },
            ],
          },
          {
            heading: "Did para preguntar y negar",
            text: "did + verbo en forma base (el verbo regresa a su forma normal).",
            examples: [
              { en: "Did you finish the report?", es: "¿Terminaste el reporte?" },
              { en: "He didn't come to the meeting.", es: "Él no vino a la junta." },
            ],
          },
        ],
        tip: "«Did you went» ❌ → «Did you go» ✔. Con did, el verbo va en forma base.",
        quiz: [
          { q: "I ___ the client yesterday.", opts: ["call", "called", "calling"], a: 1, ex: "Pasado regular: +ed." },
          { q: "She ___ to the office early.", opts: ["goed", "went", "go"], a: 1, ex: "go es irregular: went." },
          { q: "___ you see the email?", opts: ["Did", "Do", "Does"], a: 0, ex: "Pregunta en pasado → Did." },
          { q: "«No fuimos a la junta.»", opts: ["We didn't go to the meeting.", "We didn't went to the meeting.", "We no went to the meeting."], a: 0, ex: "didn't + verbo base: go." },
          { q: "He ___ a new phone last week.", opts: ["buyed", "bought", "buys"], a: 1, ex: "buy es irregular: bought." },
        ],
      },
      {
        id: "i2",
        title: "Futuro: will y going to",
        subtitle: "planes vs decisiones al momento",
        minutes: 7,
        theory: [
          {
            heading: "Going to: planes",
            text: "Cuando ya lo decidiste antes de hablar.",
            examples: [
              { en: "I'm going to visit the client on Friday.", es: "Voy a visitar al cliente el viernes." },
              { en: "We're going to launch the campaign.", es: "Vamos a lanzar la campaña." },
            ],
          },
          {
            heading: "Will: decisiones al momento y promesas",
            text: "Reacciones espontáneas, promesas y predicciones.",
            examples: [
              { en: "I'll send it right now.", es: "Te lo mando ahorita." },
              { en: "It will rain tomorrow.", es: "Va a llover mañana." },
            ],
          },
          {
            heading: "Preguntas",
            text: "Con going to inviertes el be; con will, will va primero.",
            examples: [
              { en: "Are you going to travel in August?", es: "¿Vas a viajar en agosto?" },
              { en: "Will you help me?", es: "¿Me ayudas?" },
            ],
          },
        ],
        tip: "Muchas veces ambos son correctos: going to suena a plan, will a reacción del momento.",
        quiz: [
          { q: "(Suena el teléfono) — I ___ answer it.", opts: ["will", "am going to", "going"], a: 0, ex: "Decisión al momento → will." },
          { q: "Ya lo decidí: «Voy a estudiar inglés a diario.»", opts: ["I will to study English daily.", "I'm going to study English daily.", "I going to study English daily."], a: 1, ex: "Plan decidido → be + going to + verbo." },
          { q: "She ___ call you back in 5 minutes.", opts: ["will", "wills", "is will"], a: 0, ex: "will nunca cambia de forma." },
          { q: "«¿Vas a ir a la expo?»", opts: ["Are you going to go to the expo?", "Do you going to the expo?", "Will you going to the expo?"], a: 0, ex: "Are + you + going to + verbo." },
          { q: "Promesa: I ___ be late, I promise.", opts: ["won't", "don't will", "not will"], a: 0, ex: "will not = won't." },
        ],
      },
      {
        id: "i3",
        title: "Presente perfecto",
        subtitle: "have/has + participio",
        minutes: 8,
        theory: [
          {
            heading: "Conecta pasado y presente",
            text: "have/has + participio, para experiencias y cosas recientes sin fecha exacta.",
            examples: [
              { en: "I have worked here for 8 years.", es: "Llevo 8 años trabajando aquí." },
              { en: "She has finished the quote.", es: "Ella ya terminó la cotización." },
            ],
          },
          {
            heading: "Ever, never, already, yet",
            text: "ever (alguna vez, en preguntas), never (nunca), already (ya), yet (todavía, en negativas y preguntas).",
            examples: [
              { en: "Have you ever been to the US?", es: "¿Alguna vez has ido a EE. UU.?" },
              { en: "I haven't finished yet.", es: "Aún no termino." },
            ],
          },
          {
            heading: "For y since",
            text: "for + duración; since + punto de inicio.",
            examples: [
              { en: "for two hours / for 8 years", es: "por dos horas / por 8 años" },
              { en: "since 2012 / since Monday", es: "desde 2012 / desde el lunes" },
            ],
          },
        ],
        tip: "Si dices CUÁNDO exactamente, usa pasado simple: «I have seen him yesterday» ❌ → «I saw him yesterday» ✔.",
        quiz: [
          { q: "I ___ sushi before.", opts: ["have never eaten", "have never ate", "never have eat"], a: 0, ex: "have + participio: eaten." },
          { q: "She ___ here since 2020.", opts: ["has worked", "have worked", "worked since"], a: 0, ex: "she → has + participio." },
          { q: "___ you ever visited Monterrey?", opts: ["Have", "Has", "Did"], a: 0, ex: "you → Have you ever…" },
          { q: "I've known him ___ 10 years.", opts: ["for", "since", "from"], a: 0, ex: "Duración → for." },
          { q: "Corrige: «I have called him yesterday.»", opts: ["I called him yesterday.", "I have call him yesterday.", "Está bien así."], a: 0, ex: "Hay fecha exacta (yesterday) → pasado simple." },
        ],
      },
      {
        id: "i4",
        title: "Verbos modales",
        subtitle: "can, could, should, must, have to",
        minutes: 7,
        theory: [
          {
            heading: "Can / Could",
            text: "Habilidad y peticiones. Could suena más cortés.",
            examples: [
              { en: "I can ride a motorcycle.", es: "Sé andar en moto." },
              { en: "Could you send me the price list?", es: "¿Podría enviarme la lista de precios?" },
            ],
          },
          {
            heading: "Should",
            text: "Para dar consejos y recomendaciones.",
            examples: [
              { en: "You should practice every day.", es: "Deberías practicar todos los días." },
            ],
          },
          {
            heading: "Must / Have to",
            text: "Obligación. Ojo: must not = prohibido, pero don't have to = no es necesario.",
            examples: [
              { en: "You must wear a helmet.", es: "Debes usar casco (obligatorio)." },
              { en: "You don't have to pay now.", es: "No es necesario que pagues ahora." },
            ],
          },
        ],
        tip: "Los modales nunca llevan -s ni «to»: «She cans» ❌, «must to go» ❌.",
        quiz: [
          { q: "(Cortés) ___ you help me with this order?", opts: ["Could", "Must", "Should"], a: 0, ex: "Petición amable → Could." },
          { q: "Consejo: You ___ sleep more.", opts: ["should", "can", "must"], a: 0, ex: "Consejo → should." },
          { q: "«No es necesario que vengas.»", opts: ["You must not come.", "You don't have to come.", "You can't come."], a: 1, ex: "don't have to = no hace falta; must not = prohibido." },
          { q: "She ___ speak three languages.", opts: ["can", "cans", "can to"], a: 0, ex: "Los modales no cambian ni llevan to." },
          { q: "Prohibido fumar aquí: You ___ smoke here.", opts: ["must not", "don't have to", "should"], a: 0, ex: "Prohibición → must not." },
        ],
      },
      {
        id: "i5",
        title: "Comparativos y superlativos",
        subtitle: "-er / -est, more / most",
        minutes: 6,
        theory: [
          {
            heading: "Palabras cortas: -er / the -est",
            text: "Adjetivos de 1–2 sílabas.",
            examples: [
              { en: "faster / the fastest", es: "más rápido / el más rápido" },
              { en: "cheaper / the cheapest", es: "más barato / el más barato" },
            ],
          },
          {
            heading: "Palabras largas: more / the most",
            text: "Adjetivos de 3+ sílabas.",
            examples: [
              { en: "more expensive / the most expensive", es: "más caro / el más caro" },
              { en: "more important", es: "más importante" },
            ],
          },
          {
            heading: "Irregulares",
            text: "good→better→the best; bad→worse→the worst; far→farther.",
            examples: [
              { en: "This quote is better than the last one.", es: "Esta cotización es mejor que la anterior." },
            ],
          },
        ],
        tip: "«More better» ❌ — better ya es comparativo por sí solo.",
        quiz: [
          { q: "This option is ___ than that one.", opts: ["cheaper", "more cheap", "cheapest"], a: 0, ex: "cheap es corta → cheaper." },
          { q: "It's the ___ product in the catalog.", opts: ["most expensive", "more expensive", "expensivest"], a: 0, ex: "Superlativo de palabra larga → the most…" },
          { q: "My English is getting ___.", opts: ["better", "more good", "gooder"], a: 0, ex: "good → better (irregular)." },
          { q: "This route is ___ than the highway.", opts: ["longer", "more long", "longest"], a: 0, ex: "long → longer." },
          { q: "That was the ___ day of the year.", opts: ["worst", "worse", "most bad"], a: 0, ex: "bad → worse → the worst." },
        ],
      },
    ],
  },
  {
    id: "avanzado",
    name: "Avanzado",
    cefr: "B2–C1",
    color: C.cobalt,
    soft: C.cobaltSoft,
    blurb: "Inglés profesional: negocios, correos y entrevistas.",
    lessons: [
      {
        id: "a1",
        title: "Condicionales",
        subtitle: "if… will / would / would have",
        minutes: 8,
        theory: [
          {
            heading: "Primer condicional: futuro real",
            text: "If + presente, will. Situaciones posibles.",
            examples: [
              { en: "If you practice daily, you will improve fast.", es: "Si practicas a diario, mejorarás rápido." },
            ],
          },
          {
            heading: "Segundo: hipotético",
            text: "If + pasado, would. Situaciones imaginarias hoy.",
            examples: [
              { en: "If I had more time, I would travel more.", es: "Si tuviera más tiempo, viajaría más." },
            ],
          },
          {
            heading: "Tercero: pasado que ya no fue",
            text: "If + had + participio, would have + participio.",
            examples: [
              { en: "If I had studied English before, I would have gotten that job.", es: "Si hubiera estudiado inglés antes, habría conseguido ese trabajo." },
            ],
          },
        ],
        tip: "Nunca pongas will después de if: «If you will come» ❌ → «If you come» ✔.",
        quiz: [
          { q: "If it rains, we ___ the meeting online.", opts: ["will have", "would have", "had"], a: 0, ex: "Posible y real → primer condicional: will." },
          { q: "If I ___ the answer, I would tell you.", opts: ["knew", "know", "would know"], a: 0, ex: "Hipotético → if + pasado (knew)." },
          { q: "If she had left earlier, she ___ the flight.", opts: ["would have caught", "would catch", "caught"], a: 0, ex: "Tercer condicional → would have + participio." },
          { q: "___ you study every day, you'll be fluent in a year.", opts: ["If", "Would", "Unless"], a: 0, ex: "Condición positiva → If." },
          { q: "«Si tuviera más dinero, compraría otra moto.»", opts: ["If I had more money, I would buy another motorcycle.", "If I would have more money, I will buy…", "If I have more money, I would bought…"], a: 0, ex: "Segundo condicional: if + had… would + verbo base." },
        ],
      },
      {
        id: "a2",
        title: "Voz pasiva",
        subtitle: "be + participio",
        minutes: 7,
        theory: [
          {
            heading: "La fórmula",
            text: "be + participio. El foco pasa del que hace la acción al objeto.",
            examples: [
              { en: "The order was shipped yesterday.", es: "El pedido se envió ayer." },
              { en: "English is spoken here.", es: "Aquí se habla inglés." },
            ],
          },
          {
            heading: "Cuándo usarla",
            text: "Cuando no importa (o no se sabe) quién lo hizo. Muy común en el trabajo.",
            examples: [
              { en: "The invoice has been paid.", es: "La factura ya fue pagada." },
              { en: "The panels are made in Monterrey.", es: "Los tableros se fabrican en Monterrey." },
            ],
          },
          {
            heading: "By: quién lo hizo",
            text: "Si quieres mencionar al autor, usa by.",
            examples: [
              { en: "The quote was approved by the manager.", es: "La cotización fue aprobada por el gerente." },
            ],
          },
        ],
        tip: "El «se» impersonal del español suele traducirse con pasiva: «Se habla inglés» → «English is spoken».",
        quiz: [
          { q: "The report ___ sent this morning.", opts: ["was", "did", "has"], a: 0, ex: "Pasiva en pasado → was + sent." },
          { q: "«Se fabrican en México.»", opts: ["They are made in Mexico.", "They make in Mexico.", "They are making in Mexico."], a: 0, ex: "Pasiva: are + made." },
          { q: "The problem has ___ solved.", opts: ["been", "be", "being"], a: 0, ex: "Presente perfecto pasivo: has been + participio." },
          { q: "This brand ___ by everyone here.", opts: ["is known", "knows", "is knowing"], a: 0, ex: "Pasiva: is + known." },
          { q: "The order will ___ delivered on Friday.", opts: ["be", "been", "being"], a: 0, ex: "Futuro pasivo: will be + participio." },
        ],
      },
      {
        id: "a3",
        title: "Phrasal verbs esenciales",
        subtitle: "verbo + partícula = nuevo significado",
        minutes: 7,
        theory: [
          {
            heading: "Qué son",
            text: "Verbo + partícula con significado propio. Se aprenden como vocabulario, no por lógica.",
            examples: [
              { en: "find out", es: "averiguar" },
              { en: "set up", es: "instalar, configurar, montar" },
            ],
          },
          {
            heading: "Los del trabajo",
            text: "Imprescindibles en correos y juntas.",
            examples: [
              { en: "follow up", es: "dar seguimiento" },
              { en: "carry out", es: "llevar a cabo" },
              { en: "figure out", es: "resolver, descifrar" },
            ],
          },
          {
            heading: "Del día a día",
            text: "Los escucharás todo el tiempo.",
            examples: [
              { en: "turn on / turn off", es: "encender / apagar" },
              { en: "pick up", es: "recoger; contestar el teléfono" },
              { en: "run out of", es: "quedarse sin" },
            ],
          },
        ],
        tip: "«Look forward to» va con -ing: «I look forward to hearing from you» (el clásico de los correos).",
        quiz: [
          { q: "I'll ___ with the client tomorrow. (dar seguimiento)", opts: ["follow up", "follow on", "follow out"], a: 0, ex: "follow up = dar seguimiento." },
          { q: "Can you ___ the projector? (encender)", opts: ["turn on", "turn in", "take on"], a: 0, ex: "turn on = encender." },
          { q: "We ___ coffee. (nos quedamos sin)", opts: ["ran out of", "ran off", "ran away"], a: 0, ex: "run out of = quedarse sin." },
          { q: "I need to ___ what happened. (averiguar)", opts: ["find out", "find up", "look out"], a: 0, ex: "find out = averiguar." },
          { q: "I look forward to ___ you.", opts: ["meeting", "meet", "to meet"], a: 0, ex: "look forward to + -ing." },
        ],
      },
      {
        id: "a4",
        title: "Inglés de negocios",
        subtitle: "correos, juntas y clientes",
        minutes: 8,
        theory: [
          {
            heading: "Correos que suenan pro",
            text: "Frases hechas que se usan tal cual.",
            examples: [
              { en: "I'm writing to follow up on my last email.", es: "Le escribo para dar seguimiento a mi último correo." },
              { en: "Please find attached the quote.", es: "Adjunto la cotización." },
              { en: "Looking forward to hearing from you.", es: "Quedo pendiente de su respuesta." },
            ],
          },
          {
            heading: "En juntas",
            text: "Para abrir, participar y cerrar.",
            examples: [
              { en: "Let's get started.", es: "Empecemos." },
              { en: "Could you share your screen?", es: "¿Podrías compartir tu pantalla?" },
              { en: "To sum up…", es: "En resumen…" },
            ],
          },
          {
            heading: "Negociar con clientes",
            text: "Las preguntas y respuestas del día a día en ventas.",
            examples: [
              { en: "What's your budget for this project?", es: "¿Cuál es su presupuesto para este proyecto?" },
              { en: "We can offer a 10% discount on volume.", es: "Podemos ofrecer 10% de descuento por volumen." },
              { en: "The lead time is two weeks.", es: "El tiempo de entrega es de dos semanas." },
            ],
          },
        ],
        tip: "Falso amigo clásico: «actually» = «de hecho», NO «actualmente» (eso es currently).",
        quiz: [
          { q: "«Adjunto la factura»:", opts: ["Please find attached the invoice.", "I send you attached the invoice.", "Attached I send the invoice."], a: 0, ex: "Fórmula estándar de correo profesional." },
          { q: "«Quedo pendiente de su respuesta»:", opts: ["I look forward to hearing from you.", "I wait your answer.", "I hope you answer me soon."], a: 0, ex: "La forma más profesional y natural." },
          { q: "«Actualmente trabajo en León»:", opts: ["Actually, I work in León.", "Currently, I work in León.", "Nowdays I work in León."], a: 1, ex: "actualmente = currently; actually = de hecho." },
          { q: "El tiempo de entrega:", opts: ["lead time", "deliver hour", "time of arrive"], a: 0, ex: "lead time = tiempo de entrega." },
          { q: "Para cerrar una junta:", opts: ["To sum up, we agreed on three points.", "For finish, we agreed…", "To resume, we agreed…"], a: 0, ex: "to sum up = en resumen (resume = reanudar, otro falso amigo)." },
        ],
      },
      {
        id: "a5",
        title: "Entrevista de trabajo",
        subtitle: "véndete en inglés",
        minutes: 8,
        theory: [
          {
            heading: "«Tell me about yourself»",
            text: "Fórmula ganadora: presente (tu rol actual) + pasado (experiencia clave) + futuro (por qué este puesto).",
            examples: [
              { en: "I'm a nurse with 8 years of experience in intensive care.", es: "Soy enfermera con 8 años de experiencia en terapia intensiva." },
            ],
          },
          {
            heading: "Fortalezas y logros con datos",
            text: "Los números convencen más que los adjetivos.",
            examples: [
              { en: "I increased sales by 20% last year.", es: "Aumenté las ventas 20% el año pasado." },
              { en: "My strength is building long-term client relationships.", es: "Mi fortaleza es construir relaciones de largo plazo con clientes." },
            ],
          },
          {
            heading: "Tus preguntas al final",
            text: "Preguntar bien también te vende.",
            examples: [
              { en: "What does success look like in this role?", es: "¿Cómo se ve el éxito en este puesto?" },
              { en: "What are the next steps in the process?", es: "¿Cuáles son los siguientes pasos del proceso?" },
            ],
          },
        ],
        tip: "Método STAR para responder con ejemplos: Situation, Task, Action, Result. Cierra siempre con el resultado medible.",
        quiz: [
          { q: "La mejor apertura:", opts: ["I'm a teacher with 8 years of experience in public schools.", "My name is X and I like sports and movies.", "I born in 1995 in Mexico."], a: 0, ex: "Rol + experiencia relevante, directo al punto." },
          { q: "«Aumenté las ventas 20%»:", opts: ["I increased sales by 20%.", "I up the sales 20%.", "I made more sells 20%."], a: 0, ex: "increase by + porcentaje." },
          { q: "Pregunta fuerte para el entrevistador:", opts: ["What are the next steps in the process?", "How much you pay?", "Do you like me?"], a: 0, ex: "Muestra interés y profesionalismo." },
          { q: "STAR significa:", opts: ["Situation, Task, Action, Result", "Start, Talk, Answer, Repeat", "Skills, Training And Résumé"], a: 0, ex: "El método estándar para responder con ejemplos." },
          { q: "«Estoy muy interesado en el puesto»:", opts: ["I'm very interested in the position.", "I'm very interesting in the position.", "I have very interest in the position."], a: 0, ex: "interested = tú lo estás; interesting = algo ES interesante." },
        ],
      },
    ],
  },
];

/* ============================ DATOS: VOCABULARIO ============================ */

const DECKS = [
  {
    id: "saludos",
    name: "Saludos y presentaciones",
    desc: "Lo primero que dirás siempre",
    color: C.green,
    cards: [
      { en: "Hello", es: "Hola", ex: "Hello! How are you?" },
      { en: "Nice to meet you", es: "Mucho gusto", ex: "Nice to meet you, I'm Sofía." },
      { en: "Good morning", es: "Buenos días", ex: "Good morning, team!" },
      { en: "How are you?", es: "¿Cómo estás?", ex: "Hi Ana, how are you today?" },
      { en: "I'm fine, thanks", es: "Bien, gracias", ex: "I'm fine, thanks. And you?" },
      { en: "Where are you from?", es: "¿De dónde eres?", ex: "Where are you from? — I'm from Mexico." },
      { en: "See you later", es: "Nos vemos", ex: "See you later!" },
      { en: "You're welcome", es: "De nada", ex: "Thank you! — You're welcome." },
      { en: "Excuse me", es: "Disculpe", ex: "Excuse me, where is the restroom?" },
      { en: "Have a nice day", es: "Que tengas buen día", ex: "Bye! Have a nice day." },
    ],
  },
  {
    id: "oficina",
    name: "Trabajo y oficina",
    desc: "El día a día laboral",
    color: C.cobalt,
    cards: [
      { en: "meeting", es: "junta, reunión", ex: "The meeting starts at 10." },
      { en: "deadline", es: "fecha límite", ex: "The deadline is Friday." },
      { en: "schedule", es: "agenda, horario", ex: "What's your schedule today?" },
      { en: "report", es: "informe, reporte", ex: "I'll send the report tonight." },
      { en: "boss", es: "jefe / jefa", ex: "My boss approved it." },
      { en: "coworker", es: "colega, compañero", ex: "She's my coworker." },
      { en: "customer", es: "cliente", ex: "The customer called twice." },
      { en: "supplier", es: "proveedor", ex: "We need a new supplier." },
      { en: "quote", es: "cotización", ex: "I'll prepare the quote today." },
      { en: "invoice", es: "factura", ex: "The invoice was paid." },
      { en: "warehouse", es: "almacén", ex: "It's in the warehouse." },
      { en: "branch", es: "sucursal", ex: "The bank has branches nationwide." },
    ],
  },
  {
    id: "ventas",
    name: "Ventas y negociación",
    desc: "Para cerrar tratos en inglés",
    color: C.mustard,
    cards: [
      { en: "lead", es: "prospecto", ex: "I got a new lead today." },
      { en: "follow-up", es: "seguimiento", ex: "Just a quick follow-up on my last email." },
      { en: "discount", es: "descuento", ex: "Can you offer a discount?" },
      { en: "price list", es: "lista de precios", ex: "I'll send you the price list." },
      { en: "purchase order", es: "orden de compra", ex: "We received the purchase order." },
      { en: "lead time", es: "tiempo de entrega", ex: "The lead time is two weeks." },
      { en: "in stock", es: "en existencia", ex: "Yes, it's in stock." },
      { en: "payment terms", es: "condiciones de pago", ex: "Our payment terms are 30 days." },
      { en: "deal", es: "trato, negocio", ex: "We closed the deal!" },
      { en: "close a sale", es: "cerrar una venta", ex: "I closed two sales this week." },
    ],
  },
  {
    id: "electrico",
    name: "Inglés técnico (industria)",
    desc: "Planta, electricidad y manufactura",
    color: C.red,
    cards: [
      { en: "circuit breaker", es: "interruptor termomagnético (pastilla)", ex: "The circuit breaker tripped." },
      { en: "switch", es: "interruptor, apagador", ex: "Turn off the main switch." },
      { en: "power supply", es: "fuente de alimentación", ex: "The power supply failed." },
      { en: "wiring", es: "cableado", ex: "Check the wiring first." },
      { en: "voltage", es: "voltaje, tensión", ex: "Measure the voltage here." },
      { en: "contactor", es: "contactor", ex: "Replace the contactor." },
      { en: "variable frequency drive", es: "variador de frecuencia (VFD)", ex: "The VFD controls the motor speed." },
      { en: "PLC", es: "controlador lógico programable", ex: "The PLC runs the whole line." },
      { en: "enclosure", es: "gabinete, tablero", ex: "Mount it inside the enclosure." },
      { en: "ground", es: "tierra física", ex: "Is it properly grounded?" },
      { en: "outlet", es: "contacto, tomacorriente", ex: "Plug it into that outlet." },
      { en: "sensor", es: "sensor", ex: "The sensor sends the signal to the PLC." },
    ],
  },
  {
    id: "viajes",
    name: "Viajes y trámites",
    desc: "Aeropuerto, citas y hoteles",
    color: C.cobalt,
    cards: [
      { en: "airport", es: "aeropuerto", ex: "We arrived at the airport early." },
      { en: "flight", es: "vuelo", ex: "The flight leaves at 7." },
      { en: "boarding pass", es: "pase de abordar", ex: "Show your boarding pass, please." },
      { en: "luggage", es: "equipaje", ex: "My luggage is heavy." },
      { en: "customs", es: "aduana", ex: "We passed through customs." },
      { en: "appointment", es: "cita", ex: "I have an appointment at the consulate." },
      { en: "booking", es: "reservación", ex: "The booking is under my name." },
      { en: "check-in", es: "registro de entrada", ex: "Check-in opens at 3 pm." },
      { en: "departure", es: "salida", ex: "The departure gate changed." },
      { en: "How much is it?", es: "¿Cuánto cuesta?", ex: "How much is it per night?" },
    ],
  },
  {
    id: "supervivencia",
    name: "Frases de supervivencia",
    desc: "Para nunca quedarte trabado",
    color: C.green,
    cards: [
      { en: "I don't understand", es: "No entiendo", ex: "Sorry, I don't understand." },
      { en: "Can you repeat that, please?", es: "¿Puede repetirlo, por favor?", ex: "Can you repeat that, please?" },
      { en: "Could you speak slower?", es: "¿Podría hablar más despacio?", ex: "Could you speak slower, please?" },
      { en: "How do you say ___ in English?", es: "¿Cómo se dice ___ en inglés?", ex: "How do you say 'factura' in English?" },
      { en: "What does ___ mean?", es: "¿Qué significa ___?", ex: "What does 'lead time' mean?" },
      { en: "Of course", es: "Claro, por supuesto", ex: "Of course, no problem." },
      { en: "Let me check", es: "Déjame revisar", ex: "Let me check and I'll call you back." },
      { en: "Sounds good", es: "Me parece bien", ex: "Friday at 10? Sounds good." },
      { en: "I'm sorry", es: "Lo siento", ex: "I'm sorry, I'm late." },
      { en: "No problem", es: "No hay problema", ex: "No problem at all." },
    ],
  },
  {
    id: "salud",
    name: "Salud y médico",
    desc: "Explicar cómo te sientes",
    color: C.red,
    cards: [
      { en: "I don't feel well", es: "No me siento bien", ex: "I don't feel well today." },
      { en: "headache", es: "dolor de cabeza", ex: "I have a headache." },
      { en: "fever", es: "fiebre", ex: "She has a fever." },
      { en: "It hurts here", es: "Me duele aquí", ex: "It hurts here, on my back." },
      { en: "pharmacy", es: "farmacia", ex: "Is there a pharmacy near here?" },
      { en: "medicine", es: "medicina", ex: "Take this medicine twice a day." },
      { en: "appointment", es: "cita", ex: "I have a doctor's appointment at 10." },
      { en: "I'm allergic to…", es: "Soy alérgico a…", ex: "I'm allergic to penicillin." },
      { en: "prescription", es: "receta médica", ex: "You need a prescription for that." },
      { en: "get some rest", es: "descansar", ex: "Go home and get some rest." },
    ],
  },
  {
    id: "compras",
    name: "Compras y dinero",
    desc: "Tiendas, precios y pagos",
    color: C.mustard,
    cards: [
      { en: "How much is it?", es: "¿Cuánto cuesta?", ex: "Excuse me, how much is it?" },
      { en: "expensive", es: "caro", ex: "That's too expensive for me." },
      { en: "cheap", es: "barato", ex: "This store is really cheap." },
      { en: "cash", es: "efectivo", ex: "Can I pay in cash?" },
      { en: "credit card", es: "tarjeta de crédito", ex: "Do you accept credit cards?" },
      { en: "receipt", es: "ticket, recibo", ex: "Can I have the receipt, please?" },
      { en: "size", es: "talla", ex: "Do you have this in a bigger size?" },
      { en: "fitting room", es: "probador", ex: "Where is the fitting room?" },
      { en: "on sale", es: "en oferta", ex: "These shoes are on sale." },
      { en: "Do you have…?", es: "¿Tienen…?", ex: "Do you have this in blue?" },
    ],
  },
  {
    id: "diaria",
    name: "Vida diaria y familia",
    desc: "Tu rutina y tu gente",
    color: C.green,
    cards: [
      { en: "wake up", es: "despertarse", ex: "I wake up at six every day." },
      { en: "have breakfast", es: "desayunar", ex: "We have breakfast together." },
      { en: "take a shower", es: "bañarse", ex: "I take a shower in the morning." },
      { en: "do the laundry", es: "lavar la ropa", ex: "I do the laundry on Saturdays." },
      { en: "husband / wife", es: "esposo / esposa", ex: "My wife works from home." },
      { en: "son / daughter", es: "hijo / hija", ex: "My daughter is ten years old." },
      { en: "neighbor", es: "vecino", ex: "Our neighbor is very friendly." },
      { en: "weekend", es: "fin de semana", ex: "What are you doing this weekend?" },
      { en: "birthday", es: "cumpleaños", ex: "Her birthday is in July." },
      { en: "pet", es: "mascota", ex: "Do you have any pets?" },
    ],
  },
  {
    id: "tiempo",
    name: "Números, fechas y horas",
    desc: "Para nunca perderte una cita",
    color: C.cobalt,
    cards: [
      { en: "What time is it?", es: "¿Qué hora es?", ex: "Excuse me, what time is it?" },
      { en: "half past two", es: "dos y media", ex: "The class starts at half past two." },
      { en: "a quarter to five", es: "cuarto para las cinco", ex: "It's a quarter to five." },
      { en: "early / late", es: "temprano / tarde", ex: "Sorry, I'm late!" },
      { en: "today / tomorrow", es: "hoy / mañana", ex: "See you tomorrow!" },
      { en: "yesterday", es: "ayer", ex: "I called you yesterday." },
      { en: "next week", es: "la próxima semana", ex: "The meeting is next week." },
      { en: "schedule", es: "horario", ex: "What's your schedule like?" },
      { en: "on Monday", es: "el lunes", ex: "I start on Monday." },
      { en: "in the morning", es: "en la mañana", ex: "I exercise in the morning." },
    ],
  },
];

/* ============================ DATOS: TUTOR IA ============================ */

const SCENARIOS = [
  {
    id: "libre",
    label: "Conversación libre",
    desc: "Plática casual de cualquier tema",
    opener: "Hi! Great to see you. How's your day going so far?",
    prompt: "Casual, friendly conversation about daily life, work, hobbies, plans.",
  },
  {
    id: "entrevista",
    label: "Entrevista de trabajo",
    desc: "Practica responder como candidato",
    opener: "Good morning, thanks for coming in. What position are you applying for? And tell me a little about yourself.",
    prompt: "You are a hiring manager. First find out what job the student is applying for, then interview them for that role with typical questions, one at a time.",
  },
  {
    id: "ventas",
    label: "Llamada con cliente",
    desc: "Tú vendes, el cliente pregunta",
    opener: "Hello, this is Mike from Norton Manufacturing. I found your company online — can you tell me a bit about what you sell?",
    prompt: "You are a potential customer calling the student's company. First ask what they sell or do, then ask realistic questions about their products or services, prices, availability and delivery. The student plays the salesperson.",
  },
  {
    id: "aeropuerto",
    label: "En el aeropuerto",
    desc: "Migración, vuelos y equipaje",
    opener: "Good afternoon. Passport, please. What's the purpose of your trip?",
    prompt: "You are a US immigration officer and then airport staff. Guide the student through a realistic airport arrival: purpose of trip, length of stay, luggage, directions.",
  },
  {
    id: "restaurante",
    label: "En un restaurante",
    desc: "Ordena como si fueras local",
    opener: "Hi, welcome! Table for how many?",
    prompt: "You are a friendly waiter at a US restaurant. Seat the student, describe a couple of dishes, take their order, offer drinks and dessert.",
  },
  {
    id: "doctor",
    label: "En el médico",
    desc: "Describe síntomas y entiende indicaciones",
    opener: "Good morning, come on in. So, what brings you in today?",
    prompt: "You are a kind doctor at a clinic. Ask about the student's symptoms, how long they've had them, and give simple, safe general advice (rest, water, see a specialist). Keep it light and educational.",
  },
  {
    id: "gente",
    label: "Conocer gente",
    desc: "Small talk en una reunión",
    opener: "Hey! I don't think we've met — I'm Alex. How do you know the host?",
    prompt: "You are a friendly person at a casual party. Make small talk: names, where they're from, work or studies, hobbies, weekend plans. Be warm and curious.",
  },
  {
    id: "tienda",
    label: "De compras",
    desc: "Pregunta precios, tallas y paga",
    opener: "Hi there, welcome to the store! Are you looking for anything in particular?",
    prompt: "You are a helpful store clerk. Help the student find items, discuss sizes, colors and prices, mention a sale, and take them through checkout.",
  },
];

function buildSystem(levelKey, sc) {
  const lvl =
    levelKey === "basico"
      ? "beginner (A1-A2): use very simple vocabulary and short sentences"
      : levelKey === "intermedio"
      ? "intermediate (B1): everyday vocabulary, natural but clear"
      : "advanced (B2-C1): natural, idiomatic English";
  return (
    "You are an English conversation tutor for a native Spanish speaker. Student level: " + lvl + ". " +
    "Roleplay scenario: " + sc.prompt + " " +
    "Stay in character, keep replies to 1-3 short sentences, and always end with a question to keep the conversation going. " +
    'CRITICAL: Respond ONLY with a valid JSON object, no markdown, no backticks, exactly this shape: ' +
    '{"reply": "your English response in character", ' +
    '"correction": "if the student\'s last message had grammar or vocabulary errors, explain the main one briefly IN SPANISH; otherwise null", ' +
    '"better": "a more natural full English version of what the student tried to say, or null if it was already fine"}'
  );
}

/* ============================ HELPERS ============================ */

const STORAGE_KEY = "fluye-progress-v1";
const ALL_LESSONS = LEVELS.flatMap((lv) => lv.lessons.map((ls) => ({ ...ls, levelId: lv.id })));
const TOTAL_LESSONS = ALL_LESSONS.length;
const TOTAL_CARDS = DECKS.reduce((n, d) => n + d.cards.length, 0);

const DEFAULT_PROGRESS = {
  xp: 0,
  streak: 0,
  lastActive: null,
  lessons: {},
  vocab: {},
  chats: 0,
  name: "",
  onboarded: false,
};

function todayStr() {
  const d = new Date();
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}
function yesterdayStr() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}

function storageAvailable() {
  try {
    const k = "__fluye_test__";
    localStorage.setItem(k, "1");
    localStorage.removeItem(k);
    return true;
  } catch (e) { return false; }
}

async function loadProgress() {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v) return { ...DEFAULT_PROGRESS, ...JSON.parse(v) };
  } catch (e) { /* sin datos previos o storage bloqueado */ }
  return { ...DEFAULT_PROGRESS };
}

async function persistProgress(p) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch (e) { /* modo memoria */ }
}

function speak(text) {
  try {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = 0.92;
    window.speechSynthesis.speak(u);
  } catch (e) { /* sin TTS disponible */ }
}

const API_KEY_STORAGE = "fluye-api-key";

function getApiKey() {
  try { return localStorage.getItem(API_KEY_STORAGE) || ""; } catch (e) { return ""; }
}

async function callTutor(apiMessages, levelKey, scenario) {
  const key = getApiKey();
  if (!key) throw new Error("NOKEY");
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": key,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1000,
      system: buildSystem(levelKey, scenario),
      messages: apiMessages,
    }),
  });
  if (!res.ok) throw new Error("HTTP" + res.status);
  const data = await res.json();
  const text = (data.content || [])
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("\n");
  const clean = text.replace(/```json|```/g, "").trim();
  try {
    const j = JSON.parse(clean);
    return {
      reply: j.reply || "Sorry, could you say that again?",
      correction: j.correction || null,
      better: j.better || null,
    };
  } catch (e) {
    return { reply: clean || "Sorry, could you say that again?", correction: null, better: null };
  }
}

/* ============================ COMPONENTES BASE ============================ */

function Gauge({ xp }) {
  const value = Math.min((xp % XP_PER_LEVEL) / XP_PER_LEVEL, 1);
  const levelIdx = Math.min(Math.floor(xp / XP_PER_LEVEL), XP_TITLES.length - 1);
  const ARC_LEN = Math.PI * 88;
  const ang = Math.PI * (1 - value);
  const nx = 110 + 66 * Math.cos(ang);
  const ny = 118 - 66 * Math.sin(ang);
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => {
    const a = Math.PI * (1 - t);
    return {
      x1: 110 + 62 * Math.cos(a), y1: 118 - 62 * Math.sin(a),
      x2: 110 + 72 * Math.cos(a), y2: 118 - 72 * Math.sin(a),
    };
  });
  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 220 132" className="w-full max-w-xs" role="img" aria-label={"Medidor de fluidez: " + xp + " XP"}>
        <path d="M 22 118 A 88 88 0 0 1 198 118" fill="none" stroke={C.line} strokeWidth="14" strokeLinecap="round" />
        <path
          d="M 22 118 A 88 88 0 0 1 198 118"
          fill="none"
          stroke={C.mustard}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={ARC_LEN * value + " " + ARC_LEN * 2}
          style={{ transition: "stroke-dasharray .6s ease" }}
        />
        {ticks.map((t, i) => (
          <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke={C.ink} strokeWidth="2" opacity="0.35" />
        ))}
        <line x1="110" y1="118" x2={nx} y2={ny} stroke={C.ink} strokeWidth="4" strokeLinecap="round" style={{ transition: "all .6s ease" }} />
        <circle cx="110" cy="118" r="8" fill={C.ink} />
        <circle cx="110" cy="118" r="3" fill={C.mustard} />
      </svg>
      <div className="fy-disp fy-num font-extrabold leading-none -mt-4" style={{ fontSize: 44, color: C.ink }}>
        {xp}
        <span className="text-base font-bold ml-1" style={{ color: C.sub }}>XP</span>
      </div>
      <div className="mt-2 px-3 py-1 rounded-full text-sm font-semibold" style={{ background: C.ink, color: C.paper }}>
        Nivel: {XP_TITLES[levelIdx]}
      </div>
      <div className="mt-1 text-xs" style={{ color: C.sub }}>
        {XP_PER_LEVEL - (xp % XP_PER_LEVEL)} XP para el siguiente nivel
      </div>
    </div>
  );
}

function Bar({ value, color, bg }) {
  return (
    <div className="h-2 rounded-full w-full overflow-hidden" style={{ background: bg || C.line }}>
      <div className="h-full rounded-full" style={{ width: Math.round(value * 100) + "%", background: color, transition: "width .4s ease" }} />
    </div>
  );
}

function TopBar({ title, sub, onBack, color }) {
  return (
    <div className="flex items-center gap-3 px-4 pt-4 pb-3 sticky top-0 z-10" style={{ background: C.paper }}>
      <button
        onClick={onBack}
        aria-label="Volver"
        className="w-10 h-10 rounded-full flex items-center justify-center border-2 shrink-0"
        style={{ borderColor: C.ink, color: C.ink, background: C.card }}
      >
        <ChevronLeft size={20} />
      </button>
      <div className="min-w-0">
        <div className="fy-disp font-bold text-lg leading-tight truncate" style={{ color: C.ink }}>{title}</div>
        {sub ? <div className="text-xs font-medium" style={{ color: color || C.sub }}>{sub}</div> : null}
      </div>
    </div>
  );
}

function SpeakBtn({ text, size, color }) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); speak(text); }}
      aria-label={"Escuchar: " + text}
      className="rounded-full flex items-center justify-center shrink-0"
      style={{
        width: size === "lg" ? 40 : 30, height: size === "lg" ? 40 : 30,
        background: (color || C.cobalt), color: "#fff",
      }}
    >
      <Volume2 size={size === "lg" ? 20 : 15} />
    </button>
  );
}

const TABS = [
  { id: "home", label: "Inicio", Icon: Home },
  { id: "lessons", label: "Lecciones", Icon: BookOpen },
  { id: "vocab", label: "Vocab", Icon: Layers },
  { id: "tutor", label: "Tutor IA", Icon: MessageCircle },
  { id: "progress", label: "Más", Icon: Menu },
];

function NavBar({ tab, onTab }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-20" style={{ background: C.card, borderTop: "2px solid " + C.ink }}>
      <div className="max-w-md mx-auto flex">
        {TABS.map(({ id, label, Icon }) => {
          const active = tab === id;
          return (
            <button
              key={id}
              onClick={() => onTab(id)}
              className="flex-1 flex flex-col items-center gap-1 pt-2 pb-3"
              style={{ color: active ? C.ink : C.sub }}
              aria-label={label}
            >
              <Icon size={21} strokeWidth={active ? 2.4 : 2} />
              <span className="text-xs font-semibold" style={{ fontSize: 10 }}>{label}</span>
              <span className="rounded-full" style={{ width: 14, height: 3, background: active ? C.mustard : "transparent" }} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ============================ PANTALLA: INICIO ============================ */

function HomeScreen({ prog, onGoLesson, onTab }) {
  const doneCount = Object.keys(prog.lessons).length;
  const nextLesson = ALL_LESSONS.find((ls) => !prog.lessons[ls.id]);
  const nextLevel = nextLesson ? LEVELS.find((lv) => lv.id === nextLesson.levelId) : null;
  const mastered = DECKS.reduce((n, d) => n + ((prog.vocab[d.id] || []).length), 0);

  return (
    <div className="px-4 pb-8 fy-pop">
      <div className="flex items-center justify-between pt-5 pb-1">
        <div>
          <div className="fy-disp font-extrabold text-2xl tracking-tight" style={{ color: C.ink }}>
            Fluye<span style={{ color: C.mustard }}>.</span>
          </div>
          <div className="text-xs font-medium" style={{ color: C.sub }}>Hola{prog.name ? ", " + prog.name : ""} — inglés práctico, un día a la vez</div>
        </div>
        <div className="flex items-center gap-1 px-3 py-2 rounded-full border-2" style={{ borderColor: C.ink, background: C.card }}>
          <Flame size={16} style={{ color: C.red }} />
          <span className="fy-num font-bold text-sm" style={{ color: C.ink }}>{prog.streak}</span>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border-2 px-4 pt-6 pb-5" style={{ borderColor: C.ink, background: C.card }}>
        <div className="text-center text-xs font-bold uppercase tracking-widest mb-1" style={{ color: C.sub }}>
          Medidor de fluidez
        </div>
        <Gauge xp={prog.xp} />
      </div>

      {nextLesson ? (
        <button
          onClick={() => onGoLesson(nextLesson, nextLevel)}
          className="w-full mt-4 rounded-2xl border-2 p-4 flex items-center gap-3 text-left"
          style={{ borderColor: C.ink, background: nextLevel.soft }}
        >
          <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: nextLevel.color, color: "#fff" }}>
            <BookOpen size={20} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold uppercase tracking-wide" style={{ color: nextLevel.color }}>
              Continuar · {nextLevel.name}
            </div>
            <div className="fy-disp font-bold leading-tight" style={{ color: C.ink }}>{nextLesson.title}</div>
            <div className="text-xs" style={{ color: C.sub }}>{nextLesson.subtitle} · {nextLesson.minutes} min</div>
          </div>
          <ChevronRight size={20} style={{ color: C.ink }} />
        </button>
      ) : (
        <div className="w-full mt-4 rounded-2xl border-2 p-4 text-center" style={{ borderColor: C.ink, background: C.greenSoft }}>
          <div className="fy-disp font-bold" style={{ color: C.green }}>¡Completaste las 15 lecciones! 🎉</div>
          <div className="text-xs mt-1" style={{ color: C.sub }}>Sigue con el Tutor IA para pulir tu fluidez.</div>
        </div>
      )}

      <button
        onClick={() => onTab("tutor")}
        className="w-full mt-3 rounded-2xl border-2 p-4 flex items-center gap-3 text-left"
        style={{ borderColor: C.ink, background: C.card }}
      >
        <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: C.ink, color: C.mustard }}>
          <MessageCircle size={20} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="fy-disp font-bold leading-tight" style={{ color: C.ink }}>Practica hablando 5 minutos</div>
          <div className="text-xs" style={{ color: C.sub }}>Conversa con el Tutor IA: te corrige en español</div>
        </div>
        <ChevronRight size={20} style={{ color: C.ink }} />
      </button>

      <div className="grid grid-cols-2 gap-3 mt-3">
        <div className="rounded-2xl border-2 p-3" style={{ borderColor: C.line, background: C.card }}>
          <div className="fy-disp fy-num font-extrabold text-xl" style={{ color: C.ink }}>{doneCount}<span className="text-sm font-bold" style={{ color: C.sub }}>/{TOTAL_LESSONS}</span></div>
          <div className="text-xs font-medium" style={{ color: C.sub }}>lecciones completadas</div>
        </div>
        <div className="rounded-2xl border-2 p-3" style={{ borderColor: C.line, background: C.card }}>
          <div className="fy-disp fy-num font-extrabold text-xl" style={{ color: C.ink }}>{mastered}<span className="text-sm font-bold" style={{ color: C.sub }}>/{TOTAL_CARDS}</span></div>
          <div className="text-xs font-medium" style={{ color: C.sub }}>palabras dominadas</div>
        </div>
      </div>
    </div>
  );
}

/* ============================ PANTALLA: LECCIONES ============================ */

function LessonsScreen({ prog, onGoLesson }) {
  return (
    <div className="px-4 pb-8 fy-pop">
      <div className="pt-5 pb-2">
        <div className="fy-disp font-extrabold text-2xl" style={{ color: C.ink }}>Lecciones</div>
        <div className="text-xs" style={{ color: C.sub }}>Teoría corta en español + quiz. En orden, de básico a profesional.</div>
      </div>
      {LEVELS.map((lv) => {
        const done = lv.lessons.filter((ls) => prog.lessons[ls.id]).length;
        return (
          <div key={lv.id} className="mt-4">
            <div className="flex items-end justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="fy-disp font-extrabold text-lg" style={{ color: lv.color }}>{lv.name}</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: lv.soft, color: lv.color }}>{lv.cefr}</span>
              </div>
              <span className="text-xs fy-num font-semibold" style={{ color: C.sub }}>{done}/{lv.lessons.length}</span>
            </div>
            <div className="mb-2"><Bar value={done / lv.lessons.length} color={lv.color} /></div>
            <div className="rounded-2xl border-2 overflow-hidden" style={{ borderColor: C.ink, background: C.card }}>
              {lv.lessons.map((ls, i) => {
                const rec = prog.lessons[ls.id];
                return (
                  <button
                    key={ls.id}
                    onClick={() => onGoLesson(ls, lv)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left"
                    style={{ borderTop: i === 0 ? "none" : "1px solid " + C.line }}
                  >
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 fy-disp font-bold"
                      style={rec ? { background: lv.color, color: "#fff" } : { border: "2px solid " + lv.color, color: lv.color }}
                    >
                      {rec ? <Check size={18} /> : i + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-sm leading-tight" style={{ color: C.ink }}>{ls.title}</div>
                      <div className="text-xs" style={{ color: C.sub }}>
                        {ls.subtitle} · {ls.minutes} min{rec ? " · mejor: " + rec.score + "/" + rec.total : ""}
                      </div>
                    </div>
                    <ChevronRight size={18} style={{ color: C.sub }} />
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ============================ VISTA: LECCIÓN ============================ */

function LessonView({ lesson, level, onExit, onComplete }) {
  const [stage, setStage] = useState("theory"); // theory | quiz | done
  const [ti, setTi] = useState(0);
  const [qi, setQi] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [earned, setEarned] = useState(0);

  const t = lesson.theory[ti];
  const q = lesson.quiz[qi];
  const lastTheory = ti === lesson.theory.length - 1;
  const lastQ = qi === lesson.quiz.length - 1;

  function pick(idx) {
    if (picked !== null) return;
    setPicked(idx);
    if (idx === q.a) setScore((s) => s + 1);
  }
  function nextQ() {
    if (lastQ) {
      const finalScore = score;
      const xp = onComplete(lesson.id, finalScore, lesson.quiz.length);
      setEarned(xp);
      setStage("done");
    } else {
      setQi(qi + 1);
      setPicked(null);
    }
  }

  return (
    <div className="pb-8">
      <TopBar title={lesson.title} sub={level.name + " · " + lesson.subtitle} color={level.color} onBack={onExit} />

      {stage === "theory" && (
        <div className="px-4 fy-pop" key={"t" + ti}>
          <div className="flex gap-1.5 mb-3">
            {lesson.theory.map((_, i) => (
              <div key={i} className="h-1.5 rounded-full flex-1" style={{ background: i <= ti ? level.color : C.line }} />
            ))}
          </div>
          <div className="rounded-2xl border-2 p-4" style={{ borderColor: C.ink, background: C.card }}>
            <div className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: level.color }}>
              Teoría {ti + 1} de {lesson.theory.length}
            </div>
            <div className="fy-disp font-bold text-xl leading-snug" style={{ color: C.ink }}>{t.heading}</div>
            <p className="text-sm mt-2 leading-relaxed" style={{ color: C.ink }}>{t.text}</p>
            <div className="mt-3 rounded-xl p-3 flex flex-col gap-3" style={{ background: level.soft }}>
              {t.examples.map((ex, i) => (
                <div key={i} className="flex items-start gap-2">
                  <SpeakBtn text={ex.en} color={level.color} />
                  <div className="min-w-0">
                    <div className="font-bold text-sm" style={{ color: C.ink }}>{ex.en}</div>
                    <div className="text-xs" style={{ color: C.sub }}>{ex.es}</div>
                  </div>
                </div>
              ))}
            </div>
            {lastTheory && (
              <div className="mt-3 rounded-xl p-3 text-sm" style={{ background: C.mustardSoft, color: C.ink }}>
                <span className="font-bold">💡 Tip: </span>{lesson.tip}
              </div>
            )}
          </div>
          <div className="flex gap-3 mt-4">
            {ti > 0 && (
              <button onClick={() => setTi(ti - 1)} className="flex-1 py-3 rounded-xl border-2 font-bold text-sm" style={{ borderColor: C.ink, color: C.ink, background: C.card }}>
                Anterior
              </button>
            )}
            <button
              onClick={() => (lastTheory ? setStage("quiz") : setTi(ti + 1))}
              className="flex-1 py-3 rounded-xl font-bold text-sm border-2"
              style={{ background: level.color, borderColor: level.color, color: "#fff" }}
            >
              {lastTheory ? "Empezar quiz" : "Siguiente"}
            </button>
          </div>
        </div>
      )}

      {stage === "quiz" && (
        <div className="px-4 fy-pop" key={"q" + qi}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wide" style={{ color: level.color }}>Quiz</span>
            <span className="text-xs fy-num font-semibold" style={{ color: C.sub }}>{qi + 1} / {lesson.quiz.length}</span>
          </div>
          <Bar value={(qi + (picked !== null ? 1 : 0)) / lesson.quiz.length} color={level.color} />
          <div className="mt-4 rounded-2xl border-2 p-4" style={{ borderColor: C.ink, background: C.card }}>
            <div className="fy-disp font-bold text-lg leading-snug" style={{ color: C.ink }}>{q.q}</div>
            <div className="flex flex-col gap-2 mt-4">
              {q.opts.map((op, i) => {
                let bg = C.card, border = C.line, col = C.ink;
                if (picked !== null) {
                  if (i === q.a) { bg = C.greenSoft; border = C.green; col = C.green; }
                  else if (i === picked) { bg = C.redSoft; border = C.red; col = C.red; }
                }
                return (
                  <button
                    key={i}
                    onClick={() => pick(i)}
                    className="w-full text-left px-4 py-3 rounded-xl border-2 font-semibold text-sm flex items-center gap-2"
                    style={{ background: bg, borderColor: border, color: col }}
                  >
                    {picked !== null && i === q.a && <Check size={16} className="shrink-0" />}
                    {picked !== null && i === picked && i !== q.a && <X size={16} className="shrink-0" />}
                    <span>{op}</span>
                  </button>
                );
              })}
            </div>
            {picked !== null && (
              <div className="mt-3 rounded-xl p-3 text-sm fy-pop" style={{ background: picked === q.a ? C.greenSoft : C.redSoft, color: C.ink }}>
                <span className="font-bold">{picked === q.a ? "¡Correcto! " : "Casi. "}</span>{q.ex}
              </div>
            )}
          </div>
          {picked !== null && (
            <button
              onClick={nextQ}
              className="w-full mt-4 py-3 rounded-xl font-bold text-sm border-2"
              style={{ background: level.color, borderColor: level.color, color: "#fff" }}
            >
              {lastQ ? "Ver resultado" : "Siguiente"}
            </button>
          )}
        </div>
      )}

      {stage === "done" && (
        <div className="px-4 fy-pop">
          <div className="rounded-2xl border-2 p-6 text-center" style={{ borderColor: C.ink, background: C.card }}>
            <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center" style={{ background: level.soft }}>
              <Award size={30} style={{ color: level.color }} />
            </div>
            <div className="fy-disp font-extrabold text-2xl mt-3" style={{ color: C.ink }}>
              {score}/{lesson.quiz.length}
            </div>
            <div className="text-sm font-semibold" style={{ color: C.sub }}>
              {score === lesson.quiz.length ? "¡Perfecto! Dominaste la lección." : score >= 3 ? "¡Bien hecho! Puedes repetirla cuando quieras." : "Buen intento. Repásala y vuelve al quiz."}
            </div>
            {earned > 0 && (
              <div className="inline-flex items-center gap-1 mt-3 px-3 py-1.5 rounded-full font-bold text-sm" style={{ background: C.mustardSoft, color: C.ink }}>
                <Zap size={15} style={{ color: C.mustard }} /> +{earned} XP
              </div>
            )}
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => { setStage("theory"); setTi(0); setQi(0); setPicked(null); setScore(0); setEarned(0); }}
              className="flex-1 py-3 rounded-xl border-2 font-bold text-sm flex items-center justify-center gap-2"
              style={{ borderColor: C.ink, color: C.ink, background: C.card }}
            >
              <RotateCcw size={16} /> Repetir
            </button>
            <button onClick={onExit} className="flex-1 py-3 rounded-xl font-bold text-sm border-2" style={{ background: C.ink, borderColor: C.ink, color: C.paper }}>
              Continuar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================ PANTALLA: VOCABULARIO ============================ */

function VocabScreen({ prog, onGoDeck }) {
  return (
    <div className="px-4 pb-8 fy-pop">
      <div className="pt-5 pb-2">
        <div className="fy-disp font-extrabold text-2xl" style={{ color: C.ink }}>Vocabulario</div>
        <div className="text-xs" style={{ color: C.sub }}>Tarjetas con audio. Toca «La sé» cuando ya no necesites pensarla.</div>
      </div>
      <div className="flex flex-col gap-3 mt-2">
        {DECKS.map((d) => {
          const mastered = (prog.vocab[d.id] || []).length;
          return (
            <button
              key={d.id}
              onClick={() => onGoDeck(d)}
              className="w-full rounded-2xl border-2 p-4 text-left"
              style={{ borderColor: C.ink, background: C.card, borderLeft: "8px solid " + d.color }}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <div className="fy-disp font-bold leading-tight" style={{ color: C.ink }}>{d.name}</div>
                  <div className="text-xs" style={{ color: C.sub }}>{d.desc}</div>
                </div>
                <span className="text-xs fy-num font-bold shrink-0 px-2 py-1 rounded-full" style={{ background: C.paper, color: C.ink }}>
                  {mastered}/{d.cards.length}
                </span>
              </div>
              <div className="mt-3"><Bar value={mastered / d.cards.length} color={d.color} /></div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function DeckView({ deck, masteredList, onMaster, onExit }) {
  const [queue, setQueue] = useState(() =>
    deck.cards.map((_, i) => i).filter((i) => !masteredList.includes(deck.cards[i].en))
  );
  const [flipped, setFlipped] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);

  const idx = queue[0];
  const card = idx !== undefined ? deck.cards[idx] : null;

  function again() {
    setFlipped(false);
    setQueue((q) => [...q.slice(1), q[0]]);
  }
  function know() {
    if (card && !masteredList.includes(card.en)) onMaster(deck.id, card.en);
    setFlipped(false);
    setQueue((q) => q.slice(1));
  }
  function reviewAll() {
    setReviewMode(true);
    setFlipped(false);
    setQueue(deck.cards.map((_, i) => i));
  }

  return (
    <div className="pb-8">
      <TopBar title={deck.name} sub={queue.length > 0 ? "Quedan " + queue.length + " tarjetas" : "Mazo completado"} color={deck.color} onBack={onExit} />
      <div className="px-4">
        {card ? (
          <div className="fy-pop" key={idx + "-" + (reviewMode ? "r" : "n") + "-" + queue.length}>
            <button
              onClick={() => setFlipped(!flipped)}
              className="w-full rounded-2xl border-2 p-6 flex flex-col items-center justify-center text-center"
              style={{ borderColor: C.ink, background: C.card, minHeight: 260 }}
            >
              {!flipped ? (
                <>
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: deck.color }}>English</span>
                  <span className="fy-disp font-extrabold text-3xl leading-tight mt-2" style={{ color: C.ink }}>{card.en}</span>
                  <div className="mt-4"><SpeakBtn text={card.en} size="lg" color={deck.color} /></div>
                  <span className="text-xs mt-5" style={{ color: C.sub }}>Toca la tarjeta para ver la traducción</span>
                </>
              ) : (
                <>
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: C.sub }}>Español</span>
                  <span className="fy-disp font-extrabold text-2xl leading-tight mt-2" style={{ color: C.ink }}>{card.es}</span>
                  <div className="mt-4 rounded-xl px-3 py-2 flex items-center gap-2" style={{ background: C.paper }}>
                    <SpeakBtn text={card.ex} color={deck.color} />
                    <span className="text-sm italic text-left" style={{ color: C.ink }}>{card.ex}</span>
                  </div>
                </>
              )}
            </button>
            <div className="flex gap-3 mt-4">
              <button onClick={again} className="flex-1 py-3 rounded-xl border-2 font-bold text-sm flex items-center justify-center gap-2" style={{ borderColor: C.ink, color: C.ink, background: C.card }}>
                <RotateCcw size={16} /> Otra vez
              </button>
              <button onClick={know} className="flex-1 py-3 rounded-xl font-bold text-sm border-2 flex items-center justify-center gap-2" style={{ background: C.green, borderColor: C.green, color: "#fff" }}>
                <Check size={16} /> La sé
              </button>
            </div>
          </div>
        ) : (
          <div className="fy-pop rounded-2xl border-2 p-6 text-center" style={{ borderColor: C.ink, background: C.card }}>
            <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center" style={{ background: C.greenSoft }}>
              <Award size={30} style={{ color: C.green }} />
            </div>
            <div className="fy-disp font-extrabold text-xl mt-3" style={{ color: C.ink }}>¡Mazo dominado!</div>
            <div className="text-sm mt-1" style={{ color: C.sub }}>Las {deck.cards.length} tarjetas de «{deck.name}» ya son tuyas.</div>
            <div className="flex gap-3 mt-5">
              <button onClick={reviewAll} className="flex-1 py-3 rounded-xl border-2 font-bold text-sm" style={{ borderColor: C.ink, color: C.ink, background: C.card }}>
                Repasar todo
              </button>
              <button onClick={onExit} className="flex-1 py-3 rounded-xl font-bold text-sm border-2" style={{ background: C.ink, borderColor: C.ink, color: C.paper }}>
                Volver
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================ PANTALLA: TUTOR IA ============================ */

function TutorScreen({ onChatXP }) {
  const [phase, setPhase] = useState("setup");
  const [scenario, setScenario] = useState(SCENARIOS[0]);
  const [levelKey, setLevelKey] = useState("basico");
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiKey, setApiKey] = useState(getApiKey());
  const [keySaved, setKeySaved] = useState(!!getApiKey());
  const endRef = useRef(null);

  function saveKey() {
    const k = apiKey.trim();
    try { localStorage.setItem(API_KEY_STORAGE, k); } catch (e) {}
    setKeySaved(!!k);
  }

  useEffect(() => {
    if (endRef.current) endRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [msgs, loading]);

  function start() {
    setMsgs([{ role: "tutor", text: scenario.opener, correction: null, better: null }]);
    setError(null);
    setPhase("chat");
  }

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    const newMsgs = [...msgs, { role: "user", text, correction: null, better: null }];
    setMsgs(newMsgs);
    setInput("");
    setLoading(true);
    setError(null);
    onChatXP();
    try {
      const apiMessages = [{ role: "user", content: "Hello!" }].concat(
        newMsgs.map((m) => ({ role: m.role === "tutor" ? "assistant" : "user", content: m.text }))
      );
      const r = await callTutor(apiMessages, levelKey, scenario);
      setMsgs((ms) => [...ms, { role: "tutor", text: r.reply, correction: r.correction, better: r.better }]);
    } catch (e) {
      if (e && e.message === "NOKEY") {
        setError("Falta tu API key: regresa con ← y configúrala para activar el tutor.");
      } else if (e && e.message === "HTTP401") {
        setError("Tu API key parece inválida o expirada. Revísala con ← .");
      } else {
        setError("No pude conectar con el tutor. Revisa tu conexión e intenta de nuevo.");
      }
    } finally {
      setLoading(false);
    }
  }

  if (phase === "setup") {
    return (
      <div className="px-4 pb-8 fy-pop">
        <div className="pt-5 pb-2">
          <div className="fy-disp font-extrabold text-2xl" style={{ color: C.ink }}>Tutor IA</div>
          <div className="text-xs" style={{ color: C.sub }}>
            Conversación real con Claude. Tú escribes en inglés; él responde, te corrige en español y te sugiere frases más naturales.
          </div>
        </div>
        <div className="text-xs font-bold uppercase tracking-wide mt-3 mb-1" style={{ color: C.sub }}>Tu nivel</div>
        <div className="flex gap-2">
          {LEVELS.map((lv) => (
            <button
              key={lv.id}
              onClick={() => setLevelKey(lv.id)}
              className="flex-1 py-2 rounded-xl border-2 font-bold text-xs"
              style={levelKey === lv.id
                ? { background: lv.color, borderColor: lv.color, color: "#fff" }
                : { background: C.card, borderColor: C.line, color: C.ink }}
            >
              {lv.name}
            </button>
          ))}
        </div>
        <div className="text-xs font-bold uppercase tracking-wide mt-4 mb-1" style={{ color: C.sub }}>Escenario</div>
        <div className="flex flex-col gap-2">
          {SCENARIOS.map((sc) => (
            <button
              key={sc.id}
              onClick={() => setScenario(sc)}
              className="w-full rounded-2xl border-2 p-3 text-left flex items-center gap-3"
              style={scenario.id === sc.id
                ? { borderColor: C.ink, background: C.mustardSoft }
                : { borderColor: C.line, background: C.card }}
            >
              <div className="w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center" style={{ borderColor: C.ink }}>
                {scenario.id === sc.id && <div className="w-2.5 h-2.5 rounded-full" style={{ background: C.ink }} />}
              </div>
              <div>
                <div className="font-bold text-sm" style={{ color: C.ink }}>{sc.label}</div>
                <div className="text-xs" style={{ color: C.sub }}>{sc.desc}</div>
              </div>
            </button>
          ))}
        </div>
        <div className="text-xs font-bold uppercase tracking-wide mt-4 mb-1" style={{ color: C.sub }}>Tu API key de Anthropic</div>
        <div className="rounded-2xl border-2 p-3" style={{ borderColor: keySaved ? C.line : C.mustard, background: C.card }}>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => { setApiKey(e.target.value); setKeySaved(false); }}
            placeholder="sk-ant-…"
            aria-label="Tu API key de Anthropic"
            className="w-full rounded-xl border-2 px-3 py-2 text-sm outline-none"
            style={{ borderColor: C.line, background: C.paper, color: C.ink }}
          />
          <div className="flex items-center justify-between mt-2">
            <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noreferrer" className="text-xs font-bold" style={{ color: C.cobalt }}>
              Conseguir una key ↗
            </a>
            <button onClick={saveKey} disabled={!apiKey.trim()} className="px-4 py-1.5 rounded-xl font-bold text-xs border-2" style={{ background: apiKey.trim() ? C.ink : C.line, borderColor: apiKey.trim() ? C.ink : C.line, color: C.paper }}>
              {keySaved ? "✓ Guardada" : "Guardar"}
            </button>
          </div>
          <div className="text-xs mt-2" style={{ color: C.sub }}>
            Se guarda únicamente en este navegador y se usa solo para conversar con el tutor. Nunca la compartas ni la subas a GitHub.
          </div>
        </div>
        <button onClick={start} disabled={!keySaved} className="w-full mt-4 py-3 rounded-xl font-bold text-sm border-2" style={keySaved ? { background: C.ink, borderColor: C.ink, color: C.paper } : { background: C.line, borderColor: C.line, color: C.sub }}>
          {keySaved ? "Empezar conversación" : "Guarda tu API key para empezar"}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col" style={{ minHeight: "calc(100vh - 76px)" }}>
      <TopBar title={scenario.label} sub={"Nivel " + LEVELS.find((l) => l.id === levelKey).name + " · cambia de escenario con ←"} onBack={() => setPhase("setup")} />
      <div className="px-4 flex-1 flex flex-col gap-3 pb-4">
        {msgs.map((m, i) =>
          m.role === "tutor" ? (
            <div key={i} className="fy-pop max-w-xs rounded-2xl border-2 p-3 self-start" style={{ borderColor: C.ink, background: C.card, borderBottomLeftRadius: 6 }}>
              <div className="flex items-start gap-2">
                <SpeakBtn text={m.text} color={C.cobalt} />
                <div className="text-sm font-medium leading-relaxed" style={{ color: C.ink }}>{m.text}</div>
              </div>
              {m.correction && (
                <div className="mt-2 rounded-xl px-3 py-2 text-xs" style={{ background: C.mustardSoft, color: C.ink }}>
                  <span className="font-bold">📝 Corrección: </span>{m.correction}
                </div>
              )}
              {m.better && (
                <div className="mt-2 rounded-xl px-3 py-2 text-xs" style={{ background: C.greenSoft, color: C.ink }}>
                  <span className="font-bold">✨ Más natural: </span>{m.better}
                </div>
              )}
            </div>
          ) : (
            <div key={i} className="fy-pop max-w-xs rounded-2xl p-3 self-end text-sm font-medium" style={{ background: C.ink, color: C.paper, borderBottomRightRadius: 6 }}>
              {m.text}
            </div>
          )
        )}
        {loading && (
          <div className="max-w-xs rounded-2xl border-2 px-4 py-3 self-start text-sm font-bold animate-pulse" style={{ borderColor: C.line, background: C.card, color: C.sub }}>
            escribiendo…
          </div>
        )}
        {error && (
          <div className="rounded-xl px-3 py-2 text-xs" style={{ background: C.redSoft, color: C.red }}>{error}</div>
        )}
        <div ref={endRef} />
      </div>
      <div className="sticky bottom-0 px-4 pt-2 pb-3" style={{ background: C.paper }}>
        <div className="flex items-center gap-2 rounded-2xl border-2 p-1.5" style={{ borderColor: C.ink, background: C.card }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") send(); }}
            placeholder="Write in English…"
            aria-label="Escribe tu mensaje en inglés"
            className="flex-1 bg-transparent outline-none text-sm px-2 py-2"
            style={{ color: C.ink }}
          />
          <button
            onClick={send}
            disabled={loading || !input.trim()}
            aria-label="Enviar"
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: loading || !input.trim() ? C.line : C.mustard, color: C.ink }}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================ PANTALLA: PROGRESO ============================ */

function ProgressScreen({ prog, storageOk }) {
  const levelIdx = Math.min(Math.floor(prog.xp / XP_PER_LEVEL), XP_TITLES.length - 1);
  return (
    <div className="px-4 pb-8 fy-pop">
      <div className="pt-5 pb-2">
        <div className="fy-disp font-extrabold text-2xl" style={{ color: C.ink }}>Progreso</div>
        <div className="text-xs" style={{ color: C.sub }}>Tu avance se guarda automáticamente en esta app.</div>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-2">
        <div className="rounded-2xl border-2 p-4" style={{ borderColor: C.ink, background: C.card }}>
          <div className="flex items-center gap-1"><Zap size={16} style={{ color: C.mustard }} /><span className="text-xs font-bold uppercase" style={{ color: C.sub }}>XP total</span></div>
          <div className="fy-disp fy-num font-extrabold text-3xl mt-1" style={{ color: C.ink }}>{prog.xp}</div>
          <div className="text-xs font-semibold" style={{ color: C.sub }}>{XP_TITLES[levelIdx]}</div>
        </div>
        <div className="rounded-2xl border-2 p-4" style={{ borderColor: C.ink, background: C.card }}>
          <div className="flex items-center gap-1"><Flame size={16} style={{ color: C.red }} /><span className="text-xs font-bold uppercase" style={{ color: C.sub }}>Racha</span></div>
          <div className="fy-disp fy-num font-extrabold text-3xl mt-1" style={{ color: C.ink }}>{prog.streak}</div>
          <div className="text-xs font-semibold" style={{ color: C.sub }}>{prog.streak === 1 ? "día seguido" : "días seguidos"}</div>
        </div>
      </div>

      <div className="rounded-2xl border-2 p-4 mt-3" style={{ borderColor: C.ink, background: C.card }}>
        <div className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: C.sub }}>Lecciones</div>
        {LEVELS.map((lv) => {
          const done = lv.lessons.filter((ls) => prog.lessons[ls.id]).length;
          return (
            <div key={lv.id} className="mb-3">
              <div className="flex justify-between text-xs font-bold mb-1">
                <span style={{ color: lv.color }}>{lv.name} <span style={{ color: C.sub }}>({lv.cefr})</span></span>
                <span className="fy-num" style={{ color: C.sub }}>{done}/{lv.lessons.length}</span>
              </div>
              <Bar value={done / lv.lessons.length} color={lv.color} />
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border-2 p-4 mt-3" style={{ borderColor: C.ink, background: C.card }}>
        <div className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: C.sub }}>Vocabulario dominado</div>
        {DECKS.map((d) => {
          const m = (prog.vocab[d.id] || []).length;
          return (
            <div key={d.id} className="mb-3">
              <div className="flex justify-between text-xs font-bold mb-1">
                <span style={{ color: C.ink }}>{d.name}</span>
                <span className="fy-num" style={{ color: C.sub }}>{m}/{d.cards.length}</span>
              </div>
              <Bar value={m / d.cards.length} color={d.color} />
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border-2 p-4 mt-3 flex items-center gap-3" style={{ borderColor: C.line, background: C.card }}>
        <MessageCircle size={20} style={{ color: C.cobalt }} />
        <div className="text-sm" style={{ color: C.ink }}>
          <span className="fy-num font-extrabold">{prog.chats}</span> mensajes practicados con el Tutor IA
        </div>
      </div>

      {!storageOk && (
        <div className="rounded-xl p-3 mt-3 text-xs" style={{ background: C.mustardSoft, color: C.ink }}>
          Este entorno no tiene guardado permanente: tu progreso vive solo durante esta sesión.
        </div>
      )}
    </div>
  );
}

/* ============================ APP ============================ */

export default function App() {
  const [prog, setProg] = useState(null);
  const [storageOk, setStorageOk] = useState(true);
  const [tab, setTab] = useState("home");
  const [lessonView, setLessonView] = useState(null);
  const [deckView, setDeckView] = useState(null);

  useEffect(() => {
    (async () => {
      setStorageOk(storageAvailable());
      const p = await loadProgress();
      setProg(p);
    })();
  }, []);

  function save(p) {
    setProg(p);
    persistProgress(p);
  }
  function withStreak(p) {
    const t = todayStr();
    if (p.lastActive === t) return p;
    const s = p.lastActive === yesterdayStr() ? p.streak + 1 : 1;
    return { ...p, streak: s, lastActive: t };
  }
  function completeLesson(id, score, total) {
    const prev = prog.lessons[id];
    const xp = prev ? 0 : 20 + (score === total ? 10 : 0);
    const best = prev ? Math.max(prev.score, score) : score;
    save(withStreak({ ...prog, xp: prog.xp + xp, lessons: { ...prog.lessons, [id]: { score: best, total } } }));
    return xp;
  }
  function masterCard(deckId, en) {
    const list = prog.vocab[deckId] || [];
    if (list.includes(en)) return;
    save(withStreak({ ...prog, xp: prog.xp + 2, vocab: { ...prog.vocab, [deckId]: [...list, en] } }));
  }
  function chatXP() {
    save(withStreak({ ...prog, xp: prog.xp + 3, chats: prog.chats + 1 }));
  }
  function goTab(id) {
    setLessonView(null);
    setDeckView(null);
    setTab(id);
  }
  function replayIntro() {
    save({ ...prog, onboarded: false });
    setLessonView(null);
    setDeckView(null);
    setTab("home");
  }
  function resetAll() {
    save({ ...DEFAULT_PROGRESS, name: prog.name, onboarded: true });
    setLessonView(null);
    setDeckView(null);
    setTab("home");
  }

  if (!prog) {
    return (
      <div className="fy-root min-h-screen flex items-center justify-center" style={{ background: C.paper }}>
        <style>{FONT_CSS}</style>
        <div className="fy-disp font-extrabold text-3xl animate-pulse" style={{ color: C.ink }}>
          Fluye<span style={{ color: C.mustard }}>.</span>
        </div>
      </div>
    );
  }

  if (!prog.onboarded) {
    return (
      <div className="fy-root min-h-screen" style={{ background: C.paper, color: C.ink }}>
        <style>{FONT_CSS}</style>
        <div className="max-w-md mx-auto min-h-screen">
          <OnboardingFlow initialName={prog.name} onDone={(name) => save({ ...prog, name: name.trim(), onboarded: true })} />
        </div>
      </div>
    );
  }

  let content;
  if (lessonView) {
    content = (
      <LessonView
        lesson={lessonView.lesson}
        level={lessonView.level}
        onExit={() => setLessonView(null)}
        onComplete={completeLesson}
      />
    );
  } else if (deckView) {
    content = (
      <DeckView
        deck={deckView}
        masteredList={prog.vocab[deckView.id] || []}
        onMaster={masterCard}
        onExit={() => setDeckView(null)}
      />
    );
  } else if (tab === "home") {
    content = <HomeScreen prog={prog} onGoLesson={(lesson, level) => setLessonView({ lesson, level })} onTab={goTab} />;
  } else if (tab === "lessons") {
    content = <LessonsScreen prog={prog} onGoLesson={(lesson, level) => setLessonView({ lesson, level })} />;
  } else if (tab === "vocab") {
    content = <VocabScreen prog={prog} onGoDeck={(d) => setDeckView(d)} />;
  } else if (tab === "tutor") {
    content = <TutorScreen onChatXP={chatXP} />;
  } else {
    content = <MoreScreen prog={prog} storageOk={storageOk} onReplayIntro={replayIntro} onReset={resetAll} />;
  }

  return (
    <div className="fy-root min-h-screen" style={{ background: C.paper, color: C.ink }}>
      <style>{FONT_CSS}</style>
      <div className="max-w-md mx-auto" style={{ paddingBottom: 84 }}>{content}</div>
      <NavBar tab={tab} onTab={goTab} />
    </div>
  );
}

/* ============================ ONBOARDING (INTRO) ============================ */

const INTRO_SLIDES = [
  {
    Icon: Sparkles,
    color: C.mustard,
    title: "Bienvenido a Fluye",
    text: "Una app gratuita para aprender inglés desde cero hasta conversar con confianza. Todo explicado en español, a tu ritmo, con sesiones cortas de 10–15 minutos al día.",
  },
  {
    Icon: BookOpen,
    color: C.green,
    title: "Lecciones y vocabulario",
    text: "15 lecciones en 3 niveles (Básico, Intermedio y Avanzado) con teoría clara, ejemplos con audio y quiz. Además, 10 mazos de tarjetas por temas: saludos, salud, compras, viajes, trabajo y más.",
  },
  {
    Icon: MessageCircle,
    color: C.cobalt,
    title: "Tutor IA para conversar",
    text: "Practica conversaciones reales por escrito: una entrevista, el médico, una tienda, el aeropuerto… El tutor te responde en inglés, te corrige en español y te sugiere frases más naturales.",
  },
  {
    Icon: TrendingUp,
    color: C.red,
    title: "Progreso, racha y manual",
    text: "Ganas XP con cada actividad y mantienes una racha diaria. En la pestaña «Más» encontrarás tu progreso, el manual de uso y un buzón para proponer mejoras a la app.",
  },
];

function OnboardingFlow({ initialName, onDone }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState(initialName || "");
  const last = INTRO_SLIDES.length; // paso final = formulario

  return (
    <div className="min-h-screen flex flex-col px-6 py-8 fy-pop" key={step}>
      <div className="flex items-center justify-between">
        <div className="fy-disp font-extrabold text-xl" style={{ color: C.ink }}>
          Fluye<span style={{ color: C.mustard }}>.</span>
        </div>
        {step < last && (
          <button onClick={() => setStep(last)} className="text-xs font-bold" style={{ color: C.sub }}>
            Saltar →
          </button>
        )}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center">
        {step < last ? (
          <>
            <div className="w-20 h-20 rounded-2xl border-2 flex items-center justify-center" style={{ borderColor: C.ink, background: C.card }}>
              {(() => { const S = INTRO_SLIDES[step].Icon; return <S size={36} style={{ color: INTRO_SLIDES[step].color }} />; })()}
            </div>
            <div className="fy-disp font-extrabold text-2xl mt-5" style={{ color: C.ink }}>{INTRO_SLIDES[step].title}</div>
            <p className="text-sm mt-3 leading-relaxed max-w-xs" style={{ color: C.sub }}>{INTRO_SLIDES[step].text}</p>
          </>
        ) : (
          <>
            <div className="fy-disp font-extrabold text-2xl" style={{ color: C.ink }}>¿Cómo te llamas?</div>
            <p className="text-sm mt-2 max-w-xs" style={{ color: C.sub }}>
              Para saludarte por tu nombre. Es opcional y solo se guarda en tu dispositivo.
            </p>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") onDone(name); }}
              placeholder="Tu nombre"
              aria-label="Tu nombre"
              className="w-full max-w-xs mt-5 px-4 py-3 rounded-xl border-2 text-center font-bold outline-none"
              style={{ borderColor: C.ink, background: C.card, color: C.ink }}
            />
            <button
              onClick={() => onDone(name)}
              className="w-full max-w-xs mt-4 py-3 rounded-xl font-bold text-sm border-2"
              style={{ background: C.ink, borderColor: C.ink, color: C.paper }}
            >
              ¡Empezar a aprender!
            </button>
          </>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-1.5">
          {[...Array(last + 1)].map((_, i) => (
            <div key={i} className="rounded-full" style={{ width: i === step ? 18 : 7, height: 7, background: i === step ? C.mustard : C.line, transition: "width .25s" }} />
          ))}
        </div>
        {step < last && (
          <button
            onClick={() => setStep(step + 1)}
            className="px-5 py-2.5 rounded-xl font-bold text-sm border-2 flex items-center gap-1"
            style={{ background: C.ink, borderColor: C.ink, color: C.paper }}
          >
            Siguiente <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

/* ============================ MANUAL DE USO ============================ */

const MANUAL_VERSION = "2.1";
const MANUAL = [
  {
    t: "Cómo estudiar con Fluye",
    b: "La constancia gana: 10–15 minutos diarios rinden más que una hora un solo día. Rutina sugerida: 1 lección (o repasarla), 1 mazo de vocabulario y 5 mensajes con el Tutor IA. Así tocas gramática, palabras y conversación cada día y mantienes tu racha.",
  },
  {
    t: "Lecciones",
    b: "Están ordenadas de lo más básico (verbo to be) a lo avanzado (entrevistas de trabajo). Cada una tiene teoría en español con ejemplos que puedes escuchar tocando la bocina, un tip con errores típicos de hispanohablantes y un quiz de 5 preguntas. Completarla da 20 XP (+10 si sacas perfecto). Puedes repetirla las veces que quieras para mejorar tu marca.",
  },
  {
    t: "Vocabulario (tarjetas)",
    b: "Cada mazo agrupa palabras de un tema (salud, compras, viajes, trabajo…). Toca la tarjeta para voltearla y ver la traducción con un ejemplo. «La sé» la marca como dominada (+2 XP); «Otra vez» la manda al final para repasarla. Cuando domines un mazo, puedes repasarlo completo cuando quieras.",
  },
  {
    t: "Tutor IA",
    b: "Es una conversación por escrito con Claude (inteligencia artificial, no una persona). Elige tu nivel y un escenario, escribe en inglés y el tutor sigue la plática, marca tu error principal en español (📝) y te propone una versión más natural (✨). Cada mensaje tuyo suma 3 XP. Consejo: no busques la perfección; equivocarte es parte del método.",
  },
  {
    t: "XP, niveles y racha",
    b: "Cada 120 XP subes de título (de Principiante hasta Fluido) y la aguja del medidor avanza. La racha cuenta los días seguidos con actividad: si estudias hoy y mañana, va en 2. Si un día no entras, vuelve a empezar. El medidor de la portada es tu resumen visual.",
  },
  {
    t: "Guardado y privacidad",
    b: "Todo (tu nombre, XP, racha, lecciones, tarjetas, sugerencias y la API key del tutor) se guarda únicamente en el navegador de este dispositivo (localStorage): la app no tiene servidor propio ni envía tus datos a ninguna parte. Si borras los datos del navegador o cambias de dispositivo, el progreso no te sigue. Lo único que sale de tu equipo son los mensajes que escribes al Tutor IA (van a la API de Anthropic) y las sugerencias que tú decidas publicar en GitHub.",
  },
  {
    t: "Preguntas frecuentes",
    b: "¿Puedo empezar en Intermedio o Avanzado? Sí, las lecciones no están bloqueadas. ¿No suena el audio? Revisa el volumen y que tu navegador permita voz (funciona mejor en Chrome/Edge/Safari). ¿Qué necesita el tutor? Internet y una API key de Anthropic que guardas una sola vez en la pestaña Tutor; se queda solo en tu navegador. ¿Puedo reiniciar? Sí, en Más → Opciones → Reiniciar progreso.",
  },
  {
    t: "Historial de versiones",
    b: "v2.1 (18 jul 2026): versión de código abierto lista para GitHub — guardado con localStorage, Tutor IA con tu propia API key de Anthropic y buzón conectado a GitHub Issues. — v2.0 (18 jul 2026): pantalla de introducción, este manual, buzón de mejoras, saludo personalizado, 4 mazos nuevos (salud, compras, vida diaria, números y horas) y 3 escenarios nuevos (médico, conocer gente, de compras). Contenido generalizado para cualquier persona. — v1.0 (15 jul 2026): 15 lecciones, 6 mazos, Tutor IA, XP y racha. Este manual se actualiza con cada nueva versión.",
  },
];

function ManualSection() {
  const [open, setOpen] = useState(null);
  return (
    <div className="rounded-2xl border-2 p-4 mt-3" style={{ borderColor: C.ink, background: C.card }}>
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <HelpCircle size={18} style={{ color: C.cobalt }} />
          <span className="fy-disp font-bold" style={{ color: C.ink }}>Manual de uso</span>
        </div>
        <span className="text-xs fy-num font-bold px-2 py-0.5 rounded-full" style={{ background: C.cobaltSoft, color: C.cobalt }}>v{MANUAL_VERSION}</span>
      </div>
      <div className="text-xs mb-2" style={{ color: C.sub }}>Toca un tema para leerlo. Se actualiza con cada versión.</div>
      {MANUAL.map((m, i) => (
        <div key={i} className="border-t" style={{ borderColor: C.line }}>
          <button onClick={() => setOpen(open === i ? null : i)} className="w-full py-3 flex items-center justify-between text-left">
            <span className="text-sm font-bold" style={{ color: C.ink }}>{m.t}</span>
            <ChevronDown size={16} style={{ color: C.sub, transform: open === i ? "rotate(180deg)" : "none", transition: "transform .2s" }} />
          </button>
          {open === i && (
            <p className="text-sm leading-relaxed pb-3 fy-pop" style={{ color: C.sub }}>{m.b}</p>
          )}
        </div>
      ))}
    </div>
  );
}

/* ============================ MEJORAR LA APP (BUZÓN) ============================ */

const FEEDBACK_KEY = "fluye-feedback-v1";
const FB_CATS = [
  { id: "idea", label: "💡 Idea" },
  { id: "contenido", label: "📚 Contenido" },
  { id: "error", label: "🐞 Error" },
];

function FeedbackSection({ userName }) {
  const [items, setItems] = useState(() => {
    try {
      const v = localStorage.getItem(FEEDBACK_KEY);
      return v ? JSON.parse(v) : [];
    } catch (e) { return []; }
  });
  const [cat, setCat] = useState("idea");
  const [text, setText] = useState("");
  const [notice, setNotice] = useState(null);

  function submit() {
    const t = text.trim();
    if (!t) return;
    const entry = { name: (userName || "").trim() || "Anónimo", cat, text: t, date: todayStr() };
    const next = [entry, ...items].slice(0, 100);
    setItems(next);
    try { localStorage.setItem(FEEDBACK_KEY, JSON.stringify(next)); } catch (e) {}
    setText("");
    setNotice("Guardada en este dispositivo. Con «Publicar en GitHub» la envías al proyecto.");
  }

  function openIssue(it) {
    const catLabel = (FB_CATS.find((c) => c.id === it.cat) || FB_CATS[0]).label;
    const title = encodeURIComponent("[" + it.cat + "] " + it.text.slice(0, 60));
    const body = encodeURIComponent("**Categoría:** " + catLabel + "\n**De:** " + it.name + " · " + it.date + "\n\n" + it.text);
    window.open(REPO_URL + "/issues/new?title=" + title + "&body=" + body, "_blank", "noopener");
  }

  return (
    <div className="rounded-2xl border-2 p-4 mt-3" style={{ borderColor: C.ink, background: C.card }}>
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <Lightbulb size={18} style={{ color: C.mustard }} />
          <span className="fy-disp font-bold" style={{ color: C.ink }}>Mejorar la app</span>
        </div>
        <a href={REPO_URL + "/issues"} target="_blank" rel="noreferrer" className="text-xs font-bold" style={{ color: C.cobalt }}>Ver issues ↗</a>
      </div>
      <div className="text-xs mb-3" style={{ color: C.sub }}>
        ¿Qué le falta a Fluye? Escríbelo aquí: se guarda en tu dispositivo y, si quieres, publícalo como issue en GitHub para que el proyecto lo vea y cualquiera pueda sumarse.
      </div>
      <div className="flex gap-2 mb-2">
        {FB_CATS.map((c) => (
          <button
            key={c.id}
            onClick={() => setCat(c.id)}
            className="px-3 py-1.5 rounded-full border-2 text-xs font-bold"
            style={cat === c.id
              ? { background: C.ink, borderColor: C.ink, color: C.paper }
              : { background: C.card, borderColor: C.line, color: C.ink }}
          >
            {c.label}
          </button>
        ))}
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escribe tu sugerencia…"
        aria-label="Tu sugerencia para mejorar la app"
        rows={3}
        className="w-full rounded-xl border-2 p-3 text-sm outline-none resize-none"
        style={{ borderColor: C.line, background: C.paper, color: C.ink }}
      />
      <button
        onClick={submit}
        disabled={!text.trim()}
        className="w-full mt-2 py-2.5 rounded-xl font-bold text-sm border-2"
        style={{
          background: !text.trim() ? C.line : C.mustard,
          borderColor: !text.trim() ? C.line : C.mustard,
          color: C.ink,
        }}
      >
        Guardar sugerencia
      </button>
      {notice && <div className="text-xs mt-2 font-semibold" style={{ color: C.green }}>{notice}</div>}
      {items.length > 0 && (
        <div className="mt-3 border-t pt-2" style={{ borderColor: C.line }}>
          <div className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: C.sub }}>Tus sugerencias ({items.length})</div>
          <div className="flex flex-col gap-2" style={{ maxHeight: 240, overflowY: "auto" }}>
            {items.map((it, i) => (
              <div key={i} className="rounded-xl p-2.5 text-xs" style={{ background: C.paper }}>
                <span className="font-bold" style={{ color: C.ink }}>
                  {(FB_CATS.find((c) => c.id === it.cat) || FB_CATS[0]).label} · {it.name}
                </span>
                <span style={{ color: C.sub }}> · {it.date}</span>
                <div className="mt-1" style={{ color: C.ink }}>{it.text}</div>
                <button onClick={() => openIssue(it)} className="mt-1.5 font-bold" style={{ color: C.cobalt }}>
                  Publicar en GitHub ↗
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================ PANTALLA: MÁS ============================ */

function MoreScreen({ prog, storageOk, onReplayIntro, onReset }) {
  const [confirmReset, setConfirmReset] = useState(false);
  return (
    <div className="pb-8">
      <ProgressScreen prog={prog} storageOk={storageOk} />
      <div className="px-4" style={{ marginTop: -8 }}>
        <ManualSection />
        <FeedbackSection userName={prog.name} />
        <div className="rounded-2xl border-2 p-4 mt-3" style={{ borderColor: C.line, background: C.card }}>
          <div className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: C.sub }}>Opciones</div>
          <button onClick={onReplayIntro} className="w-full py-2.5 rounded-xl border-2 font-bold text-sm mb-2" style={{ borderColor: C.ink, color: C.ink, background: C.card }}>
            Ver la introducción de nuevo
          </button>
          {!confirmReset ? (
            <button onClick={() => setConfirmReset(true)} className="w-full py-2.5 rounded-xl border-2 font-bold text-sm" style={{ borderColor: C.line, color: C.sub, background: C.card }}>
              Reiniciar progreso…
            </button>
          ) : (
            <div className="rounded-xl p-3" style={{ background: C.redSoft }}>
              <div className="text-xs font-bold mb-2" style={{ color: C.red }}>Se borrarán tu XP, racha, lecciones y tarjetas. Esto no se puede deshacer.</div>
              <div className="flex gap-2">
                <button onClick={() => setConfirmReset(false)} className="flex-1 py-2 rounded-xl border-2 font-bold text-xs" style={{ borderColor: C.ink, color: C.ink, background: C.card }}>
                  Cancelar
                </button>
                <button onClick={() => { setConfirmReset(false); onReset(); }} className="flex-1 py-2 rounded-xl font-bold text-xs border-2" style={{ background: C.red, borderColor: C.red, color: "#fff" }}>
                  Sí, reiniciar
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="text-center text-xs mt-5" style={{ color: C.sub }}>
          Fluye v{MANUAL_VERSION} · aprende inglés todos los días
          <div className="mt-1">
            <a href={REPO_URL} target="_blank" rel="noreferrer" className="font-bold" style={{ color: C.cobalt }}>Código abierto en GitHub ↗</a>
          </div>
        </div>
      </div>
    </div>
  );
}
