import axios from 'axios';

const api = axios.create({
	baseURL: 'http://splitey.local/',
});

export default api;
