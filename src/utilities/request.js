import axios from 'axios'

const BASE_URL = {
    development: '', // API server url (Development)
    production: '', // API server url (Production)
    local: '', // API server url (local machine)
};

const environment = 'development';

const request = axios.create({
    baseURL: BASE_URL[environment], // Live API

    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        "Content-Type": "application/json"
    },
});

export default request

//this is create for ant api connection