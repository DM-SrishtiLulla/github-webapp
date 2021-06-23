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
import Header from './components/Header';

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

  const makeUrl = ({username, reponame}: fetchProps) => `https://api.github.com/repos/${username}/${reponame}/releases`;

  useEffect(() => {
      const fetchItems = async () => {

        //let isMounted = true;  
          const reps : repoFields[] = JSON.parse(localStorage.getItem("repos") || JSON.stringify(repos));
          if (reps) {
            console.log("re-render")
            console.log(reps)
            var rnames : string[] = []
            var oldRepo : repoFields
            var oldDate : string
            var newRepoData
            var newDate : string
            for (var i = 0; i < reps.length; i++) {
              oldRepo = reps[i]
              oldDate = oldRepo.releaseDate
              const result = await axios(makeUrl({username: oldRepo.owner, reponame: oldRepo.reponame}), {
                headers: {
                  'Authorization': 'token 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',
                }
              })
              newRepoData = result.data[0]
              newDate = newRepoData.published_at
              if (newDate != oldDate) {
                oldRepo.id = newRepoData.node_id
                oldRepo.description = newRepoData.body
                oldRepo.releaseDate = newDate
                oldRepo.unread = true
                oldRepo.version = newRepoData.tag_name
                reps[i] = oldRepo
              }
              
              rnames.push(reps[i].reponame)
            }
            setReponames(rnames)
            setRepos(reps);
          }
      
    }
    fetchItems()
  
  }, []);
  

  useEffect(() => {
    localStorage.setItem("repos", JSON.stringify(repos));
    console.log("i came here")
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
    setReponames(reponames.filter((rname) => repoToRemove.reponame !== rname))
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
      <Header />
      <AddRepo addRepo={addRepo} />
      <RepoList repos={repos} removeRepo={removeRepo} markRepoAsRead={markRepoAsRead}/>
      {/* <RepoContextProvider> */}
      {/* </RepoContextProvider> */}
    </ChakraProvider>
  );
}

export default App;
