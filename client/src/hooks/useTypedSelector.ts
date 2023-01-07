import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { RootState } from '@/src/store/store';

/**
 * Типизированны useSelector
 */
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useTypedSelector;
