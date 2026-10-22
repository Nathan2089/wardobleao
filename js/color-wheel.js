/* ==========================================================================
   Color Wheel & Temperature AI Engine — WardrobeAI
   Análise Cromática, Círculo de 12 Cores, Harmonias e Temperatura
   ========================================================================== */

const ColorWheelAI = {
  /* ---------- 1. Definições do Círculo Cromático (360°) ---------- */
  PALETTE: {
    vermelho: {
      name: 'Vermelho',
      angle: 0,
      hex: '#C45B5B',
      accentHex: '#E06A6A',
      temp: 'warm',
      family: 'primaria',
      label: 'Quente • Vibrante',
      description: 'Energia, presença marcante e paixão'
    },
    laranja: {
      name: 'Laranja',
      angle: 30,
      hex: '#DE6B35',
      accentHex: '#F07D48',
      temp: 'warm',
      family: 'secundaria',
      label: 'Quente • Solar',
      description: 'Vitalidade, entusiasmo e criatividade'
    },
    marrom: {
      name: 'Marrom',
      angle: 28,
      hex: '#7A5A3A',
      accentHex: '#946E47',
      temp: 'warm',
      family: 'terrosa',
      label: 'Quente • Terroso',
      description: 'Aconchego, solidez, sobriedade e elegância rústica'
    },
    bege: {
      name: 'Bege',
      angle: 38,
      hex: '#C4B59B',
      accentHex: '#D6C8AF',
      temp: 'warm',
      family: 'terrosa',
      label: 'Quente • Neutro Suave',
      description: 'Leveza natural, sofisticação serena e atemporalidade'
    },
    amarelo: {
      name: 'Amarelo',
      angle: 60,
      hex: '#E5B842',
      accentHex: '#F5C852',
      temp: 'warm',
      family: 'primaria',
      label: 'Quente • Luminoso',
      description: 'Luminosidade estival, otimismo e frescor'
    },
    oliva: {
      name: 'Oliva',
      angle: 85,
      hex: '#6B705C',
      accentHex: '#7F856E',
      temp: 'warm',
      family: 'terrosa',
      label: 'Quente • Botânico',
      description: 'Elegância utilitária, equilíbrio orgânico e requinte'
    },
    verde: {
      name: 'Verde',
      angle: 120,
      hex: '#5A7A5A',
      accentHex: '#6B946B',
      temp: 'cool',
      family: 'secundaria',
      label: 'Fria • Equilibrada',
      description: 'Serenidade, harmonia botânica e frescor natural'
    },
    menta: {
      name: 'Menta',
      angle: 160,
      hex: '#68B0AB',
      accentHex: '#7BC7C2',
      temp: 'cool',
      family: 'suave',
      label: 'Fria • Refrescante',
      description: 'Frescor moderno, leveza visual e ar refrescante'
    },
    azul: {
      name: 'Azul',
      angle: 215,
      hex: '#4A6FA5',
      accentHex: '#5D85C2',
      temp: 'cool',
      family: 'primaria',
      label: 'Fria • Serenidade',
      description: 'Confiança, frescor clássico, calma e elegância'
    },
    marinho: {
      name: 'Azul Marinho',
      angle: 225,
      hex: '#1B2A4A',
      accentHex: '#253B66',
      temp: 'cool',
      family: 'profunda',
      label: 'Fria • Profunda',
      description: 'Autoridade sóbria, alfaiataria nobre e sofisticação pura'
    },
    roxo: {
      name: 'Roxo',
      angle: 265,
      hex: '#735399',
      accentHex: '#8763B3',
      temp: 'cool',
      family: 'secundaria',
      label: 'Fria • Enigmática',
      description: 'Originalidade, nobreza e toque criativo refinado'
    },
    rosa: {
      name: 'Rosa',
      angle: 320,
      hex: '#D4A0A0',
      accentHex: '#E5B2B2',
      temp: 'cool',
      family: 'suave',
      label: 'Fria • Delicada',
      description: 'Suavidade contemporânea, sensibilidade e modernidade'
    },
    vinho: {
      name: 'Vinho',
      angle: 350,
      hex: '#722F37',
      accentHex: '#8C3943',
      temp: 'warm',
      family: 'profunda',
      label: 'Quente • Encorpada',
      description: 'Intensidade invernal, requinte e calor aconchegante'
    },

    /* Neutros Universais (Acromáticos - sem ângulo fixo ou ancoragem pura) */
    preto: {
      name: 'Preto',
      angle: null,
      isNeutral: true,
      hex: '#1A1A1A',
      accentHex: '#2D2D2D',
      temp: 'neutral',
      family: 'neutro_universal',
      label: 'Neutra • Sóbria',
      description: 'Poder, minimalismo, contraste máximo e elegância extrema'
    },
    branco: {
      name: 'Branco',
      angle: null,
      isNeutral: true,
      hex: '#F5F5F5',
      accentHex: '#FFFFFF',
      temp: 'neutral',
      family: 'neutro_universal',
      label: 'Neutra • Luminosa',
      description: 'Pureza, frescor absoluto, alta refletância e leveza'
    },
    cinza: {
      name: 'Cinza',
      angle: null,
      isNeutral: true,
      hex: '#8A8A8A',
      accentHex: '#A0A0A0',
      temp: 'neutral',
      family: 'neutro_universal',
      label: 'Neutra • Equilibrada',
      description: 'Modernidade cosmopolita, transição suave e versatilidade'
    }
  },

  /* ---------- 2. Mapeamento Inteligente de Peças para Cores ---------- */
  normalizeColorKey(rawColor, name = '') {
    const hay = `${rawColor || ''} ${name || ''}`.toLowerCase();

    if (/off-white|offwhite|branco|gelo|neve|cru|marfim/.test(hay)) return 'branco';
    if (/preto|black|onix|ônix|carvão/.test(hay)) return 'preto';
    if (/cinza|mescla|grafite|chumbo|prata/.test(hay)) return 'cinza';
    if (/marinho|navy|azul escuro|petróleo/.test(hay)) return 'marinho';
    if (/azul|celeste|denim|indigo|índigo|sky/.test(hay)) return 'azul';
    if (/bege|areia|khaki|cáqui|nude|palha|camel|caramelo/.test(hay)) return 'bege';
    if (/marrom|chocolate|conhaque|café|terra|terracota/.test(hay)) return 'marrom';
    if (/oliva|militar|musgo|sage/.test(hay)) return 'oliva';
    if (/menta|verde claro|ciano|água/.test(hay)) return 'menta';
    if (/verde|esmeralda|floresta/.test(hay)) return 'verde';
    if (/vinho|bordô|bordo|burgundy|marsala/.test(hay)) return 'vinho';
    if (/laranja|coral|tangerina|ferrugem/.test(hay)) return 'laranja';
    if (/amarelo|mostarda|ouro|solar/.test(hay)) return 'amarelo';
    if (/rosa|rose|rosê|salmão|fucsia|fúcsia|magenta/.test(hay)) return 'rosa';
    if (/roxo|violeta|púrpura|lilas|lilás/.test(hay)) return 'roxo';
    if (/vermelho|rubi|escarlate/.test(hay)) return 'vermelho';

    return (rawColor || 'azul').toLowerCase();
  },

  getColorInfo(rawColor, name = '') {
    const key = this.normalizeColorKey(rawColor, name);
    return this.PALETTE[key] || this.PALETTE.azul;
  },

  /* ---------- 3. Cálculo de Distância Angular no Círculo (0° - 180°) ---------- */
  angularDistance(angleA, angleB) {
    if (angleA == null || angleB == null) return null;
    const diff = Math.abs(angleA - angleB) % 360;
    return diff > 180 ? 360 - diff : diff;
  },

  /* ---------- 4. Análise de Harmonia Cromática Completa ---------- */
  analyzeColorHarmony(items) {
    const validItems = items.filter(Boolean);
    if (validItems.length === 0) {
      return {
        type: 'none',
        label: 'Sem Peças',
        score: 0,
        badgeClass: 'neutral',
        colors: [],
        description: 'Selecione peças para analisar a harmonia cromática.'
      };
    }

    const colorInfos = validItems.map(item => ({
      item,
      color: this.getColorInfo(item.color, item.name)
    }));

    const chromaticColors = colorInfos.filter(c => !c.color.isNeutral);
    const neutralColors = colorInfos.filter(c => c.color.isNeutral);

    // Lista única de cores para o gráfico
    const uniqueColorsMap = new Map();
    colorInfos.forEach(c => {
      uniqueColorsMap.set(c.color.name, c.color);
    });
    const uniqueColors = Array.from(uniqueColorsMap.values());

    /* ================= CASO 1: Look Totalmente Acromático ================= */
    if (chromaticColors.length === 0) {
      return {
        type: 'acromatic',
        label: 'Harmonia Acromática Minimalista',
        shortLabel: 'Acromática',
        score: 93,
        badgeClass: 'acromatic',
        harmonyDegree: 95,
        colors: uniqueColors,
        colorList: colorInfos,
        chromaticAngles: [],
        relation: 'Tons neutros universais combinados com perfeição cosmopolita.',
        description: 'Visual minimalista e atemporal combinando preto, branco e cinza sem choque visual.'
      };
    }

    /* ================= CASO 2: Neutros + 1 Cor Focal (Ponto de Cor) ================= */
    if (chromaticColors.length === 1) {
      const focal = chromaticColors[0].color;
      return {
        type: 'neutral_accent',
        label: `Harmonia Neutra com Ponto de Cor (${focal.name})`,
        shortLabel: `Ponto de Cor (${focal.name})`,
        score: 92,
        badgeClass: 'accent',
        harmonyDegree: 94,
        colors: uniqueColors,
        colorList: colorInfos,
        chromaticAngles: [focal.angle],
        relation: `Base neutra sóbria com foco luminoso na peça ${focal.name}.`,
        description: `Infalível e refinada: a base neutra valoriza o tom ${focal.name} como protagonista com equilíbrio impecável.`
      };
    }

    /* ================= CASO 3: Duas ou Mais Cores Cromáticas ================= */
    // Calcular todas as distâncias angulares par a par
    const angles = chromaticColors.map(c => c.color.angle).filter(a => a != null);
    const pairs = [];
    for (let i = 0; i < angles.length; i++) {
      for (let j = i + 1; j < angles.length; j++) {
        pairs.push({
          c1: chromaticColors[i].color,
          c2: chromaticColors[j].color,
          dist: this.angularDistance(angles[i], angles[j])
        });
      }
    }

    // Distância angular máxima e média
    const maxDist = Math.max(...pairs.map(p => p.dist));
    const minDist = Math.min(...pairs.map(p => p.dist));
    const avgDist = pairs.reduce((sum, p) => sum + p.dist, 0) / pairs.length;

    /* --- 3A. Monocromático (Tom sobre Tom) --- */
    // Todas as cores a menos de 28° entre si no círculo
    if (maxDist <= 28) {
      const mainHue = chromaticColors[0].color.name;
      return {
        type: 'monochromatic',
        label: `Harmonia Monocromática (Tom sobre Tom em ${mainHue})`,
        shortLabel: `Monocromático (${mainHue})`,
        score: 96,
        badgeClass: 'monochromatic',
        harmonyDegree: 98,
        colors: uniqueColors,
        colorList: colorInfos,
        chromaticAngles: angles,
        relation: `Variações harmônicas de luminosidade e saturação na mesma família cromática (${mainHue}).`,
        description: `Alongamento de silhueta sofisticado e visual de alta moda minimalista explorando a mesma nuance.`
      };
    }

    /* --- 3B. Harmonia Complementar (Contraste Oposto no Círculo: ~135° a ~180°) --- */
    const complementaryPair = pairs.find(p => p.dist >= 135 && p.dist <= 180);
    if (complementaryPair) {
      const { c1, c2, dist } = complementaryPair;
      return {
        type: 'complementary',
        label: `Harmonia Complementar (${c1.name} ↔ ${c2.name})`,
        shortLabel: `Complementar (${c1.name} + ${c2.name})`,
        score: 95,
        badgeClass: 'complementary',
        harmonyDegree: 96,
        colors: uniqueColors,
        colorList: colorInfos,
        chromaticAngles: angles,
        relation: `Oposição calculada no círculo cromático (${Math.round(dist)}° de separação).`,
        description: `Contraste vibrante de alta energia onde as cores opostas (${c1.name} e ${c2.name}) se potencializam mutuamente.`
      };
    }

    /* --- 3C. Harmonia Análoga (Cores Vizinhas: ~25° a ~95°) --- */
    if (maxDist <= 95) {
      const names = Array.from(new Set(chromaticColors.map(c => c.color.name))).join(' + ');
      return {
        type: 'analogous',
        label: `Harmonia Análoga (${names})`,
        shortLabel: `Análoga (${names})`,
        score: 94,
        badgeClass: 'analogous',
        harmonyDegree: 95,
        colors: uniqueColors,
        colorList: colorInfos,
        chromaticAngles: angles,
        relation: `Tons vizinhos adjacentes no círculo cromático (${Math.round(avgDist)}° de separação).`,
        description: `Transição cromática suave e orgânica, que transmite serenidade e apurado senso estético contemporâneo.`
      };
    }

    /* --- 3D. Harmonia Triádica / Semi-Complementar --- */
    if (maxDist >= 105 && maxDist <= 135) {
      const names = Array.from(new Set(chromaticColors.map(c => c.color.name))).join(' + ');
      return {
        type: 'triadic',
        label: `Harmonia Triádica Dinâmica (${names})`,
        shortLabel: `Triádica (${names})`,
        score: 88,
        badgeClass: 'triadic',
        harmonyDegree: 90,
        colors: uniqueColors,
        colorList: colorInfos,
        chromaticAngles: angles,
        relation: `Divisão geométrica equilibrada em terços do círculo cromático.`,
        description: `Visual rico, marcante e expressivo para ocasiões que pedem personalidade e estilo marcante.`
      };
    }

    /* --- 3E. Harmonia Eclética com Neutros --- */
    if (neutralColors.length >= 2) {
      return {
        type: 'neutral_balanced',
        label: 'Harmonia Equilibrada por Neutros',
        shortLabel: 'Equilíbrio Neutro',
        score: 85,
        badgeClass: 'balanced',
        harmonyDegree: 86,
        colors: uniqueColors,
        colorList: colorInfos,
        chromaticAngles: angles,
        relation: 'Presença dominante de bases neutras amortecendo a distância cromática.',
        description: 'Os neutros atuam como anteparos elegantes, integrando as peças com bom gosto contemporâneo.'
      };
    }

    /* --- 3F. Contraste Dissonante --- */
    return {
      type: 'dissonant',
      label: 'Contraste Cromático Ousado / Dissonante',
      shortLabel: 'Dissonante',
      score: 55,
      badgeClass: 'dissonant',
      harmonyDegree: 60,
      colors: uniqueColors,
      colorList: colorInfos,
      chromaticAngles: angles,
      relation: 'Cores sem ancoragem geométrica no círculo cromático.',
      description: 'Cores distantes entre si sem ponte neutra suficiente. Recomendamos harmonizar com tons análogos ou complementares.'
    };
  },

  /* ---------- 5. Análise Térmica: Clima x Temperatura da Cor ---------- */
  analyzeTemperatureSynergy(items, weather) {
    const validItems = items.filter(Boolean);
    const tempCelsius = typeof weather.temp === 'number' ? weather.temp : 22;
    const rainy = !!weather.rainy;

    let band = 'ameno';
    if (tempCelsius < 17) band = 'frio';
    else if (tempCelsius >= 24) band = 'calor';

    // Contagem de temperaturas das peças
    let warmCount = 0;
    let coolCount = 0;
    let neutralCount = 0;
    let lightColorCount = 0;
    let darkColorCount = 0;

    validItems.forEach(item => {
      const c = this.getColorInfo(item.color, item.name);
      if (c.temp === 'warm') warmCount++;
      else if (c.temp === 'cool') coolCount++;
      else neutralCount++;

      // Cores claras vs escuras (albedo térmico)
      if (['branco', 'bege', 'menta', 'cinza'].includes(this.normalizeColorKey(item.color, item.name))) {
        lightColorCount++;
      } else if (['preto', 'marinho', 'marrom', 'vinho'].includes(this.normalizeColorKey(item.color, item.name))) {
        darkColorCount++;
      }
    });

    const total = validItems.length || 1;
    let tempScore = 70;
    let thermalTag = '';
    let thermalDescription = '';

    /* ================= CLIMA: CALOR (>= 24°C) ================= */
    if (band === 'calor') {
      // No calor, cores frias e cores claras refletem luz e dão sensação refrescante
      const coolLightRatio = (coolCount + lightColorCount) / (total * 2);
      tempScore += Math.round(coolLightRatio * 30);

      // Penalidade se for look 100% escuro e quente no sol forte
      if (darkColorCount >= 3 && warmCount >= 2) tempScore -= 25;

      if (lightColorCount >= 2 && coolCount >= 1) {
        thermalTag = 'Paleta Fria & Refrescante';
        thermalDescription = `Tons claros e frescos otimizados para os ${tempCelsius}°C de hoje, promovendo refletância térmica e leveza visual.`;
      } else if (coolCount >= 2) {
        thermalTag = 'Paleta Fria Suave';
        thermalDescription = `Nuances refrescantes de azul e verde que trazem conforto psicológico e amenizam a sensação de calor.`;
      } else {
        thermalTag = 'Paleta Neutra de Verão';
        thermalDescription = `Equilíbrio luminoso de tecidos respiráveis e tons neutros com boa dissipação de calor.`;
      }
    }

    /* ================= CLIMA: FRIO (< 17°C) ================= */
    else if (band === 'frio') {
      // No frio, cores quentes, terrosas e profundas transmitem calor e acolhimento
      const warmDarkRatio = (warmCount + darkColorCount) / (total * 2);
      tempScore += Math.round(warmDarkRatio * 30);

      if (warmCount >= 2 || (warmCount >= 1 && darkColorCount >= 2)) {
        thermalTag = 'Paleta Quente & Acolhedora';
        thermalDescription = `Tons terrosos e quentes calibrados para proteger dos ${tempCelsius}°C, criando conforto visual e aconchego térmico.`;
      } else if (darkColorCount >= 2) {
        thermalTag = 'Paleta Invernal Profunda';
        thermalDescription = `Cores profundas e estruturadas com alta retenção de calor e sofisticação para baixas temperaturas.`;
      } else {
        thermalTag = 'Paleta Fria com Camadas';
        thermalDescription = `Isolamento térmico focado na textura das fibras aliado a uma estética sóbria e refinada.`;
      }
    }

    /* ================= CLIMA: AMENO (17°C - 23°C) ================= */
    else {
      // Clima ameno permite versatilidade perfeita
      tempScore += 25;
      thermalTag = 'Paleta Térmica Balanceada';
      thermalDescription = `Harmonia equilibrada entre nuances de meia-estação, ideal para a temperatura versátil de ${tempCelsius}°C.`;
    }

    if (rainy) {
      tempScore += 5;
      thermalDescription += ' Coordenação resistente com tecidos e tons seguros contra respingos.';
    }

    return {
      band,
      tempScore: Math.min(Math.max(tempScore, 30), 100),
      tag: thermalTag,
      description: thermalDescription,
      stats: { warmCount, coolCount, neutralCount, lightColorCount, darkColorCount }
    };
  },

  /* ---------- 6. Otimizador Combinatório Global de Looks ---------- */
  findHarmoniousOutfits(allItems, slots, weather, options = {}) {
    const harmonyPref = options.harmony || 'auto'; // 'auto' | 'monochromatic' | 'analogous' | 'complementary' | 'neutral_accent' | 'acromatic'
    const tempPref = options.temp || 'auto';       // 'auto' | 'warm' | 'cool' | 'neutral'
    const limit = options.limit || 8;

    const slotCandidates = {};
    const band = typeof WeatherModule !== 'undefined' ? WeatherModule.bandKey() : 'ameno';

    // 1. Para cada slot, filtrar e ranquear candidatos adequados ao clima
    slots.forEach(slot => {
      const pool = allItems.filter(item => slot.categories.includes(item.category));
      const scored = pool.map(item => {
        let weatherScore = 50;
        if (typeof WeatherModule !== 'undefined' && WeatherModule.scoreItem) {
          weatherScore = WeatherModule.scoreItem(item, slot.key, band, weather);
        }
        return { item, weatherScore };
      })
      .filter(entry => entry.weatherScore > -100)
      .sort((a, b) => b.weatherScore - a.weatherScore);

      // Manter até os 5 melhores candidatos de cada slot para busca combinatória rápida
      slotCandidates[slot.key] = scored.slice(0, 5).map(s => s.item);
    });

    // 2. Montar combinações válidas (sem IDs duplicados)
    const slotKeys = slots.map(s => s.key);
    let combinations = [{}];

    slotKeys.forEach(key => {
      const itemsForSlot = slotCandidates[key] || [];
      if (itemsForSlot.length === 0) return;

      const nextGen = [];
      combinations.forEach(comb => {
        const usedIds = new Set(Object.values(comb).map(it => it.id));
        itemsForSlot.forEach(it => {
          if (!usedIds.has(it.id)) {
            nextGen.push({ ...comb, [key]: it });
          }
        });
      });

      // Limitar tamanho da geração intermediária para manter performance em <3ms
      combinations = nextGen.slice(0, 120);
    });

    if (combinations.length === 0) return [];

    // 3. Avaliar cada combinação com Círculo Cromático + Temperatura
    const evaluated = combinations.map(comb => {
      const itemsList = Object.values(comb);
      const colorHarmony = this.analyzeColorHarmony(itemsList);
      const tempSynergy = this.analyzeTemperatureSynergy(itemsList, weather);

      let totalScore = 0;

      // Base do clima
      let weatherSum = 0;
      slots.forEach(slot => {
        const it = comb[slot.key];
        if (it && typeof WeatherModule !== 'undefined' && WeatherModule.scoreItem) {
          weatherSum += WeatherModule.scoreItem(it, slot.key, band, weather);
        } else {
          weatherSum += 50;
        }
      });
      totalScore += (weatherSum / (slots.length * 150)) * 40; // 40% peso clima

      // Harmonia Cromática (35% peso)
      totalScore += (colorHarmony.score / 100) * 35;

      // Sinergia de Temperatura da Cor (25% peso)
      totalScore += (tempSynergy.tempScore / 100) * 25;

      // Ajustes de Filtro de Preferência do Usuário
      if (harmonyPref !== 'auto') {
        if (colorHarmony.type === harmonyPref) totalScore += 45;
        else totalScore -= 30;
      }

      if (tempPref !== 'auto') {
        const isWarm = tempSynergy.stats.warmCount > tempSynergy.stats.coolCount;
        const isCool = tempSynergy.stats.coolCount > tempSynergy.stats.warmCount;
        const isNeutral = tempSynergy.stats.neutralCount >= 2;

        if (tempPref === 'warm' && isWarm) totalScore += 40;
        else if (tempPref === 'cool' && isCool) totalScore += 40;
        else if (tempPref === 'neutral' && isNeutral) totalScore += 40;
        else totalScore -= 20;
      }

      return {
        combination: comb,
        itemsList,
        colorHarmony,
        tempSynergy,
        totalScore: Math.round(totalScore * 10) / 10
      };
    });

    // 4. Ordenar pelas melhores combinações harmônicas
    evaluated.sort((a, b) => b.totalScore - a.totalScore);

    return evaluated.slice(0, limit);
  },

  /* ---------- 7. Renderizador do Widget SVG do Círculo Cromático ---------- */
  renderChromaticCircleSVG(colorHarmony, size = 180) {
    const center = size / 2;
    const radius = (size / 2) - 16;
    const innerRadius = radius - 18;
    const colors = colorHarmony.colors || [];
    const chromaticAngles = colorHarmony.chromaticAngles || [];

    // 12 setores do círculo cromático tradicional
    const sectors = [
      { name: 'Vermelho', angle: 0, hex: '#C45B5B' },
      { name: 'Laranja', angle: 30, hex: '#DE6B35' },
      { name: 'Amarelo', angle: 60, hex: '#E5B842' },
      { name: 'Oliva', angle: 90, hex: '#6B705C' },
      { name: 'Verde', angle: 120, hex: '#5A7A5A' },
      { name: 'Menta', angle: 150, hex: '#68B0AB' },
      { name: 'Ciano/Azul', angle: 180, hex: '#4A90A5' },
      { name: 'Azul', angle: 210, hex: '#4A6FA5' },
      { name: 'Marinho', angle: 240, hex: '#2A4374' },
      { name: 'Roxo', angle: 270, hex: '#735399' },
      { name: 'Rosa', angle: 300, hex: '#D4A0A0' },
      { name: 'Vinho', angle: 330, hex: '#722F37' }
    ];

    // Gerar arcos do anel cromático
    const arcPaths = sectors.map((s, idx) => {
      const startAngle = (s.angle - 15) * (Math.PI / 180);
      const endAngle = (s.angle + 15) * (Math.PI / 180);

      const x1 = center + radius * Math.cos(startAngle);
      const y1 = center + radius * Math.sin(startAngle);
      const x2 = center + radius * Math.cos(endAngle);
      const y2 = center + radius * Math.sin(endAngle);

      const xi1 = center + innerRadius * Math.cos(endAngle);
      const yi1 = center + innerRadius * Math.sin(endAngle);
      const xi2 = center + innerRadius * Math.cos(startAngle);
      const yi2 = center + innerRadius * Math.sin(startAngle);

      const d = `M ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} L ${xi1} ${yi1} A ${innerRadius} ${innerRadius} 0 0 0 ${xi2} ${yi2} Z`;

      return `<path d="${d}" fill="${s.hex}" opacity="0.88" />`;
    }).join('');

    // Linhas de harmonia entre os pontos das cores presentes
    let chordLines = '';
    const points = chromaticAngles.map(ang => {
      const rad = ang * (Math.PI / 180);
      const markerRadius = (radius + innerRadius) / 2;
      return {
        x: center + markerRadius * Math.cos(rad),
        y: center + markerRadius * Math.sin(rad),
        angle: ang
      };
    });

    if (points.length >= 2) {
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          chordLines += `<line x1="${points[i].x}" y1="${points[i].y}" x2="${points[j].x}" y2="${points[j].y}" stroke="#FFFFFF" stroke-width="2.5" stroke-dasharray="3,3" opacity="0.9" />`;
        }
      }
    }

    // Marcadores destacados para as cores das peças selecionadas
    const markers = points.map((p, idx) => {
      return `
        <circle cx="${p.x}" cy="${p.y}" r="7" fill="#FFFFFF" stroke="#1A1A1A" stroke-width="2" />
        <circle cx="${p.x}" cy="${p.y}" r="3.5" fill="#2D2D2D" />
      `;
    }).join('');

    // Centro do círculo (Badge de Harmonia ou indicador neutro)
    const centerBadge = `
      <circle cx="${center}" cy="${center}" r="${innerRadius - 6}" fill="var(--bg-card, #FFFFFF)" stroke="var(--border-light, #E5E0DA)" stroke-width="1.5" />
      <text x="${center}" y="${center - 4}" text-anchor="middle" font-size="10" font-weight="700" fill="var(--text-primary, #1A1A1A)">${colorHarmony.harmonyDegree || 95}%</text>
      <text x="${center}" y="${center + 9}" text-anchor="middle" font-size="8" font-weight="600" fill="var(--text-tertiary, #8A8580)">SINTONIA</text>
    `;

    return `
      <svg class="color-wheel-svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        ${arcPaths}
        ${chordLines}
        ${markers}
        ${centerBadge}
      </svg>
    `;
  }
};
