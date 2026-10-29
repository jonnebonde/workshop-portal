import { useState } from 'react';
import { FileText, LockKeyhole, Search, History } from 'lucide-react';
import { filterLines, type AgreementVersion, type WorkshopAgreement } from './model';
import AgreementExportModal from './AgreementExportModal';

const field = 'mt-1 h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-primary';
const date = (value: string) => new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${value}T00:00:00Z`));

function AgreementDetails({ workshop, agreement }: { workshop: string; agreement: WorkshopAgreement }) {
  const [versionId, setVersionId] = useState(agreement.versions.find(v => v.status === 'Active')?.id ?? agreement.versions[0]?.id ?? '');
  const [search, setSearch] = useState('');
  const [vehicle, setVehicle] = useState('all');
  const [category, setCategory] = useState('all');
  const [exportVersion, setExportVersion] = useState<AgreementVersion | null>(null);
  const version = agreement.versions.find(v => v.id === versionId);
  if (!version) return <p role="status" className="p-6">No published version is available.</p>;
  const lines = filterLines(version.lines, search, vehicle, category);
  const categories = [...new Set(lines.map(l => l.category))];
  const money = (value: number) => new Intl.NumberFormat('en-GB', { style: 'currency', currency: agreement.currency, maximumFractionDigits: 2 }).format(value);
  return <section aria-label={agreement.name} className="rounded-lg border border-gray-300 bg-white shadow-sm">
    <div className="flex flex-wrap items-start justify-between gap-5 border-b border-gray-300 p-5 sm:p-6">
      <div><p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{agreement.kind}</p><h2 className="mt-1 text-xl font-semibold text-brand-dark">{agreement.name}</h2><p className="mt-2 text-sm text-gray-500">{agreement.scope}</p></div>
      <label className="w-full text-sm font-medium text-gray-800 sm:w-64"><span className="flex items-center gap-2"><History size={16} aria-hidden="true" />Version history</span><select className={field} value={versionId} onChange={e => { setVersionId(e.target.value); setSearch(''); setVehicle('all'); setCategory('all'); }}>{agreement.versions.map(v => <option key={v.id} value={v.id}>{v.label} · {v.status} · {date(v.from)}</option>)}</select></label>
    </div>
    <div className={`flex flex-wrap gap-x-8 gap-y-2 border-b border-gray-300 px-6 py-4 text-sm ${version.status === 'Historical' ? 'bg-yellow-50' : 'bg-gray-50'}`}>
      <span><strong>{version.label}</strong> · {version.status === 'Historical' ? 'Historical version — not current prices' : 'Current prices'}</span><span>Valid from <strong>{date(version.from)}</strong>{version.to && <> to <strong>{date(version.to)}</strong></>}</span><span>Currency: <strong>{agreement.currency}</strong> · Prices excl. VAT</span>
    </div>
    <div className="flex justify-end border-b border-gray-300 px-5 py-3 sm:px-6">
      <button type="button" aria-haspopup="dialog" disabled={!version.lines.length} onClick={() => setExportVersion(version)}
        className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-primary disabled:cursor-not-allowed disabled:opacity-50">
        Export {version.label}…
      </button>
    </div>
    {exportVersion && <AgreementExportModal workshop={workshop} agreement={agreement} version={exportVersion} onClose={() => setExportVersion(null)} />}
    <div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-4">
      <label className="text-sm font-medium text-gray-800 lg:col-span-2">Search articles or comments<div className="relative"><Search size={17} aria-hidden="true" className="absolute left-3 top-4 text-gray-500" /><input type="search" className={`${field} pl-10`} placeholder="Search by ID, article or comment" value={search} onChange={e => setSearch(e.target.value)} /></div></label>
      <label className="text-sm font-medium text-gray-800">Vehicle type<select className={field} value={vehicle} onChange={e => setVehicle(e.target.value)}><option value="all">All vehicle types</option>{[...new Set(version.lines.map(l => l.vehicle))].map(v => <option key={v}>{v}</option>)}</select></label>
      <label className="text-sm font-medium text-gray-800">Category<select className={field} value={category} onChange={e => setCategory(e.target.value)}><option value="all">All categories</option>{[...new Set(version.lines.map(l => l.category))].map(v => <option key={v}>{v}</option>)}</select></label>
    </div>
    <div className="flex items-center justify-between px-5 pb-3 text-sm text-gray-500"><p role="status">{lines.length} of {version.lines.length} price lines</p>{(search || vehicle !== 'all' || category !== 'all') && <button className="font-semibold text-brand-primary hover:underline" onClick={() => { setSearch(''); setVehicle('all'); setCategory('all'); }}>Clear filters</button>}</div>
    <div className="max-h-[32rem] overflow-auto border-t border-gray-300" tabIndex={0} role="region" aria-label="Agreement price table">
      <table className="w-full min-w-[850px] text-left text-sm"><caption className="sr-only">{agreement.name}, {version.label}, {version.status}, {date(version.from)}{version.to ? ` to ${date(version.to)}` : ''}, prices in {agreement.currency} excluding VAT</caption><thead className="sticky top-0 z-10 bg-gray-200 text-gray-800"><tr>{['ID', 'Article', 'Price', 'Discount', 'Max. hours', 'Comment', 'Billable'].map(h => <th key={h} scope="col" className="px-4 py-3 font-semibold">{h}</th>)}</tr></thead>
        {categories.map(c => <tbody key={c}><tr className="bg-gray-50"><th colSpan={7} scope="rowgroup" className="border-y border-gray-300 px-4 py-2 font-semibold text-brand-dark">{c}</th></tr>{lines.filter(l => l.category === c).map(l => <tr key={l.id} className="border-b border-gray-200 hover:bg-blue-50"><td className="whitespace-nowrap px-4 py-3 text-gray-500">{l.id}</td><th scope="row" className="px-4 py-3 font-medium text-gray-900">{l.article}<span className="mt-1 block text-xs font-normal text-gray-500">{l.vehicle}</span></th><td className="whitespace-nowrap px-4 py-3 tabular-nums">{l.price === null ? '—' : money(l.price)}</td><td className="px-4 py-3">{l.discount === undefined ? '—' : `${l.discount}%`}</td><td className="px-4 py-3">{l.maxHours ?? '—'}</td><td className="max-w-xs px-4 py-3 text-gray-500">{l.comment || '—'}</td><td className="px-4 py-3">{l.billable ? 'Yes' : 'No'}</td></tr>)}</tbody>)}
      </table>{!lines.length && <div className="p-10 text-center"><p className="font-semibold text-gray-900">{version.lines.length ? 'No matching price lines' : 'This agreement has no price lines'}</p><p className="mt-1 text-sm text-gray-500">{version.lines.length ? 'Try another search or clear the filters.' : 'No prices have been provided for this version.'}</p></div>}
    </div>
  </section>;
}
export default function AgreementsView({ workshop, agreements }: { workshop: string; agreements: WorkshopAgreement[] }) {
  const [insurer, setInsurer] = useState(agreements[0]?.insurer ?? '');
  const [selectedId, setSelectedId] = useState('');
  const insurers = [...new Set(agreements.map(a => a.insurer))];
  const currentInsurer = insurers.includes(insurer) ? insurer : insurers[0];
  const available = agreements.filter(a => a.insurer === currentInsurer);
  const selected = available.find(a => a.id === selectedId) ?? available[0];
  return <div className="space-y-6 px-4 py-6 sm:px-6">
    <header className="flex flex-wrap items-start justify-between gap-4"><div><h1 className="text-2xl font-semibold text-brand-dark">Agreements</h1><p className="mt-2 text-sm text-gray-500">Your workshop’s prices, terms and published version history.</p></div><div className="flex items-center gap-2 text-sm text-gray-500"><LockKeyhole size={16} aria-hidden="true" />Read-only access</div></header>
    <p className="rounded-md border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-gray-800">Demo preview · Fictional agreements and prices for review.</p>
    <section className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-gray-300 bg-white p-5"><div className="flex items-center gap-3"><FileText aria-hidden="true" className="text-brand-primary" /><div><p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Workshop</p><p className="mt-1 font-semibold text-brand-dark">{workshop}</p></div></div>{!!insurers.length && <label className="w-full text-sm font-medium text-gray-800 sm:w-72">Insurance company<select className={field} value={currentInsurer ?? ''} onChange={e => { setInsurer(e.target.value); setSelectedId(''); }}>{insurers.map(i => <option key={i}>{i}</option>)}</select></label>}</section>
    {selected ? <><nav aria-label="Agreement areas" className="flex gap-7 overflow-x-auto border-b border-gray-300">{available.map(a => <button key={a.id} aria-current={selected.id === a.id ? 'page' : undefined} onClick={() => setSelectedId(a.id)} className={`shrink-0 border-b-2 px-1 py-3 text-sm font-semibold ${selected.id === a.id ? 'border-brand-primary text-brand-primary' : 'border-transparent text-gray-500 hover:text-brand-dark'}`}>{a.kind}</button>)}</nav><AgreementDetails key={`${currentInsurer}:${selected.id}`} workshop={workshop} agreement={selected} /></> : <section className="rounded-lg border border-gray-300 bg-white p-12 text-center"><h2 className="text-lg font-semibold text-brand-dark">No agreements available</h2><p className="mt-2 text-sm text-gray-500">No published agreements have been assigned to this workshop. Contact your administrator if you expected to see an agreement.</p></section>}
  </div>;
}
