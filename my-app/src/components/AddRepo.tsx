import './../App.css';
import axios from 'axios';
import { Grid, GridItem } from "@chakra-ui/react"
import { Input, Button } from "@chakra-ui/react"
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import repoFields from '../repoFields';

type fetchProps = {
  username: string;
  reponame: string;
}

const makeUrl = ({username, reponame}: fetchProps) => `https://api.github.com/repos/${username}/${reponame}/releases`;

type FormValues = {
  username: string,
  reponame: string
}

const AddRepo = ({addRepo}) => {

  const [username, setUsername] = useState("")
  const [reponame, setReponame] = useState("")

  const useFetch = (init_url: string) => {
    const [url, setUrl] = useState("");
    const [error, setError] = useState();
    const [repo, setRepo] = useState<repoFields>();
    
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
          

          const version : string = data.tag_name
          console.log(version)
          const r : repoFields = {reponame: reponame, owner: username, version: version, releaseDate: data.published_at, unread: true, id: data.node_id, description: data.body}

          if (reponame != "") {
            await addRepo(r)
          }
          setRepo({reponame: "", owner: "", version: "", releaseDate: "", unread: false, id: "", description: ""});
          setUsername("")
          setReponame("")
        }
        catch (e) {
          setError(e)
        }
        
      }
      fetchItems()
    
    }, [url]);
    return { setUrl, error };
  }

  const { setUrl, error } = useFetch(makeUrl({username: "", reponame: ""}));

  const { register, handleSubmit } = useForm<FormValues>();

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
