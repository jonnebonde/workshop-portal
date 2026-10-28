# Opprette sak – bilder – arbeidsnotater

## Formål og kildegrunnlag

Legge til dokumenterende bilder. Inngang: **/new-case · steg 4**. Kodeobservasjon 2026-10-28 ved `workshop-portal/main@b6f6829baee6b1f4d875370836253a2dc1bfacb9`. Confidence: Confirmed for statisk kode, ikke runtime eller produktgodkjenning. Se [tekstark](create-photos-copy.md).

- [PhotoUploadStep.tsx](../src/features/case-creation/components/steps/PhotoUploadStep.tsx)

## Brukerflyt

Bildeopplasting, eksempler, forhåndsvisning, fjerning og utviklerscenarier finnes i steget.

## Data, tilstander og begrensninger

Bilder håndteres lokalt i opprettelsesdata. Bilderuten kan fortsette uten at denne dokumentasjonen bekrefter en endelig produktregel for obligatoriske bilder.

## Åpne spørsmål og TODO

- [ ] Kontroller filbegrensninger, tomtilstand, tilgjengelighet og samsvar med detaljvisningen.
- [ ] Gjennomgå og velg ønskede tekstforslag i tekstarket før implementering.
- [ ] Kontroller berørte tilstander i nettleseren når UI endres.

TODO er videre arbeid, ikke rapporterte feil eller vedtatt leveranseplan. Produktkrav må kontrolleres i autorisert produktkilde; lokale kodefunn erstatter ikke dem.
