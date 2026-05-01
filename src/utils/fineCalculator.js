export const calculateFine = (dueDate) => {
  const today = new Date();
  const due = new Date(dueDate);
  
  if (today <= due) return 0;

  const diffTime = Math.abs(today - due);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  // Contoh: Denda Rp 2.000 per hari
  return diffDays * 2000;
};