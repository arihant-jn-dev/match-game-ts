// Match the Pairs Game - TypeScript with Multiple Levels
// Emoji placeholders for cards
const allIcons = [
  '🐶', '🐱', '🦄', '🐙', '🦖', '🐝', '🌱', '👷',
  '🐸', '🦊', '🐵', '🐧', '🦉', '🐺', '🐯', '🐨',
  '🐼', '🦁', '🐮', '🐷', '🐰', '🐹', '🐻', '🐳',
  '🐬', '🐟', '🐠', '🦈', '🦀', '🐛', '🦋', '🌸'
];

type Level = 'easy' | 'medium' | 'hard';

interface LevelConfig {
  rows: number;
  cols: number;
  pairs: number;
  name: string;
}

const levelConfigs: Record<Level, LevelConfig> = {
  easy: { rows: 4, cols: 4, pairs: 8, name: '😊 Easy' },
  medium: { rows: 4, cols: 8, pairs: 16, name: '🤔 Medium' },
  hard: { rows: 8, cols: 8, pairs: 32, name: '🔥 Hard' }
};

interface Card {
  id: number;
  icon: string;
  matched: boolean;
  flipped: boolean;
}

let currentLevel: Level = 'easy';
let cards: Card[] = [];
let firstCard: Card | null = null;
let secondCard: Card | null = null;
let lockBoard = false;
let moves = 0;
let pairsMatched = 0;
let gameStartTime = 0;
let timerInterval: number | null = null;

// DOM elements - Initialize after DOM loads
let levelSelection: HTMLElement;
let gameScreen: HTMLElement;
let board: HTMLElement;
let moveCounter: HTMLElement;
let pairsMatchedEl: HTMLElement;
let currentLevelEl: HTMLElement;
let timerEl: HTMLElement;
let resetBtn: HTMLElement;
let backBtn: HTMLElement;
let successModal: HTMLElement;
let successMessage: HTMLElement;
let finalMoves: HTMLElement;
let finalTime: HTMLElement;
let playAgainBtn: HTMLElement;
let changeLevelBtn: HTMLElement;

// Utility functions
function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createCards(): Card[] {
  const config = levelConfigs[currentLevel];
  const icons = allIcons.slice(0, config.pairs);
  const doubled = [...icons, ...icons];
  const shuffled = shuffle(doubled);
  return shuffled.map((icon, idx) => ({
    id: idx,
    icon,
    matched: false,
    flipped: false,
  }));
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const minStr = mins < 10 ? '0' + mins : mins.toString();
  const secStr = secs < 10 ? '0' + secs : secs.toString();
  return `${minStr}:${secStr}`;
}

function startTimer() {
  gameStartTime = Date.now();
  timerInterval = window.setInterval(() => {
    const elapsed = Math.floor((Date.now() - gameStartTime) / 1000);
    timerEl.textContent = `Time: ${formatTime(elapsed)}`;
  }, 1000);
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function showLevelSelection() {
  levelSelection.classList.remove('hidden');
  gameScreen.classList.add('hidden');
  successModal.classList.add('hidden');
  stopTimer();
}

function showGameScreen() {
  levelSelection.classList.add('hidden');
  gameScreen.classList.remove('hidden');
  successModal.classList.add('hidden');
}

function showSuccessModal() {
  const config = levelConfigs[currentLevel];
  const elapsed = Math.floor((Date.now() - gameStartTime) / 1000);
  
  successMessage.textContent = `You completed ${config.name} level!`;
  finalMoves.textContent = moves.toString();
  finalTime.textContent = formatTime(elapsed);
  
  successModal.classList.remove('hidden');
  stopTimer();
}

function renderBoard() {
  const config = levelConfigs[currentLevel];
  board.className = `board ${currentLevel}`;
  board.innerHTML = '';
  
  cards.forEach(card => {
    const cardEl = document.createElement('div');
    cardEl.className = 'card' + 
      (card.flipped || card.matched ? ' flipped' : '') + 
      (card.matched ? ' matched' : '');
    cardEl.dataset.id = card.id.toString();
    cardEl.textContent = card.flipped || card.matched ? card.icon : '';
    cardEl.addEventListener('click', () => handleCardClick(card));
    board.appendChild(cardEl);
  });
}

function handleCardClick(card: Card) {
  if (lockBoard || card.flipped || card.matched) return;
  
  // Start timer on first move
  if (moves === 0) {
    startTimer();
  }
  
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
  
  const config = levelConfigs[currentLevel];
  
  if (firstCard.icon === secondCard.icon) {
    firstCard.matched = true;
    secondCard.matched = true;
    pairsMatched++;
    pairsMatchedEl.textContent = `Pairs matched: ${pairsMatched}/${config.pairs}`;
    resetTurn();
    
    if (pairsMatched === config.pairs) {
      setTimeout(() => showSuccessModal(), 500);
    }
  } else {
    // Add wrong animation
    const firstEl = document.querySelector(`[data-id="${firstCard.id}"]`);
    const secondEl = document.querySelector(`[data-id="${secondCard.id}"]`);
    firstEl?.classList.add('wrong');
    secondEl?.classList.add('wrong');
    
    setTimeout(() => {
      firstCard!.flipped = false;
      secondCard!.flipped = false;
      resetTurn();
      renderBoard();
    }, 1000);
  }
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
  renderBoard();
}

function startNewGame(level: Level) {
  currentLevel = level;
  const config = levelConfigs[level];
  
  cards = createCards();
  moves = 0;
  pairsMatched = 0;
  gameStartTime = 0;
  
  // Update UI
  currentLevelEl.textContent = config.name;
  moveCounter.textContent = 'Moves: 0';
  pairsMatchedEl.textContent = `Pairs matched: 0/${config.pairs}`;
  timerEl.textContent = 'Time: 00:00';
  
  firstCard = null;
  secondCard = null;
  lockBoard = false;
  
  showGameScreen();
  renderBoard();
  stopTimer();
}

function resetGame() {
  stopTimer();
  startNewGame(currentLevel);
}

// Event listeners
function initializeEventListeners() {
  // Initialize DOM elements
  levelSelection = document.getElementById('level-selection')!;
  gameScreen = document.getElementById('game-screen')!;
  board = document.getElementById('game-board')!;
  moveCounter = document.getElementById('move-counter')!;
  pairsMatchedEl = document.getElementById('pairs-matched')!;
  currentLevelEl = document.getElementById('current-level')!;
  timerEl = document.getElementById('timer')!;
  resetBtn = document.getElementById('reset-btn')!;
  backBtn = document.getElementById('back-btn')!;
  successModal = document.getElementById('success-modal')!;
  successMessage = document.getElementById('success-message')!;
  finalMoves = document.getElementById('final-moves')!;
  finalTime = document.getElementById('final-time')!;
  playAgainBtn = document.getElementById('play-again-btn')!;
  changeLevelBtn = document.getElementById('change-level-btn')!;

  // Add event listeners
  document.querySelectorAll('.level-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const level = (e.currentTarget as HTMLElement).dataset.level as Level;
      startNewGame(level);
    });
  });

  resetBtn.addEventListener('click', resetGame);
  backBtn.addEventListener('click', showLevelSelection);
  playAgainBtn.addEventListener('click', resetGame);
  changeLevelBtn.addEventListener('click', showLevelSelection);
}

// Initialize game when DOM is loaded
function initGame() {
  initializeEventListeners();
  showLevelSelection();
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGame);
} else {
  initGame();
}
