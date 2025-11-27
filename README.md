# Crypto Card Simulator 🎴 ₿

Small fun project: a card drawing simulator where each card represents a predefined value that is linked to the live Bitcoin price.

## Idea

- At the top left there is a **CryptoBank** balance.
- Each card shows:
  - a **Bitcoin symbol** in the center
  - a **QR code** (placeholder or future feature)
  - a **value text** at the bottom, e.g. `0.25% of current BTC price`
- When you draw a card:
  - The card value is calculated like:  
    `cardValue = factor * currentBTCPrice`
  - This value is **added** to the CryptoBank balance.
- Each draw costs a **base price**, e.g.:  
  `drawCost = productFactor * currentBTCPrice`
- You can **pre-buy draws** at a certain BTC price, so the time when you buy matters.

## Tech

- Simple **HTML / CSS / JavaScript** (no framework at the start).
- Fetch live BTC price from a public API (to be implemented).
- Logic for:
  - generating cards from predefined value factors
  - updating the CryptoBank balance
  - calculating draw costs

## Goals

- Experiment with:
  - live crypto price interaction
  - basic game-like UI
  - simple state management in JavaScript
- Later ideas:
  - Card rarity
  - Different currencies (USD/EUR)
  - History / log of drawn cards
