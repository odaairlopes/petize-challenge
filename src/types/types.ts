import { z } from "zod";

export const UserDataSchema = z.object({
  name: z.string(),
  avatar_url: z.string(),
  login: z.string(),
  bio: z.string().nullable(),
  followers: z.number(),
  following: z.number(),
  company: z.string().nullable(),
  location: z.string().nullable(),
  email: z.string().nullable(),
  blog: z.string().nullable(),
  twitter_username: z.string().nullable(),
});

export const RepositoriesDataSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  html_url: z.string(),
  stargazers_count: z.number(),
  updated_at: z.string(),
});

export type IUserData = z.infer<typeof UserDataSchema>;
export type IRepositoriesData = z.infer<typeof RepositoriesDataSchema>;
