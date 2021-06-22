import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { ChakraProvider } from "@chakra-ui/react"
import { Formik, Form, Field } from 'formik';
import { FormErrorMessage, FormLabel, FormControl, Box, Flex, Heading, Input, Button, useColorMode, useColorModeValue } from "@chakra-ui/react"
import { useForm } from 'react-hook-form';

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

// function FormikExample() {
//   function validateName(value: string) {
//     let error
//     if (!value) {
//       error = "Name is required"
//     } else if (value.toLowerCase() !== "naruto") {
//       error = "Jeez! You're not a fan 😱"
//     }
//     return error
//   }

//   return (
//     <Formik
//       initialValues={{ name: "Sasuke" }}
//       onSubmit={(values, actions) => {
//         console.log(actions)
//         setTimeout(() => {
//           alert(JSON.stringify(values, null, 2))
//           actions.setSubmitting(false)
//         }, 1000)
//       }}
//     >
//       {(props) => (
//         <Form>
//           <Field name="user" validate={validateName}>
//             {({ field, form }) => (
//               <FormControl isInvalid={form.errors.name && form.touched.name}>
//                 <FormLabel htmlFor="user">Github User</FormLabel>
//                 <Input {...field} id="user" placeholder="user" />
//                 <FormErrorMessage>{form.errors.name}</FormErrorMessage>
//               </FormControl>
//             )}
//           </Field>
//           <Field name="rname" validate={validateName}>
//             {({ field, form }) => (
//               <FormControl isInvalid={form.errors.name && form.touched.name}>
//                 <FormLabel htmlFor="rname">Repository Name</FormLabel>
//                 <Input {...field} id="rname" placeholder="rname" />
//                 <FormErrorMessage>{form.errors.name}</FormErrorMessage>
//               </FormControl>
//             )}
//           </Field>
//           <Button
//             mt={4}
//             colorScheme="teal"
//             isLoading={props.isSubmitting}
//             type="submit"
//           >
//             Submit
//           </Button>
//         </Form>
//       )}
//     </Formik>
//   )
// }



type FormValues = {
  username: string,
  reponame: string
}

function App() {

  const useFetch = ({ username, repoName }: fetchProps) => {
  const [items, setItems] = useState([]) 
  const [updatedAt, setUpdatedAt] = useState("") 
  const [description, setDescription] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [returnData, setReturnData] = useState<repoData>()
  
  useEffect(() => {
    const fetchItems = async () => {
      const result = await axios(
        
          `https://api.github.com/repos/${username}/${repoName}`
        )
      var data = result.data
      console.log(data)
      setItems(data)
      setUpdatedAt(data.updated_at)
      setDescription(data.description)
      setReturnData({username:username, repoName:repoName, updatedAt: data.updated_at, seen: false, description: data.description})
      setIsLoading(false)
    }
    fetchItems()
  
  }, []);
  return { returnData, isLoading };
  
  
}

  const { register, handleSubmit } = useForm<FormValues>();

  const [url, setUrl] = useState("")
  const [uName, setUsername] = useState("")
  const [rName, setRepoName] = useState("")
  const [rData, setReturnData] = useState<repoData>()
  const [loading, setIsLoading] = useState(true)

  const HandleSubmit = ({username, repoName}: fetchProps) => {
    const {returnData, isLoading} = useFetch({username:uName, repoName:rName})
    setReturnData(returnData)
    setIsLoading(isLoading)
  }
  return (
    <ChakraProvider>
      <form onSubmit={handleSubmit((data) => {
            HandleSubmit({username: data.username, repoName:data.reponame});
          })}>
        <label htmlFor="username">Github Username:</label>
        <input {...register("username")}></input>
        <label htmlFor="reponame">Repository Name:</label>
        <input {...register("reponame")}></input>
        <input type="submit"></input>
      </form>
      {/* <IndexPage /> */}
      {/* <Formik initialValues={{url: ""}} onSubmit={values => {
        useFetch({username: "", repoName: ""})
      }}>
        {(props) => (
        <Form>
          <Field name="name" validate={validateName}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.name && form.touched.name}>
                <FormLabel htmlFor="name">First name</FormLabel>
                <Input {...field} id="name" placeholder="name" />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={props.isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </Form>
      )}
      </Formik> */}
      {/* <form onSubmit={HandleSubmit}>
        <FormControl>
          <FormLabel htmlFor="Github URL">Github URL</FormLabel>
          <Input
            type="string"
            id="username"
            placeholder="facebook"
            onChange={((event: { currentTarget: { value: React.SetStateAction<string>; }; }) => setUsername(event.currentTarget.value))}
          />
          <Input
            type="string"
            id="reponame"
            placeholder="react"
            onChange={((event: { currentTarget: { value: React.SetStateAction<string>; }; })=> setRepoName(event.currentTarget.value))}
          />
          {/* <Input
            type="url"
            id="url"
            placeholder="https://github.com/lumanu/gh-release-monitor"
            onChange={(event: { currentTarget: { value: React.SetStateAction<string>; }; }) => setUrl(event.currentTarget.value)}
          /> 
        </FormControl>
        <Button mt={4} colorScheme="teal" type="submit">
          Submit
        </Button>
      </form> */}
      {/* <Input placeholder="abc@gmail.com" variant="filled" mb={3} type="email" />
      <Input placeholder="********" variant="filled" mb={6} type="password" />
      <Button mb={6} colorScheme="teal">Log in</Button>
      <Button>Toggle Color Mode</Button>
      <Flex>
        {loading ? <Heading>Loading...</Heading> : <Box>{rData?.description}</Box>}
      </Flex> */}
    </ChakraProvider>
  );
}

export default App;
