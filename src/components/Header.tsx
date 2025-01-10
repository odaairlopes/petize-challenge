import {
  Box,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { Dispatch, SetStateAction } from "react";

interface HeaderProps {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  onSearch: (username: string) => void;
}

const Header = ({ username, setUsername, onSearch }: HeaderProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(username); // Realiza a busca ao pressionar Enter
    }
  };
  return (
    <Box
      width="100%"
      display="flex"
      flexDir="row"
      pt="20px"
      gap="120px"
      mb="100px"
    >
      <Heading fontSize={32} fontWeight={500}>
        <Text as="span" color="#0069CA" letterSpacing={1}>
          Search
        </Text>{" "}
        <Text as="span" color="#8C19D2" letterSpacing={1}>
          d_evs
        </Text>
      </Heading>
      <InputGroup alignItems="center" width="590px">
        <InputLeftElement pointerEvents="none" height="100%">
          <Search2Icon color="#A0AEC0" />
        </InputLeftElement>
        <Input
          type="search"
          placeholder="Search"
          _placeholder={{ opacity: 1, color: "#A0AEC0" }}
          color="#A0AEC0"
          width="590px"
          height="48px"
          borderRadius="md"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </InputGroup>
    </Box>
  );
};

export default Header;
