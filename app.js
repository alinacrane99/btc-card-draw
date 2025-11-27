// Simple state
let bankBalanceBtc = 0;
let currentBtcPrice = 50000; // TODO: replace with real API price (USD)
const cardDefinitions = [
  { label: "0.10% of BTC price", factor: 0.0010 },
  { label: "0.25% of BTC price", factor: 0.0025 },
  { label: "0.50% of BTC price", factor: 0.0050 },
  { label: "1.00% of BTC price", factor: 0.0100 }
];

// Cost factor for each draw (in % of BTC price, expressed as BTC)
const drawCostPercent = 0.0005; // 0.05% of BTC price

const bankBalanceEl = document.getElementById("bank-balance");
const btcPriceEl = document.getElementById("btc-price");
const cardValueLabelEl = document.getElementById("card-value-label");
const drawCostInfoEl = document.getElementById("draw-cost-info");
const buyDrawBtn = document.getElementById("buy-draw-btn");
const logListEl = document.getElementById("log-list");

function formatBtc(value) {
  return value.toFixed(8) + " BTC";
}

function formatUsd(value) {
  return "$" + value.toFixed(2);
}

function updateUi() {
  btcPriceEl.textContent = formatUsd(currentBtcPrice);

  const drawCostBtc = (currentBtcPrice * drawCostPercent) / currentBtcPrice;
  drawCostInfoEl.textContent =
    "Draw cost: " + formatBtc(drawCostBtc) + " (linked to BTC price)";

  bankBalanceEl.textContent = formatBtc(bankBalanceBtc);
}

function log(message) {
  const li = document.createElement("li");
  li.textContent = message;
  logListEl.prepend(li);
}

// Simpler Karten-Draw
function drawCard() {
  // Kosten berechnen
  const drawCostBtc = (currentBtcPrice * drawCostPercent) / currentBtcPrice;

  if (bankBalanceBtc < drawCostBtc) {
    log("Not enough balance to draw a card.");
    return;
  }

  bankBalanceBtc -= drawCostBtc;

  // Random Karte wählen
  const card = cardDefinitions[Math.floor(Math.random() * cardDefinitions.length)];

  // Kartenwert in USD & dann in BTC
  const cardUsdValue = currentBtcPrice * card.factor;
  const cardBtcValue = cardUsdValue / currentBtcPrice;

  bankBalanceBtc += cardBtcValue;

  cardValueLabelEl.textContent =
    `${card.label} → ${formatUsd(cardUsdValue)} (${formatBtc(cardBtcValue)})`;

  log(
    `Drew card: ${card.label} | +${formatBtc(cardBtcValue)} | -${formatBtc(
      drawCostBtc
    )}`
  );

  updateUi();
}

// Fake: BTC-Preis „setzen“ – später per API holen
function initFakePrice() {
  currentBtcPrice = 50000; // z.B. 50.000 USD
  updateUi();
}

// Event-Handler
buyDrawBtn.addEventListener("click", drawCard);

// Start
initFakePrice();

// Optional: Startguthaben zum Testen
bankBalanceBtc = 0.01; // 0.01 BTC
updateUi();
log("Initialized bank with 0.01 BTC start balance.");
