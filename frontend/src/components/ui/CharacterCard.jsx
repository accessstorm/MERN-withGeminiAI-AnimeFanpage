import { useCharacterStore } from "@/store/character";
import {
    Box,
    Button,
    Heading,
    HStack,
    IconButton,
    Image,
    Input,
    Text,
    VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FiTrash2, FiEdit } from "react-icons/fi";

const CharacterCard = ({
    character = { name: "Default Name", image: "default.jpg", power: "Default Power" },
}) => {
    const [isEditing, setIsEditing] = useState(false); // Track if editing is active
    const [updatedCharacter, setUpdatedCharacter] = useState({
        name: character.name,
        image: character.image,
        power: character.power,
    });
    const { deleteCharacter, updateCharacter } = useCharacterStore(); // Assuming you have an `updateCharacter` function in the store
    const [isDeleted, setIsDeleted] = useState(false); // Track if the character is deleted

    // Delete character handler
    const handleDeleteCharacter = async (pid) => {
        const { success, message } = await deleteCharacter(pid);
        if (!success) {
            console.log(message);
        } else {
            console.log(message);
            setIsDeleted(true); // Trigger re-render by setting the state
        }
    };

    // Update character handler
    const handleUpdateCharacter = async () => {
        const { success, message } = await updateCharacter(character._id, updatedCharacter);
        if (success) {
            console.log(message);
            setIsEditing(false); // Exit editing mode
        } else {
            console.error(message);
        }
    };

    // If the character is deleted, don't render the card
    if (isDeleted) {
        return null;
    }

    return (
        <Box
            shadow="lg"
            rounded="lg"
            overflow="hidden"
            transition="all 0.3s"
            _hover={{ transform: "translateY(-4px)", shadow: "xl" }}
        >
            <Image src={updatedCharacter.image} alt={updatedCharacter.name} h={48} objectFit="cover" />
            <Box p={4}>
                {isEditing ? (
                    <VStack spacing={2} align="stretch">
                        <Input
                            placeholder="Character Name"
                            value={updatedCharacter.name}
                            onChange={(e) => setUpdatedCharacter({ ...updatedCharacter, name: e.target.value })}
                        />
                        <Input
                            placeholder="Power"
                            value={updatedCharacter.power}
                            onChange={(e) => setUpdatedCharacter({ ...updatedCharacter, power: e.target.value })}
                        />
                        <Input
                            placeholder="Image URL"
                            value={updatedCharacter.image}
                            onChange={(e) => setUpdatedCharacter({ ...updatedCharacter, image: e.target.value })}
                        />
                    </VStack>
                ) : (
                    <>
                        <Heading as="h3" size="md">{updatedCharacter.name}</Heading>
                        <Text fontSize="xl" fontWeight="bold">Power: {updatedCharacter.power}</Text>
                    </>
                )}
            </Box>

            <HStack justify="flex-end" p={4}>
                {isEditing ? (
                    <>
                        <Button colorScheme="blue" onClick={handleUpdateCharacter}>
                            Save
                        </Button>
                        <Button variant="ghost" onClick={() => setIsEditing(false)}>
                            Cancel
                        </Button>
                    </>
                ) : (
                    <>

                        <IconButton><FiEdit color='blue' onClick={() => setIsEditing(true)} size="40px" /></IconButton>
                        <IconButton><FiTrash2 color='red' onClick={() => handleDeleteCharacter(character._id)} size="40px" /></IconButton>
                    </>
                )}
            </HStack>
        </Box>
    );
};

export default CharacterCard;
