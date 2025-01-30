import React, { useEffect } from "react";
import { Box, Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useCharacterStore } from "../store/character.jsx";
import CharacterCard from "../components/ui/CharacterCard.jsx";

const HomePage = () => {
  const { fetchCharacters, character } = useCharacterStore(); // Fetch characters from the store

  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters]);
  console.log("characters", character);

  return (
    <Box>
      {/* Background Box with Fixed Background */}
      <Box
        position="fixed"
        top={0}
        left={0}
        width="100%"
        height="100vh"
        bgImage="url('https://wallpapercave.com/wp/wp12594624.jpg')"
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        zIndex={-1} // Place the background behind content
      />

      {/* Content Box with Characters */}
      <Box
        position="relative"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        zIndex={1}
        color="white"
        paddingTop={10} // Optional, to provide some space at the top
        bgColor="rgba(0, 0, 0, 0.2)" // Added background color with opacity
      >
        <Box p={4}>
          <Container maxW="container.xl" py={12}>
            <VStack spacing={8}>
              <Text
                fontSize="5xl"  // Large font size
                fontWeight="extrabold"  // Bold weight
                textShadow="2px 2px 6px rgba(0, 0, 0, 0.4)"  // Subtle shadow to create depth
                letterSpacing="wider"  // Spaced-out letters for a modern look
                animation="fadeIn 2s ease-in-out"  // Animation for smooth appearance
              >
                Current Characters
              </Text>



              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} w={"100%"}>
                {character.map((character) => (
                  <Box key={character._id} p={4}> {/* Added padding to wrap around the CharacterCard */}
                    <CharacterCard character={character} />
                  </Box>
                ))}
              </SimpleGrid>



              {character.length === 0 && (
                <Text fontSize="xl" textAlign={"center"} fontWeight="bold" color="gray.500">
                  No characters found 😢{" "}
                  <Link to={"/create"}>
                    <Text as="span" color="blue.500" _hover={{ textDecoration: "underline" }}>
                      Create a character
                    </Text>
                  </Link>
                </Text>
              )}
            </VStack>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
