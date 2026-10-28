# Arbeidsflyt for Workshop Portal

Opprettet 2026-10-28. [AGENTS.md](AGENTS.md) er inngangen.

## Oppstart og samarbeid

1. Les gjeldende instrukser og kontroller branch, HEAD og `git status --short` før endringer.
2. Bruk [docs/portal-pages.md](docs/portal-pages.md) og bare relevante notes-/copy-filer. Søk målrettet med `rg`.
3. Bevar brukerarbeid og samtidige endringer. Ikke reset, stash automatisk, force-push eller stage uvedkommende filer.
4. Vær en konkret sparringspartner: synliggjør relevante avveininger og uavklarte produktvalg, men gjør rutinemessige valg innenfor oppdraget.

## Repo og kontroller

React 18, TypeScript og Vite ligger under `src/`. Ruter defineres i `src/App.tsx`; delt navigasjon i `src/components/Layout.tsx`. Opprettelsesflyten ligger i `src/features/case-creation/`. Detaljvisning og opprettelse har separate datahooks og kalibreringskomponenter.

Kjør fra repo-roten, med installerte avhengigheter:

| Kommando | Bruk |
| --- | --- |
| `npm run dev` | Lokal Vite-server; kontroller faktisk adresse/port. |
| `npm run build` | Vite-bygg; ikke separat TypeScript-typekontroll. |
| `npm run lint` | Eksisterende ESLint-oppsett. |
| `npm run test:calibration` | Eksisterende kalibreringsregresjon ved endret kalibreringslogikk. |
| `npm run preview` | Forhåndsvise et eksisterende bygg. |
| `git diff --check` | Whitespace-kontroll. |

Velg kontroller etter endringen. Rene dokumentasjonsendringer krever lenker, kildefiler, unike ID-er, forslag og diffkontroll; de trenger normalt ikke applikasjonsbygg. Endrede brukerflyter krever relevante funksjonstester og nettleserkontroll. Rapporter eksisterende feil separat. Bygg, merge og demo bekrefter ikke produksjon.

## Sidenotater og tekstark

- Notes beskriver formål, brukerflyt, kildegrunnlag, tilstander, begrensninger og åpne spørsmål.
- Copy bruker `ID / Hvor / Dagens tekst / Forslag`. Se [redigeringsveiledningen](docs/editing-copy.md).
- Behold tekst-ID-er og brukerens forslag. Nye tekster får nye ID-er; gamle ID-er skal ikke renummereres eller gjenbrukes.
- Behold dynamiske plassholdere. Tomt Forslag betyr ingen endring. Et forslag er ikke automatisk en godkjent produktregel.
- Før valgt tekst implementeres, kontroller at kode og plassering fortsatt stemmer. Marker gjennomførte, endrede og fjernede tekster slik at ingen forslag forsvinner lydløst.
- Ved nye sider: oppdater sideoversikten og opprett relevante notes-/copy-filer. Delte tekster dokumenteres ett sted.

## Eksternt produktminne og personvern

Kanonisk produktminne er [Memory-Archive](https://github.com/jonnebonde/Memory-Archive), branch `main`. Ved produktarbeid: les arkivets AGENTS.md, arbeids.md og README.md; bruk feature-index.md til selektiv lesing. Aktuelle innganger er portals/workshop-portal.md og berørte featurefiler. Følg arkivets rutine, ikke eldre kopier av status.

Bruk tilgjengelig GitHub-tilgang eller eksisterende autentisering. En eventuell lokal klone skal ligge under ignorert `.product-memory/`. Kontroller remote, branch og arbeidsstatus før fetch; fast-forward bare på ren main. Bevar lokale og samtidige endringer. Ved tilgangsfeil: fortsett uavhengig arbeid og rapporter konkret begrensning. Ikke hev at minnet er lest eller skrevet uten verifisering.

Dette repoet var offentlig ved opprettelsen av dokumentasjonen. Ikke publiser innhold fra privat produktminne, interne møtekilder, personopplysninger, saksdata, tokens eller credentials her. Kodebaserte beskrivelser kan dokumenteres uten å eksportere underliggende data. Ikke les `.env` eller eksempel-/kunderegistre for å fylle tekstark. Jira og Confluence er lesekilder; kilder merket privat og personlig materiale er utenfor omfanget.

Ved oppgaveslutt: vurder om varig produktkunnskap faktisk er endret. Ingen relevant produktendring gir ingen minneskriving. Ved nødvendig minneoppdatering: les sources/maintenance.md, siste berørte filer og gjeldende HEAD; bevar samtidig arbeid, kontroller full diff, kjør arkivets `python3 scripts/validate_memory.py` og les lagrede filer tilbake. Samle én oppdatering og oppgi verifisert commit/PR. En åpen PR er ventende.

Bevar FACT, DECISION, PROPOSAL, OPEN_QUESTION, HISTORICAL og SUPERSEDED med kilde og dato. Demo/mockup, utviklerleveranse og dokumentasjon er separate spor. Redigeringsdato er ikke leveransebekreftelse. Ikke opprett tidsstyrte oppgaver som del av dokumentasjonsarbeidet.

## Levering

Rapporter hva som ble endret, kontroller og begrensninger, branch/commit og minnestatus. Kontroller alle nye filer og relevante lenker før commit. Push normalt til avtalt arbeidsgren; bekreft remote og les endringer tilbake før ekstern lagring påstås.
