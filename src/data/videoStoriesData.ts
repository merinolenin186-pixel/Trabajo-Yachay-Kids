import { VideoStory } from '../types';

export const VIDEO_STORIES_DATA: VideoStory[] = [
  // 1. CUENTOS INFANTILES EN QUECHUA
  {
    id: 'vid-zorro-condor',
    title: {
      quechua: 'Atuqmanta Kunturmantawan',
      spanish: 'El Zorro y el Cóndor en las Estrellas',
      phonetic: 'a-tuq-man-ta kun-tur-man-ta-wan',
    },
    category: 'cuentos',
    durationSeconds: 24,
    thumbnailColor: '#d97706',
    icon: 'book-open',
    scenes: [
      {
        timestamp: 0,
        duration: 6,
        backgroundType: 'andina_day',
        characters: [
          { type: 'fox', position: 'left', animation: 'walk' },
          { type: 'condor', position: 'right', animation: 'idle' },
        ],
        narrationQuechua: 'Huk p\'unchawsi, atuqqa kunturta watukusqa. Hanaq pachata riyta munasqa.',
        narrationSpanish: 'Un día, el zorro visitó al cóndor. Deseaba subir al cielo para conocer la gran fiesta.',
        subtitlesQuechua: 'Atuqqa kunturta watukusqa: «Hanaq pachata apaway» nispa.',
        subtitlesSpanish: 'El zorro le pidió al cóndor: «Por favor, llévame al cielo».',
      },
      {
        timestamp: 6,
        duration: 6,
        backgroundType: 'rainbow_sky',
        characters: [
          { type: 'condor', position: 'center', animation: 'jump' },
          { type: 'fox', position: 'center', animation: 'idle' },
        ],
        narrationQuechua: 'Kunturqa raprakunapi atuqta apasqa. Hanaq pachapi quyllurkuna k\'anchachkasqa.',
        narrationSpanish: 'El cóndor llevó al zorro en sus majestuosas alas. En lo alto brillaban las estrellas.',
        subtitlesQuechua: 'Kunturqa atuqta aparisqa. Hanaq pachapi quyllurkuna k\'anchachkan.',
        subtitlesSpanish: 'El cóndor voló muy alto. En el cielo brillaban millones de estrellas.',
      },
      {
        timestamp: 12,
        duration: 6,
        backgroundType: 'andina_night',
        characters: [
          { type: 'fox', position: 'center', animation: 'jump' },
          { type: 'sun', position: 'right', animation: 'idle' },
        ],
        narrationQuechua: 'Atuqqa hanaq pachapi mikhuymanta saksasqa. Chaymanta watapi urayamusqa.',
        narrationSpanish: 'En el cielo comió maíz y papas. Al descender con una cuerda, las semillas cayeron a la tierra.',
        subtitlesQuechua: 'Sarata papatapas mikhusqa, muhukunata allpaman wischusqa.',
        subtitlesSpanish: 'Comió maíz y papa, y al bajar sembró semillas en toda nuestra tierra.',
      },
      {
        timestamp: 18,
        duration: 6,
        backgroundType: 'chakras',
        characters: [
          { type: 'chaski_boy', position: 'left', animation: 'wave' },
          { type: 'llama', position: 'right', animation: 'jump' },
        ],
        narrationQuechua: 'Chaymi kunankama Andes orqopi sumaq mikhunakuna wiñan. Chayllapi willakuy tukun!',
        narrationSpanish: '¡Por eso hoy en día crecen hermosos alimentos en los Andes. Y así concluye este cuento!',
        subtitlesQuechua: 'Chaymi sumaq mikhunakuna wiñan. Kusisqa llapallanchis kanchis!',
        subtitlesSpanish: '¡Así floreció la abundancia en los Andes. Y todos vivimos agradecidos!',
      },
    ],
  },

  // 2. NÚMEROS Y MATEMÁTICAS BÁSICAS
  {
    id: 'vid-numeros',
    title: {
      quechua: 'Yupaykunata Yachasunchis',
      spanish: 'Aprendamos a Contar en los Andes',
      phonetic: 'yu-pay-ku-na-ta ya-cha-sun-chis',
    },
    category: 'numeros',
    durationSeconds: 20,
    thumbnailColor: '#0284c7',
    icon: 'calculator',
    scenes: [
      {
        timestamp: 0,
        duration: 5,
        backgroundType: 'andina_day',
        characters: [
          { type: 'chaski_boy', position: 'left', animation: 'wave' },
          { type: 'llama', position: 'right', animation: 'idle' },
        ],
        narrationQuechua: 'Huk, iskay, kimsa! Llamachakunata chakillapi yupasunchis.',
        narrationSpanish: '¡Uno, dos, tres! Contemos las llamitas que pastan en la meseta.',
        subtitlesQuechua: 'Huk (1), iskay (2), kimsa (3) llamakuna.',
        subtitlesSpanish: 'Uno (1), dos (2), tres (3) llamitas.',
      },
      {
        timestamp: 5,
        duration: 5,
        backgroundType: 'chakras',
        characters: [
          { type: 'chaski_boy', position: 'center', animation: 'jump' },
        ],
        narrationQuechua: 'Tawa, pichqa, suqta! Papachakunata canastachapi yupaykuni.',
        narrationSpanish: '¡Cuatro, cinco, seis! Contemos las ricas papas cosechadas.',
        subtitlesQuechua: 'Tawa (4), pichqa (5), suqta (6) papakuna.',
        subtitlesSpanish: 'Cuatro (4), cinco (5), seis (6) papas nativas.',
      },
      {
        timestamp: 10,
        duration: 5,
        backgroundType: 'rainbow_sky',
        characters: [
          { type: 'sun', position: 'center', animation: 'idle' },
        ],
        narrationQuechua: 'Qanchis, pusaq, isqun, chunka! K\'anchaq ch\'askakunapas chunka kanku!',
        narrationSpanish: '¡Siete, ocho, nueve y diez! ¡Llegamos a diez con alegría!',
        subtitlesQuechua: 'Qanchis (7), pusaq (8), isqun (9), chunka (10)!',
        subtitlesSpanish: 'Siete (7), ocho (8), nueve (9), diez (10)!',
      },
      {
        timestamp: 15,
        duration: 5,
        backgroundType: 'village',
        characters: [
          { type: 'chaski_boy', position: 'center', animation: 'jump' },
          { type: 'pacha_girl', position: 'right', animation: 'wave' },
        ],
        narrationQuechua: 'Allillamanta yupayta yachakunchis. Tukuy sunquwan yachaq warmakuna!',
        narrationSpanish: '¡Paso a paso aprendemos a contar en quechua! ¡Muy bien hecho, amiguitos!',
        subtitlesQuechua: 'Kusisqa yupanchis: Hukmanta chunka kama!',
        subtitlesSpanish: '¡Felices contamos: del uno hasta el diez!',
      },
    ],
  },

  // 3. ANIMALES DE LOS ANDES
  {
    id: 'vid-animales',
    title: {
      quechua: 'Antikunapa Uywankuna',
      spanish: 'Los Animales Sagrados del Perú',
      phonetic: 'an-ti-ku-na-pa uy-wan-ku-na',
    },
    category: 'animales',
    durationSeconds: 20,
    thumbnailColor: '#10b981',
    icon: 'paw-print',
    scenes: [
      {
        timestamp: 0,
        duration: 5,
        backgroundType: 'andina_day',
        characters: [
          { type: 'llama', position: 'center', animation: 'walk' },
        ],
        narrationQuechua: 'Kaymi llama. Llamaqa sumaq llamp\'u millmayuq uywam.',
        narrationSpanish: 'Esta es la llama andina. Tiene un pelaje muy suave y cariñoso.',
        subtitlesQuechua: 'Kaymi llama, orqokunapi kusisqa kawsan.',
        subtitlesSpanish: 'Esta es la llama, vive feliz en las montañas.',
      },
      {
        timestamp: 5,
        duration: 5,
        backgroundType: 'rainbow_sky',
        characters: [
          { type: 'condor', position: 'center', animation: 'jump' },
        ],
        narrationQuechua: 'Kaymi kuntur. Kunturqa hanaq pachapi llapa p\'isqukunapa apunmi.',
        narrationSpanish: 'Este es el cóndor. Es el rey de todas las aves en el cielo andino.',
        subtitlesQuechua: 'Kaymi kuntur, hanaq pachapa apun.',
        subtitlesSpanish: 'Este es el cóndor, el gran señor del cielo.',
      },
      {
        timestamp: 10,
        duration: 5,
        backgroundType: 'village',
        characters: [
          { type: 'cuy', position: 'center', animation: 'jump' },
        ],
        narrationQuechua: 'Kaymi quy. Quychayqa wasipi kawsan, kuy-kuy nispa waqan.',
        narrationSpanish: 'Este es el cuy. Vive en nuestras casas andinas y canta kuy-kuy.',
        subtitlesQuechua: 'Kaymi quy, ch\'iñicha uywa wasipi tiyaq.',
        subtitlesSpanish: 'Este es el cuy, animalito pequeño y tierno de casa.',
      },
      {
        timestamp: 15,
        duration: 5,
        backgroundType: 'andina_day',
        characters: [
          { type: 'chaski_boy', position: 'left', animation: 'wave' },
          { type: 'llama', position: 'right', animation: 'wave' },
        ],
        narrationQuechua: 'Uywakunataqa kuyakuywan qhawana. Paykunapas kawsaypa masinchismi!',
        narrationSpanish: 'Debemos cuidar y proteger con amor a todos los animales de nuestra tierra.',
        subtitlesQuechua: 'Uywakunata kuyasun, paykunaqa masinchismi!',
        subtitlesSpanish: '¡Amemos a los animales, son nuestros grandes amigos!',
      },
    ],
  },

  // 4. COLORES DEL ARCOÍRIS
  {
    id: 'vid-colores',
    title: {
      quechua: 'K\'uychipa Llimpinkuna',
      spanish: 'Los Colores del Arcoíris Andino',
      phonetic: 'k\'uy-chi-pa llim-pin-ku-na',
    },
    category: 'colores',
    durationSeconds: 18,
    thumbnailColor: '#ec4899',
    icon: 'palette',
    scenes: [
      {
        timestamp: 0,
        duration: 6,
        backgroundType: 'rainbow_sky',
        characters: [
          { type: 'pacha_girl', position: 'center', animation: 'wave' },
          { type: 'sun', position: 'right', animation: 'idle' },
        ],
        narrationQuechua: 'Paramanta qhipata, k\'uychi rikhurin! Puka, q\'ellu, anqas k\'anchamun.',
        narrationSpanish: '¡Después de la lluvia, sale el arcoíris! Rojo, amarillo y azul resplandecen.',
        subtitlesQuechua: 'K\'uychi rikhurin: Puka, Q\'ellu, Anqas!',
        subtitlesSpanish: 'Aparece el arcoíris: ¡Rojo, Amarillo y Azul!',
      },
      {
        timestamp: 6,
        duration: 6,
        backgroundType: 'chakras',
        characters: [
          { type: 'chaski_boy', position: 'center', animation: 'jump' },
        ],
        narrationQuechua: 'Q\'omer chakrakuna, kulli t\'ikakuna, yuraq rit\'i urqukunapi kachkan.',
        narrationSpanish: 'Verdes son los campos, moradas las flores y blanca la nieve en las cumbres.',
        subtitlesQuechua: 'Q\'omer chakra, kulli t\'ika, yuraq rit\'i.',
        subtitlesSpanish: 'Chacra verde, flor morada y nieve blanca.',
      },
      {
        timestamp: 12,
        duration: 6,
        backgroundType: 'village',
        characters: [
          { type: 'pacha_girl', position: 'left', animation: 'jump' },
          { type: 'chaski_boy', position: 'right', animation: 'wave' },
        ],
        narrationQuechua: 'Tukuy llimpikuna llicllanchispi tiyan. ¡Sumaqmi llimpikunawan yachay!',
        narrationSpanish: '¡Todos estos colores alegran nuestras mantas y prendas tradicionales!',
        subtitlesQuechua: 'Tukuy llimpikunawan kawsayninchis sumaqyapun!',
        subtitlesSpanish: '¡Con todos estos colores nuestra vida se llena de alegría!',
      },
    ],
  },

  // 5. SALUDOS Y EXPRESIONES
  {
    id: 'vid-saludos',
    title: {
      quechua: 'Napaykunakuna Kusisqa',
      spanish: 'Saludos y Buenas Costumbres Andinas',
      phonetic: 'na-pay-ku-na-ku-na ku-sis-qa',
    },
    category: 'saludos',
    durationSeconds: 18,
    thumbnailColor: '#8b5cf6',
    icon: 'message-circle',
    scenes: [
      {
        timestamp: 0,
        duration: 6,
        backgroundType: 'andina_day',
        characters: [
          { type: 'chaski_boy', position: 'left', animation: 'wave' },
          { type: 'pacha_girl', position: 'right', animation: 'wave' },
        ],
        narrationQuechua: 'Tutanmantam rimaykullayki: «Allillanchu mamáy, allillanchu taytáy!».',
        narrationSpanish: 'Por la mañana saludamos con afecto: «¿Cómo están mamita y papito?».',
        subtitlesQuechua: 'Rimaykullayki: «Allillanchu masiy?»',
        subtitlesSpanish: 'Te saludo con respeto: «¿Cómo estás, amiguito?»',
      },
      {
        timestamp: 6,
        duration: 6,
        backgroundType: 'village',
        characters: [
          { type: 'pacha_girl', position: 'right', animation: 'jump' },
        ],
        narrationQuechua: 'Kusisqa kutichinchis: «Allillanmi kani! Añay, sulpayki yanapawasqaykimanta».',
        narrationSpanish: 'Respondemos con una sonrisa: «¡Estoy muy bien! Gracias de corazón por tu ayuda».',
        subtitlesQuechua: '«Allillanmi kani! Añay / Sulpayki».',
        subtitlesSpanish: '«¡Estoy muy bien! Muchas gracias por todo».',
      },
      {
        timestamp: 12,
        duration: 6,
        backgroundType: 'andina_night',
        characters: [
          { type: 'chaski_boy', position: 'center', animation: 'wave' },
        ],
        narrationQuechua: 'Tukuspa ninchis: «Tupananchiskama! Paqarinkama masiykuna!».',
        narrationSpanish: 'Al despedirnos decimos con cariño: «¡Hasta que nos volvamos a ver! ¡Hasta mañana!».',
        subtitlesQuechua: '«Tupananchiskama! Paqarinkama!».',
        subtitlesSpanish: '«¡Hasta pronto! ¡Hasta mañana, amigos!».',
      },
    ],
  },

  // 6. FAMILIA ANDINA
  {
    id: 'vid-familia',
    title: {
      quechua: 'Ayllunchiswan Kusisqa',
      spanish: 'Nuestra Hermosa Familia Andina',
      phonetic: 'ay-llun-chis-wan ku-sis-qa',
    },
    category: 'familia',
    durationSeconds: 18,
    thumbnailColor: '#f59e0b',
    icon: 'users',
    scenes: [
      {
        timestamp: 0,
        duration: 6,
        backgroundType: 'village',
        characters: [
          { type: 'pacha_girl', position: 'center', animation: 'idle' },
          { type: 'chaski_boy', position: 'left', animation: 'wave' },
        ],
        narrationQuechua: 'Mamaywan taytaywan kusisqa tiyani. Paykunam chakrapim kuska llamk\'anku.',
        narrationSpanish: 'Vivo feliz con mi mamá y mi papá. Juntos siembran con dedicación en la chacra.',
        subtitlesQuechua: 'Mamaywan taytaywan kuska tiyani.',
        subtitlesSpanish: 'Vivo feliz y protegido junto a mamá y papá.',
      },
      {
        timestamp: 6,
        duration: 6,
        backgroundType: 'village',
        characters: [
          { type: 'chaski_boy', position: 'center', animation: 'jump' },
          { type: 'pacha_girl', position: 'right', animation: 'wave' },
        ],
        narrationQuechua: 'Awichayqa sumaq willakuykunata willawan. Awichuyqa takikunata yachachiwan.',
        narrationSpanish: 'Mi abuelita me cuenta lindas leyendas. Mi abuelito me enseña canciones en quechua.',
        subtitlesQuechua: 'Awichaywan awichuywan yachakuni.',
        subtitlesSpanish: 'Con mis queridos abuelitos aprendo la sabiduría.',
      },
      {
        timestamp: 12,
        duration: 6,
        backgroundType: 'chakras',
        characters: [
          { type: 'chaski_boy', position: 'left', animation: 'wave' },
          { type: 'pacha_girl', position: 'center', animation: 'jump' },
          { type: 'llama', position: 'right', animation: 'idle' },
        ],
        narrationQuechua: 'Ayllunchisqa huk sunqullam kawsan. Ayni ruranakuywan llapanchis yanapanakunchis!',
        narrationSpanish: '¡En la familia y la comunidad nos apoyamos todos con el sagrado ayni de reciprocidad!',
        subtitlesQuechua: 'Ayni: «Kunan qampa, paqarin ñuqapa».',
        subtitlesSpanish: 'El ayni: «Hoy por ti, mañana por mí».',
      },
    ],
  },

  // 7. NATURALEZA Y MEDIOAMBIENTE
  {
    id: 'vid-naturaleza',
    title: {
      quechua: 'Pachamama Kuyay',
      spanish: 'Cuidemos a la Madre Tierra y el Agua',
      phonetic: 'pa-cha-ma-ma ku-yay',
    },
    category: 'naturaleza',
    durationSeconds: 18,
    thumbnailColor: '#059669',
    icon: 'sprout',
    scenes: [
      {
        timestamp: 0,
        duration: 6,
        backgroundType: 'lake_titicaca',
        characters: [
          { type: 'chaski_boy', position: 'center', animation: 'wave' },
        ],
        narrationQuechua: 'Yakuqa kawsaymi. Mayukuna, quchakunapas chuya kanan.',
        narrationSpanish: 'El agua es vida. Debemos mantener siempre limpios los ríos y las lagunas sagradas.',
        subtitlesQuechua: 'Yakuqa kawsaypa sonqonmi. Mayuta ch\'uyata waqaychasun.',
        subtitlesSpanish: 'El agua es el corazón de la vida. Cuidemos nuestros ríos limpios.',
      },
      {
        timestamp: 6,
        duration: 6,
        backgroundType: 'chakras',
        characters: [
          { type: 'pacha_girl', position: 'center', animation: 'jump' },
        ],
        narrationQuechua: 'Sach\'akunata tarpusun, allpata ama qhillichasunchu.',
        narrationSpanish: 'Plantemos árboles andinos y queñuales, nunca ensuciemos la tierra.',
        subtitlesQuechua: 'Sach\'akunata tarpusun, allpata kuyasun.',
        subtitlesSpanish: 'Plantemos arbolitos nativos y amemos la tierra.',
      },
      {
        timestamp: 12,
        duration: 6,
        backgroundType: 'andina_day',
        characters: [
          { type: 'chaski_boy', position: 'left', animation: 'wave' },
          { type: 'sun', position: 'right', animation: 'idle' },
        ],
        narrationQuechua: 'Pachamamaqa tukuy ima kawsayta quwanchis. Añay ninchis!',
        narrationSpanish: 'La Madre Tierra nos brinda alimento y cobijo. ¡Démosle gracias con el corazón!',
        subtitlesQuechua: 'Pachamama, añay tukuy qowasqaykimanta!',
        subtitlesSpanish: '¡Madre Tierra, gracias por todo lo que nos regalas!',
      },
    ],
  },

  // 8. FRUTAS Y ALIMENTOS ANDINOS
  {
    id: 'vid-alimentos',
    title: {
      quechua: 'Sumaq Mikhunakuna',
      spanish: 'Los Superalimentos Andinos: Papa, Quinua y Choclo',
      phonetic: 'su-maq mik-hu-na-ku-na',
    },
    category: 'alimentos',
    durationSeconds: 18,
    thumbnailColor: '#ea580c',
    icon: 'apple',
    scenes: [
      {
        timestamp: 0,
        duration: 6,
        backgroundType: 'chakras',
        characters: [
          { type: 'pacha_girl', position: 'center', animation: 'wave' },
        ],
        narrationQuechua: 'Perú suyupiqa kimsa waranqa papa llimpikuna kachkan!',
        narrationSpanish: '¡En nuestro Perú crecen más de tres mil variedades de papas nativas de colores!',
        subtitlesQuechua: 'Sumaq papakuna: puka, q\'ellu, yana, kulli!',
        subtitlesSpanish: '¡Papas nativas deliciosas: rojas, amarillas, negras y moradas!',
      },
      {
        timestamp: 6,
        duration: 6,
        backgroundType: 'chakras',
        characters: [
          { type: 'chaski_boy', position: 'center', animation: 'jump' },
        ],
        narrationQuechua: 'Kinwaqa quri murum, warmakunata kallpasapata wiñachin.',
        narrationSpanish: 'La quinua es el grano de oro que hace crecer a los niños fuertes y saludables.',
        subtitlesQuechua: 'Kinwawan sarawan mikhuptinchis kallpasapa kanchis.',
        subtitlesSpanish: 'Comiendo quinua y maíz crecemos sanos y fuertes.',
      },
      {
        timestamp: 12,
        duration: 6,
        backgroundType: 'village',
        characters: [
          { type: 'pacha_girl', position: 'left', animation: 'jump' },
          { type: 'chaski_boy', position: 'right', animation: 'wave' },
        ],
        narrationQuechua: 'Sara choclo, chuñu, ullukupas sumaq misk\'i mikhunam. ¡Añallaw!',
        narrationSpanish: '¡El choclo tierno, el chuño y el olluco son un manjar de los dioses! ¡Qué rico!',
        subtitlesQuechua: '¡Añallaw sumaq mikhunanchiskuna!',
        subtitlesSpanish: '¡Qué deliciosa es nuestra comida andina tradicional!',
      },
    ],
  },

  // 9. CULTURA Y TRADICIONES PERUANAS
  {
    id: 'vid-cultura',
    title: {
      quechua: 'Tusuy Raymi Inti Raymipi',
      spanish: 'Fiesta, Música y Tradición Andina',
      phonetic: 'tu-suy ray-mi in-ti ray-mi-pi',
    },
    category: 'cultura',
    durationSeconds: 18,
    thumbnailColor: '#c026d3',
    icon: 'music',
    scenes: [
      {
        timestamp: 0,
        duration: 6,
        backgroundType: 'andina_day',
        characters: [
          { type: 'sun', position: 'center', animation: 'idle' },
          { type: 'chaski_boy', position: 'left', animation: 'jump' },
        ],
        narrationQuechua: 'Inti Raymipi tayta Intita yupaychaspam raymita ruranku.',
        narrationSpanish: 'En la fiesta del Inti Raymi celebramos al padre Sol con música y alegría.',
        subtitlesQuechua: 'Inti Raymi: Kusisqa tayta Intita yupaychanchis.',
        subtitlesSpanish: 'Inti Raymi: Agradecemos al padre Sol con gran fiesta.',
      },
      {
        timestamp: 6,
        duration: 6,
        backgroundType: 'village',
        characters: [
          { type: 'pacha_girl', position: 'center', animation: 'jump' },
          { type: 'chaski_boy', position: 'right', animation: 'wave' },
        ],
        narrationQuechua: 'Qina, tinya, antara wan sumaq huaylashta tususunchis!',
        narrationSpanish: '¡Con la quena, el tambor tinya y la zampoña bailamos todos juntos!',
        subtitlesQuechua: 'Qinawan tinyawan kusisqa tususunchis.',
        subtitlesSpanish: 'Con la quena y la tinya bailamos llenos de emoción.',
      },
      {
        timestamp: 12,
        duration: 6,
        backgroundType: 'rainbow_sky',
        characters: [
          { type: 'chaski_boy', position: 'left', animation: 'jump' },
          { type: 'pacha_girl', position: 'right', animation: 'jump' },
        ],
        narrationQuechua: 'Yachayninchisqa kawsachkanmi, sonqonchispi kusisqa takisun!',
        narrationSpanish: '¡Nuestra milenaria cultura sigue viva! ¡Cantemos con orgullo en nuestro quechua!',
        subtitlesQuechua: '¡Kawsachun Runasimi! ¡Kawsachun Yachayninchis!',
        subtitlesSpanish: '¡Que viva nuestra lengua quechua! ¡Que viva nuestra cultura!',
      },
    ],
  },
];
