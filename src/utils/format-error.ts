export const formatError = (err: unknown): string => {
  if (!err) {
    return '';
  }

  if (err instanceof Error) {
    return String(err.message);
  }

  return String(err);
};
