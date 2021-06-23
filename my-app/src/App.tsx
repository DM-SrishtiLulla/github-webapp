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
  reponame: string;
}

type repoData = {
  reponame: string;
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


  /*const getRepos = () => {
    const reps = JSON.parse(localStorage.getItem("repos") || "[]");
    if (reps) {
      setRepos(reps);
    }
    return repos;
  }*/

  const initialRepos = () => {
    return JSON.parse(localStorage.getItem("repos") || "[]")
  }

  const [repos, setRepos] = useState<repoFields[]>(initialRepos);
  const [reponames, setReponames] = useState<string[]>([])

  useEffect(() => {
    //let isMounted = true;  
    const reps : repoFields[] = JSON.parse(localStorage.getItem("repos") || JSON.stringify(repos));
    if (reps) {
      console.log("re-render")
      console.log(reps)
      setRepos(reps);
      var rnames : string[] = []
      for (var i = 0; i < reps.length; i++) {
        rnames.push(reps[i].reponame)
      }
      setReponames(rnames)
    }
    //return () => { isMounted = false };
  }, []);

  useEffect(() => {
    localStorage.setItem("repos", JSON.stringify(repos));
  }, [repos]);



  const addRepo = async(repo: repoFields) => {

      console.log(reponames)
      if (!reponames.includes(repo.reponame)) {
        setRepos([...repos, repo])
        setReponames([...reponames, repo.reponame])
        console.log("it's not already there")
      } else {
        console.log("ITS ALR HERE")
      }
   
      console.log(repos)
    

    /*console.log(includesRepo)
    if (!includesRepo) {
      setRepos([...repos, repo])
    }*/
    console.log(repos)
  }

  const removeRepo = (repoToRemove: repoFields) => {
    setRepos(repos.filter((repo) => repoToRemove !== repo))
  }

  const markRepoAsRead = (readRepo: repoFields) => {
    if (readRepo.unread == true) {
      var temp = readRepo;
      temp.unread = false;
      var repoIndex = repos.findIndex(function(c) { 
        return c.id == readRepo.id; 
    });
      const newRepos = [...repos];
      newRepos[repoIndex] = temp;
      setRepos(newRepos)
    }
    
  }
  

 
 
  return (
    <ChakraProvider>
      <AddRepo addRepo={addRepo} />
      <RepoList repos={repos} removeRepo={removeRepo} markRepoAsRead={markRepoAsRead}/>
      {/* <RepoContextProvider> */}
      {/* </RepoContextProvider> */}
    </ChakraProvider>
  );
}

export default App;
