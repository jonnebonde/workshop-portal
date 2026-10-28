# Faktura i saksdetaljer – tekstark

Kodegrunnlag: `workshop-portal/main@b6f6829baee6b1f4d875370836253a2dc1bfacb9`, lest 2026-10-28. Se [notater](invoice-notes.md) og [brukerveiledning](editing-copy.md).

Fyll inn **Forslag**, behold ID og plassholdere. Tom celle betyr ingen endring. Språket er bevart fra koden. Tekstfragmenter følger plasseringen i JSX; se kildekonteksten før sammenslåing. Betingede tekster og utviklerscenarier er ikke nødvendigvis synlige samtidig. Dynamiske verdier og eksempeldata er utelatt; nettleser-/API-tekster krever separat kontroll.

| ID | Hvor | Dagens tekst | Forslag |
| --- | --- | --- | --- |
| WP-INV-001 | title; [InvoiceFileManagement.tsx:137](../src/components/sections/InvoiceFileManagement.tsx#L137) | Invoice | |
| WP-INV-002 | Synlig tekst; [InvoiceFileManagement.tsx:146](../src/components/sections/InvoiceFileManagement.tsx#L146) | Upload Document | |
| WP-INV-003 | Synlig tekst; [InvoiceFileManagement.tsx:158](../src/components/sections/InvoiceFileManagement.tsx#L158) | Document Information | |
| WP-INV-004 | Synlig tekst; [InvoiceFileManagement.tsx:165](../src/components/sections/InvoiceFileManagement.tsx#L165) | Invoice Number | |
| WP-INV-005 | placeholder; [InvoiceFileManagement.tsx:171](../src/components/sections/InvoiceFileManagement.tsx#L171) | INV-2024-001 | |
| WP-INV-006 | Synlig tekst; [InvoiceFileManagement.tsx:180](../src/components/sections/InvoiceFileManagement.tsx#L180) | KID Number | |
| WP-INV-007 | Synlig tekst; [InvoiceFileManagement.tsx:195](../src/components/sections/InvoiceFileManagement.tsx#L195) | Due Date | |
| WP-INV-008 | Synlig tekst; [InvoiceFileManagement.tsx:209](../src/components/sections/InvoiceFileManagement.tsx#L209) | Total Amount | |
| WP-INV-009 | Synlig tekst; [InvoiceFileManagement.tsx:222](../src/components/sections/InvoiceFileManagement.tsx#L222) | NOK | |
