import { createContext, useCallback, useContext, useMemo, useReducer } from 'react';
import { initialState, reducer, SEARCH_BY } from '../reducers/process-reducer';
import { getAllProcess } from '../services/api/processos-service';

const ProcessListContext = createContext();

export function useProcessList() {
  const context = useContext(ProcessListContext);

  if (!context) {
    throw new Error('useStorage must be used within an StorageProvider.');
  }

  return context;
}

export const ProcessListProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchProcess = useCallback(() => {
    let searchParams = null;
    switch (state.searchContext) {
      case SEARCH_BY.PROCESS:
        searchParams = { chaveProcesso: state.searchTerm };
        break;
      case SEARCH_BY.SUBJECT:
        searchParams = { cdAssunto: state.searchTerm };
        break;
      default:
        searchParams = null;
    }
    dispatch({ type: 'loading' });
    getAllProcess(searchParams).then(
      (data) => dispatch({ type: 'loaded', payload: data }),
      (error) => dispatch({ type: 'error', payload: error?.message })
    );
  }, [state.searchTerm]);

  const searchProcess = useCallback((searchTerm) => {
    dispatch({ type: 'searchTerm', payload: searchTerm });
  }, []);

  const setSearchContext = useCallback((type) => {
    dispatch({ type: 'searchContext', payload: type });
  }, []);

  const actions = useMemo(
    () => ({
      fetchProcess,
      searchProcess,
      setSearchContext,
    }),
    [fetchProcess, searchProcess, setSearchContext]
  );

  return <ProcessListContext.Provider value={{ state, actions }}>{children}</ProcessListContext.Provider>;
};
