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

const Delete = (id,setErrorMessage,personName,setClassName) =>{
    return axios.delete(`${baseUrl}/${id}`)
            .then(response=>{return response.status})
            .catch(error => {
                setErrorMessage(`Ìnformation of ${personName} has already been removed`)
                setClassName('error')
                setTimeout(() => {
                    setErrorMessage(null)
                  }, 5000)
            });
}

const updatePerson = (id, newObject) =>{
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
  }     

export default {getAll, create,Delete,updatePerson}