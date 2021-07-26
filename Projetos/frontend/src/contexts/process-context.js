import { createContext, useCallback, useContext, useMemo, useReducer, useState } from 'react';
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
  const [searchCtx, setSearchCtx] = useState(SEARCH_BY.PROCESS);

  const fetchProcessList = useCallback(() => {
    dispatch({ type: 'loading' });
    setTimeout(() => {
      getAllProcess()
        .then((data) => dispatch({ type: 'loaded', payload: data }))
        .catch((error) => dispatch({ type: 'error', payload: error?.message }));
    }, 2000);
  }, []);

  const searchProcess = (searchTerm) => {
    getAllProcess(buildSearchParams(searchTerm, searchCtx))
      .then((data) => dispatch({ type: 'loaded', payload: data }))
      .catch((error) => dispatch({ type: 'error', payload: error?.message }));
  };

  const deleteProcess = useCallback((processId) => {
    deleteProcessById(processId)
      .finally(() => fetchProcessList())
      .catch((error) => dispatch({ type: 'error', payload: error?.message }));
  }, []);

  const setSearchContext = (context) => {
    setSearchCtx(context);
  };

  const actions = useMemo(
    () => ({
      fetchProcessList,
      searchProcess,
      setSearchContext,
      searchContext: searchCtx,
      deleteProcess,
    }),
    [fetchProcessList, searchProcess, setSearchContext, deleteProcess]
  );

  return <ProcessContext.Provider value={{ state, actions }}>{children}</ProcessContext.Provider>;
};

function buildSearchParams(term, context) {
  if (context === SEARCH_BY.PROCESS) {
    return { nuProcesso: term };
  }
  if (context === SEARCH_BY.SUBJECT) {
    return { assuntoDesc: term };
  }
  return null;
}
