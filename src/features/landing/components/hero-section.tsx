import { Icon } from '@/components/icon';
import { product } from '@/config/product';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function HeroSection() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" />
      <div className="container hero-copy">
        <a className="release-pill" href={product.releaseUrl}>
          <span className="status-dot" /> RSX {product.version}
          <span className="pill-divider" /> Feito para o seu Mac <Icon name="arrow" size={14} />
        </a>
        <h1 id="hero-title">
          Mostre o que
          <br />
          <span>você quer dizer.</span>
        </h1>
        <p className="hero-description">
          Uma boa captura vale mais que uma longa explicação.
          <br className="desktop-break" /> Capture, anote e compartilhe. Direto do seu Mac.
        </p>
        <div className="hero-actions">
          <Button asChild className="button button-primary">
            <a href="#download">
              <Icon name="apple" /> Baixar para macOS <Icon name="arrow" size={17} />
            </a>
          </Button>
          <Button asChild variant="ghost" className="text-button">
            <a href="#demo">
              <Icon name="play" size={17} /> Veja como funciona
            </a>
          </Button>
        </div>
        <p className="hero-meta">
          Gratuito e de código aberto <span>·</span> macOS {product.minimumMacOS}+
        </p>
      </div>
      <div className="container hero-stage">
        <div className="stage-topline">
          <span>
            <span className="tiny-cross">+</span> MENOS EXPLICAÇÃO. MAIS CLAREZA.
          </span>
          <span className="stage-number">01 / CAPTURE. ANOTE. COMPARTILHE.</span>
        </div>
        <div className="product-stage">
          <img
            className="hero-editor"
            src="/media/hero-editor.webp"
            srcSet="/media/hero-editor-small.webp 720w, /media/hero-editor.webp 1440w"
            sizes="(max-width: 760px) 94vw, 1040px"
            width="1440"
            height="969"
            alt="Editor real do RSX em tema escuro, com seta, retângulo e desenho livre sobre uma captura, além de botões para copiar e salvar PNG"
            fetchPriority="high"
          />
          <Badge variant="outline" className="stage-label">
            <span className="status-dot" /> Interface real do RSX
          </Badge>
        </div>
        <div className="stage-bottomline">
          <span>
            <Icon name="capture" size={15} /> Nativo no macOS.
          </span>
          <span>
            Seu fluxo, sem interrupções. <Icon name="arrow" size={15} />
          </span>
        </div>
      </div>
    </section>
  );
}
