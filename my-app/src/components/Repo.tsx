import { Box, Heading, Text, Stack, Button, Grid, GridItem, VisuallyHidden } from '@chakra-ui/react';
import { useState } from 'react';
import repoFields from '../repoFields';

interface repoType {
    repo: repoFields,
    removeRepo: any,
    markRepoAsRead: any,
}
const Repo = ({ repo, removeRepo, markRepoAsRead }: repoType ) => {

    const [showDetails, setShowDetails] = useState(true)
    const unread = repo.unread;
    const toggleDetails = (repo: repoFields) => {
        setShowDetails(!showDetails)
    }

  return (
    <Grid
      templateColumns="repeat(10, 1fr)"
      gap={1}
      marginBottom="5%"
    >
      <GridItem colSpan={3} marginLeft="5%">
        <Box
        maxW={'1000px'}
        w={'full'}
        boxShadow={'2xl'}
        rounded={'lg'}
        p={6}
        textAlign={'center'}
        border={"2px"}
        borderColor={unread? 'green.400' : "black"}>
        <Heading fontSize={'2xl'} fontFamily={'body'}>
          {repo.reponame}
        </Heading>
        <Text fontWeight={600} color={'gray.500'} mb={4}>
          {repo.owner}
        </Text>
        <Text
          textAlign={'center'}
          px={3}>
          Release Date: 
          
        </Text>
        <Text
          textAlign={'center'}
          px={3}>
          {repo.releaseDate}
          
        </Text>
        <Stack mt={8} direction={'row'} spacing={4}>
          <Button
            onClick={() => removeRepo(repo)}
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            _focus={{
              bg: 'gray.200',
            }}>
            Remove Repo
          </Button>
          <Button
            onClick={() => markRepoAsRead(repo)}
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            bg={'blue.400'}
            color={'white'}
            boxShadow={
              '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
            }
            _hover={{
              bg: 'blue.500',
            }}
            _focus={{
              bg: 'blue.500',
            }}>
            Mark as Read
          </Button>
          <Button
            onClick={() => toggleDetails(repo)}
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            bg={'green.400'}
            color={'white'}
            boxShadow={
              '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
            }
            _hover={{
              bg: 'green.500',
            }}
            _focus={{
              bg: 'green.500',
            }}>
            Toggle Details
          </Button>
        </Stack>
        </Box>
        </GridItem>
        <GridItem colSpan={7}>
            {
                showDetails?
                (<Box
                    maxW={'1000px'}
                    w={'full'}
                    boxShadow={'2xl'}
                    rounded={'lg'}
                    p={6}
                    display={"false"}
                    >
                    <Text color={'gray.500'}>
                    {repo.description}
                  </Text>
                    </Box>) : (<VisuallyHidden></VisuallyHidden>)
            }
        </GridItem>
    </Grid>  
    );
};

export default Repo;