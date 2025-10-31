// Memoized formatters for better performance
const currencyFormatter = new Intl.NumberFormat('nb-NO', {
  style: 'currency',
  currency: 'NOK'
});

const dateFormatter = new Intl.DateTimeFormat('nb-NO', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});

const dateTimeFormatter = new Intl.DateTimeFormat('nb-NO', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
});

export const formatCurrency = (amount: number, currency: string = 'NOK') => {
  if (currency === 'NOK') {
    return currencyFormatter.format(amount);
  }
  return new Intl.NumberFormat('nb-NO', {
    style: 'currency',
    currency
  }).format(amount);
};

export const formatDate = (dateString: string | undefined, options?: Intl.DateTimeFormatOptions) => {
  if (!dateString) return 'N/A';
  
  if (!options) {
    return dateFormatter.format(new Date(dateString));
  }
  
  return new Date(dateString).toLocaleDateString('nb-NO', options);
};

export const formatDateTime = (dateString: string | undefined) => {
  if (!dateString) return 'N/A';
  return dateTimeFormatter.format(new Date(dateString));
};

export const formatVrn = (input: string) => {
  const formatted = input.toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (formatted.length <= 2) {
    return formatted;
  } else if (formatted.length <= 7) {
    const letters = formatted.slice(0, 2);
    const numbers = formatted.slice(2);
    return letters + numbers;
  }
  return formatted.slice(0, 7);
};

export const getStageColor = (stage: string) => {
  switch (stage) {
    case 'draft':
      return 'bg-yellow-100 text-yellow-800';
    case 'in_progress':
      return 'bg-blue-100 text-blue-800';
    case 'finished':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getStageLabel = (stage: string) => {
  switch (stage) {
    case 'draft':
      return 'Draft';
    case 'in_progress':
      return 'In Progress';
    case 'finished':
      return 'Finished';
    default:
      return stage;
  }
};