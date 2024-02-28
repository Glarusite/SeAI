export const AsyncAlert = {
  alert: (title: string, message: string) => alert(`${title}\n\n${message}`),
  confirm: (title: string, message: string) => confirm(`${title}\n\n${message}`),
  prompt: (title: string, message?: string) => prompt(`${title}\n\n${message}`),
};
