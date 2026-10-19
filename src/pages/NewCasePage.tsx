import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CaseCreationFeature from '../features/case-creation/CaseCreationFeature';
import '../features/case-creation/styles.css';

const NewCasePage = () => {
  const navigate = useNavigate();
  const [creationSession, setCreationSession] = useState(0);

  return (
    <div className="case-creation">
      <CaseCreationFeature
        key={creationSession}
        onCreateNewCase={() => setCreationSession(session => session + 1)}
        onBackToDashboard={() => navigate('/')}
      />
    </div>
  );
};

export default NewCasePage;
