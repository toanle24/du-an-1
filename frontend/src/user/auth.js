import { API } from '../config';

export const signUp = (user) => {
    return fetch(`${API}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}
export const signIn = (user) => {
    return fetch(`${API}/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}

export const signout = (next) =>{
    if(typeof window !="undefined"){
        localStorage.removeItem('user');
        next();
        return fetch(`${API}/signout`,{
            method: "GET",
            headers:{
                "Content-type":  "application/json"
            }
        })
            .then(response => response.json())
            .catch(error => console.log(error))
    }
}

export const authenticate = (data, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(data))
        next();
    }
}

export const isAuthenticate = () => {
    if(typeof window =='undefined'){
        return false
    }
    if(localStorage.getItem('user')){
        return JSON.parse(localStorage.getItem('user'))
    }else{
        return false
    }
} 