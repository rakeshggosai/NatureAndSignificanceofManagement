// --- 25-MARK ACTIVE RECALL ASSESSMENT ENGINE ---

const assessState = {
  score: 0,
  currentPhase: 1, // 1 to 4
  secondsLeft: 180, // 3 minutes total
  timerInterval: null,
  
  // Phase 1: Tinder Swipe
  swipeCards: [
    { text: "સંચાલન એ માત્ર વિજ્ઞાન છે, તેમાં વ્યવહારિક કળાની કોઈ જરૂર નથી.", isTrue: false, explanation: "સંચાલન વિજ્ઞાન અને કળા બંને છે. નિયમો સમજવા એ વિજ્ઞાન છે, પણ લારી પર પાણીપુરી પ્રેમથી પીરસવી એ કળા છે!" },
    { text: "અંકુશ (Controlling) એ સંચાલનનું અંતિમ કાર્ય છે.", isTrue: true, explanation: "સાચું! આયોજન એ પ્રથમ કાર્ય છે અને અંકુશ એ છેલ્લું કાર્ય છે, જે ભૂલો સુધારે છે." },
    { text: "મધ્ય સપાટી સંચાલન એ મુખ્ય નીતિ-ઘડતરની સપાટી છે.", isTrue: false, explanation: "ખોટું! મુખ્ય નીતિ-ઘડતર ઉચ્ચ સપાટી સંચાલન (માલિક/જનરલ મેનેજર) દ્વારા થાય છે." },
    { text: "સંકલન (Coordination) ને સંચાલનનો આત્મા કહેવામાં આવે છે.", isTrue: true, explanation: "સાચું! સંકલન વિના દરેક વિભાગો વચ્ચે સુમેળ સધાતો નથી, તેથી તેને સંચાલનનો આત્મા કહે છે." },
    { text: "નાણું એ ધંધાકીય એકમનું જીવનદાતા રક્ત સમાન છે.", isTrue: true, explanation: "સાચું! પેજ ૧૨ નાણાકીય સંચાલન મુજબ, નાણાં વગર ધંધાની સ્થાપના કે ચલણ અશક્ય છે." }
  ],
  currentSwipeIndex: 0,

  // Phase 2: Drag and Drop Functions
  dragItems: [
    { text: "આગામી રવિવારની રોડ ટ્રીપ માટે કયા રસ્તે જવું તે અગાઉથી નક્કી કરવું", func: "planning", explanation: "પહેલાથી શું કરવું તે નક્કી કરવું એટલે 'આયોજન' (Planning)." },
    { text: "પ્રવાસ માટે કોણ ભાડું ઉઘરાવશે અને કોણ સામાન મુકશે તેની સત્તા સોંપવી", func: "organizing", explanation: "કામ અને જવાબદારીઓની વહેંચણી કરવી એટલે 'વ્યવસ્થાતંત્ર' (Organizing)." },
    { text: "લાંબી મુસાફરી માટે સારો ડ્રાઈવર પગાર પર રાખવો", func: "staffing", explanation: "લાયક માણસોની ભરતી અને નિમણૂક એટલે 'કર્મચારી વ્યવસ્થા' (Staffing)." },
    { text: "નવા હેલ્પરને કયા ગ્રાહકને કેવી રીતે પ્લેટ આપવી તેની સતત સૂચના આપવી", func: "directing", explanation: "કર્મચારીઓને માર્ગદર્શન આપવું અને દેખરેખ રાખવી એટલે 'દોરવણી' (Directing)." },
    { text: "બજેટ કરતા વધુ ખર્ચ ન થાય તે માટે રોજિંદા ગલ્લાની ચકાસણી કરવી", func: "controlling", explanation: "નક્કી કરેલા માપદંડ સાથે વાસ્તવિક કામ સરખાવી ભૂલો સુધારવી એટલે 'અંકુશ' (Controlling)." }
  ],
  currentDragIndex: 0,

  // Phase 3: Pyramid Matching
  pyramidRoles: [
    { name: "રેસ્ટોરન્ટના માલિક (Owner)", level: "top", explanation: "માલિક ઉચ્ચ સપાટી પર આવે છે જે આખા એકમના ધ્યેયો નક્કી કરે છે." },
    { name: "કિચન હેડ શેફ (Chef Manager)", level: "middle", explanation: "હેડ શેફ કે વિભાગીય મેનેજર્સ મધ્ય સપાટી પર આવે છે." },
    { name: "પીરસનાર / વેઇટર", level: "bottom", explanation: "નિરીક્ષકો, જોબર્સ, અને કામદારો તળ સપાટી પર રહીને રોજનું ઓપરેશનલ કામ કરે છે." },
    { name: "જનરલ મેનેજર (GM)", level: "top", explanation: "જનરલ મેનેજર પણ ઉચ્ચ સપાટી સંચાલનનો ભાગ છે જે નીતિ નક્કી કરે છે." },
    { name: "સફાઈ કામદાર / હેલ્પર", level: "bottom", explanation: "હેલ્પર તળ સપાટી (ઓપરેશનલ લેવલ) પર રહીને લારી ચલાવવામાં મદદ કરે છે." }
  ],
  currentPyramidIndex: 0,

  // Phase 4: Case Study MCQs (2 marks each)
  mcqs: [
    {
      question: "તમારી લારી પર રસોઈ બનાવનાર ચણા બાફવાનું ભૂલી જાય છે અને વેઇટર બૂમો પાડે છે કારણ કે ગ્રાહકો રાહ જુએ છે. આ કયા સંચાલકીય કાર્યના અભાવને લીધે છે?",
      options: ["આયોજન (Planning)", "સંકલન (Coordination)", "અંકુશ (Controlling)", "નાણાકીય સંચાલન"],
      correct: 1,
      explanation: "બંને વચ્ચે તાલમેલ કે સુમેળ ન હોવાથી આ બન્યું, જે સંકલનનો અભાવ દર્શાવે છે."
    },
    {
      question: "પેજ ૧૨ મુજબ, કાવ્યા પોતાની લારી ચલાવવા માટે રોજ સાંજે નફામાંથી કેટલો ભાગ બચાવવો અને કઈ બેંકમાં વ્યાજે મુકવો તેનું પ્લાનિંગ કરે છે. આ કયું સંચાલન ક્ષેત્ર છે?",
      options: ["માર્કેટિંગ સંચાલન", "ઉત્પાદન સંચાલન", "નાણાકીય સંચાલન", "માનવ સંસાધન સંચાલન"],
      correct: 2,
      explanation: "નાણાં મેળવવા, તેનો ઉપયોગ કરવો અને આવકની વહેંચણી કરવી એ નાણાકીય સંચાલન છે."
    },
    {
      question: "ડો. જ્યોર્જ ટેરીના જણાવ્યા મુજબ, સંચાલનમાં જો કર્મચારીઓ ન હોય તો ધંધાકીય એકમ કેવું દેખાશે?",
      options: ["નફાકારક મશીન જેવું", "આત્મા વગરના હાડપિંજર જેવું", "કળા વગરના વિજ્ઞાન જેવું", "અંકુશ વગરના સૂર્ય જેવું"],
      correct: 1,
      explanation: "પેજ ૯ મુજબ: 'કર્મચારીઓ વિનાનું એકમ એ આત્મા વિનાના હાડપિંજર જેવું છે.'"
    },
    {
      question: "મસાલામાં પાણી અને ચણાનું માપ કેટલું રાખવું તે ચોક્કસ વૈજ્ઞાનિક પદ્ધતિથી થાય છે, પરંતુ તેને સ્મિત સાથે પીરસવું કઈ રીતે થાય છે?",
      options: ["સંચાલન એક વિજ્ઞાન તરીકે", "સંચાલન એક કળા તરીકે", "સંચાલન એક વ્યવસાય તરીકે", "ઉત્પાદન સંચાલન તરીકે"],
      correct: 1,
      explanation: "જ્ઞાનનો વ્યવહારિક ઉપયોગ કરવો એ કળા (Art) છે."
    },
    {
      question: "પેજ ૧૨ મુજબ, લારી માટે સવારે બજારમાંથી ગુણવત્તાવાળા કાચા બટાકાની ખરીદી કરવી અને સાચી કિંમતે પાણીપુરી બનાવવાની પ્રોસેસ નક્કી કરવી એ શામાં આવે છે?",
      options: ["માનવ સંસાધન સંચાલન", "નાણાકીય સંચાલન", "ઉત્પાદન સંચાલન", "માર્કેટિંગ સંચાલન"],
      correct: 2,
      explanation: "કાચા માલ પર પ્રક્રિયા કરીને ગ્રાહક ઉપયોગી બનાવવું એ ઉત્પાદન સંચાલન છે."
    }
  ],
  currentMcqIndex: 0
};

// Start Assessment Setup
document.getElementById('btn-start-assess').onclick = startAssessment;

function startAssessment() {
  // Clear any existing active speech
  stopSpeech();

  // Reset variables
  assessState.score = 0;
  assessState.currentPhase = 1;
  assessState.secondsLeft = 180;
  assessState.currentSwipeIndex = 0;
  assessState.currentDragIndex = 0;
  assessState.currentPyramidIndex = 0;
  assessState.currentMcqIndex = 0;

  // Toggle views
  document.getElementById('assess-intro-screen').classList.add('hidden');
  document.getElementById('assess-results-screen').classList.add('hidden');
  document.getElementById('assess-active-screen').classList.remove('hidden');

  // Start timer
  updateTimerUI();
  assessState.timerInterval = setInterval(() => {
    assessState.secondsLeft--;
    updateTimerUI();
    if (assessState.secondsLeft <= 0) {
      endAssessment();
    }
  }, 1000);

  loadPhase(1);
}

function updateTimerUI() {
  const min = Math.floor(assessState.secondsLeft / 60);
  const sec = assessState.secondsLeft % 60;
  const timeStr = `સમય: ${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  document.getElementById('assess-timer').innerText = timeStr;
}

function resetAssessmentState() {
  if (assessState.timerInterval) {
    clearInterval(assessState.timerInterval);
    assessState.timerInterval = null;
  }
}

// Phase router
function loadPhase(phaseNum) {
  assessState.currentPhase = phaseNum;
  document.getElementById('assess-progress').innerText = `તબક્કો ${phaseNum}/૪`;

  // Hide all phase workspaces
  document.getElementById('phase-swipe-workspace').classList.add('hidden');
  document.getElementById('phase-drag-workspace').classList.add('hidden');
  document.getElementById('phase-pyramid-workspace').classList.add('hidden');
  document.getElementById('phase-mcq-workspace').classList.add('hidden');

  if (phaseNum === 1) {
    document.getElementById('phase-swipe-workspace').classList.remove('hidden');
    loadSwipeCard();
  } else if (phaseNum === 2) {
    document.getElementById('phase-drag-workspace').classList.remove('hidden');
    loadDragItem();
  } else if (phaseNum === 3) {
    document.getElementById('phase-pyramid-workspace').classList.remove('hidden');
    loadPyramidItem();
  } else if (phaseNum === 4) {
    document.getElementById('phase-mcq-workspace').classList.remove('hidden');
    loadMcqQuestion();
  }
}

// ------------------------------------------
// PHASE 1: TINDER SWIPE GESTURES
// ------------------------------------------
function loadSwipeCard() {
  const idx = assessState.currentSwipeIndex;
  const container = document.getElementById('tinder-card-container');
  container.innerHTML = '';

  if (idx >= assessState.swipeCards.length) {
    loadPhase(2);
    return;
  }

  const cardData = assessState.swipeCards[idx];
  const card = document.createElement('div');
  card.className = 'tinder-card glass';
  card.innerHTML = `<p>${cardData.text}</p>`;
  container.appendChild(card);

  setupTinderSwipe(card, cardData);
}

function setupTinderSwipe(cardEl, cardData) {
  let startX = 0;
  let moveX = 0;

  const onStart = (clientX) => {
    startX = clientX;
    cardEl.style.transition = 'none';
    cardEl.style.cursor = 'grabbing';
  };

  const onMove = (clientX) => {
    moveX = clientX - startX;
    // Rotate slightly while swiping for visual appeal
    const rotate = moveX * 0.1;
    cardEl.style.transform = `translateX(${moveX}px) rotate(${rotate}deg)`;
  };

  const onEnd = () => {
    cardEl.style.cursor = 'grab';
    const swipeThreshold = 100;

    if (moveX > swipeThreshold) {
      // Swiped Right (True / સાચું)
      swipeAction(true, cardData, cardEl);
    } else if (moveX < -swipeThreshold) {
      // Swiped Left (False / ખોટું)
      swipeAction(false, cardData, cardEl);
    } else {
      // Return to center
      cardEl.style.transition = 'transform 0.2s ease';
      cardEl.style.transform = 'translateX(0px) rotate(0deg)';
    }
  };

  // Touch bindings
  cardEl.addEventListener('mousedown', (e) => onStart(e.clientX));
  document.addEventListener('mousemove', (e) => {
    if (startX !== 0) onMove(e.clientX);
  });
  document.addEventListener('mouseup', () => {
    if (startX !== 0) {
      startX = 0;
      onEnd();
    }
  });

  cardEl.addEventListener('touchstart', (e) => onStart(e.touches[0].clientX));
  cardEl.addEventListener('touchmove', (e) => onMove(e.touches[0].clientX));
  cardEl.addEventListener('touchend', () => {
    startX = 0;
    onEnd();
  });
}

function swipeAction(userChoice, cardData, cardEl) {
  const isCorrect = userChoice === cardData.isTrue;
  cardEl.style.transition = 'transform 0.3s ease-out';
  cardEl.style.transform = `translateX(${userChoice ? 400 : -400}px) rotate(${userChoice ? 45 : -45}deg)`;
  cardEl.style.opacity = '0';

  setTimeout(() => {
    if (isCorrect) {
      assessState.score += 1;
      assessState.currentSwipeIndex++;
      loadSwipeCard();
    } else {
      showFeedbackModal(cardData.explanation, () => {
        assessState.currentSwipeIndex++;
        loadSwipeCard();
      });
    }
  }, 300);
}

// ------------------------------------------
// PHASE 2: DRAG & DROP POSDC
// ------------------------------------------
function loadDragItem() {
  const idx = assessState.currentDragIndex;
  const sourceContainer = document.getElementById('drag-source-container');
  sourceContainer.innerHTML = '';

  if (idx >= assessState.dragItems.length) {
    loadPhase(3);
    return;
  }

  const dragData = assessState.dragItems[idx];
  const item = document.createElement('div');
  item.className = 'drag-item';
  item.innerText = dragData.text;
  sourceContainer.appendChild(item);

  setupFunctionDrag(item, dragData);
}

function setupFunctionDrag(itemEl, dragData) {
  let startX = 0, startY = 0;
  let initLeft = 0, initTop = 0;
  let isDragging = false;

  const onStart = (clientX, clientY) => {
    isDragging = true;
    startX = clientX;
    startY = clientY;
    itemEl.style.transition = 'none';
    itemEl.style.zIndex = '50';
    itemEl.style.position = 'relative';
  };

  const onMove = (clientX, clientY) => {
    if (!isDragging) return;
    const dx = clientX - startX;
    const dy = clientY - startY;
    itemEl.style.transform = `translate(${dx}px, ${dy}px)`;
    
    // Check overlap hover styles
    checkDragHover(itemEl);
  };

  const onEnd = () => {
    if (!isDragging) return;
    isDragging = false;
    
    document.querySelectorAll('.drop-bin').forEach(bin => bin.classList.remove('hover'));

    const collidedBin = checkDragCollision(itemEl);
    if (collidedBin) {
      const correctFunc = dragData.func;
      if (collidedBin === correctFunc) {
        // Correct drop
        assessState.score += 1;
        assessState.currentDragIndex++;
        loadDragItem();
      } else {
        // Incorrect drop
        showFeedbackModal(dragData.explanation, () => {
          assessState.currentDragIndex++;
          loadDragItem();
        });
      }
    } else {
      // Reset position
      itemEl.style.transition = 'transform 0.2s';
      itemEl.style.transform = 'translate(0px, 0px)';
    }
  };

  // Bind mouse/touch
  itemEl.addEventListener('mousedown', (e) => onStart(e.clientX, e.clientY));
  document.addEventListener('mousemove', (e) => onMove(e.clientX, e.clientY));
  document.addEventListener('mouseup', onEnd);

  itemEl.addEventListener('touchstart', (e) => {
    const t = e.touches[0];
    onStart(t.clientX, t.clientY);
  });
  itemEl.addEventListener('touchmove', (e) => {
    const t = e.touches[0];
    onMove(t.clientX, t.clientY);
  });
  itemEl.addEventListener('touchend', onEnd);
}

function checkDragHover(itemEl) {
  const collidedFunc = checkDragCollision(itemEl);
  document.querySelectorAll('.drop-bin').forEach(bin => {
    if (bin.dataset.func === collidedFunc) {
      bin.classList.add('hover');
    } else {
      bin.classList.remove('hover');
    }
  });
}

function checkDragCollision(itemEl) {
  const itemRect = itemEl.getBoundingClientRect();
  const bins = document.querySelectorAll('.drop-bin');
  
  for (let i = 0; i < bins.length; i++) {
    const binRect = bins[i].getBoundingClientRect();
    if (!(itemRect.right < binRect.left || 
          itemRect.left > binRect.right || 
          itemRect.bottom < binRect.top || 
          itemRect.top > binRect.bottom)) {
      return bins[i].dataset.func;
    }
  }
  return null;
}

// ------------------------------------------
// PHASE 3: LEVEL HIERARCHY PYRAMID
// ------------------------------------------
function loadPyramidItem() {
  const idx = assessState.currentPyramidIndex;
  const container = document.getElementById('pyramid-source-container');
  container.innerHTML = '';

  // Clear previous placed items in levels
  if (idx === 0) {
    document.querySelectorAll('.pyramid-slots').forEach(el => el.innerHTML = '');
  }

  if (idx >= assessState.pyramidRoles.length) {
    loadPhase(4);
    return;
  }

  const roleData = assessState.pyramidRoles[idx];
  const item = document.createElement('div');
  item.className = 'pyramid-drag-card glass';
  item.innerText = roleData.name;
  container.appendChild(item);

  setupPyramidDrag(item, roleData);
}

function setupPyramidDrag(itemEl, roleData) {
  let startX = 0, startY = 0;
  let isDragging = false;

  const onStart = (clientX, clientY) => {
    isDragging = true;
    startX = clientX;
    startY = clientY;
    itemEl.style.zIndex = '50';
    itemEl.style.position = 'relative';
  };

  const onMove = (clientX, clientY) => {
    if (!isDragging) return;
    const dx = clientX - startX;
    const dy = clientY - startY;
    itemEl.style.transform = `translate(${dx}px, ${dy}px)`;
    
    // Highlight hovered levels
    checkPyramidHover(itemEl);
  };

  const onEnd = () => {
    if (!isDragging) return;
    isDragging = false;

    document.querySelectorAll('.pyramid-level').forEach(p => p.classList.remove('hover'));

    const collidedLevel = checkPyramidCollision(itemEl);
    if (collidedLevel) {
      if (collidedLevel === roleData.level) {
        // Success
        assessState.score += 1;
        
        // Render element inside the pyramid tier visually
        const slot = document.querySelector(`#pyramid-${collidedLevel} .pyramid-slots`);
        if (slot) {
          const placed = document.createElement('span');
          placed.className = 'pyramid-placed-item';
          placed.innerText = roleData.name.split(' ')[0]; // small label
          slot.appendChild(placed);
        }

        assessState.currentPyramidIndex++;
        loadPyramidItem();
      } else {
        // Failure
        showFeedbackModal(roleData.explanation, () => {
          assessState.currentPyramidIndex++;
          loadPyramidItem();
        });
      }
    } else {
      itemEl.style.transform = 'translate(0px,0px)';
    }
  };

  itemEl.addEventListener('mousedown', (e) => onStart(e.clientX, e.clientY));
  document.addEventListener('mousemove', (e) => onMove(e.clientX, e.clientY));
  document.addEventListener('mouseup', onEnd);

  itemEl.addEventListener('touchstart', (e) => {
    const t = e.touches[0];
    onStart(t.clientX, t.clientY);
  });
  itemEl.addEventListener('touchmove', (e) => {
    const t = e.touches[0];
    onMove(t.clientX, t.clientY);
  });
  itemEl.addEventListener('touchend', onEnd);
}

function checkPyramidHover(itemEl) {
  const collidedLevel = checkPyramidCollision(itemEl);
  document.querySelectorAll('.pyramid-level').forEach(el => {
    if (el.id.replace('pyramid-', '') === collidedLevel) {
      el.classList.add('hover');
    } else {
      el.classList.remove('hover');
    }
  });
}

function checkPyramidCollision(itemEl) {
  const itemRect = itemEl.getBoundingClientRect();
  const levels = ['top', 'middle', 'bottom'];
  
  for (let i = 0; i < levels.length; i++) {
    const levelEl = document.getElementById(`pyramid-${levels[i]}`);
    const levelRect = levelEl.getBoundingClientRect();
    if (!(itemRect.right < levelRect.left || 
          itemRect.left > levelRect.right || 
          itemRect.bottom < levelRect.top || 
          itemRect.top > levelRect.bottom)) {
      return levels[i];
    }
  }
  return null;
}

// ------------------------------------------
// PHASE 4: CASE STUDY MCQS
// ------------------------------------------
function loadMcqQuestion() {
  const idx = assessState.currentMcqIndex;
  if (idx >= assessState.mcqs.length) {
    endAssessment();
    return;
  }

  const mcqData = assessState.mcqs[idx];
  document.getElementById('mcq-question-text').innerText = mcqData.question;
  
  const grid = document.getElementById('mcq-options-grid');
  grid.innerHTML = '';

  mcqData.options.forEach((opt, oIdx) => {
    const btn = document.createElement('button');
    btn.className = 'btn-option';
    btn.innerText = opt;
    btn.onclick = () => submitMcqAnswer(oIdx, mcqData);
    grid.appendChild(btn);
  });
}

function submitMcqAnswer(chosenIdx, mcqData) {
  const isCorrect = chosenIdx === mcqData.correct;
  if (isCorrect) {
    assessState.score += 2; // 2 marks each
    assessState.currentMcqIndex++;
    loadMcqQuestion();
  } else {
    showFeedbackModal(mcqData.explanation, () => {
      assessState.currentMcqIndex++;
      loadMcqQuestion();
    });
  }
}

// ------------------------------------------
// MICRO-EXPLANATION MODAL ACTIONS
// ------------------------------------------
let feedbackCallback = null;
function showFeedbackModal(text, onNext) {
  feedbackCallback = onNext;
  document.getElementById('feedback-explanation').innerText = text;
  document.getElementById('assess-feedback-overlay').classList.remove('hidden');
}

document.getElementById('btn-feedback-next').onclick = () => {
  document.getElementById('assess-feedback-overlay').classList.add('hidden');
  if (feedbackCallback) {
    feedbackCallback();
  }
};

// End Assessment and write High Score
function endAssessment() {
  clearInterval(assessState.timerInterval);
  assessState.timerInterval = null;

  document.getElementById('assess-active-screen').classList.add('hidden');
  document.getElementById('assess-results-screen').classList.remove('hidden');

  document.getElementById('final-score-num').innerText = assessState.score;

  // Local storage management
  if (assessState.score > state.highScore) {
    state.highScore = assessState.score;
    localStorage.setItem('assessHighScore', state.highScore);
    updateProgressStats();
  }

  // Set response comments in Gujarati
  const commentEl = document.getElementById('results-comment');
  if (assessState.score === 25) {
    commentEl.innerText = "અદ્ભુત! તમે ૨૫ માંથી ૨૫ મેળવીને સંચાલન સમ્રાટ બન્યા છો!";
  } else if (assessState.score >= 18) {
    commentEl.innerText = "ખૂબ જ સરસ! તમે બોર્ડ એક્ઝામ પાસ કરવા માટે તૈયાર છો!";
  } else if (assessState.score >= 10) {
    commentEl.innerText = "સુધારો કરવા જેવો છે! જ્ઞાન વૃક્ષ ફરીથી ભણો અને પ્રેક્ટિકલ પ્રવૃત્તિઓ જુઓ.";
  } else {
    commentEl.innerText = "નબળો પ્રયત્ન! ફરી મહેનત કરો.";
  }
}

document.getElementById('btn-assess-retry').onclick = startAssessment;
