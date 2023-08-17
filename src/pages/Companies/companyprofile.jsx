import { useEffect, useState } from "react";
import { getAllCompanyProfile } from "../../fetching/companyprofile";
import { useNavigate } from "react-router-dom";
import {
  Heading,
  Box,
  Text,
  SimpleGrid,
  HStack,
  Button,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useStore } from "../../modules/store";
import Loading from "../../components/Loading";

function CompanyProfileUser() {
  const [companyProfiles, setCompanyProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const navigate = useNavigate();
  const user = useStore((state) => state.user);

  useEffect(() => {
    fetchCompanyProfiles();
  }, []);

  const fetchCompanyProfiles = async () => {
    try {
      const data = await getAllCompanyProfile();
      setCompanyProfiles(data);
      setIsLoading(false); 
    } catch (err) {
      console.error("Error fetching company data:", err);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Loading />
    );
  }

  return (
    <div className="bg-mint">
      <Box pb={8} maxWidth="1000px" margin="0 auto" pt={5}>
        <h1 className="text-4xl text-center font-semibold text-black my-4">
        Companies
      </h1>
        {["recruiter", "admin"].includes(user.role) && ( // conditional for recruiter and admin
          <Button
            onClick={() => navigate(`/companycreate`)}
            leftIcon={<AddIcon />}
            size="sm"
            bg="white"
            variant="outline"
            mb={5}
            borderRadius="xl"
          >
            Create New
          </Button>
        )}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={3} pb={100} pt={10} px={5}>
          {companyProfiles.length > 0 ? (
            companyProfiles.map((profile) => (
              <Box
                key={profile.id}
                boxShadow="2px 4px 6px rgba(0, 0, 0, 0.5)"
                bg="white"
                p={4}
                rounded="xl"
                className="job-card"
              >
                <Box mt={2}>
                  <Heading
                    color="black"
                    fontSize="lg"
                    lineHeight={1.2}
                    fontWeight="bold"
                    transition="opacity 1s ease-in-out"
                  >
                    {profile.name || "No name available"}
                  </Heading>
                  <Text color="black" fontSize="sm" mt={2}>
                    {profile.location || "No location available"}
                  </Text>
                  <HStack mt={3}>
                    <Button
                      size="sm"
                      color="white"
                      bg="black"
                      borderRadius="xl"
                      onClick={() =>
                        navigate(`/companydetail/${profile.id}`)
                      }
                    >
                      View Details
                    </Button>
                  </HStack>
                </Box>
              </Box>
            ))
          ) : (
            <Text color="black" textAlign="center">
              No company profiles available.
            </Text>
          )}
        </SimpleGrid>
      </Box>
      </div>
  );
}

export default CompanyProfileUser;
