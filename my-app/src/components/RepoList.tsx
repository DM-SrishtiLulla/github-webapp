import Repo from './Repo';
import repoFields from '../repoFields';
import { Flex, VisuallyHidden } from '@chakra-ui/react';

interface listType {
    repos: repoFields[],
    removeRepo: any,
    markRepoAsRead: any,
}
const RepoList = ({ repos, removeRepo, markRepoAsRead }: listType) => {
    console.log("ok")
    console.log(repos)
  return (
    <Flex marginTop="3%">
      <ul>
        {(repos != undefined && repos.length > 0) ? 

        (repos.map((repo) => (
            repos && repo.id ? 
            (
          <li>
            <Repo key={repo.id} repo={repo} removeRepo={removeRepo} markRepoAsRead={markRepoAsRead}/>
          </li>) :
          <VisuallyHidden></VisuallyHidden>
        ))) :
        (<VisuallyHidden></VisuallyHidden>) 
            
    }
      </ul>
    </Flex>
  );
};

export default RepoList;