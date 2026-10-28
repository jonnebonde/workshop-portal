# Opprette sak – ramme og navigasjon – arbeidsnotater

## Formål og kildegrunnlag

Føre brukeren gjennom opprettelse, utkast og innsending. Inngang: **/new-case**. Kodeobservasjon 2026-10-28 ved `workshop-portal/main@b6f6829baee6b1f4d875370836253a2dc1bfacb9`. Confidence: Confirmed for statisk kode, ikke runtime eller produktgodkjenning. Se [tekstark](create-case-copy.md).

- [NewCasePage.tsx](../src/pages/NewCasePage.tsx)
- [CaseCreationFeature.tsx](../src/features/case-creation/CaseCreationFeature.tsx)
- [ProgressBar.tsx](../src/features/case-creation/components/ProgressBar.tsx)
- [StepNavigation.tsx](../src/features/case-creation/components/StepNavigation.tsx)

## Brukerflyt

Fem steg: VRN Lookup, Claim Form, Parts & Labor, Photos og Invoice. Stegnavigasjon, lagre utkast, stopp, hopp over og sluttvisning har egne tilstander.

## Data, tilstander og begrensninger

Lagring simuleres med timeout og console.log. NewCasePage setter ikke onCaseSubmitted. Sluttvisningen beviser derfor ikke at en sak er lagret eller sendt til agent.

## Åpne spørsmål og TODO

- [ ] Brukerønske 2026-10-28: Støtt flere brukere og særlig kjedebrukere som kan opprette saker på vegne av verksteder i egen kjede. Disse brukerne må kunne velge hvilket verksted saken opprettes for. Avklar bruker-/rollemodell, hvilke verksteder hver bruker kan representere, og hvordan valgt verksted følger saken. Dette beskriver ønsket funksjon, ikke eksisterende tilgangsstyring. Behovet for verkstedbasert sortering/filtrering vurderes i [saksoversikten](cases-notes.md).
- [ ] Test alle avslutninger og tilstander; avklar koblingen til saksliste og backend før leveransestatus endres.
- [ ] Gjennomgå og velg ønskede tekstforslag i tekstarket før implementering.
- [ ] Kontroller berørte tilstander i nettleseren når UI endres.

TODO er videre arbeid, ikke rapporterte feil eller vedtatt leveranseplan. Produktkrav må kontrolleres i autorisert produktkilde; lokale kodefunn erstatter ikke dem.
