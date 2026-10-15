import { Icon } from '@/components/icon';
import { product } from '@/config/product';
import { DownloadCard } from './download-card';
import { InstallationSteps } from './installation-steps';

export function DownloadSection() {
  return (
    <section
      className="section container download-section"
      id="download"
      aria-labelledby="download-title"
    >
      <div className="download-header">
        <p className="eyebrow">SUA PRÓXIMA IDEIA, MAIS CLARA</p>
        <h2 id="download-title">
          Pronto para ir
          <br />
          <span>direto ao ponto?</span>
        </h2>
        <p>Escolha seu Mac. O resto é com o RSX.</p>
      </div>
      <div className="downloads">
        {product.downloads.map((download) => (
          <DownloadCard key={download.id} download={download} />
        ))}
      </div>
      <p className="download-footnote">
        Não sabe qual escolher? Menu Apple → Sobre Este Mac.{' '}
        <a href={product.releaseUrl}>
          Ver notas da versão <Icon name="arrow" size={13} />
        </a>
      </p>
      <InstallationSteps />
    </section>
  );
}
