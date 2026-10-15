import { Brand } from '@/components/brand';
import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const navigationItems = [
  { href: '#features', label: 'Recursos' },
  { href: '#demo', label: 'Como funciona' },
  { href: '#faq', label: 'Perguntas frequentes' },
];

export function SiteHeader() {
  return (
    <header className="header" id="home">
      <div className="container header-inner">
        <Brand />
        <nav className="nav" aria-label="Navegação principal">
          {navigationItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <Button asChild className="button button-small">
            <a href="#download">
              Baixar RSX <Icon name="arrow" size={16} />
            </a>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="menu-toggle" aria-label="Abrir menu">
                <Icon name="menu" />
              </Button>
            </SheetTrigger>
            <SheetContent className="mobile-sheet">
              <SheetHeader>
                <SheetTitle>Explore o RSX</SheetTitle>
                <SheetDescription>
                  Capture, anote e compartilhe. Direto do seu Mac.
                </SheetDescription>
              </SheetHeader>
              <nav className="sheet-nav" aria-label="Navegação móvel">
                {navigationItems.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <a href={item.href}>
                      {item.label}
                      <Icon name="arrow" size={17} />
                    </a>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <a href="#download">
                    Baixar para macOS
                    <Icon name="download" size={17} />
                  </a>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <noscript>
        <nav className="noscript-nav" aria-label="Navegação sem JavaScript">
          {navigationItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </noscript>
    </header>
  );
}
