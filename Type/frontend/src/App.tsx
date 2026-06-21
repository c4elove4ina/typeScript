import React, { useState } from "react";
import axios from "axios";
import {
  signApi,
  checkApi,
  createApi,
  petApi,
  colorsApi,
} from "./api";
import ResponseBox from "./components/ResponseBox";
import {
  SignResponse,
  CheckResponse,
  CreateResponse,
  PetResponse,
  ColorsResponse,
} from "./types";
import "./App.css";

// ─── утилита для извлечения сообщения об ошибке ──────────────────────────────
const getErrorMessage = (err: unknown): string => {
  if (axios.isAxiosError(err) && err.response?.data?.error) {
    return err.response.data.error as string;
  }
  if (err instanceof Error) return err.message;
  return "Неизвестная ошибка";
};

// ─── Компонент ────────────────────────────────────────────────────────────────
const App: React.FC = () => {
  // /sign
  const [signName, setSignName] = useState<string>("");
  const [signResult, setSignResult] = useState<SignResponse | null>(null);
  const [signError, setSignError] = useState<string | null>(null);

  // /check
  const [checkName, setCheckName] = useState<string>("");
  const [checkResult, setCheckResult] = useState<CheckResponse | null>(null);
  const [checkError, setCheckError] = useState<string | null>(null);

  // /create
  const [createFirst, setCreateFirst] = useState<string>("");
  const [createLast, setCreateLast] = useState<string>("");
  const [createResult, setCreateResult] = useState<CreateResponse | null>(null);
  const [createError, setCreateError] = useState<string | null>(null);

  // /pet
  const [petId, setPetId] = useState<string>("");
  const [petName, setPetName] = useState<string>("");
  const [petResult, setPetResult] = useState<PetResponse | null>(null);
  const [petError, setPetError] = useState<string | null>(null);

  // /colors
  const [colorsId, setColorsId] = useState<string>("");
  const [colorsInput, setColorsInput] = useState<string>("");
  const [colorsResult, setColorsResult] = useState<ColorsResponse | null>(null);
  const [colorsError, setColorsError] = useState<string | null>(null);

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleSign = async (): Promise<void> => {
    setSignResult(null);
    setSignError(null);
    try {
      const res = await signApi({ firstName: signName });
      setSignResult(res.data);
    } catch (err) {
      setSignError(getErrorMessage(err));
    }
  };

  const handleCheck = async (): Promise<void> => {
    setCheckResult(null);
    setCheckError(null);
    try {
      const res = await checkApi({ firstName: checkName });
      setCheckResult(res.data);
    } catch (err) {
      setCheckError(getErrorMessage(err));
    }
  };

  const handleCreate = async (): Promise<void> => {
    setCreateResult(null);
    setCreateError(null);
    try {
      const res = await createApi({ firstName: createFirst, lastName: createLast });
      setCreateResult(res.data);
    } catch (err) {
      setCreateError(getErrorMessage(err));
    }
  };

  const handlePet = async (): Promise<void> => {
    setPetResult(null);
    setPetError(null);
    try {
      const res = await petApi({ id: Number(petId), pet: petName });
      setPetResult(res.data);
    } catch (err) {
      setPetError(getErrorMessage(err));
    }
  };

  const handleColors = async (): Promise<void> => {
    setColorsResult(null);
    setColorsError(null);
    try {
      const colorList = colorsInput
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean);
      const res = await colorsApi({ id: Number(colorsId), colors: colorList });
      setColorsResult(res.data);
    } catch (err) {
      setColorsError(getErrorMessage(err));
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="app">
      <header className="hero">
       <div className="hero-content">
         <span className="badge">REST API PLATFORM</span>

          <h1>
           PERSONA
          </h1>

          <p>
           Управление пользователями, питомцами и цветами
           через современный TypeScript REST API.
          </p>
        </div>
      </header>

      <main className="grid">

        {/* /sign */}
        <section className="card">
          <div className="card-label">POST /sign</div>
          <h2>Регистрация имени</h2>
          <p className="desc">Сохраняет имя в массив и возвращает порядковый номер (id).</p>
          <div className="field-group">
            <input
              className="input"
              placeholder="Имя"
              value={signName}
              onChange={(e) => setSignName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSign()}
            />
          </div>
          <button className="btn" onClick={handleSign}>Отправить</button>
          <ResponseBox title="/sign ответ" data={signResult} error={signError} />
        </section>

        {/* /check */}
        <section className="card">
          <div className="card-label">POST /check</div>
          <h2>Проверка имени</h2>
          <p className="desc">Ищет имя в массиве и возвращает его объект и номер.</p>
          <div className="field-group">
            <input
              className="input"
              placeholder="Имя"
              value={checkName}
              onChange={(e) => setCheckName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCheck()}
            />
          </div>
          <button className="btn" onClick={handleCheck}>Отправить</button>
          <ResponseBox title="/check ответ" data={checkResult} error={checkError} />
        </section>

        {/* /create */}
        <section className="card">
          <div className="card-label">POST /create</div>
          <h2>Добавить фамилию</h2>
          <p className="desc">Если имя есть — добавляет фамилию. Иначе создаёт нового пользователя.</p>
          <div className="field-group">
            <input
              className="input"
              placeholder="Имя"
              value={createFirst}
              onChange={(e) => setCreateFirst(e.target.value)}
            />
            <input
              className="input"
              placeholder="Фамилия"
              value={createLast}
              onChange={(e) => setCreateLast(e.target.value)}
            />
          </div>
          <button className="btn" onClick={handleCreate}>Отправить</button>
          <ResponseBox title="/create ответ" data={createResult} error={createError} />
        </section>

        {/* /pet */}
        <section className="card">
          <div className="card-label">POST /pet</div>
          <h2>Добавить питомца</h2>
          <p className="desc">Добавляет питомца в массив пользователя по его id.</p>
          <div className="field-group">
            <input
              className="input"
              placeholder="ID пользователя"
              type="number"
              value={petId}
              onChange={(e) => setPetId(e.target.value)}
            />
            <input
              className="input"
              placeholder="Кличка питомца"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
            />
          </div>
          <button className="btn" onClick={handlePet}>Отправить</button>
          <ResponseBox title="/pet ответ" data={petResult} error={petError} />
        </section>

        {/* /colors */}
        <section className="card">
          <div className="card-label">POST /colors</div>
          <h2>Добавить цвета</h2>
          <p className="desc">Добавляет цвета через запятую в массив пользователя по id.</p>
          <div className="field-group">
            <input
              className="input"
              placeholder="ID пользователя"
              type="number"
              value={colorsId}
              onChange={(e) => setColorsId(e.target.value)}
            />
            <input
              className="input"
              placeholder="Цвета через запятую (red, blue)"
              value={colorsInput}
              onChange={(e) => setColorsInput(e.target.value)}
            />
          </div>
          <button className="btn" onClick={handleColors}>Отправить</button>
          <ResponseBox title="/colors ответ" data={colorsResult} error={colorsError} />
        </section>

      </main>
    </div>
  );
};

export default App;
