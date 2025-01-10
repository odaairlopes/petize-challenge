import {
  IRepositoriesData,
  IUserData,
  RepositoriesDataSchema,
  UserDataSchema,
} from "../types/types";
import api from "./api";

export const fetchUser = async (username: string): Promise<IUserData> => {
  try {
    const response = await api.get(`${username}`);
    return UserDataSchema.parse(response.data);
  } catch (error) {
    throw new Error("Erro ao buscar o usuário.");
  }
};

export const fetchRepositories = async (
  username: string
): Promise<IRepositoriesData[]> => {
  try {
    const response = await api.get(`${username}/repos`);
    return response.data.map((repo: unknown) =>
      RepositoriesDataSchema.parse(repo)
    );
  } catch (error) {
    throw new Error("Erro ao buscar repositórios.");
  }
};
