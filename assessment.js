// --- 25-MARK ACTIVE RECALL ASSESSMENT ENGINE ---

const assessState = {
  rawScore: 0,
  maxRawScore: 42, // Phase 1: 10, Phase 2: 8, Phase 3: 8, Phase 4: 16 (8 MCQs * 2)
  currentPhase: 1, // 1 to 4
  secondsLeft: 180, // 3 minutes total
  timerInterval: null,
  
  // Phase 1: Tinder Swipe (10 Cards)
  swipeCards: [
    { text: "સંચાલન એ માત્ર વિજ્ઞાન છે, તેમાં વ્યવહારિક કળાની કોઈ જરૂર નથી.", isTrue: false, explanation: "સંચાલન વિજ્ઞાન અને કળા બંને છે. નિયમો સમજવા એ વિજ્ઞાન છે, પણ લારી પર પાણીપુરી પ્રેમથી પીરસવી એ કળા છે!" },
    { text: "અંકુશ (Controlling) એ સંચાલનનું અંતિમ કાર્ય છે.", isTrue: true, explanation: "સાચું! આયોજન એ પ્રથમ કાર્ય છે અને અંકુશ એ છેલ્લું કાર્ય છે, જે ભૂલો સુધારે છે." },
    { text: "મધ્ય સપાટી સંચાલન એ મુખ્ય નીતિ-ઘડતરની સપાટી છે.", isTrue: false, explanation: "ખોટું! મુખ્ય નીતિ-ઘડતર ઉચ્ચ સપાટી સંચાલન (માલિક/જનરલ મેનેજર) દ્વારા થાય છે." },
    { text: "સંકલન (Coordination) ને સંચાલનનો આત્મા કહેવામાં આવે છે.", isTrue: true, explanation: "સાચું! સંકલન વિના દરેક વિભાગો વચ્ચે સુમેળ સધાતો નથી, તેથી તેને સંચાલનનો આત્મા કહે છે." },
    { text: "નાણું એ ધંધાકીય એકમનું જીવનદાતા રક્ત સમાન છે.", isTrue: true, explanation: "સાચું! પેજ ૧૨ નાણાકીય સંચાલન મુજબ, નાણાં વગર ધંધાની સ્થાપના કે ચલણ અશક્ય છે." },
    { text: "તળ સપાટી સંચાલનને કાર્યકારી અથવા ઓપરેશનલ સપાટી પણ કહેવામાં આવે છે.", isTrue: true, explanation: "સાચું! પેજ ૬ મુજબ, તળ સપાટીએ જ બધા ઓપરેશનલ નિર્ણયો અને રોજિંદા કામો થાય છે." },
    { text: "સંચાલન એ સર્વવ્યાપી પ્રવૃત્તિ નથી, તે માત્ર ખાનગી કંપનીઓમાં જ જોવા મળે છે.", isTrue: false, explanation: "ખોટું! સંચાલન ધાર્મિક, લશ્કરી, સામાજિક અને રાજકીય એમ દરેક ક્ષેત્રમાં સર્વવ્યાપી છે." },
    { text: "માર્કેટિંગ મિક્સમાં ૪ Ps (Product, Price, Place, Promotion) નો સમાવેશ થાય છે.", isTrue: true, explanation: "સાચું! પેજ ૧૦ મુજબ, માર્કેટિંગમાં પેદાશ, કિંમત, વિતરણ અને અભિવૃદ્ધિ એ ૪ સ્તંભ છે." },
    { text: "સંચાલન એક વ્યવસાય નથી કારણ કે તેમાં કોઈ ચોક્કસ આચારસંહિતા હોતી નથી.", isTrue: false, explanation: "ખોટું! પેજ ૪ મુજબ, સંચાલન એક ઉભરતો વ્યવસાય છે જેમાં નૈતિક આચારસંહિતા પાળવી જરૂરી બને છે." },
    { text: "નાણાકીય સંચાલનમાં માત્ર પૈસા બચાવવાના જ નિર્ણયો લેવામાં આવે છે.", isTrue: false, explanation: "ખોટું! પેજ ૧૨ મુજબ, નાણાકીય સંચાલન મૂડી મેળવવા, તેનો યોગ્ય ઉપયોગ કરવા અને ડિવિડન્ડ વહેંચવા સંબંધિત છે." }
  ],
  currentSwipeIndex: 0,

  // Phase 2: Drag and Drop Functions (8 Items)
  dragItems: [
    { text: "આગામી રવિવારની રોડ ટ્રીપ માટે કયા રસ્તે જવું તે અગાઉથી નક્કી કરવું", func: "planning", explanation: "પહેલાથી શું કરવું તે નક્કી કરવું એટલે 'આયોજન' (Planning)." },
    { text: "પ્રવાસ માટે કોણ ભાડું ઉઘરાવશે અને કોણ સામાન મુકશે તેની સત્તા સોંપવી", func: "organizing", explanation: "કામ અને જવાબદારીઓની વહેંચણી કરવી એટલે 'વ્યવસ્થાતંત્ર' (Organizing)." },
    { text: "લાંબી મુસાફરી માટે સારો ડ્રાઈવર પગાર પર રાખવો", func: "staffing", explanation: "લાયક માણસોની ભરતી અને નિમણૂક એટલે 'કર્મચારી વ્યવસ્થા' (Staffing)." },
    { text: "નવા હેલ્પરને કયા ગ્રાહકને કેવી રીતે પ્લેટ આપવી તેની સતત સૂચના આપવી", func: "directing", explanation: "કર્મચારીઓને માર્ગદર્શન આપવું અને દેખરેખ રાખવી એટલે 'દોરવણી' (Directing)." },
    { text: "બજેટ કરતા વધુ ખર્ચ ન થાય તે માટે રોજિંદા ગલ્લાની ચકાસણી કરવી", func: "controlling", explanation: "નક્કી કરેલા માપદંડ સાથે વાસ્તવિક કામ સરખાવી ભૂલો સુધારવી એટલે 'અંકુશ' (Controlling)." },
    { text: "પાણીપુરીની નવી લારી ચાલુ કરવા માટે ભવિષ્યની રૂપરેખા તૈયાર કરવી", func: "planning", explanation: "ધંધાના ધ્યેયો મેળવવા અગાઉથી માર્ગ તૈયાર કરવો તે આયોજન (Planning) છે." },
    { text: "દરેક હેલ્પરના કામનું ભારણ જોઈને તેમને કાર્યોની વહેંચણી કરવી", func: "organizing", explanation: "અધિકારો અને ફરજોની વહેંચણી કરવી એ વ્યવસ્થાતંત્ર (Organizing) નું કાર્ય છે." },
    { text: "તમામ કૂક્સ સમયસર રસોડામાં આવે છે કે નહીં તેની સતત દેખરેખ રાખવી", func: "controlling", explanation: "કામનું મોનિટરિંગ કરવું અને ધોરણો ચકાસવા એ અંકુશ (Controlling) છે." }
  ],
  currentDragIndex: 0,

  // Phase 3: Pyramid Matching (8 Items)
  pyramidRoles: [
    { name: "રેસ્ટોરન્ટના માલિક (Owner)", level: "top", explanation: "માલિક ઉચ્ચ સપાટી પર આવે છે જે આખા એકમના ધ્યેયો નક્કી કરે છે." },
    { name: "કિચન હેડ શેફ (Chef Manager)", level: "middle", explanation: "હેડ શેફ કે વિભાગીય મેનેજર્સ મધ્ય સપાટી પર આવે છે." },
    { name: "પીરસનાર / વેઇટર", level: "bottom", explanation: "નિરીક્ષકો, જોબર્સ, અને કામદારો તળ સપાટી પર રહીને રોજનું ઓપરેશનલ કામ કરે છે." },
    { name: "જનરલ મેનેજર (GM)", level: "top", explanation: "જનરલ મેનેજર પણ ઉચ્ચ સપાટી સંચાલનનો ભાગ છે જે નીતિ નક્કી કરે છે." },
    { name: "સફાઈ કામદાર / હેલ્પર", level: "bottom", explanation: "હેલ્પર તળ સપાટી (ઓપરેશનલ લેવલ) પર રહીને લારી ચલાવવામાં મદદ કરે છે." },
    { name: "ખરીદ વિભાગના અધિકારી (Purchase Manager)", level: "middle", explanation: "ખરીદ અધિકારીઓ મધ્ય સપાટી (વિભાગીય સ્તર) ના સંચાલકો છે." },
    { name: "નાણાકીય અધિકારી (Finance Manager)", level: "middle", explanation: "નાણાકીય કે વેચાણ અધિકારીઓ મધ્ય સપાટી પર રહી વિભાગો સંભાળે છે." },
    { name: "રસોડાના સુપરવાઈઝર (Kitchen Supervisor)", level: "bottom", explanation: "સુપરવાઈઝર્સ તળ સપાટી (નિરીક્ષક સ્તર) નો ભાગ છે જે કામદારો પર વોચ રાખે છે." }
  ],
  currentPyramidIndex: 0,

  // Phase 4: Case Study MCQs (8 Questions, 2 Marks each)
  mcqs: [
    {
      question: "તમારી લારી પર રસોઈ બનાવનાર ચણા બાફવાનું ભૂલી જાય છે અને વેઇટર બૂમો પાડે છે કારણ કે ગ્રાહકો રાહ જુએ છે. આ કયા સંચાલકીય કાર્યના અભાવને લીધે છે?",
      options: ["આયોજન (Planning)", "સંકલન (Coordination)", "અંકુશ (Controlling)", "નાણાકીય સંચાલન"],
      correct: 1,
      explanation: "બંને વચ્ચે તાલમેલ કે સુમેળ ન હોવાથી આ બન્યું, જે સંકલન (Coordination) નો અભાવ દર્શાવે છે."
    },
    {
      question: "પેજ ૧૨ મુજબ, કાવ્યા પોતાની લારી ચલાવવા માટે રોજ સાંજે નફામાંથી કેટલો ભાગ બચાવવો અને કઈ બેંકમાં વ્યાજે મુકવો તેનું પ્લાનિંગ કરે છે. આ કયું સંચાલન ક્ષેત્ર છે?",
      options: ["માર્કેટિંગ સંચાલન", "ઉત્પાદન સંચાલન", "નાણાકીય સંચાલન", "માનવ સંસાધન સંચાલન"],
      correct: 2,
      explanation: "નાણાં મેળવવા, તેનો ઉપયોગ કરવો અને આવકની વહેંચણી કરવી એ નાણાકીય સંચાલન (Financial Management) છે."
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
      explanation: "જ્ઞાનનો વ્યવહારિક ઉપયોગ કરવો એ સંચાલનની કળા (Art of Management) છે."
    },
    {
      question: "પેજ ૧૨ મુજબ, લારી માટે સવારે બજારમાંથી ગુણવત્તાવાળા કાચા બટાકાની ખરીદી કરવી અને સાચી કિંમતે પાણીપુરી બનાવવાની પ્રોસેસ નક્કી કરવી એ શામાં આવે છે?",
      options: ["માનવ સંસાધન સંચાલન", "નાણાકીય સંચાલન", "ઉત્પાદન સંચાલન", "માર્કેટિંગ સંચાલન"],
      correct: 2,
      explanation: "કાચા માલ પર પ્રક્રિયા કરીને ગ્રાહક ઉપયોગી બનાવવું એ ઉત્પાદન સંચાલન (Production Management) છે."
    },
    {
      question: "રેસ્ટોરન્ટના પ્રોડક્શન શેફ અને માર્કેટિંગ એક્ઝિક્યુટિવ વચ્ચે ચટણી બગાડ બાબતે ઝઘડો થાય છે. સંચાલનનું કયું કાર્ય આ વિસંવાદિતા દૂર કરીને સુમેળ સ્થાપશે?",
      options: ["સંકલન (Coordination)", "કર્મચારી વ્યવસ્થા", "બજેટિંગ", "આયોજન"],
      correct: 0,
      explanation: "એકમના અલગ વિભાગો વચ્ચે સુમેળ અને તાલમેલ સાધવાનું કામ સંકલન (Coordination) નું છે."
    },
    {
      question: "નવા ગ્રાહકોને ખેંચવા માટે દિવાળી સેલ નક્કી કરવો, પેદાશનો ભાવ સેટ કરવો, અને કસ્ટમર ડિલિવરી સેટ કરવી એ શામાં આવે છે?",
      options: ["નાણાકીય સંચાલન", "ઉત્પાદન સંચાલન", "માનવ સંસાધન સંચાલન", "માર્કેટિંગ સંચાલન"],
      correct: 3,
      explanation: "માર્કેટિંગ મિક્સ (પેદાશ, કિંમત, વિતરણ, અભિવૃદ્ધિ) નક્કી કરવા એ માર્કેટિંગ સંચાલનનો ભાગ છે."
    },
    {
      question: "રેસ્ટોરન્ટના બોર્ડ ઓફ ડિરેક્ટર્સ કે જનરલ મેનેજર કે જેઓ એકમની નીતિઓ નક્કી કરે છે, તેઓ કઈ સપાટીમાં કાર્યરત ગણાય?",
      options: ["ઉચ્ચ સપાટી સંચાલન", "મધ્ય સપાટી સંચાલન", "તળ સપાટી સંચાલન", "વિભાગીય સપાટી"],
      correct: 0,
      explanation: "નીતિ ઘડતર અને ધ્યેય નિર્ધારણનું કાર્ય સર્વોચ્ચ સત્તા ધરાવતી ઉચ્ચ સપાટી સંચાલન (Top Level Management) માં થાય છે."
    }
  ],
  currentMcqIndex: 0
};

// Start Assessment Setup
document.getElementById('btn-start-assess').onclick = startAssessment;

function startAssessment() {
  stopSpeech();

  assessState.rawScore = 0;
  assessState.currentPhase = 1;
  assessState.secondsLeft = 180;
  assessState.currentSwipeIndex = 0;
  assessState.currentDragIndex = 0;
  assessState.currentPyramidIndex = 0;
  assessState.currentMcqIndex = 0;

  document.getElementById('assess-intro-screen').classList.add('hidden');
  document.getElementById('assess-results-screen').classList.add('hidden');
  document.getElementById('assess-active-screen').classList.remove('hidden');

  updateTimerUI();
  assessState.timerInterval = setInterval(() => {
    assessState.secondsLeft--;
    updateTimerUI();
    if (assessState.secondsLeft <= 0) {
      endAssessment();
    }
  }, 1000);

  triggerPhaseStart(1);
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

// ------------------------------------------
// PHASE MODAL INSTRUCTIONS POPUPS
// ------------------------------------------
function triggerPhaseStart(phaseNum) {
  assessState.currentPhase = phaseNum;

  // Clear workspace before showing popup to prevent screen leakage
  document.getElementById('phase-swipe-workspace').classList.add('hidden');
  document.getElementById('phase-drag-workspace').classList.add('hidden');
  document.getElementById('phase-pyramid-workspace').classList.add('hidden');
  document.getElementById('phase-mcq-workspace').classList.add('hidden');

  let title = "";
  let points = [];

  if (phaseNum === 1) {
    title = "તબક્કો ૧: ટિન્ડર સ્વાઇપ પત્રકો (True/False)";
    points = [
      "૧. સ્ક્રીન પર આવેલા સંચાલન સંબંધિત વિધાનને કાળજીપૂર્વક વાંચો.",
      "૨. જો વિધાન સાચું હોય, તો તેને જમણી તરફ (Right Swipe) ખેંચો.",
      "૩. જો વિધાન ખોટું હોય, તો તેને ડાબી તરફ (Left Swipe) ખેંચો.",
      "૪. કુલ ૧૦ પ્રશ્નો આવશે. દરેક સાચા જવાબ માટે માર્ક મળશે."
    ];
  } else if (phaseNum === 2) {
    title = "તબક્કો ૨: કાર્યોનું વર્ગીકરણ (Drag & Drop)";
    points = [
      "૧. મધ્યમાં લંબચોરસ પટ્ટી પર સાતારા પ્રવાસ અથવા પાણીપુરી લારીનું કાર્ય આવશે.",
      "૨. તેને નીચે આપેલા યોગ્ય ૫ સંચાલકીય કાર્યોના બોક્સમાં ખેંચો.",
      "૩. બોક્સ: આયોજન, વ્યવસ્થાતંત્ર, કર્મચારી, દોરવણી, અંકુશ.",
      "૪. કુલ ૮ પ્રશ્નો આવશે. સાચા પ્લેસમેન્ટ પર માર્ક મળશે."
    ];
  } else if (phaseNum === 3) {
    title = "તબક્કો ૩: સંચાલન પિરામિડ (Pyramid Levels)";
    points = [
      "૧. રેસ્ટોરન્ટ કે ધંધાના જુદા જુદા હોદ્દાઓ પટ્ટી તરીકે આવશે.",
      "૨. તેને પિરામિડના યોગ્ય ૩ સ્તરોમાં ગોઠવો.",
      "૩. સ્તરો: ઉચ્ચ સપાટી (માલિક), મધ્ય સપાટી (મેનેજર), તળ સપાટી (સુપરવાઈઝર/હેલ્પર).",
      "૪. કુલ ૮ હોદ્દાઓ છે. સાચી સપાટી પર ગોઠવો."
    ];
  } else if (phaseNum === 4) {
    title = "તબક્કો ૪: વ્યવહારુ કેસ સ્ટડીઝ (MCQ Quiz)";
    points = [
      "૧. રેસ્ટોરન્ટ અને લારી ચલાવવાના વાસ્તવિક કોયડા આવશે.",
      "૨. ધોરણ ૧૨ ના પુસ્તક મુજબ ૪ વિકલ્પોમાંથી સાચો વિકલ્પ પસંદ કરો.",
      "૩. કુલ ૮ પ્રશ્નો છે. દરેક સાચા ઉત્તર માટે ૨ માર્ક્સ મળશે."
    ];
  }

  showInstructionModal(title, points, () => {
    // Ok callback: Load Phase
    loadPhase(phaseNum);
  });
}

function loadPhase(phaseNum) {
  assessState.currentPhase = phaseNum;
  document.getElementById('assess-progress').innerText = `તબક્કો ${phaseNum}/૪`;

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
// PHASE 1: TINDER SWIPE
// ------------------------------------------
function loadSwipeCard() {
  const idx = assessState.currentSwipeIndex;
  const container = document.getElementById('tinder-card-container');
  container.innerHTML = '';

  if (idx >= assessState.swipeCards.length) {
    triggerPhaseStart(2);
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
    const rotate = moveX * 0.1;
    cardEl.style.transform = `translateX(${moveX}px) rotate(${rotate}deg)`;
  };

  const onEnd = () => {
    cardEl.style.cursor = 'grab';
    const swipeThreshold = 100;

    if (moveX > swipeThreshold) {
      swipeAction(true, cardData, cardEl);
    } else if (moveX < -swipeThreshold) {
      swipeAction(false, cardData, cardEl);
    } else {
      cardEl.style.transition = 'transform 0.2s ease';
      cardEl.style.transform = 'translateX(0px) rotate(0deg)';
    }
  };

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
      assessState.rawScore += 1;
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
    triggerPhaseStart(3);
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
        assessState.rawScore += 1;
        assessState.currentDragIndex++;
        loadDragItem();
      } else {
        showFeedbackModal(dragData.explanation, () => {
          assessState.currentDragIndex++;
          loadDragItem();
        });
      }
    } else {
      itemEl.style.transition = 'transform 0.2s';
      itemEl.style.transform = 'translate(0px, 0px)';
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

  if (idx === 0) {
    document.querySelectorAll('.pyramid-slots').forEach(el => el.innerHTML = '');
  }

  if (idx >= assessState.pyramidRoles.length) {
    triggerPhaseStart(4);
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
    checkPyramidHover(itemEl);
  };

  const onEnd = () => {
    if (!isDragging) return;
    isDragging = false;

    document.querySelectorAll('.pyramid-level').forEach(p => p.classList.remove('hover'));

    const collidedLevel = checkPyramidCollision(itemEl);
    if (collidedLevel) {
      if (collidedLevel === roleData.level) {
        assessState.rawScore += 1;
        
        const slot = document.querySelector(`#pyramid-${collidedLevel} .pyramid-slots`);
        if (slot) {
          const placed = document.createElement('span');
          placed.className = 'pyramid-placed-item';
          placed.innerText = roleData.name.split(' ')[0];
          slot.appendChild(placed);
        }

        assessState.currentPyramidIndex++;
        loadPyramidItem();
      } else {
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
    assessState.rawScore += 2; // MCQs are 2 marks each
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

// End Assessment and write High Score (scale score to 25 marks)
function endAssessment() {
  clearInterval(assessState.timerInterval);
  assessState.timerInterval = null;

  document.getElementById('assess-active-screen').classList.add('hidden');
  document.getElementById('assess-results-screen').classList.remove('hidden');

  // Scale rawScore out of 42 to normalized score out of 25
  const normalizedScore = Math.round((assessState.rawScore / assessState.maxRawScore) * 25);
  document.getElementById('final-score-num').innerText = normalizedScore;

  if (normalizedScore > state.highScore) {
    state.highScore = normalizedScore;
    localStorage.setItem('assessHighScore', state.highScore);
    updateProgressStats();
  }

  const commentEl = document.getElementById('results-comment');
  if (normalizedScore === 25) {
    commentEl.innerText = "અદ્ભુત! તમે ૨૫ માંથી ૨૫ મેળવીને સંચાલન સમ્રાટ બન્યા છો!";
  } else if (normalizedScore >= 18) {
    commentEl.innerText = "ખૂબ જ સરસ! તમે બોર્ડ એક્ઝામ પાસ કરવા માટે તૈયાર છો!";
  } else if (normalizedScore >= 10) {
    commentEl.innerText = "સુધારો કરવા જેવો છે! જ્ઞાન વૃક્ષ ફરીથી ભણો અને પ્રેક્ટિકલ પ્રવૃત્તિઓ જુઓ.";
  } else {
    commentEl.innerText = "નબળો પ્રયત્ન! ફરી મહેનત કરો.";
  }
}

document.getElementById('btn-assess-retry').onclick = startAssessment;
