import { useDispatch } from 'react-redux';

import { AppDispatch } from '@/src/store/store';

/**
 * Типизированны useDispatch
 *
 * @returns типизированную функцию dispatch
 */
const useTypedDispatch = () => useDispatch<AppDispatch>();

export default useTypedDispatch;
