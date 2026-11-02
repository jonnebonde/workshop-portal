import type { PartsLaborItem } from '../data/mockData';
import type { WorkshopAgreement } from '../features/agreements/model';

export function createOrderLineDraft(): PartsLaborItem {
  return { id: `item-${crypto.randomUUID()}`, type: 'part', category: '', articleNr: '', quantity: 1, price: 0, discount: 0, status: 'Pending', total: 0 };
}

export function isOrderLineComplete(item: PartsLaborItem) {
  if (item.type === 'part') {
    return !!item.category?.trim() && !!item.articleNr?.trim()
      && Number.isFinite(item.quantity) && item.quantity > 0
      && Number.isFinite(item.price) && item.price >= 0
      && Number.isFinite(item.discount) && item.discount >= 0 && item.discount <= 100;
  }
  return !!item.description?.trim() && Number.isFinite(item.hours) && item.hours > 0
    && Number.isFinite(item.ratePerHour) && item.ratePerHour >= 0;
}

export function checkDemoOrderLine(item: PartsLaborItem, agreements: WorkshopAgreement[], insurer: string): PartsLaborItem | null {
  if (!isOrderLineComplete(item)) return null;
  // Demo comparison only: no production approval, automatic price changes or fallback rules.
  const matches = agreements.filter(agreement => agreement.insurer === insurer).flatMap(agreement =>
    agreement.versions.filter(version => version.status === 'Active').flatMap(version =>
      version.lines.filter(line => item.type === 'part' && line.id === item.articleNr.trim())
        .map(line => ({ agreement, version, line }))));
  const match = matches.length === 1 ? matches[0] : undefined;
  const price = item.type === 'part' ? item.price : item.ratePerHour;
  const matchesPrice = match?.line.price != null && match.line.price === price
    && (item.type !== 'part' || item.discount === (match.line.discount ?? 0))
    && match.line.billable
    && (item.type !== 'labor' || match.line.maxHours === undefined || item.hours <= match.line.maxHours);
  return { ...item, demoAgreementCheck: {
    status: matchesPrice ? 'matched' : 'review_required',
    ...(match ? { agreementId: match.agreement.id, versionId: match.version.id } : {}),
  } };
}
