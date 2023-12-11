import { effect, signal } from "@preact/signals-react";
import axios from "axios";

export const clientToken = signal(getSessionToken());
export const clientUsername = signal(getClientUsername());
export const serverUsername = signal('');

export const clientServerMatch = signal(true);
// export const loggedIn = signal(false);

const baseUrl = 'http://localhost:3001'


function getSessionToken(){
    console.log('getSessionToken()');
    const t = sessionStorage.getItem('token');
    return t===null || t==='null' ? '' : t;
}

function getClientUsername(){
    console.log('getClientUsername()');
    const username = sessionStorage.getItem('username');
    return username===null || username==='null' ? '':username;
}

export function forceUpdateMatch() {
    getClientUsername();
    console.log(clientUsername.value);
    console.log('forceUpdateMatch: ',clientUsername.value === serverUsername.value && clientUsername.value.length > 0);
    return clientUsername.value === serverUsername.value && clientUsername.value.length > 0;
}

effect(() =>{
    console.log('getServerUsername-effect');
    const config = {headers:{ Authorization: 'Bearer ' + clientToken}};
    axios.get(`${baseUrl}/users/private2`, config)
    .then(resp => {
        serverUsername.value = resp.data.username;
    })
    .catch(err => console.log(err.response.data))
})

// effect(()=>{
//     //check if name on sessionStorage and name returned from backend matches while sessiostorage name.lenght>0
//     clientUsername.value===serverUsername.value && clientUsername.value.length>0 ? clientServerMatch.value = true: clientServerMatch.value=false
//     console.log('DoNamesMatch-Effect: ',clientServerMatch.value);
// })




