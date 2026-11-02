# Logg og meldinger – arbeidsnotater

## Formål og kildegrunnlag

Lese hendelser og sende en kommentar i saken. Inngang: **Saksdetaljer**. Opprinnelig kodeobservasjon 2026-10-28 ved `workshop-portal/main@b6f6829baee6b1f4d875370836253a2dc1bfacb9`. Oppdatert 2026-11-02 etter brukerens skjermbilde og uttrykkelige avklaring om å skille Comments og Activity log og beholde repoets nye utforming. Kode-/demobeskrivelse, ikke bekreftelse av backend eller produksjon. Se [tekstark](communication-copy.md).

- [CommunicationLogSection.tsx](../src/components/sections/CommunicationLogSection.tsx)
- [ActionLogView.tsx](../src/components/sections/ActionLogView.tsx)

## Brukerflyt

Under fakturaen vises Comments og Activity log ved siden av hverandre på desktop og under hverandre på mobil. Fakturaen bruker full rad. Fremdriftslinjen har egne snarveier til begge feltene; ingen av dem er obligatoriske for saksfullføring.

Comments har skrivefelt, tomtilstand, avsender og tidspunkt. Tom melding avvises lokalt; Enter sender og Shift+Enter gir linjeskift. Activity log har ingen skrivefelt. Begge feltene markeres sett separat gjennom IntersectionObserver, med separate ulestmarkeringer i fremdriftslinjen. Egen kommentar regnes ikke som ulest inngående melding. Bytte av sak monterer kommunikasjonen på nytt og nullstiller skrivefeltet.

## Data, tilstander og begrensninger

Nye kommentarer legges til lokal actionLog gjennom onUpdate med eksplisitt `actionType: 'comment_added'`. Andre typer blir stående i Activity log. Eksisterende `other`- og `note_added`-oppføringer omklassifiseres ikke; dette bevarer innhold og unngår å gjette om eldre oppføringer var meldinger, interne notater eller hendelser. Ingen eldre data slettes eller migreres. En integrasjon må levere et tydelig, autorisert skille mellom kommentarer og hendelser.

Kommentarsending er lokal demo. Dette bekrefter ikke mottak hos saksbehandler, varsling, serverlagring eller tilgang til interne notater. Backend-/API-kontrakten i testmiljøet kan ikke utledes fra skjermbildet. Separate lesetidspunkt bruker `lastCommentsViewedAt` og eksisterende `lastLogViewedAt`.

Fire tester (`npm run test:communication`) dekker tapsfri deling, bevaring av eldre oppføringer, validering/identitet for nye kommentarer, separate ulesttilstander og rendret oppdeling mellom skrivefelt og hendelser. Nettleserkontroll av sending, rulling og mobilvisning gjenstår.

## Åpne spørsmål og TODO

- [ ] Avklar meldings-/hendelsestyper, mottak, feilhåndtering og serverstyrt tilgang.
- [ ] Gjennomgå og velg ønskede tekstforslag i tekstarket før implementering.
- [ ] Kontroller berørte tilstander i nettleseren når UI endres.

TODO er videre arbeid, ikke rapporterte feil eller vedtatt leveranseplan. Produktkrav må kontrolleres i autorisert produktkilde; lokale kodefunn erstatter ikke dem.
