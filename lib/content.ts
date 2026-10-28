// Every number on the page comes from the paper (PROPOR 2026, pp. 103–110).
// Topic weights are read off Figure 1 and are approximate.

export type Lang = 'pt' | 'en';
export const langs: Lang[] = ['pt', 'en'];

export const links = {
  paper: 'https://aclanthology.org/2026.propor-1.10/',
  pdf: '/2026.propor-1.10.pdf',
  code: 'https://github.com/Eni19/aries_topic_selector',
  github: 'https://github.com/Eni19',
  linkedin: 'https://www.linkedin.com/in/enrique-susin-3a4a36234/',
  email: 'enrique.susin@unifesp.br',
};

export type SourceId = 'twitter' | 'g1' | 'gov';

export const keywordsOrder = ['antibiotic', 'bacteria', 'tuberculosis', 'uti', 'sepsis', 'pneumonia', 'amoxicillin', 'resistance'] as const;
export type Keyword = (typeof keywordsOrder)[number];

// Table 1. null = keyword not collected for that source.
export const docsByKeyword: Record<SourceId, Record<Keyword, number | null>> = {
  twitter: { antibiotic: 16203, bacteria: null, tuberculosis: 7888, uti: 6657, sepsis: null, pneumonia: 5117, amoxicillin: 15871, resistance: 12489 },
  g1: { antibiotic: 596, bacteria: 598, tuberculosis: 594, uti: 593, sepsis: 586, pneumonia: 597, amoxicillin: 203, resistance: 596 },
  gov: { antibiotic: 129, bacteria: 181, tuberculosis: 792, uti: 66, sepsis: 13, pneumonia: 304, amoxicillin: 6, resistance: 24 },
};
export const sourceTotals: Record<SourceId, number> = { twitter: 64225, g1: 4363, gov: 1515 };
export const keywordTotals: Record<Keyword, number> = {
  antibiotic: 16928, bacteria: 779, tuberculosis: 9274, uti: 7316, sepsis: 599, pneumonia: 6018, amoxicillin: 16080, resistance: 13109,
};

export const metrics = {
  gsdmm: { coherence: 0.4471, diversity: 0.7467 },
  bertopic: { coherence: 0.5032, diversity: 0.9278 },
};

export type Topic = { id: number; words: { w: string; v: number }[] };
export const topics: Topic[] = [
  { id: 0, words: [{ w: 'mutação', v: 0.043 }, { w: 'vírus', v: 0.036 }, { w: 'bactéria', v: 0.029 }, { w: 'vacina', v: 0.026 }, { w: 'antibiótico', v: 0.015 }] },
  { id: 1, words: [{ w: 'infecção', v: 0.046 }, { w: 'vírus', v: 0.019 }, { w: 'medicação', v: 0.016 }, { w: 'doença', v: 0.013 }, { w: 'ignorar', v: 0.012 }] },
  { id: 4, words: [{ w: 'antibiótico', v: 0.036 }, { w: 'antimicrobiano', v: 0.034 }, { w: 'azitromicina', v: 0.031 }, { w: 'bacteriano', v: 0.016 }, { w: 'infectar', v: 0.016 }] },
  { id: 5, words: [{ w: 'antibiótico', v: 0.031 }, { w: 'clavulanato', v: 0.03 }, { w: 'amigdalite', v: 0.021 }, { w: 'azitromicina', v: 0.02 }, { w: 'antimicrobiano', v: 0.02 }] },
];

const pt = {
  langName: 'Português',
  other: { lang: 'en' as Lang, label: 'English' },
  meta: {
    title: 'Como o Brasil fala de superbactérias · Enrique Reis Susin',
    description:
      'Modelagem de tópicos com BERTimbau e BERTopic em 70.103 textos em português sobre resistência antimicrobiana. Artigo publicado no PROPOR 2026.',
  },
  nav: { data: 'Dados', method: 'Método', findings: 'Achados', contact: 'Contato', skip: 'Pular para o conteúdo' },
  hero: {
    title: ['Como o Brasil fala', 'de superbactérias'],
    lead: 'Usei um modelo de linguagem treinado em português para ler 70.103 textos (tweets, notícias do G1 e publicações do governo) e descobrir como cada um fala sobre resistência a antibióticos.',
    venue: 'Artigo publicado no PROPOR 2026, ACL Anthology',
    cta: 'Ler o artigo',
    code: 'Ver o código',
    dishLabel: 'Placa de antibiograma: discos de antibiótico com halos de inibição; um disco sem halo representa uma bactéria resistente.',
  },
  intro: {
    parts: [
      'Bactérias resistentes podem matar mais que o câncer até 2050',
      '. E o mau uso de antibióticos começa numa conversa',
      ': na rede social, no jornal, na farmácia',
      '.',
    ],
    source: 'Projeção do relatório O’Neill (2016), citada no artigo.',
  },
  voices: {
    title: 'Três vozes, um mesmo tema',
    plateAlt: 'Antibiograma em ágar sangue: discos brancos com halos claros onde a bactéria não cresceu.',
    tabsLabel: 'Fonte dos textos',
    sources: {
      twitter: {
        name: 'Twitter / X',
        title: 'O público',
        text: 'Discurso espontâneo e fragmentado: relatos pessoais, ironia, piadas e desinformação. Coletado de 2008 a 2025 pela TwitterAPI.io.',
        register: 'Informal',
      },
      g1: {
        name: 'G1',
        title: 'A imprensa',
        text: 'Jornalismo que traduz a ciência para o público: surtos em hospitais, pesquisas, alertas da OMS. Raspagem automatizada das seções de ciência e saúde.',
        register: 'Mediador',
      },
      gov: {
        name: 'gov.br',
        title: 'O governo',
        text: 'Comunicação oficial: protocolos clínicos, campanhas de saúde e tratamento gratuito pelo SUS. Raspagem automatizada de sites do governo federal.',
        register: 'Institucional',
      },
    },
    docs: 'documentos',
    tone: 'registro',
    chartTitle: 'Documentos por palavra-chave',
    keywords: {
      antibiotic: 'Antibiótico', bacteria: 'Bactéria', tuberculosis: 'Tuberculose', uti: 'Infecção urinária',
      sepsis: 'Sepse', pneumonia: 'Pneumonia', amoxicillin: 'Amoxicilina', resistance: 'Resistência',
    },
  },
  pipeline: {
    title: 'Do ruído ao tema',
    lead: 'Uma frase ilustrativa atravessando o pipeline. Nenhum tweet real é exibido: os dados foram anonimizados e usados só para pesquisa.',
    raw: '@fulano tomei amoxicilina por três dias e parei no meio kkkkk já melhorei rsrs https://t.co/…',
    rawNoise: ['@fulano', 'kkkkk', 'rsrs', 'https://t.co/…'],
    tokens: ['tomar', 'amoxicilina', 'três', 'dia', 'parar', 'meio', 'melhorar'],
    stages: [
      { name: 'Primeiro, limpar', text: 'Duplicatas, menções, links, risadas e emojis saem. O LangDetect descarta o que não é português.' },
      { name: 'Depois, lematizar', text: 'O spaCy em português separa as palavras, remove stopwords e reduz cada uma à sua raiz.' },
      { name: 'Então, ler o sentido', text: 'O BERTimbau transforma cada texto num vetor de 768 números que guarda o seu significado.' },
      { name: 'Por fim, agrupar', text: 'UMAP reduz o vetor, HDBSCAN encontra grupos densos e o BERTopic nomeia cada tema. Para tuberculose, foram sete rodadas de refinamento.' },
    ],
    vectorLabel: 'vetor de 768 dimensões',
    clusterLabel: 'textos parecidos formam um tema',
  },
  results: {
    title: 'O modelo moderno leu melhor',
    diversity: { figure: '+24%', caption: 'mais diversidade entre os temas encontrados' },
    coherence: { figure: '+12,5%', caption: 'mais coerência dentro de cada tema' },
    corpus: { figure: '70.103', caption: 'textos em português analisados' },
    tableCaption: 'BERTopic (com BERTimbau) contra GSDMM, o modelo probabilístico de referência para textos curtos.',
    model: 'Modelo', coherenceCol: 'Coerência (Cv)', diversityCol: 'Diversidade',
    note: 'A coerência absoluta é baixa nos dois modelos, como é esperado em textos curtos e ruidosos. O ganho está na comparação: o BERTopic separou melhor o que era informação do que era ruído, e seus temas repetiram menos palavras.',
  },
  dish: {
    title: 'O que a IA encontrou',
    lead: 'Quatro temas que o BERTopic extraiu dos tweets. Toque num disco para abrir o seu halo.',
    topicWord: 'Tema',
    weightsNote: 'Pesos c-TF-IDF aproximados, lidos da Figura 1 do artigo.',
    topics: {
      0: { name: 'Vírus, bactéria, tudo junto', text: 'Vírus, bactéria, vacina e antibiótico aparecem lado a lado. Sinal de que o público confunde os tipos de patógeno, e quem acha que antibiótico cura vírus usa antibiótico errado.' },
      1: { name: 'Ignorar os sintomas', text: 'Infecção, medicação, doença e o verbo “ignorar”. Relatos de quem deixou o sintoma para depois ou se automedicou, um padrão ligado a tratamento tardio.' },
      4: { name: 'O vocabulário técnico', text: 'Antimicrobiano, bacteriano, azitromicina: o tema mais técnico. A azitromicina domina o corpus, pela prescrição comum e pela polêmica recente em saúde.' },
      5: { name: 'Do diagnóstico à receita', text: 'Amigdalite ligada ao seu tratamento padrão, amoxicilina com clavulanato e azitromicina. O modelo captou relatos pessoais de tratamento.' },
    } as Record<number, { name: string; text: string }>,
  },
  narratives: {
    title: 'Cada voz tem um papel',
    sourcesCount: (n: number) => `${n} fontes`,
    groups: [
      {
        name: 'Resistência bacteriana',
        items: [
          { source: 'twitter' as SourceId, title: 'Do campo ao meme', text: 'Antibiótico na pecuária e na agricultura; relatos pessoais e desinformação em tom irônico. Um subgrupo técnico fala de plasmídeo, KPC e superbactéria.' },
          { source: 'g1' as SourceId, title: 'Surto e laboratório', text: 'Infecção hospitalar, mortalidade neonatal e pesquisa sobre Klebsiella e plasmídeos, com OMS e USP como vozes de autoridade.' },
        ],
      },
      {
        name: 'Tuberculose',
        items: [
          { source: 'twitter' as SourceId, title: 'Quatro dimensões', text: 'Sintomas e diagnóstico; coinfecções como aids, hepatite e sífilis; saneamento e determinantes sociais; e discussão técnica sobre o bacilo.' },
          { source: 'g1' as SourceId, title: 'Campanha e ciência', text: 'Alertas de prevenção e vacinação, estudos sobre tuberculose multirresistente e o olhar global da OMS e da ONU.' },
          { source: 'gov' as SourceId, title: 'Protocolo e acesso', text: 'Diretrizes clínicas, protocolos de tratamento e campanhas sobre o tratamento gratuito pelo SUS.' },
        ],
      },
    ],
    crossTitle: 'Onde as três vozes se encontram',
    crossText: 'Resistência antimicrobiana e coinfecção por HIV aparecem em todas as fontes. São pontos de partida para uma vigilância em saúde que escute, ao mesmo tempo, a rede social, a imprensa e o governo.',
    crossAlt: 'Pilhas de placas de antibiograma num laboratório.',
  },
  conclusion: {
    title: 'O que o estudo mostra',
    statement:
      'Ler juntos rede social, imprensa e governo com IA mostra como circula a informação sobre resistência bacteriana, e onde a saúde pública deve agir.',
    points: [
      { title: 'Funciona até no ruído', text: 'Mesmo no Twitter, com ironia, piadas e erros de digitação, deu para extrair temas coerentes e separar relato pessoal, humor e desinformação de discussão técnica e educativa.' },
      { title: 'Cada fonte tem sua voz', text: 'No G1 e no gov.br, a terminologia foi mais consistente: a imprensa faz a mediação entre ciência e público, e o governo fala com caráter normativo.' },
      { title: 'Onde vale a pena vigiar', text: 'Resistência antimicrobiana e coinfecção por HIV se cruzam em todas as fontes. São nós de alto valor para um monitoramento automatizado.' },
    ],
    nextTitle: 'Próximos passos',
    next: 'Usar LLMs para transformar textos curtos em documentos mais ricos antes da modelagem, testar inferência de tópicos por prompt e avaliar os temas com especialistas, por exemplo com testes de intrusão de palavras.',
  },
  about: {
    statement: 'Dados pela saúde pública',
    built: { title: 'O que eu construí', text: 'Coleta automatizada (TwitterAPI.io e raspagem do G1 e do gov.br), pipeline de limpeza para o português, modelagem com BERTimbau, BERTopic e GSDMM, e avaliação por coerência e diversidade. Python, spaCy, sentence-transformers, UMAP e HDBSCAN.' },
    with: { title: 'Com quem', text: 'Com orientação da Profa. Lilian Berton, no Instituto de Ciência e Tecnologia da UNIFESP.' },
    cta: 'Código no GitHub',
    photoAlt: 'Oswaldo Cruz ao microscópio no laboratório de Manguinhos, em 1910.',
    photoCaption: 'Oswaldo Cruz em Manguinhos, 1910.',
  },
  contact: {
    title: 'Vamos conversar?',
    text: 'Estou aberto a vagas e projetos em IA, NLP e ciência de dados.',
    name: 'Seu nome', company: 'Empresa', email: 'Seu e-mail', message: 'Mensagem',
    submit: 'Escrever para o Enrique',
    subject: 'Contato pelo site do artigo',
  },
  footer: {
    markLabel: 'As oito palavras-chave da coleta, cada halo do tamanho do seu volume de documentos.',
    cite: 'Copiar citação (BibTeX)',
    copied: 'Citação copiada',
    pdf: 'PDF do artigo',
    credits: 'Imagens',
    authors: 'Enrique Reis Susin e Lilian Berton · UNIFESP',
    top: 'Voltar ao topo',
  },
};

type Dict = typeof pt;

const en: Dict = {
  langName: 'English',
  other: { lang: 'pt', label: 'Português' },
  meta: {
    title: 'How Brazil talks about superbugs · Enrique Reis Susin',
    description:
      'Topic modeling with BERTimbau and BERTopic on 70,103 Brazilian Portuguese texts about antimicrobial resistance. Published at PROPOR 2026.',
  },
  nav: { data: 'Data', method: 'Method', findings: 'Findings', contact: 'Contact', skip: 'Skip to content' },
  hero: {
    title: ['How Brazil talks', 'about superbugs'],
    lead: 'I used a language model trained on Portuguese to read 70,103 texts (tweets, G1 news and government publications) and find out how each of them talks about antibiotic resistance.',
    venue: 'Published at PROPOR 2026, ACL Anthology',
    cta: 'Read the paper',
    code: 'See the code',
    dishLabel: 'Antibiogram plate: antibiotic disks with inhibition halos; one disk without a halo stands for a resistant bacterium.',
  },
  intro: {
    parts: [
      'Resistant bacteria may kill more than cancer by 2050',
      '. And antibiotic misuse starts in a conversation',
      ': online, in the news, at the pharmacy',
      '.',
    ],
    source: 'Projection from the O’Neill report (2016), cited in the paper.',
  },
  voices: {
    title: 'Three voices, one subject',
    plateAlt: 'Antibiogram on blood agar: white disks with clear halos where the bacteria did not grow.',
    tabsLabel: 'Text source',
    sources: {
      twitter: {
        name: 'Twitter / X',
        title: 'The public',
        text: 'Spontaneous, fragmented talk: personal stories, irony, jokes and misinformation. Collected from 2008 to 2025 through TwitterAPI.io.',
        register: 'Informal',
      },
      g1: {
        name: 'G1',
        title: 'The press',
        text: 'Journalism that translates science for the public: hospital outbreaks, research, WHO alerts. Scraped from the science and health sections.',
        register: 'Mediator',
      },
      gov: {
        name: 'gov.br',
        title: 'The government',
        text: 'Official communication: clinical protocols, health campaigns and free treatment through SUS, Brazil’s public health system. Scraped from federal sites.',
        register: 'Institutional',
      },
    },
    docs: 'documents',
    tone: 'register',
    chartTitle: 'Documents per keyword',
    keywords: {
      antibiotic: 'Antibiotic', bacteria: 'Bacteria', tuberculosis: 'Tuberculosis', uti: 'Urinary infection',
      sepsis: 'Sepsis', pneumonia: 'Pneumonia', amoxicillin: 'Amoxicillin', resistance: 'Resistance',
    },
  },
  pipeline: {
    title: 'From noise to topics',
    lead: 'One illustrative sentence (in Portuguese, as the data was) going through the pipeline. No real tweet is shown: the data was anonymized and used for research only.',
    raw: pt.pipeline.raw,
    rawNoise: pt.pipeline.rawNoise,
    tokens: pt.pipeline.tokens,
    stages: [
      { name: 'First, clean', text: 'Duplicates, mentions, links, laughter and emoji go. LangDetect drops anything that is not Portuguese.' },
      { name: 'Then, lemmatize', text: 'Portuguese spaCy splits the words, removes stopwords and reduces each one to its root.' },
      { name: 'Next, read the meaning', text: 'BERTimbau turns each text into a vector of 768 numbers that holds what it means.' },
      { name: 'Finally, group', text: 'UMAP compresses the vector, HDBSCAN finds dense groups and BERTopic names each topic. Tuberculosis took seven rounds of refinement.' },
    ],
    vectorLabel: '768-dimension vector',
    clusterLabel: 'similar texts form a topic',
  },
  results: {
    title: 'The modern model read better',
    diversity: { figure: '+24%', caption: 'more diversity between the topics found' },
    coherence: { figure: '+12.5%', caption: 'more coherence within each topic' },
    corpus: { figure: '70,103', caption: 'Portuguese texts analyzed' },
    tableCaption: 'BERTopic (with BERTimbau) against GSDMM, the probabilistic baseline for short texts.',
    model: 'Model', coherenceCol: 'Coherence (Cv)', diversityCol: 'Diversity',
    note: 'Absolute coherence is low for both models, as expected for short, noisy texts. The gain is in the comparison: BERTopic separated information from noise better, and its topics repeated fewer words.',
  },
  dish: {
    title: 'What the AI found',
    lead: 'Four topics BERTopic pulled out of the tweets. Tap a disk to open its halo.',
    topicWord: 'Topic',
    weightsNote: 'Approximate c-TF-IDF weights, read from Figure 1 of the paper. Words stay in Portuguese, as the model saw them.',
    topics: {
      0: { name: 'Virus, bacteria, all at once', text: 'Virus, bacteria, vaccine and antibiotic sit side by side. A sign the public mixes up pathogen types, and whoever thinks antibiotics cure viruses uses them wrong.' },
      1: { name: 'Ignoring the symptoms', text: 'Infection, medication, disease and the verb “to ignore”. Stories of putting symptoms off or self-medicating, a pattern linked to late treatment.' },
      4: { name: 'The technical vocabulary', text: 'Antimicrobial, bacterial, azithromycin: the most technical topic. Azithromycin dominates the corpus, through common prescription and recent health controversy.' },
      5: { name: 'From diagnosis to prescription', text: 'Tonsillitis linked to its standard treatment, amoxicillin with clavulanate and azithromycin. The model caught personal treatment stories.' },
    },
  },
  narratives: {
    title: 'Each voice plays a part',
    sourcesCount: (n: number) => `${n} sources`,
    groups: [
      {
        name: 'Bacterial resistance',
        items: [
          { source: 'twitter', title: 'From farm to meme', text: 'Antibiotics in livestock and farming; personal stories and misinformation in an ironic tone. A technical subgroup talks plasmids, KPC and superbugs.' },
          { source: 'g1', title: 'Outbreak and lab', text: 'Hospital infection, neonatal mortality and research on Klebsiella and plasmids, with WHO and USP as voices of authority.' },
        ],
      },
      {
        name: 'Tuberculosis',
        items: [
          { source: 'twitter', title: 'Four dimensions', text: 'Symptoms and diagnosis; coinfections such as AIDS, hepatitis and syphilis; sanitation and social determinants; and technical talk about the bacillus.' },
          { source: 'g1', title: 'Campaign and science', text: 'Prevention and vaccination alerts, studies on multidrug-resistant tuberculosis and the global view of WHO and the UN.' },
          { source: 'gov', title: 'Protocol and access', text: 'Clinical guidelines, treatment protocols and campaigns about free treatment through SUS.' },
        ],
      },
    ],
    crossTitle: 'Where the three voices meet',
    crossText: 'Antimicrobial resistance and HIV coinfection show up in every source. They are starting points for health surveillance that listens to social media, the press and the government at once.',
    crossAlt: 'Stacks of antibiogram plates in a laboratory.',
  },
  conclusion: {
    title: 'What the study shows',
    statement:
      'Reading social media, the press and the government together with AI shows how information on bacterial resistance spreads, and where public health should act.',
    points: [
      { title: 'It works even in the noise', text: 'Even on Twitter, with irony, jokes and typos, coherent topics emerged, separating personal stories, humor and misinformation from technical and educational talk.' },
      { title: 'Each source has its voice', text: 'G1 and gov.br showed more consistent terminology: the press mediates between science and the public, and the government speaks with normative authority.' },
      { title: 'Where to keep watch', text: 'Antimicrobial resistance and HIV coinfection intersect in every source. They are high-value nodes for automated monitoring.' },
    ],
    nextTitle: 'Next steps',
    next: 'Use LLMs to turn short texts into richer documents before modeling, try prompt-based topic inference, and evaluate topics with experts, for example through word-intrusion tests.',
  },
  about: {
    statement: 'Data for public health',
    built: { title: 'What I built', text: 'Automated collection (TwitterAPI.io and scraping of G1 and gov.br), a cleaning pipeline for Portuguese, modeling with BERTimbau, BERTopic and GSDMM, and evaluation by coherence and diversity. Python, spaCy, sentence-transformers, UMAP and HDBSCAN.' },
    with: { title: 'With whom', text: 'Advised by Prof. Lilian Berton at the Institute of Science and Technology, UNIFESP.' },
    cta: 'Code on GitHub',
    photoAlt: 'Oswaldo Cruz at the microscope in the Manguinhos laboratory, 1910.',
    photoCaption: 'Oswaldo Cruz at Manguinhos, 1910.',
  },
  contact: {
    title: 'Shall we talk?',
    text: 'I am open to roles and projects in AI, NLP and data science.',
    name: 'Your name', company: 'Company', email: 'Your email', message: 'Message',
    submit: 'Write to Enrique',
    subject: 'Contact from the paper site',
  },
  footer: {
    markLabel: 'The eight collection keywords, each halo sized by its number of documents.',
    cite: 'Copy citation (BibTeX)',
    copied: 'Citation copied',
    pdf: 'Paper PDF',
    credits: 'Images',
    authors: 'Enrique Reis Susin and Lilian Berton · UNIFESP',
    top: 'Back to top',
  },
};

export const dict: Record<Lang, Dict> = { pt, en };
export type { Dict };

export const bibtex = `@inproceedings{susin-berton-2026-topic,
  title     = {Topic Modeling in Brazilian Portuguese Documents on Antimicrobial Resistance},
  author    = {Susin, Enrique Reis and Berton, Lilian},
  booktitle = {Proceedings of the 17th International Conference on Computational Processing of Portuguese (PROPOR 2026)},
  volume    = {1},
  pages     = {103--110},
  year      = {2026},
  publisher = {Association for Computational Linguistics}
}`;

export const credits = [
  { file: 'plate-serratia.jpg', title: 'Serratia marcescens – antibiogram', by: 'Stefan Walkowski', licence: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Serratia_marcescens_-_antibiogram.jpg' },
  { file: 'manguinhos-1910.jpg', title: 'Oswaldo Cruz ao microscópio em Manguinhos, 1910', by: 'Casa de Oswaldo Cruz', licence: 'Domínio público', url: 'https://commons.wikimedia.org/wiki/File:Oswaldo_Cruz_ao_microsc%C3%B3pio_em_laborat%C3%B3rio_de_Manguinhos,_observado_por_seu_filho_Bento_Oswaldo_Cruz_e_por_Burle_de_Figueiredo,_Casa_de_Oswaldo_Cruz_(BR_RJCOC_02-10-20-15-004-010).jpg' },
  { file: 'plates-stack.jpg', title: 'Antibiotic susceptibility disk diffusion', by: 'Microrao', licence: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Antibiotic_susceptibility_disk_diffusion.jpg' },
];
