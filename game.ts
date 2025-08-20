// Match the Pairs Game - TypeScript
// Emoji placeholders for cards
const icons = [
  '🐶', '🐱', '🦄', '🐙', '🦖', '🐝', '🌱', '👷',
];

const boardSize = 4; // 4x4 grid
const totalPairs = icons.length;

interface Card {
  id: number;
  icon: string;
  matched: boolean;
  flipped: boolean;
}

let cards: Card[] = [];
let firstCard: Card | null = null;
let secondCard: Card | null = null;
let lockBoard = false;
let moves = 0;
let pairsMatched = 0;

const board = document.getElementById('game-board')!;
const moveCounter = document.getElementById('move-counter')!;
const pairsMatchedEl = document.getElementById('pairs-matched')!;
const resetBtn = document.getElementById('reset-btn')!;

function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createCards(): Card[] {
  const doubled = [...icons, ...icons];
  const shuffled = shuffle(doubled);
  return shuffled.map((icon, idx) => ({
    id: idx,
    icon,
    matched: false,
    flipped: false,
  }));
}

function renderBoard() {
  board.innerHTML = '';
  cards.forEach(card => {
    const cardEl = document.createElement('div');
    cardEl.className = 'card' + (card.flipped || card.matched ? ' flipped' : '') + (card.matched ? ' matched' : '');
    cardEl.dataset.id = card.id.toString();
    cardEl.textContent = card.flipped || card.matched ? card.icon : '';
    cardEl.addEventListener('click', () => handleCardClick(card));
    board.appendChild(cardEl);
  });
}

function handleCardClick(card: Card) {
  if (lockBoard || card.flipped || card.matched) return;
  card.flipped = true;
  renderBoard();
  if (!firstCard) {
    firstCard = card;
    return;
  }
  secondCard = card;
  moves++;
  moveCounter.textContent = `Moves: ${moves}`;
  checkForMatch();
}

function checkForMatch() {
  if (!firstCard || !secondCard) return;
  lockBoard = true;
  if (firstCard.icon === secondCard.icon) {
    firstCard.matched = true;
    secondCard.matched = true;
    pairsMatched++;
    pairsMatchedEl.textContent = `Pairs matched: ${pairsMatched}/${totalPairs}`;
    resetTurn();
    if (pairsMatched === totalPairs) {
      setTimeout(() => alert('Congratulations! You matched all pairs!'), 400);
    }
  } else {
    setTimeout(() => {
      firstCard!.flipped = false;
      secondCard!.flipped = false;
      resetTurn();
      renderBoard();
    }, 900);
  }
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
  renderBoard();
}

function resetGame() {
  cards = createCards();
  moves = 0;
  pairsMatched = 0;
  moveCounter.textContent = 'Moves: 0';
  pairsMatchedEl.textContent = `Pairs matched: 0/${totalPairs}`;
  firstCard = null;
  secondCard = null;
  lockBoard = false;
  renderBoard();
}

resetBtn.addEventListener('click', resetGame);

// Initial game setup
resetGame();
