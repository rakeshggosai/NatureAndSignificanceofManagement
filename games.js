// --- MINIGAME CONTROLLER HUB ---

let activeCrisisGame = false;

function exitGames() {
  activeCrisisGame = false;
  
  // Reset UI components
  document.getElementById('games-selection-screen').classList.remove('hidden');
  document.getElementById('game-crisis-container').classList.add('hidden');
  
  // Hide active card
  const centerCard = document.getElementById('crisis-card-center');
  if (centerCard) {
    centerCard.classList.add('hidden');
    centerCard.style.transform = 'translate(0px, 0px)';
  }

  // Stop speech
  stopSpeech();
}

// ==========================================
// આફત વ્યવસ્થાપક (CRISIS SORTER GAME)
// ==========================================

const crisisList = [
  { text: "બટાકાનો કાચો માલ સડી ગયો (બગાડ)", type: "production", explanation: "કાચા માલની ગુણવત્તા જાળવવી અને બગાડ અટકાવવો એ ઉત્પાદન સંચાલન (Production Management) નું કાર્ય છે." },
  { text: "નવા ચણા બોઇલર મશીનની ખરીદી કરવી", type: "production", explanation: "ટેકનોલોજી અને યંત્રોની પસંદગી કરવી એ ઉત્પાદન સંચાલનનું કાર્ય છે." },
  { text: "દરરોજ કેટલી પાણીપુરી બનાવવી તેનું અનુમાન", type: "production", explanation: "ઉત્પાદનનું આયોજન (Production Planning) કરવું એ ઉત્પાદન સંચાલનનો ભાગ છે." },
  { text: "લોનનું માસિક વ્યાજ ચૂકવવું", type: "finance", explanation: "મૂડીની ચુકવણી અને નાણાકીય જવાબદારીઓ નાણાકીય સંચાલન (Financial Management) માં આવે છે." },
  { text: "ચાલુ વર્ષનું વેક્સિન ટેક્સ આયોજન કરવું", type: "finance", explanation: "કરવેરાનું આયોજન (Tax Planning) કરવું એ નાણાકીય સંચાલનનું મહત્વનું કાર્ય છે." },
  { text: "નવા ફ્રેન્ચાઈઝી સ્ટોર માટે મૂડી એકત્ર કરવી", type: "finance", explanation: "નાણાં મેળવવાની કાર્યવાહી અને મૂડી માળખું નાણાકીય સંચાલનમાં નક્કી થાય છે." },
  { text: "મુખ્ય રસોઈયો અચાનક બીમાર પડી ગેરહાજર રહ્યો", type: "hr", explanation: "કર્મચારીઓની ગેરહાજરી અને રજાઓનું વ્યવસ્થાપન માનવ સંસાધન સંચાલન (HRM) માં આવે છે." },
  { text: "નવા પીરસનાર છોકરાને ગ્રાહક સેવા અંગે તાલીમ", type: "hr", explanation: "કર્મચારીઓને તાલીમ અને વિકાસ (Training) આપવો એ એચ.આર.એમ. નું મુખ્ય કાર્ય છે." },
  { text: "હેલ્પર માટે દિવાળી બોનસ પગાર નક્કી કરવો", type: "hr", explanation: "કર્મચારીઓનું વળતર અને કલ્યાણકારી પ્રવૃત્તિઓ માનવ સંસાધન સંચાલન હેઠળ થાય છે." },
  { text: "આકર્ષક લાઈટિંગ અને મોટું બોર્ડ લગાવવું", type: "marketing", explanation: "ઉત્પાદનની જાહેરાત (Promotion) અને ગ્રાહકોને આકર્ષવા એ માર્કેટિંગ સંચાલન (Marketing Management) નું કાર્ય છે." },
  { text: "ગ્રાહકે મસાલા પાણી તીખું હોવાનો ખરાબ રિવ્યુ આપ્યો", type: "marketing", explanation: "ગ્રાહક સંતોષ અને તેમના ફીડબેકનું સંચાલન કરવું એ માર્કેટિંગ મિક્સનો ભાગ છે." },
  { text: "નવી ગળણી ચટણીના ફ્રી સેમ્પલ વહેંચવા", type: "marketing", explanation: "અભિવૃદ્ધિ (Sales Promotion) અને ગ્રાહકોને આકર્ષવા એ માર્કેટિંગ સંચાલનનું કાર્ય છે." }
];

const crisisGameState = {
  score: 0,
  shuffledQueue: [],
  currentIndex: 0,
  currentCardObj: null
};

function startCrisisSorterGame() {
  exitGames(); // Safety reset

  const instructionPoints = [
    "૧. સ્ક્રીનની મધ્યમાં લંબચોરસ પત્રક પર એક મેનેજમેન્ટ આપત્તિ (Crisis) આવશે.",
    "૨. આ પત્રક વાંચીને તેને સંતુલિત કરતા યોગ્ય સંચાલકીય ડબ્બા (Bin) માં ખેંચીને (Swipe) મૂકો.",
    "૩. ડબ્બાઓ નીચે આપેલા છે: ઉત્પાદન, નાણાકીય, કર્મચારી અને માર્કેટિંગ.",
    "૪. સાચા જવાબ પર +૫ સ્કોર મળશે, જ્યારે ખોટા જવાબ પર -૩ સ્કોર થશે.",
    "૫. જો વાચવામાં મુશ્કેલી પડે, તો ઉપર આપેલ 'સાંભળો' બટનથી ઓડિયો વાચન ચાલુ કરો."
  ];

  // Call PWA instruction popup before starting the game
  showInstructionModal(
    "આફત વ્યવસ્થાપક (Crisis Sorter) - નિયમો",
    instructionPoints,
    () => {
      // Callback to execute when user clicks "OK"
      launchCrisisSorterEngine();
    }
  );
}

function launchCrisisSorterEngine() {
  activeCrisisGame = true;
  document.getElementById('games-selection-screen').classList.add('hidden');
  document.getElementById('game-crisis-container').classList.remove('hidden');

  crisisGameState.score = 0;
  crisisGameState.currentIndex = 0;
  // Shuffle crisis list
  crisisGameState.shuffledQueue = [...crisisList].sort(() => Math.random() - 0.5);

  document.getElementById('crisis-score').innerText = `સ્કોર: ${crisisGameState.score}`;

  loadNextCrisisCard();
}

function loadNextCrisisCard() {
  if (!activeCrisisGame) return;

  const idx = crisisGameState.currentIndex;
  const centerCard = document.getElementById('crisis-card-center');
  
  if (idx >= crisisGameState.shuffledQueue.length) {
    // Game completed
    alert(`રમત પૂર્ણ થઈ!\n\nતમારો અંતિમ સ્કોર: ${crisisGameState.score} પોઈન્ટ્સ.`);
    exitGames();
    return;
  }

  const crisisData = crisisGameState.shuffledQueue[idx];
  
  // Set UI elements on the card
  centerCard.innerText = crisisData.text;
  centerCard.dataset.type = crisisData.type;
  centerCard.style.transform = 'translate(0px, 0px)';
  centerCard.style.transition = 'none';
  centerCard.style.opacity = '1';
  centerCard.classList.remove('hidden');

  // Bind Touch/Drag
  crisisGameState.currentCardObj = {
    el: centerCard,
    x: 0,
    y: 0,
    type: crisisData.type,
    data: crisisData,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    touchId: null
  };

  setupCrisisCardDrag(crisisGameState.currentCardObj);
}

function setupCrisisCardDrag(cardObj) {
  const el = cardObj.el;
  const playfield = document.getElementById('crisis-playfield');

  const onDragStart = (clientX, clientY, touchId = null) => {
    if (!activeCrisisGame) return;
    cardObj.isDragging = true;
    cardObj.touchId = touchId;
    
    const rect = el.getBoundingClientRect();
    cardObj.dragStartX = clientX - rect.left;
    cardObj.dragStartY = clientY - rect.top;
    
    el.style.transition = 'none';
    el.style.cursor = 'grabbing';
  };

  const onDragMove = (clientX, clientY) => {
    if (!cardObj.isDragging || !activeCrisisGame) return;
    
    const playfieldRect = playfield.getBoundingClientRect();
    // Calculate new position relative to center alignment
    const newX = clientX - playfieldRect.left - cardObj.dragStartX;
    const newY = clientY - playfieldRect.top - cardObj.dragStartY;

    cardObj.x = newX;
    cardObj.y = newY;
    
    // Apply position directly in px relative to parent container
    el.style.position = 'absolute';
    el.style.left = `${newX}px`;
    el.style.top = `${newY}px`;

    // Highlight hovered bin
    checkCrisisBinHover(cardObj);
  };

  const onDragEnd = () => {
    if (!cardObj.isDragging || !activeCrisisGame) return;
    cardObj.isDragging = false;
    el.style.cursor = 'grab';

    // Clear hover styles
    document.querySelectorAll('.crisis-bin').forEach(bin => bin.classList.remove('hover'));

    // Check collision check with bins
    const collidedBin = checkCrisisCollision(cardObj);
    if (collidedBin) {
      if (collidedBin === cardObj.type) {
        // Correct answer
        crisisGameState.score += 5;
        triggerCrisisSuccessSplash(el, '#00ff87');
        setTimeout(() => {
          el.classList.add('hidden');
          // Reset styling positions
          el.style.left = 'auto';
          el.style.top = 'auto';
          el.style.position = 'relative';
          crisisGameState.currentIndex++;
          loadNextCrisisCard();
        }, 200);
      } else {
        // Incorrect answer - show Gujarati explanation
        showWrongBinPopup(cardObj.data, collidedBin);
      }
      document.getElementById('crisis-score').innerText = `સ્કોર: ${crisisGameState.score}`;
    } else {
      // Snap back to center
      el.style.transition = 'left 0.2s, top 0.2s';
      el.style.left = 'calc(50% - 115px)'; // width / 2
      el.style.top = 'calc(50% - 70px)';  // height / 2
      setTimeout(() => {
        el.style.position = 'relative';
        el.style.left = 'auto';
        el.style.top = 'auto';
      }, 200);
    }
  };

  // Bind Mouse Events
  el.onmousedown = (e) => {
    e.preventDefault();
    onDragStart(e.clientX, e.clientY);
  };

  document.onmousemove = (e) => {
    if (cardObj.isDragging && cardObj.touchId === null) {
      onDragMove(e.clientX, e.clientY);
    }
  };

  document.onmouseup = () => {
    if (cardObj.isDragging && cardObj.touchId === null) {
      onDragEnd();
    }
  };

  // Bind Mobile Touch Events
  el.ontouchstart = (e) => {
    e.preventDefault();
    const touch = e.changedTouches[0];
    onDragStart(touch.clientX, touch.clientY, touch.identifier);
  };

  el.ontouchmove = (e) => {
    if (!cardObj.isDragging) return;
    for (let i = 0; i < e.touches.length; i++) {
      const touch = e.touches[i];
      if (touch.identifier === cardObj.touchId) {
        onDragMove(touch.clientX, touch.clientY);
        break;
      }
    }
  };

  el.ontouchend = (e) => {
    if (!cardObj.isDragging) return;
    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i];
      if (touch.identifier === cardObj.touchId) {
        onDragEnd();
        break;
      }
    }
  };
}

function checkCrisisBinHover(cardObj) {
  const bins = ['production', 'finance', 'hr', 'marketing'];
  const collidedBin = checkCrisisCollision(cardObj);
  
  bins.forEach(b => {
    const binEl = document.getElementById(`bin-${b}`);
    if (collidedBin === b) {
      binEl.classList.add('hover');
    } else {
      binEl.classList.remove('hover');
    }
  });
}

function checkCrisisCollision(cardObj) {
  const cardRect = cardObj.el.getBoundingClientRect();
  const bins = ['production', 'finance', 'hr', 'marketing'];
  
  for (let i = 0; i < bins.length; i++) {
    const binEl = document.getElementById(`bin-${bins[i]}`);
    const binRect = binEl.getBoundingClientRect();

    if (!(cardRect.right < binRect.left || 
          cardRect.left > binRect.right || 
          cardRect.bottom < binRect.top || 
          cardRect.top > binRect.bottom)) {
      return bins[i];
    }
  }
  return null;
}

function triggerCrisisSuccessSplash(el, color) {
  el.style.transition = 'all 0.2s ease-out';
  el.style.transform = 'scale(0.8)';
  el.style.background = color;
  el.style.opacity = '0';
}

function showWrongBinPopup(data, matchedBin) {
  const binNames = {
    production: "ઉત્પાદન સંચાલન",
    finance: "નાણાકીય સંચાલન",
    hr: "કર્મચારી સંચાલન",
    marketing: "માર્કેટિંગ સંચાલન"
  };

  // Show error modal using standard alerts or overlay dialogs
  alert(`ભૂલ થઈ!\n\nઆફત: "${data.text}" એ સાચી રીતે "${binNames[data.type]}" નો ભાગ છે. તમે તેને "${binNames[matchedBin]}" ના ખાનામાં નાખી દીધી.\n\nસમજૂતી: ${data.explanation}`);
  
  // Transition card
  const el = crisisGameState.currentCardObj.el;
  el.classList.add('hidden');
  el.style.left = 'auto';
  el.style.top = 'auto';
  el.style.position = 'relative';
  
  crisisGameState.score = Math.max(0, crisisGameState.score - 3);
  crisisGameState.currentIndex++;
  loadNextCrisisCard();
}
