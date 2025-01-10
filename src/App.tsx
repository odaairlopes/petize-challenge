import { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import { fetchRepositories, fetchUser } from "./api/fetchData";
import { IRepositoriesData, IUserData } from "./types/types";
import UserInfo from "./pages/UserInfo";
import { RouterProvider, createBrowserRouter } from "react-router";

import { Box } from "@chakra-ui/react";

function App() {
  const [userData, setUserData] = useState<IUserData | null>(null);
  const [repos, setRepos] = useState<IRepositoriesData[]>([]);
  //const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");

  const handleSearch = async (username: string) => {
    try {
      const user = await fetchUser(username);
      const repos = await fetchRepositories(username);
      setUserData(user);
      setRepos(repos);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <Box px="112px">
          <Home
            username={username}
            setUsername={setUsername}
            onSearch={handleSearch}
          />
        </Box>
      ),
    },
    {
      path: "/user-info",
      element:
        userData && repos ? (
          <Box px="112px">
            <UserInfo
              user={userData}
              username={username}
              setUsername={setUsername}
              onSearch={handleSearch}
            />
          </Box>
        ) : (
          <Box px="112px">
            <Home
              username={username}
              setUsername={setUsername}
              onSearch={handleSearch}
            />
          </Box>
        ),
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
