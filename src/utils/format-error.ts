export const formatError = (err: any): string => {
  if (!err) {
    return '';
  }

  if (typeof err === 'object' && 'message' in err) {
    return String(err.message);
  }

  return String(err);
};
