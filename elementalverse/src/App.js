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
  
  // Acrescentando apenas alguns elementos adicionais para demonstração
  { number: 19, symbol: 'K', name: 'Potássio', category: 'metal-alcalino', atomic_mass: 39.098, electron_configuration: '[Ar] 4s¹', group: 1, period: 4, block: 's', discovery_year: 1807, state_at_room_temp: 'sólido', description: 'Metal reativo essencial para função celular e processos biológicos.' },
  { number: 20, symbol: 'Ca', name: 'Cálcio', category: 'metal-alcalino-terroso', atomic_mass: 40.078, electron_configuration: '[Ar] 4s²', group: 2, period: 4, block: 's', discovery_year: 1808, state_at_room_temp: 'sólido', description: 'Mineral essencial para ossos, dentes e função muscular.' },
  { number: 26, symbol: 'Fe', name: 'Ferro', category: 'metal-transicao', atomic_mass: 55.845, electron_configuration: '[Ar] 3d⁶ 4s²', group: 8, period: 4, block: 'd', discovery_year: 'Pré-histórico', state_at_room_temp: 'sólido', description: 'Metal fundamental para a civilização humana. Componente da hemoglobina no sangue.' },
  { number: 29, symbol: 'Cu', name: 'Cobre', category: 'metal-transicao', atomic_mass: 63.546, electron_configuration: '[Ar] 3d¹⁰ 4s¹', group: 11, period: 4, block: 'd', discovery_year: 'Pré-histórico', state_at_room_temp: 'sólido', description: 'Excelente condutor de eletricidade. Um dos primeiros metais usados pelos humanos.' },
  { number: 47, symbol: 'Ag', name: 'Prata', category: 'metal-transicao', atomic_mass: 107.87, electron_configuration: '[Kr] 4d¹⁰ 5s¹', group: 11, period: 5, block: 'd', discovery_year: 'Pré-histórico', state_at_room_temp: 'sólido', description: 'Metal precioso com a mais alta condutividade elétrica. Usado em joias e fotografia.' },
  { number: 79, symbol: 'Au', name: 'Ouro', category: 'metal-transicao', atomic_mass: 196.97, electron_configuration: '[Xe] 4f¹⁴ 5d¹⁰ 6s¹', group: 11, period: 6, block: 'd', discovery_year: 'Pré-histórico', state_at_room_temp: 'sólido', description: 'Metal precioso extremamente maleável e resistente à corrosão. Usado em eletrônica e reserva monetária.' },
  { number: 80, symbol: 'Hg', name: 'Mercúrio', category: 'metal-transicao', atomic_mass: 200.59, electron_configuration: '[Xe] 4f¹⁴ 5d¹⁰ 6s²', group: 12, period: 6, block: 'd', discovery_year: 'Pré-histórico', state_at_room_temp: 'líquido', description: 'Único metal líquido à temperatura ambiente. Tóxico e usado em instrumentos científicos.' },
  { number: 82, symbol: 'Pb', name: 'Chumbo', category: 'metal-pos-transicao', atomic_mass: 207.2, electron_configuration: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²', group: 14, period: 6, block: 'p', discovery_year: 'Pré-histórico', state_at_room_temp: 'sólido', description: 'Metal denso usado em baterias. Tóxico para humanos, especialmente para o sistema nervoso.' },
  { number: 92, symbol: 'U', name: 'Urânio', category: 'actinideo', atomic_mass: 238.03, electron_configuration: '[Rn] 5f³ 6d¹ 7s²', group: 3, period: 7, block: 'f', discovery_year: 1789, state_at_room_temp: 'sólido', description: 'Elemento radioativo usado para geração de energia nuclear e armas.' }
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
  if (!element) return null;
  
  // Estado para controlar a aba ativa
  const [activeTab, setActiveTab] = useState('basic');
  
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
                          (element.number <= 20 && i < 7) ||
                          (element.symbol === 'Fe' && i < 9) ||
                          (element.symbol === 'O' && i < 10) ||
                          (element.symbol === 'Si' && i < 8) ||
                          (element.symbol === 'Al' && i < 8) ||
                          i < 3 ? 'active' : ''
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
      
      if (value.trim() === '') return;
      
      // Busca por símbolo, nome ou número atômico
      const found = elementsData.find(
        el => el.symbol.toLowerCase() === value.toLowerCase() || 
              el.name.toLowerCase().includes(value.toLowerCase()) ||
              el.number.toString() === value
      );
      
      if (found) {
        handleElementClick(found);
      }
    };
    
    return (
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar elemento (nome, símbolo ou número)"
          value={searchTerm}
          onChange={handleSearch}
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
        /* Estilos gerais */
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: 'Roboto', sans-serif;
        }
  
        body {
          background-color: #121212;
          color: #ffffff;
          line-height: 1.6;
        }
  
        .app {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          padding: 20px;
          max-width: 1600px;
          margin: 0 auto;
        }
  
        .app-content {
          display: flex;
          flex-direction: column;
          flex: 1;
          opacity: 1;
          transition: opacity 1s ease-in-out;
        }
  
        .app-content.hidden {
          opacity: 0;
        }
  
        .app-header {
          text-align: center;
          margin-bottom: 30px;
          animation: fadeIn 1.5s;
        }
  
        .app-header h1 {
          font-size: 3rem;
          margin-bottom: 10px;
          color: #4fc3f7;
          text-shadow: 0 0 10px rgba(79, 195, 247, 0.5);
        }
  
        .app-header p {
          font-size: 1.2rem;
          color: #bbdefb;
        }
  
        .app-footer {
          text-align: center;
          margin-top: 40px;
          padding: 20px;
          font-size: 0.9rem;
          color: #90a4ae;
        }
  
        /* Estilos da tabela periódica */
        .periodic-table {
          display: flex;
          flex-direction: column;
          gap: 5px;
          margin: 30px 0;
          justify-content: center;
          animation: fadeIn 2s;
        }
  
        .periodic-row {
          display: flex;
          gap: 5px;
          justify-content: center;
        }
  
        .element, .element-placeholder {
          width: 70px;
          height: 70px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 5px;
          position: relative;
          padding: 5px;
          transition: all 0.3s ease;
          cursor: pointer;
        }
  
        .element-placeholder {
          visibility: hidden;
        }
  
        .element:hover {
          transform: scale(1.1);
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
          z-index: 2;
        }
  
        .element.selected {
          transform: scale(1.15);
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
          z-index: 3;
          animation: pulse 1.5s infinite;
        }
  
        .element-number {
          position: absolute;
          top: 2px;
          left: 5px;
          font-size: 0.7rem;
          font-weight: bold;
        }
  
        .element-symbol {
          font-size: 1.4rem;
          font-weight: bold;
          margin-bottom: 2px;
        }
  
        .element-name {
          font-size: 0.6rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 100%;
          text-align: center;
        }
  
        .element-mass {
          font-size: 0.6rem;
          color: rgba(0, 0, 0, 0.7);
        }
  
        /* Categorias de elementos */
        .metal-alcalino, .metal-alcalino-terroso, .metal-transicao, 
        .metal-pos-transicao, .semimetal, .nao-metal, 
        .halogenio, .gas-nobre, .lantanideo, .actinideo {
          color: #000;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
        }
  
        /* Legenda das categorias */
        .category-legend {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
          margin: 20px 0;
          padding: 15px;
          background-color: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          animation: fadeIn 1.5s;
        }
  
        .legend-item {
          display: flex;
          align-items: center;
          margin: 5px 10px;
        }
  
        .legend-color {
          width: 15px;
          height: 15px;
          border-radius: 3px;
          margin-right: 8px;
        }
  
        /* Filtros */
        .filter-controls {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
          margin: 20px 0;
          animation: fadeIn 1.5s;
        }
  
        .filter-controls button {
          background-color: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          border: none;
          padding: 8px 15px;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.3s;
        }
  
        .filter-controls button:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }
  
        .filter-controls button.active {
          background-color: #4fc3f7;
          color: #000;
        }
  
        /* Detalhes do elemento */
        .element-details-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          animation: fadeIn 0.3s;
        }
  
        .element-details {
          background-color: #1a1a1a;
          border-radius: 10px;
          width: 90%;
          max-width: 800px;
          max-height: 90vh;
          overflow-y: auto;
          border: 2px solid;
          box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
          animation: scaleIn 0.5s;
        }
  
        .details-header {
          display: flex;
          padding: 20px;
          position: relative;
          border-radius: 8px 8px 0 0;
        }
  
        .details-symbol {
          font-size: 4rem;
          font-weight: bold;
          margin-right: 20px;
          color: #000;
        }
  
        .details-info {
          color: #000;
        }
  
        .details-info h2 {
          font-size: 2rem;
          margin-bottom: 5px;
        }
  
        .close-button {
          position: absolute;
          top: 10px;
          right: 15px;
          background: none;
          border: none;
          font-size: 2rem;
          color: #000;
          cursor: pointer;
        }
  
        .details-tabs {
          display: flex;
          border-bottom: 1px solid #333;
        }
  
        .details-tabs button {
          flex: 1;
          padding: 12px;
          background: none;
          border: none;
          color: #bbb;
          cursor: pointer;
          font-size: 1rem;
          transition: all 0.3s;
        }
  
        .details-tabs button:hover {
          background-color: rgba(255, 255, 255, 0.05);
        }
  
        .details-tabs button.active {
          color: #fff;
          border-bottom: 3px solid #4fc3f7;
        }
  
        .details-content {
          padding: 20px;
        }
  
        /* Estilos para a aba "Básico" */
        .basic-info {
          display: flex;
          flex-wrap: wrap;
          gap: 30px;
        }
  
        .orbital-animation {
          width: 200px;
          height: 200px;
          position: relative;
          margin: 0 auto;
        }
  
        .nucleus {
          position: absolute;
          width: 30px;
          height: 30px;
          background-color: #f44336;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 2;
          box-shadow: 0 0 10px rgba(244, 67, 54, 0.7);
        }
  
        .electron-shell {
          position: absolute;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: rotate linear infinite;
        }
  
        .electron {
          position: absolute;
          width: 8px;
          height: 8px;
          background-color: #64b5f6;
          border-radius: 50%;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          box-shadow: 0 0 5px rgba(100, 181, 246, 0.8);
        }
  
        .basic-text {
          flex: 1;
          min-width: 300px;
        }
  
        .basic-text p {
          margin-bottom: 10px;
        }
  
        .element-description {
          margin-top: 20px;
          padding: 10px;
          background-color: rgba(255, 255, 255, 0.05);
          border-radius: 5px;
          line-height: 1.8;
        }
  
        /* Estilos para a aba "Estrutura Atômica" */
        .atomic-structure {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
  
        .electron-config {
          text-align: center;
          width: 100%;
        }
  
        .electron-diagram {
          margin-top: 30px;
        }
  
        .bohr-model {
          position: relative;
          width: 300px;
          height: 300px;
          margin: 0 auto;
        }
  
        .nucleus-3d {
          position: absolute;
          width: 40px;
          height: 40px;
          background: radial-gradient(circle at 30% 30%, #f44336, #b71c1c);
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 15px rgba(244, 67, 54, 0.8);
          z-index: 5;
        }
  
        .orbital-3d {
          position: absolute;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate3d(1, 1, 0, 60deg);
          animation: rotate3d linear infinite;
        }
  
        .electron-3d {
          position: absolute;
          width: 10px;
          height: 10px;
          background: radial-gradient(circle at 30% 30%, #64b5f6, #1976d2);
          border-radius: 50%;
          top: 0;
          left: 0;
          box-shadow: 0 0 8px rgba(100, 181, 246, 1);
          animation: pulse 2s infinite;
          z-index: 4;
        }
  
        /* Estilos para a aba "Propriedades" */
        .properties-info h3 {
          margin: 20px 0 10px;
          color: #4fc3f7;
        }
  
        .property-visualization {
          background-color: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          padding: 15px;
          margin-bottom: 20px;
        }
  
        .property {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
        }
  
        .property span {
          width: 120px;
          font-weight: bold;
        }
  
        .state-indicator {
          padding: 5px 15px;
          border-radius: 15px;
          text-align: center;
        }
  
        .state-indicator.sólido {
          background-color: #8d6e63;
        }
  
        .state-indicator.líquido {
          background-color: #42a5f5;
        }
  
        .state-indicator.gasoso {
          background-color: #81c784;
        }
  
        .reactivity-meter {
          width: 200px;
          height: 10px;
          background-color: #424242;
          border-radius: 5px;
          overflow: hidden;
        }
  
        .reactivity-level {
          height: 100%;
          background: linear-gradient(to right, #4caf50, #ffc107, #f44336);
          border-radius: 5px;
        }
  
        .abundance-visualization {
          display: flex;
          gap: 5px;
        }
  
        .abundance-unit {
          width: 20px;
          height: 20px;
          background-color: #424242;
          border-radius: 2px;
          transition: all 0.3s;
        }
  
        .abundance-unit.active {
          background-color: #64b5f6;
          box-shadow: 0 0 5px rgba(100, 181, 246, 0.5);
        }
  
        .applications {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
        }
  
        .application-item {
          display: flex;
          align-items: center;
          background-color: rgba(255, 255, 255, 0.05);
          padding: 10px;
          border-radius: 8px;
          width: calc(50% - 10px);
        }
  
        .application-icon {
          width: 40px;
          height: 40px;
          margin-right: 10px;
          background-size: cover;
          background-position: center;
          border-radius: 50%;
        }
  
        .application-icon.energy {
          background-color: #ffa726;
        }
  
        .application-icon.atmosphere {
          background-color: #81c784;
        }
  
        .application-icon.industrial {
          background-color: #90a4ae;
        }
  
        .application-icon.electronics {
          background-color: #64b5f6;
        }
  
        .application-icon.jewelry {
          background-color: #ffd54f;
        }
  
        .application-icon.nuclear {
          background-color: #e57373;
        }
  
        .application-icon.biological {
          background-color: #ba68c8;
        }
  
        /* Estilos para o componente de busca */
        .search-bar {
          display: flex;
          justify-content: center;
          margin: 20px 0;
          animation: fadeIn 1.5s;
        }
  
        .search-bar input {
          width: 100%;
          max-width: 500px;
          padding: 12px 20px;
          border-radius: 30px;
          border: none;
          background-color: rgba(255, 255, 255, 0.1);
          color: #fff;
          font-size: 1rem;
          transition: all 0.3s;
        }
  
        .search-bar input:focus {
          outline: none;
          background-color: rgba(255, 255, 255, 0.15);
          box-shadow: 0 0 10px rgba(79, 195, 247, 0.3);
        }
  
        /* Animação introdutória */
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
          background-color: #121212;
          z-index: 9999;
          animation: fadeOut 1s ease-in-out 2s forwards;
        }
  
        .atoms-animation {
          position: relative;
          width: 200px;
          height: 200px;
          margin-bottom: 30px;
        }
  
        .atom {
          position: absolute;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          opacity: 0.7;
          animation: float 3s infinite alternate;
        }
  
        .atom-1 {
          background-color: #f44336;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          animation-delay: 0s;
        }
  
        .atom-2 {
          background-color: #4fc3f7;
          bottom: 0;
          left: 0;
          animation-delay: 0.5s;
        }
  
        .atom-3 {
          background-color: #81c784;
          bottom: 0;
          right: 0;
          animation-delay: 1s;
        }
  
        .intro-title {
          font-size: 4rem;
          color: #4fc3f7;
          margin-bottom: 10px;
          text-shadow: 0 0 20px rgba(79, 195, 247, 0.7);
          animation: pulse 2s infinite;
        }
  
        .intro-subtitle {
          font-size: 1.5rem;
          color: #bbdefb;
        }
  
        /* Animações */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
  
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; visibility: hidden; }
        }
  
        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
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
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
  
        @keyframes float {
          from { transform: translateY(0); }
          to { transform: translateY(-20px); }
        }
  
        /* Responsividade */
        @media (max-width: 1200px) {
          .element, .element-placeholder {
            width: 60px;
            height: 60px;
          }
          
          .element-symbol {
            font-size: 1.2rem;
          }
          
          .element-name, .element-mass {
            font-size: 0.55rem;
          }
        }
  
        @media (max-width: 900px) {
          .element, .element-placeholder {
            width: 50px;
            height: 50px;
          }
          
          .element-symbol {
            font-size: 1rem;
          }
          
          .element-name {
            display: none;
          }
          
          .element-mass {
            font-size: 0.5rem;
          }
          
          .application-item {
            width: 100%;
          }
        }
  
        @media (max-width: 700px) {
          .element, .element-placeholder {
            width: 40px;
            height: 40px;
          }
          
          .element-symbol {
            font-size: 0.8rem;
          }
          
          .element-mass {
            font-size: 0.4rem;
          }
          
          .basic-info {
            flex-direction: column;
            align-items: center;
          }
          
          .orbital-animation {
            margin-bottom: 20px;
          }
        }
      `}</style>
    </div>
  );
}
export default App;