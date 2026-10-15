import { Icon } from '@/components/icon';

export function Brand() {
  return (
    <a className="brand" href="#home" aria-label="RSX — início">
      <span className="brand-mark">
        <Icon name="capture" size={22} />
      </span>
      <span>
        RSX<span className="brand-dot">.</span>
      </span>
    </a>
  );
}
