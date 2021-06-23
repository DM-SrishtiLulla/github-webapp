import { Flex } from '@chakra-ui/react';
import React from 'react';
import repoFields from '../repoFields';

interface repoType {
    repo: repoFields,
    removeRepo: any,
    markRepoAsRead: any,
}
const Repo = ({ repo, removeRepo, markRepoAsRead }: repoType ) => {

    const unread = repo.unread;
  return (
    <div>
    <Flex bgColor={unread? "teal.500" : "red.400"}>
        <p>{repo.version}</p>
      <p>{repo.reponame}</p>
      <p>{repo.owner}</p>
      <p>{repo.releaseDate}</p>
      <p>{repo.description}</p>
      <button onClick={() => removeRepo(repo)}>X</button>
      <button onClick={() => markRepoAsRead(repo)}>READ</button>
    </Flex>
      
    </div>
  );
};

export default Repo;