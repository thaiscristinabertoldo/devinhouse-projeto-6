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
  searchContext: 'PROCESS',
  status: 'idle',
  error: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'loading':
      return { ...state, status: STATUS.LOADING };
    case 'loaded':
      return { ...state, processList: action.payload, status: STATUS.COMPLETE, error: null };
    case 'error':
      return { ...state, status: STATUS.ERROR, error: action.payload };
    case 'searchContext':
      return { ...state, searchContext: action.payload };
    default:
      return { ...state };
  }
};
