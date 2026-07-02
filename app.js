// Global App State
const state = {
  activeView: 'view-dashboard',
  completedNodes: JSON.parse(localStorage.getItem('completedNodes')) || [],
  highScore: localStorage.getItem('assessHighScore') || 0,
  speechUtterance: null,
  speechSynth: window.speechSynthesis,
  selectedVoice: null,
  currentSpokenText: '',
  isMuted: false,
  speechRate: 1.0
};

// 1. Single Page App Navigation
function switchView(viewId) {
  // Stop any active speech when switching views
  stopSpeech();
  
  // Hide active subtitles bar
  document.getElementById('subtitles-container').classList.add('hidden');

  // Deactivate all views and nav buttons
  document.querySelectorAll('.app-view').forEach(view => view.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));

  // Activate target view
  const targetView = document.getElementById(viewId);
  if (targetView) {
    targetView.classList.add('active');
    state.activeView = viewId;
  }

  // Update navigation highlighting
  const navBtnId = viewId.replace('view-', 'nav-');
  const targetBtn = document.getElementById(navBtnId);
  if (targetBtn) {
    targetBtn.classList.add('active');
  }

  // Orchestrate games startup/shutdown
  if (viewId !== 'view-games') {
    exitGames();
  }
  
  // Orchestrate assessment shutdown
  if (viewId !== 'view-assessment') {
    resetAssessmentState();
  }
}

// 2. Knowledge Tree Dataset (Gujarati Medium Syllabus Mapping)
const knowledgeTreeData = [
  {
    id: 'node-meaning',
    topicNo: 'વિભાગ ૧.૧',
    title: 'સંચાલનનો અર્થ (George Terry & Livingston)',
    icon: '🍲',
    analogy: 'ધારો કે તમે એક પાણીપુરીની લારી શરૂ કરી. કયા સમયે બટાકા મસાલો બનાવવો, કેટલો સ્ટાફ રાખવો અને સાંજે ગલ્લા પર હિસાબ કઈ રીતે કરવો જેથી લારી નફામાં ચાલે - આ બધું આયોજનબદ્ધ રીતે મેનેજ કરવું એટલે જ સંચાલન.',
    definition: 'લિવિંગસ્ટનના મતે: "ઓછામાં ઓછા સમયે અને ખર્ચે, ઉપલબ્ધ સાધનોના શ્રેષ્ઠ ઉપયોગથી ધ્યેય સિદ્ધ કરવાની પ્રક્રિયા એટલે સંચાલન." જ્યોર્જ ટેરીના મતે: "તે માણસો, સાધનો, પદ્ધતિઓ, નાણું અને બજારનું આયોજન કરી તેના પર અંકુશ રાખવાનું કામ કરે છે જેથી નક્કી કરેલા ધ્યેયો પ્રાપ્ત થાય."',
    voiceText: 'આપણી પાણીપુરીની લારીને બરાબર સમયસર અને ઓછા ખર્ચે ચલાવીને નફો મેળવવો એ જ સંચાલન છે. લિવિંગસ્ટનના મતે ઓછામાં ઓછા સમયે અને ખર્ચે સાધનોના શ્રેષ્ઠ ઉપયોગ દ્વારા ધ્યેય મેળવવાની પ્રક્રિયા એટલે સંચાલન.'
  },
  {
    id: 'node-nature',
    topicNo: 'વિભાગ ૧.૨',
    title: 'સંચાલનનું સ્વરૂપ (Characteristics)',
    icon: '📋',
    analogy: 'પાણીપુરીની લારી કોઈ એક વ્યક્તિ એકલી નથી ચલાવી શકતી. તેમાં સાથીઓ રાખવા પડે છે (જૂથ પ્રવૃત્તિ), રોજ ધંધો કરવો પડે છે (સતત પ્રવૃત્તિ) અને ગ્રાહકો માણસો હોવાથી તેમની મનોભાવના સમજવી પડે છે (માનવીય પ્રવૃત્તિ).',
    definition: 'સંચાલનની ૭ મુખ્ય લાક્ષણિકતાઓ છે: (૧) સર્વવ્યાપી પ્રવૃત્તિ (દરેક ક્ષેત્રમાં જરૂરી), (૨) હેતુલક્ષી પ્રવૃત્તિ, (૩) જૂથ પ્રવૃત્તિ, (૪) સતત ચાલતી પ્રવૃત્તિ, (૫) માનવીય પ્રવૃત્તિ (માનવી કેન્દ્રસ્થાને છે), (૬) નિર્ણય પ્રક્રિયા, (૭) વિજ્ઞાન, કળા અને વ્યવસાય તરીકે.',
    voiceText: 'પાણીપુરીની લારી પર રોજ મસાલો બનાવવો અને ગ્રાહકોને પીરસવું એ સતત પ્રવૃત્તિ છે. સંચાલનના સ્વરૂપમાં સાત મુદ્દાઓ આવે છે: સર્વવ્યાપી, હેતુલક્ષી, જૂથ પ્રવૃત્તિ, સતત ચાલતી, માનવીય, નિર્ણય પ્રક્રિયા, અને વિજ્ઞાન કળા કે વ્યવસાય.'
  },
  {
    id: 'node-importance',
    topicNo: 'વિભાગ ૧.૩',
    title: 'સંચાલનનું મહત્વ (Importance)',
    icon: '📈',
    analogy: 'લારી માટે બટાકા અને પુરીનો બગાડ અટકાવવો (સાધનોનો ઇષ્ટતમ ઉપયોગ), નફો વધારવો જેથી કુટુંબ ખુશ થાય અને આજુબાજુના ગરીબ છોકરાને રોજગારી મળવી - આ બધું યોગ્ય મેનેજમેન્ટથી જ શક્ય બને છે.',
    definition: 'મહત્વના ૮ મુદ્દાઓ: (૧) દરેક ક્ષેત્રમાં જરૂરી, (૨) સાધનોનો ઇષ્ટતમ ઉપયોગ (બગાડ અટકે), (૩) ધ્યેયસિદ્ધિ, (૪) ધંધાની સફળતા માટે ઉપયોગી, (૫) રોજગારીની તકોમાં વધારો, (૬) નફામાં વૃદ્ધિ, (૭) સામાજિક લાભ, (૮) રાષ્ટ્રીય હેતુ.',
    voiceText: 'યોગ્ય સંચાલનથી બટાકા કે પુરીનો બગાડ અટકે છે જેને સાધનોનો ઇષ્ટતમ ઉપયોગ કહેવાય છે. સંચાલનના મહત્વમાં ધ્યેયસિદ્ધિ, સાધનોનો બચાવ, નફામાં વૃદ્ધિ, રોજગારીની તકો અને સામાજિક કે રાષ્ટ્રીય લાભ મુખ્ય છે.'
  },
  {
    id: 'node-science-art',
    topicNo: 'વિભાગ ૧.૪',
    title: 'સંચાલન: વિજ્ઞાન, કળા અને વ્યવસાય',
    icon: '🎨',
    analogy: 'પાણીપુરીના મસાલામાં મીઠું અને પાણીનું ચોક્કસ માપ હોવું તે વિજ્ઞાન છે (નિયમો). તેને ગ્રાહકને સ્મિત સાથે પ્રેમથી પીરસવું તે કળા છે. જ્યારે આખો ધંધો એક વ્યવસાયી મેનેજરની જેમ ડિગ્રી સાથે હેન્ડલ કરવો તે વ્યવસાય છે.',
    definition: 'વિજ્ઞાન એટલે નિયમો અને સિદ્ધાંતોનું સંગઠિત જ્ઞાન. કળા એટલે જ્ઞાનનો વ્યવહારિક ઉપયોગ. વ્યવસાય એટલે વિશિષ્ટ જ્ઞાન પ્રાપ્ત કરી સમાજની સેવા કરવી અને નૈતિક આચારસંહિતા પાળવી (જેમ કે ડોક્ટર, વકીલ અને સીએ).',
    voiceText: 'મસાલાની સાચી રેસીપી એ વિજ્ઞાન છે, જ્યારે પ્રેમથી પીરસવાની રીત કળા છે. સંચાલન એક વિજ્ઞાન છે કારણ કે તેમાં નિયમો છે, કળા છે કારણ કે તેમાં આવડત જોઈએ છે, અને વ્યવસાય છે કારણ કે તેમાં વિશિષ્ટ જ્ઞાન જરૂરી છે.'
  },
  {
    id: 'node-levels',
    topicNo: 'વિભાગ ૧.૫',
    title: 'સંચાલનની સપાટીઓ (Levels)',
    icon: '📐',
    analogy: 'મોટી રેસ્ટોરન્ટમાં માલિક (ઉચ્ચ સપાટી) નિર્ણયો લે છે. કિચન મેનેજર અથવા હેડ શેફ (મધ્ય સપાટી) મસાલા અને શાકભાજીની ખરીદી કરે છે. અને લાઈન કૂક્સ તથા વેઈટર (તળ સપાટી) ગ્રાહકોને પ્લેટ સર્વ કરે છે.',
    definition: 'ત્રણ સપાટીઓ: (૧) ઉચ્ચ સપાટી સંચાલન: નીતિ ઘડતર (સંચાલક મંડળ, જનરલ મેનેજર). (૨) મધ્ય સપાટી સંચાલન: વિભાગીય અધિકારીઓ (ઉત્પાદન, ખરીદ, નાણાકીય મેનેજર્સ). (૩) તળ સપાટી સંચાલન: રોજિંદું કામ (નિરીક્ષકો, જોબર, ફોરમેન).',
    voiceText: 'રેસ્ટોરન્ટનો માલિક ઉચ્ચ સપાટી પર છે, કિચન મેનેજર મધ્ય સપાટી પર છે અને વેઈટર તળ સપાટી પર છે. ઉચ્ચ સપાટી નીતિ નક્કી કરે છે, મધ્ય સપાટી હુકમો આપે છે અને તળ સપાટી તેના પર કામ કરે છે.'
  },
  {
    id: 'node-functions',
    topicNo: 'વિભાગ ૧.૬',
    title: 'સંચાલનના કાર્યો (POSDC)',
    icon: '🗺️',
    analogy: 'મિત્રો સાથે સાપુતારા પ્રવાસે જવું છે! પહેલા નક્કી કરવું કે ક્યારે જઈશું (આયોજન), કોણ ગાડી લાવશે અને કોણ સામાન ગોઠવશે (વ્યવસ્થાતંત્ર), ડ્રાઈવર રાખવો (સ્ટાફિંગ), રસ્તો બતાવવો (દોરવણી) અને બજેટ બહાર ખર્ચ ન થાય તે જોવું (અંકુશ).',
    definition: 'લ્યુથર ગુલિકના સૂત્ર POSDCORB મુજબ કાર્યો: Planning (આયોજન), Organizing (વ્યવસ્થાતંત્ર), Staffing (કર્મચારી વ્યવસ્થા), Directing (દોરવણી), Controlling (અંકુશ - સુધારાત્મક પગલાં).',
    voiceText: 'પ્રવાસનું આયોજન કરવું, ગાડીની વ્યવસ્થા કરવી અને ખર્ચ લિમિટમાં રાખવો એ જ મેનેજમેન્ટ છે. આયોજન એટલે પ્લાનિંગ, વ્યવસ્થાતંત્ર એટલે ઓર્ગેનાઇઝિંગ, કર્મચારી વ્યવસ્થા એટલે સ્ટાફિંગ, દોરવણી એટલે ડિરેક્ટિંગ અને અંકુશ એટલે કન્ટ્રોલિંગ.'
  },
  {
    id: 'node-coordination',
    topicNo: 'વિભાગ ૧.૭',
    title: 'સંકલન (Coordination)',
    icon: '🎻',
    analogy: 'ક્રિકેટ મેચમાં બોલર બોલ ફેંકે, ફીલ્ડર રન અટકાવવા દોડે અને વિકેટકીપર રન-આઉટ કરે. જો બધા વચ્ચે પરસ્પર તાલમેલ (સંકલન) ન હોય, તો ક્યારેય બેટ્સમેન આઉટ ન થાય અને મેચ હારી જવાય.',
    definition: 'અર્થ: ધંધાકીય એકમમાં જુદા જુદા વિભાગો વચ્ચે કાર્યોમાં એકસૂત્રતા અને સુમેળ સાધવાના કાર્યને સંકલન કહે છે. સંકલનને "સંચાલનનો આત્મા" કહેવાય છે. તેનાથી વિસંવાદિતા દૂર થાય છે અને સાધનોનો સમય બચે છે.',
    voiceText: 'ફીલ્ડર અને વિકેટકીપર વચ્ચેનો તાલમેલ એ સંકલન છે. સંકલન એ સંચાલનનો આત્મા છે જેનાથી બધા કર્મચારીઓ વચ્ચે એકતા અને તાલમેલ જળવાઈ રહે છે.'
  },
  {
    id: 'node-functional-hr',
    topicNo: 'વિભાગ ૧.૮.૧ - ૨',
    title: 'માર્કેટિંગ અને માનવ સંસાધન (Marketing & HRM)',
    icon: '📣',
    analogy: 'ગ્રાહકોને ખેંચવા પાટીયું લગાવવું અને નવી ચટણી ફ્રી આપવી એ માર્કેટિંગ (૪ Ps: Product, Price, Place, Promotion) છે. લારી પર વિશ્વાસુ અને સ્માર્ટ ભાઈને નોકરી પર રાખવો અને તેને પૂરતો પગાર આપી ખુશ રાખવો તે એચ.આર.એમ. છે.',
    definition: 'માર્કેટિંગ સંચાલન: માલ ગ્રાહક સુધી પહોંચાડવાની પ્રક્રિયા (પેદાશ, કિંમત, વિતરણ, અભિવૃદ્ધિ). માનવ સંસાધન સંચાલન (HRM): કર્મચારીઓની શક્તિ, બુદ્ધિ, કાર્યક્ષમતા અને સંતોષને વધારી ધંધા સાથે સાંકળવાનું કાર્ય.',
    voiceText: 'ગ્રાહકો માટે નવી પાણીપુરી ટેસ્ટ કરાવી એ માર્કેટિંગ છે અને સારા હેલ્પરની કાળજી રાખવી એ માનવ સંસાધન સંચાલન છે. માર્કેટિંગમાં ચાર પી આવે છે અને માનવ સંસાધનમાં ભરતી, તાલીમ અને સંતોષનો સમાવેશ થાય છે.'
  },
  {
    id: 'node-functional-finance',
    topicNo: 'વિભાગ ૧.૮.૩ - ૪',
    title: 'નાણાકીય અને ઉત્પાદન સંચાલન (Finance & Prod.)',
    icon: '💰',
    analogy: 'દર મહિને મળતા પૉકેટ મની કઈ રીતે બચાવવા અને ક્યાં ખર્ચવા તે નાણાકીય સંચાલન છે. જ્યારે મમ્મી ઘરમાં મસાલા, ચણા અને લોટની ખરીદી કરીને સ્વાદિષ્ટ પુરીઓ તૈયાર કરે તે ઉત્પાદન સંચાલન છે.',
    definition: 'નાણાકીય સંચાલન (Finance): ધંધામાં નાણાંની પ્રાપ્તિ, ઉપયોગ અને આવકની ફાળવણી કરવી (નાણું એ ધંધાનું રક્ત છે). ઉત્પાદન સંચાલન (Production): કાચા માલ પર પ્રક્રિયા કરી વપરાશયોગ્ય ચીજો બનાવવી (ગુણવત્તા અને ખર્ચ પર અંકુશ રાખવો).',
    voiceText: 'પૉકેટ મની બચાવવા એ નાણાકીય સંચાલન છે અને સ્વાદિષ્ટ પૂરીઓ રાંધવી એ ઉત્પાદન સંચાલન છે. નાણું ધંધાનું જીવનદાતા રક્ત છે જ્યારે ઉત્પાદન કાચા માલમાંથી વસ્તુ બનાવવાનું કામ કરે છે.'
  }
];

// 3. Render Knowledge Tree Nodes
function renderKnowledgeTree() {
  const grid = document.getElementById('knowledge-tree-grid');
  if (!grid) return;
  grid.innerHTML = '';

  knowledgeTreeData.forEach((node, index) => {
    const isCompleted = state.completedNodes.includes(node.id);
    const card = document.createElement('div');
    card.className = `tree-node-card glass ${isCompleted ? 'completed' : ''}`;
    card.id = `tree-card-${node.id}`;
    card.onclick = () => openNodeModal(node);

    card.innerHTML = `
      <span class="node-badge">${node.topicNo}</span>
      <div class="node-icon-wrapper">${node.icon}</div>
      <h4>${node.title}</h4>
    `;
    grid.appendChild(card);
  });

  updateProgressStats();
}

function updateProgressStats() {
  const percentage = Math.round((state.completedNodes.length / knowledgeTreeData.length) * 100);
  const progressSpan = document.getElementById('score-tree-progress');
  if (progressSpan) progressSpan.innerText = `${percentage}%`;

  const highScoreSpan = document.getElementById('high-score-val');
  if (highScoreSpan) highScoreSpan.innerText = `${state.highScore}/૨૫`;
}

// 4. Modal Interactions
let currentActiveNode = null;
function openNodeModal(node) {
  currentActiveNode = node;
  const modal = document.getElementById('node-modal');
  
  document.getElementById('modal-analogy-icon').innerText = node.icon;
  document.getElementById('modal-node-title').innerText = node.title;
  document.getElementById('modal-node-topic').innerText = node.topicNo;
  document.getElementById('modal-analogy-text').innerText = node.analogy;
  document.getElementById('modal-definition-text').innerText = node.definition;

  // Track Node Progress
  if (!state.completedNodes.includes(node.id)) {
    state.completedNodes.push(node.id);
    localStorage.setItem('completedNodes', JSON.stringify(state.completedNodes));
    // Apply styling class to completed card
    const card = document.getElementById(`tree-card-${node.id}`);
    if (card) card.classList.add('completed');
    updateProgressStats();
  }

  modal.classList.remove('hidden');
}

// Modal bindings
document.getElementById('modal-close').onclick = () => {
  document.getElementById('node-modal').classList.add('hidden');
  stopSpeech();
};

document.getElementById('btn-next-node').onclick = () => {
  if (!currentActiveNode) return;
  const currentIndex = knowledgeTreeData.findIndex(n => n.id === currentActiveNode.id);
  const nextIndex = (currentIndex + 1) % knowledgeTreeData.length;
  stopSpeech();
  openNodeModal(knowledgeTreeData[nextIndex]);
};

// 5. Audio Narration Engine using Web Speech API (Gujarati 'gu-IN' configuration)
function setupVoiceSynthesis() {
  if (!state.speechSynth) return;

  const loadVoices = () => {
    const voices = state.speechSynth.getVoices();
    const select = document.getElementById('voice-select');
    if (!select) return;
    select.innerHTML = '';

    // Filter for Indian voices or Gujarati voices if available, fallback to local ones
    let guVoice = null;
    voices.forEach(voice => {
      if (voice.lang.includes('gu-IN') || voice.lang.includes('gu')) {
        guVoice = voice;
      }
      const option = document.createElement('option');
      option.value = voice.name;
      option.innerText = `${voice.name} (${voice.lang})`;
      select.appendChild(option);
    });

    // Default select Gujarati voice if found, else search for Indian English voices or standard local voice
    if (guVoice) {
      state.selectedVoice = guVoice;
      select.value = guVoice.name;
    } else {
      const hiVoice = voices.find(v => v.lang.includes('hi-IN') || v.lang.includes('en-IN'));
      if (hiVoice) {
        state.selectedVoice = hiVoice;
        select.value = hiVoice.name;
      } else if (voices.length > 0) {
        state.selectedVoice = voices[0];
      }
    }
  };

  loadVoices();
  if (state.speechSynth.onvoiceschanged !== undefined) {
    state.speechSynth.onvoiceschanged = loadVoices;
  }

  // Bind settings listeners
  document.getElementById('voice-select').onchange = (e) => {
    state.selectedVoice = state.speechSynth.getVoices().find(v => v.name === e.target.value);
  };

  document.getElementById('voice-speed').oninput = (e) => {
    state.speechRate = parseFloat(e.target.value);
    document.getElementById('speed-val').innerText = `${state.speechRate}x`;
    if (state.speechUtterance) {
      // Restart speech with new speed if actively playing
      const txt = state.currentSpokenText;
      stopSpeech();
      speakText(txt);
    }
  };

  document.getElementById('voice-mute').onchange = (e) => {
    state.isMuted = e.target.checked;
    if (state.isMuted) {
      stopSpeech();
    }
  };
}

// Speak button binding inside the modal
document.getElementById('btn-speak-node').onclick = () => {
  if (currentActiveNode) {
    speakText(currentActiveNode.voiceText);
  }
};

function speakText(text) {
  if (state.isMuted || !state.speechSynth) return;
  stopSpeech();

  state.currentSpokenText = text;
  
  // Set up utterance
  state.speechUtterance = new SpeechSynthesisUtterance(text);
  if (state.selectedVoice) {
    state.speechUtterance.voice = state.selectedVoice;
  }
  // Try to force Gujarati locale if supported
  state.speechUtterance.lang = 'gu-IN';
  state.speechUtterance.rate = state.speechRate;

  const subtitlesBar = document.getElementById('subtitles-container');
  const subtitlesText = document.getElementById('subtitles-text');
  
  subtitlesBar.classList.remove('hidden');
  
  // Format text into words for dynamic subtitle highlighting
  const words = text.split(' ');
  let wordIndex = 0;

  subtitlesText.innerHTML = words.map((w, i) => `<span id="word-${i}">${w}</span>`).join(' ');

  // Listeners for Speech Progress
  state.speechUtterance.onboundary = (event) => {
    if (event.name === 'word') {
      // Un-highlight previous
      document.querySelectorAll('.highlight-word').forEach(el => el.classList.remove('highlight-word'));
      
      const currentWordId = `word-${wordIndex}`;
      const wordEl = document.getElementById(currentWordId);
      if (wordEl) {
        wordEl.className = 'highlight-word';
        // Auto-scroll subtitles bar if overflowing on mobile screen
        wordEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
      wordIndex++;
    }
  };

  // Fallback timer highlight if boundary events are not supported by the browser engine
  let fallbackInterval = null;
  state.speechUtterance.onstart = () => {
    // If boundary events don't trigger within 500ms, start a basic word highlight sequencer
    let boundaryTriggered = false;
    state.speechUtterance.onboundary = (e) => {
      boundaryTriggered = true;
      if (e.name === 'word') {
        document.querySelectorAll('.highlight-word').forEach(el => el.classList.remove('highlight-word'));
        const currentWordId = `word-${wordIndex}`;
        const wordEl = document.getElementById(currentWordId);
        if (wordEl) wordEl.className = 'highlight-word';
        wordIndex++;
      }
    };

    setTimeout(() => {
      if (!boundaryTriggered) {
        let currentIdx = 0;
        // Approximate reading speed (e.g. 150 words per minute scaled by rate)
        const msPerWord = (60000 / 150) / state.speechRate;
        
        fallbackInterval = setInterval(() => {
          document.querySelectorAll('.highlight-word').forEach(el => el.classList.remove('highlight-word'));
          const currentWordId = `word-${currentIdx}`;
          const wordEl = document.getElementById(currentWordId);
          if (wordEl) {
            wordEl.className = 'highlight-word';
          } else {
            clearInterval(fallbackInterval);
          }
          currentIdx++;
        }, msPerWord);
      }
    }, 500);
  };

  state.speechUtterance.onend = () => {
    if (fallbackInterval) clearInterval(fallbackInterval);
    setTimeout(() => subtitlesBar.classList.add('hidden'), 1000);
  };

  state.speechUtterance.onerror = () => {
    if (fallbackInterval) clearInterval(fallbackInterval);
    subtitlesBar.classList.add('hidden');
  };

  state.speechSynth.speak(state.speechUtterance);
}

function stopSpeech() {
  if (state.speechSynth && state.speechSynth.speaking) {
    state.speechSynth.cancel();
  }
}

// 6. Voice Overlay Panels Toggle
document.getElementById('audio-panel-toggle').onclick = () => {
  const panel = document.getElementById('audio-settings-panel');
  panel.classList.toggle('hidden');
};

document.getElementById('audio-panel-close').onclick = () => {
  document.getElementById('audio-settings-panel').classList.add('hidden');
};

// 7. PWA Install Event Handler
let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Show custom installation banner
  const installBanner = document.getElementById('install-banner');
  if (installBanner) {
    installBanner.classList.remove('hidden');
  }
});

document.getElementById('btn-install').onclick = async () => {
  if (!deferredPrompt) return;
  // Show install prompt
  deferredPrompt.prompt();
  // Wait for the user to respond to the prompt
  const { outcome } = await deferredPrompt.userChoice;
  console.log(`PWA Install decision outcome: ${outcome}`);
  // Clear variable
  deferredPrompt = null;
  // Hide custom installation banner
  document.getElementById('install-banner').classList.add('hidden');
};

document.getElementById('btn-close-banner').onclick = () => {
  document.getElementById('install-banner').classList.add('hidden');
};

// 8. Service Worker Registration
window.addEventListener('load', () => {
  setupVoiceSynthesis();
  renderKnowledgeTree();

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
      .then(reg => console.log('Service Worker registered successfully! scope:', reg.scope))
      .catch(err => console.error('Service Worker registration failed:', err));
  }
});
