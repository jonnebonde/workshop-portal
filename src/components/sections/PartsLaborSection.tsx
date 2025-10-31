import React from 'react';
import { PenTool as Tool, Plus, Trash2, CheckCircle, FileEdit } from 'lucide-react';
import { WorkshopCase, PartsLaborItem, partCategories, SectionApprovalStatus } from '../../data/mockData';
import SectionWrapper from './SectionWrapper';

interface PartsLaborSectionProps {
  caseData: WorkshopCase;
  onUpdate: (data: Partial<WorkshopCase>) => void;
  isSectionComplete?: boolean;
  approvalStatus?: SectionApprovalStatus;
}

// Consolidated parts and labor items with type inference
const partsAndLaborItems = [
  // Glass Parts
  { id: 'windshield', name: 'Windshield', type: 'part', defaultPrice: 2500 },
  { id: 'side-window', name: 'Side Window', type: 'part', defaultPrice: 800 },
  { id: 'rear-window', name: 'Rear Window', type: 'part', defaultPrice: 1200 },
  { id: 'quarter-glass', name: 'Quarter Glass', type: 'part', defaultPrice: 600 },
  { id: 'vent-glass', name: 'Vent Glass', type: 'part', defaultPrice: 400 },
  { id: 'sunroof-glass', name: 'Sunroof Glass', type: 'part', defaultPrice: 1800 },
  
  // Materials and Supplies
  { id: 'adhesive-kit', name: 'Adhesive Kit', type: 'part', defaultPrice: 150 },
  { id: 'molding', name: 'Molding', type: 'part', defaultPrice: 200 },
  { id: 'wiper-blades', name: 'Wiper Blades', type: 'part', defaultPrice: 120 },
  { id: 'glass-cleaner', name: 'Glass Cleaner', type: 'part', defaultPrice: 25 },
  { id: 'primer', name: 'Primer', type: 'part', defaultPrice: 45 },
  { id: 'sealant', name: 'Sealant', type: 'part', defaultPrice: 35 },
  { id: 'other-glass-part', name: 'Other Glass Part', type: 'part', defaultPrice: 0 },
  
  // Labor Services
  { id: 'windshield-replacement', name: 'Windshield Replacement', type: 'labor', defaultRate: 800, defaultHours: 2 },
  { id: 'side-window-replacement', name: 'Side Window Replacement', type: 'labor', defaultRate: 400, defaultHours: 1 },
  { id: 'rear-window-replacement', name: 'Rear Window Replacement', type: 'labor', defaultRate: 600, defaultHours: 1.5 },
  { id: 'stone-chip-repair', name: 'Stone Chip Repair', type: 'labor', defaultRate: 200, defaultHours: 0.5 },
  { id: 'crack-repair', name: 'Crack Repair', type: 'labor', defaultRate: 300, defaultHours: 1 },
  { id: 'glass-removal', name: 'Glass Removal', type: 'labor', defaultRate: 150, defaultHours: 0.5 },
  { id: 'glass-installation', name: 'Glass Installation', type: 'labor', defaultRate: 200, defaultHours: 1 },
  { id: 'calibration-service', name: 'Calibration Service', type: 'labor', defaultRate: 400, defaultHours: 1 },
  { id: 'diagnostic-service', name: 'Diagnostic Service', type: 'labor', defaultRate: 150, defaultHours: 0.5 },
  { id: 'cleanup-service', name: 'Cleanup Service', type: 'labor', defaultRate: 100, defaultHours: 0.5 },
  { id: 'other-glass-labor', name: 'Other Glass Labor', type: 'labor', defaultRate: 150, defaultHours: 1 }
] as const;

// Memoized currency formatter
const currencyFormatter = new Intl.NumberFormat('nb-NO', {
  style: 'currency',
  currency: 'NOK'
});

const PartsLaborSection: React.FC<PartsLaborSectionProps> = ({
  caseData,
  onUpdate,
  isSectionComplete = true,
  approvalStatus
}) => {
  
  // Calculate completion status based on having both parts and labor
  const hasParts = caseData.partsAndLabor.items.some(item => item.type === 'part');
  const hasLabor = caseData.partsAndLabor.items.some(item => item.type === 'labor');
  const isComplete = hasParts && hasLabor;

  const addItem = () => {
    const newItem: PartsLaborItem = {
      id: `item-${Date.now()}`,
      type: 'part', // Default to part, will be updated when category is selected
      category: '',
      articleNr: '',
      quantity: 1,
      price: 0,
      discount: 0,
      status: 'Pending',
      total: 0
    } as any;

    const updatedItems = [...caseData.partsAndLabor.items, newItem];
    updatePartsAndLabor(updatedItems);
  };

  const updateItem = (index: number, updates: Partial<PartsLaborItem>) => {
    const newItems = [...caseData.partsAndLabor.items];
    const currentItem = newItems[index];
    
    // If category is being updated, infer the type and set defaults
    if (updates.category !== undefined) {
      const selectedItem = partsAndLaborItems.find(item => item.name === updates.category);
      
      if (selectedItem) {
        if (selectedItem.type === 'part') {
          newItems[index] = {
            ...currentItem,
            ...updates,
            type: 'part',
            // Clear labor-specific fields
            description: undefined,
            hours: undefined,
            ratePerHour: undefined,
            // Set part-specific defaults
            quantity: currentItem.quantity || 1,
            price: selectedItem.defaultPrice || 0,
            discount: currentItem.discount || 0,
            status: currentItem.status || 'Pending',
            articleNr: currentItem.articleNr || ''
          } as any;
        } else {
          newItems[index] = {
            ...currentItem,
            ...updates,
            type: 'labor',
            // Clear part-specific fields
            articleNr: undefined,
            quantity: undefined,
            price: undefined,
            discount: undefined,
            status: undefined,
            // Set labor-specific defaults
            description: selectedItem.name,
            hours: selectedItem.defaultHours || 1,
            ratePerHour: selectedItem.defaultRate || 150
          } as any;
        }
      } else {
        newItems[index] = { ...currentItem, ...updates };
      }
    } else {
      newItems[index] = { ...currentItem, ...updates };
    }
    
    // Calculate total based on type
    if (newItems[index].type === 'part') {
      const partItem = newItems[index] as any;
      const subtotal = partItem.price * partItem.quantity;
      const discountAmount = subtotal * (partItem.discount / 100);
      partItem.total = subtotal - discountAmount;
    } else {
      const laborItem = newItems[index] as any;
      laborItem.total = (laborItem.hours || 0) * (laborItem.ratePerHour || 0);
    }

    updatePartsAndLabor(newItems);
  };

  const removeItem = (index: number) => {
    const newItems = caseData.partsAndLabor.items.filter((_, i) => i !== index);
    updatePartsAndLabor(newItems);
  };

  const updatePartsAndLabor = (items: PartsLaborItem[]) => {
    const totalParts = items
      .filter(item => item.type === 'part')
      .reduce((sum, item) => sum + item.total, 0);
    
    const totalLabor = items
      .filter(item => item.type === 'labor')
      .reduce((sum, item) => sum + item.total, 0);

    onUpdate({
      partsAndLabor: {
        ...caseData.partsAndLabor,
        items,
        totalParts,
        totalLabor,
        grandTotal: totalParts + totalLabor
      }
    });
  };

  const formatCurrency = (amount: number) => currencyFormatter.format(amount);

  const getItemType = (category: string): 'part' | 'labor' => {
    const item = partsAndLaborItems.find(item => item.name === category);
    return item?.type || 'part';
  };

  const renderItemRow = (item: PartsLaborItem, index: number) => {
    const isPartType = item.type === 'part';
    
    return (
      <tr key={item.id} className="border-b border-gray-100">
        {/* Category/Description */}
        <td className="px-3 py-2">
          <select
            value={isPartType ? (item as any).category || '' : (item as any).description || ''}
            onChange={(e) => updateItem(index, { category: e.target.value })}
            className="block w-full px-2 py-1.5 text-sm border border-gray-300 rounded shadow-sm focus:border-transparent focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            {partsAndLaborItems.map(partsLaborItem => (
              <option key={partsLaborItem.id} value={partsLaborItem.name}>
                {partsLaborItem.name}
              </option>
            ))}
          </select>
        </td>

        {/* Article Nr (only for parts) */}
        <td className="px-3 py-2">
          {isPartType ? (
            <input
              type="text"
              value={(item as any).articleNr || ''}
              onChange={(e) => updateItem(index, { articleNr: e.target.value })}
              className="block w-full px-2 py-1.5 text-sm border border-gray-300 rounded shadow-sm focus:border-transparent focus:ring-2 focus:ring-blue-500"
              placeholder="Part #"
            />
          ) : (
            <span className="text-gray-400 text-xs">N/A</span>
          )}
        </td>

        {/* Quantity/Hours */}
        <td className="px-3 py-2">
          <input
            type="number"
            value={isPartType ? (item as any).quantity || 1 : (item as any).hours || 1}
            onChange={(e) => {
              const value = parseFloat(e.target.value) || 1;
              updateItem(index, isPartType ? { quantity: value } : { hours: value });
            }}
            className="block w-20 px-2 py-1.5 text-sm border border-gray-300 rounded shadow-sm focus:border-transparent focus:ring-2 focus:ring-blue-500  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            min="0"
            step={isPartType ? "1" : "0.5"}
          />
        </td>

        {/* Unit Price/Rate */}
        <td className="px-3 py-2">
          <input
            type="number"
            value={isPartType ? (item as any).price || 0 : (item as any).ratePerHour || 150}
            onChange={(e) => {
              const value = parseFloat(e.target.value) || 0;
              updateItem(index, isPartType ? { price: value } : { ratePerHour: value });
            }}
            className="block w-24 px-2 py-1.5 text-sm border border-gray-300 rounded shadow-sm focus:border-transparent focus:ring-2 focus:ring-blue-500  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            min="0"
            step="0.01"
          />
        </td>

        {/* Discount % (only for parts) */}
        <td className="px-2 py-2">
          {isPartType ? (
            <div className="relative">
              <input
                type="number"
                value={(item as any).discount || 0}
                onChange={(e) => {
                  const value = Math.min(100, Math.max(0, parseFloat(e.target.value) || 0));
                  updateItem(index, { discount: value });
                }}
                className="block w-16 px-2 py-1.5 text-sm border border-gray-300 rounded shadow-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 pr-6  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                min="0"
                max="100"
                step="any"
              />
              <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                <span className="text-gray-500 text-xs"></span>
              </div>
            </div>
          ) : (
            <span className="text-gray-400 text-xs">N/A</span>
          )}
        </td>

        {/* Total */}
        <td className="px-3 py-2">
          <span className="text-xs font-semibold text-gray-900">
            {formatCurrency(item.total)}
          </span>
        </td>

        {/* Agent Comment */}
        <td className="px-3 py-2">
          {(item as any).agentComment ? (
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              (item as any).agentComment === 'Approved'
                ? 'bg-green-100 text-green-800'
                : 'bg-blue-100 text-blue-800'
            }`}>
              {(item as any).agentComment === 'Approved' ? (
                <CheckCircle className="h-3 w-3 mr-1" />
              ) : (
                <FileEdit className="h-3 w-3 mr-1" />
              )}
              {(item as any).agentComment}
            </span>
          ) : (
            <span className="text-gray-400 text-xs">—</span>
          )}
        </td>

        {/* Delete */}
        <td className="px-3 py-2">
          <button
            onClick={() => removeItem(index)}
            className="text-red-600 hover:text-red-900 transition-colors"
            title="Remove item"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </td>
      </tr>
    );
  };

  return (
    <SectionWrapper
      title="Parts & Labor"
      isRequired={true}
      isComplete={isComplete}
      isSectionComplete={isSectionComplete}
      approvalStatus={approvalStatus}
    >
      <div className="space-y-6">
        {/* Items Table */}
        <div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Article Nr</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Qty/Hrs</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Price/Rate</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Disc %</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total</th> 
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Comment</th>
                  <th className="px-3 py-2"></th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {caseData.partsAndLabor.items.map((item, index) => renderItemRow(item, index))}
              </tbody>
            </table>
          </div>

          {caseData.partsAndLabor.items.length === 0 && (
            <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <Tool className="h-8 w-8 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500 mb-1">No items added</p>
              <p className="text-xs text-gray-400">Add parts and labor to continue</p>
            </div>
          )}

          {/* Add Item Button */}
          <div className="flex justify-center mt-4">
            <button
              onClick={addItem}
              className="inline-flex items-center px-4 py-2 border border-transparent text-xs font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-all"
            >
              <Plus className="h-3 w-3 mr-1" />
              Add Item
            </button>
          </div>
        </div>

        {/* Totals Summary - Insurance Company Calculation */}
        <div className="pt-4 w-full">
          <div className="p-4  b w-fit ml-auto">
           
            <div className="space-y-2">
              {/* Subtotal (Parts + Labor) */}
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600 mr-2">Subtotal (Parts + Labor)</span>
                <span className="text-sm font-semibold text-gray-900">
                  {formatCurrency(caseData.partsAndLabor.totalParts + caseData.partsAndLabor.totalLabor)}
                </span>
              </div>

              {/* VAT */}
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600">
                  VAT (25%)
                  {caseData.insuranceCoverage && !caseData.insuranceCoverage.vatLiable && (
                    <span className="ml-2 text-xs text-gray-500 mr-2">(Not Liable)</span>
                  )}
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  {(() => {
                    const subtotal = caseData.partsAndLabor.totalParts + caseData.partsAndLabor.totalLabor;
                    const vatAmount = caseData.insuranceCoverage?.vatLiable ? subtotal * 0.25 : 0;
                    return formatCurrency(vatAmount);
                  })()}
                </span>
              </div>

              {/* Subtotal with VAT */}
              <div className="flex justify-between items-center py-2 border-t border-gray-300 pt-2">
                <span className="text-sm font-medium text-gray-700 mr-2">Subtotal with VAT</span>
                <span className="text-sm font-bold text-gray-900">
                  {(() => {
                    const subtotal = caseData.partsAndLabor.totalParts + caseData.partsAndLabor.totalLabor;
                    const vatAmount = caseData.insuranceCoverage?.vatLiable ? subtotal * 0.25 : 0;
                    return formatCurrency(subtotal + vatAmount);
                  })()}
                </span>
              </div>

              {/* Deductible */}
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600 mr-2">Deductible</span>
                <span className="text-sm font-semibold text-red-600">
                  {caseData.insuranceCoverage?.deductible !== undefined
                    ? `- ${formatCurrency(caseData.insuranceCoverage.deductible)}`
                    : formatCurrency(0)
                  }
                </span>
              </div>

              {/* Final Total for Insurance Company */}
              <div className="flex justify-between items-center py-3 border-t-2 border-gray-400 mt-2 pt-3  -mx-4 px-4">
                <span className="text-base font-bold text-gray-900 mr-2">Insurance Total </span>
                <span className="text-lg font-bold ">
                   {(() => {
                    const subtotal = caseData.partsAndLabor.totalParts + caseData.partsAndLabor.totalLabor;
                    const vatAmount = caseData.insuranceCoverage?.vatLiable ? subtotal * 0.25 : 0;
                    const subtotalWithVat = subtotal + vatAmount;
                    const deductible = caseData.insuranceCoverage?.deductible || 0;
                    const insuranceTotal = Math.max(0, subtotalWithVat - deductible);
                    return formatCurrency(insuranceTotal);
                  })()}
                </span>
              </div>
            </div>

  
      
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default PartsLaborSection;