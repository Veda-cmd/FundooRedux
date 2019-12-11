import axios from 'axios';

const baseUrl = 'http://localhost:5000';

export function register(request,callback)
{
    axios.post(baseUrl+'/register',request).then(response=>
    {
        return callback(null,response);
    })
    .catch(error=>
    {
        return callback(error);
    })
}

export function login(request,callback)
{
    axios.post(baseUrl+'/login',request).then(response=>
    {
        return callback(null,response);
    })
    .catch(error=>
    {
        return callback(error);
    })
}

export function forgot(request,callback)
{
    axios.post(baseUrl+'/forgot',request).then(response=>
    {
        return callback(null,response);
    })
    .catch(error=>
    {
        return callback(error);
    })
}

export function verify(request,callback)
{
    axios.post(baseUrl+'/verify',null,{params:{url:request}}).then(response=>
    {
        return callback(null,response);
    })
    .catch(error=>
    {
        return callback(error);
    })
}

export function reset(request,callback)
{
    axios.post(baseUrl+'/reset',request,{headers:{token:request.token}}).then(response=>
    {
        return callback(null,response);
    })
    .catch(error=>
    {
        return callback(error);
    });
}

export function createNote(request,callback)
{
    axios.post(baseUrl+'/note/addNote',request,{headers:{token:sessionStorage.getItem('token')}})
    .then(response=>
    {
        return callback(null,response);
    })
    .catch(error=>
    {
        return callback(error);
    });
}

export function getNotes(callback)
{
    axios.get(baseUrl+'/note/getAllNotes',{headers:{token:sessionStorage.getItem('token')}})
    .then(response=>
    {
        return callback(null,response);
    })
    .catch(error=>
    {
        return callback(error);
    });
}

export function getAllLabels(callback)
{
    axios.get(baseUrl+'/label/getAllLabels',{headers:{token:sessionStorage.getItem('token')}})
    .then(response=>
    {
        return callback(null,response);
    })
    .catch(error=>
    {
        return callback(error);
    });
}

export function updateNote(request)
{
    let response = axios.post(baseUrl+'/note/updateNote',request,{headers:{token:sessionStorage.getItem('token')}})

    return response;
}

export function deleteNote(request)
{
    let response = axios.post(baseUrl+'/note/deleteNote',request,{headers:{token:sessionStorage.getItem('token')}})

    return response;
}

export function deleteNoteForever(request)
{
    let response = axios.post(baseUrl+'/note/forever',request,{headers:{token:sessionStorage.getItem('token')}})

    return response;
}

export function addLabelToNote(request)
{
    let response = axios.post(baseUrl+'/note/addLabel',request,{headers:{token:sessionStorage.getItem('token')}})

    return response;
}

export function deleteLabelFromNote(request)
{
    let response = axios.post(baseUrl+'/note/deleteLabel',request,{headers:{token:sessionStorage.getItem('token')}})

    return response;
}

export function getListings(request)
{
    let response = axios.get(baseUrl+'/note/getListings?'+request,{headers:{token:sessionStorage.getItem('token')}})

    return response;
}

export function addLabel(request)
{
    let response = axios.post(baseUrl+'/label/add',request,{headers:{token:sessionStorage.getItem('token')}})

    return response;
}

export function deleteLabel(request)
{
    console.log(request);
    
    let response = axios.post(baseUrl+'/label/delete',request,{headers:{token:sessionStorage.getItem('token')}})

    return response;
}

export function updateLabel(request)
{
    let response = axios.post(baseUrl+'/label/update',request,{headers:{token:sessionStorage.getItem('token')}})

    return response;
}

export function search(request)
{
    let response = axios.post(baseUrl+'/note/searchNote',request,{headers:{token:sessionStorage.getItem('token')}})

    return response;
}

export const isLogin = () => {
    if (sessionStorage.getItem('token')) {
        return true;
    }
    return false;
}