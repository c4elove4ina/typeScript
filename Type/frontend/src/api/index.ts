import axios, { AxiosResponse } from "axios";
import {
  SignBody,
  SignResponse,
  CheckBody,
  CheckResponse,
  CreateBody,
  CreateResponse,
  PetBody,
  PetResponse,
  ColorsBody,
  ColorsResponse,
} from "../types";

const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: { "Content-Type": "application/json" },
});

export const signApi = (
  body: SignBody
): Promise<AxiosResponse<SignResponse>> => api.post<SignResponse>("/sign", body);

export const checkApi = (
  body: CheckBody
): Promise<AxiosResponse<CheckResponse>> => api.post<CheckResponse>("/check", body);

export const createApi = (
  body: CreateBody
): Promise<AxiosResponse<CreateResponse>> => api.post<CreateResponse>("/create", body);

export const petApi = (
  body: PetBody
): Promise<AxiosResponse<PetResponse>> => api.post<PetResponse>("/pet", body);

export const colorsApi = (
  body: ColorsBody
): Promise<AxiosResponse<ColorsResponse>> => api.post<ColorsResponse>("/colors", body);
