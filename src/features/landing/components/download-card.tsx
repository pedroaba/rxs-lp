import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { product } from '@/config/product';

type DownloadCardProps = { download: (typeof product.downloads)[number] };

export function DownloadCard({ download }: DownloadCardProps) {
  return (
    <Card className="download-card">
      <div className="download-card-top">
        <Icon name="apple" size={28} />
        <span>macOS {product.minimumMacOS}+</span>
      </div>
      <h3>{download.name}</h3>
      <p>{download.description}</p>
      <Button asChild className="button button-primary">
        <a href={download.url} data-download={download.id}>
          <Icon name="download" size={18} />
          {download.label}
        </a>
      </Button>
      <div className="download-meta">
        <span>
          v{product.version} · {download.format} · {download.size}
        </span>
        <a
          href={download.checksum}
          aria-label={`SHA-256: verificar integridade do download para ${download.name}`}
        >
          SHA-256 <Icon name="arrow" size={12} />
        </a>
      </div>
    </Card>
  );
}
