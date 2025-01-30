import React from "react";
import { Route, Routes } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Navbar from "@/components/ui/Navbar"; // Adjust path if necessary
import HomePage from "@/pages/HomePage"; // Adjust path if necessary
import CreatePage from "@/pages/CreatePage"; // Adjust path if necessary

const App = () => {
  return (
    <Box minH="100vh">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </Box>
  );
};

export default App;
