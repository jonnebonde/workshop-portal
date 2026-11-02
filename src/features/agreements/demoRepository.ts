import { selectAgreements, type PriceLine, type WorkshopAgreement, type WorkshopScope } from './model';

// Synthetic fixtures only; no production prices or partner preferences.
const serviceLines: PriceLine[] = [
  { id: 'DEMO-01', article: 'Windscreen replacement', vehicle: 'Passenger car', category: 'Glass work', price: 1800, comment: 'Labour only. Glass priced separately.', billable: true },
  { id: 'DEMO-02', article: 'Windscreen replacement', vehicle: 'Van', category: 'Glass work', price: 2200, maxHours: 2, comment: '', billable: true },
  { id: 'DEMO-03', article: 'Side window replacement', vehicle: 'Passenger car', category: 'Glass work', price: 1250, comment: '', billable: true },
  { id: 'DEMO-04', article: 'Stone chip repair', vehicle: 'Passenger car', category: 'Glass repair', price: 750, comment: 'First repair.', billable: true },
  { id: 'DEMO-05', article: 'Additional stone chip', vehicle: 'Passenger car', category: 'Glass repair', price: 250, comment: 'On the same windscreen.', billable: true },
  { id: 'DEMO-06', article: 'Static calibration', vehicle: 'Passenger car', category: 'Calibration', price: 1200, comment: 'Documentation required.', billable: true },
  { id: 'DEMO-07', article: 'Dynamic calibration', vehicle: 'Van', category: 'Calibration', price: 1400, comment: '', billable: true },
  { id: 'DEMO-08', article: 'Mouldings and clips', vehicle: 'Passenger car', category: 'Parts', price: null, discount: 15, comment: 'Discount on applicable list price.', billable: true },
  { id: 'DEMO-09', article: 'Final cleaning', vehicle: 'Passenger car', category: 'Other', price: null, comment: 'Included in replacement.', billable: false },
];
function agreement(id: string, insurer: string, kind: WorkshopAgreement['kind'], name: string, scope: string, lines = serviceLines): WorkshopAgreement {
  return { id, insurer, kind, name, scope, currency: 'NOK', versions: [
    { id: `${id}-v2`, label: 'V2', from: '2026-09-01', status: 'Active', lines },
    { id: `${id}-v1`, label: 'V1', from: '2026-01-01', to: '2026-08-31', status: 'Historical', lines: lines.map(l => ({ ...l, price: l.price === null ? null : Math.round(l.price * .95) })) },
  ] };
}
const catalog = [
  agreement('chain-a', 'Example Insurance A', 'Price agreement', 'Chain service agreement', 'Demo chain · includes this workshop'),
  agreement('framework-b', 'Example Insurance B', 'Framework terms', 'Standard framework terms', 'Assigned to this workshop'),
  agreement('glass-a', 'Example Insurance A', 'Windscreen prices', 'Chain windscreen price list', 'Demo chain · includes this workshop', Array.from({ length: 24 }, (_, i) => ({
    id: `DEMO-GL-${String(i + 1).padStart(3, '0')}`, article: `Windscreen article ${i + 1}`, vehicle: i % 3 ? 'Passenger car' : 'Van', category: 'Windscreens', price: 3000 + i * 125, comment: i % 2 ? '' : 'Camera bracket included.', billable: true,
  }))),
];
const demoScope: WorkshopScope = { workshopId: 'demo-workshop', name: 'Demo workshop', agreementIds: ['chain-a', 'framework-b', 'glass-a'] };
export function getDemoAgreements(userId: string | undefined) {
  const scope = userId === 'demo-user' ? demoScope : null;
  return { scope, agreements: selectAgreements(scope, catalog) };
}
