// --- LONG-ANSWER QUESTIONS & MNEMONICS (મોટા પ્રશ્નો અને સૂત્રો) MODULE ---

const longQuestionsData = [
  {
    id: 'lq-1',
    topicNo: 'વિભાગ ૧.૨ (૫ માર્ક્સ)',
    title: 'સંચાલનનું સ્વરૂપ / લાક્ષણિકતાઓ (૭ મુદ્દા)',
    mnemonic: 'સ હે જૂ સ મા નિ વિ',
    mnemonicDesc: 'સૂત્ર: સ-હે-જૂ-સ-મા-નિ-વિ (૭ મુખ્‍ય અક્ષરો)',
    speechText: 'પ્રશ્ન: સંચાલનનું સ્વરૂપ અને લાક્ષણિકતાઓ જણાવો. સૂત્ર છે: સ હે જૂ સ મા નિ વિ.',
    items: [
      { id: 'lq1-1', key: 'સ', title: '૧. સર્વવ્યાપી પ્રવૃત્તિ', icon: '🌐', color: '#00f2fe', desc: 'સંચાલન માત્ર ધંધામાં જ નહીં પરંતુ સામાજિક, ધાર્મિક, લશ્કરી અને શૈક્ષણિક દરેક ક્ષેત્રમાં જોવા મળે છે.' },
      { id: 'lq1-2', key: 'હે', title: '૨. હેતુલક્ષી પ્રવૃત્તિ', icon: '🎯', color: '#c471ed', desc: 'સંચાલન એ સાધન છે સાધ્ય નથી. દરેક ધંધાકીય એકમના ચોક્કસ હેતુઓ સિદ્ધ કરવા સંચાલન જરૂરી છે.' },
      { id: 'lq1-3', key: 'જૂ', title: '૩. જૂથ પ્રવૃત્તિ', icon: '👥', color: '#f7797d', desc: 'બે કે તેથી વધુ વ્યક્તિઓ મળીને નક્કી કરેલા ધ્યેય સિદ્ધ કરવા માટે સંચાલન જૂથમાં થાય છે.' },
      { id: 'lq1-4', key: 'સ', title: '૪. સતત ચાલતી પ્રવૃત્તિ', icon: '🔄', color: '#00ff87', desc: 'એકમની સ્થાપનાથી અંત સુધી સંચાલન સતત ચાલે છે. ધ્યેય સિદ્ધ થતાં નવા ધ્યેય નક્કી થાય છે.' },
      { id: 'lq1-5', key: 'મા', title: '૫. માનવીય પ્રવૃત્તિ', icon: '👤', color: '#f5af19', desc: 'સંચાલનમાં માનવી કેન્દ્રસ્થાને છે. માનવી દ્વારા, માનવી માટે અને માનવીઓ સાધનોનો ઉપયોગ કરે છે.' },
      { id: 'lq1-6', key: 'નિ', title: '૬. નિર્ણય પ્રક્રિયા', icon: '⚖️', color: '#00f2fe', desc: 'સંચાલકે ધંધામાં સતત નિર્ણયો લેવા પડે છે. નિર્ણય લીધા વિના કોઈ પણ કાર્ય આગળ વધી શકતું નથી.' },
      { id: 'lq1-7', key: 'વિ', title: '૭. વિજ્ઞાન, કળા અને વ્યવસાય', icon: '🎨', color: '#c471ed', desc: 'નિયમો હોવાથી વિજ્ઞાન છે, કૌશલ્ય હોવાથી કળા છે અને વિશિષ્ટ જ્ઞાન જરૂરી હોવાથી વ્યવસાય છે.' }
    ]
  },
  {
    id: 'lq-2',
    topicNo: 'વિભાગ ૧.૩ (૫ માર્ક્સ)',
    title: 'સંચાલનનું મહત્વ (૮ મુદ્દા)',
    mnemonic: 'દ સા ધ ધ રો ન સા રા',
    mnemonicDesc: 'સૂત્ર: દ-સા-ધ-ધ-રો-ન-સા-રા (૮ મુખ્‍ય અક્ષરો)',
    speechText: 'પ્રશ્ન: સંચાલનનું મહત્વ સમજાવો. સૂત્ર છે: દ સા ધ ધ રો ન સા રા.',
    items: [
      { id: 'lq2-1', key: 'દ', title: '૧. દરેક ક્ષેત્રમાં જરૂરી', icon: '🏢', color: '#00f2fe', desc: 'ઉદ્યોગ ઉપરાંત રમત-ગમત, સંરક્ષણ, ધર્મ અને રાજકારણ જેવા તમામ ક્ષેત્રોમાં સંચાલન અનિવાર્ય છે.' },
      { id: 'lq2-2', key: 'સા', title: '૨. સાધનોનો ઇષ્ટતમ ઉપયોગ', icon: '⚡', color: '#00ff87', desc: 'જમીન, મૂડી, કાચો માલ અને માનવસાધનોનો મહત્તમ ઉપયોગ શક્ય બને છે અને વેડફાટ અટકે છે.' },
      { id: 'lq2-3', key: 'ધ', title: '૩. ધ્યેયસિદ્ધિ', icon: '🏁', color: '#f7797d', desc: 'સાધનોના યોગ્ય ઉપયોગથી ધંધાકીય એકમના નિર્ધારિત લક્ષ્યાંકો સરળતાથી પ્રાપ્ત થાય છે.' },
      { id: 'lq2-4', key: 'ધ', title: '૪. ધંધાની સફળતા માટે ઉપયોગી', icon: '🚀', color: '#c471ed', desc: 'નાના પાયાના એકમો મોટું સ્વરૂપ ધારણ કરી શકે તેનો બધો શ્રેય કાર્યક્ષમ સંચાલનને જાય છે.' },
      { id: 'lq2-5', key: 'રો', title: '૫. રોજગારીની તકોમાં વધારો', icon: '💼', color: '#f5af19', desc: 'દક્ષ સંચાલનથી કંપનીઓનો વિકાસ થાય છે, જેથી સમાજમાં નવી રોજગારીની તકો ઊભી થાય છે.' },
      { id: 'lq2-6', key: 'ન', title: '૬. નફામાં વૃદ્ધિ', icon: '💰', color: '#00ff87', desc: 'કાર્યક્ષમ સંચાલકો પોતાની સૂઝબૂઝથી કરકસર કરીને મહત્તમ નફો મેળવી આપે છે.' },
      { id: 'lq2-7', key: 'સા', title: '૭. સામાજિક લાભ', icon: '🤝', color: '#00f2fe', desc: 'સમાજના સાધનોનો ઉપયોગ કરી વ્યાજબી કિંમતે સારી વસ્તુઓ પૂરી પાડી સમાજનું કલ્યાણ કરે છે.' },
      { id: 'lq2-8', key: 'રા', title: '૮. રાષ્ટ્રીય હેતુ', icon: '🇮🇳', color: '#f7797d', desc: 'દેશના અણવપરાયેલા માનવસંપત્તિ અને ઉત્પાદનના સાધનોનો શ્રેષ્ઠ ઉપયોગ કરી આર્થિક વિકાસ કરે છે.' }
    ]
  },
  {
    id: 'lq-3',
    topicNo: 'વિભાગ ૧.૬ (૫ માર્ક્સ)',
    title: 'સંચાલનના કાર્યો - POSDC (૫ મુદ્દા)',
    mnemonic: 'આ વ ક દો અ',
    mnemonicDesc: 'સૂત્ર: આ-વ-ક-દો-અ (POSDC - ૫ કાર્યો)',
    speechText: 'પ્રશ્ન: સંચાલનના કાર્યો વર્ણવો. સૂત્ર છે: આ વ ક દો અ.',
    items: [
      { id: 'lq3-1', key: 'આ', title: '૧. આયોજન (Planning)', icon: '🗺️', color: '#00f2fe', desc: 'અપેક્ષિત પરિણામો મેળવવા માટે ભવિષ્યની વિચારણા અગાઉથી કરવી. આયોજન એ સંચાલનનું મગજ છે.' },
      { id: 'lq3-2', key: 'વ', title: '૨. વ્યવસ્થાતંત્ર (Organizing)', icon: '🏗️', color: '#c471ed', desc: 'સમાન હેતુ માટે કામ કરતા લોકો વચ્ચે સત્તા અને જવાબદારીની વહેંચણી કરતું માળખું એટલે વ્યવસ્થાતંત્ર.' },
      { id: 'lq3-3', key: 'ક', title: '૩. કર્મચારી વ્યવસ્થા (Staffing)', icon: '🧑‍💼', color: '#f5af19', desc: 'યોગ્ય જગ્યાએ, યોગ્ય સમયે અને યોગ્ય સંખ્યામાં લાયકાત ધરાવતા કર્મચારીઓની ભરતી અને વિકાસ કરવો.' },
      { id: 'lq3-4', key: 'દો', title: '૪. દોરવણી (Directing)', icon: '🧭', color: '#00ff87', desc: 'કર્મચારીઓને લક્ષ્ય પ્રાપ્તિ માટે માર્ગદર્શન આપવું અને તેમના પર અસરકારક દેખરેખ રાખવી.' },
      { id: 'lq3-5', key: 'અ', title: '૫. અંકુશ (Controlling)', icon: '⚙️', color: '#f7797d', desc: 'આયોજન મુજબ કામ થાય છે કે નહીં તે જોવું. અંકુશ એ સંચાલનનું છેલ્લું સુધારાત્મક કાર્ય છે.' }
    ]
  },
  {
    id: 'lq-4',
    topicNo: 'વિભાગ ૧.૫.૧ (૫ માર્ક્સ)',
    title: 'ઉચ્ચ સપાટી સંચાલનના કાર્યો (૬ મુદ્દા)',
    mnemonic: 'હે ટ્ર ની અ કા વ્ય',
    mnemonicDesc: 'સૂત્ર: હે-ટ્ર-ની-અ-કા-વ્યૂ (૬ મુખ્‍ય કાર્યો)',
    speechText: 'પ્રશ્ન: ઉચ્ચ સપાટી સંચાલનના કાર્યો જણાવો. સૂત્ર છે: હે ટ્ર ની અ કા વ્ય.',
    items: [
      { id: 'lq4-1', key: 'હે', title: '૧. હેતુઓ નક્કી કરવા', icon: '🎯', color: '#00f2fe', desc: 'ધંધાકીય એકમના મુખ્ય અને ગૌણ હેતુઓ નક્કી કરવાનું કાર્ય ઉચ્ચ સપાટીએ થાય છે.' },
      { id: 'lq4-2', key: 'ટ્ર', title: '૨. ટ્રસ્ટી તરીકે કાર્ય', icon: '🛡️', color: '#c471ed', desc: 'સંચાલક મંડળ (Board of Directors) કંપનીના ટ્રસ્ટી તરીકે માલિકોના હિતોનું રક્ષણ કરે છે.' },
      { id: 'lq4-3', key: 'ની', title: '૩. ઉચ્ચ અધિકારીઓની નિમણૂક', icon: '👔', color: '#f5af19', desc: 'ચીફ એક્ઝિક્યુટિવ ઓફિસર (CEO) અને વિભાગીય અધિકારીઓની નિમણૂક કરી સત્તા સોંપવી.' },
      { id: 'lq4-4', key: 'અ', title: '૪. અંદાજપત્રો મંજૂર કરવા', icon: '📊', color: '#00ff87', desc: 'જુદા જુદા વિભાગીય અધિકારીઓ દ્વારા તૈયાર કરાયેલા અંદાજપત્રોને આખરી મંજૂરી આપવી.' },
      { id: 'lq4-5', key: 'કા', title: '૫. કાનૂની જોગવાઈઓનું પાલન', icon: '📜', color: '#f7797d', desc: 'સરકારી કાયદાઓ, કરવેરા અને ધંધા સાથે સંકળાયેલા વિવિધ વર્ગોના હિતોની જાળવણી કરવી.' },
      { id: 'lq4-6', key: 'વ્ય', title: '૬. વ્યૂહાત્મક નિર્ણયો', icon: '♟️', color: '#00f2fe', desc: 'લાંબા ગાળાના આયોજનો ઘડવા અને એકમની જટિલ સમસ્યાઓનો ઉકેલ લાવવો.' }
    ]
  },
  {
    id: 'lq-5',
    topicNo: 'વિભાગ ૧.૮.૧ (૫ માર્ક્સ)',
    title: 'માર્કેટિંગ સંચાલનના કાર્યો / 4 Ps (૪ મુદ્દા)',
    mnemonic: 'પે કિં વિ અ',
    mnemonicDesc: 'સૂત્ર: પે-કિં-વિ-અ (Marketing Mix 4 Ps)',
    speechText: 'પ્રશ્ન: માર્કેટિંગ સંચાલનના મુખ્ય કાર્યો અથવા ૪ Ps વર્ણવો. સૂત્ર છે: પે કિં વિ અ.',
    items: [
      { id: 'lq5-1', key: 'પે', title: '૧. પેદાશ અથવા પેદાશ મિશ્ર (Product)', icon: '📦', color: '#00f2fe', desc: 'નવી પેદાશના વિકાસ, તેનો આકાર, રંગ, વજન, છાપ (Branding), પેકિંગ અને ગ્રાહક સેવાઓ નક્કી કરવી.' },
      { id: 'lq5-2', key: 'કિં', title: '૨. કિંમત (Price)', icon: '🏷️', color: '#00ff87', desc: 'ગ્રાહક વ્યાજબી ભાવે વસ્તુ મેળવે તે માટે વેચાણ નીતિ, શાખ નીતિ, વટાવ અને મધ્યસ્થીઓનું કમિશન નક્કી કરવું.' },
      { id: 'lq5-3', key: 'વિ', title: '૩. વિતરણ (Place / Distribution)', icon: '🚚', color: '#c471ed', desc: 'માલ ગ્રાહક સુધી ઝડપથી પહોંચે તે માટે જથ્થાબંધ, છૂટક કે વાહનવ્યવહારના માધ્યમોની પસંદગી કરવી.' },
      { id: 'lq5-4', key: 'અ', title: '૪. અભિવૃદ્ધિ (Promotion)', icon: '📣', color: '#f7797d', desc: 'વેચાણમાં નોંધપાત્ર વધારો કરવા જાહેરાત કરવી, સેલ્સમેન દ્વારા વેચાણ અને ડિસ્કાઉન્ટ સ્કીમો આપવી.' }
    ]
  },
  {
    id: 'lq-6',
    topicNo: 'વિભાગ ૧.૮.૨ (૫ માર્ક્સ)',
    title: 'માનવ સંસાધન સંચાલન (HRM) ના કાર્યો (૫ મુદ્દા)',
    mnemonic: 'ભ આ અ તા સ',
    mnemonicDesc: 'સૂત્ર: ભ-આ-અ-તા-સ (HRM કાર્યો)',
    speechText: 'પ્રશ્ન: માનવ સંસાધન સંચાલન (HRM) ના કાર્યો જણાવો. સૂત્ર છે: ભ આ અ તા સ.',
    items: [
      { id: 'lq6-1', key: 'ભ', title: '૧. ભરતી, પસંદગી અને તાલીમ', icon: '🤝', color: '#00f2fe', desc: 'કર્મચારીઓની આયોજનપૂર્વક ભરતી કરવી, યોગ્ય પસંદગી કરી તેમની ક્ષમતા મુજબ તાલીમ અને બઢતી આપવી.' },
      { id: 'lq6-2', key: 'આ', title: '૨. આત્મસાત અને ધ્યેય સાંકળવું', icon: '🎯', color: '#c471ed', desc: 'કર્મચારીઓના વ્યક્તિગત ધ્યેયોને કંપનીના મુખ્ય ધ્યેયો સાથે સાંકળીને બંનેની સફળતા સુનિશ્ચિત કરવી.' },
      { id: 'lq6-3', key: 'અ', title: '૩. અમૂલ્ય મિલકત ગણવી', icon: '💎', color: '#f5af19', desc: 'કર્મચારીઓને માત્ર સાધન નહીં પરંતુ કંપનીની સજીવ અને અમૂલ્ય મિલકત સમજી તેમની કાળજી લેવી.' },
      { id: 'lq6-4', key: 'તા', title: '૪. તાલીમ અને વિકાસ', icon: '🎓', color: '#00ff87', desc: 'કર્મચારીઓની કાર્યક્ષમતા વધારવા માટે યોગ્ય વાતાવરણ પૂરું પાડવું અને સતત વિકાસની તકો આપવી.' },
      { id: 'lq6-5', key: 'સ', title: '૫. સંતોષ અને જૂથભાવના', icon: '❤️', color: '#f7797d', desc: 'કર્મચારીઓને પૂરતો કાર્યસંતોષ આપવો જેથી કર્મચારી ફેરબદલી દર ઘટે અને વફાદારી તથા જૂથભાવના વધે.' }
    ]
  },
  {
    id: 'lq-7',
    topicNo: 'વિભાગ ૧.૮.૩ (૫ માર્ક્સ)',
    title: 'નાણાકીય સંચાલનના કાર્યો (૫ મુદ્દા)',
    mnemonic: 'અ આ અ ફ મૂ',
    mnemonicDesc: 'સૂત્ર: અ-આ-અ-ફ-મૂ (Finance Functions)',
    speechText: 'પ્રશ્ન: નાણાકીય સંચાલનના કાર્યો લખો. સૂત્ર છે: અ આ અ ફ મૂ.',
    items: [
      { id: 'lq7-1', key: 'અ', title: '૧. નાણાંની જરૂરિયાતો અંદાજવી', icon: '🧮', color: '#00f2fe', desc: 'ધંધાની સ્થાપના, ચાલુ રાખવા અને વિકાસ કરવા માટે કેટલા નાણાં જોશે તેનો અંદાજ મૂકવો.' },
      { id: 'lq7-2', key: 'આ', title: '૨. સમય દ્રષ્ટિએ નાણાંનું આયોજન', icon: '📅', color: '#c471ed', desc: 'ટૂંકા ગાળા માટે અને લાંબા ગાળા માટે નાણાં ક્યારે અને ક્યાંથી મળશે તેનું આયોજન કરવું.' },
      { id: 'lq7-3', key: 'અ', title: '૩. અંદાજપત્ર (Budget) બનાવવું', icon: '📝', color: '#00ff87', desc: 'ભવિષ્યના આવક અને ખર્ચના અંદાજો દર્શાવતું માસિક કે વાર્ષિક બજેટ તૈયાર કરવું.' },
      { id: 'lq7-4', key: 'ફ', title: '૪. આવકની ફાળવણી કરવી', icon: '💸', color: '#f5af19', desc: 'કમાયેલા નફામાંથી કેટલો ભાગ ડિવિડન્ડ તરીકે આપવો અને કેટલું પુનઃરોકાણ કરવું તે નક્કી કરવું.' },
      { id: 'lq7-5', key: 'મૂ', title: '૫. મૂડી માળખાનો વિચાર કરવો', icon: '🏛️', color: '#f7797d', desc: 'શેર, ડિબેન્ચર કે લોનમાંથી કઈ રીતે મૂડી મેળવવી તેનો જામીનગીરીઓનો પ્રકાર પસંદ કરવો.' }
    ]
  },
  {
    id: 'lq-8',
    topicNo: 'વિભાગ ૧.૮.૪ (૫ માર્ક્સ)',
    title: 'ઉત્પાદન સંચાલનના કાર્યો (૫ મુદ્દા)',
    mnemonic: 'ઉ સ વિ ટે મા',
    mnemonicDesc: 'સૂત્ર: ઉ-સ-વિ-ટે-મા (Production Functions)',
    speechText: 'પ્રશ્ન: ઉત્પાદન સંચાલનના કાર્યો સમજાવો. સૂત્ર છે: ઉ સ વિ ટે મા.',
    items: [
      { id: 'lq8-1', key: 'ઉ', title: '૧. ઉત્પાદન આયોજન (Planning)', icon: '⚙️', color: '#00f2fe', desc: 'ગ્રાહકોની માંગ મુજબ શું, કેટલું અને ક્યારે ઉત્પાદન કરવું તેનું આયોજન કરવું.' },
      { id: 'lq8-2', key: 'સ', title: '૨. ઉત્પાદન સંશોધન (Research)', icon: '🔬', color: '#c471ed', desc: 'નવી બનાવટ અને સુધારા લાવવા માટે સતત ઉત્પાદન સંશોધન અને રિસર્ચ કરવું.' },
      { id: 'lq8-3', key: 'વિ', title: '૩. વસ્તુ વિકાસ (Product Dev)', icon: '✨', color: '#00ff87', desc: 'ગ્રાહકની જરૂરિયાત મુજબ નવી વસ્તુનો વિકાસ કરવો અને પેદાશ મિશ્રની પસંદગી કરવી.' },
      { id: 'lq8-4', key: 'ટે', title: '૪. ટેકનોલોજી અને યંત્રોની પસંદગી', icon: '🤖', color: '#f5af19', desc: 'આધુનિક ટેકનોલોજી, મશીનરી અને ફેક્ટરીના વિન્યાસ (Layout) અંગે યોગ્ય નિર્ણયો લેવા.' },
      { id: 'lq8-5', key: 'મા', title: '૫. માલસામગ્રી અને ગુણવત્તા અંકુશ', icon: '🔍', color: '#f7797d', desc: 'કાચા માલની ખરીદી, સ્ટોર કંટ્રોલ, ખર્ચ અંકુશ અને ઉત્પાદનની ગુણવત્તા જાળવવી.' }
    ]
  }
];

// Module Internal State
const longQState = {
  currentIndex: 0,
  isSolving: false, // true during active challenge mode
  userOrderedCards: [],
  verificationResults: [], // array of booleans per card index
  narratingCardIndex: -1 // index of currently glowing card during audio story
};

// 1. Initialize Long Questions View
function initLongQuestionsModule() {
  longQState.currentIndex = 0;
  longQState.isSolving = false;
  longQState.verificationResults = [];
  longQState.narratingCardIndex = -1;

  renderLongQuestionSelector();
  loadLongQuestion(0);
}

// Render Header Question Select Dropdown
function renderLongQuestionSelector() {
  const select = document.getElementById('lq-select-question');
  if (!select) return;

  select.innerHTML = '';
  longQuestionsData.forEach((q, idx) => {
    const opt = document.createElement('option');
    opt.value = idx;
    opt.innerText = `${q.topicNo} - ${q.title}`;
    select.appendChild(opt);
  });

  select.onchange = (e) => {
    loadLongQuestion(parseInt(e.target.value));
  };
}

// 2. Load Specific Long Question (Initial Study Mode)
function loadLongQuestion(idx) {
  stopSpeech();

  longQState.currentIndex = idx;
  longQState.isSolving = false;
  longQState.verificationResults = [];
  longQState.narratingCardIndex = -1;

  const qData = longQuestionsData[idx];

  const select = document.getElementById('lq-select-question');
  if (select) select.value = idx;

  // Header Details
  document.getElementById('lq-topic-badge').innerText = qData.topicNo;
  document.getElementById('lq-question-title').innerText = qData.title;
  document.getElementById('lq-mnemonic-hint').innerText = qData.mnemonicDesc;

  // Copy initial ordered items for Study Mode
  longQState.userOrderedCards = [...qData.items];

  // Update Progress UI (Step 1: Study Mode)
  updateStepProgressUI(1);

  // Render Answer Cards in original study order
  renderLongQAnswerCards(false);

  // Control Buttons State for Study Mode
  document.getElementById('btn-lq-speak').classList.remove('hidden');
  document.getElementById('btn-lq-start-test').classList.remove('hidden');
  document.getElementById('btn-lq-submit-cards').classList.add('hidden');
  document.getElementById('lq-feedback-banner').classList.add('hidden');
}

// Next / Previous Navigation
function navLongQuestion(direction) {
  let newIdx = longQState.currentIndex + direction;
  if (newIdx < 0) newIdx = longQuestionsData.length - 1;
  if (newIdx >= longQuestionsData.length) newIdx = 0;
  loadLongQuestion(newIdx);
}

// 3. Start Solving Challenge Mode ("યાદશક્તિ કસોટી")
function startLongQMnemonicTest() {
  stopSpeech();

  const instructionPoints = [
    "૧. પ્રશ્નના તમામ મુદ્દાઓ (Cards) આડા-અવળા (Shuffled) કરી દેવાયા છે.",
    "૨. કાર્ડ્સને ▲ / ▼ બટન અથવા ડ્રેગ કરીને સાચા ક્રમમાં ગોઠવો.",
    "૩. ક્રમ ગોઠવાઈ જાય એટલે 'ચકાસણી કરો' (Submit) બટન દબાવો.",
    "૪. ૧૦૦% સાચો ક્રમ થતાં જ કમનીય ઓડિયો વાચન સાથે દરેક કાર્ડ લાઈવ હાઈલાઈટ થાશે!"
  ];

  showInstructionModal(
    "પ્રશ્ન સોલ્વ કરવાની રીત",
    instructionPoints,
    () => {
      longQState.isSolving = true;
      longQState.verificationResults = [];
      longQState.narratingCardIndex = -1;

      const qData = longQuestionsData[longQState.currentIndex];

      // Hide Listen button while solving!
      document.getElementById('btn-lq-speak').classList.add('hidden');
      document.getElementById('btn-lq-start-test').classList.add('hidden');
      document.getElementById('btn-lq-submit-cards').classList.remove('hidden');

      // Update Progress UI (Step 2: Re-order cards)
      updateStepProgressUI(2);

      // Banner Prompt
      const banner = document.getElementById('lq-feedback-banner');
      banner.className = 'feedback-banner info-banner glass';
      banner.innerText = '💡 કાર્ડ્સ આડા-અવળા થઈ ગયા છે! ▲/▼ બટન અથવા ડ્રેગ કરીને સાચો ક્રમ ગોઠવો અને "ચકાસણી કરો" દબાવો:';
      banner.classList.remove('hidden');

      // Shuffle Cards for Challenge
      longQState.userOrderedCards = [...qData.items].sort(() => Math.random() - 0.5);

      // Render Shuffled Interactive Cards
      renderLongQAnswerCards(true);
    }
  );
}

// 4. Render Answer Cards List (with Touch Up/Down Reorder, Drag Drop & Real-time Narration Highlight)
function renderLongQAnswerCards(interactive = false) {
  const container = document.getElementById('lq-cards-container');
  if (!container) return;

  container.innerHTML = '';

  longQState.userOrderedCards.forEach((card, index) => {
    const cardEl = document.createElement('div');
    
    // Status styling
    let statusClass = '';
    if (longQState.verificationResults.length > 0) {
      statusClass = longQState.verificationResults[index] ? 'card-correct' : 'card-incorrect';
    }

    // Active TTS Narration Highlight class
    const isNarrating = (longQState.narratingCardIndex === index);
    if (isNarrating) {
      statusClass += ' card-narrating';
    }

    cardEl.className = `lq-card glass ${statusClass} ${interactive ? 'interactive' : ''}`;
    cardEl.id = `lq-card-item-${index}`;
    cardEl.dataset.index = index;

    cardEl.innerHTML = `
      <div class="lq-card-header">
        <div class="lq-card-badge" style="background: ${card.color}25; border-color: ${card.color}; color: ${card.color};">
          ${card.key}
        </div>
        <div class="lq-card-icon">${card.icon}</div>
        <h4 class="lq-card-title">${card.title}</h4>
        
        ${interactive ? `
          <div class="lq-card-reorder-btns">
            <button class="btn-reorder btn-up" onclick="moveLongQCard(${index}, -1)" ${index === 0 ? 'disabled' : ''}>▲</button>
            <button class="btn-reorder btn-down" onclick="moveLongQCard(${index}, 1)" ${index === longQState.userOrderedCards.length - 1 ? 'disabled' : ''}>▼</button>
          </div>
        ` : ''}
      </div>
      <p class="lq-card-desc">${card.desc}</p>
      ${statusClass.includes('card-incorrect') ? '<span class="status-indicator err">❌ ખોટો ક્રમ</span>' : ''}
      ${statusClass.includes('card-correct') ? '<span class="status-indicator ok">✅ સાચો ક્રમ</span>' : ''}
    `;

    if (interactive) {
      setupCardDragEvents(cardEl, index);
    }

    container.appendChild(cardEl);
  });
}

// Mobile Touch Up/Down Button Swap
function moveLongQCard(index, delta) {
  const targetIndex = index + delta;
  if (targetIndex < 0 || targetIndex >= longQState.userOrderedCards.length) return;

  const temp = longQState.userOrderedCards[index];
  longQState.userOrderedCards[index] = longQState.userOrderedCards[targetIndex];
  longQState.userOrderedCards[targetIndex] = temp;

  // Clear previous verification markers on user move
  longQState.verificationResults = [];

  renderLongQAnswerCards(true);
}

// Drag and Drop Support
let draggedCardIndex = null;
function setupCardDragEvents(cardEl, index) {
  cardEl.draggable = true;

  cardEl.ondragstart = (e) => {
    draggedCardIndex = index;
    cardEl.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
  };

  cardEl.ondragend = () => {
    cardEl.classList.remove('dragging');
    draggedCardIndex = null;
    document.querySelectorAll('.lq-card').forEach(c => c.classList.remove('drag-over'));
  };

  cardEl.ondragover = (e) => {
    e.preventDefault();
    cardEl.classList.add('drag-over');
  };

  cardEl.ondragleave = () => {
    cardEl.classList.remove('drag-over');
  };

  cardEl.ondrop = (e) => {
    e.preventDefault();
    cardEl.classList.remove('drag-over');
    if (draggedCardIndex === null || draggedCardIndex === index) return;

    const movedItem = longQState.userOrderedCards.splice(draggedCardIndex, 1)[0];
    longQState.userOrderedCards.splice(index, 0, movedItem);

    longQState.verificationResults = [];
    renderLongQAnswerCards(true);
  };
}

// 5. Final Order Verification ("ચકાસણી કરો") & Interactive Narration Trigger
function verifyLongQCardOrder() {
  const qData = longQuestionsData[longQState.currentIndex];
  const originalItems = qData.items;

  let correctCount = 0;
  longQState.verificationResults = [];

  longQState.userOrderedCards.forEach((card, idx) => {
    const isCorrect = card.id === originalItems[idx].id;
    if (isCorrect) correctCount++;
    longQState.verificationResults.push(isCorrect);
  });

  const is100Percent = correctCount === originalItems.length;
  const banner = document.getElementById('lq-feedback-banner');

  renderLongQAnswerCards(true);

  if (is100Percent) {
    // 100% SUCCESS!
    longQState.isSolving = false;

    updateStepProgressUI(3);

    banner.className = 'feedback-banner success-banner glass';
    banner.innerText = '🏆 ૧૦૦% સાચો જવાબ! હવે દરેક મુદ્દો વાર્તા રૂપે હાઈલાઈટ થઈને ઓડિયોમાં સંભળાશે:';
    banner.classList.remove('hidden');

    // Reveal Listen Button again and hide Submit button
    document.getElementById('btn-lq-speak').classList.remove('hidden');
    document.getElementById('btn-lq-submit-cards').classList.add('hidden');

    // Start Interactive Story Narration with synchronized card glows
    playInteractiveStoryNarration(qData);
  } else {
    // Partial Errors - Highlight misplaced cards in red without resetting everything
    banner.className = 'feedback-banner error-banner glass';
    banner.innerText = `⚠️ ${originalItems.length} માંથી ${correctCount} મુદ્દા સાચા ક્રમમાં છે. લાલ રંગના કાર્ડ્સનો ક્રમ ▲ અથવા ▼ દબાવીને બદલો અને ફરી "ચકાસણી કરો" દબાવો.`;
    banner.classList.remove('hidden');
  }
}

// 6. Interactive Audio-Visual Story Narration Engine
function playInteractiveStoryNarration(qData) {
  stopSpeech();

  if (state.isMuted || !state.speechSynth) return;

  const items = qData.items;
  let currentItemIdx = 0;

  function speakNextItem() {
    if (currentItemIdx >= items.length) {
      // Narration finished
      longQState.narratingCardIndex = -1;
      renderLongQAnswerCards(false);
      return;
    }

    // Set active narrating card index
    longQState.narratingCardIndex = currentItemIdx;
    renderLongQAnswerCards(false);

    // Auto-scroll narrating card into view
    const cardEl = document.getElementById(`lq-card-item-${currentItemIdx}`);
    if (cardEl) {
      cardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    const item = items[currentItemIdx];
    const textToSpeak = `${item.title}. ${item.desc}`;

    state.speechUtterance = new SpeechSynthesisUtterance(textToSpeak);
    if (state.selectedVoice) {
      state.speechUtterance.voice = state.selectedVoice;
    }
    state.speechUtterance.lang = 'gu-IN';
    state.speechUtterance.rate = state.speechRate;

    // Show subtitles bar
    const subtitlesBar = document.getElementById('subtitles-container');
    const subtitlesText = document.getElementById('subtitles-text');
    subtitlesBar.classList.remove('hidden');
    subtitlesText.innerText = `${item.title}: ${item.desc}`;

    state.speechUtterance.onend = () => {
      currentItemIdx++;
      // Small pause between cards (400ms)
      setTimeout(speakNextItem, 400);
    };

    state.speechUtterance.onerror = () => {
      currentItemIdx++;
      setTimeout(speakNextItem, 200);
    };

    state.speechSynth.speak(state.speechUtterance);
  }

  // Start with Question Header intro speech first
  state.speechUtterance = new SpeechSynthesisUtterance(`${qData.title}. ${qData.mnemonicDesc}`);
  if (state.selectedVoice) state.speechUtterance.voice = state.selectedVoice;
  state.speechUtterance.lang = 'gu-IN';
  state.speechUtterance.rate = state.speechRate;

  state.speechUtterance.onend = () => {
    speakNextItem();
  };

  state.speechUtterance.onerror = () => {
    speakNextItem();
  };

  state.speechSynth.speak(state.speechUtterance);
}

// 7. Manual Speak Button Click (Uses Interactive Story mode if 100% verified, else standard summary)
function speakCurrentLongQuestion() {
  const qData = longQuestionsData[longQState.currentIndex];
  if (qData) {
    playInteractiveStoryNarration(qData);
  }
}

// 8. Step Progress UI Bar
function updateStepProgressUI(stepNum) {
  const s1 = document.getElementById('lq-step-1');
  const s2 = document.getElementById('lq-step-2');
  const s3 = document.getElementById('lq-step-3');

  if (!s1 || !s2 || !s3) return;

  s1.className = `lq-step ${stepNum >= 1 ? 'active' : ''} ${stepNum > 1 ? 'completed' : ''}`;
  s2.className = `lq-step ${stepNum >= 2 ? 'active' : ''} ${stepNum > 2 ? 'completed' : ''}`;
  s3.className = `lq-step ${stepNum >= 3 ? 'active completed' : ''}`;
}
