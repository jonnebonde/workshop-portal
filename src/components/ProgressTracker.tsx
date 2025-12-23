import React from 'react';
import { CheckCircle, AlertCircle, Circle, AlertTriangle } from 'lucide-react';
import { WorkshopCase } from '../data/mockData';
import {
  hasInsuranceCoverageComplete,
  hasDdfComplete,
  hasImagesAvailable,
  hasPartsAndLaborComplete,
  hasCalibrationComplete,
  hasInvoicePresent,
  hasActionLogActivity,
  hasNewLogMessages
} from '../data/mockData';

interface ProgressTrackerProps {
  caseData: WorkshopCase | null;
}

interface SectionStatus {
  name: string;
  isComplete: boolean;
  isRequired: boolean;
  sectionId: string;
  hasNewMessages?: boolean;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ caseData }) => {
  if (!caseData) return null;

  const sections: SectionStatus[] = [
    { name: 'Case Info', isComplete: true, isRequired: true, sectionId: 'case-info' },
    { name: 'Insurance', isComplete: hasInsuranceCoverageComplete(caseData), isRequired: true, sectionId: 'insurance' },
    { name: 'DDF Form', isComplete: hasDdfComplete(caseData), isRequired: true, sectionId: 'ddf' },
    { name: 'Images', isComplete: hasImagesAvailable(caseData), isRequired: true, sectionId: 'images' },
    { name: 'Parts & Labor', isComplete: hasPartsAndLaborComplete(caseData), isRequired: true, sectionId: 'parts-labor' },
    { name: 'Calibration', isComplete: hasCalibrationComplete(caseData), isRequired: true, sectionId: 'calibration' },
    { name: 'Invoice', isComplete: hasInvoicePresent(caseData) && !!caseData?.invoice?.kid && !!caseData?.invoice?.totalAmount, isRequired: true, sectionId: 'invoice' },
    { name: 'Log', isComplete: false, isRequired: false, sectionId: 'communication-log', hasNewMessages: hasNewLogMessages(caseData) },
  ];

  const requiredSections = sections.filter(s => s.isRequired);
  const completedRequired = requiredSections.filter(s => s.isComplete).length;
  const totalRequired = requiredSections.length;
  const progressPercentage = Math.round((completedRequired / totalRequired) * 100);

  const scrollToSection = (sectionId: string) => {
    console.log(`[ProgressTracker] Section button clicked:`, sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      console.log(`[ProgressTracker] Element found for section:`, sectionId);

      // Find the scrollable container (the div with overflow-y-auto in Layout)
      const scrollContainer = document.querySelector('.overflow-y-auto');

      if (!scrollContainer) {
        console.error(`[ProgressTracker] Scrollable container not found`);
        return;
      }

      // Get the sticky header element to calculate proper offset
      const stickyHeader = document.getElementById('case-detail-sticky-header');
      const headerHeight = stickyHeader ? stickyHeader.offsetHeight : 180; // fallback to ~180px
      const additionalPadding = 24; // Extra spacing below header
      const totalOffset = headerHeight + additionalPadding;

      // Calculate the element's position relative to the scrollable container
      const containerRect = scrollContainer.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      const currentScrollTop = scrollContainer.scrollTop;

      // Calculate how far the element is from the top of the container
      const relativeTop = elementRect.top - containerRect.top + currentScrollTop;
      const scrollTarget = relativeTop - totalOffset;

      console.log(`[ProgressTracker] Scrolling to position:`, {
        containerRect,
        elementRect,
        currentScrollTop,
        relativeTop,
        headerHeight,
        totalOffset,
        scrollTarget
      });

      // Scroll the container to the element, accounting for the sticky header
      scrollContainer.scrollTo({
        top: scrollTarget,
        behavior: 'smooth'
      });
    } else {
      console.error(`[ProgressTracker] Element not found for section:`, sectionId);
    }
  };

  return (
    <div className="progress-tracker-container">
  

      <div className="flex flex-wrap gap-2">
        {sections.map((section, index) => {
          const isLogSection = section.sectionId === 'communication-log';
          const hasNewItems = section.hasNewMessages;

          return (
            <button
              key={index}
              onClick={() => scrollToSection(section.sectionId)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all hover:shadow-md cursor-pointer ${
                isLogSection && hasNewItems
                  ? 'bg-red-50 border-red-500 hover:bg-red-100'
                  : section.isComplete
                  ? 'bg-green-50 border-green-200 hover:bg-green-100'
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              }`}
            >
              {isLogSection && hasNewItems ? (
                <AlertTriangle className="h-4 w-4 text-red-600 flex-shrink-0" />
              ) : section.isComplete ? (
                <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
              ) : section.isRequired ? (
                <Circle className="h-4 w-4 text-yellow-500 flex-shrink-0" />
              ) : (
                <Circle className="h-4 w-4 text-gray-400 flex-shrink-0" />
              )}
              <span className={`text-sm font-medium whitespace-nowrap ${
                isLogSection && hasNewItems
                  ? 'text-red-900'
                  : section.isComplete
                  ? 'text-green-900'
                  : 'text-gray-700'
              }`}>
                {section.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressTracker;
