import { Flex } from '@chakra-ui/react';
import React from 'react';
import repoFields from '../repoFields';

interface repoType {
    repo: repoFields,
    removeRepo: any,
    updateRepo: any,
}
const Repo = ({ repo, removeRepo, updateRepo }: repoType ) => {

    const unread = repo.unread;
  return (
    <div>
    <Flex bgColor={unread? "teal.500" : "red.400"}>
        <p>{repo.version}</p>
      <p>{repo.repoName}</p>
      <p>{repo.owner}</p>
      <p>{repo.releaseDate}</p>
      <button onClick={() => removeRepo(repo)}>X</button>
      <button onClick={() => updateRepo(repo)}>READ</button>
    </Flex>
      
    </div>
  );
};

export default Repo;