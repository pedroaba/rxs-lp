// Update only after verifying the published GitHub release assets.
export const product = {
  name: 'RSX',
  version: '0.3.0',
  minimumMacOS: '13',
  repository: 'https://github.com/pedroaba/rxs',
  releases: 'https://github.com/pedroaba/rxs/releases',
  releaseUrl: 'https://github.com/pedroaba/rxs/releases/tag/v0.3.0',
  releaseDate: '2026-09-21',
  verifiedAt: '2026-10-15',
  archiveAppName: 'RXS.app',
  signature: 'ad-hoc',
  downloads: [
    {
      id: 'arm64',
      name: 'Apple Silicon',
      description: 'M1, M2, M3, M4 ou posterior',
      label: 'Baixar para Apple Silicon',
      format: 'ZIP',
      size: '437 KB',
      url: 'https://github.com/pedroaba/rxs/releases/download/v0.3.0/RXS-v0.3.0-macos-arm64.zip',
      checksum:
        'https://github.com/pedroaba/rxs/releases/download/v0.3.0/RXS-v0.3.0-macos-arm64.zip.sha256',
    },
    {
      id: 'x86_64',
      name: 'Intel',
      description: 'Mac com processador Intel',
      label: 'Baixar para Intel',
      format: 'ZIP',
      size: '467 KB',
      url: 'https://github.com/pedroaba/rxs/releases/download/v0.3.0/RXS-v0.3.0-macos-x86_64.zip',
      checksum:
        'https://github.com/pedroaba/rxs/releases/download/v0.3.0/RXS-v0.3.0-macos-x86_64.zip.sha256',
    },
  ],
} as const;
