import { PsychologicalTest, Interpretation } from './types';

// --- Option Sets ---
const GAD7_PHQ9_OPTIONS = [
    { value: 0, label: "Nenhuma vez" },
    { value: 1, label: "Vários dias" },
    { value: 2, label: "Mais da metade dos dias" },
    { value: 3, label: "Quase todos os dias" }
];

const ASRS_OPTIONS = [
    { value: 0, label: "Nunca" },
    { value: 1, label: "Raramente" },
    { value: 2, label: "Às vezes" },
    { value: 3, label: "Frequentemente" },
    { value: 4, label: "Muito frequentemente" }
];

const PCL5_OPTIONS = [
    { value: 0, label: "Nada" },
    { value: 1, label: "Um pouco" },
    { value: 2, label: "Moderadamente" },
    { value: 3, label: "Bastante" },
    { value: 4, label: "Extremamente" }
];

const IDATE_ESTADO_OPTIONS = [
    { value: 1, label: "Absolutamente não" },
    { value: 2, label: "Um pouco" },
    { value: 3, label: "Moderadamente" },
    { value: 4, label: "Muito" }
];

const IDATE_TRACO_OPTIONS = [
    { value: 1, label: "Quase nunca" },
    { value: 2, label: "Às vezes" },
    { value: 3, label: "Frequentemente" },
    { value: 4, label: "Quase sempre" }
];

const BDI_OPTIONS = [
    { value: 0, label: "Não me sinto triste." },
    { value: 1, label: "Sinto-me triste." },
    { value: 2, label: "Sinto-me tão triste que não consigo sair disso." },
    { value: 3, label: "Sinto-me tão triste ou infeliz que não aguento mais." }
];

const BSI_OPTIONS = [
  { value: 0, label: "Nada" },
  { value: 1, label: "Pouco" },
  { value: 2, label: "Moderadamente" },
  { value: 3, label: "Bastante" },
  { value: 4, label: "Muitíssimo" }
];


// --- Scoring and Interpretation Logic ---

const sumScores = (answers: Record<string, any>): number => {
    return Object.values(answers).reduce((sum, val) => sum + (Number(val) || 0), 0);
};

const ASRS_SCORING = (answers: Record<string, any>): number => {
    const partA = ['a1', 'a2', 'a3', 'a4', 'a5', 'a6'];
    let score = 0;
    for (const key of partA) {
        if (['a1', 'a2', 'a3'].includes(key) && answers[key] >= 2) score++;
        if (['a4', 'a5', 'a6'].includes(key) && answers[key] >= 3) score++;
    }
    return score;
};

const BDI_INTERPRETATIONS: Interpretation[] = [
    { min: 0, max: 13, level: "Mínima", text: "Sua pontuação sugere um nível mínimo de sintomas depressivos." },
    { min: 14, max: 19, level: "Leve", text: "Sua pontuação sugere um nível leve de sintomas depressivos." },
    { min: 20, max: 28, level: "Moderada", text: "Sua pontuação sugere um nível moderado de sintomas depressivos." },
    { min: 29, max: 63, level: "Severa", text: "Sua pontuação sugere um nível severo de sintomas depressivos." }
];

const PCL5_INTERPRETATIONS: Interpretation[] = [
    { min: 0, max: 37, level: "Baixa probabilidade de TEPT", text: "Sua pontuação sugere que é improvável que você atenda aos critérios para TEPT. No entanto, se você estiver enfrentando sintomas, a ajuda profissional ainda pode ser benéfica." },
    { min: 38, max: 80, level: "Alta probabilidade de TEPT", text: "Sua pontuação sugere uma alta probabilidade de TEPT. É fortemente recomendado que você discuta esses resultados com um profissional de saúde mental para uma avaliação completa." }
];

const ASRS_INTERPRETATIONS: Interpretation[] = [
    { min: 0, max: 3, level: "Improvável ter TDAH", text: "Sua pontuação sugere que é improvável que você tenha TDAH." },
    { min: 4, max: 6, level: "Provável ter TDAH", text: "Sua pontuação sugere que você tem sintomas consistentes com TDAH em adultos. Recomenda-se uma avaliação mais aprofundada por um profissional." }
];

const IDATE_INTERPRETATIONS: Interpretation[] = [
    { min: 20, max: 34, level: "Baixo", text: "Sua pontuação indica um baixo nível de ansiedade." },
    { min: 35, max: 49, level: "Moderado", text: "Sua pontuação indica um nível moderado de ansiedade." },
    { min: 50, max: 64, level: "Alto", text: "Sua pontuação indica um alto nível de ansiedade." },
    { min: 65, max: 80, level: "Muito Alto", text: "Sua pontuação indica um nível muito alto de ansiedade. É aconselhável procurar apoio profissional." }
];


// --- Test Definitions ---

export const PSYCHOLOGICAL_TESTS: PsychologicalTest[] = [
  {
    id: 'bdi2',
    acronym: 'BDI-II',
    name: 'Inventário de Depressão de Beck',
    target: 'Adulto',
    description: 'Avalia a intensidade dos sintomas de depressão. Consiste em 21 itens para avaliar a gravidade da depressão.',
    questions: [
        { id: 'bdi1', type: 'choice', text: 'Tristeza', options: BDI_OPTIONS },
        { id: 'bdi2', type: 'choice', text: 'Pessimismo', options: [{ value: 0, label: "Não estou particularmente pessimista sobre o futuro." }, { value: 1, label: "Sinto-me desanimado sobre o futuro." }, { value: 2, label: "Sinto que não tenho nada pelo que ansiar." }, { value: 3, label: "Sinto que o futuro é sem esperança e que as coisas não podem melhorar." }] },
        { id: 'bdi3', type: 'choice', text: 'Sentimento de Fracasso', options: [{ value: 0, label: "Não me sinto um fracasso." }, { value: 1, label: "Sinto que fracassei mais do que a pessoa comum." }, { value: 2, label: "Quando olho para trás na minha vida, tudo o que vejo é um monte de fracassos." }, { value: 3, label: "Sinto que sou um completo fracasso como pessoa." }] },
        { id: 'bdi4', type: 'choice', text: 'Perda de Prazer', options: [{ value: 0, label: "Tenho tanto prazer nas coisas como sempre tive." }, { value: 1, label: "Não sinto prazer nas coisas como antes." }, { value: 2, label: "Tenho pouco prazer em qualquer coisa." }, { value: 3, label: "Não consigo ter nenhum prazer em nada." }] },
        { id: 'bdi5', type: 'choice', text: 'Sentimentos de Culpa', options: [{ value: 0, label: "Não me sinto particularmente culpado." }, { value: 1, label: "Sinto-me culpado por muitas coisas que fiz ou deveria ter feito." }, { value: 2, label: "Sinto-me bastante culpado na maior parte do tempo." }, { value: 3, label: "Sinto-me culpado o tempo todo." }] },
    ],
    scoring: { calculate: sumScores, interpretations: BDI_INTERPRETATIONS }
  },
  {
    id: 'bsi',
    acronym: 'BSI',
    name: 'Inventário Breve de Sintomas',
    target: 'Adulto',
    description: 'Avalia sintomas psicopatológicos em 9 dimensões. Responda como se sentiu na última semana.',
    questions: [
        { id: 'bsi1', type: 'choice', text: 'Nervosismo ou agitação interior', options: BSI_OPTIONS },
        { id: 'bsi2', type: 'choice', text: 'Sentir-se fraco ou tonto', options: BSI_OPTIONS },
        { id: 'bsi3', type: 'choice', text: 'A ideia de que outra pessoa pode controlar seus pensamentos', options: BSI_OPTIONS },
        { id: 'bsi4', type: 'choice', text: 'Sentir que os outros são culpados pela maioria de seus problemas', options: BSI_OPTIONS },
        { id: 'bsi5', type: 'choice', text: 'Dificuldade de memória', options: BSI_OPTIONS },
        { id: 'bsi6', type: 'choice', text: 'Sentir-se facilmente irritado ou provocado', options: BSI_OPTIONS },
    ],
  },
  {
    id: 'idate-estado',
    acronym: 'IDATE-E',
    name: 'IDATE - Ansiedade Estado',
    target: 'Adulto',
    description: 'Descreve como você se sente AGORA, neste momento. Não há respostas certas ou erradas.',
    questions: [
        { id: 'ide1', type: 'choice', text: 'Sinto-me calmo(a)', options: IDATE_ESTADO_OPTIONS },
        { id: 'ide2', type: 'choice', text: 'Sinto-me seguro(a)', options: IDATE_ESTADO_OPTIONS },
        { id: 'ide3', type: 'choice', text: 'Estou tenso(a)', options: IDATE_ESTADO_OPTIONS },
        { id: 'ide4', type: 'choice', text: 'Estou preocupado(a)', options: IDATE_ESTADO_OPTIONS },
        { id: 'ide5', type: 'choice', text: 'Sinto-me à vontade', options: IDATE_ESTADO_OPTIONS },
    ],
    scoring: { calculate: sumScores, interpretations: IDATE_INTERPRETATIONS }
  },
  {
    id: 'idate-traco',
    acronym: 'IDATE-T',
    name: 'IDATE - Ansiedade Traço',
    target: 'Adulto',
    description: 'Descreve como você GERALMENTE se sente. Não há respostas certas ou erradas.',
    questions: [
        { id: 'idt1', type: 'choice', text: 'Sinto-me agradável', options: IDATE_TRACO_OPTIONS },
        { id: 'idt2', type: 'choice', text: 'Canso-me rapidamente', options: IDATE_TRACO_OPTIONS },
        { id: 'idt3', type: 'choice', text: 'Sinto vontade de chorar', options: IDATE_TRACO_OPTIONS },
        { id: 'idt4', type: 'choice', text: 'Gostaria de ser tão feliz como os outros parecem ser', options: IDATE_TRACO_OPTIONS },
        { id: 'idt5', type: 'choice', text: 'Sinto-me descansado(a)', options: IDATE_TRACO_OPTIONS },
    ],
    scoring: { calculate: sumScores, interpretations: IDATE_INTERPRETATIONS }
  },
  {
    id: 'asrs18',
    acronym: 'ASRS-18',
    name: 'Triagem de TDAH em Adultos',
    target: 'Adulto',
    description: 'Avalia sintomas de TDAH em adultos. Parte A é usada para a triagem inicial.',
    questions: [
        { id: 'a1', type: 'choice', text: 'Com que frequência você comete erros por descuido quando tem que trabalhar num projeto chato ou difícil?', options: ASRS_OPTIONS },
        { id: 'a2', type: 'choice', text: 'Com que frequência você tem dificuldade para manter a atenção quando está fazendo um trabalho chato ou repetitivo?', options: ASRS_OPTIONS },
        { id: 'a3', type: 'choice', text: 'Com que frequência você tem dificuldade para se concentrar no que as pessoas dizem, mesmo quando elas estão falando diretamente com você?', options: ASRS_OPTIONS },
        { id: 'a4', type: 'choice', text: 'Com que frequência você deixa um projeto pela metade depois de já ter feito as partes mais difíceis?', options: ASRS_OPTIONS },
        { id: 'a5', type: 'choice', text: 'Com que frequência você tem dificuldade para fazer um trabalho que exige organização?', options: ASRS_OPTIONS },
        { id: 'a6', type: 'choice', text: 'Quando você precisa fazer algo que exige muita reflexão, com que frequência você evita ou adia o início?', options: ASRS_OPTIONS },
    ],
    scoring: { calculate: ASRS_SCORING, interpretations: ASRS_INTERPRETATIONS }
  },
  {
    id: 'pcl5',
    acronym: 'PCL-5',
    name: 'Triagem de Estresse Pós-Traumático',
    target: 'Adulto',
    description: 'Avalia os 20 sintomas de TEPT do DSM-5. Responda com base no último mês.',
    questions: [
        { id: 'pcl1', type: 'choice', text: 'Lembranças, sonhos ou flashbacks angustiantes e recorrentes do evento estressante?', options: PCL5_OPTIONS },
        { id: 'pcl2', type: 'choice', text: 'Evitar memórias, pensamentos ou sentimentos relacionados ao evento?', options: PCL5_OPTIONS },
        { id: 'pcl3', type: 'choice', text: 'Problemas para lembrar partes importantes do evento?', options: PCL5_OPTIONS },
        { id: 'pcl4', type: 'choice', text: 'Sentimentos negativos fortes como medo, raiva, culpa ou vergonha?', options: PCL5_OPTIONS },
        { id: 'pcl5', type: 'choice', text: 'Perda de interesse em atividades que você costumava gostar?', options: PCL5_OPTIONS },
        { id: 'pcl6', type: 'choice', text: 'Sentir-se distante ou isolado das pessoas?', options: PCL5_OPTIONS },
    ],
    scoring: { calculate: sumScores, interpretations: PCL5_INTERPRETATIONS }
  },
  {
    id: 'proj-fam',
    acronym: 'Projetivo Família',
    name: 'Teste do Desenho da Família',
    target: 'Família',
    description: 'Avaliação da dinâmica e vínculos familiares através da expressão gráfica.',
    questions: [
      { id: 'pf1', type: 'upload', text: 'Em uma folha de papel branca, desenhe a sua família como você a imagina. Tire uma foto nítida e anexe aqui.' },
      { id: 'pf2', type: 'text', text: 'Descreva brevemente quem são as pessoas no desenho e o que elas estão fazendo.' }
    ]
  },
  {
    id: 'proj-child',
    acronym: 'Projetivo Infantil',
    name: 'H.T.P. Infantil',
    target: 'Infantil',
    description: 'Exploração da personalidade e conflitos internos através do desenho da Casa, Árvore e Pessoa.',
    questions: [
      { id: 'pc1', type: 'upload', text: 'Peça para a criança desenhar uma Casa, uma Árvore e uma Pessoa em folhas separadas. Tire fotos e anexe aqui.' },
      { id: 'pc2', type: 'text', text: 'Houve algum comentário da criança durante a execução dos desenhos? Descreva aqui.' }
    ]
  }
];
