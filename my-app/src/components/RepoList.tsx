import React from 'react';
import Repo from './Repo';
import repoFields from '../repoFields';

interface listType {
    repos: repoFields[],
    removeRepo: any,
    updateRepo: any,
}
const RepoList = ({ repos, removeRepo, updateRepo }: listType) => {
  return (
    <div className="items-container">
      <ul>
        {(repos != undefined && repos.length > 0) ? 

        (repos.map((repo) => (
            repos && repo.id ? 
            (
          <li>
            
            
            <Repo key={repo.id} repo={repo} removeRepo={removeRepo} updateRepo={updateRepo}/>
          </li>) :
          <li></li>
        ))) :
        (<li></li>) 
            
    }
      </ul>
    </div>
  );
};

export default RepoList;