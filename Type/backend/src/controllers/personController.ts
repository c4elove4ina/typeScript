import { Request, Response } from "express";
import { people } from "../store";
import {
  SignBody,
  CheckBody,
  CreateBody,
  PetBody,
  ColorsBody,
  SignResponse,
  CheckResponse,
  CreateResponse,
  PetResponse,
  ColorsResponse,
  ErrorResponse,
} from "../types";

// POST /sign — регистрируем имя, возвращаем порядковый номер
export const sign = (
  req: Request<{}, SignResponse | ErrorResponse, SignBody>,
  res: Response<SignResponse | ErrorResponse>
): void => {
  const { firstName } = req.body;

  if (!firstName || typeof firstName !== "string" || !firstName.trim()) {
    res.status(400).json({ error: "Поле firstName обязательно" });
    return;
  }

  const name = firstName.trim();

  // Имя должно быть уникальным
  const exists = people.some((p) => p.firstName === name);
  if (exists) {
    res.status(409).json({ error: `Имя "${name}" уже занято` });
    return;
  }

  const id = people.length + 1;
  people.push({ id, firstName: name, pets: [], colors: [] });

  res.status(201).json({ message: "Имя зарегистрировано", id });
};

// POST /check — проверяем, есть ли имя, возвращаем его номер и объект
export const check = (
  req: Request<{}, CheckResponse | ErrorResponse, CheckBody>,
  res: Response<CheckResponse | ErrorResponse>
): void => {
  const { firstName } = req.body;

  if (!firstName || typeof firstName !== "string" || !firstName.trim()) {
    res.status(400).json({ error: "Поле firstName обязательно" });
    return;
  }

  const name = firstName.trim();
  const person = people.find((p) => p.firstName === name);

  if (!person) {
    res.status(404).json({ error: `Имя "${name}" не найдено` });
    return;
  }

  res.json({ message: "Найдено", id: person.id, person });
};

// POST /create — добавляем фамилию (или создаём нового)
export const create = (
  req: Request<{}, CreateResponse | ErrorResponse, CreateBody>,
  res: Response<CreateResponse | ErrorResponse>
): void => {
  const { firstName, lastName } = req.body;

  if (!firstName || typeof firstName !== "string" || !firstName.trim()) {
    res.status(400).json({ error: "Поле firstName обязательно" });
    return;
  }
  if (!lastName || typeof lastName !== "string" || !lastName.trim()) {
    res.status(400).json({ error: "Поле lastName обязательно" });
    return;
  }

  const fName = firstName.trim();
  const lName = lastName.trim();

  const existing = people.find((p) => p.firstName === fName);

  if (existing) {
    existing.lastName = lName;
    res.json({ message: "Фамилия обновлена", person: existing });
  } else {
    const id = people.length + 1;
    const newPerson = { id, firstName: fName, lastName: lName, pets: [], colors: [] };
    people.push(newPerson);
    res.status(201).json({ message: "Создан новый пользователь", person: newPerson });
  }
};

// POST /pet — добавляем питомца по ID
export const pet = (
  req: Request<{}, PetResponse | ErrorResponse, PetBody>,
  res: Response<PetResponse | ErrorResponse>
): void => {
  const { id, pet: petName } = req.body;

  if (typeof id !== "number") {
    res.status(400).json({ error: "Поле id должно быть числом" });
    return;
  }
  if (!petName || typeof petName !== "string" || !petName.trim()) {
    res.status(400).json({ error: "Поле pet обязательно" });
    return;
  }

  const person = people.find((p) => p.id === id);
  if (!person) {
    res.status(404).json({ error: `Пользователь с id ${id} не найден` });
    return;
  }

  person.pets.push(petName.trim());
  res.json({ message: "Питомец добавлен", person });
};

// POST /colors — добавляем цвета по ID
export const colors = (
  req: Request<{}, ColorsResponse | ErrorResponse, ColorsBody>,
  res: Response<ColorsResponse | ErrorResponse>
): void => {
  const { id, colors: colorList } = req.body;

  if (typeof id !== "number") {
    res.status(400).json({ error: "Поле id должно быть числом" });
    return;
  }
  if (!Array.isArray(colorList) || colorList.length === 0) {
    res.status(400).json({ error: "Поле colors должно быть непустым массивом" });
    return;
  }
  if (!colorList.every((c) => typeof c === "string" && c.trim())) {
    res.status(400).json({ error: "Все цвета должны быть непустыми строками" });
    return;
  }

  const person = people.find((p) => p.id === id);
  if (!person) {
    res.status(404).json({ error: `Пользователь с id ${id} не найден` });
    return;
  }

  person.colors.push(...colorList.map((c) => c.trim()));
  res.json({ message: "Цвета добавлены", person });
};
