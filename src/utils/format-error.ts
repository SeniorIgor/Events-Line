import axios from 'axios';

const formatError = (err: unknown): string => {
  if (!err) {
    return '';
  }

  if (axios.isAxiosError(err)) {
    if (err.response) {
      return err.response?.data?.message;
    } else {
      return err.request.data?.message;
    }
  }

  if (err && typeof err === 'object' && err instanceof Error) {
    return String(err.message);
  }

  return String(err);
};

export default formatError;
