# Bilder og vedlegg – arbeidsnotater

## Formål og kildegrunnlag

Laste opp, se og fjerne bilder og tilleggsdokumenter. Inngang: **Saksdetaljer**. Kodeobservasjon 2026-10-28 ved `workshop-portal/main@b6f6829baee6b1f4d875370836253a2dc1bfacb9`. Confidence: Confirmed for statisk kode, ikke runtime eller produktgodkjenning. Se [tekstark](images-copy.md).

- [ImageSection.tsx](../src/components/sections/ImageSection.tsx)
- [AdditionalDocumentsSection.tsx](../src/components/sections/AdditionalDocumentsSection.tsx)
- [ImageExampleModal.tsx](../src/components/sections/ImageExampleModal.tsx)
- [ImageModal.tsx](../src/components/ImageModal.tsx)
- [DeleteImageModal.tsx](../src/components/DeleteImageModal.tsx)

## Brukerflyt

Bilder og øvrige vedlegg har separate seksjoner. Forhåndsvisning og sletting bruker dialoger; bildeseksjonen har eksempler.

## Data, tilstander og begrensninger

Dokumentverdier og bilde-URL-er er utelatt fra tekstarkene. Lokal filbehandling bekrefter ikke backendlagring eller virus-/tilgangskontroll.

## Åpne spørsmål og TODO

- [ ] Kontroller kategorier, format/størrelse, tilgjengelighet i dialoger og sletting med syntetiske filer.
- [ ] Gjennomgå og velg ønskede tekstforslag i tekstarket før implementering.
- [ ] Kontroller berørte tilstander i nettleseren når UI endres.

TODO er videre arbeid, ikke rapporterte feil eller vedtatt leveranseplan. Produktkrav må kontrolleres i autorisert produktkilde; lokale kodefunn erstatter ikke dem.
