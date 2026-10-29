# Oppgave: Agreements i Workshop Portal

Dato: 2026-10-29. Status: arbeidsbeskrivelse for implementering og gjennomgang, ikke godkjent produksjonsspesifikasjon.
Dokumentgren: `docs/workshop-agreements-task`, fra WP `main@c6748b89cfecff6d9bf77b8eb6f9317b42ac8e1c`.

## Mål og bestilling

Bygg Agreements i WP med konsistent design og utførelse basert på eksisterende Agreements i Partner Portal (PP) og Agent Portal (AP), tilpasset verkstedets behov.

**Eksplisitte krav fra Jonne i denne samtalen:**

- Verkstedet skal kun se avtaler som gjelder det selv, basert på hvilken avtale det har.
- Preferred Partner skal ikke være synlig for verkstedet.
- Implementeringen skal ligge på en egen WP-gren, adskilt fra main og dokumentasjonsarbeidet.
- Denne leveransen er en ny gren med oppgavebeskrivelse og referanser.

**Arbeidsgrunnlag fra referanseoppsettet:** en lesemodus for priser, vilkår og historikk. Ikke overfør administrasjonsrettigheter fra AP/PP til WP. Se referansene nedenfor for kontekst; detaljer må kontrolleres mot aktuell kode før gjenbruk.

## Omfang for første versjon

1. Legg Agreements til i WP-navigasjonen og opprett en side. Foreslått rute er `/price-agreement`, slik som i referanseportalene.
2. Vis tydelig hvilket verksted og forsikringsselskap avtalegrunnlaget gjelder.
3. Vis bare avtaleområder og avtaler som datakilden uttrykkelig har tilordnet verkstedet. Ikke tilby en global oversikt over andre kjeder eller verksteder.
4. Tilpass lesemodus for relevant prisavtale eller rammevilkår, og tilordnede rutepriser. Ikke utled nye prioriterings-/fallbackregler fra UI-et.
5. Vis avtalenavn, omfang, versjon, gyldighet og tydelig skille mellom gjeldende og historiske priser.
6. Bruk søk og filtre for kjøretøytype/kategori samt grupperte prislinjer etter mønsteret i AP/PP. Aktuelle felt: ID/artikkel, pris, rabatt, makstimer, kommentar og fakturerbarhet der det er relevant.
7. Ingen handlinger for opprettelse, redigering, opplasting, publisering eller deaktivering.
8. Ingen Preferred Partner-fane, nivå, rangering, historikk eller annen indirekte visning av partnerpreferanser.
9. Håndter lasting, manglende innlogging, manglende tilordning, tom avtale og søk uten treff tydelig.
10. Oppdater sidenotater, tekstark og sideoversikt sammen med implementeringen.

## Tilgang og data

WP har et eksisterende demooppsett. En første demo kan bruke tydelig merkede, fiktive selskaper, avtaler og priser. Dette demonstrerer visning og filtrering, ikke reell autorisasjon.

I en integrert løsning skal backend utlede tilgang fra autorisert identitet og organisasjon og bare returnere tillatte avtaler og versjoner. Klientfiltrering, skjulte faner og brukerredigerbare profilfelter er ikke tilstrekkelig tilgangskontroll. Preferred Partner-data bør utelates fra WP-responsen helt.

Bruk eksplisitte avtaletilordninger. Manglende avtale eller oppslagsfeil skal ikke automatisk åpne en generell katalog eller gi tilgang til rammevilkår. Ukjent verksted får ingen avtaledata.

## Åpne avklaringer

| Tema | Avklaring før endelig integrasjon |
| --- | --- |
| Roller | Hvilke rettigheter har vanlig bruker, verkstedadmin og kjedebruker? |
| Kjedekontekst | Skal kjedebruker velge et autorisert verksted, eller se kjedens avtale samlet? |
| Avtaletilordning | Hvordan representeres kjede-/enkeltverkstedavtale og tilordnede rammevilkår? |
| Flere avtaler | Hvilken kilde avgjør riktig avtale ved overlapp? |
| Historikk | Hvilke versjoner kan verkstedet se, særlig etter endret kjedetilhørighet? |
| Fremtidige versjoner | Skal publiserte fremtidige versjoner være synlige? Upubliserte utkast skal ikke deles som gjeldende avtaler. |
| Prisgrunnlag | Valuta, avgift, tom pris, rabatt, enheter og fakturerbarhet må følge datakontrakten. |
| Datoregler | Skill versjonsvisning fra faktisk prisvalg på en sak. Siden skal ikke innføre en ny prisberegningsregel. |
| API | Endepunkt, responsskjema, serverautorisasjon, feiltilstander og datakilder. |
| Eksport | Behov og rettigheter for nedlasting/eksport er ikke avklart i bestillingen. |

## Akseptansekriterier

- [ ] Agreements kan åpnes fra WP-navigasjonen og direkte via ruten.
- [ ] Visningen bruker WP-designet og gjenkjennelige avtaleområder/tabeller fra AP/PP.
- [ ] Verksted A kan ikke se verksted Bs avtaler, priser eller historikk.
- [ ] Manglende/ukjent tilordning gir en tomtilstand, ikke generell tilgang.
- [ ] Bytte av forsikringsselskap eller verksted fjerner forrige konteksts valgte avtale/versjon og data.
- [ ] Preferred Partner er fraværende i visning og WP-datakontrakt.
- [ ] Ingen administrasjonshandlinger finnes i WP.
- [ ] Historiske priser er tydelig merket; dato og versjon følger tabellinnholdet.
- [ ] Søk, kombinerte filtre og nullstilling fungerer, inkludert ingen treff.
- [ ] Desktop, mobil, tastatur, feltnavn og horisontal tabellrulling er kontrollert i nettleser.
- [ ] Bygg, målrettet lint/typekontroll og relevante tilgangs-/filtreringstester består.
- [ ] Notes, copy og sideoversikt beskriver implementert omfang og gjenstående integrasjon.

## Referanser og leserekkefølge

Les gjeldende repo-instrukser først. AP/PP-lenkene kan kreve privat repo-tilgang. De er referanser for autoriserte lesere; private kilder, prisdata og interne notater skal ikke kopieres inn i det offentlige WP-repoet.

| Referanse | Bruk |
| --- | --- |
| [WP arbeidsflyt](../arbeids.md) og [sideoversikt](portal-pages.md) | Instrukser, dokumentasjonsmønster og eksisterende sider. |
| [WP routing](../src/App.tsx) og [Layout](../src/components/Layout.tsx) | Integrasjon av side og navigasjon. |
| [WP AuthContext](../src/context/AuthContext.tsx) | Dagens auth-grense; kontroller demopremisset før integrasjon. |
| [WP designfarger](../tailwind.config.js) | Eksisterende farger og Tailwind-oppsett. |
| [PP avtalenotater, Prisavtale-v3](https://github.com/jonnebonde/PartnerPortalV2/blob/Prisavtale-v3/docs/agreements-notes.md) | Referanse for avtaleområder og lesemodus. |
| [PP PriceAgreement](https://github.com/jonnebonde/PartnerPortalV2/blob/Prisavtale-v3/web/src/pages/PriceAgreement.tsx) | Oppbygning, kontekst og rammevilkår. |
| [PP PriceAgreementsV2](https://github.com/jonnebonde/PartnerPortalV2/blob/Prisavtale-v3/web/src/pages/PriceAgreementsV2.tsx) | Prislinjer, filtre og versjonspresentasjon. |
| [PP WindscreenPrices](https://github.com/jonnebonde/PartnerPortalV2/blob/Prisavtale-v3/web/src/pages/WindscreenPrices.tsx) | Ruteprisenes detaljvisning. |
| [AP avtalenotater](https://github.com/jonnebonde/agent-portal/blob/main/docs/agreements-notes.md) | Agentens selskapskontekst og gjenbrukbare visningsmønstre. |
| [AP AgreementsPage](https://github.com/jonnebonde/agent-portal/blob/main/agentweb/src/pages/AgreementsPage.js) | Inngang til Agreements. |
| [AP PriceAgreement](https://github.com/jonnebonde/agent-portal/blob/main/agentweb/src/agreements/PriceAgreement.js) | Avtaleflater og kontekst. |

AP/PP-kilder ble lest under arbeidet 2026-10-28. Lenker med grennavn kan endres; registrer faktisk commit ved neste implementeringsøkt. Eldre notater kan avvike fra nyere kode og skal ikke brukes ukritisk som krav.

## Eksisterende utkast og faktisk lagringsstatus

Et første kodeutkast ble laget i forrige arbeidsøkt. [Commit be9ae9d](https://github.com/jonnebonde/workshop-portal/commit/be9ae9d4220b698730df20cc73ac2ff71034b4f5) ble opprettet, men oppdatering av grenreferansen ble stoppet. Kontrollen 2026-10-29 viser at `feature/workshop-agreements` fortsatt peker til `c6748b8`, samme grunnlag som main. Ikke anta at kodeutkastet ligger på arbeidsgrenen eller er flettet inn.

Utkastet er mulig gjenbruk, ikke ferdig/godkjent leveranse. Det inneholder syntetiske tilordninger, lesemodus og lokale tester. Fire tester, bygg, målrettet lint og typekontroll bestod under forrige økt. Nettleserkontroll var blokkert av manglende nettleserbinær og mislykket nedlasting; brukerflyt og mobilvisning er ikke nettleserverifisert.

Ved videre arbeid: hent og gjennomgå committen før eventuell gjenbruk, kontroller dagens main/arbeidsgren, bevar samtidige endringer, avklar punktene ovenfor og gjennomfør akseptansekriteriene. Ikke overfør utkastets fiktive priser, tilordninger eller valg om fremtidige versjoner til vedtatte produktregler.

Denne dokumentgrenen endrer ingen applikasjonskode, produktstatus eller eksternt produktminne.
