import { useEffect, useMemo, useRef, useState } from 'react';

// TODO: substituir estes três destinos pelos checkouts oficiais da nova oferta.
// Mantenha os links centralizados aqui para não espalhar URLs comerciais pelo código.
const BASIC_CHECKOUT_URL = 'https://pay.kiwify.com.br/FTpm25h';
const COMPLETE_CHECKOUT_URL = 'https://pay.kiwify.com.br/Sv9jFdu';
const UPGRADE_CHECKOUT_URL = 'https://pay.kiwify.com.br/OjPeJry';

const HERO_IMAGE = '/assets/receitas/hero.webp';
const PRODUCT_IMAGE = '/assets/receitas/plano-completo.webp';

const audienceCards = [
  ['Confeiteiras por Encomenda', 'Para quem já atende aniversários e eventos e precisa de novas receitas para surpreender clientes e renovar o catálogo.'],
  ['Iniciantes na Confeitaria', 'Para quem quer começar a trabalhar com doces personalizados e precisa de um repertório pronto para praticar, montar seu primeiro catálogo e evoluir.'],
  ['Confeiteiras de Festas e Eventos', 'Para quem produz doces para aniversários, casamentos, batizados, festas infantis e outras celebrações e vive precisando de novas referências.'],
  ['Boleiras e Cake Designers', 'Para quem já vende bolos e quer incluir doces personalizados para oferecer encomendas mais completas em cada festa.'],
  ['Doceiras Artesanais', 'Para quem já vende brigadeiros, trufas e outros doces e quer transformar opções simples em doces mais personalizados e chamativos.'],
];

const bonuses = [
  { label: 'BÔNUS 01', title: 'Manual de Recheios e Coberturas', text: 'Tenha opções de recheios, coberturas e combinações para variar seus doces e criar novas possibilidades usando as receitas do material principal.', meta: 'GRÁTIS', value: 'R$ 23,00', image: '/assets/receitas/bonus-01.webp' },
  { label: 'BÔNUS 02', title: 'Atlas Visual de Decorações e Acabamentos', text: 'Referências visuais de acabamentos, texturas e detalhes para deixar seus doces mais bonitos, personalizados e profissionais.', meta: 'GRÁTIS', value: 'R$ 17,00', image: '/assets/receitas/bonus-02.webp' },
  { label: 'BÔNUS 03', title: 'Guia de Conservação, Validade e Transporte', text: 'Orientações práticas para conservar, armazenar e transportar diferentes doces preservando sabor, textura e apresentação.', meta: 'GRÁTIS', value: 'R$ 27,00', image: '/assets/receitas/bonus-03.webp' },
  { label: 'BÔNUS 04', title: 'Certificado de Conclusão', text: 'Ao concluir o material, você também recebe seu certificado digital de conclusão para registrar essa etapa do seu aprendizado.', meta: 'GRÁTIS', value: 'R$ 20,00', image: '/assets/receitas/bonus-04.webp' },
];

const benefitCards = [
  { type: 'clarity', title: 'Mais Clareza Para Começar', alt: 'Receitas organizadas com uma seta indicando o primeiro passo' },
  { type: 'safety', title: 'Menos Medo de Errar', alt: 'Ficha de receita, utensílio de confeitaria e símbolo de aprovação' },
  { type: 'beauty', title: 'Doces Mais Bonitos Desde o Início', alt: 'Doce recebendo acabamento com saco de confeitar' },
  { type: 'catalog', title: 'Mais Facilidade Para Montar Seu Catálogo', alt: 'Coleção de doces organizada em formato de catálogo' },
  { type: 'ideas', title: 'Mais Ideias Para Cada Festa', alt: 'Doces variados acompanhados por elementos de celebração' },
  { type: 'selling', title: 'Mais Confiança Para Começar a Vender', alt: 'Doce refinado acompanhado por selo de aprovação' },
];

const deliverablePages = [
  '/assets/receitas/carousel/page-01.webp',
  '/assets/receitas/carousel/page-02.webp',
  '/assets/receitas/carousel/page-03.webp',
  '/assets/receitas/carousel/page-04.webp',
  '/assets/receitas/carousel/page-05.webp',
  '/assets/receitas/carousel/page-06.webp',
  '/assets/receitas/carousel/page-07.webp',
  '/assets/receitas/carousel/page-08.webp',
  '/assets/receitas/carousel/page-09.webp',
];

const basicItems = [
  ['yes', '+200 Receitas de Doces Personalizados para Festas'],
  ['yes', 'Material digital de consulta rápida'],
  ['yes', 'Acesso imediato'],
  ['yes', 'Acesso pelo celular, tablet ou computador'],
  ['no', 'Manual de Recheios e Coberturas'],
  ['no', 'Atlas Visual de Decorações e Acabamentos'],
  ['no', 'Guia de Conservação, Validade e Transporte'],
  ['no', 'Certificado de Conclusão'],
];

const completeCoreItems = [
  '+200 Receitas de Doces Personalizados para Festas',
  'Receitas organizadas para consulta rápida',
  'Opções para diferentes estilos e ocasiões',
  'Material digital visual e ilustrado',
  'Acesso imediato',
];

const completeBonusItems = [
  'Manual de Recheios e Coberturas',
  'Atlas Visual de Decorações e Acabamentos',
  'Guia de Conservação, Validade e Transporte',
  'Certificado de Conclusão',
];

const faqs = [
  ['O material é físico ou digital?', 'O material é 100% digital. Após a confirmação da compra, você poderá acessar o conteúdo pelos dispositivos compatíveis com a plataforma de entrega.'],
  ['Nunca fiz doces personalizados. Consigo acompanhar?', 'Sim. O material foi organizado para consulta prática e visual. Você pode escolher uma receita, conferir os ingredientes e seguir o preparo sem depender de aulas longas.'],
  ['Já vendo brigadeiros, trufas ou bolos. O material ainda ajuda?', 'Sim. Ele amplia seu repertório com novas combinações, acabamentos e ideias para renovar o catálogo e atender diferentes festas.'],
  ['Preciso seguir uma ordem ou assistir a aulas?', 'Não. Você pode abrir o material na receita que precisa, consultar as orientações e aplicar no seu ritmo.'],
  ['Consigo acessar pelo celular?', 'Sim. O material digital pode ser consultado em celular, tablet ou computador, conforme a compatibilidade da plataforma de acesso.'],
  ['Vou conseguir fazer todos os doces exatamente iguais às imagens?', 'O resultado pode variar conforme ingredientes, utensílios, experiência, técnicas utilizadas e execução individual. O material funciona como orientação prática e referência para reprodução das receitas.'],
  ['Quando e onde recebo meu acesso?', 'Após a confirmação do pagamento, as instruções de acesso são enviadas para o e-mail informado na compra, conforme o processamento da plataforma de checkout.'],
  ['Qual é a diferença entre o Plano Básico e o Completo?', 'O Plano Básico inclui o material principal com as +200 receitas. O Plano Completo inclui o material principal e também os quatro materiais complementares apresentados nesta página.'],
  ['O certificado me torna uma confeiteira profissional?', 'Não. O certificado registra a conclusão deste material digital e não substitui formação técnica, profissionalizante, regulamentação ou certificação oficial quando alguma delas for necessária.'],
];

const formatTime = (seconds) => [Math.floor(seconds / 3600), Math.floor((seconds % 3600) / 60), seconds % 60].map((n) => String(n).padStart(2, '0')).join(':');

function useCountdown(targetTime) {
  const calculateRemaining = () => Math.max(0, Math.ceil((targetTime - Date.now()) / 1000));
  const [remaining, setRemaining] = useState(calculateRemaining);
  useEffect(() => {
    const timer = setInterval(() => setRemaining(calculateRemaining()), 250);
    return () => clearInterval(timer);
  }, [targetTime]);
  return remaining;
}

function CountdownBar({ targetTime }) {
  const remaining = useCountdown(targetTime);
  return <div className="topCountdown" role="timer" aria-label={`Oferta especial disponível por tempo limitado, faltam ${formatTime(remaining)}`}><strong>OFERTA ESPECIAL DISPONÍVEL POR TEMPO LIMITADO</strong><span>•</span><b>FALTAM {formatTime(remaining)}</b></div>;
}

function FlipDigit({ value }) {
  const [display, setDisplay] = useState(value);
  const [previous, setPrevious] = useState(value);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (value === display) return undefined;
    setPrevious(display);
    setDisplay(value);
    setFlipping(true);
    const animation = setTimeout(() => setFlipping(false), 620);
    return () => clearTimeout(animation);
  }, [value]);

  return <span className={`flipDigit${flipping ? ' isFlipping' : ''}`} aria-hidden="true">
    <span className="flipHalf flipTop"><span>{display}</span></span>
    <span className="flipHalf flipBottom"><span>{display}</span></span>
    {flipping && <><span className="flipFlap flipFlapTop"><span>{previous}</span></span><span className="flipFlap flipFlapBottom"><span>{display}</span></span></>}
    <span className="flipHinge" />
  </span>;
}

function FlipCountdown({ targetTime }) {
  const remaining = useCountdown(targetTime);
  const [hours, minutes, seconds] = formatTime(remaining).split(':');
  const groups = [[hours, 'HORAS'], [minutes, 'MINUTOS'], [seconds, 'SEGUNDOS']];
  return <div className="offerFlipClock" role="timer" aria-label={`Oferta termina em ${hours} horas, ${minutes} minutos e ${seconds} segundos`}>
    <span className="srOnly">Oferta termina em {formatTime(remaining)}</span>
    {groups.map(([digits, label], index) => <div className="flipUnit" key={label}>
      <div className="flipDigits"><FlipDigit value={digits[0]} /><FlipDigit value={digits[1]} /></div>
      <span className="flipLabel">{label}</span>
      {index < groups.length - 1 && <span className="flipSeparator" aria-hidden="true"><i /><i /></span>}
    </div>)}
  </div>;
}

function DeliverableCarousel() {
  const shuffledPages = useMemo(() => {
    const pages = [...deliverablePages];
    for (let index = pages.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [pages[index], pages[randomIndex]] = [pages[randomIndex], pages[index]];
    }
    return pages;
  }, []);
  const renderRow = (items, className) => <div className="carouselRow" aria-hidden="true"><div className={`deliverableTrack ${className}`}>
    {[0, 1, 2].map((loop) => <div className="deliverableLoopGroup" key={`${className}-group-${loop}`}>{items.map((src, index) => <figure className="deliverablePreview" key={`${className}-${loop}-${index}`}><img src={src} alt="" width="312" height="446" loading={loop === 0 ? 'eager' : 'lazy'} decoding="async" fetchPriority={loop === 0 && index === 0 ? 'high' : 'low'} /></figure>)}</div>)}
  </div></div>;
  return <div className="deliverableCarousel" role="group" aria-label="Prévia visual de páginas internas do material digital"><div className="carouselGlow" aria-hidden="true"/><div className="deliverableViewport">{renderRow(shuffledPages.slice(0, 5), 'trackForward')}{renderRow(shuffledPages.slice(5), 'trackReverse')}</div></div>;
}

function BenefitIllustration({ type, alt }) {
  const titleId = `benefit-${type}-title`;
  const art = {
    clarity: <>
      <rect x="30" y="34" width="48" height="54" rx="7" fill="#FFF9F5" stroke="#2E292B" strokeWidth="3"/>
      <rect x="40" y="25" width="48" height="54" rx="7" fill="#FFF9F5" stroke="#C83B5A" strokeWidth="3"/>
      <path d="M50 39h25M50 49h18M50 59h22" stroke="#2E292B" strokeWidth="3" strokeLinecap="round"/>
      <path d="M74 84h17V68M91 84 78 71" fill="none" stroke="#C83B5A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </>,
    safety: <>
      <rect x="25" y="29" width="52" height="64" rx="8" fill="#FFF9F5" stroke="#2E292B" strokeWidth="3"/>
      <path d="M36 43h28M36 54h20M36 65h24" stroke="#C83B5A" strokeWidth="3" strokeLinecap="round"/>
      <path d="M79 68c8 4 9 15 3 20M74 64l14 20M70 66l15-7" fill="none" stroke="#2E292B" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="84" cy="37" r="14" fill="#C83B5A"/>
      <path d="m77 37 5 5 9-11" fill="none" stroke="#FFF9F5" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
    </>,
    beauty: <>
      <path d="M37 68h45l-5 24H42z" fill="#FFF9F5" stroke="#2E292B" strokeWidth="3" strokeLinejoin="round"/>
      <path d="M42 68c-5-8 2-15 10-14-1-8 7-13 14-9 7-4 16 2 14 10 9 0 12 8 6 13z" fill="#C83B5A" stroke="#C83B5A" strokeWidth="2"/>
      <path d="m76 28 22 9-18 20-11-5z" fill="#FFF9F5" stroke="#2E292B" strokeWidth="3" strokeLinejoin="round"/>
      <path d="m71 52-7 11M98 37l7-4" stroke="#C83B5A" strokeWidth="3" strokeLinecap="round"/>
      <path d="M30 37h7M33.5 33.5v7M97 67h8M101 63v8" stroke="#C83B5A" strokeWidth="3" strokeLinecap="round"/>
    </>,
    catalog: <>
      <rect x="23" y="25" width="74" height="70" rx="10" fill="#FFF9F5" stroke="#2E292B" strokeWidth="3"/>
      <path d="M23 43h74" stroke="#C83B5A" strokeWidth="3"/>
      <circle cx="42" cy="61" r="8" fill="#C83B5A"/>
      <circle cx="69" cy="61" r="8" fill="#E5B1BE"/>
      <circle cx="42" cy="82" r="8" fill="#E5B1BE"/>
      <circle cx="69" cy="82" r="8" fill="#C83B5A"/>
      <path d="M82 56h7M82 65h7M82 77h7M82 86h7" stroke="#2E292B" strokeWidth="2.5" strokeLinecap="round"/>
    </>,
    ideas: <>
      <circle cx="38" cy="68" r="16" fill="#C83B5A"/>
      <circle cx="64" cy="59" r="17" fill="#FFF9F5" stroke="#2E292B" strokeWidth="3"/>
      <circle cx="84" cy="75" r="14" fill="#E5B1BE" stroke="#C83B5A" strokeWidth="2"/>
      <path d="M31 68h14M38 61v14M58 55c4-4 8-4 12 0M79 75h10" stroke="#FFF9F5" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M30 35h7M33.5 31.5v7M54 27l3 6 6 1-5 4 1 7-5-4-6 3 2-7-5-4 7-1zM89 35h7M92.5 31.5v7" fill="#C83B5A" stroke="#C83B5A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </>,
    selling: <>
      <path d="M28 79c0-17 12-29 29-29s29 12 29 29z" fill="#C83B5A"/>
      <path d="M24 79h66M33 88h48" stroke="#2E292B" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="80" cy="38" r="18" fill="#FFF9F5" stroke="#C83B5A" strokeWidth="3"/>
      <path d="m80 27 3 7 8 1-6 5 2 8-7-4-7 4 2-8-6-5 8-1z" fill="#C83B5A"/>
      <path d="M38 43h8M42 39v8" stroke="#C83B5A" strokeWidth="3" strokeLinecap="round"/>
    </>,
  };
  return <svg className="benefitIllustration" viewBox="0 0 120 120" role="img" aria-labelledby={titleId}>
    <title id={titleId}>{alt}</title>
    <circle cx="60" cy="60" r="56" fill="#FBE6EB"/>
    <circle cx="60" cy="60" r="49" fill="none" stroke="#C83B5A" strokeOpacity=".18" strokeWidth="2"/>
    {art[type]}
  </svg>;
}

function BenefitsSection() {
  return <section className="section benefitsSection reveal" aria-labelledby="benefits-title">
    <h2 id="benefits-title" className="benefitsTitle">O QUE <span>MUDA</span> QUANDO VOCÊ TEM<br/><em>RECEITAS PRONTAS</em> PARA SEGUIR</h2>
    <div className="benefitsGrid">{benefitCards.map((benefit) => <article className="benefitCard" key={benefit.type}>
      <BenefitIllustration type={benefit.type} alt={benefit.alt}/>
      <h3>{benefit.title}</h3>
    </article>)}</div>
  </section>;
}

function CheckoutAssurance() {
  return <div className="checkoutAssurance" aria-label="Compra segura, satisfação garantida, acesso imediato e sem mensalidades">
    <span>🛡️ Satisfação garantida por 7 dias</span>
    <span>🔒 Pagamento seguro e dados protegidos</span>
    <span>✉️ Acesso imediato no seu e-mail</span>
    <span>✓ Pagamento único, sem mensalidades</span>
  </div>;
}

function SatisfactionSeal() {
  return <div className="guaranteeSeal" aria-label="Selo de satisfação garantida por 7 dias">
    <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M32 5 39 10l9-1 3 9 8 5-3 9 3 9-8 5-3 9-9-1-7 5-7-5-9 1-3-9-8-5 3-9-3-9 8-5 3-9 9 1z"/><path d="m21 32 7 7 15-17"/></svg>
    <strong>SATISFAÇÃO</strong><span>GARANTIDA • 7 DIAS</span>
  </div>;
}

function scrollToPlans(event) { event?.preventDefault(); document.getElementById('checkout')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
function CTA({ children, className = '' }) { return <a href="#checkout" className={`cta ${className}`} onClick={scrollToPlans}>{children}</a>; }

function PlanList({ items, basic = false }) {
  return <ul className="planList">{items.map((item) => { const [type, text] = basic ? item : ['yes', item]; return <li className={type === 'no' ? 'notIncluded' : ''} key={text}><span className="planIcon" aria-hidden="true">{type === 'no' ? <svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg> : '✓'}</span><span className="planItemText">{text}</span></li>; })}</ul>;
}

function TrustStrip({ inverse = false }) {
  return <div className={`planTrust ${inverse ? 'planTrustInverse' : ''}`} aria-label="Pagamento seguro, acesso imediato e sem mensalidades">
    <span><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg><small>Pagamento<br/>Seguro</small></span>
    <span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2 4.5 13H11l-1 9 8.5-12H12l1-8Z"/></svg><small>Acesso<br/>Imediato</small></span>
    <span><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 2v6M17 2v6M3 10h18M8 15l8 0M8 18h5"/></svg><small>Sem<br/>Mensalidades</small></span>
  </div>;
}

function UpgradeModal({ onClose }) {
  const modalRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    const previousFocus = document.activeElement;
    const modal = modalRef.current;
    closeRef.current?.focus();
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !modal) return;
      const focusable = [...modal.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])')];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => { document.removeEventListener('keydown', handleKeyDown); previousFocus?.focus?.(); };
  }, [onClose]);

  return <div className="upgradeOverlay" role="presentation" onMouseDown={onClose}>
    <section ref={modalRef} className="upgradeModal" role="dialog" aria-modal="true" aria-labelledby="upgrade-title" aria-describedby="upgrade-description" onMouseDown={(event) => event.stopPropagation()}>
      <button ref={closeRef} className="upgradeClose" type="button" onClick={onClose} aria-label="Fechar oferta">×</button>
      <p className="upgradeEyebrow">ANTES DE CONTINUAR...</p>
      <h2 id="upgrade-title">Leve o pacote completo por apenas R$ 7,90 a mais</h2>
      <p id="upgrade-description">Você está prestes a acessar somente as +200 receitas e deixar os quatro materiais complementares de fora.</p>
      <p>Por uma condição especial desta página, você pode levar agora o pacote completo por:</p>
      <img src={PRODUCT_IMAGE} alt="Prévia do pacote completo com as receitas e os quatro bônus" width="1254" height="1254" decoding="async" />
      <ul><li>+200 Receitas de Doces Personalizados para Festas</li><li>Manual de Recheios e Coberturas</li><li>Atlas Visual de Decorações e Acabamentos</li><li>Guia de Conservação, Validade e Transporte</li><li>Certificado de Conclusão</li></ul>
      <strong>R$ 17,90</strong>
      <a className="upgradeButton" href={UPGRADE_CHECKOUT_URL}>SIM, QUERO O PACOTE COMPLETO POR R$ 17,90</a>
      <a className="upgradeDecline" href={BASIC_CHECKOUT_URL}>Não, obrigado. Quero continuar apenas com o Plano Básico de R$ 10,00.</a>
    </section>
  </div>;
}

const nextMidnight = () => {
  const deadline = new Date();
  deadline.setHours(24, 0, 0, 0);
  return deadline.getTime();
};

function useDailyDeadline() {
  const [targetTime, setTargetTime] = useState(nextMidnight);
  useEffect(() => {
    const resetTimer = setInterval(() => {
      if (Date.now() >= targetTime) setTargetTime(nextMidnight());
    }, 1000);
    return () => clearInterval(resetTimer);
  }, [targetTime]);
  return targetTime;
}

export default function App() {
  const [showUpgrade, setShowUpgrade] = useState(false);
  const offerEndsAt = useDailyDeadline();
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('isVisible'); observer.unobserve(entry.target); } }), { threshold: .12, rootMargin: '0px 0px -35px' });
    elements.forEach((el) => observer.observe(el)); return () => observer.disconnect();
  }, []);

  return <>
    <CountdownBar targetTime={offerEndsAt} />
    <main>
      <section className="hero reveal">
        <div className="heroCopy"><p className="heroEyebrow">MATERIAL DIGITAL • ACESSO IMEDIATO</p><h1 aria-label="+200 Receitas de Doces Personalizados para criar doces mais bonitos e valorizar cada encomenda"><span className="headlineDesktop" aria-hidden="true"><span className="heroHighlight">+200 Receitas de Doces Personalizados para criar</span><span>doces mais bonitos e valorizar cada encomenda</span></span><span className="headlineMobile" aria-hidden="true"><span className="heroHighlight">+200 Receitas de Doces</span><span className="heroHighlight">Personalizados para criar</span><span>doces mais bonitos e valorizar</span><span>cada encomenda</span></span></h1><p className="lead">Tenha centenas de receitas e ideias visuais reunidas em um só lugar para consultar quando precisar, descobrir novos doces e levar muito mais variedade para suas encomendas.</p></div>
        <div className="heroMedia"><img className="heroImage" src={HERO_IMAGE} alt="Prévia do material digital com receitas de doces personalizados" width="1122" height="1402" loading="eager" fetchPriority="high" decoding="async"/><CTA className="primaryPulse">QUERO ACESSAR AS +200 RECEITAS</CTA><p className="microcopy"><span>✓ Material 100% digital</span><span>✓ Acesso imediato</span><span>✓ Consulte pelo celular, tablet ou computador</span></p></div>
      </section>

      <section className="section reveal"><h2>Esse material foi feito para você que...</h2><div className="audienceGrid">{audienceCards.map(([title, text]) => <article className="audienceCard" key={title}><span className="check">✓</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>

      <section className="section demoSection reveal"><p className="eyebrow sectionEyebrow">VEJA POR DENTRO</p><h2>Mais de 200 receitas para você consultar, escolher e fazer</h2><p className="sectionLead">Um material visual e organizado para você encontrar rapidamente novas opções de doces personalizados para diferentes estilos de festa.</p><DeliverableCarousel/><div className="pillRow"><span>CHOCOLATES PERSONALIZADOS</span><span>DOCES MODELADOS</span><span>FESTAS INFANTIS</span><span>EVENTOS ESPECIAIS</span><span>DOCES DECORADOS</span></div></section>

      <BenefitsSection/>

      <section className="section bonusSection reveal"><p className="eyebrow">TUDO NO MESMO ACESSO</p><h2>E você ainda recebe mais tudo isso de bônus:</h2><p className="bonusIntro">Além do acervo principal, você recebe materiais visuais para te auxiliar no preparo, acabamento e conservação dos seus doces.</p><div className="bonusGrid">{bonuses.map((bonus) => <article className="bonusCard" key={bonus.title}><figure className="bonusVisual"><img src={bonus.image} alt={`Apresentação visual de ${bonus.title}`} width="1402" height="1122" loading="lazy" decoding="async"/></figure><h3>{bonus.title}</h3><p>{bonus.text}</p><div className="bonusPrice"><s>{bonus.value}</s><strong>{bonus.meta}</strong></div></article>)}</div><div className="bonusTotal" aria-label="Calculadora de valor dos bônus"><div className="calculatorTop"><i/><i/><i/><span>CALCULADORA DE VALOR</span></div><h3>Somando tudo o que você vai levar</h3><div className="bonusBreakdown">{bonuses.map((bonus) => <div key={bonus.title}><span>{bonus.title}</span><s>{bonus.value}</s></div>)}</div><div className="bonusSum"><span>TOTAL DOS BÔNUS</span><s>R$ 87,00</s></div><p>MAS HOJE, TUDO SAIRÁ POR:</p><b className="freeTotal">R$ 0,00 <small>(GRÁTIS)</small></b></div></section>

      <section className="priceSection" id="checkout"><div className="priceIntro reveal"><div className="deadlineBlock"><p>A OFERTA ACABA EM:</p><FlipCountdown targetTime={offerEndsAt}/></div><p className="eyebrow">ESCOLHA SEU ACESSO</p><h2>Escolha o <span className="priceTitleHighlight">melhor plano para você</span></h2><p>Escolha se quer começar com o material básico, ou se prefere o completo com todos os bônus para te auxiliar sempre que você precisar.</p><CheckoutAssurance/></div>
        <article className="basicCard reveal"><h3>Plano Básico</h3><p>Pagamento único</p><div className="basicPrice">R$ 10,00</div><PlanList items={basicItems} basic/><button className="planButton basicButton" type="button" onClick={() => setShowUpgrade(true)}>QUERO SOMENTE AS +200 RECEITAS</button><TrustStrip/><div className="basicDownsell">TEMOS UMA OFERTA MAIS ESPECIAL PARA VOCÊ AQUI ABAIXO<span aria-hidden="true">↓ &nbsp; ↓ &nbsp; ↓</span></div></article>
        <article className="completeCard reveal"><span className="featuredBadge">MAIS ESCOLHIDO</span><h3>PLANO COMPLETO</h3><p>Todo o material reunido em um único acesso</p><div className="deliveryPromise"><span>💳 Pagamento único</span><span>✉️ Receba o acesso no seu e-mail</span></div><figure className="productImage"><img src={PRODUCT_IMAGE} alt="Pacote completo com as receitas e os quatro bônus" width="1254" height="1254" loading="lazy" decoding="async"/></figure><p className="priceAnchor">De <s>R$ 97,00</s>, por apenas:</p><div className="completePrice">R$ 27,90</div><p className="paymentCopy">Pagamento único • sem mensalidades</p><PlanList items={completeCoreItems}/><div className="completeBonusBox"><div className="giftHeading"><span aria-hidden="true">🎁</span><p>VOCÊ TAMBÉM RECEBE:</p></div><PlanList items={completeBonusItems}/></div><a className="planButton completeButton" href={COMPLETE_CHECKOUT_URL}>QUERO O ACESSO COMPLETO</a><TrustStrip inverse/></article>
      </section>

      <section className="section guarantee reveal"><SatisfactionSeal/><div><h2>Você tem 7 dias para conhecer o material</h2><p>Acesse o conteúdo, conheça a organização e veja se o material faz sentido para você. Caso queira solicitar reembolso dentro do prazo de garantia, a solicitação deverá seguir as condições aplicáveis à sua compra.</p></div></section>

      <section className="section faqSection reveal"><p className="eyebrow">DÚVIDAS FREQUENTES</p><h2>Perguntas frequentes</h2><div className="faqGrid">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>

      <section className="finalCta reveal"><p className="eyebrow">MAIS VARIEDADE PARA SUAS PRÓXIMAS FESTAS</p><h2>Tenha centenas de receitas bonitas ao seu alcance sempre que precisar</h2><p>Escolha seu acesso e tenha um material prático para consultar novas receitas, combinações e ideias sem perder horas procurando tudo separadamente.</p><CTA>QUERO VER OS PLANOS</CTA></section>
      <footer><strong>+200 Receitas de Doces Personalizados para Festas</strong><span>Material digital de caráter educativo. Os resultados de preparo, apresentação, conservação e aplicação podem variar conforme ingredientes, equipamentos, condições de armazenamento e execução individual.</span><span>© {new Date().getFullYear()} • Todos os direitos reservados.</span></footer>
    </main>{showUpgrade && <UpgradeModal onClose={() => setShowUpgrade(false)}/>}
  </>;
}
