import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';

interface CreateCaseFabProps {
  isChatbotOpen: boolean;
}

const CreateCaseFab: React.FC<CreateCaseFabProps> = ({ isChatbotOpen }) => {
  const navigate = useNavigate();

  return (
    <div className={`fixed right-6 z-50 transition-all duration-300 ${isChatbotOpen ? 'bottom-[620px]' : 'bottom-24'}`}>
      <button
        onClick={() => navigate('/new-case')}
        className="bg-green-600 text-white rounded-full p-3 shadow-lg hover:bg-green-700 transition-colors group"
        title="Create New Case"
      >
        <div className="flex">
               <Plus size={24} /><span>New case</span>
        </div>
 
        
        
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
          Create New Case
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      </button>
    </div>
  );
};

export default CreateCaseFab;