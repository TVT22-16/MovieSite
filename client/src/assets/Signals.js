import { effect, signal } from "@preact/signals-react";
import axios from "axios";
import baseUrl from "../components/baseUrl";

export const jwtToken = signal(getSessionToken());
export const userData = signal(null);
export const usernameSignal = signal('');

function getSessionToken(){
    const t = sessionStorage.getItem('token');
    return t===null || t==='null' ? '' : t;
}

effect(()=>{
    sessionStorage.setItem('token', jwtToken.value);

    if(jwtToken.value.length > 0){
        const config = {headers:{ Authorization: 'Bearer ' + jwtToken.value }};
        axios.get(`${baseUrl}/users/private`, config)
            .then(resp => {userData.value = resp.data})
            .catch(err => console.log(err.response.data))
    }
});

