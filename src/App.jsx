import { useEffect, useState } from 'react';

const BASIC_CHECKOUT_URL = 'https://zuckpay.com.br/checkout/plano-basico-200-tecnicas-profissionais-de-banho-e-tosa';
const COMPLETE_CHECKOUT_URL = 'https://zuckpay.com.br/checkout/plano-completo-200-tecnicas-profissionais-de-banho-e-tosa';
const UPGRADE_CHECKOUT_URL = 'https://zuckpay.com.br/checkout/plano-completo-200-tecnicas-profissionais-de-banho-e-tosa-1';

const HERO_IMAGE = '/assets/banho/hero.webp';
const PRODUCT_IMAGE = '/assets/banho/plano-completo.webp';

const audienceCards = [
  ['Banhistas e auxiliares', 'Para consultar procedimentos, pelagens e cuidados sem depender apenas da memória.'],
  ['Tosadores em evolução', 'Para ampliar o repertório e trabalhar com mais organização e confiança.'],
  ['Alunos de banho e tosa', 'Para revisar técnicas de forma visual antes e depois das atividades práticas.'],
  ['Profissionais autônomos', 'Para ter uma referência rápida na rotina e oferecer um serviço mais completo.'],
];

const bonuses = [
  { label: 'BÔNUS 01', title: 'Atlas Visual de Pelagens e Cuidados', text: 'Identifique os principais tipos de pelagem e entenda os cuidados mais adequados para cada estrutura de pelo.', meta: 'GRÁTIS HOJE', value: 'R$ 23,00', image: '/assets/banho/bonus-01.webp' },
  { label: 'BÔNUS 02', title: 'Manual Visual de Ferramentas, Lâminas e Pentes', text: 'Consulte a função, a aplicação e os principais cuidados de uso das ferramentas da rotina.', meta: 'GRÁTIS HOJE', value: 'R$ 17,00', image: '/assets/banho/bonus-02.webp' },
  { label: 'BÔNUS 03', title: 'Guia de Segurança e Manejo no Banho e Tosa', text: 'Reconheça sinais de estresse, cuide de áreas sensíveis e conduza cada atendimento com mais controle, cuidado e segurança.', meta: 'GRÁTIS HOJE', value: 'R$ 27,00', image: '/assets/banho/bonus-03.webp' },
  { label: 'BÔNUS 04', title: 'Certificado de Conclusão', text: 'Registre a conclusão do conteúdo com um certificado digital para currículo ou portfólio.', meta: 'GRÁTIS HOJE', value: 'R$ 20,00', image: '/assets/banho/bonus-04.webp' },
];

const deliverablePages = [
  '/assets/banho/deliverable-01.webp',
  '/assets/banho/deliverable-02.webp',
  '/assets/banho/deliverable-03.webp',
  '/assets/banho/deliverable-04.webp',
  '/assets/banho/deliverable-05.webp',
  '/assets/banho/deliverable-06.webp',
  '/assets/banho/deliverable-07.webp',
  '/assets/banho/deliverable-08.webp',
  '/assets/banho/deliverable-09.webp',
];

const basicItems = [
  ['yes', '+200 Técnicas Profissionais de Banho e Tosa'],
  ['yes', 'Acesso digital imediato'],
  ['no', 'Sem Certificado de Conclusão'],
  ['no', 'Sem Atlas Visual de Pelagens e Cuidados'],
  ['no', 'Sem Manual Visual de Ferramentas, Lâminas e Pentes'],
  ['no', 'Sem Guia de Segurança e Manejo no Banho e Tosa'],
];

const completeCoreItems = [
  '+200 Técnicas Profissionais de Banho e Tosa',
  'Organização por porte, raça e pelagem',
  'Fichas visuais de consulta rápida',
  'Banho, secagem, tosa e acabamento',
  'Acesso digital imediato',
];

const completeBonusItems = [
  'Atlas Visual de Pelagens e Cuidados 🎁',
  'Manual Visual de Ferramentas, Lâminas e Pentes 🎁',
  'Guia de Segurança e Manejo no Banho e Tosa 🎁',
  'Certificado de Conclusão 🎁',
];

const faqs = [
  ['O material é físico ou digital?', 'O material é totalmente digital e será disponibilizado para acesso após a confirmação da compra. Nenhum produto físico será enviado.'],
  ['É indicado para quem está começando?', 'Sim. A organização visual facilita a consulta de quem está aprendendo, mas o conteúdo também serve como apoio para profissionais que já atuam na área.'],
  ['Serve para quem já trabalha com banho e tosa?', 'Sim. O material ajuda a revisar técnicas, consultar tipos de pelagem e organizar decisões que aparecem na rotina profissional.'],
  ['Preciso assistir a aulas longas?', 'Não. A proposta é oferecer fichas visuais e objetivas para consulta rápida, sem obrigar você a assistir a horas de conteúdo para encontrar uma orientação.'],
  ['Consigo consultar pelo celular?', 'Sim. O arquivo digital pode ser aberto em celular, tablet ou computador compatível com PDF.'],
  ['As técnicas servem para qualquer cachorro?', 'O conteúdo é organizado por porte, raça e pelagem. Mesmo assim, cada animal deve ser avaliado individualmente antes da aplicação de qualquer técnica.'],
  ['O acesso é imediato?', 'O acesso é liberado após a confirmação do pagamento pela plataforma utilizada na compra.'],
  ['Em qual plano os bônus estão incluídos?', 'Os quatro bônus fazem parte do Plano Completo. O Plano Básico oferece somente o material principal com as +200 técnicas.'],
  ['O certificado é uma formação profissional?', 'Não. O certificado comprova a conclusão deste material educativo, mas não equivale a diploma técnico, habilitação, registro profissional ou certificação oficial.'],
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
  return <div className="topCountdown" role="timer" aria-label={`Condição especial disponível por tempo limitado, faltam ${formatTime(remaining)}`}><strong>CONDIÇÃO ESPECIAL DISPONÍVEL POR TEMPO LIMITADO</strong><span>•</span><b>FALTAM {formatTime(remaining)}</b></div>;
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
  const renderRow = (items, className) => <div className="carouselRow" aria-hidden="true"><div className={`deliverableTrack ${className}`}>
    {[0, 1, 2].map((loop) => <div className="deliverableLoopGroup" key={`${className}-group-${loop}`}>{items.map((src, index) => <figure className="deliverablePreview" key={`${className}-${loop}-${index}`}><img src={src} alt="" loading="eager" decoding="async" fetchPriority="low" /></figure>)}</div>)}
  </div></div>;
  return <div className="deliverableCarousel" role="group" aria-label="Prévia de páginas internas do material"><div className="carouselGlow" aria-hidden="true"/><div className="deliverableViewport">{renderRow(deliverablePages.slice(0, 5), 'trackForward')}{renderRow(deliverablePages.slice(5), 'trackReverse')}</div></div>;
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
  return <div className="upgradeOverlay" role="presentation" onMouseDown={onClose}>
    <section className="upgradeModal" role="dialog" aria-modal="true" aria-labelledby="upgrade-title" onMouseDown={(event) => event.stopPropagation()}>
      <button className="upgradeClose" type="button" onClick={onClose} aria-label="Fechar oferta">×</button>
      <p className="upgradeEyebrow">ANTES DE CONTINUAR</p>
      <h2 id="upgrade-title">Leve o material completo</h2>
      <p>Além das +200 técnicas, o Plano Completo inclui quatro materiais complementares para aprofundar sua consulta.</p>
      <img src={PRODUCT_IMAGE} alt="Materiais incluídos na oferta" width="1280" height="853" decoding="async" />
      <ul><li>+200 técnicas profissionais</li><li>Atlas Visual de Pelagens e Cuidados</li><li>Manual Visual de Ferramentas, Lâminas e Pentes</li><li>Guia de Segurança e Manejo no Banho e Tosa</li><li>Certificado de Conclusão</li><li>Acesso digital imediato</li></ul>
      <strong>TOTAL: R$ 17,90</strong>
      <a className="upgradeButton" href={UPGRADE_CHECKOUT_URL}>QUERO O PLANO COMPLETO</a>
      <a className="upgradeDecline" href={BASIC_CHECKOUT_URL}>CONTINUAR COM O PLANO BÁSICO</a>
    </section>
  </div>;
}

export default function App() {
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [offerEndsAt] = useState(() => Date.now() + 30 * 60 * 1000);
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('isVisible'); observer.unobserve(entry.target); } }), { threshold: .12, rootMargin: '0px 0px -35px' });
    elements.forEach((el) => observer.observe(el)); return () => observer.disconnect();
  }, []);

  return <>
    <CountdownBar targetTime={offerEndsAt} />
    <main>
      <section className="hero reveal">
        <div className="heroCopy"><p className="heroEyebrow">MANUAL VISUAL • CONSULTA RÁPIDA</p><h1><span className="heroHighlight">+200 Técnicas Profissionais</span><span>de Banho e Tosa para consultar</span><span>rápido em cada etapa</span></h1><p className="lead">Um manual visual organizado por porte, raça e pelagem para banhistas, auxiliares e tosadores encontrarem a orientação certa sem perder tempo em vídeos longos.</p></div>
        <div className="heroMedia"><img className="heroImage" src={HERO_IMAGE} alt="Prévia ilustrativa do material digital" width="1200" height="1600" loading="eager" fetchPriority="high"/><CTA className="primaryPulse">ACESSAR AS +200 TÉCNICAS</CTA><p className="microcopy">Acesso imediato • Material digital • Consulte pelo celular</p></div>
      </section>

      <section className="section reveal"><h2>Para quem é este material?</h2><div className="audienceGrid">{audienceCards.map(([title, text]) => <article className="audienceCard" key={title}><span className="check">✓</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>

      <section className="section demoSection reveal"><h2>Confira tudo o que preparamos para você</h2><p className="sectionLead">Técnicas visuais divididas por porte, raça, pelagem e etapa do atendimento para você localizar o que precisa sem complicação.</p><DeliverableCarousel/><div className="pillRow"><span>PORTE PEQUENO</span><span>PORTE MÉDIO</span><span>PORTE GRANDE</span></div></section>

      <section className="section bonusSection reveal"><p className="eyebrow">TUDO EM UM SÓ ACESSO</p><h2>Veja tudo o que acompanha seu acesso</h2><p className="bonusIntro">O manual principal e quatro materiais complementares para ampliar sua consulta e organizar seu aprendizado.</p><div className="bonusGrid">{bonuses.map((bonus) => <article className="bonusCard" key={bonus.title}><span className="bonusNumber">{bonus.label}</span><figure className="bonusVisual"><img src={bonus.image} alt="Materiais incluídos na oferta" width="1280" height="960" loading="lazy" decoding="async"/></figure><h3>{bonus.title}</h3><p>{bonus.text}</p><div className="bonusPrice"><s>{bonus.value}</s><strong>{bonus.meta}</strong></div></article>)}</div><div className="bonusTotal"><span className="bonusTotalTag">SEU ACESSO COMPLETO</span><h3>Somando tudo o que você vai levar</h3><div className="bonusBreakdown">{bonuses.map((bonus) => <div key={bonus.title}><span>{bonus.title}</span><s>{bonus.value}</s></div>)}</div><div className="bonusSum"><span>VALOR TOTAL DOS MATERIAIS</span><strong>R$ 87,00</strong></div><p>Hoje, você pode acessar tudo por apenas</p><b>R$ 0 <small>— GRÁTIS</small></b></div></section>

      <section className="priceSection" id="checkout"><div className="priceIntro reveal"><p className="eyebrow">ESCOLHA SEU ACESSO</p><h2>Escolha o <span className="priceTitleHighlight">Melhor Plano Para Você</span></h2><p className="offerDeadline">A diferença está nos materiais complementares incluídos em cada opção.</p><FlipCountdown targetTime={offerEndsAt} /></div>
        <article className="basicCard reveal"><p className="planEyebrow">PARA COMEÇAR</p><h3>Plano Básico</h3><p>Acesso somente ao material principal.</p><div className="basicPrice">R$ 10,00</div><PlanList items={basicItems} basic/><button className="planButton basicButton" type="button" onClick={() => setShowUpgrade(true)}>QUERO O PLANO BÁSICO</button><TrustStrip/></article>
        <article className="completeCard reveal"><span className="featuredBadge">MAIS ESCOLHIDO</span><h3>Plano Completo</h3><p>O manual principal com os quatro materiais complementares.</p><figure className="productImage"><img src={PRODUCT_IMAGE} alt="Imagem ilustrativa do plano" width="1280" height="853" loading="lazy" decoding="async"/></figure><p className="priceAnchor">De R$ 97,00 por apenas</p><div className="completePrice">R$ 27,90</div><PlanList items={completeCoreItems}/><div className="completeBonusBox"><p>Leve o material completo para consultar técnicas, pelagens e ferramentas em um único acesso.</p><PlanList items={completeBonusItems}/></div><a className="planButton completeButton" href={COMPLETE_CHECKOUT_URL}>QUERO O ACESSO COMPLETO</a><TrustStrip inverse/></article>
      </section>

      <section className="section guarantee reveal"><div className="guaranteeSeal"><strong>7</strong><span>DIAS</span></div><div><h2>Garantia simples de 7 dias</h2><p>Você pode acessar o material e conferir se ele faz sentido para sua rotina. Caso decida que não é para você dentro de 7 dias, solicite o reembolso conforme as condições da compra.</p></div></section>

      <section className="section faqSection reveal"><p className="eyebrow">DÚVIDAS FREQUENTES</p><h2>Perguntas frequentes</h2><div className="faqGrid">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>

      <section className="finalCta reveal"><p className="eyebrow">TENHA UMA REFERÊNCIA ANTES DE COMEÇAR</p><h2>Consulte a técnica, entenda cada etapa e saiba qual resultado buscar</h2><p>Mais de 200 técnicas visuais organizadas para você revisar procedimentos, pelagens e acabamentos sempre que surgir uma dúvida.</p><CTA>QUERO ACESSAR AS TÉCNICAS</CTA></section>
      <footer>+200 Técnicas Profissionais de Banho e Tosa • Material educativo de apoio. A aplicação prática deve respeitar o bem-estar do animal e os limites de atuação profissional. • Todos os direitos reservados.</footer>
    </main>{showUpgrade && <UpgradeModal onClose={() => setShowUpgrade(false)}/>}
  </>;
}
