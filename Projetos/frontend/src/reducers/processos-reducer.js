import { useState } from 'react';

const SEARCH_BY = {
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
  searchTerm: null,
  searchContext: SEARCH_BY.PROCESS,
  status: STATUS.IDLE,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'loading':
      return { ...state, status: STATUS.LOADING };
    case 'load':
      console.log(action.payload);
      return { ...state, processList: action.payload, status: STATUS.COMPLETE };
    case 'error':
      return { ...state, status: STATUS.ERROR };
    case 'searchTerm':
      return { ...state, searchTerm: action.payload };
    case 'searchContext':
      const ctx = action.payload === SEARCH_BY.PROCESS ? SEARCH_BY.PROCESS : SEARCH_BY.SUBJECT;
      return { ...state, searchContext: ctx };
    default:
      return { ...state };
  }
};
