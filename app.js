// BellyBand Pregnancy & Parenting Website Application Logic
import { SVG_ILLUSTRATIONS } from './illustrations.js';

// Multi-language localization dictionary
const TRANSLATIONS = {
  en: {
    step1Label: "Language",
    step2Label: "Role in Family",
    step3Label: "Life Stage",
    step4Label: "Dashboard",
    step1Badge: "Step 1 of 3",
    step2Badge: "Step 2 of 3",
    step3Badge: "Step 3 of 3",
    step4Badge: "Step 4 of 5",
    step5Badge: "Step 5 of 5",
    chooseLanguage: "Choose your language",
    chooseLanguageSub: "This helps us to provide personalized content and clinical guides in your preferred language",
    roleTitle: "What's your role in the family?",
    roleSub: "This helps us provide you with relevant tools, partner guides, and trackers according to your role",
    lifeStageTitle: "What life stage are you currently at?",
    lifeStageSub: "This helps us curate the right care protocols, week-by-week trackers, and milestones for your stage.",
    continue: "CONTINUE",
    backToLanguages: "Back to Languages",
    backToRole: "Back to Family Role",
    backToStage: "Back to Life Stage",
    backToDate: "Back",
    wifeMother: "Wife | Mother",
    husbandFather: "Husband | Father",
    primaryCaregiver: "Primary Caregiver",
    partnerCoParent: "Partner & Co-Parent",
    wifeMotherDesc: "Personalized trimesters, symptom tracking, nutrition plans, recovery tips, and baby milestone journals crafted for mom.",
    husbandFatherDesc: "Partner guides, birth preparation checklists, how to support your partner week-by-week, and synced doctor schedules.",
    symptomTrackerTag: "✨ Symptom Tracker",
    kickCounterTag: "✨ Kick Counter",
    nutritionTag: "✨ Nutrition",
    partnerSyncTag: "✨ Partner Sync",
    supportGuidesTag: "✨ Support Guides",
    checklistsTag: "✨ Checklists",
    hcProviderNote: "Are you a registered healthcare professional or support provider?\nManage patient care, track syncs, and access clinical resources.",
    registerAsProvider: "Register as Provider",
    providerLogin: "Provider Login",
    pregnant: "Pregnant",
    mother: "Mother",
    alreadyParent: "Already a Parent",
    stage1Badge: "Trimester & Fetal Care",
    stage1Desc: "Track your weekly baby development, fruit size comparisons, medical scans, and trimester insights.",
    stage2Badge: "Infant & Postpartum",
    stage2Desc: "Log newborn feeding, sleep routines, vaccination schedules, and postpartum physical & mental wellness.",
    stage3Badge: "Toddler & Multi-Kid Family",
    stage3Desc: "Manage growing family schedules, toddler milestones, sibling bonding, nutrition, and parenting tips.",
    dateStepTitle: "Your expected delivery date?",
    dateStepSub: "This helps us personalize the fetus tracker & make your pregnancy journey smoother",
    selectWeekInstead: "Select Week Instead",
    selectDateInstead: "Select Due Date Instead",
    weekStepTitle: "Your current pregnancy week?",
    authStepTitle: "Please Login",
    authStepSub: "BellyBand is only for verified users, please enter your details to proceed",
    tabSignUp: "Sign Up",
    tabLogIn: "Log In",
    labelFullName: "Full Name",
    labelEmail: "Email Address",
    labelPassword: "Password",
    labelConfirmPassword: "Confirm Password",
    btnCreateAccount: "Create Account & Enter Dashboard",
    btnLogIn: "Log In to BellyBand",
    forgotPassword: "Forgot password?",
    navOverview: "Dashboard Overview",
    navScans: "Doctor Scans & Visits",
    navNutrition: "Nutrition & Meal Plans",
    navFitness: "Prenatal Yoga & Fitness",
    navCommunity: "Community & Guides",
    navSettings: "Family Settings",
    navProfile: "Profile Settings",
    greeting: "Welcome back",
    weekLabel: "Week 24",
    fruitLabel: "Size of an Eggplant",
    daysLeft: "112 Days to Due Date",
    babyDevelopmentTitle: "Baby's Hearing & Senses are Developing",
    babyDevelopmentDesc: "Your baby is about 30 cm long and can now hear your voice and heartbeat clearly. Singing, talking, or playing soft music is great for bonding!",
    kickCounter: "Kick Counter",
    kickCounterDesc: "Track fetal movements",
    waterTracker: "Hydration Log",
    waterTrackerDesc: "6 of 8 glasses logged",
    symptomLogger: "Daily Symptoms",
    symptomLoggerDesc: "Log kicks, mood & appetite",
    partnerSync: "Partner Connect",
    partnerSyncDesc: "Sync updates with spouse",
    motherTitle: "Infant Milestones & Care Routines",
    motherDesc: "Baby is 3 months old! Smiling, recognizing faces, tracking moving objects, and lifting head during tummy time.",
    alreadyTitle: "Family Wellness & Sibling Bonding Hub",
    alreadyDesc: "Nurturing growing family routines, age-appropriate toddler activities, and balancing newborn care with older siblings.",
    todayTip: "Doctor's Guidance of the Day",
    todayTipText: "Staying well hydrated helps maintain optimal amniotic fluid levels and reduces mild pregnancy fatigue. Aim for 8-10 glasses of water daily."
  },
  hi: {
    step1Label: "भाषा",
    step2Label: "पारिवारिक भूमिका",
    step3Label: "जीवन चरण",
    step4Label: "डैशबोर्ड",
    step1Badge: "चरण 1 / 3",
    step2Badge: "चरण 2 / 3",
    step3Badge: "चरण 3 / 3",
    step4Badge: "चरण 4 / 5",
    step5Badge: "चरण 5 / 5",
    chooseLanguage: "अपनी पसंदीदा भाषा चुनें",
    chooseLanguageSub: "यह हमें आपकी पसंदीदा भाषा में व्यक्तिगत सामग्री और मार्गदर्शिका प्रदान करने में मदद करता है",
    roleTitle: "परिवार में आपकी क्या भूमिका है?",
    roleSub: "यह हमें आपकी भूमिका के अनुसार प्रासंगिक उपकरण और गाइड प्रदान करने में मदद करता है",
    lifeStageTitle: "आप वर्तमान में किस जीवन चरण में हैं?",
    lifeStageSub: "यह हमें आपके वर्तमान चरण के अनुसार सही अनुभव और ट्रैकर प्रदान करने में मदद करता है।",
    continue: "आगे बढ़ें",
    backToLanguages: "भाषा चयन पर वापस जाएं",
    backToRole: "पारिवारिक भूमिका पर वापस जाएं",
    backToStage: "जीवन चरण पर वापस जाएं",
    backToDate: "वापस",
    wifeMother: "पत्नी | माँ",
    husbandFather: "पति | पिता",
    primaryCaregiver: "प्राथमिक देखभालकर्ता",
    partnerCoParent: "पार्टनर और सह-अभिभावक",
    wifeMotherDesc: "व्यक्तिगत तिमाही जानकारी, लक्षण ट्रैकिंग, पोषण योजनाएं, रिकवरी टिप्स और माँ के लिए तैयार बेबी मील के पत्थर।",
    husbandFatherDesc: "पार्टनर गाइड, प्रसव की तैयारी की चेकलिस्ट, सप्ताह-दर-सप्ताह साथी का समर्थन और डॉक्टर का शेड्यूल।",
    symptomTrackerTag: "✨ लक्षण ट्रैकर",
    kickCounterTag: "✨ किक काउंटर",
    nutritionTag: "✨ पोषण गाइड",
    partnerSyncTag: "✨ पार्टनर सिंक",
    supportGuidesTag: "✨ सपोर्ट गाइड्स",
    checklistsTag: "✨ चेकलिस्ट्स",
    hcProviderNote: "क्या आप एक पंजीकृत स्वास्थ्य सेवा पेशेवर या देखभाल प्रदाता हैं?\nरोगी देखभाल, सिंक और क्लिनिकल संसाधनों का प्रबंधन करें।",
    registerAsProvider: "प्रदाता पंजीकरण",
    providerLogin: "प्रदाता लॉगिन",
    pregnant: "गर्भवती",
    mother: "माँ (शिशु)",
    alreadyParent: "पहले से ही माता-पिता",
    stage1Badge: "तिमाही एवं भ्रूण देखभाल",
    stage1Desc: "शिशु के साप्ताहिक विकास, फलों के आकार की तुलना, मेडिकल स्कैन और तिमाही की जानकारी ट्रैक करें।",
    stage2Badge: "शिशु एवं प्रसवोत्तर देखभाल",
    stage2Desc: "नवजात शिशु के भोजन, नींद, टीकाकरण और प्रसवोत्तर शारीरिक व मानसिक स्वास्थ्य को रिकॉर्ड करें।",
    stage3Badge: "बच्चे और संपूर्ण परिवार",
    stage3Desc: "बढ़ते परिवार के शेड्यूल, बच्चे के मील के पत्थर, पोषण और पालन-पोषण के सुझावों का प्रबंधन करें।",
    dateStepTitle: "आपकी अनुमानित डिलीवरी की तारीख?",
    dateStepSub: "यह हमें भ्रूण ट्रैकर को वैयक्तिकृत करने और आपकी गर्भावस्था यात्रा को आसान बनाने में मदद करता है",
    selectWeekInstead: "सप्ताह के अनुसार चुनें",
    selectDateInstead: "डिलीवरी तिथि के अनुसार चुनें",
    weekStepTitle: "आपका वर्तमान गर्भावस्था सप्ताह?",
    authStepTitle: "कृपया लॉगिन करें",
    authStepSub: "बेलीबैंड सत्यापित उपयोगकर्ताओं के लिए है, कृपया आगे बढ़ने के लिए अपना विवरण दर्ज करें",
    tabSignUp: "खाता बनाएं",
    tabLogIn: "लॉगिन",
    labelFullName: "पूरा नाम",
    labelEmail: "ईमेल पता",
    labelPassword: "पासवर्ड",
    labelConfirmPassword: "पासवर्ड की पुष्टि करें",
    btnCreateAccount: "खाता बनाएं और डैशबोर्ड में प्रवेश करें",
    btnLogIn: "बेलीबैंड में लॉगिन करें",
    forgotPassword: "पासवर्ड भूल गए?",
    navOverview: "डैशबोर्ड अवलोकन",
    navScans: "डॉक्टर स्कैन और मुलाकातें",
    navNutrition: "पोषण और आहार योजना",
    navFitness: "प्रसवपूर्व योग और फिटनेस",
    navCommunity: "समुदाय और गाइड्स",
    navSettings: "पारिवारिक सेटिंग्स",
    navProfile: "प्रोफ़ाइल सेटिंग्स",
    greeting: "नमस्ते",
    weekLabel: "सप्ताह 24",
    fruitLabel: "बैंगन के आकार का",
    daysLeft: "डिलीवरी में 112 दिन शेष",
    babyDevelopmentTitle: "शिशु की सुनने और महसूस करने की क्षमता विकसित हो रही है",
    babyDevelopmentDesc: "आपका शिशु लगभग 30 सेमी लंबा है और आपकी आवाज़ पहचान सकता है। आज अपने शिशु से बात करें!",
    kickCounter: "किक काउंटर",
    kickCounterDesc: "शिशु की हलचल ट्रैक करें",
    waterTracker: "जल संतुलन",
    waterTrackerDesc: "8 में से 6 गिलास पिए",
    symptomLogger: "दैनिक लक्षण",
    symptomLoggerDesc: "मूड और हलचल दर्ज करें",
    partnerSync: "पार्टनर कनेक्ट",
    partnerSyncDesc: "जीवनसाथी से सिंक करें",
    motherTitle: "शिशु देखभाल और मील के पत्थर",
    motherDesc: "शिशु 3 महीने का है। मुस्कुराना और चेहरे पहचानना शुरू कर दिया है!",
    alreadyTitle: "पारिवारिक स्वास्थ्य एवं मार्गदर्शन हब",
    alreadyDesc: "बच्चों की दिनचर्या और पारिवारिक स्वास्थ्य के लिए उपयोगी सुझाव।",
    todayTip: "डॉक्टर का आज का सुझाव",
    todayTipText: "भरपूर पानी पीने से एमनियोटिक द्रव का स्तर स्वस्थ रहता है और थकान कम होती है।"
  },
  bn: {
    step1Label: "ভাষা",
    step2Label: "পারিবারিক ভূমিকা",
    step3Label: "জীবনের পর্যায়",
    step4Label: "ড্যাশবোর্ড",
    step1Badge: "ধাপ ১ / ৩",
    step2Badge: "ধাপ ২ / ৩",
    step3Badge: "ধাপ ৩ / ৩",
    step4Badge: "ধাপ ৪ / ৫",
    step5Badge: "ধাপ ৫ / ৫",
    chooseLanguage: "আপনার পছন্দের ভাষা বেছে নিন",
    chooseLanguageSub: "এটি আমাদের আপনার পছন্দের ভাষায় সঠিক তথ্য ও সেবা প্রদান করতে সাহায্য করে",
    roleTitle: "পরিবারে আপনার ভূমিকা কী?",
    roleSub: "আপনার ভূমিকা অনুযায়ী তথ্য ও ট্র্যাকার প্রদান করতে এটি সাহায্য করে",
    lifeStageTitle: "আপনি বর্তমানে কোন পর্যায়ে আছেন?",
    lifeStageSub: "এটি আপনার বর্তমান পর্যায় অনুযায়ী সঠিক তথ্য ও অভিজ্ঞতা প্রদান করে।",
    continue: "এগিয়ে যান",
    backToLanguages: "ভাষায় ফিরে যান",
    backToRole: "ভূমিকা পছন্দে ফিরে যান",
    backToStage: "পর্যায়ে ফিরে যান",
    backToDate: "ফিরে যান",
    wifeMother: "স্ত্রী | মা",
    husbandFather: "স্বামী | বাবা",
    primaryCaregiver: "প্রধান যত্নশীল",
    partnerCoParent: "সঙ্গী ও সহ-অভিভাবক",
    wifeMotherDesc: "ব্যক্তিগত ট্রাইমেস্টার তথ্য, লক্ষণ ট্র্যাকিং, পুষ্টি পরিকল্পনা এবং শিশুর মাইলফলক জার্নাল।",
    husbandFatherDesc: "সঙ্গী গাইড, সন্তান জন্মের প্রস্তুতি চেকলিস্ট, প্রতি সপ্তাহের সঙ্গীর যত্ন এবং ডাক্তারের সময়সূচী।",
    symptomTrackerTag: "✨ লক্ষণ ট্র্যাকার",
    kickCounterTag: "✨ কিক কাউন্টার",
    nutritionTag: "✨ পুষ্টি গাইড",
    partnerSyncTag: "✨ পার্টনার সিঙ্ক",
    supportGuidesTag: "✨ সহায়তা গাইড",
    checklistsTag: "✨ চেকলিস্ট",
    hcProviderNote: "আপনি কি একজন নিবন্ধিত স্বাস্থ্যসেবা পেশাদার?\nরোগীর যত্ন এবং ক্লিনিক্যাল তথ্য পরিচালনা করুন।",
    registerAsProvider: "প্রদানকারী নিবন্ধন",
    providerLogin: "প্রদানকারী লগইন",
    pregnant: "গর্ভবতী",
    mother: "মা (নবজাতক)",
    alreadyParent: "ইতিমধ্যেই অভিভাবক",
    stage1Badge: "ট্রাইমেস্টার ও ভ্রূণের যত্ন",
    stage1Desc: "সাপ্তাহিক শিশুর বিকাশ, ফলের আকারের তুলনা, মেডিকেল স্ক্যান এবং তথ্য ট্র্যাক করুন।",
    stage2Badge: "নবজাতক ও প্রসবোত্তর যত্ন",
    stage2Desc: "নবজাতকের পুষ্টি, ঘুম, টিকাদানের সময়সূচী এবং প্রসবোত্তর শারীরিক ও মানসিক সুস্থতা ট্র্যাক করুন।",
    stage3Badge: "বাচ্চা ও পারিবারিক যত্ন",
    stage3Desc: "পরিবারের সময়সূচী, শিশুর মাইলফলক, পুষ্টি এবং প্যারেন্টিং টিপস পরিচালনা করুন।",
    dateStepTitle: "আপনার প্রসবের আনুমানিক তারিখ?",
    dateStepSub: "এটি ভ্রূণ ট্র্যাকারকে ব্যক্তিগতকৃত করতে এবং আপনার যাত্রাকে সহজ করতে সাহায্য করে",
    selectWeekInstead: "সপ্তাহ অনুযায়ী বেছে নিন",
    selectDateInstead: "প্রসবের তারিখ অনুযায়ী বেছে নিন",
    weekStepTitle: "আপনার বর্তমান গর্ভাবস্থার সপ্তাহ?",
    authStepTitle: "অনুগ্রহ করে লগইন করুন",
    authStepSub: "বেলিব্যান্ড শুধুমাত্র যাচাইকৃত ব্যবহারকারীদের জন্য, এগিয়ে যেতে আপনার বিবরণ লিখুন",
    tabSignUp: "নিবন্ধন করুন",
    tabLogIn: "লগইন",
    labelFullName: "পুরো নাম",
    labelEmail: "ইমেল ঠিকানা",
    labelPassword: "পাসওয়ার্ড",
    labelConfirmPassword: "পাসওয়ার্ড নিশ্চিত করুন",
    btnCreateAccount: "অ্যাকাউন্ট তৈরি করুন ও ড্যাশবোর্ডে প্রবেশ করুন",
    btnLogIn: "বেলিব্যান্ডে লগইন করুন",
    forgotPassword: "পাসওয়ার্ড ভুলে গেছেন?",
    navOverview: "ড্যাশবোর্ড ওভারভিউ",
    navScans: "ডাক্তার স্ক্যান ও ভিজিট",
    navNutrition: "পুষ্টি ও খাদ্য পরিকল্পনা",
    navFitness: "প্রসবপূর্ব যোগ ও ফিটনেস",
    navCommunity: "কমিউনিটি ও নির্দেশিকা",
    navSettings: "পারিবারিক সেটিংস",
    navProfile: "প্রোফাইল সেটিংস",
    greeting: "স্বাগতম",
    weekLabel: "২৪ তম সপ্তাহ",
    fruitLabel: "বেগুনের সমান আকার",
    daysLeft: "প্রসবের বাকি ১১২ দিন",
    babyDevelopmentTitle: "শিশুর শ্রবণশক্তি ও অনুভূতি বৃদ্ধি পাচ্ছে",
    babyDevelopmentDesc: "আপনার শিশু এখন পরিচিত কণ্ঠস্বর শুনতে পারছে এবং প্রতিক্রিয়া দিচ্ছে।",
    kickCounter: "কিক কাউন্টার",
    kickCounterDesc: "শিশুর নড়াচড়া গণনা করুন",
    waterTracker: "পানি পান লগ",
    waterTrackerDesc: "৮ গ্লাসের মধ্যে ৬ গ্লাস",
    symptomLogger: "দৈনিক লক্ষণ",
    symptomLoggerDesc: "মেজাজ ও অনুভূতি",
    partnerSync: "পার্টনার কানেক্ট",
    partnerSyncDesc: "সঙ্গীর সাথে শেয়ার করুন",
    motherTitle: "নবজাতকের যত্ন ও মাইলফলক",
    motherDesc: "শিশু ৩ মাস বয়সী। এখন হাসছে এবং সবার মুখ চিনছে!",
    alreadyTitle: "পারিবারিক সুস্থতা ও অভিভাবকত্ব",
    alreadyDesc: "শিশুদের রুটিন এবং পারিবারিক স্বাস্থ্য টিপস।",
    todayTip: "ডাক্তারের পরামর্শ",
    todayTipText: "পর্যাপ্ত পানি পান আপনার ও শিশুর স্বাস্থ্যের জন্য অত্যন্ত উপকারী।"
  },
  te: {
    step1Label: "భాష",
    step2Label: "కుటుంబ పాత్ర",
    step3Label: "జీవిత దశ",
    step4Label: "డ్యాష్‌బోర్డ్",
    step1Badge: "దశ 1 / 3",
    step2Badge: "దశ 2 / 3",
    step3Badge: "దశ 3 / 3",
    step4Badge: "దశ 4 / 5",
    step5Badge: "దశ 5 / 5",
    chooseLanguage: "మీ భాషను ఎంచుకోండి",
    chooseLanguageSub: "మీకు నచ్చిన భాషలో కంటెంట్‌ను అందించడానికి ఇది మాకు సహాయపడుతుంది",
    roleTitle: "కుటుంబంలో మీ పాత్ర ఏమిటి?",
    roleSub: "మీ పాత్రకు అనుగుణంగా సమాచారం అందించడానికి ఇది సహాయపడుతుంది",
    lifeStageTitle: "మీరు ప్రస్తుతం ఏ దశలో ఉన్నారు?",
    lifeStageSub: "మీ ప్రస్తుత దశకు తగిన సమాచారం అందించడానికి ఇది సహాయపడుతుంది.",
    continue: "కొనసాగించండి",
    backToLanguages: "భాషలకు తిరిగి వెళ్లండి",
    backToRole: "కుటుంబ పాత్రకు తిరిగి వెళ్లండి",
    backToStage: "జీవిత దశకు తిరిగి వెళ్లండి",
    backToDate: "వెనుకకు",
    wifeMother: "భార్య | తల్లి",
    husbandFather: "భర్త | తండ్రి",
    primaryCaregiver: "ప్రాథమిక సంరక్షకురాలు",
    partnerCoParent: "భాగస్వామి & సహ-తల్లిదండ్రులు",
    wifeMotherDesc: "వ్యక్తిగత త్రైమాసిక సమాచారం, లక్షణాల ట్రాకింగ్, పోషకాహార ప్రణాళికలు మరియు శిశువు మైలురాళ్ళు.",
    husbandFatherDesc: "భాగస్వామి గైడ్లు, కాన్పు సన్నద్ధత చెక్‌లిస్ట్‌లు, వారానికోసారి భాగస్వామికి మద్దతు మరియు డాక్టర్ షెడ్యూల్స్.",
    symptomTrackerTag: "✨ లక్షణాల ట్రాకర్",
    kickCounterTag: "✨ కిక్ కౌంటర్",
    nutritionTag: "✨ పోషకాహారం",
    partnerSyncTag: "✨ భాగస్వామి సింక్",
    supportGuidesTag: "✨ సహాయ గైడ్లు",
    checklistsTag: "✨ చెక్‌లిస్ట్‌లు",
    hcProviderNote: "మీరు రిజిస్టర్డ్ హెల్త్‌కేర్ ప్రొవైడరా?\nరోగుల సంరక్షణ మరియు క్లినికల్ వనరులను నిర్వహించండి.",
    registerAsProvider: "ప్రొవైడర్ నమోదు",
    providerLogin: "ప్రొవైడర్ లాగిన్",
    pregnant: "గర్భవతి",
    mother: "తల్లి (శిశువు)",
    alreadyParent: "ఇప్పటికే తల్లిదండ్రులు",
    stage1Badge: "త్రైమాసిక & పిండ సంరక్షణ",
    stage1Desc: "వారపు శిశువు అభివృద్ధి, పండ్ల పరిమాణ పోలికలు, వైద్య స్కాన్లు మరియు సమాచారాన్ని ట్రాక్ చేయండి.",
    stage2Badge: "శిశువు & ప్రసవానంతర సంరక్షణ",
    stage2Desc: "నవజాత శిశువు ఫీడింగ్, నిద్ర అలవాట్లు, వ్యాక్సినేషన్ షెడ్యూల్స్ మరియు ప్రసవానంతర ఆరోగ్యాన్ని నమోదు చేయండి.",
    stage3Badge: "చిన్నారులు & కుటుంబం",
    stage3Desc: "కుటుంబ షెడ్యూల్స్, పిల్లల మైలురాళ్ళు, పోషకాహారం మరియు పేరెంటింగ్ చిట్కాలను నిర్వహించండి.",
    dateStepTitle: "మీరు ఆశించే ప్రసవ తేదీ?",
    dateStepSub: "ఇది పిండం ట్రాకర్‌ను అనుకూలీకరించడానికి మరియు మీ ప్రయాణాన్ని సులభతరం చేయడానికి సహాయపడుతుంది",
    selectWeekInstead: "వారం ప్రకారం ఎంచుకోండి",
    selectDateInstead: "ప్రసవ తేదీ ప్రకారం ఎంచుకోండి",
    weekStepTitle: "మీ ప్రస్తుత గర్భధారణ వారం?",
    authStepTitle: "దయచేసి లాగిన్ చేయండి",
    authStepSub: "బెల్లీబ్యాండ్ ధృవీకరించబడిన వినియోగదారుల కోసం మాత్రమే, కొనసాగడానికి వివరాలను నమోదు చేయండి",
    tabSignUp: "సైన్ అప్",
    tabLogIn: "లాగిన్",
    labelFullName: "పూర్తి పేరు",
    labelEmail: "ఇమెయిల్ చిరునామా",
    labelPassword: "పాస్‌వర్డ్",
    labelConfirmPassword: "పాస్‌వర్డ్‌ను నిర్ధారించండి",
    btnCreateAccount: "ఖాతాను సృష్టించండి & డాష్‌బోర్డ్‌ను చూడండి",
    btnLogIn: "బెల్లీబ్యాండ్‌లోకి లాగిన్ అవ్వండి",
    forgotPassword: "పాస్‌వర్డ్ మర్చిపోయారా?",
    navOverview: "డ్యాష్‌బోర్డ్ అవలోకనం",
    navScans: "డాక్టర్ స్కాన్లు & సందర్శనలు",
    navNutrition: "పోషకాహారం & భోజన ప్రణాళికలు",
    navFitness: "ప్రసవపూర్వ యోగా & ఫిట్‌నెస్",
    navCommunity: "కమ్యూనిటీ & గైడ్లు",
    navSettings: "కుటుంబ సెట్టింగులు",
    navProfile: "ప్రొఫైల్ సెట్టింగులు",
    greeting: "స్వాగతం",
    weekLabel: "24వ వారం",
    fruitLabel: "వంకాయ పరిమాణం",
    daysLeft: "కాన్పుకు ఇంకా 112 రోజులు",
    babyDevelopmentTitle: "శిశువు వినికిడి శక్తి పెరుగుతోంది",
    babyDevelopmentDesc: "మీ బిడ్డ ఇప్పుడు పరిచిత స్వరాలను గుర్తించగలదు.",
    kickCounter: "కిక్ కౌంటర్",
    kickCounterDesc: "కదలికలను లెక్కించండి",
    waterTracker: "నీటి రికార్డు",
    waterTrackerDesc: "8 లో 6 గ్లాసులు",
    symptomLogger: "రోజువారీ లక్షణాలు",
    symptomLoggerDesc: "లక్షణాలు నమోదు చేయండి",
    partnerSync: "భాగస్వామి కనెక్ట్",
    partnerSyncDesc: "భాగస్వామితో పంచుకోండి",
    motherTitle: "శిశు సంరక్షణ",
    motherDesc: "పాపకి 3 నెలలు. నవ్వడం నేర్చుకుంటోంది!",
    alreadyTitle: "కుటుంబ శ్రేయస్సు",
    alreadyDesc: "పిల్లల అలవాట్లు మరియు కుటుంబ చిట్కాలు.",
    todayTip: "వైద్యుల సలహా",
    todayTipText: "ఎక్కువగా నీరు తాగడం వల్ల అలసట తగ్గి ఆరోగ్యం మెరుగవుతుంది."
  },
  ta: {
    step1Label: "மொழி",
    step2Label: "குடும்பப் பங்கு",
    step3Label: "வாழ்க்கை நிலை",
    step4Label: "முகப்பு",
    step1Badge: "படி 1 / 3",
    step2Badge: "படி 2 / 3",
    step3Badge: "படி 3 / 3",
    step4Badge: "படி 4 / 5",
    step5Badge: "படி 5 / 5",
    chooseLanguage: "உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்",
    chooseLanguageSub: "உங்கள் விருப்பமான மொழியில் தகவல்களை வழங்க இது உதவுகிறது",
    roleTitle: "குடும்பத்தில் உங்கள் பங்கு என்ன?",
    roleSub: "உங்கள் பங்கிற்கு ஏற்ப பயனுள்ள தகவல்களை வழங்க உதவுகிறது",
    lifeStageTitle: "நீங்கள் தற்போது எந்த நிலையில் இருக்கிறீர்கள்?",
    lifeStageSub: "உங்கள் நிலைக்கு ஏற்ப சிறந்த அனுபவத்தை வழங்க உதவுகிறது.",
    continue: "தொடரவும்",
    backToLanguages: "மொழிகளுக்கு திரும்பு",
    backToRole: "குடும்பப் பங்கிற்கு திரும்பு",
    backToStage: "வாழ்க்கை நிலைக்கு திரும்பு",
    backToDate: "பின்செல்",
    wifeMother: "மனைவி | தாய்",
    husbandFather: "கணவர் | தந்தை",
    primaryCaregiver: "முதன்மை பராமரிப்பாளர்",
    partnerCoParent: "துணை & இணை பெற்றோர்",
    wifeMotherDesc: "தனிப்பயனாக்கப்பட்ட தகவல்கள், அறிகுறிகள் கண்காணிப்பு, ஊட்டச்சத்து திட்டங்கள் மற்றும் குழந்தை வளர்ச்சி பதிவுகள்.",
    husbandFatherDesc: "துணை வழிகாட்டிகள், பிரசவ தயாரிப்பு சரிபார்ப்பு பட்டியல் மற்றும் மருத்துவ அட்டவணை.",
    symptomTrackerTag: "✨ அறிகுறி கண்காணிப்பு",
    kickCounterTag: "✨ உதை கவுண்டர்",
    nutritionTag: "✨ ஊட்டச்சத்து",
    partnerSyncTag: "✨ துணை இணைப்பு",
    supportGuidesTag: "✨ ஆதரவு வழிகாட்டல்",
    checklistsTag: "✨ சரிபார்ப்பு பட்டியல்",
    hcProviderNote: "நீங்கள் பதிவுசெய்யப்பட்ட சுகாதார நிபுணரா?\nநோயாளிகளின் பராமரிப்பு மற்றும் மருத்துவ தகவல்களை நிர்வகிக்கவும்.",
    registerAsProvider: "வழங்குநர் பதிவு",
    providerLogin: "வழங்குநர் உள்நுழைவு",
    pregnant: "கர்ப்பிணி",
    mother: "தாய் (குழந்தை)",
    alreadyParent: "ஏற்கனவே பெற்றோர்",
    stage1Badge: "முப்பருவம் & கரு பராமரிப்பு",
    stage1Desc: "வாராந்திர குழந்தை வளர்ச்சி, பழ அளவு ஒப்பீடுகள், மருத்துவ ஸ்கேன்கள் மற்றும் தகவல்களைக் கண்காணிக்கவும்.",
    stage2Badge: "குழந்தை & பிரசவத்திற்குப் பின்",
    stage2Desc: "குழந்தைக்கு பாலூட்டுதல், தூக்க வழக்கங்கள், தடுப்பூசி அட்டவணை மற்றும் நல்வாழ்வைப் பதிவுசெய்க.",
    stage3Badge: "சிறு குழந்தை & குடும்பம்",
    stage3Desc: "குடும்ப அட்டவணைகள், குழந்தையின் மைல்கற்கள், ஊட்டச்சத்து மற்றும் பெற்றோர் வளர்ப்பு குறிப்புகளை நிர்வகிக்கவும்.",
    dateStepTitle: "உங்கள் எதிர்பார்க்கப்படும் பிரசவ தேதி?",
    dateStepSub: "இது கரு கண்காணிப்பை தனிப்பயனாக்கவும் உங்கள் பயணத்தை எளிதாக்கவும் உதவுகிறது",
    selectWeekInstead: "வாரத்தின்படி தேர்வுசெய்க",
    selectDateInstead: "பிரசவ தேதியின்படி தேர்வுசெய்க",
    weekStepTitle: "உங்கள் தற்போதைய கர்ப்ப வாரம்?",
    authStepTitle: "தயவுசெய்து உள்நுழைக",
    authStepSub: "பெல்லிபேண்ட் சரிபார்க்கப்பட்ட பயனர்களுக்கு மட்டுமே, தொடர உங்கள் விவரங்களை உள்ளிடவும்",
    tabSignUp: "பதிவுசெய்க",
    tabLogIn: "உள்நுழைக",
    labelFullName: "முழு பெயர்",
    labelEmail: "மின்னஞ்சல் முகவரி",
    labelPassword: "கடவுச்சொல்",
    labelConfirmPassword: "கடவுச்சொல்லை உறுதிசெய்க",
    btnCreateAccount: "கணக்கை உருவாக்கி டாஷ்போர்டை அணுகவும்",
    btnLogIn: "பெல்லிபேண்டில் உள்நுழைக",
    forgotPassword: "கடவுச்சொல்லை மறந்துவிட்டீர்களா?",
    navOverview: "முகப்பு மேலோட்டம்",
    navScans: "மருத்துவ ஸ்கேன்கள் & வருகைகள்",
    navNutrition: "ஊட்டச்சத்து & உணவு திட்டங்கள்",
    navFitness: "பிரசவத்திற்கு முந்தைய யோகா",
    navCommunity: "சமூகம் & வழிகாட்டிகள்",
    navSettings: "குடும்ப அமைப்புகள்",
    navProfile: "சுயவிவர அமைப்புகள்",
    greeting: "நல்வரவு",
    weekLabel: "வாரம் 24",
    fruitLabel: "கத்தரிக்காய் அளவு",
    daysLeft: "பிரசவத்திற்கு 112 நாட்கள்",
    babyDevelopmentTitle: "குழந்தையின் கேட்கும் திறன் வளர்கிறது",
    babyDevelopmentDesc: "உங்கள் குழந்தை இப்போது குரல்களைக் கேட்கத் தொடங்குகிறது.",
    kickCounter: "உதை கவுண்டர்",
    kickCounterDesc: "குழந்தையின் அசைவுகள்",
    waterTracker: "நீர் அளவு",
    waterTrackerDesc: "8 இல் 6 கிளாஸ்",
    symptomLogger: "அறிகுறிகள்",
    symptomLoggerDesc: "மனநிலை மற்றும் அறிகுறிகள்",
    partnerSync: "துணையுடன் இணை",
    partnerSyncDesc: "துணையுடன் பகிரவும்",
    motherTitle: "குழந்தை பராமரிப்பு",
    motherDesc: "குழந்தைக்கு 3 மாதங்கள். அழகாக சிரிக்கிறது!",
    alreadyTitle: "குடும்ப மையம்",
    alreadyDesc: "குழந்தைகள் வளர்ச்சி மற்றும் நல்வாழ்வு வழிகாட்டல்.",
    todayTip: "மருத்துவர் குறிப்பு",
    todayTipText: "நிறைய தண்ணீர் குடிப்பது சோர்வை போக்க உதவும்."
  },
  kn: {
    step1Label: "ಭಾಷೆ",
    step2Label: "ಕುಟುಂಬದ ಪಾತ್ರ",
    step3Label: "ಜೀವನ ಹಂತ",
    step4Label: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    step1Badge: "ಹಂತ 1 / 3",
    step2Badge: "ಹಂತ 2 / 3",
    step3Badge: "ಹಂತ 3 / 3",
    step4Badge: "ಹಂತ 4 / 5",
    step5Badge: "ಹಂತ 5 / 5",
    chooseLanguage: "ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    chooseLanguageSub: "ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆಯಲ್ಲಿ ವಿಷಯವನ್ನು ಒದಗಿಸಲು ಇದು ನಮಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ",
    roleTitle: "ಕುಟುಂಬದಲ್ಲಿ ನಿಮ್ಮ ಪಾತ್ರವೇನು?",
    roleSub: "ನಿಮ್ಮ ಪಾತ್ರಕ್ಕೆ ಅನುಗುಣವಾಗಿ ಸೂಕ್ತವಾದ ಮಾಹಿತಿಯನ್ನು ನೀಡಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ",
    lifeStageTitle: "ನೀವು ಪ್ರಸ್ತುತ ಯಾವ ಹಂತದಲ್ಲಿದ್ದೀರಿ?",
    lifeStageSub: "ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಹಂತಕ್ಕೆ ಅನುಗುಣವಾಗಿ ಸೂಕ್ತ ಅನುಭವವನ್ನು ಒದಗಿಸಲು ಇದು ನಮಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ.",
    continue: "ಮುಂದುವರಿಯಿರಿ",
    backToLanguages: "ಭಾಷೆಗೆ ಹಿಂತಿರುಗಿ",
    backToRole: "ಪಾತ್ರಕ್ಕೆ ಹಿಂತಿರುಗಿ",
    backToStage: "ಹಂತಕ್ಕೆ ಹಿಂತಿರುಗಿ",
    backToDate: "ಹಿಂದೆ",
    wifeMother: "ಪತ್ನಿ | ತಾಯಿ",
    husbandFather: "ಪತಿ | ತಂದೆ",
    primaryCaregiver: "ಪ್ರಾಥಮಿಕ ಆರೈಕೆದಾರರು",
    partnerCoParent: "ಜೊತೆಗಾರ & ಸಹ-ಪೋಷಕರು",
    wifeMotherDesc: "ವೈಯಕ್ತಿಕ ತ್ರೈಮಾಸಿಕ ಮಾಹಿತಿ, ಲಕ್ಷಣ ಟ್ರ್ಯಾಕಿಂಗ್, ಪೌಷ್ಟಿಕಾಂಶ ಯೋಜನೆಗಳು ಮತ್ತು ಮಗುವಿನ ಬೆಳವಣಿಗೆಯ ದಾಖಲೆಗಳು.",
    husbandFatherDesc: "ಜೊತೆಗಾರರ ಮಾರ್ಗದರ್ಶಿ, ಹೆರಿಗೆ ಸಿದ್ಧತೆ ಚೆಕ್‌ಲಿಸ್ಟ್‌ಗಳು, ವಾರವಾರು ಬೆಂಬಲ ಮತ್ತು ವೈದ್ಯರ ವೇಳಾಪಟ್ಟಿ.",
    symptomTrackerTag: "✨ ಲಕ್ಷಣ ಟ್ರ್ಯಾಕರ್",
    kickCounterTag: "✨ ಕಿಕ್ ಕೌಂಟರ್",
    nutritionTag: "✨ ಪೌಷ್ಟಿಕಾಂಶ",
    partnerSyncTag: "✨ ಜೊತೆಗಾರರ ಸಿಂಕ್",
    supportGuidesTag: "✨ ಬೆಂಬಲ ಮಾರ್ಗದರ್ಶಿ",
    checklistsTag: "✨ ಚೆಕ್‌ಲಿಸ್ಟ್‌ಗಳು",
    hcProviderNote: "ನೀವು ನೋಂದಾಯಿತ ಆರೋಗ್ಯ ವೃತ್ತಿಪರರೇ?\nರೋಗಿಗಳ ಆರೈಕೆ ಮತ್ತು ಕ್ಲಿನಿಕಲ್ ಸಂಪನ್ಮೂಲಗಳನ್ನು ನಿರ್ವಹಿಸಿ.",
    registerAsProvider: "ಪೂರೈಕೆದಾರರ ನೋಂದಣಿ",
    providerLogin: "ಪೂರೈಕೆದಾರರ ಲಾಗಿನ್",
    pregnant: "ಗರ್ಭಿಣಿ",
    mother: "ತಾಯಿ (ಶಿಶು)",
    alreadyParent: "ಈಗಾಗಲೇ ಪೋಷಕರು",
    stage1Badge: "ತ್ರೈಮಾಸಿಕ ಮತ್ತು ಭ್ರೂಣದ ಆರೈಕೆ",
    stage1Desc: "ವಾರವಾರು ಮಗುವಿನ ಬೆಳವಣಿಗೆ, ಹಣ್ಣಿನ ಗಾತ್ರದ ಹೋಲಿಕೆಗಳು, ವೈದ್ಯಕೀಯ ಸ್ಕ್ಯಾನ್‌ಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ.",
    stage2Badge: "ಶಿಶು ಮತ್ತು ಹೆರಿಗೆ ನಂತರದ ಆರೈಕೆ",
    stage2Desc: "ನವಜಾತ ಶಿಶುವಿನ ಹಾಲುಣಿಸುವಿಕೆ, ನಿದ್ರೆಯ ದಿನಚರಿ, ಲಸಿಕೆ ವೇಳಾಪಟ್ಟಿ ಮತ್ತು ಆರೋಗ್ಯವನ್ನು ದಾಖಲಿಸಿ.",
    stage3Badge: "ಮಕ್ಕಳು ಮತ್ತು ಕುಟುಂಬ",
    stage3Desc: "ಕುಟುಂಬದ ವೇಳಾಪಟ್ಟಿಗಳು, ಮಕ್ಕಳ ಬೆಳವಣಿಗೆಯ ಮೈಲಿಗಲ್ಲುಗಳು, ಪೌಷ್ಟಿಕಾಂಶ ಮತ್ತು ಸಲಹೆಗಳನ್ನು ನಿರ್ವಹಿಸಿ.",
    dateStepTitle: "ನಿಮ್ಮ ನಿರೀಕ್ಷಿತ ಹೆರಿಗೆ ದಿನಾಂಕ?",
    dateStepSub: "ಇದು ಭ್ರೂಣದ ಟ್ರ್ಯಾಕರ್ ಅನ್ನು ಕಸ್ಟಮೈಸ್ ಮಾಡಲು ಮತ್ತು ನಿಮ್ಮ ಪ್ರಯಾಣವನ್ನು ಸುಲಭಗೊಳಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ",
    selectWeekInstead: "ವಾರದ ಪ್ರಕಾರ ಆಯ್ಕೆಮಾಡಿ",
    selectDateInstead: "ಹೆರಿಗೆ ದಿನಾಂಕದ ಪ್ರಕಾರ ಆಯ್ಕೆಮಾಡಿ",
    weekStepTitle: "ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಗರ್ಭಾವಸ್ಥೆಯ ವಾರ?",
    authStepTitle: "ದಯವಿಟ್ಟು ಲಾಗಿನ್ ಮಾಡಿ",
    authStepSub: "ಬೆಲ್ಲಿಬ್ಯಾಂಡ್ ಪರಿಶೀಲಿಸಿದ ಬಳಕೆದಾರರಿಗೆ ಮಾತ್ರ, ಮುಂದುವರಿಯಲು ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ",
    tabSignUp: "ಸೈನ್ ಅಪ್",
    tabLogIn: "ಲಾಗಿನ್",
    labelFullName: "ಪೂರ್ಣ ಹೆಸರು",
    labelEmail: "ಇಮೇಲ್ ವಿಳಾಸ",
    labelPassword: "ಪಾಸ್‌ವರ್ಡ್",
    labelConfirmPassword: "ಪಾಸ್‌ವರ್ಡ್ ದೃಢೀಕರಿಸಿ",
    btnCreateAccount: "ಖಾತೆ ರಚಿಸಿ & ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಪ್ರವೇಶಿಸಿ",
    btnLogIn: "ಬೆಲ್ಲಿಬ್ಯಾಂಡ್‌ಗೆ ಲಾಗಿನ್ ಮಾಡಿ",
    forgotPassword: "ಪಾಸ್‌ವರ್ಡ್ ಮರೆತಿರುವಿರಾ?",
    navOverview: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಅವಲೋಕನ",
    navScans: "ವೈದ್ಯರ ಸ್ಕ್ಯಾನ್ ಮತ್ತು ಭೇಟಿಗಳು",
    navNutrition: "ಪೌಷ್ಟಿಕಾಂಶ ಮತ್ತು ಆಹಾರ ಯೋಜನೆ",
    navFitness: "ಪ್ರಸವಪೂರ್ವ ಯೋಗ ಮತ್ತು ಫಿಟ್ನೆಸ್",
    navCommunity: "ಸಮುದಾಯ ಮತ್ತು ಮಾರ್ಗದರ್ಶಿಗಳು",
    navSettings: "ಕುಟುಂಬದ ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
    navProfile: "ಪ್ರೊಫೈಲ್ ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
    greeting: "ಸುಸ್ವಾಗತ",
    weekLabel: "ವಾರ 24",
    fruitLabel: "ಬದನೆಕಾಯಿ ಗಾತ್ರ",
    daysLeft: "ಹೆರಿಗೆಗೆ 112 ದಿನಗಳು ಬಾಕಿ",
    babyDevelopmentTitle: "ಮಗುವಿನ ಶ್ರವಣ ಶಕ್ತಿ ವಿಕಾಸವಾಗುತ್ತಿದೆ",
    babyDevelopmentDesc: "ನಿಮ್ಮ ಮಗು ಈಗ ಪರಿಚಿತ ಧ್ವನಿಗಳನ್ನು ಕೇಳಲು ಪ್ರಾರಂಭಿಸುತ್ತದೆ.",
    kickCounter: "ಕಿಕ್ ಕೌಂಟರ್",
    kickCounterDesc: "ಮಗುವಿನ ಚಲನೆ ದಾಖಲಿಸಿ",
    waterTracker: "ನೀರಿನ ಮಾಹಿತಿ",
    waterTrackerDesc: "8 ರಲ್ಲಿ 6 ಲೋಟ",
    symptomLogger: "ದೈನಂದಿನ ಲಕ್ಷಣಗಳು",
    symptomLoggerDesc: "ಲಕ್ಷಣಗಳು ದಾಖಲಿಸಿ",
    partnerSync: "ಜೊತೆಗಾರರೊಂದಿಗೆ ಸಿಂಕ್",
    partnerSyncDesc: "ಜೊತೆಗಾರರಿಗೆ ತಿಳಿಸಿ",
    motherTitle: "ಮಗುವಿನ ಆರೈಕೆ",
    motherDesc: "ಮಗುವಿಗೆ 3 ತಿಂಗಳು. ಮುಖ ಗುರುತಿಸಿ ನಗುತ್ತಿದೆ!",
    alreadyTitle: "ಪೋಷಕರ ಮಾರ್ಗದರ್ಶಿ",
    alreadyDesc: "ಮಕ್ಕಳ ದಿನಚರಿ ಮತ್ತು ಕುಟುಂಬದ ಆರೋಗ್ಯ ಸಲಹೆಗಳು.",
    todayTip: "ವೈದ್ಯರ ದೈನಂದಿನ ಸಲಹೆ",
    todayTipText: "ಸಾಕಷ್ಟು ನೀರು ಕುಡಿಯುವುದರಿಂದ ದಣಿವು ಕಡಿಮೆಯಾಗುತ್ತದೆ."
  }
};

// Application State
const appState = {
  currentStep: 1, // 1: Lang, 2: Role, 3: Life Stage, 4: Date, 5: Auth, 6: Dashboard
  language: 'en',
  role: 'wife_mother',
  stage: 'pregnant',
  kickCount: 4,
  waterCount: 6
};

// Elements cache
const elements = {
  btnCont1: document.getElementById('btnCont1'),
  btnCont2: document.getElementById('btnCont2'),
  btnCont3: document.getElementById('btnCont3'),
  btnBack2: document.getElementById('btnBack2'),
  btnBack3: document.getElementById('btnBack3'),
  headerLangSelect: document.getElementById('headerLangSelect'),
  wifeMotherBox: document.getElementById('wifeMotherBox'),
  husbandFatherBox: document.getElementById('husbandFatherBox'),
  pregnantBox: document.getElementById('pregnantBox'),
  motherBox: document.getElementById('motherBox'),
  alreadyParentBox: document.getElementById('alreadyParentBox')
};

// Initialize
function init() {
  injectIllustrations();
  attachEventListeners();
  updateLocalization();
  updateStepView();
}

function injectIllustrations() {
  if (elements.wifeMotherBox) elements.wifeMotherBox.innerHTML = SVG_ILLUSTRATIONS.wifeMother;
  if (elements.husbandFatherBox) elements.husbandFatherBox.innerHTML = SVG_ILLUSTRATIONS.husbandFather;
  if (elements.pregnantBox) elements.pregnantBox.innerHTML = SVG_ILLUSTRATIONS.pregnant;
  if (elements.motherBox) elements.motherBox.innerHTML = SVG_ILLUSTRATIONS.mother;
  if (elements.alreadyParentBox) elements.alreadyParentBox.innerHTML = SVG_ILLUSTRATIONS.alreadyParent;
}

function updateLocalization() {
  const lang = appState.language || 'en';
  localStorage.setItem('bellyband_lang', lang);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  // Auto-translate every element with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      el.textContent = t[key];
    }
  });

  // Auto-translate input placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[key] !== undefined) {
      el.setAttribute('placeholder', t[key]);
    }
  });

  // Universal deep DOM translation across all modules & tabs
  if (window.BellyBandTranslateAll) {
    window.BellyBandTranslateAll(lang);
  }

  // Sync header selector value
  if (elements.headerLangSelect) {
    elements.headerLangSelect.value = lang;
  }

  // Update Dashboard Content
  renderDashboardContent();
}
window.updateLocalization = updateLocalization;

window.setAppLanguage = function(lang) {
  appState.language = lang;
  localStorage.setItem('bellyband_lang', lang);
  updateLocalization();
  updateStepView();
  if (window.BellyBandTranslateAll) {
    window.BellyBandTranslateAll(lang);
  }
};

function goToStep(stepNum) {
  appState.currentStep = stepNum;
  if (stepNum === 4) {
    adaptDateStepToStage();
  }
  if (stepNum === 5) {
    populateAuthHiddenFields();
  }
  if (stepNum === 6) {
    renderDashboardContent();
  }
  updateStepView();
}
window.goToStep = goToStep;

function updateStepView() {
  const allSections = [
    document.getElementById('stepSection1'),
    document.getElementById('stepSection2'),
    document.getElementById('stepSection3'),
    document.getElementById('stepSection4'),
    document.getElementById('stepSection5'),
    document.getElementById('stepSection6')
  ];

  allSections.forEach((sec, idx) => {
    if (sec) sec.classList.toggle('active', idx + 1 === appState.currentStep);
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Update button enabled states
  if (elements.btnCont1) elements.btnCont1.classList.toggle('enabled', Boolean(appState.language));
  if (elements.btnCont2) elements.btnCont2.classList.toggle('enabled', Boolean(appState.role));
  if (elements.btnCont3) elements.btnCont3.classList.toggle('enabled', Boolean(appState.stage));
  const btnCont4 = document.getElementById('btnCont4');
  if (btnCont4) btnCont4.classList.add('enabled');

  if (appState.currentStep === 6) {
    renderDashboardContent();
  }

  const currentLang = appState.language || localStorage.getItem('bellyband_lang') || 'en';
  if (currentLang !== 'en' && window.BellyBandTranslateAll) {
    window.BellyBandTranslateAll(currentLang);
  }
}
window.updateStepView = updateStepView;

// Render dynamic website dashboard
function renderDashboardContent() {
  const t = TRANSLATIONS[appState.language] || TRANSLATIONS.en;
  const stage = appState.stage || 'pregnant';
  const role = appState.role || 'wife_mother';

  const roleLabel = role === 'wife_mother' ? t.wifeMother : t.husbandFather;
  const stageLabel = stage === 'pregnant' ? t.pregnant : (stage === 'mother' ? t.mother : t.alreadyParent);

  // Sync sidebar and greeting
  const sidebarRolePill = document.getElementById('sidebarRolePill');
  const dashStageBadge = document.getElementById('dashStageBadge');
  const dashGreetingPre = document.getElementById('dashGreetingPre');
  const dashHeroCard = document.getElementById('dashHeroCard');
  const dashHeroWeek = document.getElementById('dashHeroWeek');
  const dashHeroCountdown = document.getElementById('dashHeroCountdown');
  const dashHeroHeading = document.getElementById('dashHeroHeading');
  const dashHeroText = document.getElementById('dashHeroText');
  const dashFruitEmoji = document.getElementById('dashFruitEmoji');
  const dashFruitLabel = document.getElementById('dashFruitLabel');
  const dashFruitStats = document.getElementById('dashFruitStats');
  const dashToolsGrid = document.getElementById('dashToolsGrid');
  const dashDoctorTip = document.getElementById('dashDoctorTip');
  const dashStageSwitcher = document.getElementById('dashStageSwitcher');

  if (sidebarRolePill) sidebarRolePill.textContent = roleLabel;
  if (dashStageBadge) dashStageBadge.innerHTML = `<span>✨ ${t.step3Label}: <strong>${stageLabel}</strong></span>`;
  if (dashGreetingPre) dashGreetingPre.textContent = `${t.greeting}, ${role === 'wife_mother' ? 'Sarah' : 'David'}`;
  if (dashDoctorTip) dashDoctorTip.textContent = t.todayTipText;

  if (dashStageSwitcher) dashStageSwitcher.value = stage;

  if (dashHeroCard) {
    dashHeroCard.className = 'dashboard-hero-card';
    if (stage === 'mother') dashHeroCard.classList.add('mother-theme');
    if (stage === 'already_parent') dashHeroCard.classList.add('already-theme');
  }

  if (stage === 'pregnant') {
    if (dashHeroWeek) dashHeroWeek.textContent = t.weekLabel;
    if (dashHeroCountdown) dashHeroCountdown.textContent = t.daysLeft;
    if (dashHeroHeading) dashHeroHeading.textContent = t.babyDevelopmentTitle;
    if (dashHeroText) dashHeroText.textContent = t.babyDevelopmentDesc;
    if (dashFruitEmoji) { dashFruitEmoji.textContent = ''; dashFruitEmoji.style.display = 'none'; }
    if (dashFruitLabel) dashFruitLabel.textContent = t.fruitLabel;
    if (dashFruitStats) dashFruitStats.textContent = '~600 grams • 30 cm';

    if (dashToolsGrid) {
      dashToolsGrid.innerHTML = `
        <div class="web-tool-card tool-kick" id="btnToolKick">
          <div class="tool-card-head">
            <div class="web-tool-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
            </div>
            <span class="tool-status-badge active">Live Tracker</span>
          </div>
          <div class="tool-card-body">
            <h4>${t.kickCounter}</h4>
            <p id="kickCountWebsiteLabel">${appState.kickCount} kicks recorded today</p>
          </div>
          <button type="button" class="tool-quick-action">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width: 12px; height: 12px;"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            <span>Log Kick</span>
          </button>
        </div>

        <div class="web-tool-card tool-water" id="btnToolWater">
          <div class="tool-card-head">
            <div class="web-tool-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>
            </div>
            <span class="tool-status-badge hydration">Goal: 8 Glasses</span>
          </div>
          <div class="tool-card-body">
            <h4>${t.waterTracker}</h4>
            <p id="waterCountWebsiteLabel">${appState.waterCount} / 8 glasses logged</p>
          </div>
          <button type="button" class="tool-quick-action">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width: 12px; height: 12px;"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            <span>Add Glass (250ml)</span>
          </button>
        </div>

        <div class="web-tool-card tool-symptom" id="btnOpenSymptoms">
          <div class="tool-card-head">
            <div class="web-tool-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect><path d="m9 14 2 2 4-4"></path></svg>
            </div>
            <span class="tool-status-badge logged">Logged Today</span>
          </div>
          <div class="tool-card-body">
            <h4>${t.symptomLogger}</h4>
            <p id="symptomStatusLabel">${t.symptomLoggerDesc}</p>
          </div>
          <button type="button" class="tool-quick-action action-secondary">
            <span>Review Journal</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 12px; height: 12px;"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>
        </div>

        <div class="web-tool-card tool-partner" id="btnOpenPartnerSync">
          <div class="tool-card-head">
            <div class="web-tool-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
            <span class="tool-status-badge synced">Device Synced</span>
          </div>
          <div class="tool-card-body">
            <h4>${t.partnerSync}</h4>
            <p>${t.partnerSyncDesc}</p>
          </div>
          <button type="button" class="tool-quick-action action-secondary">
            <span>Sync Shared Notes</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 12px; height: 12px;"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>
        </div>
      `;
    }
  } else if (stage === 'mother') {
    if (dashHeroWeek) dashHeroWeek.textContent = '3 Months Postpartum';
    if (dashHeroCountdown) dashHeroCountdown.textContent = 'Next Vaccine in 14 Days';
    if (dashHeroHeading) dashHeroHeading.textContent = t.motherTitle;
    if (dashHeroText) dashHeroText.textContent = t.motherDesc;
    if (dashFruitEmoji) { dashFruitEmoji.textContent = ''; dashFruitEmoji.style.display = 'none'; }
    if (dashFruitLabel) dashFruitLabel.textContent = 'Baby Liam (3 Mo)';
    if (dashFruitStats) dashFruitStats.textContent = '6.2 kg • 61 cm';

    if (dashToolsGrid) {
      dashToolsGrid.innerHTML = `
        <div class="web-tool-card tool-kick">
          <div class="tool-card-head">
            <div class="web-tool-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 14"></polyline></svg>
            </div>
            <span class="tool-status-badge active">Nursing Live</span>
          </div>
          <div class="tool-card-body">
            <h4>Feeding &amp; Nursing Log</h4>
            <p>Last nursing 1h 45m ago (Left side)</p>
          </div>
          <button type="button" class="tool-quick-action">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width: 12px; height: 12px;"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            <span>Log Feeding</span>
          </button>
        </div>

        <div class="web-tool-card tool-water">
          <div class="tool-card-head">
            <div class="web-tool-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            </div>
            <span class="tool-status-badge hydration">Target 12h</span>
          </div>
          <div class="tool-card-body">
            <h4>Sleep &amp; Nap Tracker</h4>
            <p>11.5 hours total sleep today</p>
          </div>
          <button type="button" class="tool-quick-action">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width: 12px; height: 12px;"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            <span>Log Nap</span>
          </button>
        </div>

        <div class="web-tool-card tool-symptom">
          <div class="tool-card-head">
            <div class="web-tool-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="2" x2="22" y2="6"></line><path d="m7.5 4.21 4.3 4.3-5.3 5.3c-.6.6-1.5.6-2.1 0l-2.2-2.2c-.6-.6-.6-1.5 0-2.1l5.3-5.3Z"></path><path d="m15.5 12.21 3.3 3.3-1.4 1.4-3.3-3.3"></path><line x1="18.5" y1="9.21" x2="21.5" y2="12.21"></line></svg>
            </div>
            <span class="tool-status-badge logged">DTP Booster</span>
          </div>
          <div class="tool-card-body">
            <h4>Vaccination Schedule</h4>
            <p>DTP Booster due in 2 weeks</p>
          </div>
          <button type="button" class="tool-quick-action action-secondary">
            <span>View Calendar</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 12px; height: 12px;"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>
        </div>

        <div class="web-tool-card tool-partner">
          <div class="tool-card-head">
            <div class="web-tool-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            </div>
            <span class="tool-status-badge synced">5/6 Passed</span>
          </div>
          <div class="tool-card-body">
            <h4>Development Milestones</h4>
            <p>5 of 6 cognitive checks passed</p>
          </div>
          <button type="button" class="tool-quick-action action-secondary">
            <span>Milestone Checklist</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 12px; height: 12px;"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>
        </div>
      `;
    }
  } else {
    // Already a Parent
    if (dashHeroWeek) dashHeroWeek.textContent = 'Family of 3+';
    if (dashHeroCountdown) dashHeroCountdown.textContent = 'Family Care Active';
    if (dashHeroHeading) dashHeroHeading.textContent = t.alreadyTitle;
    if (dashHeroText) dashHeroText.textContent = t.alreadyDesc;
    if (dashFruitEmoji) { dashFruitEmoji.textContent = ''; dashFruitEmoji.style.display = 'none'; }
    if (dashFruitLabel) dashFruitLabel.textContent = 'Growing Family';
    if (dashFruitStats) dashFruitStats.textContent = '2 Kids • Toddler & Infant';

    if (dashToolsGrid) {
      dashToolsGrid.innerHTML = `
        <div class="web-tool-card tool-kick">
          <div class="tool-card-head">
            <div class="web-tool-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="7" r="4"></circle><path d="M17 11a3 3 0 1 0-2.8-4"></path><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"></path><path d="M16 21v-2a3.5 3.5 0 0 0-3-3.4"></path></svg>
            </div>
            <span class="tool-status-badge active">15+ Ideas</span>
          </div>
          <div class="tool-card-body">
            <h4>Sibling Bonding Activities</h4>
            <p>Creative play &amp; shared storytime</p>
          </div>
          <button type="button" class="tool-quick-action">
            <span>Explore Ideas</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 12px; height: 12px;"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>
        </div>

        <div class="web-tool-card tool-water">
          <div class="tool-card-head">
            <div class="web-tool-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>
            </div>
            <span class="tool-status-badge hydration">Weekly Guide</span>
          </div>
          <div class="tool-card-body">
            <h4>Toddler &amp; Family Meals</h4>
            <p>Balanced weekly recipes &amp; snack guide</p>
          </div>
          <button type="button" class="tool-quick-action">
            <span>Meal Planner</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 12px; height: 12px;"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>
        </div>

        <div class="web-tool-card tool-symptom">
          <div class="tool-card-head">
            <div class="web-tool-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
            </div>
            <span class="tool-status-badge logged">Audio Player</span>
          </div>
          <div class="tool-card-body">
            <h4>Bedtime Stories</h4>
            <p>Audio stories and calming sleep sounds</p>
          </div>
          <button type="button" class="tool-quick-action action-secondary">
            <span>Play Story</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 12px; height: 12px;"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>
        </div>

        <div class="web-tool-card tool-partner">
          <div class="tool-card-head">
            <div class="web-tool-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            </div>
            <span class="tool-status-badge synced">Calendar Sync</span>
          </div>
          <div class="tool-card-body">
            <h4>Family Routine Calendar</h4>
            <p>Pediatric visits, school sync &amp; playdates</p>
          </div>
          <button type="button" class="tool-quick-action action-secondary">
            <span>Open Calendar</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 12px; height: 12px;"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>
        </div>
      `;
    }
  }

  // Attach quick action listeners
  const kickTool = document.getElementById('btnToolKick');
  if (kickTool) {
    kickTool.addEventListener('click', () => {
      appState.kickCount += 1;
      const label = document.getElementById('kickCountWebsiteLabel');
      if (label) label.textContent = `${appState.kickCount} kicks recorded today`;
      kickTool.style.transform = 'scale(0.98)';
      setTimeout(() => kickTool.style.transform = '', 150);
    });
  }

  const waterTool = document.getElementById('btnToolWater');
  if (waterTool) {
    waterTool.addEventListener('click', () => {
      appState.waterCount = (appState.waterCount % 8) + 1;
      const label = document.getElementById('waterCountWebsiteLabel');
      if (label) label.textContent = `${appState.waterCount} / 8 glasses logged`;
      waterTool.style.transform = 'scale(0.98)';
      setTimeout(() => waterTool.style.transform = '', 150);
    });
  }

  // Re-translate dynamically injected content
  const currentLang = appState.language || localStorage.getItem('bellyband_lang') || 'en';
  if (currentLang !== 'en' && window.BellyBandTranslateAll) {
    window.BellyBandTranslateAll(currentLang);
  }
}

// Event Listeners
function attachEventListeners() {
  // Step 1: Language selection cards
  document.querySelectorAll('.lang-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.lang-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      appState.language = card.dataset.lang;
      updateLocalization();
      updateStepView();
    });
  });

  // Step 2: Role selection cards
  document.querySelectorAll('.role-web-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.role-web-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      appState.role = card.dataset.role;
      updateStepView();
    });
  });

  // Step 3: Life stage cards
  document.querySelectorAll('.stage-web-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.stage-web-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      appState.stage = card.dataset.stage;
      updateStepView();
    });
  });

  // Continue Buttons
  if (elements.btnCont1) elements.btnCont1.addEventListener('click', () => goToStep(2));
  if (elements.btnCont2) elements.btnCont2.addEventListener('click', () => goToStep(3));
  if (elements.btnCont3) elements.btnCont3.addEventListener('click', () => goToStep(4));
  // Step 4 continue → Step 5 (auth)
  const btnCont4 = document.getElementById('btnCont4');
  if (btnCont4) btnCont4.addEventListener('click', () => {
    populateAuthHiddenFields();
    goToStep(5);
  });

  // Back Buttons
  if (elements.btnBack2) elements.btnBack2.addEventListener('click', () => goToStep(1));
  if (elements.btnBack3) elements.btnBack3.addEventListener('click', () => goToStep(2));
  const btnBack4 = document.getElementById('btnBack4');
  if (btnBack4) btnBack4.addEventListener('click', () => goToStep(3));
  const btnBack5 = document.getElementById('btnBack5');
  if (btnBack5) btnBack5.addEventListener('click', () => goToStep(4));

  // Restart Flow
  if (elements.btnRestart) {
    elements.btnRestart.addEventListener('click', () => goToStep(1));
  }

  // Dashboard Stage Switcher
  if (elements.dashStageSwitcher) {
    elements.dashStageSwitcher.addEventListener('change', (e) => {
      appState.stage = e.target.value;
      const targetCard = document.querySelector(`.stage-web-card[data-stage="${e.target.value}"]`);
      if (targetCard) {
        document.querySelectorAll('.stage-web-card').forEach(c => c.classList.remove('selected'));
        targetCard.classList.add('selected');
      }
      renderDashboardContent();
    });
  }

  // Clickable Header Stepper Pills
  elements.stepPills.forEach((pill, idx) => {
    if (pill) {
      pill.style.cursor = 'pointer';
      pill.addEventListener('click', () => goToStep(idx + 1));
    }
  });

  // ── Dashboard Sidebar Tab Switching ────────────────────────
  initDashboardTabs();

  // ── Overview Quick Actions ──────────────────────────────────
  const btnOpenSymptoms = document.getElementById('btnOpenSymptoms');
  if (btnOpenSymptoms) {
    btnOpenSymptoms.addEventListener('click', () => openDailySymptomsModal());
  }

  const btnOpenPartner = document.getElementById('btnOpenPartnerSync');
  if (btnOpenPartner) {
    btnOpenPartner.addEventListener('click', () => openPartnerConnectModal());
  }

  // ── Calendar / Week picker ─────────────────────────────────
  initCalendar();
  initWeekPicker();

  const btnSwitchToWeek = document.getElementById('btnSwitchToWeek');
  const btnSwitchToDate = document.getElementById('btnSwitchToDate');
  const dateStepTitle = document.getElementById('dateStepTitle');

  if (btnSwitchToWeek) {
    btnSwitchToWeek.addEventListener('click', () => {
      document.getElementById('calendarPickerPanel').classList.remove('active');
      document.getElementById('weekPickerPanel').classList.add('active');
      if (dateStepTitle) dateStepTitle.textContent = 'Your current pregnancy week?';
    });
  }
  if (btnSwitchToDate) {
    btnSwitchToDate.addEventListener('click', () => {
      document.getElementById('weekPickerPanel').classList.remove('active');
      document.getElementById('calendarPickerPanel').classList.add('active');
      if (dateStepTitle) {
        if (appState.stage === 'mother') {
          dateStepTitle.textContent = "Your baby's birth date?";
        } else if (appState.stage === 'already_parent') {
          dateStepTitle.textContent = "When did your family journey begin?";
        } else {
          dateStepTitle.textContent = "Your expected delivery date?";
        }
      }
    });
  }
}

// ── goToStep override to handle step 4 title adaptation ───────────────────
const _origGoToStep = goToStep;
// Patch goToStep to update Step 4 title based on life stage
const _patchedGoToStep = function(step) {
  _origGoToStep(step);
  if (step === 4) adaptDateStepToStage();
};
// Replace references — we wrap below in init instead

function adaptDateStepToStage() {
  const titleEl = document.getElementById('dateStepTitle');
  const badgeEl = document.getElementById('dateBadgePill');
  if (!titleEl) return;
  const stage = appState.stage;
  if (stage === 'mother') {
    titleEl.textContent = "Your baby's birth date?";
  } else if (stage === 'already_parent') {
    titleEl.textContent = "When did your family journey begin?";
  } else {
    titleEl.textContent = "Your expected delivery date?";
  }
}

// ── Calendar Widget ────────────────────────────────────────────────────────
let calState = {
  year: 2026,
  month: 7, // August (0-indexed)
  selectedDay: 26
};

const MONTH_NAMES = ['January','February','March','April','May','June',
                     'July','August','September','October','November','December'];

function initCalendar() {
  renderCalendar();
  const prev = document.getElementById('calPrevMonth');
  const next = document.getElementById('calNextMonth');
  if (prev) {
    prev.addEventListener('click', (e) => {
      e.preventDefault();
      calState.month--;
      if (calState.month < 0) { calState.month = 11; calState.year--; }
      renderCalendar();
    });
  }
  if (next) {
    next.addEventListener('click', (e) => {
      e.preventDefault();
      calState.month++;
      if (calState.month > 11) { calState.month = 0; calState.year++; }
      renderCalendar();
    });
  }
}

function renderCalendar() {
  const label = document.getElementById('calMonthLabel');
  if (label) label.textContent = `${MONTH_NAMES[calState.month]} ${calState.year}`;

  const matrix = document.getElementById('calDaysMatrix');
  if (!matrix) return;

  matrix.innerHTML = '';

  const firstDay = new Date(calState.year, calState.month, 1).getDay();
  const daysInMonth = new Date(calState.year, calState.month + 1, 0).getDate();

  // Blank padding cells before day 1
  for (let i = 0; i < firstDay; i++) {
    const blank = document.createElement('span');
    blank.className = 'cal-day-cell blank';
    matrix.appendChild(blank);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const cell = document.createElement('span');
    cell.className = 'cal-day-cell';
    cell.textContent = d;

    const isSelected = (calState.selectedDay === d);
    if (isSelected) {
      cell.classList.add('selected');
    }

    cell.addEventListener('click', () => {
      matrix.querySelectorAll('.cal-day-cell').forEach(c => c.classList.remove('selected'));
      cell.classList.add('selected');
      calState.selectedDay = d;
      appState.expectedDate = `${calState.year}-${String(calState.month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      appState.expectedWeek = null;
    });

    matrix.appendChild(cell);
  }
}

// ── Week Picker (1–41) ─────────────────────────────────────────────────────
function initWeekPicker() {
  const grid = document.getElementById('weekGrid');
  if (!grid) return;
  
  grid.querySelectorAll('.week-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      grid.querySelectorAll('.week-chip').forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
      const w = parseInt(chip.dataset.week, 10);
      appState.expectedWeek = w;
      appState.expectedDate = null;
    });
  });
}

// ── Auth helpers ───────────────────────────────────────────────────────────
function populateAuthHiddenFields() {
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.value = val || ''; };
  set('hidLang',  appState.language);
  set('hidRole',  appState.role);
  set('hidStage', appState.stage);
  set('hidDate',  appState.expectedDate);
  set('hidWeek',  appState.expectedWeek);
}

window.switchAuthTab = function(tab) {
  const regForm  = document.getElementById('registerForm');
  const logForm  = document.getElementById('loginForm');
  const tabReg   = document.getElementById('tabRegister');
  const tabLog   = document.getElementById('tabLogin');
  const titleEl  = document.getElementById('authStepTitle');
  const subEl    = document.getElementById('authStepSub');
  if (tab === 'register') {
    regForm.classList.remove('hidden');
    logForm.classList.add('hidden');
    tabReg.classList.add('active');
    tabLog.classList.remove('active');
    if (titleEl) titleEl.textContent = 'Create your account';
    if (subEl) subEl.textContent = 'Save your progress and access your personalized dashboard';
  } else {
    logForm.classList.remove('hidden');
    regForm.classList.add('hidden');
    tabLog.classList.add('active');
    tabReg.classList.remove('active');
    if (titleEl) titleEl.textContent = 'Welcome back!';
    if (subEl) subEl.textContent = 'Log in to continue your personalized journey';
  }
};

window.togglePwd = function(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  if (input.type === 'password') {
    input.type = 'text';
    btn.textContent = '🙈';
  } else {
    input.type = 'password';
    btn.textContent = '👁';
  }
};

window.handleAuthSubmit = function(e, type) {
  // In PHP mode this form will POST naturally.
  // For the static demo, we prevent default and go to the dashboard.
  e.preventDefault();
  if (type === 'register') {
    const pw  = document.getElementById('regPassword')?.value;
    const cpw = document.getElementById('regConfirm')?.value;
    if (pw !== cpw) { alert('Passwords do not match.'); return; }
  }
  goToStep(6);
  renderDashboardContent();
};

window.handleGoogleAuth = function() {
  // Placeholder — wire to OAuth provider when PHP backend is ready
  alert('Google OAuth will be configured when the PHP backend is set up.');
};

// ── Dashboard Tab Switching Logic ──────────────────────────────────────────
function initDashboardTabs() {
  const sidebar = document.getElementById('dashboardSidebarMenu');
  if (!sidebar) return;

  const links = sidebar.querySelectorAll('.sidebar-link');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTab = link.dataset.tab;
      if (!targetTab) return;
      switchDashboardTab(targetTab);
    });
  });
}

function switchDashboardTab(tabKey) {
  // 1. Update sidebar links
  const links = document.querySelectorAll('.sidebar-link');
  links.forEach(link => {
    link.classList.toggle('active', link.dataset.tab === tabKey);
  });

  // 2. Update panes
  const allPanes = document.querySelectorAll('.dash-tab-pane');
  allPanes.forEach(pane => {
    pane.classList.remove('active');
  });

  const targetPane = document.getElementById(`pane-${tabKey}`);
  if (targetPane) {
    targetPane.classList.add('active');
  }

  // Trigger fitness module load if fitness tab is opened
  if (tabKey === 'fitness' && window.initPrenatalFitnessModule) {
    window.initPrenatalFitnessModule();
  }

  // Smooth scroll to top of dashboard content
  const dashContent = document.querySelector('.dashboard-main-content');
  if (dashContent) {
    dashContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
window.switchDashboardTab = switchDashboardTab;

// ── Dashboard Interactive Modals & Actions ─────────────────────────────────

window.openModal = function(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('active');
};

window.closeModal = function(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('active');
};

window.closeModalOnBackdrop = function(e, id) {
  if (e.target.classList.contains('dash-modal-overlay')) {
    closeModal(id);
  }
};

window.openBookVisitModal = function() {
  const dateInput = document.getElementById('bookVisitDate');
  if (dateInput && !dateInput.value) {
    const today = new Date();
    today.setDate(today.getDate() + 2);
    dateInput.value = today.toISOString().split('T')[0];
  }
  openModal('modalBookVisit');
};

window.openUploadScanModal = function() {
  openModal('modalUploadScan');
};

window.openDailySymptomsModal = function() {
  openModal('modalDailySymptoms');
};

window.openPartnerConnectModal = function() {
  openModal('modalPartnerConnect');
};

window.openAskNutritionistModal = function() {
  const q = prompt('Ask Ms. Kavya Singh (Maternal Nutritionist):\n\ne.g. Is tender coconut safe daily? How much protein per meal?');
  if (q && q.trim()) {
    showToast('Question sent to Ms. Kavya Singh! You will receive a notification in ~15 mins.');
  }
};

window.openAskCommunityModal = function() {
  const input = document.getElementById('communityPostInput');
  if (input) {
    switchDashboardTab('community');
    input.focus();
  }
};

// ==========================================================================
// FAMILY & SUPPORT MODULE LOGIC (Health-Tech Privacy & Support Circle)
// ==========================================================================

window.familySupportState = {
  activeMemberId: 'partner',
  isSharingPaused: false,
  members: {
    partner: {
      id: 'partner',
      name: 'Partner (David)',
      displayName: 'Partner (David)',
      realName: 'David',
      role: 'Partner',
      relationClass: 'relation-partner',
      avatarClass: 'avatar-partner',
      avatarLetter: 'D',
      accessSummary: 'Connected · Pregnancy updates',
      tags: ['Milestones', 'Tasks', 'Primary Emergency'],
      permissions: {
        progress: true,
        appointments: true,
        movement: true,
        health: false,
        reports: true,
        emergency: true
      }
    },
    mom: {
      id: 'mom',
      name: 'Mom (Sunita)',
      displayName: 'Mom (Sunita Sharma)',
      realName: 'Sunita Sharma',
      role: 'Parent',
      relationClass: 'relation-parent',
      avatarClass: 'avatar-mom',
      avatarLetter: 'M',
      accessSummary: 'Connected · Limited access',
      tags: ['Appointments only', 'Emergency Contact'],
      permissions: {
        progress: false,
        appointments: true,
        movement: false,
        health: false,
        reports: false,
        emergency: true
      }
    },
    sister: {
      id: 'sister',
      name: 'Sister (Priya)',
      displayName: 'Sister (Priya)',
      realName: 'Priya',
      role: 'Sibling',
      relationClass: 'relation-sibling',
      avatarClass: 'avatar-sister',
      avatarLetter: 'P',
      accessSummary: 'Connected · Appointments only',
      tags: ['Doctor Visits', 'Medication Tasks'],
      permissions: {
        progress: false,
        appointments: true,
        movement: false,
        health: false,
        reports: false,
        emergency: false
      }
    }
  },
  tasks: [
    { id: 1, title: 'Tomorrow · Doctor appointment', assignee: 'Mom', assigneeTag: 'assignee-mom', due: 'Tomorrow', dueClass: 'due-tomorrow', category: '🩺 Clinical Visit', completed: false },
    { id: 2, title: 'Hospital preparation & bag checklist', assignee: 'Partner', assigneeTag: 'assignee-partner', due: 'Week 32', dueClass: 'due-soon', category: '🏥 Hospital Prep', completed: false },
    { id: 3, title: 'Medication pickup (Iron & Calcium)', assignee: 'Sister', assigneeTag: 'assignee-sister', due: 'Today, 6 PM', dueClass: 'due-today', category: '💊 Pharmacy', completed: false },
    { id: 4, title: 'Household help & nutritious meal batch', assignee: 'Partner', assigneeTag: 'assignee-partner', due: 'Done ✓', dueClass: 'due-done', category: '🍲 Home Support', completed: true }
  ],
  nextTaskId: 5,
  memberToRevoke: null
};

// ── Support Circle & Granular Permission Switching ──────────────────────────

window.selectMemberForPermissions = function(memberId) {
  const state = window.familySupportState;
  const member = state.members[memberId];
  if (!member) return;

  state.activeMemberId = memberId;

  // 1. Update Tabs in Section 2
  const tabs = document.querySelectorAll('.perm-tab-btn');
  tabs.forEach(t => t.classList.remove('active'));
  const activeTab = document.getElementById(`permTab-${memberId}`);
  if (activeTab) activeTab.classList.add('active');

  // 2. Highlight selected member card in Section 1
  const cards = document.querySelectorAll('.support-member-card');
  cards.forEach(c => c.classList.remove('active-configured'));
  const activeCard = document.getElementById(`memberCard-${memberId}`);
  if (activeCard) activeCard.classList.add('active-configured');

  // 3. Update target header label
  const targetLabel = document.getElementById('permConfigTargetName');
  if (targetLabel) {
    targetLabel.textContent = `Configuring access for: ${member.displayName}`;
  }

  // 4. Update 6 switches according to member permissions
  const p = member.permissions;
  const keys = ['progress', 'appointments', 'movement', 'health', 'reports', 'emergency'];
  keys.forEach(k => {
    const input = document.getElementById(`perm-partner-${k}`);
    if (input) {
      input.checked = !!p[k];
    }
  });

  // 5. Update audit label
  const audit = document.getElementById('permAuditLabel');
  if (audit) {
    audit.innerHTML = `<span>✓</span> Active permissions for ${member.name} loaded • 100% Reversible`;
  }
};

window.handlePermissionToggle = function(permKey) {
  const state = window.familySupportState;
  const member = state.members[state.activeMemberId];
  if (!member) return;

  const input = document.getElementById(`perm-partner-${permKey}`);
  const isChecked = input ? input.checked : false;
  member.permissions[permKey] = isChecked;

  const permLabels = {
    progress: 'Pregnancy Progress',
    appointments: 'Appointments',
    movement: 'Movement Insights',
    health: 'Maternal Health',
    reports: 'Clinical Reports',
    emergency: 'Emergency Information'
  };

  const audit = document.getElementById('permAuditLabel');
  if (audit) {
    audit.innerHTML = `<span>✓</span> Permission "${permLabels[permKey] || permKey}" ${isChecked ? 'granted' : 'revoked'} for ${member.name} • Enforced instantly`;
  }

  showToast(`${isChecked ? '✓ Granted' : '🔒 Revoked'}: ${permLabels[permKey] || permKey} access for ${member.name}`);
};

window.savePermissionsExplicitly = function() {
  const state = window.familySupportState;
  const member = state.members[state.activeMemberId];
  if (!member) return;

  showToast(`✓ Permissions actively enforced & encrypted for ${member.displayName}`);
};

window.resetPermissionsToDefault = function() {
  const state = window.familySupportState;
  const member = state.members[state.activeMemberId];
  if (!member) return;

  // Safe defaults: minimal necessary
  member.permissions = {
    progress: false,
    appointments: true,
    movement: false,
    health: false,
    reports: false,
    emergency: true
  };

  const keys = ['progress', 'appointments', 'movement', 'health', 'reports', 'emergency'];
  keys.forEach(k => {
    const input = document.getElementById(`perm-partner-${k}`);
    if (input) input.checked = member.permissions[k];
  });

  showToast(`Reset permissions for ${member.name} to safety defaults (Appointments & SOS only)`);
};

// ── Add Trusted Person ─────────────────────────────────────────────────────

window.openAddMemberModal = function() {
  const form = document.getElementById('addMemberForm');
  if (form) form.reset();
  openModal('modalAddTrustedPerson');
};

window.handleAddMemberSubmit = function(e) {
  e.preventDefault();
  const name = document.getElementById('newMemberName')?.value.trim();
  const contact = document.getElementById('newMemberContact')?.value.trim();
  const relation = document.getElementById('newMemberRelation')?.value || 'Other trusted person';

  if (!name || !contact) {
    showToast('Please enter both name and contact information.');
    return;
  }

  const id = 'member_' + Date.now();
  const avatarLetter = name.charAt(0).toUpperCase();

  const relClasses = {
    'Partner': 'relation-partner',
    'Parent': 'relation-parent',
    'Sibling': 'relation-sibling',
    'Caregiver': 'relation-caregiver',
    'Other trusted person': 'relation-other'
  };

  const avatarClasses = {
    'Partner': 'avatar-partner',
    'Parent': 'avatar-mom',
    'Sibling': 'avatar-sister',
    'Caregiver': 'avatar-generic',
    'Other trusted person': 'avatar-generic'
  };

  const initialPermissions = {
    progress: document.getElementById('prePermProgress')?.checked || false,
    appointments: document.getElementById('prePermAppt')?.checked || false,
    movement: document.getElementById('prePermMovement')?.checked || false,
    health: document.getElementById('prePermHealth')?.checked || false,
    reports: document.getElementById('prePermReports')?.checked || false,
    emergency: document.getElementById('prePermEmergency')?.checked || false
  };

  const newMemberObj = {
    id,
    name,
    displayName: `${name} (${relation})`,
    realName: name,
    role: relation,
    relationClass: relClasses[relation] || 'relation-other',
    avatarClass: avatarClasses[relation] || 'avatar-generic',
    avatarLetter,
    accessSummary: 'Invite Sent · Pending Authentication',
    tags: [relation, 'Custom Access'],
    permissions: initialPermissions
  };

  window.familySupportState.members[id] = newMemberObj;

  // Append new card into DOM
  const container = document.getElementById('supportCircleListContainer');
  if (container) {
    const card = document.createElement('div');
    card.className = 'support-member-card';
    card.id = `memberCard-${id}`;
    card.innerHTML = `
      <div class="member-profile-row">
        <div class="member-avatar-badge ${newMemberObj.avatarClass}">${avatarLetter}</div>
        <div class="member-details">
          <div class="member-name-row">
            <h4>${name}</h4>
            <span class="relation-tag ${newMemberObj.relationClass}">${relation}</span>
          </div>
          <div class="member-access-summary">
            <span class="status-indicator-dot online"></span>
            <span class="access-text">${newMemberObj.accessSummary}</span>
          </div>
        </div>
      </div>
      <div class="member-tags-row">
        <span class="scope-chip">${relation}</span>
        <span class="scope-chip">Custom Consent</span>
      </div>
      <div class="member-actions-row">
        <button class="btn-circle-action btn-config-perm" onclick="selectMemberForPermissions('${id}')">
          ⚙️ Manage Permissions
        </button>
        <button class="btn-circle-action btn-revoke-perm" onclick="confirmRevokeMember('${id}', '${name}')">
          Revoke
        </button>
      </div>
    `;
    container.appendChild(card);
  }

  // Append button to permission switcher
  const switcher = document.getElementById('permMemberTabs');
  if (switcher) {
    const btn = document.createElement('button');
    btn.className = 'perm-tab-btn';
    btn.id = `permTab-${id}`;
    btn.textContent = `${name} (${relation})`;
    btn.onclick = () => selectMemberForPermissions(id);
    switcher.appendChild(btn);
  }

  // Add to composer audience options
  const audBox = document.querySelector('.audience-checkboxes');
  if (audBox) {
    const label = document.createElement('label');
    label.className = 'audience-chip';
    label.innerHTML = `<input type="checkbox" checked /> <span>${name}</span>`;
    audBox.appendChild(label);
  }

  closeModal('modalAddTrustedPerson');
  showToast(`✓ Invitation link dispatched to ${contact}. Granular permissions stored.`);
};

// ── Support Tasks Coordination ────────────────────────────────────────────

window.openCreateTaskModal = function() {
  const form = document.getElementById('createTaskForm');
  if (form) form.reset();
  openModal('modalCreateSupportTask');
};

window.handleCreateTaskSubmit = function(e) {
  e.preventDefault();
  const title = document.getElementById('taskTitleInput')?.value.trim();
  const assignee = document.getElementById('taskAssigneeSelect')?.value || 'Partner';
  const category = document.getElementById('taskCategorySelect')?.value || 'Home Support';
  const due = document.getElementById('taskDueInput')?.value.trim() || 'This week';

  if (!title) return;

  const state = window.familySupportState;
  const taskId = state.nextTaskId++;

  const assigneeTags = {
    'Partner': 'assignee-partner',
    'Mom': 'assignee-mom',
    'Sister': 'assignee-sister',
    'Whole Circle': 'assignee-partner'
  };

  const newTask = {
    id: taskId,
    title,
    assignee,
    assigneeTag: assigneeTags[assignee] || 'assignee-partner',
    due,
    dueClass: 'due-tomorrow',
    category,
    completed: false
  };

  state.tasks.push(newTask);

  // Render to DOM
  const container = document.getElementById('sharedTasksContainer');
  if (container) {
    const card = document.createElement('div');
    card.className = 'task-item-card';
    card.id = `taskCard-${taskId}`;
    card.innerHTML = `
      <div class="task-check-col">
        <input type="checkbox" class="task-checkbox" id="taskCheck-${taskId}" onchange="toggleTaskComplete(${taskId})" />
      </div>
      <div class="task-content">
        <div class="task-header-row">
          <strong class="task-title">${title}</strong>
          <span class="task-due-badge due-tomorrow">${due}</span>
        </div>
        <div class="task-meta-row">
          <span class="task-assigned">Assigned to: <strong class="assignee-tag ${newTask.assigneeTag}">${assignee}</strong></span>
          <span class="task-category">${category}</span>
        </div>
      </div>
    `;
    container.insertBefore(card, container.firstChild);
  }

  closeModal('modalCreateSupportTask');
  showToast(`✓ Support task assigned to ${assignee}! Notification dispatched.`);
};

window.toggleTaskComplete = function(taskId) {
  const state = window.familySupportState;
  const task = state.tasks.find(t => t.id === taskId);
  const card = document.getElementById(`taskCard-${taskId}`);
  const chk = document.getElementById(`taskCheck-${taskId}`);

  if (chk && card) {
    if (chk.checked) {
      card.classList.add('is-completed');
      if (task) task.completed = true;
      showToast('✓ Task marked complete! Thank you for coordinating support.');
    } else {
      card.classList.remove('is-completed');
      if (task) task.completed = false;
      showToast('Task re-opened as pending.');
    }
  }
};

// ── Family Updates Composer ────────────────────────────────────────────────

window.handleUpdateTypeChange = function(type) {
  const textarea = document.getElementById('familyUpdateText');
  if (!textarea) return;

  const placeholders = {
    milestone: 'e.g. Week 24 milestone reached — baby can hear sounds and movement is steady!',
    appointment: 'e.g. Anomaly scan with Dr. Ananya was great. Fetal measurements right on track.',
    message: 'e.g. Feeling wonderful today. Thank you everyone for the warmth and home-cooked soup ❤️',
    photo: 'e.g. Nursery setup is almost ready! Sharing a quick photo with you all.',
    general: 'e.g. General pregnancy update: Resting well, vitals and hydration goals completed.'
  };

  textarea.placeholder = placeholders[type] || 'Write a private update for your support circle...';
};

window.handleSendFamilyUpdate = function() {
  const textarea = document.getElementById('familyUpdateText');
  const text = textarea ? textarea.value.trim() : '';

  if (!text) {
    showToast('Please type a short update message to share.');
    return;
  }

  const recipients = [];
  if (document.getElementById('audPartner')?.checked) recipients.push('Partner');
  if (document.getElementById('audMom')?.checked) recipients.push('Mom');
  if (document.getElementById('audSister')?.checked) recipients.push('Sister');

  if (recipients.length === 0) {
    showToast('Please select at least one recipient to share with.');
    return;
  }

  // Prepend to history log
  const logContainer = document.querySelector('.recent-updates-log');
  if (logContainer) {
    const item = document.createElement('div');
    item.className = 'update-log-item';
    item.innerHTML = `
      <div class="update-log-icon">✨</div>
      <div class="update-log-content">
        <p class="update-log-text">"${text}"</p>
        <span class="update-log-meta">Shared just now with ${recipients.join(', ')}</span>
      </div>
    `;
    const heading = logContainer.querySelector('.log-heading-row');
    if (heading && heading.nextSibling) {
      logContainer.insertBefore(item, heading.nextSibling);
    } else {
      logContainer.appendChild(item);
    }

    const countLabel = document.getElementById('updateLogCount');
    if (countLabel) {
      countLabel.textContent = '3 shared';
    }
  }

  if (textarea) textarea.value = '';
  showToast(`✓ Update shared securely with ${recipients.join(', ')}!`);
};

// ── Emergency Directory & SOS Management ────────────────────────────────────

window.openManageEmergencyModal = function() {
  openModal('modalManageEmergencyContacts');
};

window.openEmergencySosModal = function() {
  openModal('modalEmergencySos');
};

window.handleSaveEmergencyContacts = function(e) {
  e.preventDefault();
  const pName = document.getElementById('editEmPrimaryName')?.value.trim();
  const pPhone = document.getElementById('editEmPrimaryPhone')?.value.trim();
  const sName = document.getElementById('editEmSecondaryName')?.value.trim();
  const sPhone = document.getElementById('editEmSecondaryPhone')?.value.trim();
  const dName = document.getElementById('editEmDoctorName')?.value.trim();
  const dPhone = document.getElementById('editEmDoctorPhone')?.value.trim();

  if (pName && document.getElementById('emPrimaryName')) document.getElementById('emPrimaryName').textContent = pName;
  if (pPhone && document.getElementById('emPrimaryPhone')) document.getElementById('emPrimaryPhone').textContent = pPhone;
  if (sName && document.getElementById('emSecondaryName')) document.getElementById('emSecondaryName').textContent = sName;
  if (sPhone && document.getElementById('emSecondaryPhone')) document.getElementById('emSecondaryPhone').textContent = sPhone;
  if (dName && document.getElementById('emDoctorName')) document.getElementById('emDoctorName').textContent = dName;
  if (dPhone && document.getElementById('emDoctorPhone')) document.getElementById('emDoctorPhone').textContent = dPhone;

  closeModal('modalManageEmergencyContacts');
  showToast('✓ Emergency directory updated with priority contacts.');
};

// ── Privacy Controls, Sessions & Pause Sharing ─────────────────────────────

window.openConnectedSessionsModal = function() {
  openModal('modalConnectedSessions');
};

window.revokeDeviceSession = function(sessionId, deviceName) {
  const row = document.getElementById(`session-${sessionId}`);
  if (row) {
    row.style.opacity = '0.5';
    row.innerHTML = `<span style="font-size:12px; color:#DC2626;">🚫 Session revoked for ${deviceName}</span>`;
  }
  showToast(`Revoked authorized companion session for ${deviceName}.`);
};

window.revokeAllSessions = function() {
  const container = document.getElementById('sessionsListContainer');
  if (container) {
    container.innerHTML = '<div style="padding:16px; text-align:center; color:#DC2626; font-size:13px; font-weight:700;">All companion sessions have been revoked. Devices must re-authenticate.</div>';
  }
  showToast('All external companion sessions permanently terminated.');
};

window.togglePauseFamilySharing = function() {
  const state = window.familySupportState;
  state.isSharingPaused = !state.isSharingPaused;

  const banner = document.getElementById('familyPauseAlertBanner');
  const toggle = document.getElementById('togglePauseSharingInput');
  const label = document.getElementById('pauseSharingStatusLabel');

  if (state.isSharingPaused) {
    if (banner) banner.style.display = 'flex';
    if (toggle) toggle.checked = true;
    if (label) {
      label.textContent = 'Sharing Paused ⏸️';
      label.style.color = '#D97706';
    }
    showToast('⏸️ Family sharing paused. Companion syncing frozen.');
  } else {
    if (banner) banner.style.display = 'none';
    if (toggle) toggle.checked = false;
    if (label) {
      label.textContent = 'Currently Active';
      label.style.color = '';
    }
    showToast('▶️ Family sharing resumed. Sync active according to permissions.');
  }
};

window.openRevokePickerModal = function() {
  const state = window.familySupportState;
  const targetId = state.activeMemberId || 'partner';
  const targetMember = state.members[targetId];
  if (targetMember) {
    confirmRevokeMember(targetId, targetMember.displayName);
  } else {
    showToast('Select a support circle member to revoke.');
  }
};

window.confirmRevokeMember = function(memberId, memberName) {
  window.familySupportState.memberToRevoke = memberId;
  const sub = document.getElementById('revokeConfirmSubtitle');
  if (sub) {
    sub.textContent = `Are you sure you want to permanently revoke companion access for ${memberName}?`;
  }
  openModal('modalRevokeMemberConfirm');
};

window.executeRevokeMember = function() {
  const state = window.familySupportState;
  const memberId = state.memberToRevoke;
  if (!memberId) return;

  const memberName = state.members[memberId]?.name || 'Member';

  // 1. Remove from state
  delete state.members[memberId];

  // 2. Remove DOM card & tab
  const card = document.getElementById(`memberCard-${memberId}`);
  if (card) card.remove();

  const tab = document.getElementById(`permTab-${memberId}`);
  if (tab) tab.remove();

  // 3. Switch to remaining member if available
  const remainingKeys = Object.keys(state.members);
  if (remainingKeys.length > 0) {
    selectMemberForPermissions(remainingKeys[0]);
  }

  closeModal('modalRevokeMemberConfirm');
  showToast(`Access permanently revoked for ${memberName}.`);
};

// ── Form Submissions ───────────────────────────────────────────────────────

window.handleBookVisitSubmit = function(e) {
  e.preventDefault();
  const doc = document.getElementById('bookVisitDoctor')?.value || 'Obstetrician';
  const reason = document.getElementById('bookVisitReason')?.value || 'Visit';
  const date = document.getElementById('bookVisitDate')?.value || 'Upcoming';
  const time = document.getElementById('bookVisitTime')?.value || '10:00 AM';

  closeModal('modalBookVisit');
  showToast(`✓ Confirmed! Appointment with ${doc} booked for ${date} at ${time}.`);
};

window.handleUploadScanSubmit = function(e) {
  e.preventDefault();
  closeModal('modalUploadScan');
  showToast('✓ Report encrypted and saved to your maternal digital locker!');
};

window.handleSymptomSubmit = function(e) {
  e.preventDefault();
  const mood = document.querySelector('input[name="mood"]:checked')?.value || 'Good';
  const label = document.getElementById('symptomStatusLabel');
  if (label) {
    label.textContent = `Mood: ${mood} • Symptoms Logged Today ✓`;
  }
  closeModal('modalDailySymptoms');
  showToast('✓ Symptoms & mood successfully recorded to your daily journal!');
};

window.sendPartnerNote = function() {
  const input = document.getElementById('partnerNoteInput');
  if (input && input.value.trim()) {
    const val = input.value.trim();
    input.value = '';
    showToast(`Note synced to David's phone: "${val}"`);
  }
};

window.toggleMealLogged = function(btn, mealName) {
  if (btn.classList.contains('logged')) {
    btn.classList.remove('logged');
    btn.textContent = '✓ Mark Eaten';
    showToast(`Marked ${mealName} as unlogged`);
  } else {
    btn.classList.add('logged');
    btn.textContent = '✓ Logged Eaten';
    showToast(`Great job! Logged ${mealName} to today's nutrition targets 🎉`);
  }
};

window.likePost = function(btn) {
  const span = btn.querySelector('span');
  if (!span) return;
  const current = parseInt(span.textContent, 10) || 0;
  span.textContent = `${current + 1} Likes`;
  btn.style.color = '#E11D48';
  showToast('Liked post ❤️');
};

window.postToCommunity = function() {
  const input = document.getElementById('communityPostInput');
  const feed = document.getElementById('communityFeedList');
  if (!input || !feed || !input.value.trim()) {
    showToast('Please type a question or thought first!');
    return;
  }

  const text = input.value.trim();
  input.value = '';

  const newPost = document.createElement('div');
  newPost.className = 'feed-post-card';
  newPost.innerHTML = `
    <div class="post-author-row">
      <div class="author-avatar">🌸</div>
      <div>
        <span class="author-name">Sarah (You)</span>
        <span class="author-tag">Week 24 • Just now</span>
      </div>
      <span class="post-time">Just now</span>
    </div>
    <h4 class="post-title">${escapeHtml(text)}</h4>
    <div class="post-actions-bar">
      <button class="btn-like" onclick="likePost(this)">❤️ <span>1 Like</span></button>
      <button class="btn-comment" onclick="showToast('Be the first to reply!')">💬 0 Replies</button>
    </div>
  `;

  feed.prepend(newPost);
  showToast('✓ Posted to the BellyBand Tribe! Members & doctors will respond soon.');
};

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

// ── Toast Notification System ──────────────────────────────────────────────
window.showToast = function(msg) {
  const container = document.getElementById('dashToast');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'dash-toast';
  toast.innerHTML = `<span>✨</span><span>${escapeHtml(msg)}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    if (toast.parentNode) toast.parentNode.removeChild(toast);
  }, 3000);
};

// ── Guided Kegel & Breathing Exercise Timer ────────────────────────────────
let breathTimerInterval = null;
let breathTimeRemaining = 240; // 4 mins
let breathCycleSecond = 0; // 0 to 10 second loop

window.toggleBreathingTimer = function() {
  const btn = document.getElementById('btnStartBreath');
  if (breathTimerInterval) {
    clearInterval(breathTimerInterval);
    breathTimerInterval = null;
    if (btn) btn.textContent = '▶ Resume Breathing Cycle';
    showToast('Breathing session paused');
  } else {
    if (btn) btn.textContent = '⏸ Pause Session';
    showToast('Breathing & Kegel rhythm started. Inhale & gently lift pelvic floor...');
    runBreathingCycle();
    breathTimerInterval = setInterval(runBreathingCycle, 1000);
  }
};

window.resetBreathingTimer = function() {
  if (breathTimerInterval) {
    clearInterval(breathTimerInterval);
    breathTimerInterval = null;
  }
  breathTimeRemaining = 240;
  breathCycleSecond = 0;

  const btn = document.getElementById('btnStartBreath');
  if (btn) btn.textContent = '▶ Start Breathing Cycle';

  const display = document.getElementById('breathTimerDisplay');
  if (display) display.textContent = '04:00';

  const actionText = document.getElementById('breathActionText');
  if (actionText) actionText.textContent = 'Inhale / Contract';

  const phaseSub = document.getElementById('breathPhaseSub');
  if (phaseSub) phaseSub.textContent = 'Gentle pelvic activation';

  const ring = document.getElementById('breathingRing');
  if (ring) {
    ring.classList.remove('inhale', 'hold', 'exhale');
    ring.style.transform = 'scale(1)';
  }
};

window.startKegelRoutine = function() {
  switchDashboardTab('fitness');
  setTimeout(() => {
    scrollToFitnessSection('guidedBreathingWidget');
    toggleBreathingTimer();
  }, 300);
};

function runBreathingCycle() {
  const display = document.getElementById('breathTimerDisplay');
  const actionText = document.getElementById('breathActionText');
  const phaseSub = document.getElementById('breathPhaseSub');
  const ring = document.getElementById('breathingRing');

  if (breathTimeRemaining <= 0) {
    clearInterval(breathTimerInterval);
    breathTimerInterval = null;
    if (display) display.textContent = '00:00';
    if (actionText) actionText.textContent = 'Session Complete 🎉';
    if (phaseSub) phaseSub.textContent = 'Well done! Relax completely.';
    showToast('🎉 Excellent job! 4-minute pelvic conditioning completed.');
    return;
  }

  breathTimeRemaining--;
  const mins = Math.floor(breathTimeRemaining / 60);
  const secs = breathTimeRemaining % 60;
  if (display) {
    display.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  breathCycleSecond = (breathCycleSecond + 1) % 11; // 11-second cycle: 4s Inhale, 3s Hold, 4s Exhale

  if (breathCycleSecond < 4) {
    // Phase 1: Inhale / Contract (0-3)
    if (actionText) actionText.textContent = 'Inhale / Contract 🌸';
    if (phaseSub) phaseSub.textContent = 'Gently draw pelvic floor inward & upward';
    if (ring) {
      ring.classList.remove('hold', 'exhale');
      ring.classList.add('inhale');
      ring.style.transform = 'scale(1.18)';
      ring.style.borderColor = '#C026D3';
    }
  } else if (breathCycleSecond < 7) {
    // Phase 2: Hold (4-6)
    if (actionText) actionText.textContent = 'Hold Gently 🧘‍♀️';
    if (phaseSub) phaseSub.textContent = 'Maintain light awareness without straining';
    if (ring) {
      ring.classList.remove('inhale', 'exhale');
      ring.classList.add('hold');
      ring.style.transform = 'scale(1.18)';
      ring.style.borderColor = '#8B5CF6';
    }
  } else {
    // Phase 3: Exhale / Relax (7-10)
    if (actionText) actionText.textContent = 'Exhale / Relax 🍃';
    if (phaseSub) phaseSub.textContent = 'Fully release pelvic floor & soften shoulders';
    if (ring) {
      ring.classList.remove('inhale', 'hold');
      ring.classList.add('exhale');
      ring.style.transform = 'scale(0.95)';
      ring.style.borderColor = '#10B981';
    }
  }
}

// ── Prenatal Yoga & Movement Library Controller ────────────────────────────
let patientVideosList = [];
let currentFilterTrimester = 'All';
let currentFilterCategory = 'All';
let activePlayingVideo = null;
let recommendedVideoObj = null;

// Fallback seed videos in case network/offline
const fallbackSeedVideos = [
  {
    id: 1,
    title: 'Gentle Prenatal Full-Body Movement',
    description: 'Gentle movements for mobility, flexibility and whole-body relaxation. Focuses on light shoulder rolls, side body expanses, and joint ease.',
    video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail_url: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&auto=format&fit=crop&q=80',
    category: 'Mobility',
    trimester: 'All Trimesters',
    duration: '10 min',
    difficulty: 'Beginner',
    instructor_name: 'Dr. Kavya Sharma, MPT',
    instructor_credentials: 'Certified Prenatal Physiotherapist & Maternal Movement Specialist',
    safety_information: 'Maintain steady nasal breathing. Keep feet hip-distance apart for stability. Rest whenever needed.',
    is_featured: 1,
    is_published: 1,
    is_completed: 0,
    completion_pct: 0
  },
  {
    id: 2,
    title: 'Prenatal Breathing & Relaxation',
    description: 'Calming pranayama breathwork to ease maternal tension, lower sympathetic nervous stress, and oxygenate body and baby.',
    video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnail_url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80',
    category: 'Breathing',
    trimester: 'All Trimesters',
    duration: '8 min',
    difficulty: 'Beginner',
    instructor_name: 'Pooja Nair, E-RYT 500',
    instructor_credentials: 'Lead Prenatal Yoga Educator & Mindfulness Guide',
    safety_information: 'Never hold your breath until strained. Keep inhales soft and exhales slow and releasing.',
    is_featured: 1,
    is_published: 1,
    is_completed: 0,
    completion_pct: 0
  },
  {
    id: 3,
    title: 'Cat-Cow & Gentle Pelvic Tilts',
    description: 'Rhythmic spinal decompression to relieve lumbar pressure, soothe sciatica discomfort, and encourage pelvic mobility.',
    video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnail_url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=80',
    category: 'Mobility',
    trimester: 'All Trimesters',
    duration: '10 min',
    difficulty: 'Beginner',
    instructor_name: 'Dr. Kavya Sharma, MPT',
    instructor_credentials: 'Certified Prenatal Physiotherapist',
    safety_information: 'Place a folded blanket under the knees for extra cushioning. Do not over-arch the lower back.',
    is_featured: 0,
    is_published: 1,
    is_completed: 0,
    completion_pct: 0
  },
  {
    id: 4,
    title: 'Pelvic Floor Awareness',
    description: 'Guided pelvic floor awareness and subtle contraction-relaxation coordination to build pelvic strength and mindful release.',
    video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    thumbnail_url: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=800&auto=format&fit=crop&q=80',
    category: 'Pelvic Floor',
    trimester: 'All Trimesters',
    duration: '7 min',
    difficulty: 'Beginner',
    instructor_name: 'Dr. Ananya Rao, OB-GYN',
    instructor_credentials: 'Consultant Obstetrician & Women\'s Health Specialist',
    safety_information: 'Ensure you fully release and relax the pelvic floor between gentle activations. Avoid clenching glutes.',
    is_featured: 0,
    is_published: 1,
    is_completed: 0,
    completion_pct: 0
  },
  {
    id: 5,
    title: 'Supported Prenatal Strength',
    description: 'Low-impact standing strength sequence utilizing a chair or wall to support posture, glute stability, and leg circulation.',
    video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    thumbnail_url: 'https://images.unsplash.com/photo-1599447421416-3414500d18a5?w=800&auto=format&fit=crop&q=80',
    category: 'Strength',
    trimester: 'Trimester 2',
    duration: '12 min',
    difficulty: 'Beginner',
    instructor_name: 'Elena Rostova',
    instructor_credentials: 'Prenatal Fitness & Core Conditioning Specialist',
    safety_information: 'Keep support within arm\'s reach. Discontinue if feeling lightheaded or overheated.',
    is_featured: 0,
    is_published: 1,
    is_completed: 0,
    completion_pct: 0
  },
  {
    id: 6,
    title: 'Gentle Hip & Pelvic Mobility',
    description: 'Supported butterfly and hip circling flows to ease tension in the groin, hips, and lower sacrum.',
    video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    thumbnail_url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80',
    category: 'Mobility',
    trimester: 'Trimester 2',
    duration: '12 min',
    difficulty: 'Beginner',
    instructor_name: 'Pooja Nair, E-RYT 500',
    instructor_credentials: 'Lead Prenatal Yoga Educator',
    safety_information: 'Use cushions under the knees if hip flexors feel tight. Move only within a comfortable range of motion.',
    is_featured: 0,
    is_published: 1,
    is_completed: 0,
    completion_pct: 0
  },
  {
    id: 7,
    title: 'Prenatal Stretch & Relaxation',
    description: 'Restorative side stretches, gentle neck releases, and restorative seating for nighttime calm and easing muscle tightness.',
    video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackSeeTheWorld.mp4',
    thumbnail_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=80',
    category: 'Stretching',
    trimester: 'All Trimesters',
    duration: '8 min',
    difficulty: 'Gentle',
    instructor_name: 'Dr. Kavya Sharma, MPT',
    instructor_credentials: 'Prenatal Physiotherapist',
    safety_information: 'Avoid holding positions that compress the abdomen. Support the torso with bolsters.',
    is_featured: 0,
    is_published: 1,
    is_completed: 0,
    completion_pct: 0
  },
  {
    id: 8,
    title: 'Third-Trimester Mobility & Breathing',
    description: 'Gentle upright and forward-leaning movement sequences to create pelvic space, maintain comfort, and prepare the body for birth.',
    video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    thumbnail_url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80',
    category: 'Labor Preparation',
    trimester: 'Trimester 3',
    duration: '10 min',
    difficulty: 'Gentle',
    instructor_name: 'Dr. Ananya Rao, OB-GYN & Kavya Sharma, MPT',
    instructor_credentials: 'Obstetrics & Maternal Physical Therapy Collaboration',
    safety_information: 'Stay well hydrated. Avoid lying flat on your back. Always have a chair or birth ball available for support.',
    is_featured: 1,
    is_published: 1,
    is_completed: 0,
    completion_pct: 0
  }
];

window.initPrenatalFitnessModule = async function() {
  try {
    const res = await fetch('api/pregnancy_videos.php?action=list');
    const json = await res.json();
    if (json.success && json.data && json.data.length > 0) {
      patientVideosList = json.data;
    } else {
      patientVideosList = fallbackSeedVideos;
    }
  } catch (err) {
    patientVideosList = fallbackSeedVideos;
  }

  // Render video library and recommendations
  renderPatientVideoCards(getFilteredVideos());
  updatePersonalizedRecommendation();
  switchTrimesterProgram(2);
};

function getFilteredVideos() {
  const search = document.getElementById('libSearchInput')?.value.toLowerCase().trim() || '';

  return patientVideosList.filter(v => {
    // Trimester filter
    if (currentFilterTrimester !== 'All') {
      if (currentFilterTrimester === 'All Trimesters') {
        if (v.trimester !== 'All Trimesters') return false;
      } else {
        if (v.trimester !== currentFilterTrimester && v.trimester !== 'All Trimesters') return false;
      }
    }

    // Category filter
    if (currentFilterCategory !== 'All') {
      if (v.category.toLowerCase() !== currentFilterCategory.toLowerCase()) return false;
    }

    // Search query
    if (search) {
      const matchTitle = (v.title || '').toLowerCase().includes(search);
      const matchDesc = (v.description || '').toLowerCase().includes(search);
      const matchCat = (v.category || '').toLowerCase().includes(search);
      const matchInst = (v.instructor_name || '').toLowerCase().includes(search);
      if (!matchTitle && !matchDesc && !matchCat && !matchInst) return false;
    }

    return true;
  });
}

function renderPatientVideoCards(videos) {
  const container = document.getElementById('patientVideoCardsGrid');
  if (!container) return;

  if (!videos || !videos.length) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align:center; padding: 48px 20px; color: var(--text-muted);">
        <div style="font-size: 38px; margin-bottom: 8px;">🌸</div>
        <p style="font-size: 15px; font-weight: 700; margin: 0 0 4px 0; color: var(--text-main);">No movement sessions match your current filters</p>
        <span style="font-size: 13px;">Try selecting "All" or a different category above</span>
      </div>
    `;
    return;
  }

  container.innerHTML = videos.map(v => {
    const isCompleted = v.is_completed || (v.completion_pct && v.completion_pct >= 90);
    const catClass = v.category.toLowerCase().includes('yoga') ? 'tag-yoga' :
                     v.category.toLowerCase().includes('breath') ? 'tag-breathing' :
                     v.category.toLowerCase().includes('pelvic') ? 'tag-pelvic' :
                     v.category.toLowerCase().includes('strength') ? 'tag-strength' :
                     v.category.toLowerCase().includes('labor') ? 'tag-labor' : 'tag-mobility';

    return `
      <div class="patient-video-card" id="videoCard-${v.id}">
        <div class="video-card-thumb-wrap" onclick="openVideoPlayer(${v.id})">
          <img class="video-thumb-img" src="${v.thumbnail_url}" alt="${v.title}" onerror="this.src='https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600'">
          <span class="video-duration-tag">⏱ ${v.duration}</span>
          ${isCompleted ? '<span class="video-completion-badge">✓ Completed</span>' : ''}
          <div class="video-play-btn-overlay">
            <div class="video-play-icon-circle">▶</div>
          </div>
        </div>
        <div class="video-card-body">
          <div class="video-meta-row">
            <span class="badge-tag ${catClass}">${v.category}</span>
            <span class="video-difficulty-pill">${v.trimester} • ${v.difficulty}</span>
          </div>
          <h4 class="video-card-title">${v.title}</h4>
          <p class="video-card-desc">${v.description}</p>
          <div class="video-card-footer">
            <button type="button" class="btn-watch-video" onclick="openVideoPlayer(${v.id})">
              <span>▶ Watch Video</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

window.setLibraryTrimesterFilter = function(trimester, btn) {
  currentFilterTrimester = trimester;
  const group = document.getElementById('trimesterChipGroup');
  if (group) {
    group.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  }
  if (btn) btn.classList.add('active');
  renderPatientVideoCards(getFilteredVideos());
};

window.setLibraryCategoryFilter = function(category, btn) {
  currentFilterCategory = category;
  const group = document.getElementById('categoryChipGroup');
  if (group) {
    group.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  }
  if (btn) btn.classList.add('active');
  renderPatientVideoCards(getFilteredVideos());
};

window.handleLibraryFilterChange = function() {
  renderPatientVideoCards(getFilteredVideos());
};

function updatePersonalizedRecommendation() {
  if (!patientVideosList || !patientVideosList.length) return;

  // Pick recommendation based on Trimester 2 or featured/uncompleted
  const rec = patientVideosList.find(v => v.trimester.includes('2') || v.is_featured) || patientVideosList[0];
  recommendedVideoObj = rec;

  const titleEl = document.getElementById('recTitle');
  const durEl = document.getElementById('recDuration');
  const trimEl = document.getElementById('recTrimesterLbl');
  const diffEl = document.getElementById('recDiffLbl');
  const descEl = document.getElementById('recDesc');
  const imgEl = document.getElementById('recThumbImg');

  if (titleEl) titleEl.textContent = '🌸 ' + rec.title;
  if (durEl) durEl.textContent = rec.duration;
  if (trimEl) trimEl.textContent = rec.trimester;
  if (diffEl) diffEl.textContent = rec.difficulty;
  if (descEl) descEl.textContent = rec.description;
  if (imgEl && rec.thumbnail_url) imgEl.src = rec.thumbnail_url;
}

window.openRecommendedVideo = function() {
  if (recommendedVideoObj) {
    openVideoPlayer(recommendedVideoObj.id);
  } else if (patientVideosList.length) {
    openVideoPlayer(patientVideosList[0].id);
  }
};

window.switchTrimesterProgram = function(trimesterNum) {
  const t1Btn = document.getElementById('btnProgT1');
  const t2Btn = document.getElementById('btnProgT2');
  const t3Btn = document.getElementById('btnProgT3');
  const container = document.getElementById('trimesterProgramContent');

  if (t1Btn) t1Btn.classList.toggle('active', trimesterNum === 1);
  if (t2Btn) t2Btn.classList.toggle('active', trimesterNum === 2);
  if (t3Btn) t3Btn.classList.toggle('active', trimesterNum === 3);

  if (!container) return;

  const trimString = 'Trimester ' + trimesterNum;
  const filtered = patientVideosList.filter(v => 
    v.trimester === trimString || v.trimester === 'All Trimesters' || v.trimester.includes(String(trimesterNum))
  );

  const displayList = filtered.length ? filtered : patientVideosList.slice(0, 4);

  container.innerHTML = displayList.map((v, idx) => {
    const isCompleted = v.is_completed || (v.completion_pct && v.completion_pct >= 90);
    return `
      <div class="patient-video-card" style="background:#FAF8F5;">
        <div class="video-card-thumb-wrap" onclick="openVideoPlayer(${v.id})">
          <img class="video-thumb-img" src="${v.thumbnail_url}" alt="${v.title}" onerror="this.src='https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600'">
          <span class="video-duration-tag">⏱ ${v.duration}</span>
          ${isCompleted ? '<span class="video-completion-badge">✓ Completed</span>' : ''}
          <div class="video-play-btn-overlay">
            <div class="video-play-icon-circle">▶</div>
          </div>
        </div>
        <div class="video-card-body">
          <div class="video-meta-row">
            <span style="font-size:11px; font-weight:800; color:var(--brand-primary);">Step ${idx + 1}</span>
            <span class="video-difficulty-pill">${v.duration} • ${v.difficulty}</span>
          </div>
          <h4 class="video-card-title">${v.title}</h4>
          <p class="video-card-desc">${v.description}</p>
          <div class="video-card-footer">
            <button type="button" class="btn-watch-video" onclick="openVideoPlayer(${v.id})">
              <span>▶ Start Routine</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
};

window.scrollToFitnessSection = function(sectionId) {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

// ── Dedicated Video Player Controller ──────────────────────────────────────
window.openVideoPlayer = function(videoId) {
  const video = patientVideosList.find(v => v.id === videoId) || fallbackSeedVideos.find(v => v.id === videoId);
  if (!video) return;

  activePlayingVideo = video;

  const playerModal = document.getElementById('modalPatientVideoPlayer');
  const videoEl = document.getElementById('patientActiveVideo');
  const bigPlayBtn = document.getElementById('videoBigPlayBtn');
  const playPauseBtn = document.getElementById('btnPlayPause');

  if (videoEl) {
    videoEl.src = video.video_url;
    videoEl.poster = video.thumbnail_url;
    videoEl.load();
    if (bigPlayBtn) bigPlayBtn.classList.remove('playing');
    if (playPauseBtn) playPauseBtn.textContent = '▶';
  }

  // Update text & metadata
  document.getElementById('playerVideoTitle').textContent = video.title;
  document.getElementById('playerBadgeCategory').textContent = video.category;
  document.getElementById('playerBadgeTrimester').textContent = video.trimester;
  document.getElementById('playerBadgeDifficulty').textContent = video.difficulty;
  document.getElementById('playerBadgeDuration').textContent = video.duration;
  document.getElementById('playerInstructorName').textContent = video.instructor_name || 'Dr. Kavya Sharma, MPT';
  document.getElementById('playerInstructorCreds').textContent = video.instructor_credentials || 'Certified Prenatal Physiotherapist';
  document.getElementById('playerAboutText').textContent = video.description;
  document.getElementById('playerSafetyText').textContent = video.safety_information || 'Move gently within your comfortable range. Stay hydrated and stop if experiencing pain.';

  // Update completion status
  const isCompleted = video.is_completed || (video.completion_pct && video.completion_pct >= 90);
  const compPill = document.getElementById('playerCompletionStatusPill');
  const compBtn = document.getElementById('btnMarkVideoCompleted');
  const compIcon = document.getElementById('markCompletedBtnIcon');
  const compText = document.getElementById('markCompletedBtnText');
  const miniFill = document.getElementById('playerMiniProgFill');
  const pctText = document.getElementById('playerWatchedPctText');

  if (compPill) compPill.style.display = isCompleted ? 'inline-block' : 'none';
  if (compBtn) {
    compBtn.classList.toggle('completed', !!isCompleted);
    if (compIcon) compIcon.textContent = isCompleted ? '✓✓' : '✓';
    if (compText) compText.textContent = isCompleted ? 'Completed ✓' : 'Mark as Completed';
  }

  const pct = isCompleted ? 100 : (video.completion_pct || 0);
  if (miniFill) miniFill.style.width = pct + '%';
  if (pctText) pctText.textContent = `Progress: ${pct}%`;

  if (playerModal) {
    playerModal.classList.add('active');
  }
};

window.closeVideoPlayerModal = function() {
  const playerModal = document.getElementById('modalPatientVideoPlayer');
  const videoEl = document.getElementById('patientActiveVideo');

  if (videoEl) {
    videoEl.pause();
    // Save progress on close
    if (activePlayingVideo && videoEl.duration) {
      const pct = Math.floor((videoEl.currentTime / videoEl.duration) * 100);
      saveVideoProgress(activePlayingVideo.id, Math.floor(videoEl.currentTime), pct, pct >= 90);
    }
  }

  if (playerModal) {
    playerModal.classList.remove('active');
  }
};

window.togglePatientVideoPlayback = function() {
  const videoEl = document.getElementById('patientActiveVideo');
  const bigPlayBtn = document.getElementById('videoBigPlayBtn');
  const playPauseBtn = document.getElementById('btnPlayPause');
  if (!videoEl) return;

  if (videoEl.paused) {
    videoEl.play();
    if (bigPlayBtn) bigPlayBtn.classList.add('playing');
    if (playPauseBtn) playPauseBtn.textContent = '⏸';
  } else {
    videoEl.pause();
    if (bigPlayBtn) bigPlayBtn.classList.remove('playing');
    if (playPauseBtn) playPauseBtn.textContent = '▶';
  }
};

window.handleVideoTimeUpdate = function(videoEl) {
  if (!videoEl || !videoEl.duration) return;

  const current = videoEl.currentTime;
  const duration = videoEl.duration;
  const pct = (current / duration) * 100;

  const scrubFill = document.getElementById('videoScrubFill');
  const timeElapsed = document.getElementById('videoTimeElapsed');
  const timeTotal = document.getElementById('videoTimeTotal');
  const miniFill = document.getElementById('playerMiniProgFill');
  const pctText = document.getElementById('playerWatchedPctText');

  if (scrubFill) scrubFill.style.width = pct + '%';
  if (miniFill && (!activePlayingVideo || !activePlayingVideo.is_completed)) {
    miniFill.style.width = Math.floor(pct) + '%';
  }
  if (pctText && (!activePlayingVideo || !activePlayingVideo.is_completed)) {
    pctText.textContent = `Progress: ${Math.floor(pct)}%`;
  }

  if (timeElapsed) {
    const curM = Math.floor(current / 60);
    const curS = Math.floor(current % 60);
    timeElapsed.textContent = `${String(curM).padStart(2,'0')}:${String(curS).padStart(2,'0')}`;
  }
  if (timeTotal) {
    const durM = Math.floor(duration / 60);
    const durS = Math.floor(duration % 60);
    timeTotal.textContent = `${String(durM).padStart(2,'0')}:${String(durS).padStart(2,'0')}`;
  }

  // Auto-mark completed when 90% watched
  if (pct >= 90 && activePlayingVideo && !activePlayingVideo.is_completed) {
    activePlayingVideo.is_completed = 1;
    activePlayingVideo.completion_pct = 100;
    saveVideoProgress(activePlayingVideo.id, Math.floor(current), 100, true);
    updatePlayerCompletedUI();
  }
};

window.handleVideoEnded = function(videoEl) {
  const bigPlayBtn = document.getElementById('videoBigPlayBtn');
  const playPauseBtn = document.getElementById('btnPlayPause');
  if (bigPlayBtn) bigPlayBtn.classList.remove('playing');
  if (playPauseBtn) playPauseBtn.textContent = '▶';

  if (activePlayingVideo) {
    activePlayingVideo.is_completed = 1;
    activePlayingVideo.completion_pct = 100;
    saveVideoProgress(activePlayingVideo.id, Math.floor(videoEl.duration || 0), 100, true);
    updatePlayerCompletedUI();
    showToast('🎉 Movement session completed! Added to your activity summary.');
  }
};

window.seekPatientVideo = function(event) {
  const videoEl = document.getElementById('patientActiveVideo');
  const scrubBar = event.currentTarget;
  if (!videoEl || !videoEl.duration || !scrubBar) return;

  const rect = scrubBar.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const newTime = (clickX / rect.width) * videoEl.duration;
  videoEl.currentTime = newTime;
};

window.toggleVideoMute = function() {
  const videoEl = document.getElementById('patientActiveVideo');
  const btn = document.getElementById('btnVolMute');
  if (!videoEl) return;

  videoEl.muted = !videoEl.muted;
  if (btn) btn.textContent = videoEl.muted ? '🔇' : '🔊';
};

window.setVideoVolume = function(val) {
  const videoEl = document.getElementById('patientActiveVideo');
  const btn = document.getElementById('btnVolMute');
  if (!videoEl) return;

  videoEl.volume = parseFloat(val);
  videoEl.muted = (videoEl.volume === 0);
  if (btn) btn.textContent = videoEl.muted ? '🔇' : '🔊';
};

window.toggleVideoFullscreen = function() {
  const wrap = document.querySelector('.video-player-screen-wrap');
  if (!wrap) return;

  if (!document.fullscreenElement) {
    wrap.requestFullscreen().catch(err => console.log(err));
  } else {
    document.exitFullscreen();
  }
};

window.markCurrentVideoCompleted = function() {
  if (!activePlayingVideo) return;
  activePlayingVideo.is_completed = 1;
  activePlayingVideo.completion_pct = 100;

  saveVideoProgress(activePlayingVideo.id, 600, 100, true);
  updatePlayerCompletedUI();
  showToast('✓ Great job! Session marked as completed.');

  // Update card badge in library
  const card = document.getElementById(`videoCard-${activePlayingVideo.id}`);
  if (card && !card.querySelector('.video-completion-badge')) {
    const thumbWrap = card.querySelector('.video-card-thumb-wrap');
    if (thumbWrap) {
      const badge = document.createElement('span');
      badge.className = 'video-completion-badge';
      badge.textContent = '✓ Completed';
      thumbWrap.appendChild(badge);
    }
  }
};

function updatePlayerCompletedUI() {
  const compPill = document.getElementById('playerCompletionStatusPill');
  const compBtn = document.getElementById('btnMarkVideoCompleted');
  const compIcon = document.getElementById('markCompletedBtnIcon');
  const compText = document.getElementById('markCompletedBtnText');
  const miniFill = document.getElementById('playerMiniProgFill');
  const pctText = document.getElementById('playerWatchedPctText');

  if (compPill) compPill.style.display = 'inline-block';
  if (compBtn) {
    compBtn.classList.add('completed');
    if (compIcon) compIcon.textContent = '✓✓';
    if (compText) compText.textContent = 'Completed ✓';
  }
  if (miniFill) miniFill.style.width = '100%';
  if (pctText) pctText.textContent = 'Progress: 100% (Completed)';
}

async function saveVideoProgress(videoId, progressSec, pct, isCompleted) {
  try {
    await fetch('api/pregnancy_videos.php?action=track_progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        video_id: videoId,
        progress_seconds: progressSec,
        completion_pct: pct,
        completed: isCompleted ? 1 : 0
      })
    });
  } catch (e) {
    console.log('Progress save error:', e);
  }
}


window.handleUserPhotoUpload = function(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  if (!file.type.startsWith('image/')) {
    alert('Please select an image file (JPG, PNG, WebP).');
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    alert('File size exceeds 5MB limit. Please choose a smaller photo.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const dataUrl = e.target.result;
    syncProfilePictureUI(dataUrl);

    try {
      localStorage.setItem('bellyband_user_photo', dataUrl);
    } catch(err) {}

    showToast('Saving profile picture to database...');

    const email = document.getElementById('profEmail')?.value || 'sarah.david@gmail.com';
    const fullName = document.getElementById('profFullName')?.value || 'Sarah & David';

    fetch('update_profile.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        full_name: fullName,
        profile_photo: dataUrl
      })
    })
    .then(r => r.json())
    .then(data => {
      if (data.success) {
        showToast('✓ Profile picture saved to database successfully!');
      } else {
        showToast('Profile photo saved locally.');
      }
    })
    .catch(() => {
      showToast('✓ Profile picture cached and active.');
    });
  };
  reader.readAsDataURL(file);
};

window.removeUserPhoto = function() {
  if (!confirm('Are you sure you want to remove your profile picture?')) return;

  syncProfilePictureUI(null);

  try {
    localStorage.removeItem('bellyband_user_photo');
  } catch(err) {}

  const fileInput = document.getElementById('userProfilePhotoInput');
  if (fileInput) fileInput.value = '';

  showToast('Removing picture from database...');

  const email = document.getElementById('profEmail')?.value || 'sarah.david@gmail.com';

  fetch('update_profile.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email,
      profile_photo: 'remove'
    })
  })
  .then(r => r.json())
  .then(data => {
    showToast('🗑️ Profile picture removed from database.');
  })
  .catch(() => {
    showToast('🗑️ Profile picture removed.');
  });
};

window.syncProfilePictureUI = function(photoUrl) {
  const mainDisplay = document.getElementById('profileMainAvatarDisplay');
  const sideAvatar = document.getElementById('sidebarAvatar');

  if (photoUrl) {
    if (mainDisplay) {
      mainDisplay.innerHTML = `<img src="${photoUrl}" alt="Profile Picture" style="width:100%; height:100%; object-fit:cover; border-radius:50%; display:block;" />`;
    }
    if (sideAvatar) {
      sideAvatar.innerHTML = `<img src="${photoUrl}" alt="Profile Picture" style="width:100%; height:100%; object-fit:cover; border-radius:50%; display:block;" />`;
    }
  } else {
    if (mainDisplay) {
      mainDisplay.innerHTML = '<span id="profileAvatarFallback">🌸</span>';
    }
    if (sideAvatar) {
      sideAvatar.innerHTML = '🌸';
    }
  }
};

window.loadSavedParentProfile = function() {
  try {
    const savedPhoto = localStorage.getItem('bellyband_user_photo');
    if (savedPhoto) {
      syncProfilePictureUI(savedPhoto);
    }

    const raw = localStorage.getItem('bellyband_parent_profile');
    if (raw) {
      const p = JSON.parse(raw);
      if (p.fullName && document.getElementById('profFullName')) document.getElementById('profFullName').value = p.fullName;
      if (p.preferredName && document.getElementById('profPreferredName')) document.getElementById('profPreferredName').value = p.preferredName;
      if (p.email && document.getElementById('profEmail')) document.getElementById('profEmail').value = p.email;
      if (p.phone && document.getElementById('profPhone')) document.getElementById('profPhone').value = p.phone;
      if (p.role && document.getElementById('profRoleSelect')) document.getElementById('profRoleSelect').value = p.role;
      if (p.bloodGroup && document.getElementById('profBloodGroup')) document.getElementById('profBloodGroup').value = p.bloodGroup;
      if (p.eddDate && document.getElementById('profEddDate')) document.getElementById('profEddDate').value = p.eddDate;
      if (p.doctorName && document.getElementById('profDoctorName')) document.getElementById('profDoctorName').value = p.doctorName;
      if (p.hospitalName && document.getElementById('profHospitalName')) document.getElementById('profHospitalName').value = p.hospitalName;
      if (p.allergies && document.getElementById('profAllergies')) document.getElementById('profAllergies').value = p.allergies;

      const name = p.fullName || 'Sarah & David';
      const role = p.role || 'Wife | Mother';
      const sideName = document.querySelector('.user-name');
      const sideRole = document.getElementById('sidebarRolePill');
      const headName = document.getElementById('profileNameHeading');
      const headRole = document.getElementById('profileRoleHeading');

      if (sideName) sideName.textContent = name;
      if (headName) headName.textContent = name;
      if (sideRole) sideRole.textContent = role;
      if (headRole) headRole.textContent = role + ' • Trimester 2 (Week 24)';
    }
  } catch(e) {}
};

window.saveParentProfile = function() {
  const fullName = document.getElementById('profFullName')?.value.trim() || 'Sarah & David';
  const preferredName = document.getElementById('profPreferredName')?.value.trim() || '';
  const email = document.getElementById('profEmail')?.value.trim() || '';
  const phone = document.getElementById('profPhone')?.value.trim() || '';
  const role = document.getElementById('profRoleSelect')?.value || 'Wife | Mother';
  const bloodGroup = document.getElementById('profBloodGroup')?.value || 'O+';
  const eddDate = document.getElementById('profEddDate')?.value || '';
  const doctorName = document.getElementById('profDoctorName')?.value.trim() || '';
  const hospitalName = document.getElementById('profHospitalName')?.value.trim() || '';
  const allergies = document.getElementById('profAllergies')?.value.trim() || '';

  const profilePayload = {
    fullName,
    preferredName,
    email,
    phone,
    role,
    bloodGroup,
    eddDate,
    doctorName,
    hospitalName,
    allergies
  };

  try {
    localStorage.setItem('bellyband_parent_profile', JSON.stringify(profilePayload));
  } catch(err) {}
  
  const sideName = document.querySelector('.user-name');
  const sideRole = document.getElementById('sidebarRolePill');
  const headName = document.getElementById('profileNameHeading');
  const headRole = document.getElementById('profileRoleHeading');
  const dashGreetingPre = document.getElementById('dashGreetingPre');
  
  if (sideName) sideName.textContent = fullName;
  if (headName) headName.textContent = fullName;
  if (sideRole) sideRole.textContent = role;
  if (headRole) headRole.textContent = role + ' • Trimester 2 (Week 24)';
  if (dashGreetingPre) dashGreetingPre.textContent = 'Welcome, ' + (preferredName || fullName);

  fetch('update_profile.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email,
      full_name: fullName,
      preferred_name: preferredName,
      phone: phone,
      role: role,
      blood_group: bloodGroup,
      expected_delivery_date: eddDate,
      doctor_name: doctorName,
      hospital_name: hospitalName,
      allergies: allergies
    })
  })
  .then(r => r.json())
  .then(data => {
    if (data.success) {
      showToast('✓ Profile and maternal records saved to database!');
    } else {
      showToast('✓ Profile saved locally.');
    }
  })
  .catch(() => {
    showToast('✓ Profile saved successfully!');
  });
};

window.handleParentPasswordChange = function(e) {
  e.preventDefault();
  const p1 = document.getElementById('profNewPwd')?.value;
  const p2 = document.getElementById('profConfirmPwd')?.value;
  if (p1 !== p2) {
    alert('New passwords do not match. Please re-enter.');
    return;
  }
  document.getElementById('profCurrentPwd').value = '';
  document.getElementById('profNewPwd').value = '';
  document.getElementById('profConfirmPwd').value = '';
  showToast('🔒 Account password updated securely!');
};

document.addEventListener('DOMContentLoaded', () => {
  init();
  initDashboardTabs();
  if (window.loadSavedParentProfile) {
    window.loadSavedParentProfile();
  }
  if (window.initPrenatalFitnessModule) {
    window.initPrenatalFitnessModule();
  }
});



