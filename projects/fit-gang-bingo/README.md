# #FitGang Bingo

A back-seat road-trip bingo game for spotting Honda Fits.

**Spot it. Yell it. Mark it.**

One US Letter sheet, four cards, ready to print and hand to the back seat.

## How it works

Each card is a 4×4 grid. The 16 squares — 11 paint colours, 3 generations, a Free
Space, and a Hot Rod wildcard — fill a card exactly, so one shuffle randomizes both
the square order and where Free Space and Hot Rod land. All four cards shuffle
independently, so no two players are marking the same layout.

Normal bingo rules.

### The colour cull

Honda shipped **six blues** on the US Fit — Tidewater, Celestial, Blue Sensation,
Vortex, Aegean, Reflection — and nobody can tell them apart from a moving car. They
collapse into **Light Blue** and **Dark Blue**.

**Blue Raspberry** (BG59M, 2012–13) survives on its own because it isn't actually
blue: it's a **teal**, and it reads as one at 70mph. The chip is sampled from
photographs of real BG59M cars, not from the name.

The three survivors are separated on lightness *and* saturation — pale / vivid teal
/ dark — because two chips at the same value read as the same colour through a car
window no matter how far apart their hues are.

Colours: White, Black, Silver, Dark Gray, Red, Orange, Yellow, Light Blue, Dark
Blue, Blue Raspberry, Purple. Generic labels mean any visible shade in that family
counts. There is no green or brown US-market Fit — don't add one.

### Generations

**GD3** (2007–08), **GE8** (2009–13), **GK5** (2015–20). Calling the generation is
the real Fit-gang skill, and the shapes differ enough to spot from a moving car —
so the square shows the car, not just the code. That art is greyscale on purpose:
a generation square must never read as a colour square.

Aimed at U.S.-market Fits.

### Hot Rod

Each of the four cards gets a different Hot Rod car (blue / orange / purple /
light blue), cycled by card index rather than shuffled — a player should be able
to find their own card at a glance, and that only works if the car stays put.

## Controls

- **Regenerate** — reshuffles all four cards.
- **Print** — opens the print dialog. The page chrome drops away and the sheet
  prints as exactly one US Letter page.

## Printing

The cards are white on purpose — cheap to print, easy to mark. Enable
"Background graphics" if your browser has it turned off, or the colour swatches
come out empty.

## Develop

```bash
npm install
npm run dev        # → http://localhost:5173/clayground/fit-gang-bingo/main/
npm run build      # → ../../docs/fit-gang-bingo/main
npm run typecheck  # checks this project's own sources
```

## Folder structure

```
fit-gang-bingo/
├── index.html
├── vite.config.ts
├── package.json
└── src/
    ├── main.tsx
    ├── App.tsx                          # sheet layout + Regenerate / Print
    ├── index.css                        # tokens, sheet sizing, print rules
    ├── components/BingoCard/BingoCard.tsx
    ├── data/squares.ts                  # the colour pool
    └── utils/shuffle.ts
```
