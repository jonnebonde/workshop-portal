import type { AgreementVersion, WorkshopAgreement } from './model';
import type { SheetData } from 'write-excel-file/universal';

export type ExportFormat = 'xlsx' | 'csv';

function cell(value: string | number | null | undefined) {
  let text = value == null ? '' : String(value);
  // Keep spreadsheet applications from evaluating article names/comments as formulas.
  if (typeof value === 'string' && /^\s*[=+\-@]/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
}

function exportData(workshop: string, agreement: WorkshopAgreement, version: AgreementVersion) {
  if (!agreement.versions.includes(version) || !['Active', 'Historical'].includes(version.status)) {
    throw new Error('Only a displayed published version can be exported.');
  }
  const headers = ['Data source', 'Workshop', 'Insurance company', 'Agreement ID', 'Agreement', 'Scope',
    'Version ID', 'Version', 'Status', 'Valid from', 'Valid to', 'Currency', 'VAT',
    'ID', 'Article', 'Vehicle type', 'Category', 'Price', 'Discount (%)', 'Max. hours', 'Comment', 'Billable'];
  const context = ['Fictional demo data', workshop, agreement.insurer, agreement.id, agreement.name, agreement.scope,
    version.id, version.label, version.status, version.from, version.to ?? '', agreement.currency, 'Excluded'];
  const rows = version.lines.map(line => [...context, line.id, line.article, line.vehicle, line.category,
    line.price, line.discount, line.maxHours, line.comment, line.billable ? 'Yes' : 'No']);
  const filename = `agreements-${agreement.id}-${version.id}-${version.status}-${version.from}-${version.to ?? 'open'}`
    .replace(/[^a-zA-Z0-9._-]/g, '_');
  return { filename, headers, context, rows };
}

export function buildAgreementExport(workshop: string, agreement: WorkshopAgreement, version: AgreementVersion) {
  const { filename, headers, rows } = exportData(workshop, agreement, version);
  return { filename: filename + '.csv', content: '\uFEFF' + [headers, ...rows].map(row => row.map(cell).join(';')).join('\r\n') + '\r\n' };
}

export async function buildAgreementExcelExport(workshop: string, agreement: WorkshopAgreement, version: AgreementVersion) {
  const { filename, headers, context, rows } = exportData(workshop, agreement, version);
  const { default: writeExcelFile } = await import('write-excel-file/universal');
  const sheet: SheetData = [
    [{ value: agreement.name, columnSpan: 9, fontWeight: 'bold', fontSize: 16, height: 30 }],
    ...context.map((value, i) => [
      { value: headers[i], fontWeight: 'bold' as const },
      { value, columnSpan: 8 },
    ]),
    [],
    headers.slice(13).map(value => ({ value, fontWeight: 'bold', backgroundColor: '#12263F', textColor: '#FFFFFF', height: 26 })),
    ...rows.map(row => row.slice(13).map((value, i) => value == null ? null : ({
      value: i === 5 && typeof value === 'number' ? value / 100 : value,
      ...(i === 4 ? { format: '#,##0.00' } : {}),
      ...(i === 5 ? { format: '0.0%' } : {}),
      wrap: true,
      alignVertical: 'top' as const,
    }))),
  ];
  const content = await writeExcelFile(sheet, {
    sheet: 'Agreement prices',
    columns: [22, 36, 22, 22, 18, 16, 16, 50, 14].map(width => ({ width })),
    stickyRowsCount: 16,
  }).toBlob();
  return { filename: filename + '.xlsx', content };
}

export async function downloadAgreementExport(workshop: string, agreement: WorkshopAgreement, version: AgreementVersion, format: ExportFormat = 'xlsx') {
  const { filename, content } = format === 'xlsx'
    ? await buildAgreementExcelExport(workshop, agreement, version)
    : buildAgreementExport(workshop, agreement, version);
  const blob = typeof content === 'string' ? new Blob([content], { type: 'text/csv;charset=utf-8' }) : content;
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  try {
    link.click();
  } finally {
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}
