import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-my-burger-arif.firebaseio.com/'
});

export default instance;