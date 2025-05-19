import axios from 'axios';

const registroUsuariosApi = axios.create({
    baseURL: "http://localhost:8000/cursos/cursos/v1/comportamiento/",
});

export const getAllComportamiento = () => registroUsuariosApi.get("/");


