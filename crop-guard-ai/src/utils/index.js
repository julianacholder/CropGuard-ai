// Custom utility function for creating page URLs
export const createPageUrl = (pageName) => {
  return `/${pageName.toLowerCase()}`;
};

// You can add more utility functions here as needed
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

export const formatConfidenceScore = (score) => {
  return `${Math.round(score * 100)}%`;
};

export const getSeverityColor = (severity) => {
  const colors = {
    low: 'text-green-600 bg-green-100 border-green-200',
    moderate: 'text-yellow-600 bg-yellow-100 border-yellow-200', 
    high: 'text-orange-600 bg-orange-100 border-orange-200',
    critical: 'text-red-600 bg-red-100 border-red-200'
  };
  return colors[severity] || 'text-gray-600 bg-gray-100 border-gray-200';
};