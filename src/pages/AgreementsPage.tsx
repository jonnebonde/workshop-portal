import { useAuth } from '../context/AuthContext';
import AgreementsView from '../features/agreements/AgreementsView';
import { getDemoAgreements } from '../features/agreements/demoRepository';

export default function AgreementsPage() {
  const { user, isAuthenticated, loading } = useAuth();
  if (loading) return <p role="status" className="p-6">Loading agreements…</p>;
  if (!isAuthenticated || !user) return <p role="alert" className="p-6">Sign in to view workshop agreements.</p>;
  const { scope, agreements } = getDemoAgreements(user.id);
  return <AgreementsView key={scope?.workshopId ?? 'unassigned'} workshop={scope?.name ?? 'No assigned workshop'} agreements={agreements} />;
}
