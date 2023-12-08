import { useState, useEffect } from "react";
import axios from "axios";

const ConfirmUser = () => {

    const [clientUsername,setClientUsername] = useState(sessionStorage.getItem('username'));
    const [clientToken,setClientToken] = useState(sessionStorage.getItem('token'));
    const [responseUsername,setResponseUsername] = useState(null);

    const[usernamesMatch,setUsernamesMatch] = useState(false);

    const config = {headers:{ Authorization: 'Bearer ' + clientToken}};


    const updateUsernamesMatch = () => {
        if (clientUsername === responseUsername){
            setUsernamesMatch(true);
        } else{
            setUsernamesMatch(false);
        }
    }

    useEffect(() => {
        updateUsernamesMatch();
    }, [clientUsername,responseUsername]);

    useEffect(() => {
        axios.get('http://localhost:3001/users/private2', config)
        .then(resp => {
            setResponseUsername(resp.data.username);
        })
        .catch(err => console.log(err.response.data))

    }, [clientUsername,clientToken]);

    return usernamesMatch;

}
 
export default ConfirmUser;



{/* <div>
<ul>
    <li>client username {clientUsername}</li>
    <li>client token {clientToken}</li>
    <li>response username {responseUsername}</li>
    <li>usernamesMatch {usernamesMatch.toString()}</li>
</ul>
</div> */}