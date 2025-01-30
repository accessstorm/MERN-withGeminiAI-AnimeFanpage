import React, { useState } from 'react';
import { Box, Container, Heading, Input, Button, VStack } from '@chakra-ui/react';
import { useCharacterStore } from '../store/character';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toastify

const CreatePage = () => {
  const [newTitan, setNewTitan] = useState({ name: '', power: '', image: '' });

  const { createCharacter } = useCharacterStore();

  const handleAddTitan = async () => {
    const { success, message } = await createCharacter(newTitan);

    if (!success) {
      toast.error(`${message} Please try again.`, {
           position: "top-right",
        autoClose: 3000,
       hideProgressBar: false,
       closeOnClick: true,
      pauseOnHover: true,
        draggable: true,
        progress: undefined,
       theme: "dark",
      }); // Show error toast
    } else {
      toast.success(`${message} You've done well!`, {
          position: "top-right",
       autoClose: 3000,
        hideProgressBar: false,
       closeOnClick: true,
       pauseOnHover: true,
       draggable: true,
      progress: undefined,
        theme: "dark",
      });  // Show success toast
    }
  };

  return (
      <>
    <Container maxW="container.sm">
          <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
          />
      <VStack spacing={8}>
        <br />
        <br />
        <Heading as="h1" size="6xl" textAlign="center">
          Create new Titan
        </Heading>
        <Box w="full" p={6} rounded="lg" boxShadow="lg">
          <VStack spacing={4}>
            <Input
              placeholder="Name"
              name="name"
              value={newTitan.name}
              onChange={(e) => setNewTitan({ ...newTitan, name: e.target.value })}
            />
            <Input
              placeholder="Power"
              name="power"
              value={newTitan.power}
              onChange={(e) => setNewTitan({ ...newTitan, power: e.target.value })}
            />
            <Input
              placeholder="Image URL"
              name="image"
              value={newTitan.image}
              onChange={(e) => setNewTitan({ ...newTitan, image: e.target.value })}
            />
            <Button colorScheme="blue" onClick={handleAddTitan} w="full">
              Add Titan
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
          </>
  );
};

export default CreatePage;