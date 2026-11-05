import { useEffect, useMemo, useState } from 'react';
import {
  BUSINESS_NAME,
  INITIAL_WHATSAPP_MESSAGE,
  INSTAGRAM_URL,
  SITE_URL,
  buildWhatsAppLink
} from './config/site';

const navigation = [
  { label: 'Início', href: '#inicio' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Eventos', href: '#eventos' },
  { label: 'Gastronomia', href: '#gastronomia' },
  { label: 'Galeria', href: '#galeria' },
  { label: 'Contato', href: '#contato' }
];

const eventItems = [
  {
    title: 'Casamentos',
    description: 'Celebrações memoráveis com ambiente refinado, atendimento acolhedor e detalhes que traduzem sua história.',
    image:
      'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80&fm=webp'
  },
  {
    title: 'Aniversários',
    description: 'Momentos íntimos e vibrantes pensados para reunir família e amigos em clima especial.',
    image:
      'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=900&q=80&fm=webp'
  },
  {
    title: 'Festas de 15 anos',
    description: 'Uma experiência elegante, delicada e repleta de brilho para celebrar a entrada em uma nova etapa.',
    image:
      'https://images.unsplash.com/photo-1519167758481-83f550bb4913?auto=format&fit=crop&w=900&q=80&fm=webp'
  },
  {
    title: 'Formaturas',
    description: 'Conquistas celebradas com energia, celebração e um cardápio que acompanha a assinatura do momento.',
    image:
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80&fm=webp'
  },
  {
    title: 'Eventos corporativos',
    description: 'Atendimento discreto e sofisticado para encontros, confraternizações e recepções empresariais.',
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80&fm=webp'
  },
  {
    title: 'Festas infantis',
    description: 'Um ambiente alegre, seguro e pensado para encantar crianças e adultos com muito cuidado.',
    image:
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=900&q=80&fm=webp'
  },
  {
    title: 'Confraternizações',
    description: 'Receitas de alto padrão e atmosfera acolhedora para reunir pessoas em momentos especiais.',
    image:
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=80&fm=webp'
  }
];

const gastronomyItems = [
  {
    title: 'Cardápios personalizados',
    text: 'Propostas pensadas para cada estilo de celebração, com atenção à identidade do momento e ao paladar dos convidados.'
  },
  {
    title: 'Apresentação visual',
    text: 'Cada prato e cada mesa são pensados como parte da experiência sensorial, com estética que encanta antes de degustar.'
  },
  {
    title: 'Atendimento cuidadoso',
    text: 'A dedicação em cada detalhe cria uma convivência fluida, acolhedora e elegante para todos os convidados.'
  }
];

const galleryImages = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80&fm=webp',
  'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80&fm=webp',
  'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80&fm=webp',
  'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=80&fm=webp',
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80&fm=webp',
  'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80&fm=webp'
];

const instagramLinks = [
  'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=700&q=80&fm=webp',
  'https://images.unsplash.com/photo-1529502669403-c073b74fcefb?auto=format&fit=crop&w=700&q=80&fm=webp',
  'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=700&q=80&fm=webp',
  'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=700&q=80&fm=webp'
];

type BudgetForm = {
  name: string;
  phone: string;
  eventType: string;
  date: string;
  guests: string;
  message: string;
};

const initialForm: BudgetForm = {
  name: '',
  phone: '',
  eventType: '',
  date: '',
  guests: '',
  message: ''
};

const businessSchema = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: BUSINESS_NAME,
  image:
    'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80&fm=webp',
  description:
    'Buffet em Taiobeiras e região especializado em casamentos, aniversários, festas infantis, eventos corporativos e celebrações premium.',
  telephone: '',
  ...(SITE_URL ? { url: SITE_URL } : {}),
  servesCuisine: ['Brasileira', 'Gourmet'],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Taiobeiras',
    addressRegion: 'Minas Gerais',
    addressCountry: 'BR'
  },
  sameAs: [INSTAGRAM_URL],
  areaServed: 'Taiobeiras e região',
  priceRange: '$$$'
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [formData, setFormData] = useState<BudgetForm>(initialForm);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof BudgetForm, string>>>({});
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    const onScroll = () => {
      const header = document.querySelector('.site-header');
      const scrolled = window.scrollY > 16;
      if (!header) return;
      header.classList.toggle('scrolled', scrolled);
      setIsScrolled(scrolled);
    };

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealElements.forEach((element) => observer.observe(element));

    const pageTitle = 'Buffet Miriã Soares | Buffet em Taiobeiras e região';
    const pageDescription =
      'Buffet Miriã Soares em Taiobeiras e região, com gastronomia premium, eventos elegantes e atendimento acolhedor para casamentos, aniversários e festas corporativas.';

    document.title = pageTitle;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) metaDescription.setAttribute('content', pageDescription);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', pageTitle);

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', pageDescription);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (SITE_URL) {
      if (ogUrl) {
        ogUrl.setAttribute('content', SITE_URL);
      } else {
        const urlMeta = document.createElement('meta');
        urlMeta.setAttribute('property', 'og:url');
        urlMeta.setAttribute('content', SITE_URL);
        document.head.appendChild(urlMeta);
      }

      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', SITE_URL);
    }

    window.addEventListener('scroll', onScroll);
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      revealElements.forEach((element) => observer.unobserve(element));
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeImage ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeImage]);

  const whatsappLink = useMemo(
    () => buildWhatsAppLink(INITIAL_WHATSAPP_MESSAGE),
    []
  );

  const handleFieldChange = (field: keyof BudgetForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setFormErrors((prev) => ({ ...prev, [field]: '' }));
    setSubmitMessage('');
  };

  const validateForm = () => {
    const errors: Partial<Record<keyof BudgetForm, string>> = {};

    if (!formData.name.trim()) errors.name = 'Informe seu nome completo.';
    if (!formData.phone.trim()) errors.phone = 'Informe seu telefone ou WhatsApp.';
    if (!formData.eventType.trim()) errors.eventType = 'Informe o tipo de evento.';
    if (!formData.date.trim()) errors.date = 'Informe a data prevista.';
    if (!formData.guests.trim()) errors.guests = 'Informe a quantidade estimada de convidados.';
    if (!formData.message.trim()) errors.message = 'Descreva sua ideia ou observações.';

    return errors;
  };

  const handleBudgetSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      setSubmitMessage('Revise os campos obrigatórios antes de continuar.');
      return;
    }

    const text = [
      INITIAL_WHATSAPP_MESSAGE,
      '',
      `Nome: ${formData.name}`,
      `Telefone/WhatsApp: ${formData.phone}`,
      `Tipo de evento: ${formData.eventType}`,
      `Data prevista: ${formData.date}`,
      `Quantidade estimada de convidados: ${formData.guests}`,
      `Observações: ${formData.message}`
    ].join('\n');

    setSubmitMessage('Mensagem preparada no WhatsApp.');
    window.open(buildWhatsAppLink(text), '_blank', 'noopener,noreferrer');
    setFormData(initialForm);
    setFormErrors({});
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }} />

      <header className="site-header">
        <div className="container header-inner">
          <a href="#inicio" className="brand" aria-label="Página inicial do Buffet Miriã Soares">
            <img
              className="brand-logo"
              src="/assets/logo/Logotipo Dourado Miriã Soares Buffet circular.png"
              alt="Logo Buffet Miriã Soares"
              loading="eager"
              decoding="async"
            />
          </a>

          <nav className={`main-nav ${menuOpen ? 'open' : ''}`} aria-label="Menu principal">
            {navigation.map((item) => (
              <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            ))}
            <a className="button button-primary nav-button" href={whatsappLink} target="_blank" rel="noreferrer">
              Solicitar orçamento
            </a>
          </nav>

          <button
            className="menu-toggle"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <main id="inicio">
        <section className="hero section-hero">
          <div className="hero-backdrop" />
          <div className="hero-content container reveal-on-scroll">
            <div className="eyebrow">Taiobeiras • Minas Gerais</div>
            <div className="eyebrow">Taiobeiras • Minas Gerais</div>
            <div className="eyebrow">Taiobeiras • Minas Gerais</div>
            <div className="eyebrow">Taiobeiras • Minas Gerais</div>
            <h1>Momentos especiais merecem sabores inesquecíveis.</h1>
            <p>
              O Buffet Miriã Soares cria experiências elegantes e acolhedoras para casamentos,
              aniversários, festas infantis e eventos corporativos em Taiobeiras e região, com
              gastronomia premium e atendimento cuidadoso em cada detalhe.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href={whatsappLink} target="_blank" rel="noreferrer">
                Solicitar orçamento
              </a>
              <a className="button button-secondary" href="#eventos">
                Explorar o buffet
              </a>
            </div>
          </div>
        </section>

        <section className="section cta-strip">
          <div className="container cta-strip-inner">
            <div>
              <p className="section-tag">Orçamento</p>
              <h2>Uma celebração pensada com elegância e atenção aos detalhes.</h2>
            </div>
            <a className="button button-primary" href={whatsappLink} target="_blank" rel="noreferrer">
              Solicitar orçamento
            </a>
          </div>
        </section>

        <section id="sobre" className="section about-section">
          <div className="container about-grid">
            <div className="about-copy reveal-on-scroll">
              <p className="section-tag">Sobre nós</p>
              <h2>Elegância em cada detalhe, acolhimento em cada encontro.</h2>
              <p>
                Com atenção ao que torna cada celebração singular, o Buffet Miriã Soares combina
                gastronomia refinada, ambiente acolhedor e organização cuidadosa para criar
                experiências memoráveis em Taiobeiras, Minas Gerais e região.
              </p>
              <p>
                Cada evento é pensado com personalização e presença, respeitando o momento, o estilo
                da família e a proposta da ocasião. A prioridade é que todos se sintam bem, em um
                ambiente sofisticado e genuinamente acolhedor, seja para festas íntimas ou grandes
                celebrações.
              </p>
              <div className="about-points">
                <div>
                  <strong>Personalização</strong>
                  <span>Experiências pensadas para cada ocasião.</span>
                </div>
                <div>
                  <strong>Qualidade</strong>
                  <span>Detalhes, sabor e atendimento com alto padrão.</span>
                </div>
                <div>
                  <strong>Confiabilidade</strong>
                  <span>Planejamento cuidadoso e acolhimento real.</span>
                </div>
              </div>
            </div>

            <div className="about-visual">
              <img
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80"
                alt="Mesa elegante para evento especial"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </section>

        <section id="eventos" className="section section-dark">
          <div className="container">
            <div className="section-heading align-left reveal-on-scroll">
              <p className="section-tag">Eventos</p>
              <h2>Momentos únicos para cada tipo de celebração.</h2>
            </div>

            <div className="event-grid reveal-on-scroll">
              {eventItems.map((item, index) => (
                <article
                  key={item.title}
                  className={`event-card reveal-on-scroll ${item.title === 'Confraternizações' ? 'event-card-centered' : ''}`}
                  style={{ ['--reveal-index' as string]: index }}
                >
                  <div className="event-image">
                    <img src={item.image} alt={item.title} loading="lazy" decoding="async" />
                  </div>
                  <div className="event-content">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="gastronomia" className="section gastronomy-section">
          <div className="container">
            <div className="section-heading align-center reveal-on-scroll">
              <p className="section-tag">Gastronomia</p>
              <h2>Comida que conversa em primeiro lugar com a memória.</h2>
            </div>

            <div className="gastronomy-showcase reveal-on-scroll">
              <div className="gastronomy-feature feature-large">
                <img
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80"
                  alt="Mesa gourmet com apresentação elegante"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="gastronomy-copy">
                {gastronomyItems.map((item, index) => (
                  <article key={item.title} className="gastronomy-item reveal-on-scroll" style={{ ['--reveal-index' as string]: index }}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="galeria" className="section gallery-section">
          <div className="container">
            <div className="section-heading align-center reveal-on-scroll">
              <p className="section-tag">Galeria</p>
              <h2>Ambientes e detalhes que transformam festas em lembranças.</h2>
            </div>

            <div className="gallery-grid reveal-on-scroll">
              {galleryImages.map((image, index) => (
                <button
                  key={image}
                  className={`gallery-item gallery-${index + 1} reveal-on-scroll`}
                  onClick={() => setActiveImage(image)}
                  aria-label="Abrir imagem da galeria"
                  style={{ ['--reveal-index' as string]: index }}
                >
                  <img src={image} alt={`Galeria ${index + 1}`} loading="lazy" decoding="async" />
                </button>
              ))}
            </div>

            <div className="gallery-cta">
              <a className="button button-primary" href={whatsappLink} target="_blank" rel="noreferrer">
                Solicitar orçamento
              </a>
            </div>
          </div>
        </section>

        <section className="section testimonials-section">
          <div className="container">
            <div className="section-heading align-center">
              <p className="section-tag">Depoimentos</p>
              <h2>Espaço reservado para avaliações reais.</h2>
            </div>

            <div className="testimonial-placeholder">
              <p>
                As avaliações reais da empresa serão publicadas aqui após a coleta dos depoimentos dos clientes.
              </p>
            </div>
          </div>
        </section>

        <section id="contato" className="section contact-section">
          <div className="container contact-grid">
            <div className="contact-copy">
              <p className="section-tag">Contato</p>
              <h2>Vamos transformar sua ideia em uma celebração inesquecível.</h2>
              <p>
                Conte-nos um pouco sobre o seu evento e retornaremos com atendimento especial para
                entender suas necessidades, estilo e momento ideal.
              </p>

              <div className="contact-meta">
                <span>Taiobeiras, Minas Gerais</span>
                <a className="instagram-link" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
                  <img src="/assets/img/Instagram.png" alt="Instagram" />
                  <span>@miriasoaresbuffet</span>
                </a>
              </div>

              <a className="button button-outline whatsapp-inline-button" href={whatsappLink} target="_blank" rel="noreferrer">
                <img src="/assets/img/whats.png" alt="WhatsApp" />
                <span>Falar no WhatsApp</span>
              </a>
            </div>

            <form className="contact-form" onSubmit={handleBudgetSubmit} noValidate>
              <label>
                Nome completo
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(event) => handleFieldChange('name', event.target.value)}
                  placeholder="Seu nome completo"
                  aria-invalid={Boolean(formErrors.name)}
                  className={formErrors.name ? 'invalid' : ''}
                  required
                />
                {formErrors.name && <span className="field-error">{formErrors.name}</span>}
              </label>

              <label>
                Telefone/WhatsApp
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={(event) => handleFieldChange('phone', event.target.value)}
                  placeholder="(00) 00000-0000"
                  aria-invalid={Boolean(formErrors.phone)}
                  className={formErrors.phone ? 'invalid' : ''}
                  required
                />
                {formErrors.phone && <span className="field-error">{formErrors.phone}</span>}
              </label>

              <label>
                Tipo de evento
                <input
                  type="text"
                  name="eventType"
                  value={formData.eventType}
                  onChange={(event) => handleFieldChange('eventType', event.target.value)}
                  placeholder="Casamento, aniversário, corporativo..."
                  aria-invalid={Boolean(formErrors.eventType)}
                  className={formErrors.eventType ? 'invalid' : ''}
                  required
                />
                {formErrors.eventType && <span className="field-error">{formErrors.eventType}</span>}
              </label>

              <label>
                Data prevista
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={(event) => handleFieldChange('date', event.target.value)}
                  aria-invalid={Boolean(formErrors.date)}
                  className={formErrors.date ? 'invalid' : ''}
                  required
                />
                {formErrors.date && <span className="field-error">{formErrors.date}</span>}
              </label>

              <label>
                Quantidade estimada de convidados
                <input
                  type="number"
                  min="1"
                  name="guests"
                  value={formData.guests}
                  onChange={(event) => handleFieldChange('guests', event.target.value)}
                  placeholder="Ex.: 120"
                  aria-invalid={Boolean(formErrors.guests)}
                  className={formErrors.guests ? 'invalid' : ''}
                  required
                />
                {formErrors.guests && <span className="field-error">{formErrors.guests}</span>}
              </label>

              <label>
                Descrição ou observações
                <textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={(event) => handleFieldChange('message', event.target.value)}
                  placeholder="Conte mais sobre sua ideia e o que você imagina para o evento."
                  aria-invalid={Boolean(formErrors.message)}
                  className={formErrors.message ? 'invalid' : ''}
                  required
                />
                {formErrors.message && <span className="field-error">{formErrors.message}</span>}
              </label>

              <button type="submit" className="button button-primary">
                Enviar mensagem
              </button>

              {submitMessage && (
                <p className="form-status" aria-live="polite">
                  {submitMessage}
                </p>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand-block">
            <div className="footer-brand-name">
              <span className="footer-brand-word">Buffet</span>
              <span className="footer-brand-word accent">Miriã Soares</span>
            </div>

            <div className="footer-socials" aria-label="Redes sociais">
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Instagram">
                <img src="/assets/img/Instagram.png" alt="Instagram" />
              </a>
              <a href={whatsappLink} target="_blank" rel="noreferrer" aria-label="WhatsApp">
                <img src="/assets/img/whats.png" alt="WhatsApp" />
              </a>
            </div>

            <div className="footer-contact-item">
              <span className="footer-label">Atendimento</span>
              <a href={whatsappLink} target="_blank" rel="noreferrer">
                38 99252-6383
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h3>Institucional</h3>
            <ul>
              <li><a href="#inicio">Home</a></li>
              <li><a href="#sobre">Sobre nós</a></li>
              <li><a href="#sobre">O espaço</a></li>
              <li><a href="#gastronomia">Gastronomia</a></li>
              <li><a href="#contato">Blog</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Eventos</h3>
            <ul>
              <li><a href="#eventos">Todos os eventos</a></li>
              <li><a href="#eventos">Casamentos</a></li>
              <li><a href="#eventos">Debutantes</a></li>
              <li><a href="#eventos">Aniversários</a></li>
              <li><a href="#eventos">Corporativo</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Contato</h3>
            <ul>
              <li><a href={whatsappLink} target="_blank" rel="noreferrer">Solicitar orçamento</a></li>
              <li><a href="#contato">Localização</a></li>
            </ul>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>© Copyright 2026 — Buffet Miriã Soares — Todos os direitos reservados.</span>
        </div>
      </footer>

      <a className="floating-whatsapp" href={whatsappLink} target="_blank" rel="noreferrer" aria-label="Conversar pelo WhatsApp">
        <img src="/assets/img/whats.png" alt="WhatsApp" />
      </a>

      {activeImage && (
        <div className="lightbox" onClick={() => setActiveImage(null)} role="dialog" aria-modal="true">
          <button
            className="lightbox-close"
            onClick={() => setActiveImage(null)}
            aria-label="Fechar imagem"
          >
            ×
          </button>
          <img src={activeImage} alt="Imagem ampliada da galeria" loading="eager" decoding="async" />
        </div>
      )}
    </>
  );
}

export default App;
