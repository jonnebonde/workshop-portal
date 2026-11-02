export interface PriceLine {
  id: string;
  article: string;
  vehicle: string;
  category: string;
  price: number | null;
  discount?: number;
  maxHours?: number;
  comment: string;
  billable: boolean;
}
export interface AgreementVersion {
  id: string;
  label: string;
  from: string;
  to?: string;
  status: 'Active' | 'Historical' | 'Draft' | 'Scheduled';
  lines: PriceLine[];
}
export interface WorkshopAgreement {
  id: string;
  insurer: string;
  kind: 'Price agreement' | 'Framework terms' | 'Windscreen prices';
  name: string;
  scope: string;
  currency: string;
  versions: AgreementVersion[];
}
export interface WorkshopScope { workshopId: string; name: string; agreementIds: string[] }

// Explicit assignments supplied by the data source. Do not infer access from names,
// user-editable profile fields or a broad admin/chain role. API must enforce scope.
export function selectAgreements(scope: WorkshopScope | null, catalog: WorkshopAgreement[]): WorkshopAgreement[] {
  if (!scope) return [];
  return catalog.filter(a => scope.agreementIds.includes(a.id)).map(a => ({
    ...a,
    versions: a.versions.filter(v => v.status === 'Active' || v.status === 'Historical'),
  })).filter(a => a.versions.length > 0);
}
export function filterLines(lines: PriceLine[], search: string, vehicle: string, category: string) {
  const query = search.trim().toLocaleLowerCase();
  return lines.filter(l => (vehicle === 'all' || l.vehicle === vehicle)
    && (category === 'all' || l.category === category)
    && (!query || [l.id, l.article, l.category, l.comment].join(' ').toLocaleLowerCase().includes(query)));
}
