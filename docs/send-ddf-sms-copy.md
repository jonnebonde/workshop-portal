# Sende DDF-SMS – tekstark

Kodegrunnlag: `workshop-portal/main@b6f6829baee6b1f4d875370836253a2dc1bfacb9`, lest 2026-10-28. Se [notater](send-ddf-sms-notes.md) og [brukerveiledning](editing-copy.md).

Fyll inn **Forslag**, behold ID og plassholdere. Tom celle betyr ingen endring. Språket er bevart fra koden. Tekstfragmenter følger plasseringen i JSX; se kildekonteksten før sammenslåing. Betingede tekster og utviklerscenarier er ikke nødvendigvis synlige samtidig. Dynamiske verdier og eksempeldata er utelatt; nettleser-/API-tekster krever separat kontroll.

| ID | Hvor | Dagens tekst | Forslag |
| --- | --- | --- | --- |
| WP-SMS-001 | Meldingsmal; [SendDdfSmsPage.tsx:7](../src/pages/SendDdfSmsPage.tsx#L7) | You have a new Digital Damage Form to complete. A secure link will be sent to you via SMS. | |
| WP-SMS-002 | Tilbakemelding; [SendDdfSmsPage.tsx:21](../src/pages/SendDdfSmsPage.tsx#L21) | Phone number and license plate are required. | |
| WP-SMS-003 | Tilbakemelding; [SendDdfSmsPage.tsx:25](../src/pages/SendDdfSmsPage.tsx#L25) | DDF link sent via SMS to [verdi1] for [verdi2] | |
| WP-SMS-004 | Synlig tekst; [SendDdfSmsPage.tsx:37](../src/pages/SendDdfSmsPage.tsx#L37) | Send DDF SMS | |
| WP-SMS-005 | Synlig tekst; [SendDdfSmsPage.tsx:38](../src/pages/SendDdfSmsPage.tsx#L38) | Request a Digital Damage Form without creating a case. | |
| WP-SMS-006 | Synlig tekst; [SendDdfSmsPage.tsx:46](../src/pages/SendDdfSmsPage.tsx#L46) | Phone Number | |
| WP-SMS-007 | placeholder; [SendDdfSmsPage.tsx:53](../src/pages/SendDdfSmsPage.tsx#L53) | Enter phone number | |
| WP-SMS-008 | Synlig tekst; [SendDdfSmsPage.tsx:60](../src/pages/SendDdfSmsPage.tsx#L60) | License Plate | |
| WP-SMS-009 | placeholder; [SendDdfSmsPage.tsx:67](../src/pages/SendDdfSmsPage.tsx#L67) | Enter license plate | |
| WP-SMS-010 | Synlig tekst; [SendDdfSmsPage.tsx:80](../src/pages/SendDdfSmsPage.tsx#L80) | Send SMS | |
| WP-SMS-011 | Synlig tekst; [SendDdfSmsPage.tsx:86](../src/pages/SendDdfSmsPage.tsx#L86) | Message Preview | |
| WP-SMS-012 | Synlig tekst; [SendDdfSmsPage.tsx:89](../src/pages/SendDdfSmsPage.tsx#L89) | The DDF link is generated automatically by the SMS service. | |
