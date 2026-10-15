import { Icon } from '@/components/icon';
import { VideoPlayer } from '@/components/media/video-player';

export function DemoSection() {
  return (
    <section className="section demo-section" id="demo" aria-labelledby="demo-title">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">DO SEU MAC PARA A CONVERSA</p>
            <h2 id="demo-title">
              Menos idas e vindas.
              <br />
              <span>Mais entendimento.</span>
            </h2>
          </div>
          <p>
            Veja as ferramentas, os detalhes
            <br className="desktop-break" /> e o resultado em poucos segundos.
          </p>
        </div>
        <VideoPlayer />
        <div className="demo-caption">
          <span>
            <span className="status-dot" /> Demonstração animada · imagens reais do editor
          </span>
          <span>25 segundos · sem áudio</span>
        </div>
        <p className="demo-transcript">
          No editor, destaque informações com setas, retângulos e desenho livre. Ajuste as cores e a
          espessura. Ao terminar, copie ou salve a imagem em PNG.
        </p>
        <details className="quick-demo">
          <summary>
            Com pressa? Assista à versão de 8 segundos <Icon name="chevron" size={16} />
          </summary>
          <VideoPlayer short />
        </details>
      </div>
    </section>
  );
}
