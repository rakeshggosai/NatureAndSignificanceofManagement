// --- MINIGAME CONTROLLER HUB ---

let streetFoodGameInterval = null;
let crisisGameInterval = null;

function exitGames() {
  // Clear any running game loops
  if (streetFoodGameInterval) {
    clearInterval(streetFoodGameInterval);
    streetFoodGameInterval = null;
  }
  if (crisisGameInterval) {
    clearInterval(crisisGameInterval);
    crisisGameInterval = null;
  }

  // Reset UI components
  document.getElementById('games-selection-screen').classList.remove('hidden');
  document.getElementById('game-street-food-container').classList.add('hidden');
  document.getElementById('game-crisis-container').classList.add('hidden');
  
  // Reset overlay modals
  document.getElementById('control-settings-modal').classList.add('hidden');
}

// ==========================================
// 1. પાણીપુરી ટાયકૂન (STREET FOOD TYCOON)
// ==========================================

const foodGameState = {
  budget: 1000,
  puris: 20,
  pricePerPlate: 20,
  quality: 'medium', // low, medium, high
  hasHelper: false,
  helperEfficiency: 0,
  customers: [],
  reputation: 100, // 0 to 100
  secondsLeft: 60,
  dayEnded: false
};

function startStreetFoodGame() {
  exitGames(); // Safety clean

  // Setup views
  document.getElementById('games-selection-screen').classList.add('hidden');
  document.getElementById('game-street-food-container').classList.remove('hidden');
  
  // Initialize game state
  foodGameState.budget = 1000;
  foodGameState.puris = 30;
  foodGameState.pricePerPlate = 20;
  foodGameState.quality = 'medium';
  foodGameState.hasHelper = false;
  foodGameState.customers = [];
  foodGameState.reputation = 100;
  foodGameState.secondsLeft = 60;
  foodGameState.dayEnded = false;

  updateFoodGameUI();

  // Initialize Canvas
  const canvas = document.getElementById('street-food-canvas');
  const ctx = canvas.getContext('2d');

  // Load game loop
  streetFoodGameInterval = setInterval(() => {
    updateFoodGamePhysics();
    renderFoodGame(ctx, canvas);
  }, 1000 / 30); // 30 FPS

  // Bind Buttons
  document.getElementById('btn-plan-stock').onclick = buyFoodStock;
  document.getElementById('btn-staff-hire').onclick = hireStallHelper;
  document.getElementById('btn-control-adjust').onclick = openControlStallModal;
}

function updateFoodGameUI() {
  document.getElementById('food-game-score').innerText = `બજેટ: ₹${foodGameState.budget} | પુરી: ${foodGameState.puris} | પ્રતિષ્ઠા: ${foodGameState.reputation}%`;
}

// Game planning action
function buyFoodStock() {
  if (foodGameState.budget >= 100) {
    foodGameState.budget -= 100;
    foodGameState.puris += 30; // buy 30 plates capacity
    updateFoodGameUI();
    triggerTextSplash("સ્ટોક ખરીદ્યો! (+૩૦)");
  } else {
    triggerTextSplash("અપૂરતું બજેટ!");
  }
}

// Game staffing action
function hireStallHelper() {
  if (foodGameState.hasHelper) {
    triggerTextSplash("હેલ્પર પહેલેથી છે!");
    return;
  }
  if (foodGameState.budget >= 200) {
    foodGameState.budget -= 200; // Helper salary deposit
    foodGameState.hasHelper = true;
    updateFoodGameUI();
    triggerTextSplash("કર્મચારી રાખ્યો! (નિયુક્તિ)");
  } else {
    triggerTextSplash("પગાર ચુકવવા બજેટ ઓછું છે!");
  }
}

// Game controlling modal toggles
function openControlStallModal() {
  document.getElementById('control-settings-modal').classList.remove('hidden');
  document.getElementById('stall-price').value = foodGameState.pricePerPlate;
  document.getElementById('price-val').innerText = `₹${foodGameState.pricePerPlate}`;
  document.getElementById('stall-quality').value = foodGameState.quality;
}

document.getElementById('stall-price').oninput = (e) => {
  document.getElementById('price-val').innerText = `₹${e.target.value}`;
};

document.getElementById('btn-close-control-modal').onclick = () => {
  foodGameState.pricePerPlate = parseInt(document.getElementById('stall-price').value);
  foodGameState.quality = document.getElementById('stall-quality').value;
  document.getElementById('control-settings-modal').classList.add('hidden');
  updateFoodGameUI();
  triggerTextSplash("અંકુશ સેટિંગ્સ લાગુ!");
};

let splashtext = "";
let splashTimer = 0;
function triggerTextSplash(text) {
  splashtext = text;
  splashTimer = 30; // frames
}

// Simulate customer flows
let customerSpawnTimer = 0;
function updateFoodGamePhysics() {
  if (foodGameState.dayEnded) return;

  // Decrease timer
  customerSpawnTimer++;
  if (customerSpawnTimer % 90 === 0) { // spawn customer every 3 seconds
    spawnCustomer();
  }

  // Helper auto serve
  if (foodGameState.hasHelper && foodGameState.puris > 0 && foodGameState.customers.length > 0) {
    const cust = foodGameState.customers[0];
    if (cust.status === 'waiting') {
      cust.serveProgress += 2; // Helper prepares food
      if (cust.serveProgress >= 100) {
        serveCustomer(0);
      }
    }
  }

  // Update customers
  for (let i = foodGameState.customers.length - 1; i >= 0; i--) {
    const cust = foodGameState.customers[i];
    cust.patience--;
    
    // Check patience loss
    if (cust.patience <= 0) {
      foodGameState.customers.splice(i, 1);
      foodGameState.reputation = Math.max(0, foodGameState.reputation - 10);
      updateFoodGameUI();
      triggerTextSplash("ગ્રાહક ગુસ્સે થઈ ગયો!");
    }
  }

  // Check Game Timer
  if (customerSpawnTimer % 30 === 0) { // every 1 second
    foodGameState.secondsLeft--;
    if (foodGameState.secondsLeft <= 0) {
      endFoodGameDay();
    }
  }
}

function spawnCustomer() {
  if (foodGameState.customers.length >= 4) return; // queue full
  
  // Decide customer budget expectations
  let budgetExpectation = 25;
  if (foodGameState.quality === 'high') budgetExpectation = 40;
  if (foodGameState.quality === 'low') budgetExpectation = 15;

  foodGameState.customers.push({
    x: 360,
    targetX: 80 + (foodGameState.customers.length * 60),
    patience: 300, // 10 seconds
    maxPatience: 300,
    serveProgress: 0,
    budgetExpect: budgetExpectation,
    status: 'waiting'
  });
}

function serveCustomer(index) {
  if (foodGameState.puris <= 0) {
    triggerTextSplash("બટાકા-પુરી ખલાસ! (આયોજન ભૂલ)");
    return;
  }

  const cust = foodGameState.customers[index];
  foodGameState.puris--;
  
  // Financial income calculation
  let pricePaid = foodGameState.pricePerPlate;
  let multiplier = 1;

  // customer checks price vs expectation
  if (pricePaid > cust.budgetExpect) {
    // customers pay but get upset, decreasing reputation
    foodGameState.reputation = Math.max(0, foodGameState.reputation - 5);
    multiplier = 0.8; 
  } else if (pricePaid < cust.budgetExpect) {
    // tipping or high satisfaction
    foodGameState.reputation = Math.min(100, foodGameState.reputation + 2);
    multiplier = 1.1;
  }

  const totalEarned = Math.round(pricePaid * multiplier);
  foodGameState.budget += totalEarned;

  foodGameState.customers.splice(index, 1);
  // Rearrange customer targets
  foodGameState.customers.forEach((c, idx) => {
    c.targetX = 80 + (idx * 60);
  });

  updateFoodGameUI();
  triggerTextSplash(`ગ્રાહક સંતોષાયો! (+₹${totalEarned})`);
}

function endFoodGameDay() {
  foodGameState.dayEnded = true;
  clearInterval(streetFoodGameInterval);
  streetFoodGameInterval = null;

  // Calculate profit
  const netProfit = foodGameState.budget - 1000;
  let reviewText = "";
  if (netProfit > 200 && foodGameState.reputation > 80) {
    reviewText = "અદ્ભુત સંચાલન! તમે આયોજન, સ્ટાફિંગ અને અંકુશનું આયોજન બહુ સારી રીતે કર્યું!";
  } else if (netProfit <= 0) {
    reviewText = "નુકસાન થયું! આયોજન સુધારો અને કાચા માલનો વેડફાટ અટકાવો.";
  } else {
    reviewText = "સામાન્ય દિવસ! ગ્રાહકોની ગુણવત્તા અને કિંમતના સંતોષ (અંકુશ) પર વધુ ધ્યાન આપો.";
  }

  alert(`દિવસ પૂર્ણ થયો!\n\nકુલ નફો/નુકસાન: ₹${netProfit}\nઅંતિમ પ્રતિષ્ઠા: ${foodGameState.reputation}%\n\nપરીક્ષક સમીક્ષા: ${reviewText}`);
  exitGames();
}

// Canvas rendering of Pani Puri Stall
function renderFoodGame(ctx, canvas) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background gradient (Glassmorphism dark theme)
  const bgGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  bgGrad.addColorStop(0, '#0d0e15');
  bgGrad.addColorStop(1, '#1b1d2a');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw Stall Table (Neon lines)
  ctx.strokeStyle = '#00f2fe';
  ctx.lineWidth = 3;
  ctx.shadowColor = 'rgba(0, 242, 254, 0.4)';
  ctx.shadowBlur = 10;
  ctx.strokeRect(10, 240, canvas.width - 20, 100);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.fillRect(10, 240, canvas.width - 20, 100);

  // Draw Ingredients Bowls (Labels in Gujarati)
  ctx.shadowBlur = 0; // reset
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 12px Noto Sans Gujarati, sans-serif';
  ctx.fillText('પાણીપુરી કાઉન્ટર', 20, 265);

  // Big Pani Puri Masala Bowl
  ctx.fillStyle = '#2ecc71';
  ctx.beginPath();
  ctx.arc(60, 300, 22, 0, Math.PI, false);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.font = '10px Noto Sans Gujarati';
  ctx.fillText('મસાલો', 45, 310);

  // Puri Basket
  ctx.fillStyle = '#f39c12';
  ctx.fillRect(110, 275, 45, 25);
  ctx.fillStyle = '#fff';
  ctx.fillText('પુરી', 123, 292);

  // Cash Register / Galla
  ctx.fillStyle = '#3498db';
  ctx.fillRect(260, 265, 50, 40);
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(260, 265, 50, 40);
  ctx.fillStyle = '#fff';
  ctx.fillText('ગલ્લો', 273, 290);

  // Helper Assistant Chef (if hired)
  if (foodGameState.hasHelper) {
    ctx.fillStyle = '#c471ed';
    ctx.beginPath();
    ctx.arc(190, 220, 16, 0, Math.PI * 2); // Head
    ctx.fill();
    ctx.fillRect(180, 236, 20, 20); // Body
    ctx.fillStyle = '#fff';
    ctx.font = '9px Noto Sans Gujarati';
    ctx.fillText('મદદનીશ', 174, 195);
  }

  // Draw Player Chef (Vendor)
  ctx.fillStyle = '#00f2fe';
  ctx.beginPath();
  ctx.arc(280, 210, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillRect(265, 228, 30, 25);
  ctx.fillStyle = '#fff';
  ctx.fillText('મેનેજર (તમે)', 255, 182);

  // Draw Customers in Queue
  foodGameState.customers.forEach((cust, index) => {
    // Walk animation towards target X
    if (cust.x > cust.targetX) {
      cust.x -= 4;
    }

    // Customer head
    ctx.fillStyle = '#f7797d';
    ctx.beginPath();
    ctx.arc(cust.x, 120, 15, 0, Math.PI * 2);
    ctx.fill();
    // Body
    ctx.fillRect(cust.x - 12, 135, 24, 30);

    // Patience bar
    const patiencePct = cust.patience / cust.maxPatience;
    ctx.fillStyle = patiencePct > 0.4 ? '#2ecc71' : '#e74c3c';
    ctx.fillRect(cust.x - 20, 95, 40 * patiencePct, 4);

    // Progress bar for helper serving
    if (cust.serveProgress > 0) {
      ctx.fillStyle = '#3498db';
      ctx.fillRect(cust.x - 20, 88, 40 * (cust.serveProgress / 100), 4);
    }

    // Tap to serve button spot above first customer
    if (index === 0 && !foodGameState.hasHelper) {
      ctx.fillStyle = 'rgba(0, 242, 254, 0.8)';
      ctx.fillRect(cust.x - 25, 45, 50, 18);
      ctx.fillStyle = '#0d0e15';
      ctx.font = 'bold 9px Noto Sans Gujarati';
      ctx.fillText('પીરસો', cust.x - 14, 57);
    }
  });

  // Splash notifications text rendering
  if (splashTimer > 0) {
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px Noto Sans Gujarati';
    ctx.textAlign = 'center';
    ctx.fillText(splashtext, canvas.width / 2, 380);
    ctx.textAlign = 'start'; // reset
    splashTimer--;
  }

  // Draw Timer text
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.font = '12px Outfit';
  ctx.fillText(`સમય બાકી: ${foodGameState.secondsLeft} સે`, 20, 30);
}

// Bind canvas tap to serve customer
document.getElementById('street-food-canvas').addEventListener('click', (e) => {
  if (foodGameState.customers.length === 0 || foodGameState.hasHelper) return;
  
  // Calculate relative click coordinates
  const rect = e.target.getBoundingClientRect();
  const scaleX = 360 / rect.width;
  const clickX = (e.clientX - rect.left) * scaleX;
  
  const targetCust = foodGameState.customers[0];
  // Check if click was in vicinity of first customer (approx 50px buffer)
  if (Math.abs(clickX - targetCust.x) < 40) {
    serveCustomer(0);
  }
});

// ==========================================
// 2. આફત વ્યવસ્થાપક (CRISIS SORTER GAME)
// ==========================================

const crisisList = [
  { text: "બટાકાનો માલ બગડ્યો", type: "production" },
  { text: "નવા મસાલા મશીનની પસંદગી", type: "production" },
  { text: "શાકભાજીનો અંદાજપત્ર", type: "production" },
  { text: "લોનનું વ્યાજ ચૂકવવું", type: "finance" },
  { text: "કરવેરા બજેટ બનાવવું", type: "finance" },
  { text: "નવી મૂડી મેળવવી", type: "finance" },
  { text: "કર્મચારી ગેરહાજર રહ્યો", type: "hr" },
  { text: "નવા હેલ્પરને તાલીમ", type: "hr" },
  { text: "પગાર અને ભથ્થા નક્કી કરવા", type: "hr" },
  { text: "નવું ડિસ્કાઉન્ટ બેનર", type: "marketing" },
  { text: "ગ્રાહકનો ખરાબ પ્રતિભાવ", type: "marketing" },
  { text: "પુરીની હોમ ડિલિવરી", type: "marketing" }
];

let crisisScore = 0;
let crisisSpeed = 2; // pixel speed per frame
const activeBubbles = [];

function startCrisisSorterGame() {
  exitGames();

  document.getElementById('games-selection-screen').classList.add('hidden');
  document.getElementById('game-crisis-container').classList.remove('remove');
  document.getElementById('game-crisis-container').classList.remove('hidden');

  crisisScore = 0;
  document.getElementById('crisis-score').innerText = `સ્કોર: ${crisisScore}`;

  const playfield = document.getElementById('crisis-playfield');
  
  // Clear previous bubbles
  document.querySelectorAll('.crisis-bubble').forEach(b => b.remove());

  // Game loop triggers movement
  let frameCount = 0;
  crisisGameInterval = setInterval(() => {
    frameCount++;
    // Spawn bubble every 4 seconds (120 frames at 30fps)
    if (frameCount % 120 === 0) {
      spawnCrisisBubble(playfield);
    }
    moveCrisisBubbles(playfield);
  }, 1000 / 30);
}

function spawnCrisisBubble(playfield) {
  if (activeBubbles.length >= 3) return; // limit active bubbles

  const crisis = crisisList[Math.floor(Math.random() * crisisList.length)];
  const bubble = document.createElement('div');
  bubble.className = 'crisis-bubble';
  bubble.innerText = crisis.text;
  bubble.dataset.type = crisis.type;

  // Random horizontal starting position
  const startX = Math.random() * (playfield.clientWidth - 80);
  bubble.style.left = `${startX}px`;
  bubble.style.top = `-80px`;

  playfield.appendChild(bubble);
  
  const bubbleObj = {
    el: bubble,
    x: startX,
    y: -80,
    type: crisis.type,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    touchId: null
  };
  activeBubbles.push(bubbleObj);
  setupBubbleTouchEvents(bubbleObj, playfield);
}

function moveCrisisBubbles(playfield) {
  const limitY = playfield.clientHeight;

  for (let i = activeBubbles.length - 1; i >= 0; i--) {
    const bubble = activeBubbles[i];
    if (!bubble.isDragging) {
      bubble.y += crisisSpeed;
      bubble.el.style.top = `${bubble.y}px`;

      // Check if bubble fell out of bottom bounds (Failure)
      if (bubble.y >= limitY) {
        bubble.el.remove();
        activeBubbles.splice(i, 1);
        crisisScore = Math.max(0, crisisScore - 5);
        document.getElementById('crisis-score').innerText = `સ્કોર: ${crisisScore}`;
      }
    }
  }
}

// Touch/drag handler for swiping mechanics
function setupBubbleTouchEvents(bubbleObj, playfield) {
  const el = bubbleObj.el;

  const onDragStart = (clientX, clientY, touchId = null) => {
    bubbleObj.isDragging = true;
    bubbleObj.touchId = touchId;
    
    // Calculate initial relative drag spot
    const rect = el.getBoundingClientRect();
    bubbleObj.dragStartX = clientX - rect.left;
    bubbleObj.dragStartY = clientY - rect.top;
    el.style.cursor = 'grabbing';
  };

  const onDragMove = (clientX, clientY) => {
    if (!bubbleObj.isDragging) return;
    
    const playfieldRect = playfield.getBoundingClientRect();
    let newX = clientX - playfieldRect.left - bubbleObj.dragStartX;
    let newY = clientY - playfieldRect.top - bubbleObj.dragStartY;

    // Boundaries check
    newX = Math.max(0, Math.min(newX, playfield.clientWidth - 72));
    newY = Math.max(-80, Math.min(newY, playfield.clientHeight - 72));

    bubbleObj.x = newX;
    bubbleObj.y = newY;
    
    el.style.left = `${newX}px`;
    el.style.top = `${newY}px`;

    // Highlight active sorting bin hover states
    checkBinHover(bubbleObj, playfield);
  };

  const onDragEnd = () => {
    if (!bubbleObj.isDragging) return;
    bubbleObj.isDragging = false;
    el.style.cursor = 'grab';

    // Remove hover styles from bins
    document.querySelectorAll('.crisis-bin').forEach(bin => bin.classList.remove('hover'));

    // Check if dropped inside correct bin
    const matchedBin = checkCollisionWithBins(bubbleObj, playfield);
    if (matchedBin) {
      if (matchedBin === bubbleObj.type) {
        // SUCCESS
        crisisScore += 5;
        triggerSplashColor(el, '#00ff87');
        setTimeout(() => {
          el.remove();
          const idx = activeBubbles.indexOf(bubbleObj);
          if (idx > -1) activeBubbles.splice(idx, 1);
        }, 150);
      } else {
        // WRONG BIN FAILURE - Trigger micro-explanation in PWA popup
        triggerWrongBinExplanation(bubbleObj.type, matchedBin, bubbleObj.el.innerText);
        el.remove();
        const idx = activeBubbles.indexOf(bubbleObj);
        if (idx > -1) activeBubbles.splice(idx, 1);
        crisisScore = Math.max(0, crisisScore - 3);
      }
      document.getElementById('crisis-score').innerText = `સ્કોર: ${crisisScore}`;
    }
  };

  // Bind Mouse Events
  el.addEventListener('mousedown', (e) => {
    e.preventDefault();
    onDragStart(e.clientX, e.clientY);
  });

  document.addEventListener('mousemove', (e) => {
    if (bubbleObj.isDragging && bubbleObj.touchId === null) {
      onDragMove(e.clientX, e.clientY);
    }
  });

  document.addEventListener('mouseup', () => {
    if (bubbleObj.isDragging && bubbleObj.touchId === null) {
      onDragEnd();
    }
  });

  // Bind Mobile Touch Events
  el.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const touch = e.changedTouches[0];
    onDragStart(touch.clientX, touch.clientY, touch.identifier);
  });

  el.addEventListener('touchmove', (e) => {
    if (!bubbleObj.isDragging) return;
    for (let i = 0; i < e.touches.length; i++) {
      const touch = e.touches[i];
      if (touch.identifier === bubbleObj.touchId) {
        onDragMove(touch.clientX, touch.clientY);
        break;
      }
    }
  });

  el.addEventListener('touchend', (e) => {
    if (!bubbleObj.isDragging) return;
    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i];
      if (touch.identifier === bubbleObj.touchId) {
        onDragEnd();
        break;
      }
    }
  });
}

function checkBinHover(bubbleObj, playfield) {
  const bins = ['production', 'finance', 'hr', 'marketing'];
  const collidedBin = checkCollisionWithBins(bubbleObj, playfield);
  
  bins.forEach(b => {
    const binEl = document.getElementById(`bin-${b}`);
    if (collidedBin === b) {
      binEl.classList.add('hover');
    } else {
      binEl.classList.remove('hover');
    }
  });
}

function checkCollisionWithBins(bubbleObj, playfield) {
  const bubbleRect = bubbleObj.el.getBoundingClientRect();
  const bins = ['production', 'finance', 'hr', 'marketing'];
  
  for (let i = 0; i < bins.length; i++) {
    const binEl = document.getElementById(`bin-${bins[i]}`);
    const binRect = binEl.getBoundingClientRect();

    // Check collision overlap
    if (!(bubbleRect.right < binRect.left || 
          bubbleRect.left > binRect.right || 
          bubbleRect.bottom < binRect.top || 
          bubbleRect.top > binRect.bottom)) {
      return bins[i];
    }
  }
  return null;
}

function triggerSplashColor(el, color) {
  el.style.transition = 'all 0.15s ease-out';
  el.style.transform = 'scale(1.2)';
  el.style.background = color;
  el.style.opacity = '0';
}

// Micro-explanations for game incorrect sorts
function triggerWrongBinExplanation(correctBin, matchedBin, text) {
  const binNames = {
    production: "ઉત્પાદન સંચાલન",
    finance: "નાણાકીય સંચાલન",
    hr: "માનવ સંસાધન સંચાલન",
    marketing: "માર્કેટિંગ સંચાલન"
  };

  const explanations = {
    production: "ઉત્પાદન સંચાલનમાં કાચા માલ (જેમ કે બટાકા/પુરી) ની ખરીદી, ગુણવત્તા નિયંત્રણ અને પ્રોડક્ટ મિક્સ બનાવવા જેવા કાર્યોનો સમાવેશ થાય છે.",
    finance: "નાણાકીય સંચાલનમાં નાણાંની જરૂરિયાત અંદાજવી, બજેટ બનાવવું, અને આવક-ખર્ચની ફાળવણી કરવી જેવા નાણાકીય કાર્યો થાય છે.",
    hr: "માનવ સંસાધન સંચાલન (HR) કર્મચારીઓની સગવડો, તેમની નિયુક્તિ (સ્ટાફિંગ), તાલીમ, સંતોષ અને પગાર સાથે સંબંધિત છે.",
    marketing: "માર્કેટિંગ સંચાલનમાં ગ્રાહકોને આકર્ષવા માટે પેદાશની જાહેરાત (અભિવૃદ્ધિ), ભાવ નક્કી કરવા અને ગ્રાહક સેવાઓ આવે છે."
  };

  alert(`ભૂલ થઈ!\n\nઆફત: "${text}" એ સાચી રીતે ${binNames[correctBin]} નો ભાગ છે, તમે તેને ${binNames[matchedBin]} માં નાખી દીધી.\n\nસમજૂતી: ${explanations[correctBin]}`);
}
