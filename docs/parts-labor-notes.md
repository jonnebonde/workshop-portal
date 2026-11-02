# Deler og arbeid – arbeidsnotater

## Formål og kildegrunnlag

Vise og redigere reparasjonslinjer. Inngang: **Saksdetaljer**. Kodeobservasjon 2026-10-28 ved `workshop-portal/main@b6f6829baee6b1f4d875370836253a2dc1bfacb9`. Confidence: Confirmed for statisk kode, ikke runtime eller produktgodkjenning. Se [tekstark](parts-labor-copy.md).

- [PartsLaborSection.tsx](../src/components/sections/PartsLaborSection.tsx)

## Brukerflyt

Oppdatert 2026-11-02 etter brukerens beskrivelse av testmiljøet: Add Item-knappen er fjernet. En tom, lokalt holdt «New line» vises nederst. Når nødvendige felt er utfylt, kjøres en simulert avtalesjekk ved feltvalidering (blur), og linjen lagres med resultat. Deretter vises én ny tom linje. Validering ved blur gjør at artikkelnummer kan skrives ferdig før sjekken starter.

Del krever kategori, artikkelnummer, positivt antall, ikke-negativ pris og rabatt mellom 0 og 100. Arbeid krever beskrivelse, positive timer og ikke-negativ timepris; artikkelnummer og rabatt er ikke relevante i dagens arbeidsrad. Pris og rabatt kan være 0. Tomme/ugyldige numeriske felt behandles som ufullstendige, uten at 0 automatisk blir erstattet av 1 eller standard timepris. Kommentar og status er resultater, ikke obligatoriske inndata.

Den tomme raden ligger utenfor saksdata, totaler og fullføringsstatus. Nye tomme rader akkumuleres ikke. Sletting av siste lagrede linje etterlater én tom rad. Dersom saken allerede har ufullstendige lagrede linjer, bevares de og det legges ikke til en ekstra tom rad før disse er fylt ut. Bytte av sak nullstiller den lokale raden. Clear new line tømmer kun utkastet.

## Data, tilstander og begrensninger

Kodeobservasjonen gjelder lokal oppdatering via onUpdate, ikke agentens mottak og godkjenning.

Brukeren har uttrykkelig akseptert en simulert avtalesjekk, inkludert manuell vurdering når det ikke finnes en match. [Ordrelinjehjelperen](../src/utils/orderLines.ts) bruker bare demoavtalene som datakilden har tilordnet demobrukeren, avgrenset til sakens forsikringsselskapsnavn og aktive demoversjoner. Ett entydig treff på delens artikkel-ID sammenlignes med innlagt pris, rabatt og fakturerbarhet. Et demotreff merkes «Demo: price matches agreement» og lagrer avtale-/versjonsreferanse. Manglende, overlappende, historisk, avvikende eller prisukjent treff gir «Demo: pending manual approval». Begge resultater tillater neste rad.

Arbeidslinjer går til manuell vurdering fordi Agreements-demoen ikke definerer en sikker timepris-/enhetskobling. Selskap, kjøretøy, valuta, avgift, dato for faktisk prisvalg og produksjonstilordning er ikke en ferdig kontrakt i denne demoen. Ingen global fallback eller automatisk prisendring er innført. Dersom sakens selskap ikke finnes i de tilordnede demoavtalene, blir resultatet manuell vurdering; det velges ikke et annet demoselskap automatisk.

Demokontrollen er ikke agentgodkjenning og erstatter ikke eksisterende agentkommentarer. Ved redigering nullstilles demokontrollen, og linjen sjekkes på nytt ved neste gyldige feltvalidering. Eksisterende priser, fakturaberegning og godkjenningsregler er ikke erstattet av en ny prisregel.

Tre målrettede tester (`npm run test:order-lines`) dekker obligatoriske felt, nullpris/ugyldige tall, avgrenset demomatching og manuell vurdering, og en komponentflyt med simulerte React-hooks for utfylling, redigering og sletting uten lagrede tomrader. Nettleserkontroll av fokus, tastatur og radopprettelse gjenstår.

## Åpne spørsmål og TODO

- [ ] Avklar og test hvilke felt som kan endres i hver saksstatus og hvordan forslag skiller seg fra godkjente verdier.
- [ ] Gjennomgå og velg ønskede tekstforslag i tekstarket før implementering.
- [ ] Kontroller berørte tilstander i nettleseren når UI endres.

TODO er videre arbeid, ikke rapporterte feil eller vedtatt leveranseplan. Produktkrav må kontrolleres i autorisert produktkilde; lokale kodefunn erstatter ikke dem.
