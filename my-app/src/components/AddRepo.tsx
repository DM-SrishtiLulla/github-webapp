import logo from './logo.svg';
import './../App.css';
import axios from 'axios';
import { ChakraProvider } from "@chakra-ui/react"
import { Formik, Form, Field } from 'formik';
import { FormErrorMessage, FormLabel, FormControl, Box, Flex, Heading, Input, Button, useColorMode, useColorModeValue } from "@chakra-ui/react"
import { useForm } from 'react-hook-form';
import React, { useContext, useState, useEffect } from 'react';
import { RepoContext } from '../contexts/RepoContext';
import repoFields from '../repoFields';

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




const makeUrl = ({username, repoName}: fetchProps) => `https://api.github.com/repos/${username}/${repoName}/releases`;

type FormValues = {
  username: string,
  reponame: string
}

const AddRepo = ({addRepo}) => {

  const [username, setUsername] = useState("")
  const [reponame, setRepoName] = useState("")


  //const { dispatch } = useContext(RepoContext);

  const useFetch = (init_url: string) => {
    const [url, setUrl] = useState("");
    
    const [items, setItems] = useState("") 
    const [updatedAt, setUpdatedAt] = useState("") 
    const [description, setDescription] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState();

    const [repo, setRepo] = useState<repoFields>();
  
    //const [returnData, setReturnData] = useState<repoData>()
    
    useEffect(() => {
      const fetchItems = async () => {
        try {
          const result = await axios(url)
          var data = result.data[0]
          console.log(data)
          //console.log(data.tag_name)
          setItems(data)
          //setUpdatedAt(data.updated_at)
          //setDescription(data.description)
          //setReturnData({username:username, repoName:repoName, updatedAt: data.updated_at, seen: false, description: data.description})
          setIsLoading(false)
          const version : string = data.tag_name
          console.log(version)
          //console.log(updatedAt)
          const r : repoFields = {repoName: reponame, owner: username, version: version, releaseDate: data.published_at, unread: true, id: data.node_id}
          setRepo(r)
          console.log("hello")
          console.log(repo)
          console.log("a" + repo?.version)
          addRepo(r)
          setRepo({repoName: "", owner: "", version: "", releaseDate: "", unread: false, id: ""});
          setUsername("")
          setRepoName("")
          //localStorage.setItem(url, data.description)
          //dispatch()
        }
        catch (e) {
          setError(e)
        }
        
      }
      fetchItems()
    
    }, [url]);
    return { items, error, isLoading, setUrl, description, updatedAt };
  }

  const { items, error, isLoading, setUrl, description, updatedAt } = 
  useFetch(makeUrl({username: "", repoName: ""}));

  const { register, handleSubmit } = useForm<FormValues>();

  //const [url, setUrl] = useState("")
  const [uName, setUname] = useState("")
  const [rData, setReturnData] = useState<repoData>()
  const [loading, setIsLoading] = useState(true)

  const HandleSubmit = ({username, repoName}: fetchProps) => {
    setUrl(makeUrl({username, repoName}))
    setUsername(username)
    setRepoName(repoName)
    //console.log(items)

    //const {returnData, isLoading} = useFetch({username:uName, repoName:rName})
    //setReturnData(returnData)
    //setIsLoading(isLoading)
  }
  return (
      <form onSubmit={handleSubmit((data) => {
            HandleSubmit({username: data.username, repoName:data.reponame});
          })}>
        <label htmlFor="username">Github Username:</label>
        <input {...register("username")} onChange={(e) => setUsername(e.target.value)} value={username}></input>
        <label htmlFor="reponame">Repository Name:</label>
        <input {...register("reponame")} onChange={(e) => setRepoName(e.target.value)} value={reponame}></input>
        <input type="submit"></input>
      </form>
      
  );
  }


export default AddRepo;
