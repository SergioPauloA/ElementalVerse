import { useState, useEffect } from 'react';

// Constantes para as cores das categorias de elementos
const ELEMENT_CATEGORIES = {
  'metal-alcalino': '#ff8a65',
  'metal-alcalino-terroso': '#ffb74d',
  'metal-transicao': '#90caf9',
  'metal-pos-transicao': '#80cbc4',
  'semimetal': '#a5d6a7',
  'nao-metal': '#fff59d',
  'halogenio': '#b39ddb',
  'gas-nobre': '#ef9a9a',
  'lantanideo': '#ce93d8',
  'actinideo': '#f48fb1',
  'desconhecido': '#e0e0e0'
};

// Dados dos elementos
const elementsData = [
  // Período 1
  { number: 1, symbol: 'H', name: 'Hidrogênio', category: 'nao-metal', atomic_mass: 1.008, electron_configuration: '1s¹', group: 1, period: 1, block: 's', discovery_year: 1766, state_at_room_temp: 'gasoso', description: 'Elemento mais leve e abundante no universo. Essencial para a formação de estrelas e compostos orgânicos.' },
  { number: 2, symbol: 'He', name: 'Hélio', category: 'gas-nobre', atomic_mass: 4.0026, electron_configuration: '1s²', group: 18, period: 1, block: 's', discovery_year: 1868, state_at_room_temp: 'gasoso', description: 'Gás nobre extremamente leve e estável. Segundo elemento mais abundante no universo.' },
  
  // Período 2
  { number: 3, symbol: 'Li', name: 'Lítio', category: 'metal-alcalino', atomic_mass: 6.94, electron_configuration: '[He] 2s¹', group: 1, period: 2, block: 's', discovery_year: 1817, state_at_room_temp: 'sólido', description: 'Metal mais leve, usado em baterias recarregáveis e tratamento de transtorno bipolar.' },
  { number: 4, symbol: 'Be', name: 'Berílio', category: 'metal-alcalino-terroso', atomic_mass: 9.0122, electron_configuration: '[He] 2s²', group: 2, period: 2, block: 's', discovery_year: 1797, state_at_room_temp: 'sólido', description: 'Metal relativamente raro com alta condutividade térmica.' },
  { number: 5, symbol: 'B', name: 'Boro', category: 'semimetal', atomic_mass: 10.81, electron_configuration: '[He] 2s² 2p¹', group: 13, period: 2, block: 'p', discovery_year: 1808, state_at_room_temp: 'sólido', description: 'Semimetal com propriedades únicas, usado em detergentes e semicondutores.' },
  { number: 6, symbol: 'C', name: 'Carbono', category: 'nao-metal', atomic_mass: 12.011, electron_configuration: '[He] 2s² 2p²', group: 14, period: 2, block: 'p', discovery_year: 'Pré-histórico', state_at_room_temp: 'sólido', description: 'Base da química orgânica e da vida. Forma milhões de compostos diferentes.' },
  { number: 7, symbol: 'N', name: 'Nitrogênio', category: 'nao-metal', atomic_mass: 14.007, electron_configuration: '[He] 2s² 2p³', group: 15, period: 2, block: 'p', discovery_year: 1772, state_at_room_temp: 'gasoso', description: 'Componente principal da atmosfera terrestre. Essencial para proteínas e DNA.' },
  { number: 8, symbol: 'O', name: 'Oxigênio', category: 'nao-metal', atomic_mass: 15.999, electron_configuration: '[He] 2s² 2p⁴', group: 16, period: 2, block: 'p', discovery_year: 1774, state_at_room_temp: 'gasoso', description: 'Elemento mais abundante na crosta terrestre. Fundamental para a respiração aeróbica.' },
  { number: 9, symbol: 'F', name: 'Flúor', category: 'halogenio', atomic_mass: 18.998, electron_configuration: '[He] 2s² 2p⁵', group: 17, period: 2, block: 'p', discovery_year: 1886, state_at_room_temp: 'gasoso', description: 'Elemento mais eletronegativo. Usado em pastas de dente e medicamentos.' },
  { number: 10, symbol: 'Ne', name: 'Neônio', category: 'gas-nobre', atomic_mass: 20.180, electron_configuration: '[He] 2s² 2p⁶', group: 18, period: 2, block: 'p', discovery_year: 1898, state_at_room_temp: 'gasoso', description: 'Gás nobre usado em placas luminosas. Quase completamente inerte.' },
  
  // Período 3
  { number: 11, symbol: 'Na', name: 'Sódio', category: 'metal-alcalino', atomic_mass: 22.990, electron_configuration: '[Ne] 3s¹', group: 1, period: 3, block: 's', discovery_year: 1807, state_at_room_temp: 'sólido', description: 'Metal reativo e abundante. Essencial para a função neural e balanço de eletrólitos.' },
  { number: 12, symbol: 'Mg', name: 'Magnésio', category: 'metal-alcalino-terroso', atomic_mass: 24.305, electron_configuration: '[Ne] 3s²', group: 2, period: 3, block: 's', discovery_year: 1808, state_at_room_temp: 'sólido', description: 'Metal leve e estrutural. Componente da clorofila nas plantas.' },
  { number: 13, symbol: 'Al', name: 'Alumínio', category: 'metal-pos-transicao', atomic_mass: 26.982, electron_configuration: '[Ne] 3s² 3p¹', group: 13, period: 3, block: 'p', discovery_year: 1825, state_at_room_temp: 'sólido', description: 'Metal leve e resistente à corrosão. Amplamente usado em embalagens e construção.' },
  { number: 14, symbol: 'Si', name: 'Silício', category: 'semimetal', atomic_mass: 28.085, electron_configuration: '[Ne] 3s² 3p²', group: 14, period: 3, block: 'p', discovery_year: 1824, state_at_room_temp: 'sólido', description: 'Segundo elemento mais abundante na crosta terrestre. Base da eletrônica moderna.' },
  { number: 15, symbol: 'P', name: 'Fósforo', category: 'nao-metal', atomic_mass: 30.974, electron_configuration: '[Ne] 3s² 3p³', group: 15, period: 3, block: 'p', discovery_year: 1669, state_at_room_temp: 'sólido', description: 'Componente essencial do DNA e ATP. Usado em fertilizantes.' },
  { number: 16, symbol: 'S', name: 'Enxofre', category: 'nao-metal', atomic_mass: 32.06, electron_configuration: '[Ne] 3s² 3p⁴', group: 16, period: 3, block: 'p', discovery_year: 'Pré-histórico', state_at_room_temp: 'sólido', description: 'Elemento amarelo usado em fertilizantes e processos industriais. Componente de aminoácidos.' },
  { number: 17, symbol: 'Cl', name: 'Cloro', category: 'halogenio', atomic_mass: 35.45, electron_configuration: '[Ne] 3s² 3p⁵', group: 17, period: 3, block: 'p', discovery_year: 1774, state_at_room_temp: 'gasoso', description: 'Poderoso agente oxidante usado no tratamento de água e em muitos compostos orgânicos.' },
  { number: 18, symbol: 'Ar', name: 'Argônio', category: 'gas-nobre', atomic_mass: 39.948, electron_configuration: '[Ne] 3s² 3p⁶', group: 18, period: 3, block: 'p', discovery_year: 1894, state_at_room_temp: 'gasoso', description: 'Gás nobre mais abundante na atmosfera terrestre. Usado em lâmpadas e soldagem.' },
  
  // Período 4
  { number: 19, symbol: 'K', name: 'Potássio', category: 'metal-alcalino', atomic_mass: 39.098, electron_configuration: '[Ar] 4s¹', group: 1, period: 4, block: 's', discovery_year: 1807, state_at_room_temp: 'sólido', description: 'Metal reativo essencial para função celular e processos biológicos.' },
  { number: 20, symbol: 'Ca', name: 'Cálcio', category: 'metal-alcalino-terroso', atomic_mass: 40.078, electron_configuration: '[Ar] 4s²', group: 2, period: 4, block: 's', discovery_year: 1808, state_at_room_temp: 'sólido', description: 'Mineral essencial para ossos, dentes e função muscular.' },
  { number: 21, symbol: 'Sc', name: 'Escândio', category: 'metal-transicao', atomic_mass: 44.956, electron_configuration: '[Ar] 3d¹ 4s²', group: 3, period: 4, block: 'd', discovery_year: 1879, state_at_room_temp: 'sólido', description: 'Metal de transição leve e resistente. Usado em ligas de alumínio.' },
  { number: 22, symbol: 'Ti', name: 'Titânio', category: 'metal-transicao', atomic_mass: 47.867, electron_configuration: '[Ar] 3d² 4s²', group: 4, period: 4, block: 'd', discovery_year: 1791, state_at_room_temp: 'sólido', description: 'Metal leve, forte e resistente à corrosão. Usado em aeronaves e implantes médicos.' },
  { number: 23, symbol: 'V', name: 'Vanádio', category: 'metal-transicao', atomic_mass: 50.942, electron_configuration: '[Ar] 3d³ 4s²', group: 5, period: 4, block: 'd', discovery_year: 1801, state_at_room_temp: 'sólido', description: 'Metal dúctil usado em ligas de aço para aumentar resistência e durabilidade.' },
  { number: 24, symbol: 'Cr', name: 'Cromo', category: 'metal-transicao', atomic_mass: 51.996, electron_configuration: '[Ar] 3d⁵ 4s¹', group: 6, period: 4, block: 'd', discovery_year: 1797, state_at_room_temp: 'sólido', description: 'Metal brilhante resistente à corrosão. Usado em cromagem e aço inoxidável.' },
  { number: 25, symbol: 'Mn', name: 'Manganês', category: 'metal-transicao', atomic_mass: 54.938, electron_configuration: '[Ar] 3d⁵ 4s²', group: 7, period: 4, block: 'd', discovery_year: 1774, state_at_room_temp: 'sólido', description: 'Metal quebradiço usado na produção de aço. Importante para muitas enzimas.' },
  { number: 26, symbol: 'Fe', name: 'Ferro', category: 'metal-transicao', atomic_mass: 55.845, electron_configuration: '[Ar] 3d⁶ 4s²', group: 8, period: 4, block: 'd', discovery_year: 'Pré-histórico', state_at_room_temp: 'sólido', description: 'Metal fundamental para a civilização humana. Componente da hemoglobina no sangue.' },
  { number: 27, symbol: 'Co', name: 'Cobalto', category: 'metal-transicao', atomic_mass: 58.933, electron_configuration: '[Ar] 3d⁷ 4s²', group: 9, period: 4, block: 'd', discovery_year: 1735, state_at_room_temp: 'sólido', description: 'Metal ferromagnético usado em ligas e baterias. Essencial para vitamina B12.' },
  { number: 28, symbol: 'Ni', name: 'Níquel', category: 'metal-transicao', atomic_mass: 58.693, electron_configuration: '[Ar] 3d⁸ 4s²', group: 10, period: 4, block: 'd', discovery_year: 1751, state_at_room_temp: 'sólido', description: 'Metal resistente à corrosão. Usado em baterias, moedas e aço inoxidável.' },
  { number: 29, symbol: 'Cu', name: 'Cobre', category: 'metal-transicao', atomic_mass: 63.546, electron_configuration: '[Ar] 3d¹⁰ 4s¹', group: 11, period: 4, block: 'd', discovery_year: 'Pré-histórico', state_at_room_temp: 'sólido', description: 'Excelente condutor de eletricidade. Um dos primeiros metais usados pelos humanos.' },
  { number: 30, symbol: 'Zn', name: 'Zinco', category: 'metal-transicao', atomic_mass: 65.38, electron_configuration: '[Ar] 3d¹⁰ 4s²', group: 12, period: 4, block: 'd', discovery_year: 1746, state_at_room_temp: 'sólido', description: 'Metal usado em galvanização e suplementos nutricionais. Essencial para muitas enzimas.' },
  { number: 31, symbol: 'Ga', name: 'Gálio', category: 'metal-pos-transicao', atomic_mass: 69.723, electron_configuration: '[Ar] 3d¹⁰ 4s² 4p¹', group: 13, period: 4, block: 'p', discovery_year: 1875, state_at_room_temp: 'sólido', description: 'Metal que derrete na mão. Usado em eletrônica de alta temperatura e LEDs.' },
  { number: 32, symbol: 'Ge', name: 'Germânio', category: 'semimetal', atomic_mass: 72.630, electron_configuration: '[Ar] 3d¹⁰ 4s² 4p²', group: 14, period: 4, block: 'p', discovery_year: 1886, state_at_room_temp: 'sólido', description: 'Semicondutor usado em transistores e fibra óptica. Propriedades entre metais e não-metais.' },
  { number: 33, symbol: 'As', name: 'Arsênio', category: 'semimetal', atomic_mass: 74.922, electron_configuration: '[Ar] 3d¹⁰ 4s² 4p³', group: 15, period: 4, block: 'p', discovery_year: '13º século', state_at_room_temp: 'sólido', description: 'Semimetal tóxico usado em preservantes de madeira e semicondutores.' },
  { number: 34, symbol: 'Se', name: 'Selênio', category: 'nao-metal', atomic_mass: 78.971, electron_configuration: '[Ar] 3d¹⁰ 4s² 4p⁴', group: 16, period: 4, block: 'p', discovery_year: 1817, state_at_room_temp: 'sólido', description: 'Não-metal com propriedades fotoelétricas. Nutriente essencial em pequenas quantidades.' },
  { number: 35, symbol: 'Br', name: 'Bromo', category: 'halogenio', atomic_mass: 79.904, electron_configuration: '[Ar] 3d¹⁰ 4s² 4p⁵', group: 17, period: 4, block: 'p', discovery_year: 1826, state_at_room_temp: 'líquido', description: 'Um dos dois elementos não-metálicos líquidos à temperatura ambiente. Usado em retardantes de chama.' },
  { number: 36, symbol: 'Kr', name: 'Criptônio', category: 'gas-nobre', atomic_mass: 83.798, electron_configuration: '[Ar] 3d¹⁰ 4s² 4p⁶', group: 18, period: 4, block: 'p', discovery_year: 1898, state_at_room_temp: 'gasoso', description: 'Gás nobre usado em lâmpadas de alta intensidade e lasers.' },
  
  // Período 5
  { number: 37, symbol: 'Rb', name: 'Rubídio', category: 'metal-alcalino', atomic_mass: 85.468, electron_configuration: '[Kr] 5s¹', group: 1, period: 5, block: 's', discovery_year: 1861, state_at_room_temp: 'sólido', description: 'Metal alcalino muito reativo. Usado em células fotoelétricas e relógios atômicos.' },
  { number: 38, symbol: 'Sr', name: 'Estrôncio', category: 'metal-alcalino-terroso', atomic_mass: 87.62, electron_configuration: '[Kr] 5s²', group: 2, period: 5, block: 's', discovery_year: 1790, state_at_room_temp: 'sólido', description: 'Metal semelhante ao cálcio. Usado em fogos de artifício e tintas fosforescentes.' },
  { number: 39, symbol: 'Y', name: 'Ítrio', category: 'metal-transicao', atomic_mass: 88.906, electron_configuration: '[Kr] 4d¹ 5s²', group: 3, period: 5, block: 'd', discovery_year: 1794, state_at_room_temp: 'sólido', description: 'Metal de transição usado em LEDs e supercondutores. Componente importante em cerâmicas de alta tecnologia.' },
  { number: 40, symbol: 'Zr', name: 'Zircônio', category: 'metal-transicao', atomic_mass: 91.224, electron_configuration: '[Kr] 4d² 5s²', group: 4, period: 5, block: 'd', discovery_year: 1789, state_at_room_temp: 'sólido', description: 'Metal resistente à corrosão usado em reatores nucleares e joias.' },
  { number: 41, symbol: 'Nb', name: 'Nióbio', category: 'metal-transicao', atomic_mass: 92.906, electron_configuration: '[Kr] 4d⁴ 5s¹', group: 5, period: 5, block: 'd', discovery_year: 1801, state_at_room_temp: 'sólido', description: 'Metal dúctil resistente ao calor. Usado em aços especiais e supercondutores.' },
  { number: 42, symbol: 'Mo', name: 'Molibdênio', category: 'metal-transicao', atomic_mass: 95.95, electron_configuration: '[Kr] 4d⁵ 5s¹', group: 6, period: 5, block: 'd', discovery_year: 1778, state_at_room_temp: 'sólido', description: 'Metal com alto ponto de fusão. Usado em ligas de aço e como catalisador.' },
  { number: 43, symbol: 'Tc', name: 'Tecnécio', category: 'metal-transicao', atomic_mass: 98, electron_configuration: '[Kr] 4d⁵ 5s²', group: 7, period: 5, block: 'd', discovery_year: 1937, state_at_room_temp: 'sólido', description: 'Elemento radioativo sintético. Usado em medicina nuclear para diagnóstico por imagem.' },
  { number: 44, symbol: 'Ru', name: 'Rutênio', category: 'metal-transicao', atomic_mass: 101.07, electron_configuration: '[Kr] 4d⁷ 5s¹', group: 8, period: 5, block: 'd', discovery_year: 1844, state_at_room_temp: 'sólido', description: 'Metal do grupo da platina. Usado em contatos elétricos e catalisadores.' },
  { number: 45, symbol: 'Rh', name: 'Ródio', category: 'metal-transicao', atomic_mass: 102.91, electron_configuration: '[Kr] 4d⁸ 5s¹', group: 9, period: 5, block: 'd', discovery_year: 1803, state_at_room_temp: 'sólido', description: 'Metal nobre brilhante. Usado em conversores catalíticos automotivos.' },
  { number: 46, symbol: 'Pd', name: 'Paládio', category: 'metal-transicao', atomic_mass: 106.42, electron_configuration: '[Kr] 4d¹⁰', group: 10, period: 5, block: 'd', discovery_year: 1803, state_at_room_temp: 'sólido', description: 'Metal precioso com grande capacidade de absorver hidrogênio. Usado em conversores catalíticos.' },
  { number: 47, symbol: 'Ag', name: 'Prata', category: 'metal-transicao', atomic_mass: 107.87, electron_configuration: '[Kr] 4d¹⁰ 5s¹', group: 11, period: 5, block: 'd', discovery_year: 'Pré-histórico', state_at_room_temp: 'sólido', description: 'Metal precioso com a mais alta condutividade elétrica. Usado em joias e fotografia.' },
  { number: 48, symbol: 'Cd', name: 'Cádmio', category: 'metal-transicao', atomic_mass: 112.41, electron_configuration: '[Kr] 4d¹⁰ 5s²', group: 12, period: 5, block: 'd', discovery_year: 1817, state_at_room_temp: 'sólido', description: 'Metal tóxico usado em baterias recarregáveis e pigmentos. Semelhante ao zinco.' },
  { number: 49, symbol: 'In', name: 'Índio', category: 'metal-pos-transicao', atomic_mass: 114.82, electron_configuration: '[Kr] 4d¹⁰ 5s² 5p¹', group: 13, period: 5, block: 'p', discovery_year: 1863, state_at_room_temp: 'sólido', description: 'Metal mole que emite um "grito" quando dobrado. Usado em telas sensíveis ao toque.' },
  { number: 50, symbol: 'Sn', name: 'Estanho', category: 'metal-pos-transicao', atomic_mass: 118.71, electron_configuration: '[Kr] 4d¹⁰ 5s² 5p²', group: 14, period: 5, block: 'p', discovery_year: 'Pré-histórico', state_at_room_temp: 'sólido', description: 'Metal usado em soldas e revestimentos. Um dos primeiros metais conhecidos pela humanidade.' },
  { number: 51, symbol: 'Sb', name: 'Antimônio', category: 'semimetal', atomic_mass: 121.76, electron_configuration: '[Kr] 4d¹⁰ 5s² 5p³', group: 15, period: 5, block: 'p', discovery_year: 'Antiguidade', state_at_room_temp: 'sólido', description: 'Semimetal usado em baterias, ligas metálicas e retardantes de chama.' },
  { number: 52, symbol: 'Te', name: 'Telúrio', category: 'semimetal', atomic_mass: 127.60, electron_configuration: '[Kr] 4d¹⁰ 5s² 5p⁴', group: 16, period: 5, block: 'p', discovery_year: 1782, state_at_room_temp: 'sólido', description: 'Semimetal frágil, usado em ligas e células solares. Relacionado ao selênio e enxofre.' },
  { number: 53, symbol: 'I', name: 'Iodo', category: 'halogenio', atomic_mass: 126.90, electron_configuration: '[Kr] 4d¹⁰ 5s² 5p⁵', group: 17, period: 5, block: 'p', discovery_year: 1811, state_at_room_temp: 'sólido', description: 'Halogênio sólido à temperatura ambiente. Essencial para a função da tireoide.' },
  { number: 54, symbol: 'Xe', name: 'Xenônio', category: 'gas-nobre', atomic_mass: 131.29, electron_configuration: '[Kr] 4d¹⁰ 5s² 5p⁶', group: 18, period: 5, block: 'p', discovery_year: 1898, state_at_room_temp: 'gasoso', description: 'Gás nobre pesado usado em lâmpadas especiais e anestesia.' },
  
  // Período 6
  { number: 55, symbol: 'Cs', name: 'Césio', category: 'metal-alcalino', atomic_mass: 132.91, electron_configuration: '[Xe] 6s¹', group: 1, period: 6, block: 's', discovery_year: 1860, state_at_room_temp: 'sólido', description: 'Metal alcalino mais reativo. Base dos relógios atômicos mais precisos.' },
  { number: 56, symbol: 'Ba', name: 'Bário', category: 'metal-alcalino-terroso', atomic_mass: 137.33, electron_configuration: '[Xe] 6s²', group: 2, period: 6, block: 's', discovery_year: 1808, state_at_room_temp: 'sólido', description: 'Metal alcalino-terroso que absorve raios-X. Usado em bariagens médicas.' },
  { number: 57, symbol: 'La', name: 'Lantânio', category: 'lantanideo', atomic_mass: 138.91, electron_configuration: '[Xe] 5d¹ 6s²', group: 3, period: 6, block: 'f', discovery_year: 1839, state_at_room_temp: 'sólido', description: 'Primeiro elemento da série dos lantanídeos. Usado em baterias de hidreto metálico e óptica.' },
  { number: 58, symbol: 'Ce', name: 'Cério', category: 'lantanideo', atomic_mass: 140.12, electron_configuration: '[Xe] 4f¹ 5d¹ 6s²', group: null, period: 6, block: 'f', discovery_year: 1803, state_at_room_temp: 'sólido', description: 'Lantanídeo mais abundante. Usado em catalisadores e pedras de isqueiro.' },
  { number: 59, symbol: 'Pr', name: 'Praseodímio', category: 'lantanideo', atomic_mass: 140.91, electron_configuration: '[Xe] 4f³ 6s²', group: null, period: 6, block: 'f', discovery_year: 1885, state_at_room_temp: 'sólido', description: 'Lantanídeo usado em ímãs fortes e vidros especiais para óculos de proteção.' },
  { number: 60, symbol: 'Nd', name: 'Neodímio', category: 'lantanideo', atomic_mass: 144.24, electron_configuration: '[Xe] 4f⁴ 6s²', group: null, period: 6, block: 'f', discovery_year: 1885, state_at_room_temp: 'sólido', description: 'Lantanídeo usado na fabricação dos ímãs permanentes mais fortes conhecidos.' },
  { number: 61, symbol: 'Pm', name: 'Promécio', category: 'lantanideo', atomic_mass: 145, electron_configuration: '[Xe] 4f⁵ 6s²', group: null, period: 6, block: 'f', discovery_year: 1945, state_at_room_temp: 'sólido', description: 'Elemento radioativo sintético. Usado em baterias nucleares miniaturizadas.' },
  { number: 62, symbol: 'Sm', name: 'Samário', category: 'lantanideo', atomic_mass: 150.36, electron_configuration: '[Xe] 4f⁶ 6s²', group: null, period: 6, block: 'f', discovery_year: 1879, state_at_room_temp: 'sólido', description: 'Lantanídeo usado em ímãs, lasers e controle de reatores nucleares.' },
  { number: 63, symbol: 'Eu', name: 'Európio', category: 'lantanideo', atomic_mass: 151.96, electron_configuration: '[Xe] 4f⁷ 6s²', group: null, period: 6, block: 'f', discovery_year: 1901, state_at_room_temp: 'sólido', description: 'Lantanídeo altamente reativo. Usado em telas de TV e iluminação fluorescente.' },
  { number: 64, symbol: 'Gd', name: 'Gadolínio', category: 'lantanideo', atomic_mass: 157.25, electron_configuration: '[Xe] 4f⁷ 5d¹ 6s²', group: null, period: 6, block: 'f', discovery_year: 1880, state_at_room_temp: 'sólido', description: 'Lantanídeo ferromagnético à temperatura ambiente. Usado em agentes de contraste para ressonância magnética.' },
  { number: 65, symbol: 'Tb', name: 'Térbio', category: 'lantanideo', atomic_mass: 158.93, electron_configuration: '[Xe] 4f⁹ 6s²', group: null, period: 6, block: 'f', discovery_year: 1843, state_at_room_temp: 'sólido', description: 'Lantanídeo usado em telas de alta tecnologia e lâmpadas de baixo consumo.' },
  { number: 66, symbol: 'Dy', name: 'Disprósio', category: 'lantanideo', atomic_mass: 162.50, electron_configuration: '[Xe] 4f¹⁰ 6s²', group: null, period: 6, block: 'f', discovery_year: 1886, state_at_room_temp: 'sólido', description: 'Lantanídeo com fortes propriedades magnéticas. Usado em discos rígidos e veículos híbridos.' },
  { number: 67, symbol: 'Ho', name: 'Hólmio', category: 'lantanideo', atomic_mass: 164.93, electron_configuration: '[Xe] 4f¹¹ 6s²', group: null, period: 6, block: 'f', discovery_year: 1878, state_at_room_temp: 'sólido', description: 'Lantanídeo com o magnetismo mais forte entre os elementos naturais. Usado em lasers médicos.' },
  { number: 68, symbol: 'Er', name: 'Érbio', category: 'lantanideo', atomic_mass: 167.26, electron_configuration: '[Xe] 4f¹² 6s²', group: null, period: 6, block: 'f', discovery_year: 1842, state_at_room_temp: 'sólido', description: 'Lantanídeo usado em fibras ópticas e lasers para cirurgia dermatológica.' },
  { number: 69, symbol: 'Tm', name: 'Túlio', category: 'lantanideo', atomic_mass: 168.93, electron_configuration: '[Xe] 4f¹³ 6s²', group: null, period: 6, block: 'f', discovery_year: 1879, state_at_room_temp: 'sólido', description: 'Lantanídeo raro usado em equipamentos de raios-X portáteis e lasers médicos.' },
  { number: 70, symbol: 'Yb', name: 'Itérbio', category: 'lantanideo', atomic_mass: 173.05, electron_configuration: '[Xe] 4f¹⁴ 6s²', group: null, period: 6, block: 'f', discovery_year: 1878, state_at_room_temp: 'sólido', description: 'Lantanídeo usado em relógios atômicos e aços especiais. Tem propriedades semelhantes ao cálcio.' },
  { number: 71, symbol: 'Lu', name: 'Lutécio', category: 'lantanideo', atomic_mass: 174.97, electron_configuration: '[Xe] 4f¹⁴ 5d¹ 6s²', group: 3, period: 6, block: 'd', discovery_year: 1907, state_at_room_temp: 'sólido', description: 'Último elemento da série dos lantanídeos. Usado em catalisadores para refinarias de petróleo.' },
  { number: 72, symbol: 'Hf', name: 'Háfnio', category: 'metal-transicao', atomic_mass: 178.49, electron_configuration: '[Xe] 4f¹⁴ 5d² 6s²', group: 4, period: 6, block: 'd', discovery_year: 1923, state_at_room_temp: 'sólido', description: 'Metal de transição resistente à corrosão. Usado em reatores nucleares e ligas de alta temperatura.' },
  { number: 73, symbol: 'Ta', name: 'Tântalo', category: 'metal-transicao', atomic_mass: 180.95, electron_configuration: '[Xe] 4f¹⁴ 5d³ 6s²', group: 5, period: 6, block: 'd', discovery_year: 1802, state_at_room_temp: 'sólido', description: 'Metal altamente resistente à corrosão. Usado em implantes médicos e capacitores eletrônicos.' },
  { number: 74, symbol: 'W', name: 'Tungstênio', category: 'metal-transicao', atomic_mass: 183.84, electron_configuration: '[Xe] 4f¹⁴ 5d⁴ 6s²', group: 6, period: 6, block: 'd', discovery_year: 1783, state_at_room_temp: 'sólido', description: 'Metal com o ponto de fusão mais alto. Usado em filamentos de lâmpadas e ferramentas de corte.' },
  { number: 75, symbol: 'Re', name: 'Rênio', category: 'metal-transicao', atomic_mass: 186.21, electron_configuration: '[Xe] 4f¹⁴ 5d⁵ 6s²', group: 7, period: 6, block: 'd', discovery_year: 1925, state_at_room_temp: 'sólido', description: 'Metal raro com alto ponto de fusão. Usado em motores a jato e catalisadores.' },
  { number: 76, symbol: 'Os', name: 'Ósmio', category: 'metal-transicao', atomic_mass: 190.23, electron_configuration: '[Xe] 4f¹⁴ 5d⁶ 6s²', group: 8, period: 6, block: 'd', discovery_year: 1803, state_at_room_temp: 'sólido', description: 'Metal mais denso conhecido. Usado em contatos elétricos e pontas de canetas-tinteiro.' },
  { number: 77, symbol: 'Ir', name: 'Irídio', category: 'metal-transicao', atomic_mass: 192.22, electron_configuration: '[Xe] 4f¹⁴ 5d⁷ 6s²', group: 9, period: 6, block: 'd', discovery_year: 1803, state_at_room_temp: 'sólido', description: 'Metal extremamente duro e resistente à corrosão. Associado à extinção dos dinossauros.' },
  { number: 78, symbol: 'Pt', name: 'Platina', category: 'metal-transicao', atomic_mass: 195.08, electron_configuration: '[Xe] 4f¹⁴ 5d⁹ 6s¹', group: 10, period: 6, block: 'd', discovery_year: 'Pré-colombiano', state_at_room_temp: 'sólido', description: 'Metal precioso resistente à corrosão. Usado em catalisadores automotivos e joalheria.' },
  { number: 79, symbol: 'Au', name: 'Ouro', category: 'metal-transicao', atomic_mass: 196.97, electron_configuration: '[Xe] 4f¹⁴ 5d¹⁰ 6s¹', group: 11, period: 6, block: 'd', discovery_year: 'Pré-histórico', state_at_room_temp: 'sólido', description: 'Metal precioso extremamente maleável e resistente à corrosão. Usado em eletrônica e reserva monetária.' },
  { number: 80, symbol: 'Hg', name: 'Mercúrio', category: 'metal-transicao', atomic_mass: 200.59, electron_configuration: '[Xe] 4f¹⁴ 5d¹⁰ 6s²', group: 12, period: 6, block: 'd', discovery_year: 'Pré-histórico', state_at_room_temp: 'líquido', description: 'Único metal líquido à temperatura ambiente. Tóxico e usado em instrumentos científicos.' },
  { number: 81, symbol: 'Tl', name: 'Tálio', category: 'metal-pos-transicao', atomic_mass: 204.38, electron_configuration: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p¹', group: 13, period: 6, block: 'p', discovery_year: 1861, state_at_room_temp: 'sólido', description: 'Metal tóxico usado em detectores de raios gama e interruptores de baixa temperatura.' },
  { number: 82, symbol: 'Pb', name: 'Chumbo', category: 'metal-pos-transicao', atomic_mass: 207.2, electron_configuration: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²', group: 14, period: 6, block: 'p', discovery_year: 'Pré-histórico', state_at_room_temp: 'sólido', description: 'Metal denso usado em baterias. Tóxico para humanos, especialmente para o sistema nervoso.' },
  { number: 83, symbol: 'Bi', name: 'Bismuto', category: 'metal-pos-transicao', atomic_mass: 208.98, electron_configuration: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p³', group: 15, period: 6, block: 'p', discovery_year: 'Medieval', state_at_room_temp: 'sólido', description: 'Metal com baixa toxicidade. Usado em cosméticos, medicamentos e ligas de baixo ponto de fusão.' },
  { number: 84, symbol: 'Po', name: 'Polônio', category: 'metal-pos-transicao', atomic_mass: 209, electron_configuration: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁴', group: 16, period: 6, block: 'p', discovery_year: 1898, state_at_room_temp: 'sólido', description: 'Elemento radioativo raro e extremamente tóxico. Utilizado em fontes de calor para sondas espaciais.' },
  { number: 85, symbol: 'At', name: 'Astato', category: 'halogenio', atomic_mass: 210, electron_configuration: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁵', group: 17, period: 6, block: 'p', discovery_year: 1940, state_at_room_temp: 'sólido', description: 'Elemento radioativo extremamente raro. O halogênio mais raro da Terra.' },
  { number: 86, symbol: 'Rn', name: 'Radônio', category: 'gas-nobre', atomic_mass: 222, electron_configuration: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶', group: 18, period: 6, block: 'p', discovery_year: 1900, state_at_room_temp: 'gasoso', description: 'Gás nobre radioativo. Pode acumular-se em porões e causar câncer de pulmão.' },
  
  // Período 7
  { number: 87, symbol: 'Fr', name: 'Frâncio', category: 'metal-alcalino', atomic_mass: 223, electron_configuration: '[Rn] 7s¹', group: 1, period: 7, block: 's', discovery_year: 1939, state_at_room_temp: 'sólido', description: 'Metal alcalino radioativo extremamente raro. O elemento natural mais raro da Terra.' },
  { number: 88, symbol: 'Ra', name: 'Rádio', category: 'metal-alcalino-terroso', atomic_mass: 226, electron_configuration: '[Rn] 7s²', group: 2, period: 7, block: 's', discovery_year: 1898, state_at_room_temp: 'sólido', description: 'Metal radioativo que emite luz azul no escuro. Anteriormente usado em tintas luminosas.' },
  { number: 89, symbol: 'Ac', name: 'Actínio', category: 'actinideo', atomic_mass: 227, electron_configuration: '[Rn] 6d¹ 7s²', group: 3, period: 7, block: 'f', discovery_year: 1899, state_at_room_temp: 'sólido', description: 'Elemento radioativo que dá nome à série dos actinídeos. Brilha no escuro com luz azul.' },
  { number: 90, symbol: 'Th', name: 'Tório', category: 'actinideo', atomic_mass: 232.04, electron_configuration: '[Rn] 6d² 7s²', group: null, period: 7, block: 'f', discovery_year: 1829, state_at_room_temp: 'sólido', description: 'Metal radioativo usado como combustível alternativo em reatores nucleares.' },
  { number: 91, symbol: 'Pa', name: 'Protactínio', category: 'actinideo', atomic_mass: 231.04, electron_configuration: '[Rn] 5f² 6d¹ 7s²', group: null, period: 7, block: 'f', discovery_year: 1913, state_at_room_temp: 'sólido', description: 'Elemento radioativo raro. Subproduto do decaimento do urânio e tório.' },
  { number: 92, symbol: 'U', name: 'Urânio', category: 'actinideo', atomic_mass: 238.03, electron_configuration: '[Rn] 5f³ 6d¹ 7s²', group: null, period: 7, block: 'f', discovery_year: 1789, state_at_room_temp: 'sólido', description: 'Elemento radioativo usado para geração de energia nuclear e armas.' },
  { number: 93, symbol: 'Np', name: 'Neptúnio', category: 'actinideo', atomic_mass: 237, electron_configuration: '[Rn] 5f⁴ 6d¹ 7s²', group: null, period: 7, block: 'f', discovery_year: 1940, state_at_room_temp: 'sólido', description: 'Primeiro elemento transurânico a ser sintetizado. Subproduto de reatores nucleares.' },
  { number: 94, symbol: 'Pu', name: 'Plutônio', category: 'actinideo', atomic_mass: 244, electron_configuration: '[Rn] 5f⁶ 7s²', group: null, period: 7, block: 'f', discovery_year: 1940, state_at_room_temp: 'sólido', description: 'Elemento radioativo usado em armas nucleares e sondas espaciais.' },
  { number: 95, symbol: 'Am', name: 'Amerício', category: 'actinideo', atomic_mass: 243, electron_configuration: '[Rn] 5f⁷ 7s²', group: null, period: 7, block: 'f', discovery_year: 1944, state_at_room_temp: 'sólido', description: 'Elemento radioativo usado em detectores de fumaça e medição de espessura.' },
  { number: 96, symbol: 'Cm', name: 'Cúrio', category: 'actinideo', atomic_mass: 247, electron_configuration: '[Rn] 5f⁷ 6d¹ 7s²', group: null, period: 7, block: 'f', discovery_year: 1944, state_at_room_temp: 'sólido', description: 'Elemento radioativo com alta emissão de radiação e calor. Usado em geradores termoelétricos.' },
  { number: 97, symbol: 'Bk', name: 'Berquélio', category: 'actinideo', atomic_mass: 247, electron_configuration: '[Rn] 5f⁹ 7s²', group: null, period: 7, block: 'f', discovery_year: 1949, state_at_room_temp: 'sólido', description: 'Elemento sintético radioativo com poucos usos práticos além da pesquisa científica.' },
  { number: 98, symbol: 'Cf', name: 'Califórnio', category: 'actinideo', atomic_mass: 251, electron_configuration: '[Rn] 5f¹⁰ 7s²', group: null, period: 7, block: 'f', discovery_year: 1950, state_at_room_temp: 'sólido', description: 'Elemento radioativo usado como fonte de nêutrons para detecção de ouro e prata em minérios.' },
  { number: 99, symbol: 'Es', name: 'Einstênio', category: 'actinideo', atomic_mass: 252, electron_configuration: '[Rn] 5f¹¹ 7s²', group: null, period: 7, block: 'f', discovery_year: 1952, state_at_room_temp: 'sólido', description: 'Elemento sintético radioativo criado nos resíduos da primeira bomba de hidrogênio.' },
  { number: 100, symbol: 'Fm', name: 'Férmio', category: 'actinideo', atomic_mass: 257, electron_configuration: '[Rn] 5f¹² 7s²', group: null, period: 7, block: 'f', discovery_year: 1952, state_at_room_temp: 'sólido', description: 'Elemento radioativo sintético com meia-vida curta. Descoberto em resíduos de teste nuclear.' },
  { number: 101, symbol: 'Md', name: 'Mendelévio', category: 'actinideo', atomic_mass: 258, electron_configuration: '[Rn] 5f¹³ 7s²', group: null, period: 7, block: 'f', discovery_year: 1955, state_at_room_temp: 'sólido', description: 'Elemento sintético radioativo. Primeiro elemento criado átomo por átomo.' },
  { number: 102, symbol: 'No', name: 'Nobélio', category: 'actinideo', atomic_mass: 259, electron_configuration: '[Rn] 5f¹⁴ 7s²', group: null, period: 7, block: 'f', discovery_year: 1958, state_at_room_temp: 'sólido', description: 'Elemento radioativo sintético extremamente instável. Nomeado em homenagem a Alfred Nobel.' },
  { number: 103, symbol: 'Lr', name: 'Laurêncio', category: 'actinideo', atomic_mass: 266, electron_configuration: '[Rn] 5f¹⁴ 7s² 7p¹', group: 3, period: 7, block: 'd', discovery_year: 1961, state_at_room_temp: 'sólido', description: 'Último elemento da série dos actinídeos. Extremamente radioativo e de vida curta.' },
  { number: 104, symbol: 'Rf', name: 'Rutherfórdio', category: 'metal-transicao', atomic_mass: 267, electron_configuration: '[Rn] 5f¹⁴ 6d² 7s²', group: 4, period: 7, block: 'd', discovery_year: 1964, state_at_room_temp: 'sólido', description: 'Primeiro elemento transactinídeo. Altamente instável e radioativo.' },
  { number: 105, symbol: 'Db', name: 'Dúbnio', category: 'metal-transicao', atomic_mass: 268, electron_configuration: '[Rn] 5f¹⁴ 6d³ 7s²', group: 5, period: 7, block: 'd', discovery_year: 1967, state_at_room_temp: 'sólido', description: 'Elemento sintético de vida curta. Nomeado em homenagem à cidade russa de Dubna.' },
  { number: 106, symbol: 'Sg', name: 'Seabórgio', category: 'metal-transicao', atomic_mass: 269, electron_configuration: '[Rn] 5f¹⁴ 6d⁴ 7s²', group: 6, period: 7, block: 'd', discovery_year: 1974, state_at_room_temp: 'sólido', description: 'Elemento sintético criado por bombardeamento de íons pesados. Nomeado em homenagem a Glenn Seaborg.' },
  { number: 107, symbol: 'Bh', name: 'Bóhrio', category: 'metal-transicao', atomic_mass: 270, electron_configuration: '[Rn] 5f¹⁴ 6d⁵ 7s²', group: 7, period: 7, block: 'd', discovery_year: 1981, state_at_room_temp: 'sólido', description: 'Elemento sintético de vida extremamente curta. Nomeado em homenagem a Niels Bohr.' },
  { number: 108, symbol: 'Hs', name: 'Hássio', category: 'metal-transicao', atomic_mass: 269, electron_configuration: '[Rn] 5f¹⁴ 6d⁶ 7s²', group: 8, period: 7, block: 'd', discovery_year: 1984, state_at_room_temp: 'sólido', description: 'Elemento sintético instável. Nomeado em homenagem ao estado alemão de Hesse.' },
  { number: 109, symbol: 'Mt', name: 'Meitnério', category: 'metal-transicao', atomic_mass: 278, electron_configuration: '[Rn] 5f¹⁴ 6d⁷ 7s²', group: 9, period: 7, block: 'd', discovery_year: 1982, state_at_room_temp: 'sólido', description: 'Elemento sintético de vida muito curta. Nomeado em homenagem a Lise Meitner.' },
  { number: 110, symbol: 'Ds', name: 'Darmstádtio', category: 'metal-transicao', atomic_mass: 281, electron_configuration: '[Rn] 5f¹⁴ 6d⁸ 7s²', group: 10, period: 7, block: 'd', discovery_year: 1994, state_at_room_temp: 'sólido', description: 'Elemento sintético instável. Nomeado em homenagem à cidade alemã de Darmstadt.' },
  { number: 111, symbol: 'Rg', name: 'Roentgênio', category: 'metal-transicao', atomic_mass: 282, electron_configuration: '[Rn] 5f¹⁴ 6d⁹ 7s²', group: 11, period: 7, block: 'd', discovery_year: 1994, state_at_room_temp: 'sólido', description: 'Elemento sintético radioativo. Nomeado em homenagem a Wilhelm Röntgen.' },
  { number: 112, symbol: 'Cn', name: 'Copernício', category: 'metal-transicao', atomic_mass: 285, electron_configuration: '[Rn] 5f¹⁴ 6d¹⁰ 7s²', group: 12, period: 7, block: 'd', discovery_year: 1996, state_at_room_temp: 'sólido', description: 'Elemento sintético instável. Nomeado em homenagem a Nicolau Copérnico.' },
  { number: 113, symbol: 'Nh', name: 'Nihônio', category: 'metal-pos-transicao', atomic_mass: 286, electron_configuration: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p¹', group: 13, period: 7, block: 'p', discovery_year: 2003, state_at_room_temp: 'sólido', description: 'Elemento sintético extremamente instável. Nomeado em homenagem ao Japão (Nihon).' },
  { number: 114, symbol: 'Fl', name: 'Fleróvio', category: 'metal-pos-transicao', atomic_mass: 289, electron_configuration: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p²', group: 14, period: 7, block: 'p', discovery_year: 1998, state_at_room_temp: 'sólido', description: 'Elemento sintético. Nomeado em homenagem ao laboratório Flerov na Rússia.' },
  { number: 115, symbol: 'Mc', name: 'Moscóvio', category: 'metal-pos-transicao', atomic_mass: 290, electron_configuration: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p³', group: 15, period: 7, block: 'p', discovery_year: 2003, state_at_room_temp: 'sólido', description: 'Elemento sintético de vida curta. Nomeado em homenagem à região de Moscou.' },
  { number: 116, symbol: 'Lv', name: 'Livermório', category: 'metal-pos-transicao', atomic_mass: 293, electron_configuration: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁴', group: 16, period: 7, block: 'p', discovery_year: 2000, state_at_room_temp: 'sólido', description: 'Elemento sintético. Nomeado em homenagem ao Laboratório Lawrence Livermore.' },
  { number: 117, symbol: 'Ts', name: 'Tennesso', category: 'halogenio', atomic_mass: 294, electron_configuration: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁵', group: 17, period: 7, block: 'p', discovery_year: 2010, state_at_room_temp: 'sólido', description: 'Elemento sintético extremamente radioativo. Nomeado em homenagem ao estado do Tennessee.' },
  { number: 118, symbol: 'Og', name: 'Oganessônio', category: 'gas-nobre', atomic_mass: 294, electron_configuration: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁶', group: 18, period: 7, block: 'p', discovery_year: 2002, state_at_room_temp: 'sólido', description: 'Elemento sintético mais pesado confirmado até hoje. Nomeado em homenagem a Yuri Oganessian.' }
];

// Cria uma grade para posicionar os elementos na tabela periódica
const createPeriodicTableGrid = () => {
  // Cria um array 2D com 10 períodos e 18 grupos
  const grid = Array(10).fill().map(() => Array(18).fill(null));
  
  // Posiciona cada elemento na grade
  elementsData.forEach(element => {
    let period = element.period - 1;
    let group = element.group - 1;
    
    grid[period][group] = element;
  });
  
  return grid;
};

// Componente para exibir um único elemento na tabela periódica
const Element = ({ element, onClick }) => {
  if (!element) return <div className="element-placeholder"></div>;
  
  return (
    <div 
      className={`element ${element.category}`} 
      onClick={() => onClick(element)}
      style={{ backgroundColor: ELEMENT_CATEGORIES[element.category] }}
    >
      <div className="element-number">{element.number}</div>
      <div className="element-symbol">{element.symbol}</div>
      <div className="element-name">{element.name}</div>
      <div className="element-mass">{element.atomic_mass.toFixed(2)}</div>
    </div>
  );
};

// Componente para exibir detalhes do elemento selecionado
const ElementDetails = ({ element, onClose }) => {
  
  // Estado para controlar a aba ativa
  const [activeTab, setActiveTab] = useState('basic');

  if (!element) return null;
  
  // Função para obter a animação orbital baseada na configuração eletrônica
  const getOrbitalAnimation = (config) => {
    // Remove a notação de gás nobre (e.g., [He]) e divide pelos espaços
    const shells = config.replace(/\[.*?\]\s*/, '').split(' ');
    return shells.length;
  };
  
  const orbitalLevels = getOrbitalAnimation(element.electron_configuration);
  
  return (
    <div className="element-details-overlay">
      <div className="element-details" style={{ borderColor: ELEMENT_CATEGORIES[element.category] }}>
        <div className="details-header" style={{ backgroundColor: ELEMENT_CATEGORIES[element.category] }}>
          <div className="details-symbol">{element.symbol}</div>
          <div className="details-info">
            <h2>{element.name}</h2>
            <p>Número Atômico: {element.number}</p>
          </div>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="details-tabs">
          <button 
            className={activeTab === 'basic' ? 'active' : ''} 
            onClick={() => setActiveTab('basic')}
          >
            Básico
          </button>
          <button 
            className={activeTab === 'atomic' ? 'active' : ''} 
            onClick={() => setActiveTab('atomic')}
          >
            Estrutura Atômica
          </button>
          <button 
            className={activeTab === 'properties' ? 'active' : ''} 
            onClick={() => setActiveTab('properties')}
          >
            Propriedades
          </button>
        </div>
        
        <div className="details-content">
          {activeTab === 'basic' && (
            <div className="basic-info">
              <div className="orbital-animation">
                {/* Representação visual do núcleo e camadas eletrônicas */}
                <div className="nucleus"></div>
                {[...Array(orbitalLevels)].map((_, i) => (
                  <div 
                    key={i} 
                    className="electron-shell" 
                    style={{ 
                      width: `${(i+1) * 40}px`, 
                      height: `${(i+1) * 40}px`,
                      animationDuration: `${3 + i * 2}s`
                    }}
                  >
                    <div className="electron" />
                  </div>
                ))}
              </div>
              <div className="basic-text">
                <p><strong>Categoria:</strong> {element.category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
                <p><strong>Massa Atômica:</strong> {element.atomic_mass.toFixed(4)} u</p>
                <p><strong>Grupo:</strong> {element.group}</p>
                <p><strong>Período:</strong> {element.period}</p>
                <p><strong>Bloco:</strong> {element.block.toUpperCase()}</p>
                <p><strong>Estado à temperatura ambiente:</strong> {element.state_at_room_temp}</p>
                <p><strong>Descoberto em:</strong> {element.discovery_year}</p>
                <p className="element-description">{element.description}</p>
              </div>
            </div>
          )}
          
          {activeTab === 'atomic' && (
            <div className="atomic-structure">
              <div className="electron-config">
                <h3>Configuração Eletrônica</h3>
                <p>{element.electron_configuration}</p>
                
                <div className="electron-diagram">
                  {/* Visualização de Bohr interativa */}
                  <div className="bohr-model">
                    <div className="nucleus-3d"></div>
                    {[...Array(orbitalLevels)].map((_, i) => (
                      <div 
                        key={i} 
                        className="orbital-3d" 
                        style={{ 
                          width: `${(i+1) * 50}px`, 
                          height: `${(i+1) * 50}px`,
                          animationDuration: `${4 + i}s`,
                          animationDelay: `${i * 0.2}s`
                        }}
                      >
                        {[...Array(i+1)].map((_, j) => (
                          <div 
                            key={j} 
                            className="electron-3d"
                            style={{
                              transform: `rotate(${j * (360/(i+1))}deg) translateX(${(i+1) * 25}px)`,
                              animationDuration: `${2 + i * 0.5}s`,
                              animationDelay: `${j * 0.1}s`
                            }}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'properties' && (
            <div className="properties-info">
              <h3>Propriedades Físicas</h3>
              <div className="property-visualization">
                <div className="property">
                  <span>Estado:</span>
                  <div className={`state-indicator ${element.state_at_room_temp}`}>
                    {element.state_at_room_temp}
                  </div>
                </div>
                
                <div className="property">
                  <span>Reatividade:</span>
                  <div className="reactivity-meter">
                    <div 
                      className="reactivity-level"
                      style={{ 
                        width: element.category === 'gas-nobre' ? '10%' :
                               element.category === 'metal-alcalino' ? '90%' :
                               element.category === 'halogenio' ? '85%' :
                               element.category === 'nao-metal' ? '70%' :
                               element.category === 'metal-alcalino-terroso' ? '75%' :
                               '50%'
                      }}
                    ></div>
                  </div>
                </div>
                
                <div className="property">
                  <span>Abundância na Terra:</span>
                  <div className="abundance-visualization">
                    {/* Visualização simplificada de abundância */}
                    {[...Array(10)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`abundance-unit ${
                          // Elementos mais abundantes na crosta terrestre
                          (element.symbol === 'O' && i < 10) || // Oxigênio (46.6%)
                          (element.symbol === 'Si' && i < 8) || // Silício (27.7%)
                          (element.symbol === 'Al' && i < 7) || // Alumínio (8.1%)
                          (element.symbol === 'Fe' && i < 6) || // Ferro (5.0%)
                          (element.symbol === 'Ca' && i < 5) || // Cálcio (3.6%)
                          (element.symbol === 'Na' && i < 4) || // Sódio (2.8%)
                          (element.symbol === 'K' && i < 4) || // Potássio (2.6%)
                          (element.symbol === 'Mg' && i < 5) || // Magnésio (2.1%)
                          (element.symbol === 'Ti' && i < 3) || // Titânio (0.44%)
                          (element.symbol === 'H' && i < 3) || // Hidrogênio (0.14%)
                          (element.symbol === 'P' && i < 3) || // Fósforo (0.12%)
                          (element.symbol === 'Mn' && i < 2) || // Manganês (0.10%)
                          (element.symbol === 'F' && i < 2) || // Flúor (0.08%)
                          (element.symbol === 'Ba' && i < 2) || // Bário (0.04%)
                          (element.symbol === 'Sr' && i < 2) || // Estrôncio (0.04%)
                          (element.symbol === 'S' && i < 2) || // Enxofre (0.03%)
                          (element.symbol === 'C' && i < 2) || // Carbono (0.02%)
                          (element.symbol === 'Zr' && i < 2) || // Zircônio (0.02%)
                          (element.symbol === 'V' && i < 2) || // Vanádio (0.02%)
                          (element.symbol === 'Cl' && i < 2) || // Cloro (0.02%)
                          (element.symbol === 'Cr' && i < 2) || // Cromo (0.01%)
                          (element.symbol === 'Rb' && i < 1) || // Rubídio (0.006%)
                          (element.symbol === 'Ni' && i < 1) || // Níquel (0.006%)
                          (element.symbol === 'Zn' && i < 1) || // Zinco (0.005%)
                          (element.symbol === 'Ce' && i < 1) || // Cério (0.005%)
                          (element.symbol === 'Cu' && i < 1) || // Cobre (0.005%)
                          (element.symbol === 'Nd' && i < 1) || // Neodímio (0.003%)
                          (element.symbol === 'La' && i < 1) || // Lantânio (0.003%)
                          (element.symbol === 'Y' && i < 1) || // Ítrio (0.003%)
                          (element.symbol === 'Co' && i < 1) || // Cobalto (0.002%)
                          (element.symbol === 'Sc' && i < 1) || // Escândio (0.002%)
                          (element.symbol === 'Li' && i < 1) || // Lítio (0.002%)
                          (element.symbol === 'N' && i < 1) || // Nitrogênio (0.002%)
                          (element.symbol === 'Nb' && i < 1) || // Nióbio (0.002%)
                          (element.symbol === 'Ga' && i < 1) || // Gálio (0.002%)
                          (element.symbol === 'Pb' && i < 1) || // Chumbo (0.001%)
                          (element.symbol === 'B' && i < 1) || // Boro (0.001%)
                          (element.symbol === 'Pr' && i < 1) || // Praseodímio (0.0008%)
                          (element.symbol === 'Sm' && i < 1) || // Samário (0.0006%)
                          (element.symbol === 'Gd' && i < 1) || // Gadolínio (0.0006%)
                          (element.symbol === 'Dy' && i < 1) || // Disprósio (0.0005%)
                          (element.symbol === 'Er' && i < 1) || // Érbio (0.0004%)
                          (element.symbol === 'Yb' && i < 1) || // Itérbio (0.0003%)
                          (element.symbol === 'Hf' && i < 1) || // Háfnio (0.0003%)
                          (element.symbol === 'Cs' && i < 1) || // Césio (0.0003%)
                          (element.symbol === 'Be' && i < 1) || // Berílio (0.0003%)
                          (element.symbol === 'U' && i < 1) || // Urânio (0.0003%)
                          (element.symbol === 'Sn' && i < 1) || // Estanho (0.0002%)
                          (element.symbol === 'As' && i < 1) || // Arsênio (0.0002%)
                          (element.symbol === 'Mo' && i < 1) || // Molibdênio (0.0001%)

                          // Elementos traços e muito raros (menos de 0.0001%)
                          (element.symbol === 'W' && i < 0) || // Tungstênio
                          (element.symbol === 'Cd' && i < 0) || // Cádmio
                          (element.symbol === 'Sb' && i < 0) || // Antimônio
                          (element.symbol === 'Bi' && i < 0) || // Bismuto
                          (element.symbol === 'Hg' && i < 0) || // Mercúrio
                          (element.symbol === 'Ag' && i < 0) || // Prata
                          (element.symbol === 'Se' && i < 0) || // Selênio
                          (element.symbol === 'I' && i < 0) || // Iodo
                          (element.symbol === 'Au' && i < 0) || // Ouro
                          (element.symbol === 'Pt' && i < 0) || // Platina

                          // Gases nobres e elementos artificiais
                          (element.symbol === 'He' && i < 1) || // Hélio (presente na atmosfera)
                          (element.symbol === 'Ne' && i < 0) || // Neônio
                          (element.symbol === 'Ar' && i < 2) || // Argônio (mais abundante na atmosfera)
                          (element.symbol === 'Kr' && i < 0) || // Criptônio
                          (element.symbol === 'Xe' && i < 0) || // Xenônio
                          (element.symbol === 'Rn' && i < 0) || // Radônio

                          // Elementos radioativos naturais
                          (element.symbol === 'Th' && i < 1) || // Tório (0.0006%)
                          (element.symbol === 'Ra' && i < 0) || // Rádio
                          (element.symbol === 'Pa' && i < 0) || // Protactínio

                          // Todos os elementos sintéticos (transurânicos e alguns outros)
                          // são considerados com abundância zero
                          ((element.number > 92 || 
                            ['Tc', 'Pm', 'Po', 'At', 'Fr', 'Np', 'Pu', 'Am', 'Cm', 'Bk', 'Cf', 'Es', 
                            'Fm', 'Md', 'No', 'Lr', 'Rf', 'Db', 'Sg', 'Bh', 'Hs', 'Mt', 'Ds', 'Rg', 
                            'Cn', 'Nh', 'Fl', 'Mc', 'Lv', 'Ts', 'Og'].includes(element.symbol)) && i < 0) ||

                          // Os demais elementos com baixíssima abundância recebem um valor mínimo
                          i < 0 ? 'active' : ''
                          }`}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
              
              <h3>Aplicações</h3>
              <div className="applications">
                {/* Aplicações dinâmicas baseadas no elemento */}
                {element.symbol === 'H' && (
                  <div className="application-item">
                    <div className="application-icon energy"></div>
                    <span>Combustível de Fusão</span>
                  </div>
                )}
                {(element.symbol === 'O' || element.symbol === 'N') && (
                  <div className="application-item">
                    <div className="application-icon atmosphere"></div>
                    <span>Componente Atmosférico</span>
                  </div>
                )}
                {(element.category === 'metal-transicao' || element.category === 'metal-pos-transicao') && (
                  <div className="application-item">
                    <div className="application-icon industrial"></div>
                    <span>Uso Industrial</span>
                  </div>
                )}
                {(element.symbol === 'Si' || element.symbol === 'Ge') && (
                  <div className="application-item">
                    <div className="application-icon electronics"></div>
                    <span>Eletrônica</span>
                  </div>
                )}
                {(element.symbol === 'Au' || element.symbol === 'Ag' || element.symbol === 'Pt') && (
                  <div className="application-item">
                    <div className="application-icon jewelry"></div>
                    <span>Joalheria</span>
                  </div>
                )}
                {(element.symbol === 'U' || element.symbol === 'Pu') && (
                  <div className="application-item">
                    <div className="application-icon nuclear"></div>
                    <span>Energia Nuclear</span>
                  </div>
                )}
                {(element.symbol === 'Na' || element.symbol === 'Cl' || element.symbol === 'K' || element.symbol === 'Ca') && (
                  <div className="application-item">
                    <div className="application-icon biological"></div>
                    <span>Função Biológica</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Componente de legenda para as categorias
const CategoryLegend = () => {
  const categories = [
    { id: 'metal-alcalino', name: 'Metais Alcalinos' },
    { id: 'metal-alcalino-terroso', name: 'Metais Alcalino-Terrosos' },
    { id: 'metal-transicao', name: 'Metais de Transição' },
    { id: 'metal-pos-transicao', name: 'Metais Pós-Transição' },
    { id: 'semimetal', name: 'Semimetais' },
    { id: 'nao-metal', name: 'Não Metais' },
    { id: 'halogenio', name: 'Halogênios' },
    { id: 'gas-nobre', name: 'Gases Nobres' },
    { id: 'lantanideo', name: 'Lantanídeos' },
    { id: 'actinideo', name: 'Actinídeos' }
  ];
  
  return (
    <div className="category-legend">
      {categories.map(category => (
        <div key={category.id} className="legend-item">
          <div 
            className="legend-color" 
            style={{ backgroundColor: ELEMENT_CATEGORIES[category.id] }}
          ></div>
          <span>{category.name}</span>
        </div>
      ))}
    </div>
  );
};

// Componente de filtro para a tabela periódica
const FilterControls = ({ onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };
  
  return (
    <div className="filter-controls">
      <button 
        className={activeFilter === 'all' ? 'active' : ''} 
        onClick={() => handleFilterClick('all')}
      >
        Todos
      </button>
      <button 
        className={activeFilter === 'metais' ? 'active' : ''} 
        onClick={() => handleFilterClick('metais')}
      >
        Metais
      </button>
      <button 
        className={activeFilter === 'nao-metais' ? 'active' : ''} 
        onClick={() => handleFilterClick('nao-metais')}
      >
        Não Metais
      </button>
      <button 
        className={activeFilter === 'gas-nobre' ? 'active' : ''} 
        onClick={() => handleFilterClick('gas-nobre')}
      >
        Gases Nobres
      </button>
      <button 
        className={activeFilter === 'solidos' ? 'active' : ''} 
        onClick={() => handleFilterClick('solidos')}
      >
        Sólidos
      </button>
      <button 
        className={activeFilter === 'liquidos' ? 'active' : ''} 
        onClick={() => handleFilterClick('liquidos')}
      >
        Líquidos
      </button>
      <button 
        className={activeFilter === 'gasosos' ? 'active' : ''} 
        onClick={() => handleFilterClick('gasosos')}
      >
        Gasosos
      </button>
    </div>
  );
};

// Componente principal da aplicação
const App = () => {
  const [selectedElement, setSelectedElement] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isIntroVisible, setIsIntroVisible] = useState(true);
  const grid = createPeriodicTableGrid();
  
  // Efeito para animação introdutória
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsIntroVisible(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Lidar com clique no elemento
  const handleElementClick = (element) => {
    setSelectedElement(element);
    
    // Adiciona a classe para animar o elemento selecionado
    const elements = document.querySelectorAll('.element');
    elements.forEach(el => {
      if (el.querySelector('.element-number').textContent === element.number.toString()) {
        el.classList.add('selected');
      } else {
        el.classList.remove('selected');
      }
    });
  };
  
  // Fechar detalhes do elemento
  const handleCloseDetails = () => {
    setSelectedElement(null);
    
    // Remove a classe de animação
    const elements = document.querySelectorAll('.element');
    elements.forEach(el => el.classList.remove('selected'));
  };
  
  // Aplicar filtro aos elementos
  const applyFilter = (element) => {
    if (!element) return false;
    
    switch (activeFilter) {
      case 'metais':
        return ['metal-alcalino', 'metal-alcalino-terroso', 'metal-transicao', 'metal-pos-transicao', 'lantanideo', 'actinideo'].includes(element.category);
      case 'nao-metais':
        return ['nao-metal', 'semimetal', 'halogenio'].includes(element.category);
      case 'gas-nobre':
        return element.category === 'gas-nobre';
      case 'solidos':
        return element.state_at_room_temp === 'sólido';
      case 'liquidos':
        return element.state_at_room_temp === 'líquido';
      case 'gasosos':
        return element.state_at_room_temp === 'gasoso';
      default:
        return true;
    }
  };
  
  // Renderiza a tabela periódica
  const renderPeriodicTable = () => {
    return (
      <div className="periodic-table">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="periodic-row">
            {row.map((element, colIndex) => {
              // Se tiver um elemento nessa posição e passar no filtro atual
              if (element && (activeFilter === 'all' || applyFilter(element))) {
                return (
                  <Element 
                    key={colIndex} 
                    element={element} 
                    onClick={handleElementClick} 
                  />
                );
              }
              // Caso contrário, renderiza um espaço vazio
              return <div key={colIndex} className="element-placeholder"></div>;
            })}
          </div>
        ))}
      </div>
    );
  };
  
  // Renderiza a introdução animada
  const renderIntro = () => {
    if (!isIntroVisible) return null;
    
    return (
      <div className="intro-animation">
        <div className="atoms-animation">
          <div className="atom atom-1"></div>
          <div className="atom atom-2"></div>
          <div className="atom atom-3"></div>
        </div>
        <h1 className="intro-title">ElementalVerse</h1>
        <p className="intro-subtitle">Explore o universo dos elementos químicos</p>
      </div>
    );
  };
  

  // Componente de busca para elementos
  const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    
    const handleSearch = (e) => {
      const value = e.target.value;
      setSearchTerm(value);
    };
    
    const handleKeyDown = (e) => {
      // Verifica se a tecla pressionada foi Enter
      if (e.key === 'Enter') {
        if (searchTerm.trim() === '') return;
        
        // Busca por símbolo, nome ou número atômico
        const found = elementsData.find(
          el => el.symbol.toLowerCase() === searchTerm.toLowerCase() ||
                el.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                el.number.toString() === searchTerm
        );
        
        if (found) {
          handleElementClick(found);
        }
      }
    };
    
    return (
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar elemento (nome, símbolo ou número)"
          value={searchTerm}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
        />
      </div>
    );
  };
  
  return (
    <div className="app">
      {renderIntro()}
      
      <div className={`app-content ${isIntroVisible ? 'hidden' : ''}`}>
        <header className="app-header">
          <h1>ElementalVerse</h1>
          <p>Explore a tabela periódica de forma interativa e educativa</p>
        </header>
        
        <SearchBar />
        
        <FilterControls onFilterChange={setActiveFilter} />
        
        <CategoryLegend />
        
        {renderPeriodicTable()}
        
        {selectedElement && (
          <ElementDetails element={selectedElement} onClose={handleCloseDetails} />
        )}
        
        <footer className="app-footer">
          <p>ElementalVerse - Educação química interativa</p>
        </footer>
      </div>
      
      <style jsx>{`
        /* Estilos gerais com melhorias */
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: 'Poppins', sans-serif; /* Fonte mais moderna */
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); /* Transições suaves em todo o site */
        }

        body {
          background: linear-gradient(135deg, #121212 0%, #1a1a2e 100%); /* Gradiente sutil de fundo */
          color: #ffffff;
          line-height: 1.6;
          overflow-x: hidden; /* Previne scroll horizontal */
          min-height: 100vh;
          scrollbar-width: thin;
          scrollbar-color: #4fc3f7 rgba(255,255,255,0.1);
        }

        body::-webkit-scrollbar {
          width: 8px;
        }

        body::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.1);
          border-radius: 10px;
        }

        body::-webkit-scrollbar-thumb {
          background-color: #4fc3f7;
          border-radius: 10px;
          border: 2px solid rgba(255,255,255,0.1);
        }

        .app {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          padding: 20px;
          max-width: 1600px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* Efeito de partículas no fundo */
        .app::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            radial-gradient(circle at 25% 10%, rgba(79, 195, 247, 0.05) 2px, transparent 0),
            radial-gradient(circle at 75% 30%, rgba(79, 195, 247, 0.05) 2px, transparent 0),
            radial-gradient(circle at 30% 60%, rgba(79, 195, 247, 0.05) 2px, transparent 0),
            radial-gradient(circle at 80% 80%, rgba(79, 195, 247, 0.05) 2px, transparent 0);
          background-size: 350px 350px;
          background-position: 0 0, 0 0, 0 0, 0 0;
          z-index: -1;
          animation: particleShift 60s infinite linear;
          opacity: 0.6;
        }

        @keyframes particleShift {
          0% { background-position: 0% 0%, 0% 0%, 0% 0%, 0% 0%; }
          100% { background-position: 100% 100%, 100% 100%, 100% 100%, 100% 100%; }
        }

        .app-content {
          display: flex;
          flex-direction: column;
          flex: 1;
          opacity: 1;
          transition: opacity 1s cubic-bezier(0.19, 1, 0.22, 1);
          will-change: opacity; /* Otimização de renderização */
        }

        .app-content.hidden {
          opacity: 0;
          transform: translateY(10px);
        }

        .app-header {
          text-align: center;
          margin-bottom: 40px;
          animation: fadeIn 1.5s, floatUp 1.5s;
          position: relative;
        }

        .app-header h1 {
          font-size: 4rem;
          margin-bottom: 15px;
          color: transparent;
          background: linear-gradient(120deg, #4fc3f7, #03a9f4, #039be5, #81d4fa);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          animation: gradientFlow 8s ease infinite;
          font-weight: 700;
          letter-spacing: 1px;
          text-shadow: 0 5px 15px rgba(3, 169, 244, 0.4);
          position: relative;
        }

        /* Efeito de glowing lines sob o título */
        .app-header h1::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 180px;
          height: 3px;
          background: linear-gradient(90deg, transparent, #4fc3f7, transparent);
          border-radius: 3px;
          animation: pulse 3s infinite;
        }

        .app-header p {
          font-size: 1.3rem;
          color: #bbdefb;
          max-width: 700px;
          margin: 0 auto;
          font-weight: 300;
          animation: fadeIn 2s 0.5s backwards;
          text-shadow: 0 2px 5px rgba(0,0,0,0.3);
        }

        .app-footer {
          text-align: center;
          margin-top: 60px;
          padding: 30px 20px;
          font-size: 1rem;
          color: #90a4ae;
          position: relative;
          overflow: hidden;
          border-top: 1px solid rgba(255,255,255,0.05);
        }

        .app-footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(79, 195, 247, 0.3), transparent);
          animation: glowLine 4s infinite;
        }

        /* Estilos da tabela periódica com melhorias */
        .periodic-table {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin: 30px 0;
          justify-content: center;
          animation: fadeIn 2s, scaleUp 1.5s cubic-bezier(0.23, 1, 0.32, 1);
          perspective: 1000px; /* Adiciona profundidade 3D */
        }

        .periodic-row {
          display: flex;
          gap: 6px;
          justify-content: center;
          transform-style: preserve-3d;
        }

        .element, .element-placeholder {
          width: 70px;
          height: 70px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          position: relative;
          padding: 5px;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          cursor: pointer;
          overflow: hidden;
          backdrop-filter: blur(5px); /* Efeito de vidro */
          box-shadow: 0 4px 12px rgba(0,0,0,0.2), 
                      inset 0 0 0 1px rgba(255,255,255,0.1);
        }

        .element-placeholder {
          visibility: hidden;
        }

        .element::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1), transparent);
          opacity: 0;
          transition: opacity 0.5s;
        }

        .element:hover {
          transform: translateY(-5px) scale(1.12);
          box-shadow: 0 15px 25px rgba(0,0,0,0.3), 
                      0 0 15px rgba(79, 195, 247, 0.5),
                      inset 0 0 0 1px rgba(255,255,255,0.2);
          z-index: 2;
        }

        .element:hover::before {
          opacity: 1;
        }

        .element.selected {
          transform: translateY(-8px) scale(1.18);
          box-shadow: 0 20px 30px rgba(0,0,0,0.4), 
                      0 0 25px rgba(79, 195, 247, 0.6),
                      inset 0 0 0 2px rgba(255,255,255,0.3);
          z-index: 3;
          animation: elementPulse 2s infinite;
        }

        @keyframes elementPulse {
          0% { box-shadow: 0 20px 30px rgba(0,0,0,0.4), 0 0 15px rgba(79, 195, 247, 0.3); }
          50% { box-shadow: 0 20px 30px rgba(0,0,0,0.4), 0 0 25px rgba(79, 195, 247, 0.8); }
          100% { box-shadow: 0 20px 30px rgba(0,0,0,0.4), 0 0 15px rgba(79, 195, 247, 0.3); }
        }

        .element-number {
          position: absolute;
          top: 3px;
          left: 6px;
          font-size: 0.7rem;
          font-weight: 500;
          opacity: 0.7;
        }

        .element-symbol {
          font-size: 1.6rem;
          font-weight: 700;
          margin-bottom: 2px;
          text-shadow: 0 2px 5px rgba(0,0,0,0.2);
          letter-spacing: 1px;
        }

        .element-name {
          font-size: 0.65rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 100%;
          text-align: center;
          opacity: 0.9;
          font-weight: 500;
          transition: opacity 0.3s;
        }

        .element:hover .element-name {
          opacity: 1;
        }

        .element-mass {
          font-size: 0.62rem;
          color: rgba(0, 0, 0, 0.7);
          font-weight: 500;
        }

        /* Categorias de elementos com cores mais vibrantes e gradientes */
        .metal-alcalino {
          background: linear-gradient(135deg, #ff9800, #ff5722);
          color: #000;
        }

        .metal-alcalino-terroso {
          background: linear-gradient(135deg, #ffc107, #ffeb3b);
          color: #000;
        }

        .metal-transicao {
          background: linear-gradient(135deg, #9c27b0, #673ab7);
          color: #fff;
        }

        .metal-pos-transicao {
          background: linear-gradient(135deg, #8bc34a, #4caf50);
          color: #000;
        }

        .semimetal {
          background: linear-gradient(135deg, #00bcd4, #80deea);
          color: #000;
        }

        .nao-metal {
          background: linear-gradient(135deg, #009688, #26a69a);
          color: #000;
        }

        .halogenio {
          background: linear-gradient(135deg, #03a9f4, #29b6f6);
          color: #000;
        }

        .gas-nobre {
          background: linear-gradient(135deg, #e91e63, #f06292);
          color: #fff;
        }

        .lantanideo {
          background: linear-gradient(135deg, #3f51b5, #7986cb);
          color: #fff;
        }

        .actinideo {
          background: linear-gradient(135deg, #607d8b, #90a4ae);
          color: #fff;
        }

        /* Legenda das categorias melhorada */
        .category-legend {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px;
          margin: 30px 0;
          padding: 25px 20px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 15px;
          animation: fadeIn 1.5s;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1), 
                      inset 0 0 0 1px rgba(255,255,255,0.05);
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
        }

        .category-legend::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at center, rgba(79, 195, 247, 0.05), transparent 70%);
          animation: rotateBackground 20s linear infinite;
        }

        .legend-item {
          display: flex;
          align-items: center;
          margin: 6px 12px;
          transition: transform 0.3s;
        }

        .legend-item:hover {
          transform: translateY(-2px);
        }

        .legend-color {
          width: 18px;
          height: 18px;
          border-radius: 4px;
          margin-right: 10px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }

        /* Filtros com estilo melhorado */
        .filter-controls {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px;
          margin: 30px 0;
          animation: fadeIn 1.5s;
          padding: 10px;
          position: relative;
        }

        .filter-controls::after {
          content: '';
          position: absolute;
          bottom: -15px;
          left: 50%;
          transform: translateX(-50%);
          width: 50%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(79, 195, 247, 0.3), transparent);
        }

        .filter-controls button {
          background: rgba(255, 255, 255, 0.05);
          color: #ffffff;
          border: none;
          padding: 10px 18px;
          border-radius: 30px;
          cursor: pointer;
          transition: all 0.4s;
          font-weight: 500;
          font-size: 0.95rem;
          letter-spacing: 0.5px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1), 
                      inset 0 0 0 1px rgba(255,255,255,0.05);
          position: relative;
          overflow: hidden;
        }

        .filter-controls button::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at center, rgba(255,255,255,0.2), transparent 70%);
          opacity: 0;
          transition: opacity 0.5s;
          transform: scale(0.5);
        }

        .filter-controls button:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-3px);
          box-shadow: 0 7px 15px rgba(0,0,0,0.15), 
                      inset 0 0 0 1px rgba(255,255,255,0.1);
        }

        .filter-controls button:hover::before {
          opacity: 1;
          animation: ripple 1s forwards;
        }

        .filter-controls button.active {
          background: linear-gradient(135deg, #03a9f4, #4fc3f7);
          color: #fff;
          box-shadow: 0 5px 15px rgba(3, 169, 244, 0.4), 
                      inset 0 0 0 1px rgba(255,255,255,0.2);
          text-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }

        @keyframes ripple {
          to {
            transform: scale(2);
            opacity: 0;
          }
        }

        /* Detalhes do elemento com design de vidro aprimorado */
        .element-details-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.85);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          animation: fadeIn 0.4s;
          backdrop-filter: blur(8px);
        }

        .element-details {
          background: rgba(26, 26, 26, 0.8);
          border-radius: 20px;
          width: 90%;
          max-width: 900px;
          max-height: 90vh;
          overflow-y: auto;
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 25px 50px rgba(0,0,0,0.5), 
                      0 0 40px rgba(0,0,0,0.3),
                      inset 0 0 0 1px rgba(255,255,255,0.1);
          animation: floatIn 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          backdrop-filter: blur(10px);
          scrollbar-width: thin;
          scrollbar-color: #4fc3f7 rgba(255,255,255,0.1);
        }

        .element-details::-webkit-scrollbar {
          width: 6px;
        }

        .element-details::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
          border-radius: 10px;
        }

        .element-details::-webkit-scrollbar-thumb {
          background-color: #4fc3f7;
          border-radius: 10px;
        }

        @keyframes floatIn {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .details-header {
          display: flex;
          padding: 30px;
          position: relative;
          border-radius: 20px 20px 0 0;
          background: linear-gradient(135deg, rgba(0,0,0,0.4), rgba(0,0,0,0));
        }

        .details-symbol {
          font-size: 5rem;
          font-weight: 700;
          margin-right: 30px;
          color: #000;
          text-shadow: 0 2px 10px rgba(255,255,255,0.3);
          position: relative;
          z-index: 2;
        }

        .details-info {
          color: #000;
          position: relative;
          z-index: 2;
        }

        .details-info h2 {
          font-size: 2.5rem;
          margin-bottom: 8px;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .close-button {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(0,0,0,0.2);
          border: none;
          width: 40px;
          height: 40px;
          font-size: 1.5rem;
          color: #fff;
          cursor: pointer;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
          box-shadow: 0 2px 10px rgba(0,0,0,0.2);
          z-index: 3;
        }

        .close-button:hover {
          background: rgba(255,255,255,0.2);
          transform: rotate(90deg);
        }

        .details-tabs {
          display: flex;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          position: relative;
          background: rgba(0,0,0,0.2);
        }

        .details-tabs::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(79, 195, 247, 0.2), transparent);
        }

        .details-tabs button {
          flex: 1;
          padding: 16px;
          background: none;
          border: none;
          color: rgba(255,255,255,0.6);
          cursor: pointer;
          font-size: 1.1rem;
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
          font-weight: 500;
          letter-spacing: 0.5px;
        }

        .details-tabs button::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 3px;
          background: #4fc3f7;
          transform: translateX(-50%);
          transition: width 0.3s;
          border-radius: 3px 3px 0 0;
        }

        .details-tabs button:hover {
          color: rgba(255,255,255,0.9);
          background-color: rgba(255, 255, 255, 0.05);
        }

        .details-tabs button:hover::before {
          width: 30%;
        }

        .details-tabs button.active {
          color: #fff;
          background: rgba(79, 195, 247, 0.1);
        }

        .details-tabs button.active::before {
          width: 70%;
          background: linear-gradient(90deg, #03a9f4, #4fc3f7);
          box-shadow: 0 0 10px rgba(79, 195, 247, 0.5);
        }

        .details-content {
          padding: 30px;
          position: relative;
          z-index: 1;
        }

        .details-content::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at center, rgba(79, 195, 247, 0.05), transparent 70%);
          z-index: -1;
        }

        /* Estilos para a aba "Básico" */
        .basic-info {
          display: flex;
          flex-wrap: wrap;
          gap: 40px;
        }

        .orbital-animation {
          width: 220px;
          height: 220px;
          position: relative;
          margin: 0 auto;
          transform-style: preserve-3d;
          animation: rotateSlowly 20s linear infinite;
        }

        @keyframes rotateSlowly {
          0% { transform: rotate3d(1, 1, 1, 0deg); }
          100% { transform: rotate3d(1, 1, 1, 360deg); }
        }

        .nucleus {
          position: absolute;
          width: 40px;
          height: 40px;
          background: radial-gradient(circle at 30% 30%, #f44336, #b71c1c);
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 2;
          box-shadow: 0 0 20px rgba(244, 67, 54, 0.8), 
                      0 0 40px rgba(244, 67, 54, 0.4);
          animation: pulsateNucleus 3s infinite;
        }

        @keyframes pulsateNucleus {
          0% { box-shadow: 0 0 20px rgba(244, 67, 54, 0.8), 0 0 40px rgba(244, 67, 54, 0.4); }
          50% { box-shadow: 0 0 30px rgba(244, 67, 54, 0.9), 0 0 60px rgba(244, 67, 54, 0.6); }
          100% { box-shadow: 0 0 20px rgba(244, 67, 54, 0.8), 0 0 40px rgba(244, 67, 54, 0.4); }
        }

        .electron-shell {
          position: absolute;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: rotate linear infinite;
          box-shadow: 0 0 20px rgba(100, 181, 246, 0.3);
        }

        .electron {
          position: absolute;
          width: 10px;
          height: 10px;
          background: radial-gradient(circle at 30% 30%, #64b5f6, #1976d2);
          border-radius: 50%;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          box-shadow: 0 0 10px rgba(100, 181, 246, 0.8),
                      0 0 20px rgba(100, 181, 246, 0.4);
          animation: pulseElectron 2s infinite;
        }

        @keyframes pulseElectron {
          0% { box-shadow: 0 0 10px rgba(100, 181, 246, 0.8), 0 0 20px rgba(100, 181, 246, 0.4); }
          50% { box-shadow: 0 0 15px rgba(100, 181, 246, 1), 0 0 30px rgba(100, 181, 246, 0.7); }
          100% { box-shadow: 0 0 10px rgba(100, 181, 246, 0.8), 0 0 20px rgba(100, 181, 246, 0.4); }
        }

        .basic-text {
          flex: 1;
          min-width: 320px;
        }

        .basic-text p {
          margin-bottom: 15px;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.9);
          font-size: 1.05rem;
        }

        .element-description {
          margin-top: 25px;
          padding: 20px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          line-height: 1.9;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1), 
                      inset 0 0 0 1px rgba(255,255,255,0.05);
          position: relative;
          overflow: hidden;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .element-description:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.15), 
                      inset 0 0 0 1px rgba(255,255,255,0.1);
        }

        .element-description::before {
          content: '';
          position: absolute;
          top: -100%;
          left: -100%;
          width: 300%;
          height: 300%;
          background: radial-gradient(circle at center, rgba(79, 195, 247, 0.03), transparent 70%);
          animation: rotateBackground 30s linear infinite;
        }

        @keyframes rotateBackground {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Estilos para a aba "Estrutura Atômica" */
        .atomic-structure {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px 0;
        }

        .electron-config {
          text-align: center;
          width: 100%;
          padding: 20px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 15px;
          margin-bottom: 30px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1), 
                      inset 0 0 0 1px rgba(255,255,255,0.05);
        }

        .electron-diagram {
          margin: 40px auto;
          max-width: 100%;
        }

        .bohr-model {
          position: relative;
          width: 340px;
          height: 340px;
          margin: 0 auto;
          transform-style: preserve-3d;
          perspective: 800px;
        }

        .nucleus-3d {
          position: absolute;
          width: 50px;
          height: 50px;
          background: radial-gradient(circle at 30% 30%, #f44336, #b71c1c);
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 30px rgba(244, 67, 54, 0.8);
          z-index: 5;
          animation: pulse3D 3s infinite;
        }

        @keyframes pulse3D {
          0% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.1); }
          100% { transform: translate(-50%, -50%) scale(1); }
        }

        .orbital-3d {
          position: absolute;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate3d(1, 1, 0, 60deg);
          animation: rotate3d linear infinite;
          box-shadow: 0 0 30px rgba(100, 181, 246, 0.2);
        }

        .electron-3d {
          position: absolute;
          width: 12px;
          height: 12px;
          background: radial-gradient(circle at 30% 30%, #64b5f6, #1976d2);
          border-radius: 50%;
          top: 0;
          left: 0;
          box-shadow: 0 0 12px rgba(100, 181, 246, 1),
                      0 0 25px rgba(100, 181, 246, 0.6);
          animation: glow3D 2s infinite;
          z-index: 4;
        }

        @keyframes glow3D {
          0% { box-shadow: 0 0 12px rgba(100, 181, 246, 1), 0 0 25px rgba(100, 181, 246, 0.6); }
          50% { box-shadow: 0 0 20px rgba(100, 181, 246, 1), 0 0 40px rgba(100, 181, 246, 0.8); }
          100% { box-shadow: 0 0 12px rgba(100, 181, 246, 1), 0 0 25px rgba(100, 181, 246, 0.6); }
        }

        /* Estilos para a aba "Propriedades" com design moderno */
        .properties-info h3 {
          margin: 25px 0 15px;
          color: #4fc3f7;
          font-size: 1.4rem;
          font-weight: 600;
          position: relative;
          padding-left: 15px;
          letter-spacing: 0.5px;
        }

        .properties-info h3::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 5px;
          height: 22px;
          background: linear-gradient(to bottom, #03a9f4, #4fc3f7);
          border-radius: 3px;
        }

        .property-visualization {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 15px;
          padding: 25px;
          margin-bottom: 30px;
          box-shadow: 0 10px 20px rgba(0,0,0,0.1), 
                      inset 0 0 0 1px rgba(255,255,255,0.05);
          position: relative;
          overflow: hidden;
          transition: transform 0.3s;
        }

        .property-visualization:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.15), 
                      inset 0 0 0 1px rgba(255,255,255,0.1);
        }

        .property-visualization::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at center, rgba(79, 195, 247, 0.03), transparent 70%);
          animation: rotateBackground 40s linear infinite;
          z-index: 0;
        }

        .property {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
        }

        .property:last-child {
          margin-bottom: 0;
        }

        .property span {
          width: 140px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          font-size: 1.05rem;
        }

        .state-indicator {
          padding: 8px 18px;
          border-radius: 20px;
          text-align: center;
          font-weight: 500;
          min-width: 100px;
          box-shadow: 0 3px 10px rgba(0,0,0,0.2);
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .state-indicator:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }

        .state-indicator.sólido {
          background: linear-gradient(135deg, #8d6e63, #6d4c41);
          color: #fff;
        }

        .state-indicator.líquido {
          background: linear-gradient(135deg, #42a5f5, #1976d2);
          color: #fff;
        }

        .state-indicator.gasoso {
          background: linear-gradient(135deg, #81c784, #4caf50);
          color: #fff;
        }

        .reactivity-meter {
          width: 220px;
          height: 12px;
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          overflow: hidden;
          box-shadow: inset 0 1px 3px rgba(0,0,0,0.3);
          position: relative;
        }

        .reactivity-level {
          height: 100%;
          background: linear-gradient(to right, #4caf50, #ffc107, #f44336);
          border-radius: 6px;
          position: relative;
          transition: width 1s cubic-bezier(0.19, 1, 0.22, 1);
        }

        .reactivity-level::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, 
                        rgba(255, 255, 255, 0.3), 
                        rgba(255, 255, 255, 0) 50%, 
                        rgba(0, 0, 0, 0.1));
        }

        .abundance-visualization {
          display: flex;
          gap: 5px;
          align-items: center;
        }

        .abundance-unit {
          width: 22px;
          height: 22px;
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
          transition: all 0.4s;
          position: relative;
          overflow: hidden;
        }

        .abundance-unit::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0));
          transition: opacity 0.3s;
        }

        .abundance-unit:hover::after {
          opacity: 1;
        }

        .abundance-unit.active {
          background-color: #64b5f6;
          box-shadow: 0 0 10px rgba(100, 181, 246, 0.6);
          transform: scale(1.1);
        }

        .applications {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          margin-top: 25px;
        }

        .application-item {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.03);
          padding: 15px;
          border-radius: 12px;
          width: calc(50% - 10px);
          transition: all 0.4s;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1),
                      inset 0 0 0 1px rgba(255,255,255,0.05);
          position: relative;
          overflow: hidden;
        }

        .application-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.15),
                      inset 0 0 0 1px rgba(255,255,255,0.1);
        }

        .application-item::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at center, rgba(255,255,255,0.05), transparent 70%);
          z-index: 0;
          opacity: 0;
          transition: opacity 0.5s;
        }

        .application-item:hover::before {
          opacity: 1;
          animation: rotateBackground 20s linear infinite;
        }

        .application-icon {
          width: 50px;
          height: 50px;
          margin-right: 15px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
          position: relative;
          z-index: 1;
        }

        .application-icon::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3), transparent);
        }

        .application-icon.energy {
          background: linear-gradient(135deg, #ffa726, #f57c00);
        }

        .application-icon.atmosphere {
          background: linear-gradient(135deg, #81c784, #388e3c);
        }

        .application-icon.industrial {
          background: linear-gradient(135deg, #90a4ae, #546e7a);
        }

        .application-icon.electronics {
          background: linear-gradient(135deg, #64b5f6, #1976d2);
        }

        .application-icon.jewelry {
          background: linear-gradient(135deg, #ffd54f, #ffb300);
        }

        .application-icon.nuclear {
          background: linear-gradient(135deg, #e57373, #d32f2f);
        }

        .application-icon.biological {
          background: linear-gradient(135deg, #ba68c8, #7b1fa2);
        }

        /* Estilos para o componente de busca moderno */
        .search-bar {
          display: flex;
          justify-content: center;
          margin: 30px 0;
          animation: fadeIn 1.5s;
          position: relative;
        }

        .search-bar::after {
          content: '';
          position: absolute;
          bottom: -15px;
          left: 50%;
          transform: translateX(-50%);
          width: 40%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(79, 195, 247, 0.2), transparent);
        }

        .search-bar input {
          width: 100%;
          max-width: 550px;
          padding: 16px 25px;
          border-radius: 30px;
          border: none;
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
          font-size: 1.1rem;
          transition: all 0.4s;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1),
                      inset 0 0 0 1px rgba(255,255,255,0.05);
          letter-spacing: 0.5px;
        }

        .search-bar input:focus {
          outline: none;
          background: rgba(255, 255, 255, 0.1);
          box-shadow: 0 10px 25px rgba(0,0,0,0.15),
                      0 0 15px rgba(79, 195, 247, 0.3),
                      inset 0 0 0 1px rgba(79, 195, 247, 0.3);
          transform: translateY(-2px);
        }

        .search-bar::before {
          content: '🔍';
          position: absolute;
          right: calc(50% - 240px);
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255, 255, 255, 0.5);
          font-size: 1.2rem;
          pointer-events: none;
          transition: color 0.3s;
        }

        .search-bar input:focus + .search-bar::before {
          color: rgba(79, 195, 247, 0.8);
        }

        /* Animação introdutória melhorada */
        .intro-animation {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: radial-gradient(circle at center, #1a1a2e, #121212);
          z-index: 9999;
          animation: fadeOut 1s cubic-bezier(0.19, 1, 0.22, 1) 2.5s forwards;
        }

        .atoms-animation {
          position: relative;
          width: 250px;
          height: 250px;
          margin-bottom: 40px;
        }

        .atom {
          position: absolute;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          opacity: 0.8;
          box-shadow: 0 0 30px;
          animation: float 3s infinite alternate, glow 4s infinite alternate;
        }

        .atom-1 {
          background: radial-gradient(circle at 30% 30%, #f44336, #b71c1c);
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          animation-delay: 0s;
          box-shadow: 0 0 30px rgba(244, 67, 54, 0.6);
        }

        .atom-2 {
          background: radial-gradient(circle at 30% 30%, #4fc3f7, #0288d1);
          bottom: 0;
          left: 0;
          animation-delay: 0.5s;
          box-shadow: 0 0 30px rgba(79, 195, 247, 0.6);
        }

        .atom-3 {
          background: radial-gradient(circle at 30% 30%, #81c784, #388e3c);
          bottom: 0;
          right: 0;
          animation-delay: 1s;
          box-shadow: 0 0 30px rgba(129, 199, 132, 0.6);
        }

        .intro-title {
          font-size: 5rem;
          color: transparent;
          background: linear-gradient(120deg, #4fc3f7, #03a9f4, #039be5, #81d4fa);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          margin-bottom: 15px;
          text-shadow: 0 5px 25px rgba(3, 169, 244, 0.5);
          animation: gradientFlow 8s ease infinite, pulse 2s infinite;
          letter-spacing: 2px;
          font-weight: 700;
        }

        .intro-subtitle {
          font-size: 1.6rem;
          color: #bbdefb;
          opacity: 0;
          animation: fadeIn 1s 0.5s forwards;
          text-shadow: 0 2px 10px rgba(0,0,0,0.3);
          font-weight: 300;
          letter-spacing: 1px;
        }

        /* Animações aprimoradas */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeOut {
          from { opacity: 1; visibility: visible; }
          to { opacity: 0; visibility: hidden; }
        }

        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        @keyframes scaleUp {
          from { transform: scale(0.95); }
          to { transform: scale(1); }
        }

        @keyframes rotate {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        @keyframes rotate3d {
          from { transform: translate(-50%, -50%) rotate3d(1, 1, 0, 60deg) rotateZ(0deg); }
          to { transform: translate(-50%, -50%) rotate3d(1, 1, 0, 60deg) rotateZ(360deg); }
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.03); }
          100% { transform: scale(1); }
        }

        @keyframes float {
          from { transform: translateY(0) rotate(0deg); }
          to { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes glowLine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes floatUp {
          from { transform: translateY(30px); }
          to { transform: translateY(0); }
        }

        /* Responsividade melhorada */
        @media (max-width: 1400px) {
          .app-header h1 {
            font-size: 3.5rem;
          }
          
          .element, .element-placeholder {
            width: 65px;
            height: 65px;
          }
        }

        @media (max-width: 1200px) {
          .element, .element-placeholder {
            width: 60px;
            height: 60px;
          }
          
          .element-symbol {
            font-size: 1.3rem;
          }
          
          .element-name, .element-mass {
            font-size: 0.6rem;
          }
          
          .app-header h1 {
            font-size: 3.2rem;
          }
          
          .app-header p {
            font-size: 1.1rem;
          }
        }

        @media (max-width: 900px) {
          .element, .element-placeholder {
            width: 50px;
            height: 50px;
          }
          
          .element-symbol {
            font-size: 1.1rem;
          }
          
          .element-name {
            display: none;
          }
          
          .element-number {
            font-size: 0.65rem;
          }
          
          .element-mass {
            font-size: 0.5rem;
          }
          
          .application-item {
            width: 100%;
          }
          
          .app-header h1 {
            font-size: 2.8rem;
          }
          
          .app-header p {
            font-size: 1rem;
          }
          
          .category-legend {
            flex-direction: column;
            align-items: center;
            max-height: 300px;
            overflow-y: auto;
            padding: 15px 10px;
          }
          
          .legend-item {
            margin: 3px 0;
          }
          
          .details-symbol {
            font-size: 3.5rem;
          }
          
          .details-info h2 {
            font-size: 2rem;
          }
        }

        @media (max-width: 700px) {
          .element, .element-placeholder {
            width: 40px;
            height: 40px;
            border-radius: 6px;
          }
          
          .element-symbol {
            font-size: 0.85rem;
          }
          
          .element-mass {
            display: none;
          }
          
          .element-number {
            font-size: 0.6rem;
            top: 1px;
            left: 3px;
          }
          
          .basic-info {
            flex-direction: column;
            align-items: center;
          }
          
          .orbital-animation {
            margin-bottom: 30px;
          }
          
          .app-header h1 {
            font-size: 2.4rem;
          }
          
          .app-header p {
            font-size: 0.9rem;
            padding: 0 15px;
          }
          
          .filter-controls {
            flex-direction: column;
            max-width: 250px;
            margin: 20px auto;
          }
          
          .filter-controls button {
            width: 100%;
          }
          
          .details-header {
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 20px 15px;
          }
          
          .details-symbol {
            margin-right: 0;
            margin-bottom: 15px;
          }
          
          .details-tabs button {
            padding: 12px 5px;
            font-size: 0.9rem;
          }
          
          .bohr-model, .orbital-animation {
            width: 280px;
            height: 280px;
            transform: scale(0.85);
          }
          
          .properties-info h3 {
            font-size: 1.2rem;
          }
          
          .property span {
            width: 110px;
            font-size: 0.9rem;
          }
          
          .reactivity-meter {
            width: 150px;
          }
        }

        @media (max-width: 500px) {
          .element, .element-placeholder {
            width: 30px;
            height: 30px;
            padding: 2px;
          }
          
          .element-symbol {
            font-size: 0.7rem;
          }
          
          .element-number {
            font-size: 0.5rem;
            top: 1px;
            left: 2px;
          }
          
          .periodic-row {
            gap: 3px;
          }
          
          .periodic-table {
            gap: 3px;
          }
          
          .app-header h1 {
            font-size: 2rem;
          }
          
          .search-bar input {
            padding: 12px 20px;
            font-size: 0.9rem;
          }
          
          .element-details {
            width: 95%;
          }
          
          .details-content {
            padding: 15px;
          }
          
          .bohr-model, .orbital-animation {
            width: 240px;
            height: 240px;
            transform: scale(0.7);
          }
          
          .properties-info h3 {
            font-size: 1.1rem;
          }
        }

        /* Novos efeitos para transições de páginas */
        .page-transition {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #121212;
          z-index: 9000;
          transform: translateY(100%);
          transition: transform 0.7s cubic-bezier(0.86, 0, 0.07, 1);
        }

        .page-transition.active {
          transform: translateY(0%);
        }

        .page-transition-content {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80%;
          text-align: center;
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .page-transition.active .page-transition-content {
          opacity: 1;
        }

        /* Efeitos de hover extras para elementos */
        .element:hover .element-symbol {
          transform: translateY(-3px);
          text-shadow: 0 5px 10px rgba(0,0,0,0.4);
        }

        .element:hover .element-mass {
          opacity: 1;
        }

        /* Efeito de loading spinner para carregamentos assíncronos */
        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 3px solid rgba(79, 195, 247, 0.2);
          border-top-color: #4fc3f7;
          border-radius: 50%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: spin 1s linear infinite;
          z-index: 9999;
        }

        @keyframes spin {
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        /* Efeito de destacar um elemento quando selecionado pelo filtro */
        .element.highlight {
          animation: highlight 2s;
          z-index: 5;
        }

        @keyframes highlight {
          0% { box-shadow: 0 0 0 3px rgba(79, 195, 247, 0.8); }
          50% { box-shadow: 0 0 0 8px rgba(79, 195, 247, 0.4); }
          100% { box-shadow: 0 0 0 3px rgba(79, 195, 247, 0); }
        }
      `}</style>
    </div>
  );
}
export default App;
