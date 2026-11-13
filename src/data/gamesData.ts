import { NumberItem, MemoryCard, ColorItem, AnimalItem, FoodItem } from '../types';

// ==========================================
// JUEGO 1: NÚMEROS EN QUECHUA (1 al 10)
// ==========================================
export const NUMBERS_DATA: NumberItem[] = [
  {
    number: 1,
    quechua: 'Huk',
    spanish: 'Uno',
    phonetic: 'huk',
    chanka: 'Huk',
    collao: 'Juk / Huk',
    objectType: 'vicuna',
    funFact: {
      quechua: 'Huklla Inti hanaq pachapi k\'anchan.',
      spanish: 'Un solo Sol brilla en el cielo andino.',
    },
  },
  {
    number: 2,
    quechua: 'Iskay',
    spanish: 'Dos',
    phonetic: 'is-kay',
    chanka: 'Iskay',
    collao: 'Iskay',
    objectType: 'star',
    funFact: {
      quechua: 'Iskay ñawiykiwan sumaq suyunchista qhaway.',
      spanish: 'Con dos ojos miras nuestro hermoso paisaje.',
    },
  },
  {
    number: 3,
    quechua: 'Kimsa',
    spanish: 'Tres',
    phonetic: 'kim-sa',
    chanka: 'Kimsa',
    collao: 'Kinsa / Kimsa',
    objectType: 'corn',
    funFact: {
      quechua: 'Kimsa pacha: Hanaq Pacha, Kay Pacha, Uku Pacha.',
      spanish: 'Los tres mundos sagrados andinos.',
    },
  },
  {
    number: 4,
    quechua: 'Tawa',
    spanish: 'Cuatro',
    phonetic: 'ta-wa',
    chanka: 'Tawa',
    collao: 'Tawa',
    objectType: 'potato',
    funFact: {
      quechua: 'Tawantinsuyu: tawa suyukuna kuska tiyaq.',
      spanish: 'Las cuatro regiones unidas del Tawantinsuyu.',
    },
  },
  {
    number: 5,
    quechua: 'Pichqa',
    spanish: 'Cinco',
    phonetic: 'pich-qa',
    chanka: 'Pichqa / Pisqa',
    collao: 'Phisqa / Pichqa',
    objectType: 'cantuta',
    funFact: {
      quechua: 'Pichqa ruk\'anakuna makiykipi kachkan.',
      spanish: 'Cinco deditos tienes en cada mano.',
    },
  },
  {
    number: 6,
    quechua: 'Suqta',
    spanish: 'Seis',
    phonetic: 'suq-ta',
    chanka: 'Soqta',
    collao: 'Suqta',
    objectType: 'cuy',
    funFact: {
      quechua: 'Suqta sumaq quykuna q\'achuta mikhunku.',
      spanish: 'Seis tiernos cuycitos comen alfalfa.',
    },
  },
  {
    number: 7,
    quechua: 'Qanchis',
    spanish: 'Siete',
    phonetic: 'qan-chis',
    chanka: 'Qanchis',
    collao: 'Qanchis',
    objectType: 'star',
    funFact: {
      quechua: 'Qanchis llimpikunayuqmi k\'uychiqa.',
      spanish: 'Siete colores brillantes tiene el arcoíris.',
    },
  },
  {
    number: 8,
    quechua: 'Pusaq',
    spanish: 'Ocho',
    phonetic: 'pu-saq',
    chanka: 'Pusaq',
    collao: 'Pusaq',
    objectType: 'corn',
    funFact: {
      quechua: 'Pusaq sara k\'allmakuna chaskillapi kachkan.',
      spanish: 'Ocho mazorcas de choclo en el canasto.',
    },
  },
  {
    number: 9,
    quechua: 'Isqun',
    spanish: 'Nueve',
    phonetic: 'is-qun',
    chanka: 'Esqon / Isqun',
    collao: 'Isqon / Isqun',
    objectType: 'potato',
    funFact: {
      quechua: 'Isqun llimpi papakuna chakramanta urqusqa.',
      spanish: 'Nueve papas de colores cosechadas de la chacra.',
    },
  },
  {
    number: 10,
    quechua: 'Chunka',
    spanish: 'Diez',
    phonetic: 'chun-ka',
    chanka: 'Chunka',
    collao: 'Chunka',
    objectType: 'vicuna',
    funFact: {
      quechua: 'Chunka wikuñakuna punapi phawanku.',
      spanish: 'Diez vicuñas corren libres por la puna.',
    },
  },
];

// ==========================================
// JUEGO 2: MEMORIA BILINGÜE
// ==========================================
export const MEMORY_CARDS_MASTER: Omit<MemoryCard, 'id'>[] = [
  {
    pairId: 'm-llama',
    title: { quechua: 'Llama', spanish: 'Llama', phonetic: 'lla-ma' },
    category: 'animals',
    iconName: 'llama',
    color: '#d97706',
  },
  {
    pairId: 'm-kuntur',
    title: { quechua: 'Kuntur', spanish: 'Cóndor', phonetic: 'kun-tur' },
    category: 'animals',
    iconName: 'condor',
    color: '#0284c7',
  },
  {
    pairId: 'm-quy',
    title: { quechua: 'Quy', spanish: 'Cuy', phonetic: 'quy' },
    category: 'animals',
    iconName: 'cuy',
    color: '#ea580c',
  },
  {
    pairId: 'm-allqo',
    title: { quechua: 'Allqo', spanish: 'Perro', phonetic: 'all-qo' },
    category: 'animals',
    iconName: 'dog',
    color: '#9333ea',
  },
  {
    pairId: 'm-inti',
    title: { quechua: 'Inti', spanish: 'Sol', phonetic: 'in-ti' },
    category: 'nature',
    iconName: 'sun',
    color: '#eab308',
  },
  {
    pairId: 'm-killa',
    title: { quechua: 'Killa', spanish: 'Luna', phonetic: 'ki-lla' },
    category: 'nature',
    iconName: 'moon',
    color: '#3b82f6',
  },
  {
    pairId: 'm-papa',
    title: { quechua: 'Papa', spanish: 'Papa', phonetic: 'pa-pa' },
    category: 'fruits',
    iconName: 'potato',
    color: '#b45309',
  },
  {
    pairId: 'm-sara',
    title: { quechua: 'Sara', spanish: 'Maíz', phonetic: 'sa-ra' },
    category: 'fruits',
    iconName: 'corn',
    color: '#16a34a',
  },
  {
    pairId: 'm-puka',
    title: { quechua: 'Puka', spanish: 'Rojo', phonetic: 'pu-ka' },
    category: 'colors',
    iconName: 'palette-red',
    color: '#dc2626',
  },
  {
    pairId: 'm-anqas',
    title: { quechua: 'Anqas', spanish: 'Azul', phonetic: 'an-qas' },
    category: 'colors',
    iconName: 'palette-blue',
    color: '#2563eb',
  },
];

// ==========================================
// JUEGO 3: COLORES (LLIMPIKUNA)
// ==========================================
export const COLORS_DATA: ColorItem[] = [
  {
    id: 'col-puka',
    colorHex: '#EF4444',
    bgClass: 'bg-red-500',
    borderClass: 'border-red-600',
    name: {
      quechua: 'Puka',
      spanish: 'Rojo',
      phonetic: 'pu-ka',
    },
    exampleObject: {
      name: { quechua: 'Puka cantuta t\'ika', spanish: 'Flor de cantuta roja' },
      icon: 'flower',
    },
  },
  {
    id: 'col-qomer',
    colorHex: '#10B981',
    bgClass: 'bg-emerald-500',
    borderClass: 'border-emerald-600',
    name: {
      quechua: 'Q\'omer',
      spanish: 'Verde',
      phonetic: 'q\'o-mer',
      dialectNotes: { chanka: 'Qomer', collao: 'Q\'omer' },
    },
    exampleObject: {
      name: { quechua: 'Q\'omer sach\'a raphi', spanish: 'Hoja verde del árbol' },
      icon: 'leaf',
    },
  },
  {
    id: 'col-anqas',
    colorHex: '#0EA5E9',
    bgClass: 'bg-sky-500',
    borderClass: 'border-sky-600',
    name: {
      quechua: 'Anqas',
      spanish: 'Azul',
      phonetic: 'an-qas',
    },
    exampleObject: {
      name: { quechua: 'Anqas hanaq pacha', spanish: 'Cielo andino azul' },
      icon: 'cloud',
    },
  },
  {
    id: 'col-qellu',
    colorHex: '#F59E0B',
    bgClass: 'bg-amber-500',
    borderClass: 'border-amber-600',
    name: {
      quechua: 'Q\'ellu',
      spanish: 'Amarillo',
      phonetic: 'q\'e-llu',
      dialectNotes: { chanka: 'Qellu', collao: 'Q\'ellu' },
    },
    exampleObject: {
      name: { quechua: 'Q\'ellu sara choclo', spanish: 'Choclo de maíz amarillo' },
      icon: 'corn',
    },
  },
  {
    id: 'col-yuraq',
    colorHex: '#F8FAFC',
    bgClass: 'bg-slate-100',
    borderClass: 'border-slate-300',
    name: {
      quechua: 'Yuraq',
      spanish: 'Blanco',
      phonetic: 'yu-raq',
    },
    exampleObject: {
      name: { quechua: 'Yuraq rit\'i urqupi', spanish: 'Nieve blanca del nevado' },
      icon: 'mountain-snow',
    },
  },
  {
    id: 'col-yana',
    colorHex: '#1E293B',
    bgClass: 'bg-slate-800',
    borderClass: 'border-slate-900',
    name: {
      quechua: 'Yana',
      spanish: 'Negro',
      phonetic: 'ya-na',
    },
    exampleObject: {
      name: { quechua: 'Yana tutapi ch\'aska', spanish: 'Noche oscura estrellada' },
      icon: 'moon',
    },
  },
  {
    id: 'col-chumpi',
    colorHex: '#92400E',
    bgClass: 'bg-amber-800',
    borderClass: 'border-amber-900',
    name: {
      quechua: 'Ch\'umpi',
      spanish: 'Marrón / Café',
      phonetic: 'ch\'um-pi',
      dialectNotes: { chanka: 'Chumpi', collao: 'Ch\'umpi' },
    },
    exampleObject: {
      name: { quechua: 'Ch\'umpi allpa chakra', spanish: 'Tierra fértil de la chacra' },
      icon: 'mountain',
    },
  },
  {
    id: 'col-kulli',
    colorHex: '#A855F7',
    bgClass: 'bg-purple-500',
    borderClass: 'border-purple-600',
    name: {
      quechua: 'Kulli',
      spanish: 'Morado / Púrpura',
      phonetic: 'kul-li',
    },
    exampleObject: {
      name: { quechua: 'Kulli sara chichapaq', spanish: 'Maíz morado para la chicha' },
      icon: 'sparkles',
    },
  },
];

// ==========================================
// JUEGO 4: ANIMALES (UYWAKUNA)
// ==========================================
export const ANIMALS_DATA: AnimalItem[] = [
  {
    id: 'ani-llama',
    name: { quechua: 'Llama', spanish: 'Llama', phonetic: 'lla-ma' },
    category: 'domestico',
    habitat: { quechua: 'Suni puna orqokunapi', spanish: 'En las altas punas y montañas' },
    description: {
      quechua: 'Llamaqa sumaq uywam, k\'irita apan millmantapas quwan.',
      spanish: 'Animal andino noble que transporta cargas y nos da lana abrigadora.',
    },
    soundDescription: { quechua: 'Mmm-mmm nispa qaparin', spanish: 'Balido suave y curioso' },
    iconName: 'llama',
    funQuestion: {
      question: { quechua: 'Maypitaq llamaqa tiyan?', spanish: '¿Dónde vive la llama?' },
      options: [
        { quechua: 'Hatun punapi', spanish: 'En la puna alta' },
        { quechua: 'Hatun mayupi', spanish: 'En el fondo del río' },
        { quechua: 'Sach\'a sach\'api', spanish: 'En la selva profunda' },
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'ani-kuntur',
    name: { quechua: 'Kuntur', spanish: 'Cóndor', phonetic: 'kun-tur' },
    category: 'silvestre',
    habitat: { quechua: 'Hanaq qaqa pampapi', spanish: 'En los acantilados más altos' },
    description: {
      quechua: 'Kunturqa hanaq pachapa apunmi, hatun raprakunawan pawan.',
      spanish: 'El ave sagrada de los Andes con enormes alas que acarician las nubes.',
    },
    soundDescription: { quechua: 'Phawarispa wayrata kuyuchin', spanish: 'Silbido imponente al volar' },
    iconName: 'condor',
    funQuestion: {
      question: { quechua: 'Pitaq hanaq pachapi pawan?', spanish: '¿Quién vuela en lo alto del cielo?' },
      options: [
        { quechua: 'Kuntur', spanish: 'El Cóndor' },
        { quechua: 'Quy', spanish: 'El Cuy' },
        { quechua: 'Allqo', spanish: 'El Perro' },
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'ani-wikuna',
    name: {
      quechua: 'Wik\'uña',
      spanish: 'Vicuña',
      phonetic: 'wi-k\'u-ña',
      dialectNotes: { chanka: 'Wikuña', collao: 'Wik\'uña' },
    },
    category: 'silvestre',
    habitat: { quechua: 'Chiriy-puna pajonalkunapi', spanish: 'Pajonales fríos de la alta meseta' },
    description: {
      quechua: 'Wik\'uñaqa llamp\'u millmayuq, Perú suyupa unanchaynin.',
      spanish: 'Posee la lana más fina y suave del mundo, símbolo del escudo nacional del Perú.',
    },
    soundDescription: { quechua: 'Iii-iii ch\'ulluspa wajan', spanish: 'Relincho agudo de alerta' },
    iconName: 'vicuna',
    funQuestion: {
      question: { quechua: 'Ima uywataq Perú unanchapi kachkan?', spanish: '¿Qué animal está en el escudo del Perú?' },
      options: [
        { quechua: 'Wik\'uña', spanish: 'La Vicuña' },
        { quechua: 'Misi', spanish: 'El Gato' },
        { quechua: 'Atuq', spanish: 'El Zorro' },
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'ani-quy',
    name: {
      quechua: 'Quy',
      spanish: 'Cuy / Cobayo',
      phonetic: 'quy',
      dialectNotes: { chanka: 'Quy', collao: 'Qowi' },
    },
    category: 'domestico',
    habitat: { quechua: 'Wasinchis chukllapim', spanish: 'En nuestras casitas andinas' },
    description: {
      quechua: 'Quychayqa ch\'iñicha, alfalfa mikhuspa phawan.',
      spanish: 'Animalito pequeño, veloz y juguetón que come alfalfa fresca.',
    },
    soundDescription: { quechua: 'Kuy-kuy-kuy nispa waqan', spanish: 'Chirrido alegre kuy-kuy' },
    iconName: 'cuy',
    funQuestion: {
      question: { quechua: 'Imatataq quycha mikhun?', spanish: '¿Qué come el cuycito?' },
      options: [
        { quechua: 'Q\'achuta alfalfa', spanish: 'Pasto y alfalfa' },
        { quechua: 'Aychata', spanish: 'Carne asada' },
        { quechua: 'Challwata', spanish: 'Peces del río' },
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'ani-puma',
    name: { quechua: 'Puma', spanish: 'Puma', phonetic: 'pu-ma' },
    category: 'silvestre',
    habitat: { quechua: 'Sach\'a-sach\'a orqokunapi', spanish: 'Bosques andinos y cavernas' },
    description: {
      quechua: 'Pumaqa kallpasapa Kay Pachapa apunmi.',
      spanish: 'Símbolo de fuerza terrenal, sabiduría y agilidad en el mundo andino.',
    },
    soundDescription: { quechua: 'Grrr kallpawan qaparin', spanish: 'Rugido sigiloso y fuerte' },
    iconName: 'puma',
    funQuestion: {
      question: { quechua: 'Puma imatam rikuchin?', spanish: '¿Qué simboliza el puma andino?' },
      options: [
        { quechua: 'Kallpata yachaytapas', spanish: 'Fuerza y sabiduría' },
        { quechua: 'Puñuyllata', spanish: 'Pereza de dormir' },
        { quechua: 'Chinkayta', spanish: 'Miedo constante' },
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'ani-atuq',
    name: { quechua: 'Atuq', spanish: 'Zorro andino', phonetic: 'a-tuq' },
    category: 'silvestre',
    habitat: { quechua: 'Qasa orqokunapi', spanish: 'Montañas y quebradas' },
    description: {
      quechua: 'Atuqqa q\'iwi uywacham willakuykunapi kusichiq.',
      spanish: 'Personaje travieso y muy astuto de los cuentos tradicionales andinos.',
    },
    soundDescription: { quechua: 'Waw-waw qaparispa purin', spanish: 'Aullido nocturno juguetón' },
    iconName: 'fox',
    funQuestion: {
      question: { quechua: 'Imaynataq atuqqa willakuykunapi?', spanish: '¿Cómo es el zorro en los cuentos?' },
      options: [
        { quechua: 'Q\'iwicha yachaysapa', spanish: 'Astuto y pícaro' },
        { quechua: 'Llakisqalla', spanish: 'Triste y tímido' },
        { quechua: 'Puñuqlla', spanish: 'Solo dormilón' },
      ],
      correctIndex: 0,
    },
  },
];

// ==========================================
// JUEGO 5: FRUTAS Y ALIMENTOS ANDINOS
// ==========================================
export const FOODS_DATA: FoodItem[] = [
  {
    id: 'food-papa',
    name: { quechua: 'Papa', spanish: 'Papa nativa', phonetic: 'pa-pa' },
    category: 'tuberculo',
    description: {
      quechua: 'Perú suyupi kimsa waranqa papa llimpikuna tiyan.',
      spanish: 'El Perú tiene más de 3,000 variedades de papas nativas de colores.',
    },
    culturalNote: {
      quechua: 'Allpamanta paqarimuq kawsaypa sonqonmi.',
      spanish: 'Alimento ancestral y regalo de la Pachamama para la humanidad.',
    },
    iconName: 'potato',
    color: '#d97706',
  },
  {
    id: 'food-sara',
    name: { quechua: 'Sara', spanish: 'Maíz / Choclo', phonetic: 'sa-ra' },
    category: 'grano',
    description: {
      quechua: 'Q\'ellu, puka, yuraq kulli sarapas chakranpiraq.',
      spanish: 'Choclo andino dulce de granos gigantes, amarillo, blanco y morado.',
    },
    culturalNote: {
      quechua: 'Sarawan kanchata, mut\'ita lawatapas ruranchis.',
      spanish: 'Con el maíz preparamos cancha tostada, mote y chicha morada.',
    },
    iconName: 'corn',
    color: '#eab308',
  },
  {
    id: 'food-kinwa',
    name: {
      quechua: 'Kinwa',
      spanish: 'Quinua',
      phonetic: 'kin-wa',
      dialectNotes: { chanka: 'Kinwa', collao: 'Qinwa' },
    },
    category: 'grano',
    description: {
      quechua: 'Quri mikhuna warmakunapaq, sumaq kallpachaq.',
      spanish: 'El grano de oro de los Andes con nutrientes y proteínas completas.',
    },
    culturalNote: {
      quechua: 'Inkakunapa kawsaynin, llapallan pachatapis kawsachin.',
      spanish: 'El grano sagrado de los incas que nutre al mundo entero.',
    },
    iconName: 'wheat',
    color: '#ca8a04',
  },
  {
    id: 'food-chunu',
    name: { quechua: 'Chuñu', spanish: 'Chuño negro / Moraya', phonetic: 'chu-ñu' },
    category: 'tradicional',
    description: {
      quechua: 'Rit\'i qasa pachapi papamanta rurasqa.',
      spanish: 'Técnica milenaria de deshidratación con helada nocturna y sol andino.',
    },
    culturalNote: {
      quechua: 'Waranqa watata wasipi allichasqa qhipanman.',
      spanish: 'Se conserva durante muchos años sin perder sus propiedades.',
    },
    iconName: 'circle-dot',
    color: '#475569',
  },
  {
    id: 'food-ulluku',
    name: { quechua: 'Ulluku', spanish: 'Olluco', phonetic: 'ull-u-ku' },
    category: 'tuberculo',
    description: {
      quechua: 'K\'anchaq q\'ellu puka tubérculucha misk\'illaña.',
      spanish: 'Tubérculo brillante amarillo y rojo de textura suave y agradable.',
    },
    culturalNote: {
      quechua: 'Charquichawan wayk\'usqa misk\'i mikhunam.',
      spanish: 'El olluquito con charqui es uno de los platos más queridos del Perú.',
    },
    iconName: 'sparkle',
    color: '#f97316',
  },
  {
    id: 'food-luqma',
    name: { quechua: 'Luqma', spanish: 'Lúcuma', phonetic: 'luq-ma' },
    category: 'fruta',
    description: {
      quechua: 'Q\'ellu misk\'i ruru, Inka kawsaypa misk\'in.',
      spanish: 'Fruta dorada andina llamada el "oro de los Incas" por su dulzura.',
    },
    culturalNote: {
      quechua: 'Q\'omer qarayoq, sonqonqa quri hina k\'anchamun.',
      spanish: 'Piel verde y pulpa anaranjada cremosa, deliciosa para postres.',
    },
    iconName: 'apple',
    color: '#d97706',
  },
  {
    id: 'food-chirimuya',
    name: { quechua: 'Chirimuya', spanish: 'Chirimoya', phonetic: 'chi-ri-mu-ya' },
    category: 'fruta',
    description: {
      quechua: 'Yuraq misk\'i sonqoyuq ruru, k\'acha mikhunallapaq.',
      spanish: 'Fruta originaria de los valles andinos, dulce, cremosa y aromática.',
    },
    culturalNote: {
      quechua: 'Chiri mayu patapi wiñaq misk\'icha.',
      spanish: 'Crece en los valles interandinos y llena de energía a los niños.',
    },
    iconName: 'citrus',
    color: '#15803d',
  },
  {
    id: 'food-palta',
    name: { quechua: 'Palta', spanish: 'Palta / Aguacate', phonetic: 'pal-ta' },
    category: 'fruta',
    description: {
      quechua: 'Q\'omer llamp\'u sonqochayuq, tantawan mikhuna.',
      spanish: 'Fruta andina verde y cremosa, rica en vitaminas y grasas saludables.',
    },
    culturalNote: {
      quechua: 'Tantachapi churakuspa kusisqa desayunopi.',
      spanish: 'Acompañamiento tradicional en los desayunos de nuestras comunidades.',
    },
    iconName: 'nut',
    color: '#16a34a',
  },
];
