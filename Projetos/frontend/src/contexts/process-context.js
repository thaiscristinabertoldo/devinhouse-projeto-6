import { createContext, useCallback, useContext, useMemo, useReducer } from 'react';
import { initialState, reducer, SEARCH_BY } from '../reducers/process-reducer';
import { deleteProcessById, getAllProcess } from '../services/api/processos-service';

const ProcessContext = createContext();

export function useProcess() {
  const context = useContext(ProcessContext);
  if (!context) {
    throw new Error('useStorage must be used within an StorageProvider.');
  }
  return context;
}

export const ProcessProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchProcessList = useCallback(() => {
    dispatch({ type: 'loading' });
    getAllProcess(buildSearchParams(state.searchContext))
      .then((data) => dispatch({ type: 'loaded', payload: data }))
      .catch((error) => dispatch({ type: 'error', payload: error?.message }));
  }, [state.searchTerm]);

  const searchProcess = useCallback((searchTerm) => {
    dispatch({ type: 'searchTerm', payload: searchTerm });
  }, []);

  const deleteProcess = useCallback((processId) => {
    deleteProcessById(processId)
      .then(async () => await getAllProcess())
      .catch((error) => dispatch({ type: 'error', payload: error?.message }));
  }, []);

  const setSearchContext = useCallback((type) => {
    dispatch({ type: 'searchContext', payload: type });
  }, []);

  const actions = useMemo(
    () => ({
      fetchProcessList,
      searchProcess,
      setSearchContext,
      deleteProcess,
    }),
    [fetchProcessList, searchProcess, setSearchContext, deleteProcess]
  );

  return <ProcessContext.Provider value={{ state, actions }}>{children}</ProcessContext.Provider>;
};

function buildSearchParams(context) {
  switch (context) {
    case SEARCH_BY.PROCESS:
      return { chaveProcesso: context.searchTerm };
    case SEARCH_BY.SUBJECT:
      return { cdAssunto: context.searchTerm };
    default:
      return null;
  }
}
