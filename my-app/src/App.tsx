import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { ChakraProvider } from "@chakra-ui/react"
import { Formik, Form, Field } from 'formik';
import { FormErrorMessage, FormLabel, FormControl, Box, Flex, Heading, Input, Button, useColorMode, useColorModeValue } from "@chakra-ui/react"
import { useForm } from 'react-hook-form';
import repoFields from './repoFields';
import RepoContextProvider from './contexts/RepoContext';
import RepoList from './components/RepoList';
import AddRepo from './components/AddRepo';

type fetchProps = {
  username: string;
  repoName: string;
}

type repoData = {
  repoName: string;
  username: string;
  updatedAt: string;
  seen: boolean;
  description: string;
}

const IndexPage = () => {
  const { toggleColorMode } = useColorMode()
  const formBackground = useColorModeValue("gray.100", "gray.700")
  return (
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Flex direction="column" background={formBackground} p={12} rounded={6}>
          <Heading mb={6}>Log in</Heading>
          <Input placeholder="abc@gmail.com" variant="filled" mb={3} type="email" />
          <Input placeholder="********" variant="filled" mb={6} type="password" />
          <Button mb={6} colorScheme="teal">Log in</Button>
          <Button onClick={toggleColorMode}>Toggle Color Mode</Button>
        </Flex>
      </Flex>
  );
}



function App() {

  const [repos, setRepos] = useState<repoFields[]>([]);

  const addRepo = (repo: repoFields) => {
    setRepos([...repos, repo])
    console.log(repos)
  }

  const removeRepo = (repoToRemove: repoFields) => {
    setRepos(repos.filter((repo) => repoToRemove !== repo))
  }

  const updateRepo = (repoToUpdate: repoFields) => {
    if (repoToUpdate.unread == true) {
      var temp = repoToUpdate;
      temp.unread = false;
      //removeRepo(repoToUpdate)

      var repoIndex = repos.findIndex(function(c) { 
        return c.id == repoToUpdate.id; 
    });
      const newRepos = [...repos];
      newRepos[repoIndex] = temp;
      setRepos(newRepos)
      //setRepos(repos.filter((repo) => repoToUpdate !== repo))
      //console.log(repos)
      //addRepo(temp)
      //setRepos([...repos, temp])
    }
    
  }
  

  useEffect(() => {
    let isMounted = true;  
    const repos = JSON.parse(localStorage.getItem("repos") || '{}');
    if (isMounted && repos) {
      setRepos(repos);
    }
    console.log(repos);
    return () => { isMounted = false };
  }, []);

  useEffect(() => {
    localStorage.setItem("repos", JSON.stringify(repos));
    console.log(repos);
  }, [repos]);

 
  return (
    <ChakraProvider>
      <RepoList repos={repos} removeRepo={removeRepo} updateRepo={updateRepo}/>
      <AddRepo addRepo={addRepo} />
      {/* <RepoContextProvider> */}
      {/* </RepoContextProvider> */}
    </ChakraProvider>
  );
}

export default App;
