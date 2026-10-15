import { useState } from 'react';
import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';

type VideoPlayerProps = { short?: boolean };

export function VideoPlayer({ short = false }: VideoPlayerProps) {
  const [isActive, setIsActive] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);
  const fileName = short ? 'rsx-short' : 'rsx-demo';
  const duration = short ? 8 : 25;
  const label = short ? 'Ver versão rápida' : 'Ver o RSX em ação';
  const title = `Demonstração animada do RSX, ${duration} segundos`;

  function handlePlaybackError() {
    setIsActive(false);
    setHasFailed(true);
  }

  return (
    <div className={short ? 'short-video' : undefined}>
      <div className="video-frame">
        {isActive ? (
          <video
            controls
            autoPlay
            playsInline
            preload="none"
            poster={`/media/${fileName}-poster.webp`}
            aria-label={title}
            onError={handlePlaybackError}
          >
            <source src={`/media/${fileName}.webm`} type="video/webm" />
            <source src={`/media/${fileName}.mp4`} type="video/mp4" />
            <track
              kind="captions"
              src={`/media/${fileName}.vtt`}
              srcLang="pt"
              label="Português"
              default
            />
            Seu navegador não reproduz este vídeo.
          </video>
        ) : (
          <>
            <img
              src={`/media/${fileName}-poster.webp`}
              width="1280"
              height="720"
              alt="Demonstração animada do editor do RSX com ferramentas de anotação e exportação PNG"
              loading="lazy"
            />
            <Button
              variant="ghost"
              className="play-button"
              type="button"
              onClick={() => {
                setHasFailed(false);
                setIsActive(true);
              }}
            >
              <span>
                <Icon name="play" size={24} />
              </span>
              <strong>{label}</strong>
              <small>{duration} segundos · sem áudio</small>
            </Button>
            <noscript>
              <a className="video-fallback" href={`/media/${fileName}.mp4`}>
                Assistir à demonstração em MP4
              </a>
            </noscript>
          </>
        )}
      </div>
      {hasFailed ? (
        <p className="video-error" role="status">
          Não foi possível reproduzir o vídeo. Você pode tentar novamente ou{' '}
          <a href={`/media/${fileName}.mp4`} download>
            Baixar demonstração em MP4
          </a>
          .
        </p>
      ) : null}
    </div>
  );
}
