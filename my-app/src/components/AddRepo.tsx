import logo from './logo.svg';
import './../App.css';
import axios from 'axios';
import { ChakraProvider, Grid, GridItem, useAccordionDescendant } from "@chakra-ui/react"
import { Formik, Form, Field } from 'formik';
import { FormErrorMessage, FormLabel, FormControl, Box, Flex, Heading, Input, Button, useColorMode, useColorModeValue } from "@chakra-ui/react"
import { useForm } from 'react-hook-form';
import React, { useContext, useState, useEffect } from 'react';
import { RepoContext } from '../contexts/RepoContext';
import repoFields from '../repoFields';

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




const makeUrl = ({username, reponame}: fetchProps) => `https://api.github.com/repos/${username}/${reponame}/releases`;

type FormValues = {
  username: string,
  reponame: string
}

const AddRepo = ({addRepo}) => {

  const [username, setUsername] = useState("")
  const [reponame, setReponame] = useState("")

  const [currentUser, setCurrentUser] = useState("");
  const [currentRepo, setCurrentRepo] = useState("");


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
          console.log(url)
          const result = await axios(url, {
            headers: {
              'Authorization': 'token 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',
            }
          })
          var data = result.data[0]
          
          setItems(data)
          setIsLoading(false)
          const version : string = data.tag_name
          console.log(version)
          const r : repoFields = {reponame: reponame, owner: username, version: version, releaseDate: data.published_at, unread: true, id: data.node_id, description: data.body}
          //setRepo(r)
          //const includesRepo = repos.
          if (reponame != "") {
            console.log(r.owner)
            console.log(r.reponame)
            await addRepo(r)
          }
          setRepo({reponame: "", owner: "", version: "", releaseDate: "", unread: false, id: "", description: ""});
          setUsername("")
          setReponame("")
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
  useFetch(makeUrl({username: "", reponame: ""}));

  const { register, handleSubmit } = useForm<FormValues>();

  //const [url, setUrl] = useState("")
  const [uName, setUname] = useState("")
  const [rData, setReturnData] = useState<repoData>()
  const [loading, setIsLoading] = useState(true)

  const HandleSubmit = ({username, reponame}: fetchProps) => {
    setUrl(makeUrl({username, reponame}))
    setUsername(username)
    setReponame(reponame)
    
  }
  return (
    <Grid
      templateColumns="repeat(10, 1fr)"
      gap={1}
      marginTop="1%"
    >
      <GridItem colSpan={3} marginLeft="5%">

        <form onSubmit={handleSubmit((data) => {
              HandleSubmit({username: data.username, reponame:data.reponame});
            })}>
          <label htmlFor="username">Github Username:</label>
          <Input {...register("username")} onChange={(e) => setUsername(e.target.value)} value={username}></Input>
          <label htmlFor="reponame">Repository Name:</label>
          <Input {...register("reponame")} onChange={(e) => setReponame(e.target.value)} value={reponame}></Input>
          <Button type="submit" marginTop="3%">Submit</Button>
        </form>
      </GridItem>
      <GridItem colSpan={1} ></GridItem>

    </Grid>
  );
  }


export default AddRepo;
