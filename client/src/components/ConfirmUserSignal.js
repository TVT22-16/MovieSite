import { effect, signal } from "@preact/signals-react";
import axios from "axios";

export const clientToken = signal(getSessionToken());
export const clientUsername = signal(getClientUsername());
export const serverUsername = signal('');

export const clientServerMatch = signal(true);
// export const loggedIn = signal(false);

const baseUrl = 'http://localhost:3001'


const handleLogout = () => {
    // console.log('Confirm user handlelogout')
    // Clear authentication-related information
    window.location.href = '/login';
    sessionStorage.clear();
    alert('Ähäkutti');
};

export function forceLogout() {
    console.log('Forcelogout', getClientUsername(), ' ', forceUpdateMatch());
  
    setTimeout(() => {
      if (getClientUsername().length > 0 && forceUpdateMatch() === false) {
        handleLogout();
      }
    }, 2500);
  }

function getSessionToken(){
    // console.log('getSessionToken()');
    const t = sessionStorage.getItem('token');
    return t===null || t==='null' ? '' : t;
}

function getClientUsername(){
    // console.log('getClientUsername()');
    const username = sessionStorage.getItem('username');
    return username===null || username==='null' ? '':username;
}

export function forceUpdateMatch() {
    getClientUsername();
    console.log(clientUsername.value);
    console.log('forceUpdateMatch: ',clientUsername.value === serverUsername.value && clientUsername.value.length > 0);
    return getClientUsername() === serverUsername.value && getClientUsername().length > 0;
}


effect(() =>{
    // console.log('getServerUsername-effect');
    const config = {headers:{ Authorization: 'Bearer ' + clientToken}};
    axios.get(`${baseUrl}/users/private2`, config)
    .then(resp => {
        serverUsername.value = resp.data.username;
    })
    .catch(err => console.log(err.response.data))
})




