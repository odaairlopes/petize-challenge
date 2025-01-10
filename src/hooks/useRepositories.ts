import { useState, useCallback, useRef } from "react";
import { IRepositoriesData } from "../types/types";

export const useRepositories = (username: string) => {
  const [repos, setRepos] = useState<IRepositoriesData[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const isFetching = useRef(false);

  const fetchRepositories = useCallback(async () => {
    if (isFetching.current || !hasMore || !username) return;

    isFetching.current = true;
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=10&page=${page}`
      );

      if (response.ok) {
        const data: IRepositoriesData[] = await response.json();
        setRepos((prevRepos) => [
          ...prevRepos,
          ...data.filter(
            (repo) =>
              !prevRepos.some((existingRepo) => existingRepo.id === repo.id)
          ),
        ]);
        setHasMore(data.length === 10);
      } else {
        console.error("Erro ao buscar repositórios:", response.statusText);
        setHasMore(false);
      }
    } catch (error) {
      console.error("Erro ao carregar repositórios:", error);
    } finally {
      setIsLoading(false);
      isFetching.current = false;
    }
  }, [username, page, hasMore]);

  const resetAndFetch = useCallback(() => {
    setPage(1);
    setRepos([]);
    setHasMore(true);
    fetchRepositories();
  }, [fetchRepositories]);

  return {
    repos,
    isLoading,
    hasMore,
    loadMore: () => {
      if (!isFetching.current) {
        setPage((prev) => prev + 1);
      }
    },
    resetAndFetch,
  };
};
