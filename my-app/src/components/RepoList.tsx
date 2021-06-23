import React from 'react';
import Repo from './Repo';
import repoFields from '../repoFields';

interface listType {
    repos: repoFields[],
    removeRepo: any,
    markRepoAsRead: any,
}
const RepoList = ({ repos, removeRepo, markRepoAsRead }: listType) => {
    console.log("ok")
    console.log(repos)
  return (
    <div className="items-container">
      <ul>
        {(repos != undefined && repos.length > 0) ? 

        (repos.map((repo) => (
            repos && repo.id ? 
            (
          <li>
            
            
            <Repo key={repo.id} repo={repo} removeRepo={removeRepo} markRepoAsRead={markRepoAsRead}/>
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