import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://footballgame-1f2b4.firebaseio.com/'
});

export default instance;
