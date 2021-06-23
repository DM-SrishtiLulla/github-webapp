import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { ChakraProvider } from "@chakra-ui/react"
import repoFields from './repoFields';
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

function App() {

  const initialRepos = () => {
    return JSON.parse(localStorage.getItem("repos") || "[]")
  }

  const [repos, setRepos] = useState<repoFields[]>(initialRepos);
  const [reponames, setReponames] = useState<string[]>([])

  const makeUrl = ({username, reponame}: fetchProps) => `https://api.github.com/repos/${username}/${reponame}/releases`;

  useEffect(() => {
      const fetchItems = async () => {

          const reps : repoFields[] = JSON.parse(localStorage.getItem("repos") || JSON.stringify(repos));
          if (reps) {
            var rnames : string[] = []
            var oldRepo : repoFields
            var oldDate : string
            var newRepoData
            var newDate : string
            for (var i = 0; i < reps.length; i++) {
              oldRepo = reps[i]
              oldDate = oldRepo.releaseDate
              const result = await axios(makeUrl({username: oldRepo.owner, reponame: oldRepo.reponame}))
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
  }, [repos]);



  const addRepo = async(repo: repoFields) => {
    if (!reponames.includes(repo.reponame)) {
      setRepos([...repos, repo])
      setReponames([...reponames, repo.reponame])
    }
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
    </ChakraProvider>
  );
}

export default App;
