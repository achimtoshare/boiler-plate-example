import { Axios } from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../_actions/user_action';
function LoginPage(props) {
    const dispatch = useDispatch();
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const  onEmailHandler = (event) =>{
        setEmail(event.currentTarget.value)
    }
    const onPasswordHandler = (event) =>{
        setPassword(event.currentTarget.value)
    }
    const onSubmitHandler = (event) =>{
        event.preventDefault();

        console.log('Email',Email)
        console.log('Password',Password)
        let body = {
            email:Email,
            password:Password
        }

        dispatch(loginUser(body))
        .then(response =>{
            if(response.payload.loginSuccess){
                props.history.push('/')
            }else{
                alert('Error');
            }
        })
        
    }


    return (
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',
        width:'100%',height:'100vh'}}>
            <form style={{display:'flex',flexDirection:'column'}}
                   onSubmit={onSubmitHandler}> 
                <lable>Email</lable>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <lable>Email</lable>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <br/>
                <button>Login</button>

            </form>
        </div>
    )
}

export default LoginPage