const log = console.log;
export const SEARCH_BY = {
  PROCESS: 'PROCESS',
  SUBJECT: 'SUBJECT',
};

export const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  COMPLETE: 'complete',
  ERROR: 'error',
};

export const initialState = {
  processList: [],
  searchTerm: '',
  searchContext: 'PROCESS',
  status: 'idle',
};

export const reducer = (state = initialState, action) => {
  log('CHAMOU REDUCER');
  switch (action.type) {
    case 'loading':
      log(action);
      return { ...state, status: STATUS.LOADING };
    case 'loaded':
      log(action);
      return { ...state, processList: action.payload, status: STATUS.COMPLETE };
    case 'error':
      log(action);
      return { ...state, status: STATUS.ERROR };
    case 'searchTerm':
      log(action);
      return { ...state, searchTerm: action.payload };
    case 'searchContext':
      log(action);
      return { ...state, searchContext: action.payload };
    default:
      return { ...state };
  }
};
