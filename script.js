// Inventory State
let inventory = {
    tree: 454,
    flower: 501,
    solar: 12,
    solarArea: 24 // in m2
};

// Admin State
let isAdmin = false;

// DOM Elements
const treeCountEl = document.getElementById('tree-count');
const flowerCountEl = document.getElementById('flower-count');
const solarCountEl = document.getElementById('solar-count');
const solarAreaEl = document.getElementById('solar-area');
const co2AbsorbedEl = document.getElementById('co2-absorbed');
const o2ProducedEl = document.getElementById('o2-produced');

const adminControls = document.querySelectorAll('.admin-controls');
const adminTrigger = document.getElementById('admin-trigger');
const adminModal = document.getElementById('admin-modal');
const adminPassword = document.getElementById('admin-password');
const loginError = document.getElementById('login-error');
const adminStatusBadge = document.getElementById('admin-status-badge');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const themeLabel = document.getElementById('theme-label');
const languageSelect = document.getElementById('language-select');

const translations = {
    en: {
        pageTitle: 'Denov 2-IMI Eco-school Platform',
        slogan: 'Innovating for a Greener Future',
        solarPanelsText: 'Solar Panels',
        adminTriggerTitle: 'Triple-click to unlock Developer Mode',
        leader1Role: 'Principal',
        leader1Bio: 'Sapiyeva Nargiza Mamayusupovna is the principal of Denov Specialized Boarding School No. 2 and an experienced leader focused on educational management and developing the teaching team. She is committed to improving educational quality, supporting teachers’ professional development, and helping students achieve excellent results through effective management and modern teaching approaches. She conducts research as an independent PhD researcher in economics.',
        leader2Role: 'Deputy Principal for Spiritual and Educational Affairs',
        leader2Bio: 'An accomplished specialist with strong potential and extensive experience. He works effectively in education and character development, making a meaningful contribution to youth development and fostering national and universal values. His initiative, responsibility, and dedication have earned him great respect among colleagues.',
        leader3Role: 'Parent Committee Member',
        leader3Bio: 'A doctoral researcher in the English Language program at the DTPI Faculty of Philology and a top-category English teacher. Her research focuses primarily on linguistics, religious and Islamic discourse, and the expression and translation of religious and cultural concepts into English.',
        leader4Role: 'Project Coordinator',
        leader4Bio: 'A member of the Youth Parliament under the Legislative Chamber of the Oliy Majlis and the Ecological Party of Uzbekistan. She is the regional mentor for the Eco-Schools Uzbekistan project in Surkhandarya Region and coordinator at Denov Specialized Boarding School No. 2. She leads projects that promote environmental education, green initiatives, and student engagement in ecology.',
        leader1Alt: 'Portrait of Sapiyeva Nargiza Mamayusupovna',
        leader2Alt: 'Portrait of Suxrob Xodjaqulov',
        leader3Alt: 'Portrait of Dilnoza Rashidova',
        leader4Alt: 'Portrait of Sohibjamol Avazova',
        student1Class: '11-T · Student Mentor',
        showMore: 'Show more',
        showLess: 'Show less',
        themeLight: 'Light mode',
        themeDark: 'Dark mode',
        guestMode: 'Guest Mode',
        developerActive: 'Dev Mode Active',
        solarAreaPrompt: 'Enter new total Solar Panel area (m²):',
        developerDisabled: 'Developer Mode Disabled.',
        developerUnlocked: 'Developer / Admin Mode Unlocked!\nYou can now edit the inventory counts.',
        contestAdminRequired: 'You must be in Developer Mode to start the contest.',
        aiEvaluating: 'AI EVAL...',
        done: 'DONE',
        fakeWinnerName: 'Alex Pioneer',
        fakeWinnerProject: 'Solar Tech Synthesizer'
    },
    uz: {
        pageTitle: 'Denov 2-IMI ekologik maktab platformasi',
        slogan: 'Yashil kelajak sari innovatsiyalar',
        solarPanelsText: 'Quyosh panellari',
        adminTriggerTitle: 'Dasturchi rejimini ochish uchun uch marta bosing',
        languageLabel: 'Til',
        navDashboard: 'Boshqaruv paneli',
        navAlerts: 'Ekologik ogohlantirishlar',
        navEducation: 'Ta’lim markazi',
        navLeadership: 'Rahbariyat',
        themeLight: 'Yorug‘ rejim',
        themeDark: 'Qorong‘i rejim',
        guestMode: 'Mehmon rejimi',
        developerActive: 'Dasturchi rejimi faol',
        heroWelcome: 'Yashil kelajagimizga',
        heroGreenFuture: 'xush kelibsiz',
        heroDescription: 'Maktabimiz ekologiyasini kuzating, atrof-muhit haqida o‘rganing va barqaror kelajak uchun ekologik loyihalarimizga qo‘shiling.',
        heroButton: 'Boshqaruv paneliga o‘tish',
        inventoryTitle: 'O‘simliklar hisoblagichi',
        dashboardSections: 'Boshqaruv paneli bo‘limlari',
        organizationLeaders: 'Tashkilot rahbarlari',
        studentsCount: 'O‘quvchilar (10)',
        treesPlanted: 'Ekilgan daraxtlar',
        flowersBloomed: 'Gullagan gullar',
        subtractPanel: 'Panelni ayirish',
        addPanel: 'Panel qo‘shish',
        editPanelArea: 'Maydonni tahrirlash (m²)',
        airQualityTitle: 'Havo sifatiga ta’siri',
        co2PerDay: 'Kuniga yutiladigan CO₂ (kg)',
        o2PerDay: 'Kuniga ishlab chiqariladigan O₂ (kg)',
        alertsTitle: 'Jonli ekologik ogohlantirishlar',
        educationTitle: 'Ta’lim markazi',
        galleryTitle: 'Maktab ekologik loyihalari galereyasi',
        recyclingDrive: 'Chiqindilarni qayta ishlash aksiyasi',
        solarPanelsSetup: 'Quyosh panellari',
        compostingPit: 'Kompost tayyorlash',
        waterSaving: 'Suvni tejash',
        presentationsTitle: 'Interaktiv ekologiya taqdimotlari',
        climateTitle: 'Iqlim o‘zgarishi asoslari',
        climateDescription: 'Global isish va issiqxona gazlari asoslarini, shuningdek, o‘quvchilar sifatida qanday yordam bera olishimizni bilib oling.',
        biodiversityTitle: 'Mahalliy biologik xilma-xillik',
        biodiversityDescription: 'Maktabimiz hududi va mahalliy mintaqaga xos boy o‘simlik hamda hayvonot dunyosini kashf eting.',
        zeroWasteTitle: 'Chiqindisiz turmush tarzi',
        zeroWasteDescription: 'Maktabda va uyda kundalik chiqindilarni kamaytirish bo‘yicha amaliy tavsiyalar.',
        previousPresentation: 'Oldingi taqdimot',
        nextPresentation: 'Keyingi taqdimot',
        leadershipTag: 'Rahbariyat / Asoschilar',
        leadershipTitle: 'Asoschilar va rahbariyat jamoasi',
        leader1Role: 'Direktor',
        leader1Bio: 'Sapiyeva Nargiza Mamayusupovna — Denov tumani 2-son ixtisoslashtirilgan maktab-internati direktori, ta’lim boshqaruvi va pedagogik jamoani rivojlantirishga e’tibor qaratib kelayotgan tajribali rahbar. U ta’lim sifatini oshirish, pedagoglarning kasbiy rivojlanishini qo‘llab-quvvatlash va o‘quvchilarning yuqori natijalarga erishishi uchun samarali boshqaruv hamda zamonaviy pedagogik yondashuvlarni qo‘llashga alohida e’tibor beradi. Iqtisodiyot fanlari bo‘yicha PhD erkin tadqiqotchisi sifatida ilmiy ish olib bormoqda.',
        leader2Role: 'Ma’naviy-ma’rifiy ishlar bo‘yicha direktor o‘rinbosari',
        leader2Bio: 'O‘z sohasining yetuk mutaxassisi, yuksak salohiyat va boy tajribaga ega. Ma’rifat va ma’naviyat yo‘nalishida samarali faoliyat yuritib, yoshlar tarbiyasi hamda ularning ongida milliy va umuminsoniy qadriyatlarni shakllantirishga alohida hissa qo‘shib kelmoqda. Tashabbuskorligi, mas’uliyati va fidoyiligi bilan jamoada katta hurmatga sazovor.',
        leader3Role: 'Ota-onalar qo‘mitasi a’zosi',
        leader3Bio: 'DTPI Filologiya fakultetining ingliz tili yo‘nalishi tayanch doktoranti hamda ingliz tili fani bo‘yicha oliy toifali o‘qituvchi. Ilmiy yo‘nalishi asosan lingvistika, diniy diskurs, islomiy diskurs va diniy-madaniy realiyalarni ingliz tilida ifodalash hamda tarjima qilish masalalariga qaratilgan.',
        leader4Role: 'Loyiha koordinatori',
        leader4Bio: 'Oliy Majlis Qonunchilik palatasi huzuridagi Yoshlar Parlamenti a’zosi va O‘zbekiston Ekologik partiyasi a’zosi. “Eco-Schools Uzbekistan” loyihasining Surxondaryo viloyati hududiy mentori hamda Denov tumani 2-son ixtisoslashtirilgan maktab-internati koordinatori. Maktabda ekologik ta’lim, yashil tashabbuslar va o‘quvchilarning ekologik faolligini rivojlantirish loyihalarini amalga oshiradi.',
        leader1Alt: 'Sapiyeva Nargiza Mamayusupovnaning rasmi',
        leader2Alt: 'Suxrob Xodjaqulovning rasmi',
        leader3Alt: 'Dilnoza Rashidovaning rasmi',
        leader4Alt: 'Sohibjamol Avazovaning rasmi',
        studentsTitle: 'O‘quvchilar',
        student1Class: '11-T · Mentor o‘quvchi',
        student1Alt: 'Parvina Ikromovaning rasmi',
        student2Alt: 'Oybek Baratovning rasmi',
        student3Alt: 'Parizoda Normurodovaning rasmi',
        student4Alt: 'Sardor Saidahmatovning rasmi',
        student5Alt: 'Muhammadali Yo‘ldoshovning rasmi',
        student6Alt: 'Dildora Muxamedovaning rasmi',
        student7Alt: 'Salomat Baratovaning rasmi',
        student8Alt: 'Umar Mamatmurodovning rasmi',
        student9Alt: 'Asal Baxtiyorovaning rasmi',
        student10Alt: 'Diyorbek Begmamatovning rasmi',
        startupTitle: 'Ekologik startap markazi va sun’iy intellekt tanlovi',
        startupDescription: 'Ekologik toza innovatsion startap g‘oyangizni yuboring. Dasturchi ortga sanash taymerini ishga tushirgach, sun’iy intellekt arizalarni baholaydi!',
        submitProjectTitle: 'Loyihangizni yuboring',
        projectName: 'Loyiha nomi',
        projectPlaceholder: 'masalan, GreenTech Recycler',
        fullName: 'To‘liq ism',
        namePlaceholder: 'masalan, Ali Valiyev',
        phoneNumber: 'Telefon raqami',
        phonePlaceholder: 'masalan, +998 90 123 45 67',
        submitIdea: 'G‘oyani yuborish',
        projectSuccess: 'Loyiha muvaffaqiyatli yuborildi!',
        evaluationStatus: 'Sun’iy intellekt baholash holati',
        timerControl: 'Dasturchi taymer boshqaruvi',
        secondsPlaceholder: 'Soniyalar',
        startEvaluation: 'Baholashni boshlash',
        calculatorTitle: 'Jonli ekologik kalkulyator',
        calculatorDescription: 'Atrof-muhitga taxminiy ta’sirni ko‘rish uchun daraxt va gullar sonini kiriting.',
        numberTrees: 'Daraxtlar soni',
        treesPlaceholder: 'masalan, 10',
        numberFlowers: 'Gullar soni',
        flowersPlaceholder: 'masalan, 50',
        numberPanels: 'Quyosh panellari soni',
        panelsPlaceholder: 'masalan, 12',
        totalPanelArea: 'Panellarning umumiy maydoni (m²)',
        areaPlaceholder: 'masalan, 24',
        estimatedCo2: 'Taxminiy CO₂ kamayishi (kg / kun)',
        estimatedO2: 'Taxminiy O₂ ishlab chiqarilishi (kg / kun)',
        estimatedEnergy: 'Taxminiy energiya ishlab chiqarilishi (kWh / kun)',
        footerCopyright: '© 2026 Denov 2-IMI Eco-school. Yer sayyorasi uchun',
        footerEarth: 'mehr bilan yaratildi.',
        winnerTitle: '🏆 Sun’iy intellekt baholashi yakunlandi! 🏆',
        winnerSubtitle: 'Ekologik startap tanlovi g‘olibi:',
        winnerProjectLabel: 'Loyiha:',
        celebrate: 'Nishonlash!',
        developerMode: 'Dasturchi rejimi',
        adminDescription: 'Hisoblagich boshqaruvini ochish va qiymatlarni o‘zgartirish uchun parolni kiriting.',
        passwordPlaceholder: 'Parol (ishora: eco2026)',
        cancel: 'Bekor qilish',
        unlockAccess: 'Kirishni ochish',
        incorrectPassword: 'Parol noto‘g‘ri. Kirish rad etildi.',
        showMore: 'Batafsil',
        showLess: 'Qisqartirish',
        solarAreaPrompt: 'Quyosh panellari umumiy maydonining yangi qiymatini kiriting (m²):',
        developerDisabled: 'Dasturchi rejimi o‘chirildi.',
        developerUnlocked: 'Dasturchi / administrator rejimi yoqildi!\nEndi inventar miqdorlarini tahrirlashingiz mumkin.',
        contestAdminRequired: 'Tanlovni boshlash uchun Dasturchi rejimida bo‘lishingiz kerak.',
        aiEvaluating: 'AI BAHOLAMOQDA...',
        done: 'TUGADI',
        fakeWinnerName: 'Aleks Pioner',
        fakeWinnerProject: 'Quyosh energiyasi texnologiyasi'
    },
    ru: {
        pageTitle: 'Платформа эко-школы Denov 2-IMI',
        slogan: 'Инновации ради зелёного будущего',
        solarPanelsText: 'Солнечные панели',
        adminTriggerTitle: 'Нажмите три раза, чтобы включить режим разработчика',
        languageLabel: 'Язык',
        navDashboard: 'Панель управления',
        navAlerts: 'Эко-предупреждения',
        navEducation: 'Образование',
        navLeadership: 'Руководство',
        themeLight: 'Светлая тема',
        themeDark: 'Тёмная тема',
        guestMode: 'Гостевой режим',
        developerActive: 'Режим разработчика',
        heroWelcome: 'Добро пожаловать в наше',
        heroGreenFuture: 'зелёное будущее',
        heroDescription: 'Следите за экологией нашей школы, изучайте окружающую среду и участвуйте в экологических проектах ради устойчивого будущего.',
        heroButton: 'Перейти к панели',
        inventoryTitle: 'Учёт растений',
        dashboardSections: 'Разделы панели управления',
        organizationLeaders: 'Руководители организации',
        studentsCount: 'Ученики (10)',
        treesPlanted: 'Посажено деревьев',
        flowersBloomed: 'Расцвело цветов',
        subtractPanel: 'Уменьшить число панелей',
        addPanel: 'Добавить панель',
        editPanelArea: 'Изменить площадь (м²)',
        airQualityTitle: 'Влияние на качество воздуха',
        co2PerDay: 'Поглощено CO₂ за день (кг)',
        o2PerDay: 'Произведено O₂ за день (кг)',
        alertsTitle: 'Актуальные эко-предупреждения',
        educationTitle: 'Образовательный центр',
        galleryTitle: 'Галерея школьных экологических проектов',
        recyclingDrive: 'Акция по переработке отходов',
        solarPanelsSetup: 'Солнечные панели',
        compostingPit: 'Компостирование',
        waterSaving: 'Экономия воды',
        presentationsTitle: 'Интерактивные презентации по экологии',
        climateTitle: 'Основы изменения климата',
        climateDescription: 'Узнайте об основах глобального потепления и парниковых газах, а также о том, чем могут помочь ученики.',
        biodiversityTitle: 'Местное биоразнообразие',
        biodiversityDescription: 'Откройте для себя богатый растительный и животный мир территории нашей школы и региона.',
        zeroWasteTitle: 'Образ жизни без отходов',
        zeroWasteDescription: 'Практические советы по сокращению ежедневных отходов в школе и дома.',
        previousPresentation: 'Предыдущая презентация',
        nextPresentation: 'Следующая презентация',
        leadershipTag: 'Руководство / Основатели',
        leadershipTitle: 'Основатели и руководство',
        leader1Role: 'Директор',
        leader1Bio: 'Сапиева Наргиза Мамаюсуповна — директор специализированной школы-интерната № 2 Деновского района, опытный руководитель, уделяющий внимание управлению образованием и развитию педагогического коллектива. Она стремится повышать качество образования, поддерживать профессиональный рост педагогов и помогать ученикам добиваться высоких результатов с помощью эффективного управления и современных педагогических подходов. Ведёт научную работу как независимый исследователь PhD в области экономики.',
        leader2Role: 'Заместитель директора по духовно-просветительской работе',
        leader2Bio: 'Квалифицированный специалист в своей области, обладающий высоким потенциалом и богатым опытом. Эффективно работает в сфере просвещения и духовного воспитания, вносит особый вклад в воспитание молодёжи и формирование национальных и общечеловеческих ценностей. Пользуется большим уважением коллектива благодаря инициативности, ответственности и преданности делу.',
        leader3Role: 'Член родительского комитета',
        leader3Bio: 'Базовый докторант направления английского языка факультета филологии DTPI и преподаватель английского языка высшей категории. Научные интересы в основном связаны с лингвистикой, религиозным и исламским дискурсом, а также с передачей и переводом религиозно-культурных реалий на английский язык.',
        leader4Role: 'Координатор проекта',
        leader4Bio: 'Член Молодёжного парламента при Законодательной палате Олий Мажлиса и Экологической партии Узбекистана. Региональный наставник проекта «Eco-Schools Uzbekistan» в Сурхандарьинской области и координатор специализированной школы-интерната № 2 Деновского района. Реализует проекты по экологическому образованию, зелёным инициативам и развитию экологической активности учащихся.',
        leader1Alt: 'Фотография Сапиевой Наргизы Мамаюсуповны',
        leader2Alt: 'Фотография Сухроба Ходжакулова',
        leader3Alt: 'Фотография Дилнозы Рашидовой',
        leader4Alt: 'Фотография Сохибжамол Авазовой',
        studentsTitle: 'Ученики',
        student1Class: '11-T · Ученик-наставник',
        student1Alt: 'Фотография Парвины Икромовой',
        student2Alt: 'Фотография Ойбека Баратова',
        student3Alt: 'Фотография Паризоды Нормуродовой',
        student4Alt: 'Фотография Сардора Саидахматова',
        student5Alt: 'Фотография Мухаммадали Ёлдошова',
        student6Alt: 'Фотография Дилдоры Мухамедовой',
        student7Alt: 'Фотография Саломат Баратoвой',
        student8Alt: 'Фотография Умара Маматмуродова',
        student9Alt: 'Фотография Асал Бахтиёровой',
        student10Alt: 'Фотография Диёрбека Бегмаматова',
        startupTitle: 'Эко-стартап центр и конкурс ИИ',
        startupDescription: 'Отправьте инновационную экологичную стартап-идею. ИИ оценит заявки, когда разработчик запустит таймер обратного отсчёта!',
        submitProjectTitle: 'Отправить проект',
        projectName: 'Название проекта',
        projectPlaceholder: 'например, GreenTech Recycler',
        fullName: 'Полное имя',
        namePlaceholder: 'например, Иван Иванов',
        phoneNumber: 'Номер телефона',
        phonePlaceholder: 'например, +998 90 123 45 67',
        submitIdea: 'Отправить идею',
        projectSuccess: 'Проект успешно отправлен!',
        evaluationStatus: 'Статус оценки ИИ',
        timerControl: 'Управление таймером разработчика',
        secondsPlaceholder: 'Секунды',
        startEvaluation: 'Начать оценку',
        calculatorTitle: 'Эко-калькулятор в реальном времени',
        calculatorDescription: 'Введите примерное количество деревьев и цветов, чтобы увидеть их предполагаемое влияние на окружающую среду.',
        numberTrees: 'Количество деревьев',
        treesPlaceholder: 'например, 10',
        numberFlowers: 'Количество цветов',
        flowersPlaceholder: 'например, 50',
        numberPanels: 'Количество солнечных панелей',
        panelsPlaceholder: 'например, 12',
        totalPanelArea: 'Общая площадь панелей (м²)',
        areaPlaceholder: 'например, 24',
        estimatedCo2: 'Расчётное сокращение CO₂ (кг / день)',
        estimatedO2: 'Расчётное производство O₂ (кг / день)',
        estimatedEnergy: 'Расчётная выработка энергии (кВт·ч / день)',
        footerCopyright: '© 2026 Denov 2-IMI Eco-school. Создано с любовью',
        footerEarth: 'к планете Земля.',
        winnerTitle: '🏆 Оценка ИИ завершена! 🏆',
        winnerSubtitle: 'Победитель конкурса экологичных стартапов:',
        winnerProjectLabel: 'Проект:',
        celebrate: 'Поздравить!',
        developerMode: 'Режим разработчика',
        adminDescription: 'Введите пароль, чтобы открыть управление инвентарём и изменить значения.',
        passwordPlaceholder: 'Пароль (подсказка: eco2026)',
        cancel: 'Отмена',
        unlockAccess: 'Открыть доступ',
        incorrectPassword: 'Неверный пароль. Доступ запрещён.',
        showMore: 'Подробнее',
        showLess: 'Свернуть',
        solarAreaPrompt: 'Введите новую общую площадь солнечных панелей (м²):',
        developerDisabled: 'Режим разработчика отключён.',
        developerUnlocked: 'Режим разработчика / администратора включён!\nТеперь вы можете изменять значения инвентаря.',
        contestAdminRequired: 'Для запуска конкурса необходимо включить режим разработчика.',
        aiEvaluating: 'ОЦЕНКА ИИ...',
        done: 'ГОТОВО',
        fakeWinnerName: 'Алекс Пионер',
        fakeWinnerProject: 'Технология солнечной энергии'
    }
};

let currentLanguage = 'en';

function getTranslation(key) {
    return translations[currentLanguage]?.[key] || translations.en[key] ||
        document.querySelector(`[data-i18n="${key}"]`)?.dataset.i18nDefault ||
        document.querySelector(`[data-i18n="${key}"]`)?.textContent || key;
}

function applyLanguage(language) {
    currentLanguage = translations[language] ? language : 'en';
    document.documentElement.lang = currentLanguage;
    document.title = getTranslation('pageTitle');
    languageSelect.value = currentLanguage;

    document.querySelectorAll('[data-i18n]').forEach((element) => {
        const key = element.dataset.i18n;
        if (element.dataset.i18nDefault === undefined) element.dataset.i18nDefault = element.textContent;
        element.textContent = translations[currentLanguage][key] || translations.en[key] || element.dataset.i18nDefault;
    });

    document.querySelectorAll('[data-i18n-title]').forEach((element) => {
        const key = element.dataset.i18nTitle;
        if (element.dataset.i18nTitleDefault === undefined) element.dataset.i18nTitleDefault = element.title;
        element.title = currentLanguage === 'en'
            ? element.dataset.i18nTitleDefault
            : (translations[currentLanguage][key] || element.title);
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
        const key = element.dataset.i18nPlaceholder;
        if (element.dataset.i18nPlaceholderDefault === undefined) element.dataset.i18nPlaceholderDefault = element.placeholder;
        element.placeholder = currentLanguage === 'en'
            ? element.dataset.i18nPlaceholderDefault
            : (translations[currentLanguage][key] || element.dataset.i18nPlaceholderDefault);
    });

    document.querySelectorAll('[data-i18n-aria]').forEach((element) => {
        const key = element.dataset.i18nAria;
        if (element.dataset.i18nAriaDefault === undefined) element.dataset.i18nAriaDefault = element.getAttribute('aria-label') || '';
        element.setAttribute('aria-label', currentLanguage === 'en'
            ? element.dataset.i18nAriaDefault
            : (translations[currentLanguage][key] || element.dataset.i18nAriaDefault));
    });

    document.querySelectorAll('[data-i18n-alt]').forEach((element) => {
        const key = element.dataset.i18nAlt;
        if (element.dataset.i18nAltDefault === undefined) element.dataset.i18nAltDefault = element.alt;
        element.alt = currentLanguage === 'en'
            ? element.dataset.i18nAltDefault
            : (translations[currentLanguage][key] || element.dataset.i18nAltDefault);
    });

    adminStatusBadge.innerHTML = isAdmin
        ? `<i class="fa-solid fa-unlock"></i> ${getTranslation('developerActive')}`
        : `<i class="fa-solid fa-user-lock"></i> ${getTranslation('guestMode')}`;
    document.querySelectorAll('.leader-toggle, .team-toggle').forEach((button) => {
        button.textContent = button.getAttribute('aria-expanded') === 'true'
            ? getTranslation('showLess')
            : getTranslation('showMore');
    });

    applyTheme(document.body.dataset.theme);
    renderCurrentAlert();
    localStorage.setItem('eco-school-language', currentLanguage);
}

languageSelect.addEventListener('change', () => applyLanguage(languageSelect.value));

// Restore the saved theme, defaulting to the existing dark appearance.
function applyTheme(theme) {
    const isLight = theme === 'light';
    document.body.dataset.theme = isLight ? 'light' : 'dark';
    themeToggle.setAttribute('aria-pressed', String(isLight));
    themeToggle.setAttribute('aria-label', isLight
        ? (currentLanguage === 'ru' ? 'Переключить на тёмную тему' : currentLanguage === 'uz' ? 'Qorong‘i rejimga o‘tish' : 'Switch to dark mode')
        : (currentLanguage === 'ru' ? 'Переключить на светлую тему' : currentLanguage === 'uz' ? 'Yorug‘ rejimga o‘tish' : 'Switch to light mode'));
    themeIcon.className = `fa-solid ${isLight ? 'fa-moon' : 'fa-sun'}`;
    themeLabel.textContent = getTranslation(isLight ? 'themeDark' : 'themeLight');
}

const savedTheme = localStorage.getItem('eco-school-theme');
applyTheme(savedTheme === 'light' ? 'light' : 'dark');

themeToggle.addEventListener('click', () => {
    const nextTheme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    localStorage.setItem('eco-school-theme', nextTheme);
});

// Expand or collapse each leadership card independently when its button is clicked.
document.querySelectorAll('.leader-toggle, .team-toggle').forEach((button) => {
    button.addEventListener('click', () => {
        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        const card = button.closest('.leader-card, .team-card');

        if (!card) return;

        button.setAttribute('aria-expanded', String(!isExpanded));
        button.textContent = getTranslation(isExpanded ? 'showMore' : 'showLess');
        card.classList.toggle('is-expanded', !isExpanded);
    });
});

// Initialize DOM
function updateDisplay() {
    treeCountEl.textContent = inventory.tree;
    flowerCountEl.textContent = inventory.flower;
    solarCountEl.textContent = inventory.solar;
    solarAreaEl.textContent = inventory.solarArea;
    calculateAirQualityImpact();
}

// Calculate Air Quality Impact
function calculateAirQualityImpact() {
    // Assumptions (kg per day)
    // 1 Tree = 0.06 kg CO2 absorbed, 0.32 kg O2 produced
    // 1 Flower = 0.005 kg CO2 absorbed, 0.02 kg O2 produced
    const co2Trees = inventory.tree * 0.06;
    const co2Flowers = inventory.flower * 0.005;
    const totalCo2 = co2Trees + co2Flowers;

    const o2Trees = inventory.tree * 0.32;
    const o2Flowers = inventory.flower * 0.02;
    const totalO2 = o2Trees + o2Flowers;

    // Update UI with 1 decimal place
    co2AbsorbedEl.textContent = totalCo2.toFixed(1);
    o2ProducedEl.textContent = totalO2.toFixed(1);

    // Add brief animation
    [co2AbsorbedEl, o2ProducedEl].forEach(el => {
        el.style.transform = 'scale(1.1)';
        setTimeout(() => {
            el.style.transform = 'scale(1)';
        }, 200);
    });
}

// Update Functions used by admin
function updateInventory(type, amount) {
    if (!isAdmin) return;

    if (inventory[type] !== undefined) {
        inventory[type] += amount;
        if (inventory[type] < 0) inventory[type] = 0; // Prevent negative counts
        updateDisplay();

        // Add a small animation to the updated number
        let el;
        if (type === 'tree') el = treeCountEl;
        else if (type === 'flower') el = flowerCountEl;
        else el = solarCountEl;

        el.style.transform = 'scale(1.2) translateY(-10px)';
        el.style.color = '#fff';
        setTimeout(() => {
            el.style.transform = '';
            el.style.color = '';
        }, 300);
    }
}

function editSolarArea() {
    if (!isAdmin) return;
    const newArea = prompt(getTranslation('solarAreaPrompt'), inventory.solarArea);
    if (newArea !== null && !isNaN(newArea) && newArea >= 0) {
        inventory.solarArea = parseFloat(newArea);
        updateDisplay();
    }
}

// Admin Mode Secrets
let clickCount = 0;
let clickTimer;

// Triple click the invisible top-left corner to trigger admin modal
adminTrigger.addEventListener('click', () => {
    clickCount++;
    clearTimeout(clickTimer);

    if (clickCount >= 3) {
        openAdminModal();
        clickCount = 0;
    } else {
        clickTimer = setTimeout(() => {
            clickCount = 0;
        }, 600); // Reset after 600ms
    }
});

function openAdminModal() {
    if (isAdmin) {
        // Toggle off if already admin
        disableAdminControls();
        alert(getTranslation('developerDisabled'));
        return;
    }
    adminModal.classList.remove('hidden');
    adminPassword.value = '';
    loginError.classList.add('hidden');

    // Slight delay to allow display block before focus
    setTimeout(() => adminPassword.focus(), 100);
}

function closeAdminModal() {
    adminModal.classList.add('hidden');
}

function verifyAdmin() {
    const pwd = adminPassword.value;
    if (pwd === 'eco2026') {
        closeAdminModal();
        enableAdminControls();
    } else {
        loginError.classList.remove('hidden');
        adminPassword.value = '';
        adminPassword.focus();
    }
}

function enableAdminControls() {
    isAdmin = true;
    adminControls.forEach(el => el.classList.remove('hidden'));
    adminStatusBadge.innerHTML = `<i class="fa-solid fa-unlock"></i> ${getTranslation('developerActive')}`;
    adminStatusBadge.classList.add('unlocked');
    alert(getTranslation('developerUnlocked'));
}

function disableAdminControls() {
    isAdmin = false;
    adminControls.forEach(el => el.classList.add('hidden'));
    adminStatusBadge.innerHTML = `<i class="fa-solid fa-user-lock"></i> ${getTranslation('guestMode')}`;
    adminStatusBadge.classList.remove('unlocked');
}

// Educational Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    slides.forEach(slide => {
        slide.classList.remove('active');
        slide.style.animation = 'none'; // reset animation
    });

    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    // Trigger reflow to restart animation
    void slides[currentSlide].offsetWidth;

    slides[currentSlide].classList.add('active');
    slides[currentSlide].style.animation = 'slideIn 0.5s forwards';
}

function changeSlide(direction) {
    showSlide(currentSlide + direction);
}

// Add event listener for Enter key on password input
adminPassword.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        verifyAdmin();
    }
});

// Close modal if clicked outside
adminModal.addEventListener('click', function (e) {
    if (e.target === adminModal) {
        closeAdminModal();
    }
});

// ------------------------------------
// Dynamic Eco-Alert System (15+ Threats)
// ------------------------------------
const alertsData = {
    en: [
        ['Plastic Pollution!', 'By 2050, there may be more plastic in the ocean than fish. Use reusable bottles!', 'Pledge to Reduce Plastic'],
        ['Nature Needs You', 'Nature does not need people; people need nature. Every action counts.', 'Learn How to Help'],
        ['Stop Wasting Water!', 'A dripping tap wastes 15 liters of water a day. Report leaks immediately.', 'Report Leaks'],
        ['Protect Trees, Protect Life!', 'Trees are the lungs of our planet. Protecting them means protecting life.', 'Protect Forests'],
        ['Energy Waste Alert!', 'Leaving lights on in empty classrooms wastes electricity. Turn them off!', 'Save Electricity'],
        ['The Power of One', 'The greatest threat to our planet is believing that someone else will save it.', 'Take Action Now'],
        ['E-Waste Crisis!', 'Electronic waste is the fastest-growing waste stream. Recycle old gadgets properly.', 'Recycle E-Waste'],
        ['Plant a Seed', 'Those who plant trees show care for generations to come.', 'Join Tree Planting'],
        ['Air Pollution', 'Idling cars near the school gate increase harmful pollutants. Turn off your engine.', 'Stop Idling'],
        ['Let’s Protect Nature!', 'We do not inherit the Earth from our ancestors; we borrow it from our children.', 'Take Action'],
        ['Food Waste Crisis', 'One third of all food produced globally is wasted. Take only what you can eat.', 'Choose a Zero-Waste Lunch'],
        ['Chemical Pollution', 'Harsh chemicals can flow into rivers. Choose eco-friendly cleaning products.', 'Use Eco-Cleaners'],
        ['Protect Biodiversity!', 'Urbanization threatens local insect populations. Help us plant native flowers.', 'Plant Native Flowers'],
        ['Reduce, Reuse, Recycle', 'There is no such place as “away.” Everything we throw away goes somewhere.', 'Sort Your Waste'],
        ['Fast Fashion Waste', 'The fashion industry causes 10% of global carbon emissions. Swap, do not shop!', 'Join a Clothing Swap']
    ],
    uz: [
        ['Plastik ifloslanishi!', '2050-yilga borib okeanlarda baliqlardan ko‘ra plastik ko‘proq bo‘lishi mumkin. Qayta ishlatiladigan idishlardan foydalaning!', 'Plastikni kamaytirishga va’da bering'],
        ['Tabiat sizga muhtoj', 'Tabiat odamlarga emas, odamlar tabiatga muhtoj. Har bir harakat muhim.', 'Qanday yordam berishni o‘rganing'],
        ['Suvni isrof qilmang!', 'Tomchilayotgan jo‘mrak kuniga 15 litr suvni isrof qiladi. Nosozliklar haqida darhol xabar bering.', 'Nosozlik haqida xabar bering'],
        ['Daraxtlarni asrang — hayotni asrang!', 'Daraxtlar sayyoramiz o‘pkasidir. Ularni asrash — hayotni asrash demakdir.', 'O‘rmonlarni asrang'],
        ['Energiya isrofi haqida ogohlantirish!', 'Bo‘sh sinfxonalarda chiroqni yoqib qo‘yish elektr energiyasini isrof qiladi. Chiroqlarni o‘chiring!', 'Elektr energiyasini tejang'],
        ['Har bir insonning hissasi muhim', 'Sayyoramiz uchun eng katta xavf — uni kimdir qutqaradi, deb o‘ylashdir.', 'Hozir harakat qiling'],
        ['Elektron chiqindilar muammosi!', 'Elektron chiqindilar eng tez ko‘payayotgan chiqindi turidir. Eski qurilmalarni to‘g‘ri qayta ishlang.', 'Elektron chiqindilarni qayta ishlang'],
        ['Urug‘ eking', 'Daraxt ekkan inson o‘zidan keyingi avlodlarga ham g‘amxo‘rlik qiladi.', 'Daraxt ekish aksiyasiga qo‘shiling'],
        ['Havoning ifloslanishi', 'Maktab darvozasi yonida ishlayotgan avtomobil dvigateli zararli moddalarni ko‘paytiradi. Dvigatelni o‘chiring.', 'Bekor ishlayotgan dvigatelni o‘chiring'],
        ['Tabiatni asraylik!', 'Biz tabiatni ajdodlardan meros qilib olmadik, uni farzandlarimizdan qarzga oldik.', 'Harakatni boshlang'],
        ['Oziq-ovqat isrofi muammosi', 'Dunyoda ishlab chiqarilgan oziq-ovqatning uchdan biri isrof bo‘ladi. Faqat yeya oladiganingizni oling.', 'Chiqindisiz tushlik tanlang'],
        ['Kimyoviy ifloslanish', 'Zararli kimyoviy moddalar daryolarga oqib tushadi. Ekologik toza tozalash vositalarini tanlang.', 'Ekologik toza vositalardan foydalaning'],
        ['Biologik xilma-xillikni asrang!', 'Shaharlarning kengayishi mahalliy hasharotlar soniga xavf soladi. Mahalliy gullarni ekishga yordam bering.', 'Mahalliy gullarni eking'],
        ['Kamaytiring, qayta foydalaning, qayta ishlang', 'Chiqindilar yo‘qolib qolmaydi — tashlagan narsalarimizning barchasi biror joyga boradi.', 'Chiqindilarni saralang'],
        ['Tezkor moda chiqindilari', 'Moda sanoati global uglerod chiqindilarining 10 foiziga sabab bo‘ladi. Xarid qilish o‘rniga kiyim almashing!', 'Kiyim almashish aksiyasiga qo‘shiling']
    ],
    ru: [
        ['Загрязнение пластиком!', 'К 2050 году пластика в океане может стать больше, чем рыбы. Пользуйтесь многоразовыми бутылками!', 'Сократите использование пластика'],
        ['Природа нуждается в вас', 'Природа не нуждается в людях — люди нуждаются в природе. Важен каждый поступок.', 'Узнайте, как помочь'],
        ['Не тратьте воду!', 'Из-за капающего крана ежедневно теряется 15 литров воды. Сразу сообщайте о протечках.', 'Сообщить о протечке'],
        ['Берегите деревья — берегите жизнь!', 'Деревья — лёгкие нашей планеты. Беречь их — значит беречь жизнь.', 'Берегите леса'],
        ['Предупреждение о растрате энергии!', 'Освещение пустых классов приводит к лишнему расходу электричества. Выключайте свет!', 'Экономьте электричество'],
        ['Сила каждого', 'Главная угроза планете — вера в то, что её спасёт кто-то другой.', 'Действуйте сейчас'],
        ['Проблема электронных отходов!', 'Электронные отходы растут быстрее всех остальных. Правильно сдавайте старые устройства на переработку.', 'Переработайте электронику'],
        ['Посадите семя', 'Тот, кто сажает деревья, заботится о будущих поколениях.', 'Присоединиться к посадке деревьев'],
        ['Загрязнение воздуха', 'Работающие на холостом ходу автомобили у школьных ворот загрязняют воздух. Выключайте двигатель.', 'Не оставляйте двигатель включённым'],
        ['Берегите природу!', 'Мы не унаследовали Землю от предков — мы взяли её в долг у наших детей.', 'Начать действовать'],
        ['Проблема пищевых отходов', 'Треть всей произведённой в мире еды выбрасывается. Берите только то, что сможете съесть.', 'Выберите обед без отходов'],
        ['Химическое загрязнение', 'Агрессивные химикаты попадают в реки. Выбирайте экологичные чистящие средства.', 'Используйте эко-средства'],
        ['Защитите биоразнообразие!', 'Расширение городов угрожает местным популяциям насекомых. Помогите посадить местные цветы.', 'Посадите местные цветы'],
        ['Сокращайте, используйте повторно, перерабатывайте', 'Мусор не исчезает бесследно — всё выброшенное куда-то попадает.', 'Сортируйте отходы'],
        ['Отходы быстрой моды', 'Модная индустрия отвечает за 10% мировых выбросов углерода. Меняйтесь одеждой, не покупайте лишнее!', 'Присоединиться к обмену одеждой']
    ]
};

const alertAppearance = [
    ['danger', 'fa-bottle-water'],
    ['success', 'fa-leaf'],
    ['warning', 'fa-faucet-drip'],
    ['danger', 'fa-tree'],
    ['warning', 'fa-lightbulb'],
    ['info', 'fa-globe'],
    ['warning', 'fa-battery-quarter'],
    ['success', 'fa-seedling'],
    ['danger', 'fa-smog'],
    ['info', 'fa-hand-holding-heart'],
    ['warning', 'fa-burger'],
    ['danger', 'fa-flask-vial'],
    ['warning', 'fa-bug'],
    ['success', 'fa-recycle'],
    ['info', 'fa-shirt']
];

let currentAlertIndex = 0;
const alertWrapper = document.getElementById('dynamic-alert-wrapper');
const alertProgressBar = document.getElementById('alert-progress');
let alertRotationInterval;

function renderCurrentAlert() {
    const [title, description, callToAction] = alertsData[currentLanguage][currentAlertIndex];
    const [alertType, alertIcon] = alertAppearance[currentAlertIndex];
    alertWrapper.innerHTML = `
        <div class="dynamic-alert-card ${alertType}">
            <div class="alert-visual">
                <i class="fa-solid ${alertIcon}"></i>
            </div>
            <div class="alert-content">
                <h3>${title}</h3>
                <p>${description}</p>
                <button class="action-btn">${callToAction}</button>
            </div>
        </div>
    `;

    // Reset and trigger progress bar animation (30s)
    alertProgressBar.style.transition = 'none';
    alertProgressBar.style.width = '0%';

    // Slight delay to allow transition reset, then start 30s fill
    setTimeout(() => {
        alertProgressBar.style.transition = 'width 30s linear';
        alertProgressBar.style.width = '100%';
    }, 50);
}

function rotateAlert() {
    alertWrapper.style.transform = 'translateX(-100%)';
    setTimeout(() => {
        currentAlertIndex = (currentAlertIndex + 1) % alertsData[currentLanguage].length;
        renderCurrentAlert();
        alertWrapper.style.transition = 'none';
        alertWrapper.style.transform = 'translateX(100%)';

        setTimeout(() => {
            alertWrapper.style.transition = 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
            alertWrapper.style.transform = 'translateX(0)';
        }, 50);
    }, 800);
}

function initEcoAlerts() {
    renderCurrentAlert();
    // Rotate every 30 seconds
    alertRotationInterval = setInterval(rotateAlert, 30000);
}

// ------------------------------------
// Standalone Eco-Calculator Logic
// ------------------------------------
const calcTreesInput = document.getElementById('calc-trees');
const calcFlowersInput = document.getElementById('calc-flowers');
const calcSolarCountInput = document.getElementById('calc-solar-count');
const calcSolarAreaInput = document.getElementById('calc-solar-area');
const calcDynamicCo2 = document.getElementById('calc-dynamic-co2');
const calcDynamicO2 = document.getElementById('calc-dynamic-o2');
const calcDynamicEnergy = document.getElementById('calc-dynamic-energy');

function updateEcoCalculator() {
    const trees = parseFloat(calcTreesInput.value) || 0;
    const flowers = parseFloat(calcFlowersInput.value) || 0;
    const solarCount = parseFloat(calcSolarCountInput.value) || 0;
    const solarArea = parseFloat(calcSolarAreaInput.value) || 0;

    // Flora logic (kg per day)
    const co2Trees = trees * 0.06;
    const co2Flowers = flowers * 0.005;
    const totalCo2 = co2Trees + co2Flowers;

    const o2Trees = trees * 0.32;
    const o2Flowers = flowers * 0.02;
    const totalO2 = o2Trees + o2Flowers;

    // Solar Energy generation logic (kWh per day)
    // Formula approximation: Area (m2) * panel efficiency (18%) * average sun hours (5h)
    // The panel count is kept for demonstration or UI scaling, but area is primary factor for formula
    const dailyKwh = solarArea * 0.18 * 5;

    // Output formatting
    calcDynamicCo2.textContent = totalCo2.toFixed(2);
    calcDynamicO2.textContent = totalO2.toFixed(2);
    calcDynamicEnergy.textContent = dailyKwh.toFixed(1);
}

// Add event listeners for real-time calculation
[calcTreesInput, calcFlowersInput, calcSolarCountInput, calcSolarAreaInput].forEach(input => {
    input.addEventListener('input', updateEcoCalculator);
});

// Trigger initial calculation
updateEcoCalculator();

// ------------------------------------
// Startup Hub & AI Contest Logic
// ------------------------------------
const startupForm = document.getElementById('startup-form');
const successMsg = document.getElementById('startup-success-msg');
const projectNameInput = document.getElementById('project-name');
const fullNameInput = document.getElementById('full-name');
const phoneNumberInput = document.getElementById('phone-number');

// Array to store submissions
let startupSubmissions = [];

// DOM Elements for Timer and Modal
const countdownText = document.getElementById('countdown-timer');
const progressCircle = document.querySelector('.progress-ring__circle');
const devTimerInput = document.getElementById('dev-timer-input');
const winnerModal = document.getElementById('winner-modal');
const winnerNameEl = document.getElementById('winner-name');
const winnerProjectEl = document.getElementById('winner-project');

// Progress ring setup (Circumference calculation)
const circumference = 2 * Math.PI * 90; // r=90

// Handle Form Submission
startupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submission = {
        project: projectNameInput.value,
        name: fullNameInput.value,
        phone: phoneNumberInput.value
    };
    
    startupSubmissions.push(submission);
    
    // Show success message
    startupForm.reset();
    successMsg.classList.remove('hidden');
    setTimeout(() => {
        successMsg.classList.add('hidden');
    }, 4000);
});

// Timer Logic
let contestTimerInterval;
let timerRunning = false;

function setProgress(percent) {
    const offset = circumference - (percent / 100) * circumference;
    progressCircle.style.strokeDashoffset = offset;
}

function startAIContest() {
    if (!isAdmin) {
        alert(getTranslation('contestAdminRequired'));
        return;
    }
    
    if (timerRunning) return;
    
    const totalSeconds = parseInt(devTimerInput.value) || 10;
    if (totalSeconds <= 0) return;
    
    let currentSeconds = totalSeconds;
    timerRunning = true;
    
    // Initial display
    updateTimerDisplay(currentSeconds);
    setProgress(100);
    
    contestTimerInterval = setInterval(() => {
        currentSeconds--;
        
        updateTimerDisplay(currentSeconds);
        
        const percent = (currentSeconds / totalSeconds) * 100;
        setProgress(percent);
        
        // AI "Thinking" Simulation effect text
        if (currentSeconds > 0 && currentSeconds <= 3) {
            countdownText.textContent = getTranslation('aiEvaluating');
            countdownText.style.color = "var(--sun-yellow)";
            countdownText.style.fontSize = "2rem";
        }
        
        if (currentSeconds <= 0) {
            clearInterval(contestTimerInterval);
            timerRunning = false;
            finishContest();
        }
    }, 1000);
}

function updateTimerDisplay(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    countdownText.style.color = "#fff";
    countdownText.style.fontSize = "3rem";
    countdownText.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function finishContest() {
    countdownText.textContent = getTranslation('done');
    countdownText.style.color = "var(--emerald)";
    
    setTimeout(() => {
        announceWinner();
    }, 500);
}

function announceWinner() {
    // If no submissions, pick a fake default for demonstration
    let winner;
    if (startupSubmissions.length === 0) {
        winner = { name: getTranslation('fakeWinnerName'), project: getTranslation('fakeWinnerProject') };
    } else {
        // Randomly simulate AI selection
        const randomIndex = Math.floor(Math.random() * startupSubmissions.length);
        winner = startupSubmissions[randomIndex];
    }
    
    winnerNameEl.textContent = winner.name;
    winnerProjectEl.textContent = winner.project;
    
    // Show Modal
    winnerModal.classList.remove('hidden');
}

function closeWinnerModal() {
    winnerModal.classList.add('hidden');
    // Reset timer UI optionally
    updateTimerDisplay(0);
    setProgress(0);
    countdownText.textContent = "00:00";
}

// Ensure Admin controls apply to the dev timer too
// Modifying existing openAdminModal logic indirectly by ensuring periodic check or adding to adminControls NodeList
// It is already included in the .admin-controls class, so enableAdminControls() will reveal it.

// Init
updateDisplay();
initEcoAlerts();
applyLanguage(localStorage.getItem('eco-school-language') || 'en');
