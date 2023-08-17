import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Spacer,
  Button,
  Image,
  IconButton,
  Collapse,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../assets/logo.png";
import { useStore } from "../modules/store";
import MediaQuery from 'react-responsive'

function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const user = useStore((state) => state.user);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userLoggedIn = Boolean(token);
    setLoggedIn(userLoggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    Swal.fire({
      title: "Logging out..",
      timer: 1000,
      showConfirmButton: false,
    });
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleCompany = () => {
    navigate("/companyprofile");
  };

  const handleClick = () => {
    onToggle();
  };

  const handleJob = () => {
    navigate("/post-job");
  };

  const handleAppli = () => {
    if (["recruiter"].includes(user.role)) {
      navigate("/all-applied-job");
    } else {
      navigate("/job-apply-user");
    }
  }

  return (

    <Box className="bg-mint">
      <Flex maxW="full" px={4} align="center" h={16}>
        <Box>
          <a href="/">
            <Image src={logo} alt="LOGO" h={6} mb={1} mr={2} />
          </a>
        </Box>
        <MediaQuery minWidth={768}>
          <Flex align="center">
            {isLoggedIn && (
              <Button
                variant="ghost"
                colorScheme="black"
                fontWeight="regular"
                px={4}
                py={2}
                rounded="md"
                fontSize="md"
                onClick={() => navigate("/job")}
              >
                Jobs
              </Button>
            )}
            {isLoggedIn && (
              <Button
                variant="ghost"
                colorScheme="black"
                fontWeight="regular"
                px={4}
                py={2}
                rounded="md"
                fontSize="md"
                onClick={handleCompany}
              >
                Companies
              </Button>
            )}
            {isLoggedIn && (
              <Button
                variant="ghost"
                colorScheme="black"
                fontWeight="regular"
                px={4}
                py={2}
                rounded="md"
                fontSize="md"
                onClick={handleProfile}
              >
                My Profile
              </Button>
            )}
            {isLoggedIn && (
              <Button
                variant="ghost"
                colorScheme="black"
                fontWeight="regular"
                px={4}
                py={2}
                rounded="md"
                fontSize="md"
                onClick={handleAppli}
              >
                Applications
              </Button>
            )}
            {isLoggedIn && ["recruiter"].includes(user.role) && ( // conditional for recruiter and admin */}
              <Button
                variant="ghost"
                colorScheme="black"
                fontWeight="regular"
                px={4}
                py={2}
                rounded="md"
                fontSize="md"
                onClick={handleJob}
              >
                Create Job
              </Button>
            )}
          </Flex>
        </MediaQuery>

        <Spacer />
        <Button
          bg="black"
          color="white"
          fontWeight="semibold"
          px={4}
          py={2}
          rounded="xl"
          fontSize="md"
          onClick={isLoggedIn ? handleLogout : handleLogin}
        >
          {isLoggedIn ? "Logout" : "Login"}
        </Button>
        <Box display={{ base: "block", md: "none" }}>
          <IconButton
            variant="ghost"
            colorScheme="black"
            rounded="md"
            fontSize="sm"
            aria-label="Open mobile menu"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            onClick={handleClick}
          />
        </Box>
      </Flex>
      <MediaQuery maxWidth={768}>

        <Collapse
          in={isOpen}
          animateOpacity
        >
          <div className="flex justify-evenly py-2">
            {isLoggedIn && (
              <Button
                variant="ghost"
                colorScheme="black"
                fontWeight="regular"
                px={4}
                py={2}
                rounded="md"
                fontSize="md"
                onClick={() => navigate("/job")}
              >
                Jobs
              </Button>
            )}
            {isLoggedIn && (
              <Button
                variant="ghost"
                colorScheme="black"
                fontWeight="regular"
                px={4}
                py={2}
                rounded="md"
                fontSize="md"
                onClick={handleCompany}
              >
                Companies
              </Button>
            )}
            {isLoggedIn && (
              <Button
                variant="ghost"
                colorScheme="black"
                fontWeight="regular"
                px={4}
                py={2}
                rounded="md"
                fontSize="md"
                onClick={handleProfile}
              >
                My Profile
              </Button>
            )}
            {["user"].includes(user.role) && isLoggedIn && ( // conditional for recruiter and admin */}
              <Button
                variant="ghost"
                colorScheme="black"
                fontWeight="regular"
                px={4}
                py={2}
                rounded="md"
                fontSize="md"
                onClick={() => navigate(`/job-apply-user`)}

              >
                Applications
              </Button>
            )}
          </div>
        </Collapse>
      </MediaQuery>
    </Box>

  );
}

export default Navbar;
