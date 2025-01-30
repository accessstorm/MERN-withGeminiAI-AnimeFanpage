import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HStack, Box, Text, Container } from "@chakra-ui/react";
import { FaHome, FaPlusCircle, FaComments } from "react-icons/fa"; // Import icons
import Chat from "./Chat"; // Import the Chat Component

const Navbar = () => {
  const [showChat, setShowChat] = useState(false); // State to manage chat visibility

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  return (
    <Box bg="transparent" p={4} color="white">
      <HStack spacing={5} align="center" justify="space-between"> {/* Flex alignment */}
        {/* Brand Section */}
        <Text
          fontSize="3xl"  // Large font size
          fontWeight="extrabold"  // Bold weight
          textShadow="2px 2px 6px rgba(0, 0, 0, 0.4)"  // Subtle shadow to create depth
          letterSpacing="wider"  // Spaced-out letters for a modern look
          animation="fadeIn 2s ease-in-out"  // Animation for smooth appearance
        >
          AttackOnTitan
        </Text>

        {/* Navigation Links */}
        <Container display="flex" alignItems="center" justifyContent="flex-end" spacing={4}>
          {/* Home Link with Home Icon */}
          <Link to="/">
            <FaHome size={24} color="white" />
          </Link>

          {/* Create Page Link with Plus Icon */}
          <Link to="/create" style={{ marginLeft: "16px" }}>
            <FaPlusCircle size={24} color="white" />
          </Link>

          {/* Chat Toggle Button */}
          <button
            onClick={toggleChat}
            style={{
              marginLeft: "16px",
              background: "transparent",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {/* Display the chat icon when clicked */}
            <FaComments size={20} />
          </button>
        </Container>
      </HStack>

      {/* Chat Modal */}
      {showChat && (
        <div className="chat-overlay">
          <div className="chat-modal">
            <Chat />
          </div>
        </div>
      )}
    </Box>
  );
};

export default Navbar;
