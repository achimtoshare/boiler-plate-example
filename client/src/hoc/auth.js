import React from 'react';
import { useEffect } from 'react';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import {auth} from '../_actions/user_action';

export default function(SpecificComponent,option,adminRoute =null){
    //option 1. null => 아무나 출입가능 2.true =>로그인한 유저만 출입 3.false=>로그인한 유저는 출입불가능
    function AuthenticationCheck(props){
        //서버에 req하여 사용자의 상태를 가져옴
        const dispatch = useDispatch();
         useEffect(() => {

            dispatch(auth()).then(response =>{
                console.log(response)

                if(!response.payload.isAuth){
                    if(option){
                        props.history.push('/login');
                    }
                }else{
                    //로그인한 상태
                    if(adminRoute && !response.payload.isAdmin){
                        props.history.push('/');
                    }else{
                        if(!option){
                            props.history.push('/');
                        }
                    }

                }
            })
            
         }, [])

         return (
             <SpecificComponent />
         )
    }
    return AuthenticationCheck
}