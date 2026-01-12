import axios from "axios";

const API_URL = "http://localhost:8080/api/slangs";

export const getSlang = async (term) => {
    const response = await axios.get(`${API_URL}/${term}`);
    return response.data;
};

export const getRandomSlang = async () => {
    const response = await axios.get(API_URL);
    const all = response.data;
    return all[Math.floor(Math.random() * all.length)];
};
