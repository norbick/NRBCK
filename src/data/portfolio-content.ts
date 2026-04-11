export type Localized = { pl: string; en: string };

export type Project = {
	id: string;
	previewId: string;
	previewImage: string;
	name: string;
	live: string;
	theme: string;
	role: Localized;
	blurb: Localized;
	tags: Localized[];
	cta: Localized;
};

export type Metric = {
	value: string;
	label: Localized;
};

export const projects: Project[] = [
	{
		id: '01',
		previewId: 'm2',
		previewImage: 'project-previews/m2-events.jpg',
		name: 'M2 Events',
		live: 'https://m2-events.pl',
		theme: 'theme-blue',
		role: { pl: 'Oficjalna strona M2 Events', en: 'Official M2 Events website' },
		blurb: {
			pl: 'Strona dla marki techniki eventowej: nagłośnienie, oświetlenie i scena. Priorytetem była czytelna oferta, mocne realizacje i prosty kontakt.',
			en: 'A website for an event-tech brand focused on sound, lighting, and stage support. The goal was a clear offer, strong case studies, and easy contact.',
		},
		tags: [
			{ pl: 'Oferta usług', en: 'Service offer' },
			{ pl: 'Realizacje eventów', en: 'Event case studies' },
			{ pl: 'Kontakt leadowy', en: 'Lead-focused contact' },
		],
		cta: { pl: 'Otwórz m2-events.pl', en: 'Open m2-events.pl' },
	},
	{
		id: '02',
		previewId: 'looloot',
		previewImage: 'project-previews/looloot.jpg',
		name: 'LooLoot',
		live: 'https://looloot.norbick.workers.dev/',
		theme: 'theme-orange',
		role: { pl: 'Aplikacja webowa / PWA', en: 'Web app / PWA product' },
		blurb: {
			pl: 'Interaktywna aplikacja do śledzenia sesji pracy, czasu i progresu. Projekt skupiony na szybkim flow, statystykach i mobilnym UX.',
			en: 'An interactive app for tracking work sessions, time, and progress. Designed around fast flow, clear stats, and mobile UX.',
		},
		tags: [
			{ pl: 'Timer i sesje', en: 'Timer and sessions' },
			{ pl: 'Statystyki i streaki', en: 'Stats and streaks' },
			{ pl: 'PWA / mobile first', en: 'PWA / mobile first' },
		],
		cta: { pl: 'Otwórz LooLoot', en: 'Open LooLoot' },
	},
	{
		id: '03',
		previewId: 'portfolio',
		previewImage: 'project-previews/nrbck.jpg',
		name: 'Ta strona',
		live: 'https://nrbck.pl/',
		theme: 'theme-violet',
		role: { pl: 'Portfolio osobiste / landing page', en: 'Personal portfolio / landing page' },
		blurb: {
			pl: 'Aktualna strona portfolio NRBCK, na której jesteś teraz: eksperymentalny layout, animacje i prezentacja projektów w jednym miejscu.',
			en: 'The current NRBCK portfolio page you are browsing now: an experimental layout, motion, and project storytelling in one place.',
		},
		tags: [
			{ pl: 'Astro', en: 'Astro' },
			{ pl: 'Motion UI', en: 'Motion UI' },
			{ pl: 'Brand showcase', en: 'Brand showcase' },
		],
		cta: { pl: 'Otwórz tę stronę', en: 'Open this page' },
	},
];

export const sellingPoints: Localized[] = [
	{
		pl: 'Od pierwszej rozmowy dostajesz konkretny plan: co robimy, w jakiej kolejności i kiedy zobaczysz efekt.',
		en: 'From the first conversation, you get a clear plan: what we do, in what order, and when you will see results.',
	},
	{
		pl: 'Robię strony, które nie tylko dobrze wyglądają, ale też są czytelne i łatwe w użyciu.',
		en: 'I create websites that not only look good, but also feel clear and easy to use.',
	},
	{
		pl: 'Nie komplikuję. Tłumaczę jasno, co robimy, na jakim jesteśmy etapie i co będzie dalej.',
		en: 'I keep things simple. You always know what we are doing, where the project stands, and what comes next.',
	},
	{
		pl: 'Regularnie pokazuję postęp, więc nie musisz się domyślać, czy coś w ogóle się dzieje.',
		en: 'I share progress regularly, so you are never left wondering if anything is moving.',
	},
	{
		pl: 'Nie wrzucam każdej marki w ten sam szablon. Strona ma pasować do Ciebie, a nie do gotowca.',
		en: 'I do not force every brand into the same template. The website should fit you, not the other way around.',
	},
	{
		pl: 'Zależy mi na tym, żeby końcowy efekt był po prostu dobry: spójny, szybki i sensowny.',
		en: 'What matters to me is a final result that feels solid, fast, and genuinely well made.',
	},
];

export const signals: Localized[] = [
	{ pl: 'NRBCK PORTFOLIO', en: 'NRBCK PORTFOLIO' },
	{ pl: 'FREELANCE WEB DESIGN', en: 'FREELANCE WEB DESIGN' },
	{ pl: 'FRONTEND + ASTRO', en: 'FRONTEND + ASTRO' },
	{ pl: 'FROM IDEA TO LAUNCH', en: 'FROM IDEA TO LAUNCH' },
	{ pl: 'CLEAR MESSAGING', en: 'CLEAR MESSAGING' },
	{ pl: 'CLEAR FLOW', en: 'CLEAR FLOW' },
	{ pl: 'STRONG TYPOGRAPHY', en: 'STRONG TYPOGRAPHY' },
	{ pl: 'FAST ITERATION', en: 'FAST ITERATION' },
	{ pl: 'DESIGN THAT CONVERTS', en: 'DESIGN THAT CONVERTS' },
	{ pl: 'NO STIFF JARGON', en: 'NO STIFF JARGON' },
	{ pl: 'CONTACT AND DELIVERY', en: 'CONTACT AND DELIVERY' },
	{ pl: 'DEVELOPMENT READY', en: 'DEVELOPMENT READY' },
	{ pl: 'LIVE DEPLOY MODE', en: 'LIVE DEPLOY MODE' },
	{ pl: 'UI + FRONTEND SYSTEMS', en: 'UI + FRONTEND SYSTEMS' },
];

export const signalTrack = [...signals, ...signals];
export const contactRecipient = 'norbick@gmail.com';
export const contactAction = `https://formsubmit.co/${contactRecipient}`;

export const visualBreak = {
	image: 'about/neon-grid-break.webp',
	kicker: {
		pl: 'TRYB OPUS MAGNUM',
		en: 'OPUS MAGNUM MODE',
	},
	title: {
		pl: 'Design, który ma wejść do głowy od pierwszej sekundy.',
		en: 'Design that sticks from the very first second.',
	},
	blurb: {
		pl: 'Ta strona ma być pokazem stylu i warsztatu: neon, ruch, mocna typografia i narracja, która prowadzi użytkownika krok po kroku.',
		en: 'This website is meant to be a style-and-craft showcase: neon mood, motion, bold typography, and storytelling that guides people step by step.',
	},
	tags: [
		{ pl: 'ESTETYKA RETRO-FUTURO', en: 'RETRO-FUTURE AESTHETICS' },
		{ pl: 'MOCNY CHARACTER', en: 'STRONG CHARACTER' },
		{ pl: 'NIEPOWTARZALNY KLIMAT', en: 'UNMISTAKABLE MOOD' },
	],
};

export const aboutSection = {
	portraitImage: 'about/nrbck-portrait-stylized.webp',
	portraitCardImage: 'about/nrbck-portrait-card.webp',
	kicker: { pl: 'O MNIE', en: 'ABOUT ME' },
	title: {
		pl: 'Frontend, design i vibe. Jedna osoba, pełna odpowiedzialność.',
		en: 'Frontend, design, and vibe. One person, full ownership.',
	},
	intro: {
		pl: 'Lubię projekty, które mają charakter i zostają w głowie. Bez szablonowości, bez przypadkowych decyzji.',
		en: 'I like projects with character that stay in memory. No template feel, no random decisions.',
	},
	paragraphs: [
		{
			pl: 'Najlepiej pracuje mi się tam, gdzie design i kod idą razem od pierwszego szkicu. Dzięki temu finalny efekt jest spójny i naprawdę “siedzi”.',
			en: 'I work best where design and code move together from the very first sketch. That is how the final result feels cohesive and truly polished.',
		},
		{
			pl: 'Dbam o to, żeby strona nie tylko wyglądała mocno, ale też prowadziła użytkownika dokładnie tam, gdzie trzeba.',
			en: 'I care that a website not only looks strong, but also guides users exactly where they need to go.',
		},
	],
	tags: [
		{ pl: 'Kierunek kreatywny', en: 'Creative direction' },
		{ pl: 'Web design i UI', en: 'Web design and UI' },
		{ pl: 'Frontend wdrożeniowy', en: 'Production frontend' },
		{ pl: 'Dopracowany detal', en: 'Crafted detail' },
	],
	metrics: [
		{ value: '01', label: { pl: 'osoba odpowiedzialna za całość', en: 'person owning the whole process' } },
		{ value: '∞', label: { pl: 'iteracji do momentu “to jest to”', en: 'iterations until it truly clicks' } },
		{ value: '24/7', label: { pl: 'obsesja na punkcie detali', en: 'detail obsession mode' } },
	] as Metric[],
};
