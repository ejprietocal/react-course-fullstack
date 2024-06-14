import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () =>{
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject =>{
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const Delete = (id) =>{
    return axios.delete(`${baseUrl}/${id}`)
            .then(response=>{return response.status})
            .catch(error => {
                console.error('Error deleting person:', error);
                throw error; // Propaga el error para que sea manejado fuera de la función
            });
}

export default {getAll, create,Delete}