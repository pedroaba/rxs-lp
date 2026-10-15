import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { HeroSection } from '@/features/landing/components/hero-section';
import { BenefitsSection } from '@/features/landing/components/benefits-section';
import { FeaturesSection } from '@/features/landing/components/features-section';
import { DemoSection } from '@/features/landing/components/demo-section';
import { PrivacySection } from '@/features/landing/components/privacy-section';
import { DownloadSection } from '@/features/landing/components/download-section';
import { FaqSection } from '@/features/landing/components/faq-section';
import { FinalCtaSection } from '@/features/landing/components/final-cta-section';

export function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Pular para o conteúdo
      </a>
      <SiteHeader />
      <main id="main-content">
        <HeroSection />
        <BenefitsSection />
        <FeaturesSection />
        <DemoSection />
        <PrivacySection />
        <DownloadSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <SiteFooter />
    </>
  );
}
