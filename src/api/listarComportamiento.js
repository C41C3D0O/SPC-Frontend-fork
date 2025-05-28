import axios from 'axios';

const registroUsuariosApi = axios.create({
    baseURL: "https://spc-backend-fork.onrender.com/cursos/cursos/v1/comportamiento/",
});

export const getAllComportamiento = () => registroUsuariosApi.get("/");


