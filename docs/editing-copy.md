# Slik redigerer du portaltekst

1. Åpne [sideoversikten](portal-pages.md) og velg tekstarket for siden eller seksjonen.
2. Finn teksten i **Dagens tekst**. Lenken under **Hvor** viser kildefilen og plasseringen.
3. Skriv ønsket ordlyd i **Forslag**. Behold ID-en og alle dynamiske plassholdere, som `[verdi1]` eller `[dato]`.
4. Lagre filen på arbeidsgrenen og be Codex overføre de valgte forslagene til grensesnittet. Du kan angi én ID, flere ID-er eller et bestemt tekstark.
5. Etter implementering kontrolleres berørte tilstander. Dagens tekst oppdateres til faktisk kode; forslaget og utfallet skal ikke slettes uten spor.

Eksempel på bestilling: «Implementer forslagene jeg har fylt inn i docs/news-copy.md. Behold resten av tekstene.»

Tomt Forslag betyr ingen endring. Hvis teksten skal fjernes, skriv uttrykkelig «Fjern denne teksten» og forklar ved behov hvorfor. En tekst som er delt mellom sider må vurderes for alle stedene den brukes.

Skriv spørsmål om flyt, regler eller hvem som skal se noe i den tilhørende notes-filen. En tekstendring er ikke i seg selv en beslutning om tilgang, kontroll eller godkjenning.

Noen JSX-tekster er fragmenter rundt dynamiske verdier. Kontroller hele setningen i kildekonteksten før implementering. `[verdi1]` viser en dynamisk verdi, ikke en bokstavelig tekst som skal vises. Nye tekster skal få nye ID-er uten å renummerere eksisterende rader.

Ikke legg reelle saksdata, personopplysninger eller innhold fra private kilder i tekstarkene.
