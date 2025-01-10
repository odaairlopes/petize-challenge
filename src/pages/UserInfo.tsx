import { Dispatch, FC, SetStateAction, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRepositories } from "../hooks/useRepositories";
import { formatDistanceToNow, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Box,
  Button,
  Card,
  Divider,
  Image,
  Link,
  Spinner,
  Text,
} from "@chakra-ui/react";
import Header from "../components/Header";
import { IUserData } from "../types/types";

interface UserInfoProps {
  user: IUserData;
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  onSearch: (username: string) => void;
}

const UserInfo: FC<UserInfoProps> = ({
  user,
  username,
  setUsername,
  onSearch,
}) => {
  const { repos, isLoading, hasMore, loadMore } = useRepositories(username);
  const { t } = useTranslation();

  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (
      scrollTop + clientHeight >= scrollHeight - 50 &&
      hasMore &&
      !isLoading
    ) {
      loadMore();
    }
  }, [hasMore, isLoading, loadMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]); // `handleScroll` is stable and doesn't cause re-renders

  return (
    <>
      <Header
        username={username}
        setUsername={setUsername}
        onSearch={onSearch}
      />
      <Box display="flex" flexDir="row" gap={8}>
        <Box display="flex" flexDir="column" gap={10}>
          <Card width="280px" height="465px" py="24px" px="16px">
            <Box display="flex" flexDir="row" gap={4}>
              <Image
                borderRadius="full"
                boxSize="48px"
                src={user.avatar_url}
                alt={`${user.login}'s avatar`}
              />
              <Box display="flex" flexDir="column">
                <Text
                  fontSize="20px"
                  fontWeight="700"
                  color="#171923"
                  fontFamily="Inter"
                >
                  {user.name}
                </Text>
                <Text
                  fontSize="sm"
                  color="#A0AEC0"
                  fontWeight={400}
                  fontFamily="Inter"
                >
                  @{user.login}
                </Text>
              </Box>
            </Box>
            <Box mt={4} mb={6} fontWeight={400} color="#4A5568">
              <Text fontSize="md">{user.bio}</Text>
            </Box>
            <Box mb={6} display="flex" flexDir="column" gap="8px">
              <Box display="flex" flexDir="row" gap="8px">
                <Image
                  src="src/assets/group.svg"
                  alt="Followers"
                  boxSize="20px"
                />
                <Text
                  fontSize="sm"
                  color="#4A5568"
                  fontWeight={400}
                  fontFamily="Inter"
                >
                  {user.followers} {t("followers")}
                </Text>
              </Box>
              <Box display="flex" flexDir="row" gap="8px">
                <Image
                  src="src/assets/heart.svg"
                  alt="Following"
                  boxSize="20px"
                  color="#4A5568"
                />
                <Text
                  fontSize="sm"
                  color="#4A5568"
                  fontWeight={400}
                  fontFamily="Inter"
                >
                  {user.following} {t("following")}
                </Text>
              </Box>
            </Box>
            <Box display="flex" flexDir="column" gap="8px">
              <Box display="flex" flexDir="row" gap="8px">
                <Image src="src/assets/work.svg" alt="Company" boxSize="20px" />
                <Text
                  fontSize="sm"
                  color="#4A5568"
                  fontWeight={400}
                  fontFamily="Inter"
                >
                  {user.company}
                </Text>
              </Box>
              <Box display="flex" flexDir="row" gap="8px">
                <Image src="src/assets/pin.svg" alt="Location" boxSize="20px" />
                <Text
                  fontSize="sm"
                  color="#4A5568"
                  fontWeight={400}
                  fontFamily="Inter"
                >
                  {user.location}
                </Text>
              </Box>
              <Box display="flex" flexDir="row" gap="8px">
                <Image src="src/assets/email.svg" alt="Email" boxSize="20px" />
                <Text
                  fontSize="sm"
                  color="#4A5568"
                  fontWeight={400}
                  fontFamily="Inter"
                >
                  {user.email}
                </Text>
              </Box>
              <Box display="flex" flexDir="row" gap="8px">
                <Image src="src/assets/link.svg" alt="Blog" boxSize="20px" />
                {(user.blog || user.blog !== null) && (
                  <Button
                    as={Link}
                    href={`https://${user.blog}`}
                    isExternal
                    size="xs"
                    backgroundColor="#8C19D2"
                    color="#ffffff"
                    borderRadius="6px"
                  >
                    {user.blog}
                  </Button>
                )}
              </Box>
              <Box display="flex" flexDir="row" gap="8px">
                <Image
                  src="src/assets/social.svg"
                  alt="Twitter"
                  boxSize="20px"
                />
                {(user.twitter_username || user.twitter_username !== null) && (
                  <Button
                    as={Link}
                    href={`https://twitter.com/${user.twitter_username}`}
                    isExternal
                    size="xs"
                    backgroundColor="#1DA1F2"
                    color="#ffffff"
                    borderRadius="6px"
                  >
                    {user.twitter_username}
                  </Button>
                )}
              </Box>
            </Box>
          </Card>
          <Button
            as="a"
            href={`mailto:${user.email}`}
            display={{ base: "none", md: "flex" }}
            backgroundColor="#8C19D2"
            color="#ffffff"
            size="lg"
            width="280px"
            height="48px"
            borderRadius="6px"
            fontFamily="Inter"
          >
            {t("contact")}
          </Button>
        </Box>
        <Box
          display="flex"
          flexDir="column"
          width="904px"
          height="800px"
          background="#FFFF"
          p={6}
          gap={4}
        >
          {repos.map((repo) => {
            const updatedAt = parseISO(repo.updated_at);
            const timeAgo = formatDistanceToNow(updatedAt, {
              locale: ptBR,
              addSuffix: true,
            });
            return (
              <Box
                display="flex"
                flexDir="column"
                width="856px"
                height="166px"
                gap={4}
                key={repo.id}
              >
                <Text
                  fontSize="20px"
                  fontWeight="700"
                  color="#171923"
                  fontFamily="Inter"
                >
                  <Link href={repo.html_url}>{repo.name}</Link>
                </Text>
                <Text fontSize="md" color="#4A5568" fontFamily="Inter">
                  {repo.description}
                </Text>
                <Box display="flex" flexDir="row" gap="8px">
                  <Image src="src/assets/star.svg" alt="Stars" boxSize="20px" />{" "}
                  <Text
                    fontSize="sm"
                    color="#4A5568"
                    fontWeight={400}
                    fontFamily="Inter"
                  >
                    {" "}
                    {repo.stargazers_count} • {`${t("updated")} ${timeAgo}`}
                  </Text>
                </Box>
                <Divider />
              </Box>
            );
          })}
          {isLoading && (
            <Box textAlign="center" mt="4">
              <Spinner size="lg" />
            </Box>
          )}
          {!hasMore && (
            <Text textAlign="center" mt="4" color="gray.500">
              {t("load_all_repo")}
            </Text>
          )}
        </Box>
      </Box>
    </>
  );
};

export default UserInfo;
