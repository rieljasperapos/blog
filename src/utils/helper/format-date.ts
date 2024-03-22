export const formattedDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString(`en-US`, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}