//Formats timestamps for messages or user profiles

// utils/formatDate.js

export function formatDate(date) {
  const d = new Date(date);
  return d.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}