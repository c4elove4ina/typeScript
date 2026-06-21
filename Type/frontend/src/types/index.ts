// Сущность Person (зеркало бэкенда)
export interface Person {
  id: number;
  firstName: string;
  lastName?: string;
  pets: string[];
  colors: string[];
}

// Типы ответов от сервера
export interface SignResponse {
  message: string;
  id: number;
}

export interface CheckResponse {
  message: string;
  id: number;
  person: Person;
}

export interface CreateResponse {
  message: string;
  person: Person;
}

export interface PetResponse {
  message: string;
  person: Person;
}

export interface ColorsResponse {
  message: string;
  person: Person;
}

export interface ErrorResponse {
  error: string;
}

// Тело запросов
export interface SignBody {
  firstName: string;
}

export interface CheckBody {
  firstName: string;
}

export interface CreateBody {
  firstName: string;
  lastName: string;
}

export interface PetBody {
  id: number;
  pet: string;
}

export interface ColorsBody {
  id: number;
  colors: string[];
}
