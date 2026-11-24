/* أذكار المسلم - التطبيق الكامل (بيانات، تخزين، عداد، تنقل، واجهات) */
(function () {
  'use strict';

  /* ========== 1. البيانات ========== */
  var SITE_NAME = 'أذكار المسلم';

  var SECTIONS = [
    { id: 'morning', title: 'أذكار الصباح', short: 'الصباح', icon: 'i-sun', tone: '', desc: 'أذكار الصباح من الكتاب والسنة، من طلوع الفجر إلى الضحى.' },
    { id: 'evening', title: 'أذكار المساء', short: 'المساء', icon: 'i-moon', tone: '', desc: 'أذكار المساء بعد العصر وإلى أول الليل.' },
    { id: 'ruqyah', title: 'الرقية الشرعية', short: 'الرقية', icon: 'i-leaf', tone: 'green', desc: 'آيات وأدعية نبوية ثابتة. وهي ليست بديلًا عن العلاج الطبي.' },
    { id: 'home', title: 'دخول المنزل والخروج منه', short: 'المنزل', icon: 'i-door', tone: '', desc: 'أذكار الدخول والخروج وما يتصل بهما.' },
    { id: 'protection', title: 'أذكار التحصين', short: 'التحصين', icon: 'i-shield', tone: 'green', desc: 'أذكار الحفظ عند النوم وفي سائر الأحوال.' }
  ];

  /* النصوص المشتركة */
  var T = {
    kursi: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ',
    ikhlas: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ\nقُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ',
    falaq: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ\nقُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِنْ شَرِّ مَا خَلَقَ ۝ وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ',
    nas: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ\nقُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَٰهِ النَّاسِ ۝ مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَالنَّاسِ',
    fatiha: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ\nالْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۝ الرَّحْمَٰنِ الرَّحِيمِ ۝ مَالِكِ يَوْمِ الدِّينِ ۝ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ۝ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ۝ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
    baqaraEnd: 'آمَنَ الرَّسُولُ بِمَا أُنْزِلَ إِلَيْهِ مِنْ رَبِّهِ وَالْمُؤْمِنُونَ ۚ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِنْ رُسُلِهِ ۚ وَقَالُوا سَمِعْنَا وَأَطَعْنَا ۖ غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ الْمَصِيرُ ۝ لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ ۗ رَبَّنَا لَا تُؤَاخِذْنَا إِنْ نَسِينَا أَوْ أَخْطَأْنَا ۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِنْ قَبْلِنَا ۚ رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ ۖ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا ۚ أَنْتَ مَوْلَانَا فَانْصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ',
    threeSuras: null
  };
  T.threeSuras = T.ikhlas + '\n\n' + T.falaq + '\n\n' + T.nas;

  /*
    حقول كل ذكر:
    id: معرف ثابت، sections: الأقسام، kind: dhikr | quran | hadith
    count: عدد التكرار الثابت أو null إذا لم يثبت عدد، text: النص
    source: الكتاب والموضع، grade: الدرجة (اختياري)، weak: true للضعيف
    note: توضيح (اختياري)، group: تصنيف فرعي (اختياري)
  */
  var ADHKAR = [
    {
      id: 'ayat-kursi', sections: ['morning', 'evening'], kind: 'quran', count: null, text: T.kursi,
      source: 'القرآن الكريم: سورة البقرة، الآية 255. وقراءتها صباحًا ومساءً مذكورة في كتب الأذكار استنادًا إلى رواية عند الحاكم في قصة أبي بن كعب مع الجني.',
      grade: 'تخصيصها بالصباح والمساء فيه خلاف',
      weak: true,
      note: 'الثابت في الصحيح فضل قراءتها عند النوم (صحيح البخاري 2311، وهي في قسم التحصين). أما تخصيصها بالصباح والمساء فقد حكم الألباني على زيادة الصباح والمساء في قصة أبي بن كعب بالشذوذ، فلا نجزم بثبوته، وقراءة آية الكرسي في ذاتها خير.'
    },
    {
      id: 'muawwidhat-md', sections: ['morning', 'evening'], kind: 'quran', count: 3, text: T.threeSuras,
      source: 'سنن أبي داود، كتاب الأدب، حديث 5082، وسنن الترمذي في الدعوات.',
      grade: 'حسّنه الألباني',
      note: 'تُقرأ سور الإخلاص والفلق والناس ثلاث مرات حين يصبح وحين يمسي. تقرأ الثلاث ثم تعيد حتى تكمل ثلاث مرات.'
    },
    {
      id: 'asbahna', sections: ['morning'], kind: 'dhikr', count: null,
      text: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ',
      source: 'صحيح مسلم، كتاب الذكر والدعاء والتوبة والاستغفار، حديث 2723 (من حديث ابن مسعود رضي الله عنه).', grade: 'رواه مسلم',
      note: 'وفي رواية مسلم شك من أحد الرواة في زيادة «له الملك وله الحمد وهو على كل شيء قدير»، والأحوط قراءتها.'
    },
    {
      id: 'amsayna', sections: ['evening'], kind: 'dhikr', count: null,
      text: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ',
      source: 'صحيح مسلم، كتاب الذكر والدعاء، حديث 2723.', grade: 'رواه مسلم'
    },
    {
      id: 'bika-asbahna', sections: ['morning'], kind: 'dhikr', count: null,
      text: 'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ',
      source: 'سنن أبي داود، كتاب الأدب، باب ما يقول إذا أصبح، حديث 5068.', grade: 'صحّحه الألباني',
      note: 'وفي رواية الترمذي (3391) جاءت الخاتمتان بترتيب معكوس: «وإليك المصير» في الصباح و«وإليك النشور» في المساء. والمثبت هنا لفظ أبي داود.'
    },
    {
      id: 'bika-amsayna', sections: ['evening'], kind: 'dhikr', count: null,
      text: 'اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ',
      source: 'سنن أبي داود، كتاب الأدب، باب ما يقول إذا أصبح، حديث 5068.', grade: 'صحّحه الألباني',
      note: 'وفي رواية الترمذي (3391) جاء في المساء: «وبك أصبحنا ... وإليك المصير». والمثبت هنا لفظ أبي داود.'
    },
    {
      id: 'sayyid-istighfar', sections: ['morning', 'evening'], kind: 'dhikr', count: null,
      text: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي، فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
      source: 'صحيح البخاري، كتاب الدعوات، باب أفضل الاستغفار، حديث 6306.', grade: 'رواه البخاري',
      note: 'جاء في الحديث: من قالها موقنًا بها حين يمسي فمات من ليلته دخل الجنة، وكذلك إذا قالها حين يصبح.'
    },
    {
      id: 'fatir', sections: ['morning', 'evening'], kind: 'dhikr', count: null,
      text: 'اللَّهُمَّ فَاطِرَ السَّمَاوَاتِ وَالْأَرْضِ، عَالِمَ الْغَيْبِ وَالشَّهَادَةِ، رَبَّ كُلِّ شَيْءٍ وَمَلِيكَهُ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ، أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي، وَمِنْ شَرِّ الشَّيْطَانِ وَشِرْكِهِ',
      source: 'سنن أبي داود، كتاب الأدب، باب ما يقول إذا أصبح، حديث 5067. وسنن الترمذي، كتاب الدعوات، حديث 3392.', grade: 'صحّحه الألباني، وقال الترمذي: حسن صحيح',
      note: 'قال النبي ﷺ لأبي بكر رضي الله عنه: قله إذا أصبحت وإذا أمسيت وإذا أخذت مضجعك.'
    },
    {
      id: 'bismillah-la-yadurr', sections: ['morning', 'evening'], kind: 'dhikr', count: 3,
      text: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
      source: 'سنن أبي داود، كتاب الأدب، حديث 5088. وسنن الترمذي، كتاب الدعوات، حديث 3388.', grade: 'صحّحه الألباني، وقال الترمذي: حسن'
    },
    {
      id: 'radiytu', sections: ['morning', 'evening'], kind: 'dhikr', count: null,
      text: 'رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ ﷺ نَبِيًّا',
      source: 'صحيح مسلم، كتاب الإمارة، حديث 1884 (وجبت له الجنة لمن قالها).', grade: 'رواه مسلم',
      note: 'ورد تقييدها بالصباح والمساء ثلاث مرات في رواية فيها كلام عند أهل العلم، فلم نجعل لها عددًا ملزمًا هنا.'
    },
    {
      id: 'ya-hayy', sections: ['morning', 'evening'], kind: 'dhikr', count: null,
      text: 'يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ، وَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ',
      source: 'المستدرك للحاكم، والنسائي في السنن الكبرى (عمل اليوم والليلة).', grade: 'صحّحه الحاكم، وحسّنه الألباني'
    },
    {
      id: 'ilm-nafi', sections: ['morning'], kind: 'dhikr', count: null,
      text: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا',
      source: 'سنن ابن ماجه، كتاب إقامة الصلاة، باب ما يقال بعد التسليم، حديث 925.', grade: 'صحّحه الألباني',
      note: 'كان النبي ﷺ يقولها إذا صلى الصبح حين يسلّم، فتقال بعد سلام صلاة الفجر.'
    },
    {
      id: 'audhu-kalimat-3', sections: ['evening'], kind: 'dhikr', count: 3,
      text: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
      source: 'سنن الترمذي، كتاب الدعوات، حديث 3604. وأصل الذكر في صحيح مسلم، حديث 2708.', grade: 'صحّحه الألباني في صحيح الترغيب',
      note: 'جاء أن من قالها حين يمسي ثلاث مرات لم تضره حُمَةٌ تلك الليلة.'
    },
    {
      id: 'subhanallah-100', sections: ['morning', 'evening'], kind: 'dhikr', count: 100,
      text: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
      source: 'صحيح مسلم، كتاب الذكر والدعاء، حديث 2692.', grade: 'رواه مسلم',
      note: 'مائة مرة حين يصبح وحين يمسي.'
    },
    {
      id: 'la-ilaha-100', sections: ['morning'], kind: 'dhikr', count: 100,
      text: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
      source: 'صحيح البخاري، حديث 3293. وصحيح مسلم، حديث 2691.', grade: 'متفق عليه',
      note: 'مائة مرة في اليوم، ويصح أن تكون في أي وقت منه.'
    },
    {
      id: 'istighfar', sections: ['morning', 'evening'], kind: 'dhikr', count: null,
      text: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ',
      source: 'صحيح البخاري، كتاب الدعوات، حديث 6307.', grade: 'رواه البخاري',
      note: 'قال النبي ﷺ: «وَاللَّهِ إِنِّي لَأَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ فِي الْيَوْمِ أَكْثَرَ مِنْ سَبْعِينَ مَرَّةً». لا يوجد عدد ملزم، فاستغفر بقدر ما تيسر.'
    },

    /* الرقية الشرعية */
    {
      id: 'ruq-fatiha', sections: ['ruqyah'], kind: 'quran', count: null, text: T.fatiha,
      source: 'صحيح البخاري، حديث 5736. وصحيح مسلم، حديث 2201 (قصة الرقية بالفاتحة).', grade: 'متفق عليه',
      note: 'رُقي بها اللديغ بإذن الله. والرقية سبب، والشفاء بيد الله وحده.'
    },
    {
      id: 'ruq-muawwidhat', sections: ['ruqyah'], kind: 'quran', count: null, text: T.threeSuras,
      source: 'صحيح البخاري، كتاب فضائل القرآن، حديث 5016 (كان ﷺ إذا اشتكى قرأ على نفسه بالمعوذات ونفث). وحديث 5017 في ذكر سورة الإخلاص معهما.', grade: 'رواه البخاري',
      note: 'قراءة المسلم على نفسه ثم النفث الخفيف عليها.'
    },
    {
      id: 'ruq-hand-bismillah', sections: ['ruqyah'], kind: 'dhikr', count: 3,
      text: 'بِاسْمِ اللَّهِ',
      source: 'صحيح مسلم، كتاب السلام، حديث 2202.', grade: 'رواه مسلم',
      group: 'عند الألم',
      note: 'ضع يدك على موضع الألم من جسدك وقل: بسم الله ثلاثًا، ثم الذكر التالي سبع مرات.'
    },
    {
      id: 'ruq-hand-audhu', sections: ['ruqyah'], kind: 'dhikr', count: 7,
      text: 'أَعُوذُ بِاللَّهِ وَقُدْرَتِهِ مِنْ شَرِّ مَا أَجِدُ وَأُحَاذِرُ',
      source: 'صحيح مسلم، كتاب السلام، حديث 2202.', grade: 'رواه مسلم', group: 'عند الألم'
    },
    {
      id: 'ruq-adhhib-albas', sections: ['ruqyah'], kind: 'dhikr', count: null,
      text: 'أَذْهِبِ الْبَاسَ رَبَّ النَّاسِ، اشْفِ وَأَنْتَ الشَّافِي، لَا شِفَاءَ إِلَّا شِفَاؤُكَ، شِفَاءً لَا يُغَادِرُ سَقَمًا',
      source: 'صحيح البخاري، كتاب الطب، حديث 5675. وصحيح مسلم، حديث 2191 (بلفظ قريب).', grade: 'متفق عليه',
      note: 'كان النبي ﷺ يقوله إذا أتى مريضًا أو أُتي به إليه.'
    },
    {
      id: 'ruq-bismillah-arqika', sections: ['ruqyah'], kind: 'dhikr', count: null,
      text: 'بِاسْمِ اللَّهِ أَرْقِيكَ، مِنْ كُلِّ شَيْءٍ يُؤْذِيكَ، مِنْ شَرِّ كُلِّ نَفْسٍ أَوْ عَيْنِ حَاسِدٍ، اللَّهُ يَشْفِيكَ، بِاسْمِ اللَّهِ أَرْقِيكَ',
      source: 'صحيح مسلم، كتاب السلام، حديث 2186.', grade: 'رواه مسلم',
      note: 'رقية جبريل عليه السلام للنبي ﷺ.'
    },
    {
      id: 'ruq-asalullah', sections: ['ruqyah'], kind: 'dhikr', count: 7,
      text: 'أَسْأَلُ اللَّهَ الْعَظِيمَ رَبَّ الْعَرْشِ الْعَظِيمِ أَنْ يَشْفِيَكَ',
      source: 'سنن أبي داود، كتاب الجنائز، حديث 3106.', grade: 'صحّحه الألباني',
      note: 'قال النبي ﷺ: من عاد مريضًا لم يحضر أجله فقال عنده سبع مرات هذا الدعاء، عافاه الله من ذلك المرض.'
    },
    {
      id: 'ruq-audhu-hammah', sections: ['ruqyah', 'protection'], kind: 'dhikr', count: null,
      text: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّةِ مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ، وَمِنْ كُلِّ عَيْنٍ لَامَّةٍ',
      source: 'صحيح البخاري، كتاب أحاديث الأنبياء، حديث 3371.', grade: 'رواه البخاري',
      note: 'كان النبي ﷺ يعوِّذ بها الحسن والحسين رضي الله عنهما، وذكر أن إبراهيم عليه السلام كان يعوِّذ بها إسماعيل وإسحاق.'
    },

    /* دخول المنزل والخروج منه */
    {
      id: 'home-enter-bismillah', sections: ['home'], kind: 'dhikr', count: null, group: 'عند الدخول',
      text: 'بِسْمِ اللَّهِ',
      source: 'صحيح مسلم، كتاب الأشربة، حديث 2018.', grade: 'رواه مسلم',
      note: 'قال النبي ﷺ: «إِذَا دَخَلَ الرَّجُلُ بَيْتَهُ، فَذَكَرَ اللَّهَ عِنْدَ دُخُولِهِ وَعِنْدَ طَعَامِهِ، قَالَ الشَّيْطَانُ: لَا مَبِيتَ لَكُمْ وَلَا عَشَاءَ». والثابت هنا ذكر الله عند الدخول، ومنه التسمية، ولم يثبت في صحيح مسلم لفظ مخصوص غيرها.'
    },
    {
      id: 'home-enter-salam', sections: ['home'], kind: 'quran', count: null, group: 'عند الدخول',
      text: 'فَإِذَا دَخَلْتُمْ بُيُوتًا فَسَلِّمُوا عَلَىٰ أَنفُسِكُمْ تَحِيَّةً مِّنْ عِندِ اللَّهِ مُبَارَكَةً طَيِّبَةً',
      source: 'القرآن الكريم: سورة النور، الآية 61.',
      note: 'آية في أدب السلام عند دخول البيوت، وهي ليست ذكرًا مقيَّدًا بعدد.'
    },
    {
      id: 'home-enter-weak', sections: ['home'], kind: 'dhikr', count: null, group: 'عند الدخول', weak: true,
      text: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ الْمَوْلَجِ وَخَيْرَ الْمَخْرَجِ، بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا، ثُمَّ لْيُسَلِّمْ عَلَى أَهْلِهِ',
      source: 'سنن أبي داود، كتاب الأدب، حديث 5096.', grade: 'ضعّفه الألباني',
      note: 'ذُكر للتنبيه فقط: هذا اللفظ ضعيف الإسناد، فلا يُنسب إلى النبي ﷺ على سبيل الثبوت. المقدَّم هو التسمية الثابتة أعلاه.'
    },
    {
      id: 'home-baqara', sections: ['home'], kind: 'hadith', count: null, group: 'في البيت',
      text: 'لَا تَجْعَلُوا بُيُوتَكُمْ مَقَابِرَ، إِنَّ الشَّيْطَانَ يَنْفِرُ مِنَ الْبَيْتِ الَّذِي تُقْرَأُ فِيهِ سُورَةُ الْبَقَرَةِ',
      source: 'صحيح مسلم، كتاب صلاة المسافرين، حديث 780.', grade: 'رواه مسلم',
      note: 'هذا حديث، وليس ذكرًا يُكرَّر. والمقصود حثّ على قراءة البقرة في البيت.'
    },
    {
      id: 'home-exit', sections: ['home'], kind: 'dhikr', count: null, group: 'عند الخروج',
      text: 'بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ، لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
      source: 'سنن أبي داود، كتاب الأدب، باب ما يقول الرجل إذا خرج من بيته، حديث 5095.', grade: 'صحّحه الألباني',
      note: 'جاء في الحديث: يُقال له حينئذٍ: هُديتَ وكُفيتَ ووُقيتَ، فتتنحّى عنه الشياطين.'
    },
    {
      id: 'home-exit-adal', sections: ['home'], kind: 'dhikr', count: null, group: 'عند الخروج',
      text: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ أَنْ أَضِلَّ أَوْ أُضَلَّ، أَوْ أَزِلَّ أَوْ أُزَلَّ، أَوْ أَظْلِمَ أَوْ أُظْلَمَ، أَوْ أَجْهَلَ أَوْ يُجْهَلَ عَلَيَّ',
      source: 'سنن أبي داود، كتاب الأدب، باب ما يقول الرجل إذا خرج من بيته، حديث 5094.', grade: 'صحّحه الألباني',
      note: 'قالت أم سلمة رضي الله عنها: ما خرج النبي ﷺ من بيتي قط إلا رفع طرفه إلى السماء فقال هذا الدعاء.'
    },

    /* التحصين */
    {
      id: 'prot-kursi-sleep', sections: ['protection'], kind: 'quran', count: null, text: T.kursi, group: 'عند النوم',
      source: 'صحيح البخاري، كتاب الوكالة، حديث 2311.', grade: 'رواه البخاري',
      note: 'من قرأها إذا أوى إلى فراشه لم يزل عليه من الله حافظ، ولا يقربه شيطان حتى يصبح.'
    },
    {
      id: 'prot-baqara-end', sections: ['protection'], kind: 'quran', count: null, text: T.baqaraEnd, group: 'عند النوم',
      source: 'القرآن الكريم: سورة البقرة، الآيتان 285 و286. وصحيح البخاري، حديث 5009، وصحيح مسلم، حديث 807.', grade: 'متفق عليه',
      note: 'قال النبي ﷺ: «مَنْ قَرَأَ بِالْآيَتَيْنِ مِنْ آخِرِ سُورَةِ الْبَقَرَةِ فِي لَيْلَةٍ كَفَتَاهُ».'
    },
    {
      id: 'prot-muawwidhat-sleep', sections: ['protection'], kind: 'quran', count: 3, text: T.threeSuras, group: 'عند النوم',
      source: 'صحيح البخاري، كتاب فضائل القرآن، حديث 5017.', grade: 'رواه البخاري',
      note: 'كان النبي ﷺ إذا أوى إلى فراشه جمع كفيه ونفث فيهما وقرأ هذه السور، ثم مسح بهما ما استطاع من جسده، يبدأ برأسه ووجهه وما أقبل من جسده، يفعل ذلك ثلاث مرات.'
    },
    {
      id: 'prot-bismika', sections: ['protection'], kind: 'dhikr', count: null, group: 'عند النوم',
      text: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
      source: 'صحيح البخاري، كتاب الدعوات، حديث 6324.', grade: 'رواه البخاري'
    },
    {
      id: 'prot-afiya', sections: ['protection'], kind: 'dhikr', count: null, group: 'في الصباح والمساء',
      text: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي، اللَّهُمَّ اسْتُرْ عَوْرَاتِي وَآمِنْ رَوْعَاتِي، اللَّهُمَّ احْفَظْنِي مِنْ بَيْنِ يَدَيَّ، وَمِنْ خَلْفِي، وَعَنْ يَمِينِي، وَعَنْ شِمَالِي، وَمِنْ فَوْقِي، وَأَعُوذُ بِعَظَمَتِكَ أَنْ أُغْتَالَ مِنْ تَحْتِي',
      source: 'سنن أبي داود، كتاب الأدب، باب ما يقول إذا أصبح، حديث 5074.', grade: 'صحّحه الألباني',
      note: 'قال ابن عمر رضي الله عنهما: لم يكن رسول الله ﷺ يدع هؤلاء الدعوات حين يمسي وحين يصبح. وفي رواية: «عَوْرَتِي» بالإفراد.'
    },
    {
      id: 'prot-audhu-kalimat', sections: ['protection'], kind: 'dhikr', count: null, group: 'عند النزول في مكان',
      text: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
      source: 'صحيح مسلم، كتاب الذكر والدعاء والتوبة والاستغفار، حديث 2708.', grade: 'رواه مسلم',
      note: 'قال النبي ﷺ: «مَنْ نَزَلَ مَنْزِلًا ثُمَّ قَالَ: أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ، لَمْ يَضُرَّهُ شَيْءٌ حَتَّى يَرْتَحِلَ مِنْ مَنْزِلِهِ ذَلِكَ».'
    },
    {
      id: 'prot-bismillah-yadurr', sections: ['protection'], kind: 'dhikr', count: 3, group: 'في الصباح والمساء', ref: 'bismillah-la-yadurr',
      text: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
      source: 'سنن أبي داود، كتاب الأدب، حديث 5088. وسنن الترمذي، حديث 3388.', grade: 'صحّحه الألباني',
      note: 'جاء أن من قالها ثلاثًا حين يصبح وثلاثًا حين يمسي لم يضره شيء.'
    }
  ];


  /* عناوين الأذكار */
  var TITLES = {"ayat-kursi": "آية الكرسي", "muawwidhat-md": "الإخلاص والمعوذتان", "asbahna": "أصبحنا وأصبح الملك لله", "amsayna": "أمسينا وأمسى الملك لله", "bika-asbahna": "اللهم بك أصبحنا", "bika-amsayna": "اللهم بك أمسينا", "sayyid-istighfar": "سيد الاستغفار", "fatir": "اللهم فاطر السماوات والأرض", "bismillah-la-yadurr": "بسم الله الذي لا يضر مع اسمه شيء", "radiytu": "الرضا بالله ربًا", "ya-hayy": "يا حي يا قيوم", "ilm-nafi": "علمًا نافعًا ورزقًا طيبًا", "audhu-kalimat-3": "أعوذ بكلمات الله التامات", "subhanallah-100": "سبحان الله وبحمده", "la-ilaha-100": "التهليل", "istighfar": "الاستغفار", "ruq-fatiha": "الفاتحة", "ruq-muawwidhat": "الإخلاص والمعوذتان", "ruq-hand-bismillah": "التسمية على موضع الألم", "ruq-hand-audhu": "أعوذ بالله وقدرته", "ruq-adhhib-albas": "أذهب الباس رب الناس", "ruq-bismillah-arqika": "بسم الله أرقيك", "ruq-asalullah": "أسأل الله العظيم أن يشفيك", "ruq-audhu-hammah": "التعويذ بكلمات الله التامة", "home-enter-bismillah": "التسمية عند دخول البيت", "home-enter-salam": "السلام عند دخول البيت", "home-enter-weak": "لفظ ضعيف عند الدخول", "home-baqara": "قراءة البقرة في البيت", "home-exit": "بسم الله توكلت على الله", "home-exit-adal": "أعوذ بك أن أضل أو أضل", "prot-kursi-sleep": "آية الكرسي عند النوم", "prot-baqara-end": "آخر آيتين من البقرة", "prot-muawwidhat-sleep": "الإخلاص والمعوذتان عند النوم", "prot-bismika": "باسمك اللهم أموت وأحيا", "prot-afiya": "سؤال العافية والحفظ", "prot-audhu-kalimat": "التعوذ عند النزول في مكان", "prot-bismillah-yadurr": "بسم الله الذي لا يضر"};
  ADHKAR.forEach(function (a) { a.title = TITLES[a.id] || ''; });

  /* الآية المستخدمة في الترحيب */
  var WELCOME_VERSE = { text: 'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ', src: 'سورة الرعد، الآية 28' };

  /* ========== 2. أدوات ========== */
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function multiline(s) { return esc(s).replace(/\n/g, '<br>'); }
  function icon(id, cls) { return '<svg class="ico ' + (cls || '') + '" aria-hidden="true"><use href="#' + id + '"/></svg>'; }

  var ARABIC_DIGITS = '٠١٢٣٤٥٦٧٨٩';
  function ar(n) { return String(n).replace(/\d/g, function (d) { return ARABIC_DIGITS[d]; }); }

  function normalize(s) {
    return String(s)
      .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED\u0640]/g, '')
      .replace(/[إأآٱ]/g, 'ا')
      .replace(/ى/g, 'ي')
      .replace(/ة/g, 'ه')
      .replace(/ؤ/g, 'و')
      .replace(/ئ/g, 'ي')
      .replace(/[۝﴾﴿]/g, ' ')
      .toLowerCase();
  }

  function sectionById(id) {
    for (var i = 0; i < SECTIONS.length; i++) if (SECTIONS[i].id === id) return SECTIONS[i];
    return null;
  }
  function itemById(id) {
    for (var i = 0; i < ADHKAR.length; i++) if (ADHKAR[i].id === id) return ADHKAR[i];
    return null;
  }
  function itemsOf(secId) {
    if (secId === 'fav') {
      return Store.get().favorites.map(itemById).filter(Boolean);
    }
    return ADHKAR.filter(function (a) { return a.sections.indexOf(secId) !== -1; });
  }
  function progKey(secId, item) { return secId + ':' + item.id; }

  function dateKey(d) {
    d = d || new Date();
    var m = d.getMonth() + 1, day = d.getDate();
    return d.getFullYear() + '-' + (m < 10 ? '0' : '') + m + '-' + (day < 10 ? '0' : '') + day;
  }

  /* ========== 3. التخزين ========== */
  var Store = (function () {
    var KEY = 'muslim-adhkar-v1';
    var memory = null;
    var canUse = (function () {
      try { var k = '__t'; window.localStorage.setItem(k, '1'); window.localStorage.removeItem(k); return true; }
      catch (e) { return false; }
    })();

    function defaults() {
      return {
        settings: { fontSize: 30, vibrate: true, calm: false, autoAdvance: true },
        favorites: [],
        daily: { date: dateKey(), rem: {}, done: {} },
        last: null
      };
    }
    function load() {
      var base = defaults();
      var raw = null;
      if (canUse) { try { raw = window.localStorage.getItem(KEY); } catch (e) { raw = null; } }
      if (raw) {
        try {
          var p = JSON.parse(raw);
          if (p && typeof p === 'object') {
            base.settings = Object.assign(base.settings, p.settings || {});
            base.favorites = Array.isArray(p.favorites) ? p.favorites.filter(function (id) { return !!itemById(id); }) : [];
            if (p.daily && typeof p.daily === 'object') {
              base.daily = { date: p.daily.date || dateKey(), rem: p.daily.rem || {}, done: p.daily.done || {} };
            }
            base.last = p.last && typeof p.last === 'object' ? p.last : null;
          }
        } catch (e) { /* بيانات تالفة: نبدأ من الصفر */ }
      }
      if (base.daily.date !== dateKey()) base.daily = { date: dateKey(), rem: {}, done: {} };
      base.settings.fontSize = clamp(Number(base.settings.fontSize) || 30, 22, 46);
      return base;
    }
    function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }

    function get() { if (!memory) memory = load(); return memory; }
    function save() {
      if (!canUse || !memory) return;
      try { window.localStorage.setItem(KEY, JSON.stringify(memory)); } catch (e) { /* ممتلئ أو ممنوع */ }
    }
    function rollDay() {
      var s = get();
      if (s.daily.date !== dateKey()) { s.daily = { date: dateKey(), rem: {}, done: {} }; save(); }
    }
    function resetAll() { memory = defaults(); save(); }
    function resetProgress() { var s = get(); s.daily = { date: dateKey(), rem: {}, done: {} }; s.last = null; save(); }
    return { get: get, save: save, rollDay: rollDay, resetAll: resetAll, resetProgress: resetProgress, persistent: canUse };
  })();

  /* ========== 4. الإعدادات والمظهر ========== */
  var Settings = {
    apply: function () {
      var s = Store.get().settings;
      document.documentElement.style.setProperty('--dhikr-size', s.fontSize + 'px');
      document.body.classList.toggle('calm', !!s.calm);
      var meta = $('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', s.calm ? '#2a1d16' : '#3d0d18');
    },
    set: function (k, v) { Store.get().settings[k] = v; Store.save(); Settings.apply(); }
  };

  /* ========== 5. الرسائل والاهتزاز والحافظة ========== */
  var Toast = {
    show: function (msg) {
      var host = $('#toastHost');
      if (!host) return;
      var el = document.createElement('div');
      el.className = 'toast';
      el.textContent = msg;
      host.appendChild(el);
      while (host.children.length > 2) host.removeChild(host.firstChild);
      setTimeout(function () {
        el.classList.add('out');
        setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 320);
      }, 2200);
    }
  };

  function vibrate(pattern) {
    if (!Store.get().settings.vibrate) return;
    try { if (navigator.vibrate) navigator.vibrate(pattern); } catch (e) { /* غير مدعوم */ }
  }

  function shareText(item) {
    var out = item.text;
    out += '\n\nالمصدر: ' + item.source;
    if (item.grade) out += '\nالدرجة: ' + item.grade;
    out += '\n\n(' + SITE_NAME + ')';
    return out;
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      try {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.top = '-1000px';
        document.body.appendChild(ta);
        ta.select();
        var ok = document.execCommand('copy');
        document.body.removeChild(ta);
        ok ? resolve() : reject(new Error('copy failed'));
      } catch (e) { reject(e); }
    });
  }

  function doCopy(item) {
    copyText(shareText(item)).then(
      function () { Toast.show('تم نسخ الذكر'); },
      function () { Toast.show('تعذّر النسخ، يمكنك تحديد النص ونسخه يدويًا'); }
    );
  }

  function doShare(item) {
    var text = shareText(item);
    if (navigator.share) {
      navigator.share({ title: SITE_NAME, text: text }).catch(function (e) {
        if (e && e.name === 'AbortError') return;
        copyText(text).then(function () { Toast.show('تم نسخ النص للمشاركة'); }, function () { Toast.show('تعذّرت المشاركة'); });
      });
    } else {
      copyText(text).then(function () { Toast.show('المشاركة غير متاحة هنا، تم نسخ النص بدلًا منها'); }, function () { Toast.show('تعذّرت المشاركة'); });
    }
  }

  function isFav(id) { return Store.get().favorites.indexOf(id) !== -1; }
  function toggleFav(id) {
    var f = Store.get().favorites;
    var i = f.indexOf(id);
    if (i === -1) { f.push(id); Toast.show('أُضيف إلى المفضلة'); }
    else { f.splice(i, 1); Toast.show('أُزيل من المفضلة'); }
    Store.save();
    return i === -1;
  }

  /* ========== 6. التقدم والعداد ========== */
  var Progress = {
    remaining: function (secId, item) {
      var d = Store.get().daily;
      var k = progKey(secId, item);
      if (item.count == null) return null;
      return (d.rem[k] != null) ? d.rem[k] : item.count;
    },
    isDone: function (secId, item) { return !!Store.get().daily.done[progKey(secId, item)]; },
    markDone: function (secId, item) {
      var d = Store.get().daily; var k = progKey(secId, item);
      d.done[k] = 1; if (item.count != null) d.rem[k] = 0; Store.save();
    },
    reset: function (secId, item) {
      var d = Store.get().daily; var k = progKey(secId, item);
      delete d.done[k]; delete d.rem[k]; Store.save();
    },
    tap: function (secId, item) {
      /* يُرجع: 'done' عند الاكتمال الآن، 'tick' عند النقص، 'already' إن كان مكتملًا */
      var d = Store.get().daily; var k = progKey(secId, item);
      if (item.count == null) {
        if (d.done[k]) return 'already';
        d.done[k] = 1; Store.save(); return 'done';
      }
      var rem = Progress.remaining(secId, item);
      if (rem <= 0) return 'already';
      rem -= 1; d.rem[k] = rem;
      if (rem === 0) { d.done[k] = 1; Store.save(); return 'done'; }
      Store.save(); return 'tick';
    },
    sectionStats: function (secId) {
      var list = itemsOf(secId);
      var done = list.filter(function (a) { return Progress.isDone(secId, a); }).length;
      return { done: done, total: list.length };
    },
    overall: function () {
      var done = 0, total = 0;
      SECTIONS.forEach(function (s) { var st = Progress.sectionStats(s.id); done += st.done; total += st.total; });
      return { done: done, total: total, pct: total ? Math.round(done * 100 / total) : 0 };
    }
  };

  /* ========== 7. العرض ========== */
  var view = null;
  var pending = null; /* مؤقت الانتقال التلقائي */
  function clearPending() { if (pending) { clearTimeout(pending); pending = null; } }

  function setView(html, navKey) {
    clearPending();
    var main = $('#main');
    main.innerHTML = '<div class="view">' + html + '</div>';
    $$('[data-nav]').forEach(function (a) { a.classList.toggle('active', a.getAttribute('data-nav') === navKey); });
    window.scrollTo(0, 0);
  }

  function daypart() {
    var h = new Date().getHours();
    if (h >= 4 && h < 12) return { greet: 'صباح الخير، وأصبحنا وأصبح الملك لله', sec: 'morning' };
    if (h >= 15 || h < 4) return { greet: 'مساء الخير، وأمسينا وأمسى الملك لله', sec: 'evening' };
    return { greet: 'السلام عليكم ورحمة الله وبركاته', sec: 'morning' };
  }

  function datesHtml() {
    var now = new Date();
    var g = '', h = '';
    try { g = new Intl.DateTimeFormat('ar-EG', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(now); } catch (e) { g = ''; }
    try { h = new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura', { day: 'numeric', month: 'long', year: 'numeric' }).format(now); } catch (e) { h = ''; }
    var out = '';
    if (h) out += '<span>' + esc(h) + '</span>';
    if (g) out += '<span>' + esc(g) + '</span>';
    if (h) out += '<span class="note">التاريخ الهجري محسوب بتقويم أم القرى على جهازك، وقد يختلف يومًا عن الرؤية الشرعية.</span>';
    return out;
  }

  function dayIndexPick(list) {
    var start = new Date(new Date().getFullYear(), 0, 0);
    var day = Math.floor((new Date() - start) / 86400000);
    return list[day % list.length];
  }

  function renderHome() {
    Store.rollDay();
    var dp = daypart();
    var pool = ADHKAR.filter(function (a) { return a.kind !== 'hadith' && !a.weak && a.text.length < 420; });
    var pick = dayIndexPick(pool);
    var ov = Progress.overall();
    var circ = 2 * Math.PI * 48;
    var last = Store.get().last;
    var lastHtml = '';
    if (last) {
      var lsec = last.sec === 'fav' ? { title: 'المفضلة' } : sectionById(last.sec);
      var litems = itemsOf(last.sec);
      if (lsec && litems[last.index]) {
        lastHtml = '<h2 class="section-heading">آخر قراءة</h2>' +
          '<a class="frame resume-card" href="#/read/' + esc(last.sec) + '/' + last.index + '">' +
          '<div class="txt"><h3>' + esc(lsec.title) + '</h3><p>' + esc(litems[last.index].text.split('\n')[0]) + '</p></div>' +
          '<span class="btn small">استكمل القراءة</span></a>';
      }
    }
    var cards = SECTIONS.map(function (s) {
      var st = Progress.sectionStats(s.id);
      var pct = st.total ? Math.round(st.done * 100 / st.total) : 0;
      return '<a class="sec-card ' + s.tone + '" href="#/section/' + s.id + '">' +
        '<span class="badge">' + icon(s.icon) + '</span>' +
        '<span class="txt"><h3>' + esc(s.title) + '</h3><p>' + esc(s.desc) + '</p>' +
        '<div class="prog" aria-hidden="true"><i style="width:' + pct + '%"></i></div>' +
        '<div class="meta">' + ar(st.done) + ' من ' + ar(st.total) + ' اليوم</div></span></a>';
    }).join('');

    var html =
      '<section class="hero">' +
        '<div class="logo">أذكار المسلم</div>' +
        '<div class="greet">' + esc(dp.greet) + '</div>' +
        '<div class="verse">' + esc(WELCOME_VERSE.text) + '<small>' + esc(WELCOME_VERSE.src) + '</small></div>' +
        '<div class="dates">' + datesHtml() + '</div>' +
      '</section>' +
      '<h2 class="section-heading">ذكر اليوم</h2>' +
      '<article class="frame today-card">' +
        '<span class="label">' + (pick.kind === 'quran' ? 'من القرآن الكريم' : 'من السنة النبوية') + '</span>' +
        '<div class="text">' + multiline(pick.text.split('\n\n')[0]) + '</div>' +
        '<div class="src">' + esc(pick.source) + (pick.grade ? ' · ' + esc(pick.grade) : '') + '</div>' +
        '<div class="actions">' +
          '<button class="btn small" data-act="today-copy" type="button">' + icon('i-copy') + 'نسخ</button>' +
          '<button class="btn small ghost" data-act="today-share" type="button">' + icon('i-share') + 'مشاركة</button>' +
          '<a class="btn small ghost" href="#/section/' + esc(pick.sections[0]) + '">افتح القسم</a>' +
        '</div>' +
      '</article>' +
      '<h2 class="section-heading">الأقسام</h2>' +
      '<div class="sec-cards">' + cards + '</div>' +
      '<h2 class="section-heading">إنجازك اليوم</h2>' +
      '<div class="frame progress-panel">' +
        '<div class="ring-sm"><svg viewBox="0 0 110 110" aria-hidden="true"><circle class="bg" cx="55" cy="55" r="48"/><circle class="fg" cx="55" cy="55" r="48" stroke-dasharray="' + circ.toFixed(2) + '" stroke-dashoffset="' + (circ * (1 - ov.pct / 100)).toFixed(2) + '"/></svg><div class="pct" dir="ltr">' + ar(ov.pct) + '٪</div></div>' +
        '<div class="info"><h3>' + ar(ov.done) + ' من ' + ar(ov.total) + ' ذكرًا</h3><p>يبدأ العدّ من جديد مع كل يوم. ما تقرؤه يُحفظ على جهازك فقط.</p></div>' +
      '</div>' +
      lastHtml +
      '<p class="site-footer">«أذكار المسلم»، المصادر والتخريج في صفحة <a href="#/about" style="text-decoration:underline">عن المشروع</a>.</p>';
    setView(html, 'home');

    var copyBtn = $('[data-act="today-copy"]');
    if (copyBtn) copyBtn.addEventListener('click', function () { doCopy(pick); });
    var shBtn = $('[data-act="today-share"]');
    if (shBtn) shBtn.addEventListener('click', function () { doShare(pick); });
  }

  function renderSections() {
    var cards = SECTIONS.map(function (s) {
      var st = Progress.sectionStats(s.id);
      var pct = st.total ? Math.round(st.done * 100 / st.total) : 0;
      return '<a class="sec-card ' + s.tone + '" href="#/section/' + s.id + '">' +
        '<span class="badge">' + icon(s.icon) + '</span>' +
        '<span class="txt"><h3>' + esc(s.title) + '</h3><p>' + esc(s.desc) + '</p>' +
        '<div class="prog" aria-hidden="true"><i style="width:' + pct + '%"></i></div>' +
        '<div class="meta">' + ar(st.done) + ' من ' + ar(st.total) + ' اليوم</div></span></a>';
    }).join('');
    setView('<h1 class="page-title">الأقسام</h1><p class="page-sub">اختر القسم الذي تريد قراءته</p><div class="ornament-divider">' + icon('i-star') + '</div><div class="sec-cards">' + cards + '</div>', 'sections');
  }

  function renderSection(secId) {
    var s = sectionById(secId);
    if (!s) return renderNotFound();
    var list = itemsOf(secId);
    var st = Progress.sectionStats(secId);
    var first = 0;
    for (var i = 0; i < list.length; i++) { if (!Progress.isDone(secId, list[i])) { first = i; break; } }
    var warn = '';
    if (secId === 'ruqyah') {
      warn = '<div class="frame about" style="padding:14px 18px;margin-bottom:16px"><p class="warn" style="margin:0">الرقية الشرعية سبب مشروع، والشفاء بيد الله وحده، ولا نضمن به نتيجة. ولا تغني عن مراجعة الطبيب والعلاج الطبي المناسب.</p></div>';
    }
    var rows = list.map(function (a, idx) {
      var done = Progress.isDone(secId, a);
      return '<div class="frame list-item">' +
        '<a href="#/read/' + secId + '/' + idx + '" style="display:block">' +
        (a.title ? '<div class="li-title">' + esc(a.title) + '</div>' : '') +
        (a.group ? '<span class="chip kind" style="margin-bottom:4px">' + esc(a.group) + '</span>' : '') +
        '<div class="li-text">' + multiline(a.text.split('\n').filter(function (l, k) { return !(k === 0 && l.indexOf('بِسْمِ اللَّهِ الرَّحْمَٰنِ') === 0); }).join('\n') || a.text) + '</div></a>' +
        '<div class="li-meta"><span>' + (done ? '✓ تم اليوم' : (a.count != null ? 'التكرار: ' + ar(a.count) : 'بلا عدد محدد')) + '</span>' +
        '<span class="li-actions"><a class="btn small ghost" href="#/read/' + secId + '/' + idx + '">اقرأ</a></span></div></div>';
    }).join('');

    var html =
      '<h1 class="page-title">' + esc(s.title) + '</h1>' +
      '<p class="page-sub">' + esc(s.desc) + '</p>' +
      '<div class="ornament-divider">' + icon('i-star') + '</div>' +
      warn +
      '<div style="text-align:center;margin-bottom:18px">' +
        '<a class="btn" href="#/read/' + secId + '/' + first + '">' + (st.done ? 'تابع القراءة' : 'ابدأ القراءة') + '</a>' +
        '<div class="page-sub" style="margin:8px 0 0">' + ar(st.done) + ' من ' + ar(st.total) + ' اليوم</div>' +
      '</div>' +
      '<div class="list">' + rows + '</div>';
    setView(html, 'sections');
  }

  /* ----- القارئ ----- */
  var R = { sec: null, idx: 0, list: [], dir: 'next' };

  function counterHtml(item, rem, done) {
    var r = 96, circ = 2 * Math.PI * r;
    var frac = item.count == null ? (done ? 1 : 0) : (item.count - rem) / item.count;
    var offset = circ * (1 - frac);
    var inner;
    if (item.count == null) {
      inner = done ? icon('i-check') + '<span class="cap">تمت القراءة</span>' : '<span class="num" style="font-size:34px">تم</span><span class="cap">اضغط عند الانتهاء</span>';
    } else if (done) {
      inner = icon('i-check') + '<span class="cap">اكتمل</span>';
    } else {
      inner = '<span class="num" id="cNum">' + ar(rem) + '</span><span class="cap">متبقٍ</span>';
    }
    return '<div class="counter' + (done ? ' complete' : '') + '" id="counter">' +
      '<svg viewBox="0 0 220 220" aria-hidden="true"><circle class="ticks" cx="110" cy="110" r="106"/><circle class="track" cx="110" cy="110" r="' + r + '"/>' +
      '<circle class="bar" id="cBar" cx="110" cy="110" r="' + r + '" stroke-dasharray="' + circ.toFixed(2) + '" stroke-dashoffset="' + offset.toFixed(2) + '"/></svg>' +
      '<button class="counter-btn" id="counterBtn" type="button" aria-label="' + (item.count == null ? 'تسجيل قراءة الذكر' : 'تسبيح، المتبقي ' + rem) + '">' + inner + '</button></div>';
  }

  function renderReader(secId, idx, dir) {
    var title = secId === 'fav' ? 'المفضلة' : (sectionById(secId) || {}).title;
    var list = itemsOf(secId);
    if (!title || !list.length) return renderNotFound();
    idx = Math.max(0, Math.min(list.length - 1, idx));
    R.sec = secId; R.idx = idx; R.list = list; R.dir = dir || 'next';
    var item = list[idx];
    var rem = Progress.remaining(secId, item);
    var done = Progress.isDone(secId, item);

    var st = Store.get();
    st.last = { sec: secId, index: idx }; Store.save();

    var bar = list.map(function (a, i) {
      var cls = i === idx ? 'cur' : (Progress.isDone(secId, a) ? 'done' : '');
      return '<i class="' + cls + '"></i>';
    }).join('');

    var chips = '';
    chips += '<span class="chip kind">' + (item.kind === 'quran' ? 'قرآن كريم' : item.kind === 'hadith' ? 'حديث' : 'ذكر') + '</span>';
    if (item.group) chips += '<span class="chip">' + esc(item.group) + '</span>';
    if (item.grade) chips += '<span class="chip ' + (item.weak ? 'weak' : 'grade') + '">' + esc(item.grade) + '</span>';
    chips += '<span class="chip kind">' + (item.count != null ? 'التكرار: ' + ar(item.count) : 'بلا عدد محدد') + '</span>';

    var fav = isFav(item.id);
    var isLast = idx === list.length - 1;
    var html =
      '<div class="reader">' +
        '<div class="reader-top">' +
          '<a class="round-btn" href="#/section/' + (secId === 'fav' ? '' : secId) + '" id="backLink" aria-label="رجوع إلى القائمة">' + icon('i-prev') + '</a>' +
          '<div class="title"><h1>' + esc(title) + '</h1><span>' + ar(idx + 1) + ' من ' + ar(list.length) + '</span></div>' +
          '<button class="round-btn' + (fav ? ' on' : '') + '" id="favBtn" type="button" aria-pressed="' + fav + '" aria-label="' + (fav ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة') + '">' + icon('i-heart') + '</button>' +
        '</div>' +
        '<div class="stepbar" aria-hidden="true">' + bar + '</div>' +
        '<article class="frame dhikr-card slide-' + R.dir + '" id="dhikrCard">' +
          (item.title ? '<h2 class="dhikr-title">' + esc(item.title) + '</h2>' : '') +
          '<div class="chips">' + chips + '</div>' +
          '<div class="dhikr-text">' + multiline(item.text) + '</div>' +
          (item.note ? '<div class="dhikr-note">' + esc(item.note) + '</div>' : '') +
          '<div class="counter-wrap">' + counterHtml(item, rem, done) + '</div>' +
          '<div class="reader-actions">' +
            '<button class="round-btn" id="resetBtn" type="button" aria-label="إعادة العداد" title="إعادة العداد">' + icon('i-reset') + '</button>' +
            '<button class="round-btn" id="copyBtn" type="button" aria-label="نسخ الذكر" title="نسخ">' + icon('i-copy') + '</button>' +
            '<button class="round-btn" id="shareBtn" type="button" aria-label="مشاركة الذكر" title="مشاركة">' + icon('i-share') + '</button>' +
          '</div>' +
          '<div class="dhikr-source"><b>المصدر:</b> ' + esc(item.source) + '</div>' +
        '</article>' +
        '<div class="reader-nav">' +
          '<button class="btn ghost" id="prevBtn" type="button"' + (idx === 0 ? ' disabled' : '') + '>' + icon('i-prev') + 'السابق</button>' +
          '<button class="btn' + (done ? ' pulse' : '') + '" id="nextBtn" type="button">' + (isLast ? 'إنهاء القسم' : 'التالي') + icon('i-next') + '</button>' +
        '</div>' +
        '<p class="hint">' + (item.count == null ? 'هذا الذكر لم يثبت له عدد، فاقرأه بتدبّر ثم انتقل متى شئت.' : 'اضغط على الدائرة أو على البطاقة للتسبيح.') + '</p>' +
      '</div>';
    setView(html, 'sections');
    $('#backLink').setAttribute('href', secId === 'fav' ? '#/favorites' : '#/section/' + secId);
    bindReader(item);
  }

  function updateCounterUI(item, rem, done, justTapped) {
    var holder = $('#counter');
    if (!holder) return;
    var parent = holder.parentNode;
    var bar = $('#cBar');
    if (!done && item.count != null && bar) {
      var circ = 2 * Math.PI * 96;
      bar.setAttribute('stroke-dashoffset', (circ * (1 - (item.count - rem) / item.count)).toFixed(2));
      var num = $('#cNum');
      if (num) num.textContent = ar(rem);
      $('#counterBtn').setAttribute('aria-label', 'تسبيح، المتبقي ' + rem);
      if (justTapped) { holder.classList.remove('pop'); void holder.offsetWidth; holder.classList.add('pop'); }
    } else {
      parent.innerHTML = counterHtml(item, rem, done);
      var c = $('#counter');
      if (c && justTapped) c.classList.add('pop');
      $('#counterBtn').addEventListener('click', onTap);
    }
  }

  function currentItem() { return R.list[R.idx]; }

  function onTap(ev) {
    if (ev) ev.stopPropagation();
    var item = currentItem();
    if (!item) return;
    var res = Progress.tap(R.sec, item);
    if (res === 'already') { Toast.show('اكتمل هذا الذكر، انتقل إلى التالي أو أعد العداد'); return; }
    if (res === 'tick') {
      vibrate(12);
      updateCounterUI(item, Progress.remaining(R.sec, item), false, true);
      return;
    }
    /* اكتمال */
    vibrate([30, 40, 30]);
    updateCounterUI(item, Progress.remaining(R.sec, item), true, true);
    var card = $('#dhikrCard');
    if (card) { card.classList.remove('burst'); void card.offsetWidth; card.classList.add('burst'); }
    var bars = $$('.stepbar i'); if (bars[R.idx]) { bars[R.idx].className = 'done'; bars[R.idx].style.background = ''; }
    var nb = $('#nextBtn'); if (nb) nb.classList.add('pulse');
    if (item.count == null) {
      Toast.show('سُجّلت القراءة، تقبّل الله منك');
    } else {
      Toast.show('تم الذكر، تقبّل الله منك');
      if (Store.get().settings.autoAdvance) {
        var token = R.sec + ':' + R.idx;
        clearPending();
        pending = setTimeout(function () {
          pending = null;
          if (token === R.sec + ':' + R.idx) goNext(true);
        }, 1300);
      }
    }
  }

  function goNext(auto) {
    clearPending();
    if (R.idx >= R.list.length - 1) { renderComplete(R.sec); return; }
    var target = R.idx + 1;
    location.hash = '#/read/' + R.sec + '/' + target;
  }
  function goPrev() {
    clearPending();
    if (R.idx > 0) location.hash = '#/read/' + R.sec + '/' + (R.idx - 1);
  }

  function bindReader(item) {
    $('#counterBtn').addEventListener('click', onTap);
    $('#dhikrCard').addEventListener('click', function (e) {
      if (e.target.closest('button, a')) return;
      var sel = window.getSelection && window.getSelection().toString();
      if (sel) return;
      onTap(e);
    });
    $('#resetBtn').addEventListener('click', function (e) {
      e.stopPropagation(); clearPending();
      Progress.reset(R.sec, item);
      renderReaderInPlace();
      Toast.show('أُعيد العداد');
    });
    $('#copyBtn').addEventListener('click', function (e) { e.stopPropagation(); doCopy(item); });
    $('#shareBtn').addEventListener('click', function (e) { e.stopPropagation(); doShare(item); });
    $('#favBtn').addEventListener('click', function (e) {
      e.stopPropagation();
      var on = toggleFav(item.id);
      var b = $('#favBtn');
      b.classList.toggle('on', on);
      b.setAttribute('aria-pressed', String(on));
      b.setAttribute('aria-label', on ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة');
    });
    $('#prevBtn').addEventListener('click', goPrev);
    $('#nextBtn').addEventListener('click', function () { goNext(false); });
  }

  function renderReaderInPlace() {
    var s = R.sec, i = R.idx;
    renderReader(s, i, 'next');
  }

  function renderComplete(secId) {
    clearPending();
    var title = secId === 'fav' ? 'المفضلة' : sectionById(secId).title;
    Store.get().last = null; Store.save();
    vibrate([40, 50, 40, 50, 60]);
    var html =
      '<div class="frame complete-panel">' +
        '<div class="seal">' + icon('i-check') + '</div>' +
        '<h2>أتممت ' + esc(title) + '</h2>' +
        '<p class="page-sub">تقبّل الله منك، وجعلها في ميزان حسناتك.</p>' +
        '<div class="btn-row">' +
          '<a class="btn" href="#/">الرئيسية</a>' +
          '<a class="btn ghost" href="#/section/' + (secId === 'fav' ? '' : secId) + '" id="backToSec">قائمة القسم</a>' +
          '<button class="btn ghost" id="restartSec" type="button">ابدأ من جديد</button>' +
        '</div>' +
      '</div>';
    setView(html, 'sections');
    $('#backToSec').setAttribute('href', secId === 'fav' ? '#/favorites' : '#/section/' + secId);
    $('#restartSec').addEventListener('click', function () {
      itemsOf(secId).forEach(function (a) { Progress.reset(secId, a); });
      location.hash = '#/read/' + secId + '/0';
    });
  }

  /* ----- المفضلة ----- */
  function renderFavorites() {
    var list = itemsOf('fav');
    var html = '<h1 class="page-title">المفضلة</h1><p class="page-sub">الأذكار التي حفظتها لتعود إليها بسرعة</p><div class="ornament-divider">' + icon('i-star') + '</div>';
    if (!list.length) {
      html += '<div class="frame empty">' + icon('i-heart') + '<h3>لا توجد أذكار مفضلة بعد</h3><p>افتح أي ذكر واضغط على أيقونة القلب في أعلى البطاقة لتجده هنا.</p><a class="btn" href="#/sections">تصفّح الأقسام</a></div>';
      return setView(html, 'favorites');
    }
    html += '<div style="text-align:center;margin-bottom:16px"><a class="btn" href="#/read/fav/0">اقرأ المفضلة بالتتابع</a></div><div class="list">';
    html += list.map(function (a, idx) {
      return '<div class="frame list-item" data-id="' + esc(a.id) + '">' +
        '<a href="#/read/fav/' + idx + '" style="display:block"><div class="li-text">' + multiline(a.text) + '</div></a>' +
        '<div class="li-meta"><span>' + esc(a.source.split('.')[0]) + '</span><span class="li-actions">' +
          '<button class="round-btn" data-copy="' + esc(a.id) + '" type="button" aria-label="نسخ">' + icon('i-copy') + '</button>' +
          '<button class="round-btn" data-share="' + esc(a.id) + '" type="button" aria-label="مشاركة">' + icon('i-share') + '</button>' +
          '<button class="round-btn" data-unfav="' + esc(a.id) + '" type="button" aria-label="إزالة من المفضلة">' + icon('i-trash') + '</button>' +
        '</span></div></div>';
    }).join('') + '</div>';
    setView(html, 'favorites');
    $$('[data-copy]').forEach(function (b) { b.addEventListener('click', function () { doCopy(itemById(b.getAttribute('data-copy'))); }); });
    $$('[data-share]').forEach(function (b) { b.addEventListener('click', function () { doShare(itemById(b.getAttribute('data-share'))); }); });
    $$('[data-unfav]').forEach(function (b) {
      b.addEventListener('click', function () { toggleFav(b.getAttribute('data-unfav')); renderFavorites(); });
    });
  }

  /* ----- البحث ----- */
  function highlight(text, q) {
    var safe = esc(text);
    if (!q) return safe;
    /* التظليل على النص الأصلي بحروفه المشكولة: نبني نمطًا يتجاوز التشكيل */
    var marks = '[\\u064B-\\u065F\\u0670\\u06D6-\\u06ED\\u0640]*';
    var variants = { 'ا': '[اأإآٱ]', 'ي': '[يى]', 'ه': '[هة]', 'و': '[وؤ]' };
    var pat = Array.prototype.map.call(normalize(q).trim(), function (ch) {
      if (ch === ' ') return '\\s+';
      var base = variants[ch] || ch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return base + marks;
    }).join('');
    if (!pat) return safe;
    try { return safe.replace(new RegExp('(' + pat + ')', 'g'), '<mark>$1</mark>'); } catch (e) { return safe; }
  }

  function renderSearch(q) {
    q = q || '';
    var html = '<h1 class="page-title">البحث</h1><p class="page-sub">ابحث في نص الذكر أو مصدره، ولا يلزم ضبط التشكيل</p>' +
      '<form class="search-box" id="searchForm" role="search">' + icon('i-search') +
      '<input id="searchInput" type="search" inputmode="search" enterkeyhint="search" autocomplete="off" placeholder="اكتب كلمة للبحث" aria-label="بحث عن ذكر" value="' + esc(q) + '"></form>' +
      '<div id="results"></div>';
    setView(html, 'search');
    var input = $('#searchInput');
    function run() {
      var term = input.value;
      var n = normalize(term).trim();
      var box = $('#results');
      if (!n) { box.innerHTML = '<div class="frame empty">' + icon('i-search') + '<h3>ابدأ الكتابة</h3><p>مثال: الكرسي، الاستغفار، الخروج، الشفاء.</p></div>'; return; }
      var found = ADHKAR.map(function (a) {
        var hay = normalize((a.title || '') + ' ' + a.text + ' ' + a.source + ' ' + (a.note || '') + ' ' + (a.group || ''));
        return hay.indexOf(n) !== -1 ? a : null;
      }).filter(Boolean);
      if (!found.length) { box.innerHTML = '<div class="frame empty">' + icon('i-search') + '<h3>لا توجد نتائج</h3><p>جرّب كلمة أقصر أو مختلفة.</p></div>'; return; }
      box.innerHTML = '<div class="results-count">' + ar(found.length) + ' نتيجة</div><div class="list">' + found.map(function (a) {
        var sec = sectionById(a.sections[0]);
        var idx = itemsOf(sec.id).indexOf(a);
        var snippet = a.text.length > 260 ? a.text.slice(0, 260) + '…' : a.text;
        return '<a class="frame list-item" href="#/read/' + sec.id + '/' + idx + '">' + (a.title ? '<div class="li-title">' + esc(a.title) + '</div>' : '') + '<div class="li-text">' + highlight(snippet, term).replace(/\n/g, '<br>') + '</div>' +
          '<div class="li-meta"><span>' + a.sections.map(function (s) { return esc(sectionById(s).short); }).join(' · ') + '</span><span>' + esc(a.source.split('.')[0]) + '</span></div></a>';
      }).join('') + '</div>';
    }
    input.addEventListener('input', run);
    $('#searchForm').addEventListener('submit', function (e) { e.preventDefault(); run(); input.blur(); });
    run();
    if (!q) input.focus();
  }

  /* ----- الإعدادات ----- */
  function renderSettings() {
    var s = Store.get().settings;
    var html =
      '<h1 class="page-title">الإعدادات</h1><p class="page-sub">اضبط القراءة بما يريحك</p><div class="ornament-divider">' + icon('i-star') + '</div>' +
      '<div class="settings-list">' +
        '<div class="frame setting"><h3>حجم الخط</h3><p>يتغير حجم نص الذكر في القارئ مباشرة.</p>' +
          '<div class="font-ctl"><button type="button" id="fontMinus" aria-label="تصغير الخط">−</button>' +
          '<input type="range" id="fontRange" min="22" max="46" step="1" value="' + s.fontSize + '" aria-label="حجم الخط">' +
          '<button type="button" id="fontPlus" aria-label="تكبير الخط">+</button></div>' +
          '<div class="font-preview" id="fontPreview">سُبْحَانَ اللَّهِ وَبِحَمْدِهِ</div></div>' +
        toggleHtml('vibrate', 'الاهتزاز عند النقر', 'اهتزاز خفيف عند التسبيح إذا كان جهازك يدعمه.', s.vibrate) +
        toggleHtml('autoAdvance', 'الانتقال التلقائي', 'الانتقال إلى الذكر التالي بعد اكتمال العدد. يمكنك إيقافه والتحكم يدويًا.', s.autoAdvance) +
        toggleHtml('calm', 'وضع القراءة الهادئ', 'ألوان داكنة ناعمة وزخارف أخف لقراءة مريحة ليلًا.', s.calm) +
        '<div class="frame setting"><h3>البيانات</h3><p>' + (Store.persistent ? 'تُحفظ بياناتك على جهازك فقط داخل المتصفح.' : 'التخزين المحلي غير متاح في هذا المتصفح، فلن يُحفظ التقدم بعد إغلاق الصفحة.') + '</p>' +
          '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:12px">' +
          '<button class="btn small ghost" id="resetProgress" type="button">تصفير تقدم اليوم</button>' +
          '<button class="btn small danger" id="resetAll" type="button">مسح كل البيانات</button></div></div>' +
        '<div class="frame setting"><div class="row"><div><h3>عن المشروع ومصادره</h3><p>المنهج والمراجع وتنبيهات مهمة.</p></div><a class="btn small" href="#/about">افتح</a></div></div>' +
      '</div>';
    setView(html, 'settings');
    function setFont(v) {
      v = Math.max(22, Math.min(46, v));
      $('#fontRange').value = v;
      Settings.set('fontSize', v);
    }
    $('#fontRange').addEventListener('input', function (e) { setFont(Number(e.target.value)); });
    $('#fontMinus').addEventListener('click', function () { setFont(Store.get().settings.fontSize - 2); });
    $('#fontPlus').addEventListener('click', function () { setFont(Store.get().settings.fontSize + 2); });
    $$('[data-toggle]').forEach(function (inp) {
      inp.addEventListener('change', function () {
        var k = inp.getAttribute('data-toggle');
        Settings.set(k, inp.checked);
        if (k === 'vibrate' && inp.checked) { vibrate(30); }
        Toast.show(inp.checked ? 'تم التفعيل' : 'تم الإيقاف');
      });
    });
    $('#resetProgress').addEventListener('click', function () {
      if (window.confirm('هل تريد تصفير تقدم اليوم وآخر قراءة؟')) { Store.resetProgress(); Toast.show('تم تصفير التقدم'); }
    });
    $('#resetAll').addEventListener('click', function () {
      if (window.confirm('سيُمسح كل شيء: المفضلة والتقدم والإعدادات. هل أنت متأكد؟')) { Store.resetAll(); Settings.apply(); renderSettings(); Toast.show('تم مسح البيانات'); }
    });
  }
  function toggleHtml(key, title, desc, on) {
    return '<div class="frame setting"><div class="row"><div><h3>' + esc(title) + '</h3><p>' + esc(desc) + '</p></div>' +
      '<label class="switch"><input type="checkbox" data-toggle="' + key + '" aria-label="' + esc(title) + '"' + (on ? ' checked' : '') + '><span></span></label></div></div>';
  }

  /* ----- عن المشروع ----- */
  function renderAbout() {
    var html =
      '<h1 class="page-title">عن المشروع</h1><div class="ornament-divider">' + icon('i-star') + '</div>' +
      '<article class="frame about">' +
        '<p>«أذكار المسلم» موقع يعمل بلا خادم، يعرض الأذكار الثابتة ذكرًا واحدًا في كل شاشة مع عدّاد ومتابعة للإنجاز، ويحفظ كل شيء على جهازك فقط.</p>' +
        '<h2>منهج المحتوى</h2><ul>' +
          '<li>لا يتضمن الموقع نصًا منسوبًا إلى النبي ﷺ دون مصدر.</li>' +
          '<li>ما لم يثبت له عدد معين لا يُفرض له عدد، ويظهر بوصف «بلا عدد محدد».</li>' +
          '<li>الضعيف إن ذُكر فهو موسوم بوضوح بأنه ضعيف وللتنبيه فقط.</li>' +
          '<li>الدرجات المذكورة تعزى إلى الألباني حيث ذُكر ذلك، وإلى الشيخين (متفق عليه) أو مسلم أو البخاري حيث وردت فيهما.</li>' +
        '</ul>' +
        '<h2>المصادر</h2><ul>' +
          '<li>القرآن الكريم.</li><li>صحيح البخاري وصحيح مسلم.</li>' +
          '<li>سنن أبي داود وجامع الترمذي وسنن ابن ماجه وسنن النسائي.</li>' +
          '<li>المستدرك للحاكم، وأحكام الألباني في صحيح الترغيب والترهيب وصحيح أبي داود وغيرها.</li>' +
        '</ul>' +
        '<p class="warn">أرقام الأحاديث تُنسب إلى الطبعات المتداولة (ترقيم فتح الباري للبخاري، وترقيم محمد فؤاد عبد الباقي لمسلم)، وقد تختلف قليلًا بين الطبعات. ننصحك بمراجعة موسوعة الدرر السنية (dorar.net) أو موقع إسلام ويب للتحقق، وبسؤال أهل العلم فيما يشكل. نرحّب بتصحيح أي خطأ تجده.</p>' +
        '<h2>الرقية الشرعية</h2>' +
        '<p class="warn">الرقية الشرعية سبب مشروع، والشفاء بيد الله وحده. لا نضمن بها نتيجة، ولا تغني عن مراجعة الطبيب والعلاج الطبي.</p>' +
        '<h2>التاريخ</h2><p>يُحسب التاريخ الهجري على جهازك بتقويم أم القرى، وقد يختلف يومًا عن الرؤية الشرعية للهلال، فلا تعتمد عليه في العبادات المرتبطة بالرؤية.</p>' +
        '<h2>الخصوصية</h2><p>لا يرسل الموقع أي بيانات إلى أي جهة. المفضلة والتقدم والإعدادات تُحفظ في تخزين المتصفح المحلي، ويُحمَّل خط أميري من خطوط جوجل للتجميل فقط، وإن تعذّر تحميله استُخدم خط عربي بديل.</p>' +
      '</article>';
    setView(html, 'about');
  }

  function renderNotFound() {
    setView('<div class="frame empty">' + icon('i-info') + '<h3>الصفحة غير موجودة</h3><p>الرابط الذي طلبته غير متاح.</p><a class="btn" href="#/">العودة إلى الرئيسية</a></div>', '');
  }

  /* ========== 8. التنقل ========== */
  function route() {
    Store.rollDay();
    var h = (location.hash || '#/').replace(/^#/, '');
    var parts = h.split('/').filter(Boolean);
    var prevReader = view === 'read';
    try {
      if (!parts.length) { view = 'home'; return renderHome(); }
      switch (parts[0]) {
        case 'sections': view = 'sections'; return renderSections();
        case 'section': view = 'section'; return renderSection(parts[1]);
        case 'read':
          var idx = parseInt(parts[2], 10); if (isNaN(idx)) idx = 0;
          var dir = (R.sec === parts[1] && idx < R.idx && prevReader) ? 'prev' : 'next';
          view = 'read'; return renderReader(parts[1], idx, dir);
        case 'favorites': view = 'favorites'; return renderFavorites();
        case 'search': view = 'search'; return renderSearch(decodeURIComponent(parts[1] || ''));
        case 'settings': view = 'settings'; return renderSettings();
        case 'about': view = 'about'; return renderAbout();
        default: view = 'nf'; return renderNotFound();
      }
    } catch (err) {
      if (window.console) console.error(err);
      setView('<div class="frame empty">' + icon('i-info') + '<h3>حدث خطأ غير متوقع</h3><p>أعد تحميل الصفحة، وإن تكرر الأمر فامسح البيانات من الإعدادات.</p><a class="btn" href="#/">الرئيسية</a></div>', '');
    }
  }

  document.addEventListener('keydown', function (e) {
    if (view !== 'read') return;
    var tag = (e.target && e.target.tagName) || '';
    if (/INPUT|TEXTAREA|SELECT/.test(tag)) return;
    if (e.key === 'ArrowLeft') { e.preventDefault(); goNext(false); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); goPrev(); }
    else if ((e.key === ' ' || e.key === 'Enter') && !/BUTTON|A/.test(tag)) { e.preventDefault(); onTap(); }
  });

  /* ========== 9. التشغيل ========== */
  function init() {
    Settings.apply();
    window.addEventListener('hashchange', route);
    document.addEventListener('visibilitychange', function () { if (!document.hidden) Store.rollDay(); });
    route();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();

  /* للاختبار الآلي */
  window.__adhkar = { ADHKAR: ADHKAR, SECTIONS: SECTIONS, Store: Store };
})();
