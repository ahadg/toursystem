import axios from 'axios';

const setAuthToken  = token => {
    if(token)
    {
        axios.defaults.headers.common['the-x-token'] = token;
    }
    else {
        delete axios.defaults.headers.common['the-x-token'];
    }
};
export default setAuthToken; 