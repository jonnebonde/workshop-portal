import React from 'react';

/**
 * Highlights matching text within a string by wrapping matches in <u> tags
 * @param text - The text to search within
 * @param searchTerm - The term to highlight
 * @returns Array of React nodes with highlighted matches
 */
export const highlightText = (text: string, searchTerm: string): React.ReactNode[] => {
  if (!text || !searchTerm) {
    return [text];
  }

  // Escape special regex characters in search term
  const escapedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
  // Create case-insensitive regex
  const regex = new RegExp(`(${escapedSearchTerm})`, 'gi');
  
  // Split text by matches
  const parts = text.split(regex);
  
  return parts.map((part, index) => {
    // Check if this part matches the search term (case-insensitive)
    if (part.toLowerCase() === searchTerm.toLowerCase()) {
      return <u key={index} className="bg-yellow-200">{part}</u>;
    }
    return part;
  });
};

/**
 * Highlights matching text in formatted dates
 * @param dateString - The date string to format and highlight
 * @param searchTerm - The term to highlight
 * @returns React node with highlighted date
 */
export const highlightDate = (dateString: string | undefined, searchTerm: string): React.ReactNode => {
  if (!dateString) return 'N/A';
  
  const formattedDate = new Date(dateString).toLocaleDateString('nb-NO');
  return highlightText(formattedDate, searchTerm);
};