import axios from 'axios';

const registroUsuariosApi = axios.create({
    baseURL: "https://spc-backend-fork.onrender.com/cursos/cursos/v1/cursos/",
});

export const getAllCursos = () => registroUsuariosApi.get("/");


