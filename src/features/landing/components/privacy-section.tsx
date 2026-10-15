import { Icon } from '@/components/icon';
import { product } from '@/config/product';

export function PrivacySection() {
  return (
    <section className="privacy container" aria-labelledby="privacy-title">
      <div className="privacy-art" aria-hidden="true">
        <div className="privacy-orbit orbit-one" />
        <div className="privacy-orbit orbit-two" />
        <div className="privacy-shield">
          <Icon name="shield" size={48} />
        </div>
        <span className="local-tag">
          <span className="status-dot" /> LOCAL, POR NATUREZA
        </span>
      </div>
      <div className="privacy-copy">
        <p className="eyebrow">O QUE É SEU, FICA COM VOCÊ</p>
        <h2 id="privacy-title">
          Na sua tela.
          <br />
          <span>No seu Mac.</span>
        </h2>
        <p>
          Suas capturas não precisam dar uma volta na internet. Capture, edite e exporte localmente,
          sem upload ou sincronização.
        </p>
        <ul>
          <li>
            <Icon name="check" size={17} /> Processamento no próprio dispositivo
          </li>
          <li>
            <Icon name="check" size={17} /> Sem envio de capturas para servidores
          </li>
          <li>
            <Icon name="check" size={17} /> Código aberto para você conferir
          </li>
        </ul>
        <a className="inline-link" href={product.repository}>
          Conheça o projeto no GitHub <Icon name="arrow" size={16} />
        </a>
      </div>
    </section>
  );
}
