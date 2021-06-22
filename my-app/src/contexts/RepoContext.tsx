import React, { createContext, useReducer, useEffect } from 'react';
import { repoReducer } from '../reducers/repoReducer';

export const RepoContext = createContext<contextFields | null>(null);

interface repoFields {
  repoName : string, 
  owner: string,
  version: string,
  releaseDate: string,
  unread: boolean,
  id: string
} 

interface contextFields {
  repos: repoFields[],
  dispatch: ({type}:{type:string}) => void;

}
const RepoContextProvider = (props) => {
  const [repos, dispatch] = useReducer(repoReducer, [], () => {
    const localData = localStorage.getItem('repos');
    return localData ? JSON.parse(localData) : [];
  });
  useEffect(() => {
    localStorage.setItem('repos', JSON.stringify(repos));
  }, [repos]);
  return (
    <RepoContext.Provider value={{ repos, dispatch }}>
      {props.children}
    </RepoContext.Provider>
  );
}
 
export default RepoContextProvider;