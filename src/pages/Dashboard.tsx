import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  FileText,
  Receipt,
  Trophy,
  Clock,
  TrendingUp,
  Camera,
  Pause,
  FolderOpen
} from 'lucide-react';
import DashboardKpiCard from '../components/DashboardKpiCard';
import CasesTable from '../components/CasesTable';
import TableToolbar from '../components/TableToolbar';
import { 
  kpiData, 
  getDraftCasesKPIs, 
  getAwaitingInvoiceCasesKPIs, 
  getOnHoldCasesKPIs, 
  getFinishedCasesKPIs,
  getDraftCases,
  getAwaitingInvoiceCases,
  getOnHoldCases,
  getCases,
  WorkshopCase
} from '../data/mockData';


const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [cases, setCases] = useState<WorkshopCase[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Get active tab from URL params, default to 'draft-cases'
  const activeTab = searchParams.get('tab') || 'draft-cases';
  
  // Calculate KPI data
  const draftKpis = getDraftCasesKPIs();
  const awaitingInvoiceKpis = getAwaitingInvoiceCasesKPIs();
  const onHoldKpis = getOnHoldCasesKPIs();
  
  // Tab configuration with case counts
  const tabs = [
    {
      id: 'draft-cases',
      label: `Open (${draftKpis.totalDraft})`,
      getData: getDraftCases
    },
    {
      id: 'awaiting-invoice',
      label: `Awaiting Invoice (${awaitingInvoiceKpis.totalAwaiting})`,
      getData: getAwaitingInvoiceCases
    },
    {
      id: 'on-hold',
      label: `On Hold (${onHoldKpis.totalOnHold})`,
      getData: getOnHoldCases
    },
    {
      id: 'all-cases',
      label: `All Cases (${getCases().length})`,
      getData: getCases
    },
  
  ];

  const currentTab = tabs.find(tab => tab.id === activeTab) || tabs[0];

  // Load cases when active tab changes
  useEffect(() => {
    const tabConfig = tabs.find(tab => tab.id === activeTab);
    if (tabConfig) {
      const tabCases = tabConfig.getData();
      setCases(tabCases);
    }
  }, [activeTab]);

  // Handle tab change
  const handleTabChange = (tabId: string) => {
    setSearchParams({ tab: tabId });
    setSearchTerm('');
  };
  

  return ( 
    <div className="space-y-2 py-4 my-4 px-6">
      
      {/* Sticky Search and Tabs Container */} 
      <div className="sticky top-0 bg-gray-50 pb-4 z-10">
        <div className=" sm:px-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-300 overflow-hidden mb-4">
            {/* Search Bar */}
            <TableToolbar
              searchTerm={searchTerm}
              onSearchSubmit={setSearchTerm}
              showStatusLegend={false}
            />
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-300 overflow-hidden">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200">
              <div className="flex border-b border-gray-200">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabChange(tab.id)}
                      className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-all duration-200 ${ 
                        isActive
                          ? 'border-blue-400 text-gray-700 bg-gray-100'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                      aria-label={`Switch to ${tab.label} tab`}
                      role="tab"
                      aria-selected={isActive}
                    >
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Case Management Section */}
      <div className="px-4 sm:px-0">
        <div className="border border-gray-100">
          {/* Tab Content */}
          <div className=" bg-white rounded-lg shadow-sm border border-gray-100">
            <CasesTable
              searchTerm={searchTerm}
              cases={cases.filter(c => 
                !searchTerm || 
                c.vehicle?.licensePlate?.toUpperCase().includes(searchTerm.toUpperCase()) ||
                c.insuranceCompany?.toUpperCase().includes(searchTerm.toUpperCase()) ||
                c.workshopName?.toUpperCase().includes(searchTerm.toUpperCase()) ||
                c.service?.type?.toUpperCase().includes(searchTerm.toUpperCase()) ||
                c.assessment?.damageDate?.includes(searchTerm) ||
                c.vehicle?.make?.toUpperCase().includes(searchTerm.toUpperCase()) ||
                new Date(c.updatedAt).toLocaleDateString('nb-NO').includes(searchTerm)
              )}
            />
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;