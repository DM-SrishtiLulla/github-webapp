import React from "react";
import { Flex, Grid, GridItem, Heading, Link, Text } from "@chakra-ui/react";

const Header = () => (
  <Flex justify="space-between" borderBottom="1px" borderColor="gray.200" p={3}>
      <Grid templateColumns="repeat(10, 1fr)"
      templateRows="repeat(2, 1fr)"
     >
        <GridItem colSpan={4} rowSpan={2}> 
            <Heading as="h3" size="lg" m={1} colorScheme="blue" color="blue.600">
            Github API
            </Heading>
        </GridItem>
        <GridItem colSpan={6} rowSpan={2}>
            <Heading as="h3" size="sm" colorScheme="blue" color="blackAlpha.700">
            Enter a Github username and repository to see the latest release. 
            </Heading>
            <Text>A green border indicates an updated/unread release - refresh page to ensure releases for all repositories are updated. Click "Mark as Read" to indicate this release was read.</Text>
            <Text>Click "Toggle Details" to show/hide release notes.</Text>
        </GridItem>
       
      </Grid>
    

  </Flex>
);

export default Header;
