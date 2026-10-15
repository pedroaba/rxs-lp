import { Icon } from '@/components/icon';
import { Card } from '@/components/ui/card';

export function FeaturesSection() {
  return (
    <section className="section container" id="features" aria-labelledby="features-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">PEQUENAS FERRAMENTAS. GRANDES DIFERENÇAS.</p>
          <h2 id="features-title">
            O essencial.
            <br />
            <span>No lugar certo.</span>
          </h2>
        </div>
        <p>
          Para explicar um ajuste, dar um feedback
          <br className="desktop-break" /> ou compartilhar uma ideia com clareza.
        </p>
      </div>
      <div className="feature-grid">
        <Card className="feature-card feature-large">
          <div className="feature-copy">
            <span className="feature-number">01 — ANOTE</span>
            <h3>Deixe o ponto de vista claro.</h3>
            <p>
              Setas, retângulos e desenho livre. Destaque exatamente o que a outra pessoa precisa
              ver.
            </p>
          </div>
          <div className="annotation-visual">
            <img
              src="/media/feature-annotations.webp"
              width="1000"
              height="563"
              loading="lazy"
              alt="Detalhe de uma imagem exportada pelo RSX: seta vermelha, retângulo e traço livre destacam diferentes áreas"
            />
          </div>
          <div className="feature-tags">
            <span>Seta</span>
            <span>Retângulo</span>
            <span>Desenho livre</span>
          </div>
        </Card>
        <Card className="feature-card feature-color">
          <div className="feature-copy">
            <span className="feature-number">02 — PERSONALIZE</span>
            <h3>A cor também comunica.</h3>
            <p>
              Ajuste cor, opacidade e espessura. Salve seus tons favoritos para a próxima captura.
            </p>
          </div>
          <div className="color-visual">
            <img
              src="/media/color-picker.webp"
              width="520"
              height="614"
              loading="lazy"
              alt="Seletor real de cores do RSX, com controles de cor, opacidade e paleta persistente"
            />
          </div>
        </Card>
        <Card className="feature-card feature-shortcuts">
          <div className="feature-copy">
            <span className="feature-number">03 — MANTENHA O RITMO</span>
            <h3>Suas mãos já sabem o caminho.</h3>
            <p>Atalhos globais configuráveis. Desfaça, refaça, copie e salve sem perder o ritmo.</p>
          </div>
          <div className="keyboard" aria-label="Command C para copiar">
            <kbd>⌘</kbd>
            <kbd>C</kbd>
            <span>Copiou. Compartilhou.</span>
          </div>
        </Card>
        <Card className="feature-card feature-export">
          <div className="feature-copy">
            <span className="feature-number">04 — LEVE COM VOCÊ</span>
            <h3>Seu PNG. Cada pixel.</h3>
            <p>
              Copie para o clipboard ou salve um arquivo. A exportação preserva a resolução
              original.
            </p>
          </div>
          <div className="export-visual" aria-hidden="true">
            <div className="file-icon">
              <Icon name="capture" size={27} />
              <span>PNG</span>
            </div>
            <div className="export-line" />
            <span className="export-check">
              <Icon name="check" size={20} />
            </span>
          </div>
        </Card>
      </div>
    </section>
  );
}
