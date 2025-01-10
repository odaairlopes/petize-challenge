import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import {
  Button,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Box,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

interface HomeProps {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  onSearch: (username: string) => void;
}

const Home = ({ username, setUsername, onSearch }: HomeProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSearch = () => {
    if (username.trim() !== "") {
      onSearch(username);
      navigate("/user-info");
    }
  };

  return (
    <Box
      display="flex"
      flexDir="column"
      alignItems="center"
      gap="3.5rem"
      width="100%"
      height="100vh"
      justifyContent="center"
      px={{ base: "1rem", md: "2rem" }}
    >
      <Heading
        fontSize={{ base: "50px", md: "80px" }}
        fontWeight={500}
        textAlign="center"
      >
        <Text as="span" color="#0069CA" letterSpacing={1}>
          Search
        </Text>{" "}
        <Text as="span" color="#8C19D2" letterSpacing={1}>
          d_evs
        </Text>
      </Heading>
      <Box display="flex" flexDir={{ base: "column", md: "row" }} gap="1rem">
        <InputGroup alignItems="center">
          <InputLeftElement pointerEvents="none" height="100%">
            <Search2Icon color="#A0AEC0" />
          </InputLeftElement>
          <Input
            type="search"
            placeholder={t("input_placeholder")}
            _placeholder={{ opacity: 1, color: "#A0AEC0" }}
            width={{ base: "380px", md: "592px" }}
            height={{ base: "56px", md: "48px" }}
            borderRadius="md"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </InputGroup>

        <Button
          display={{ base: "none", md: "block" }}
          backgroundColor="#8C19D2"
          color="#ffffff"
          size="lg"
          width="176px"
          height="48px"
          borderRadius="6px"
          onClick={handleSearch}
        >
          {t("search_button")}
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
