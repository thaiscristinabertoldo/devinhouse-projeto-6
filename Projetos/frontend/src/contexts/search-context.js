import { createContext, useContext, useEffect, useState } from 'react';
import { processList, searchProcess } from '../mock';

const SearchContext = createContext();

export function useSearchContext() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearchContext must be used within an SearchContextProvider.');
  }
  return context;
}

export const SearchContextProvider = ({ children }) => {
  const [searchType, setSearchType] = useState('PROCESS');
  const [searchKey, setSearchKey] = useState('');
  const [process, setProcess] = useState([]);

  const onChangeSearchType = (newSearchType) => {
    console.log('newSearchType: ', newSearchType);
    setSearchType(newSearchType);
  };

  const onChangeSearchKey = (newSearchKey) => {
    setSearchKey(newSearchKey);
  };

  const loadInitialProcessList = () => {
    setProcess(processList);
  };

  const loadProcessListOfSearch = () => {
    console.log(searchType);
    console.log('searchType: ', searchType.toUpperCase() === 'PROCESS');
    console.log('searchKey: ', searchKey);

    if (searchType.toUpperCase() === 'PROCESS') {
      console.log('process: ', searchProcess(searchType, searchKey));
      setProcess(searchProcess(searchType, searchKey));
    } else if (searchType.toUpperCase() === 'SUBJECT') {
      setProcess(searchProcess(searchType, searchKey));
    }
  };

  const loadProcessListWithRemovedElement = (elementForRemove) => {
    const newProcessList = [];
    console.log(elementForRemove);
    process.map((element) => {
      console.log(element.id !== elementForRemove.id);
      if (element.id !== elementForRemove.id) {
        newProcessList.push(element);
      }
    });
    console.log(newProcessList);
    setProcess(newProcessList);
  };

  useEffect(loadInitialProcessList, []);

  return (
    <SearchContext.Provider
      value={{
        onChangeSearchType,
        searchType,
        onChangeSearchKey,
        searchKey,
        loadProcessListOfSearch,
        loadProcessListWithRemovedElement,
        process,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
