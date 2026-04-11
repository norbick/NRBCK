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
			{ pl: 'Kontakt dla klientów', en: 'Client contact' },
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
			pl: 'Interaktywna aplikacja do śledzenia sesji pracy, czasu i progresu. Projekt skupiony na płynnym działaniu, statystykach i mobilnym UX.',
			en: 'An interactive app for tracking work sessions, time, and progress. Designed for smooth usage, clear stats, and mobile UX.',
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
			{ pl: 'Portfolio projektu', en: 'Project showcase' },
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
	{ pl: 'PORTFOLIO NRBCK', en: 'NRBCK PORTFOLIO' },
	{ pl: 'STRONY WWW', en: 'WEBSITES' },
	{ pl: 'APLIKACJE WEBOWE', en: 'WEB APPS' },
	{ pl: 'WORDPRESS', en: 'WORDPRESS' },
	{ pl: 'UX I UI', en: 'UX AND UI' },
	{ pl: 'FRONTEND', en: 'FRONTEND' },
	{ pl: 'ASTRO', en: 'ASTRO' },
	{ pl: 'SZYBKIE WDROŻENIA', en: 'FAST DELIVERY' },
	{ pl: 'JASNA KOMUNIKACJA', en: 'CLEAR COMMUNICATION' },
	{ pl: 'PROCES KROK PO KROKU', en: 'STEP-BY-STEP PROCESS' },
	{ pl: 'OD BRIEFU DO STARTU', en: 'FROM BRIEF TO LAUNCH' },
	{ pl: 'KONKRETNE UWAGI', en: 'CLEAR FEEDBACK' },
	{ pl: 'DOPRACOWANY DETAL', en: 'POLISHED DETAILS' },
	{ pl: 'WSPÓŁPRACA 1:1', en: '1:1 COLLABORATION' },
];

export const signalTrack = [...signals, ...signals];
export const contactRecipient = 'norbick@gmail.com';
export const contactAction = `https://formsubmit.co/${contactRecipient}`;

export const visualBreak = {
	image: 'about/work-break-collage.webp',
	kicker: {
		pl: 'JAK PRACUJĘ',
		en: 'HOW I WORK',
	},
	title: {
		pl: 'Od koncepcji do wdrożenia w jednym, spójnym procesie.',
		en: 'From concept to launch in one cohesive process.',
	},
	blurb: {
		pl: 'Łączę UX, warstwę wizualną i frontend tak, żeby projekt był nie tylko efektowny, ale przede wszystkim czytelny i skuteczny.',
		en: 'I combine UX, visual direction, and frontend so the final result is not only striking, but clear and effective.',
	},
	tags: [
		{ pl: 'STRATEGIA I UX', en: 'STRATEGY AND UX' },
		{ pl: 'KIERUNEK WIZUALNY', en: 'VISUAL DIRECTION' },
		{ pl: 'WDROŻENIE FRONTENDU', en: 'FRONTEND IMPLEMENTATION' },
	],
};

export const aboutSection = {
	portraitImage: 'about/nrbck-portrait-stylized.webp',
	portraitCardImage: 'about/nrbck-portrait-card.webp',
	kicker: { pl: 'O MNIE', en: 'ABOUT ME' },
	title: {
		pl: 'Projektuję i wdrażam strony, które mają charakter i cel.',
		en: 'I design and build websites with clear character and purpose.',
	},
	intro: {
		pl: 'Najważniejsze jest dla mnie połączenie estetyki z funkcją: strona ma wyglądać dobrze i prowadzić użytkownika do działania.',
		en: 'What matters most to me is combining aesthetics with function: a site should look strong and guide users to action.',
	},
	paragraphs: [
		{
			pl: 'Prowadzę projekt od briefu do uruchomienia, więc za całość procesu odpowiada jedna osoba.',
			en: 'I run the project from brief to launch, so one person stays responsible for the whole process.',
		},
		{
			pl: 'Lubię szybkie iteracje i jasne uwagi, bo to najszybsza droga do dopracowanego efektu.',
			en: 'I prefer quick iterations and clear feedback because that is the fastest path to a polished result.',
		},
	],
	tags: [
		{ pl: 'Kierunek kreatywny', en: 'Creative direction' },
		{ pl: 'Web design i UI', en: 'Web design and UI' },
		{ pl: 'Wdrożenie frontendu', en: 'Frontend implementation' },
		{ pl: 'Dopracowany detal', en: 'Crafted detail' },
	],
	metrics: [
		{ value: '1', label: { pl: 'osoba od briefu do wdrożenia', en: 'person from brief to launch' } },
		{ value: '3', label: { pl: 'obszary: UX, UI, wdrożenie', en: 'areas: UX, UI, implementation' } },
		{ value: '0', label: { pl: 'pośredników w komunikacji', en: 'middle layers in communication' } },
	] as Metric[],
};
