'use client';
import React, { useState } from 'react'
import { Input } from '../primitives/input'
import { Button } from '../primitives/button'
import * as Dialog from '@radix-ui/react-dialog';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from "firebase/auth";



const Login: React.FC = () => {
  let [error, setError] = useState({message: "", color: "red", type: 1})
  let [login, setLogin] = useState({
    email: {
      valid: true,
      text: ""
    },
    password: ""
  }, )
  let [signUp, setSignUp] = useState({
    email: {
      valid: true,
      text: ""
    },
    name: "",
    password1: "",
    password2: ""
  })

  return (
    <>
     <Dialog.Root>
    <Dialog.Trigger asChild>
    <button className='hidden' id="login-form-button"></button>
    </Dialog.Trigger>
    <Dialog.Portal>
    <Dialog.Overlay className="DialogOverlay" />
    <Dialog.Content className="DialogContent">
    <Dialog.Title className="DialogTitle" style={{textAlign: "center", width: "100%"}}>Login / Sign Up Form</Dialog.Title>
    <br></br>
        <p style={{textAlign: "center"}}>Login</p>
        <br></br>
        <div className='grid place-items-center'>  
          <Input placeholder='Email...'  onChange={e => {
             let valid = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(e.target.value)
             setLogin({
              ...login,
              email: {
                valid,
                text: e.target.value
              }
            })
          }}></Input>
          {!login.email.valid ? <p style={{color: "red", textAlign: "left", width: "100%"}}>Not a valid email!</p> : ""}
          <br></br>
          <Input placeholder='Password...' type="password" onChange={e => {
            setLogin({
              ...login,
              password: e.target.value
            })
          }}></Input>
          {error.message && error.type == 1 ? <p style={{color: error.color}}>{error.message}</p> : ""}
          <br></br>
          <Button variant='secondary' disabled={!login.email.text || !login.email.valid || !login.password} onClick={async () => {
            setError({color: "blue", message: "Loading...", type: 1})
            try {
              const auth = getAuth();
              await signInWithEmailAndPassword(auth, login.email.text, login.password);
              setError({color: "green", message: "Successfully logged in!", type: 1});
            } catch (err) {
              setError({color: "red", message: err.message, type: 1});
            }
          }}>Submit</Button>
        </div>
        <br></br>
        <br></br>
        <p style={{textAlign: "center"}}>Sign up</p>
        <br></br>
        <div className='grid place-items-center'>
          <Input placeholder='Email...' onChange={e => {
            let valid = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(e.target.value)
            setSignUp({
              ...signUp,
              email: {
                valid,
                text: e.target.value
              }
            })
          }}></Input>
          {!signUp.email.valid ? <p style={{color: "red", textAlign: "left", width: "100%"}}>Not a valid email!</p> : ""}
          <br></br>
          <Input placeholder='Name...' onChange={e => {
            setSignUp({
              ...signUp,
              name: e.target.value
            })
          }}></Input>
          <br></br>
          <Input placeholder='Password...' type="password" onChange={e => {
            setSignUp({
              ...signUp,
              password1: e.target.value
            })
          }}></Input>
          <br></br>
          <Input placeholder='Repeat Password...' type="password" onChange={e => [
            setSignUp({
              ...signUp,
              password2: e.target.value
            })
          ]}></Input>
          {signUp.password2 && signUp.password2 != signUp.password1 ? <p style={{color: "red"}}>Passwords do not match!</p> : ""}
          {error.message && error.type == 2 ? <p style={{color: error.color}}>{error.message}</p> : ""}
          <br></br>
          <Button variant='secondary' disabled={!signUp.email.text || !signUp.email.valid || !signUp.name || !signUp.password1 || signUp.password1 != signUp.password2} onClick={async () => {
            setError({color: "blue", message: "Loading...", type: 2})
            try {
              const auth = getAuth();
              const userCredential = await createUserWithEmailAndPassword(auth, signUp.email.text, signUp.password1);
              await updateProfile(userCredential.user, {
                displayName: signUp.name
              });
              setError({color: "green", message: "Successfully created account!", type: 2});
            } catch (err) {
              setError({color: "red", message: err.message, type: 2}); 
            }
          }}>Submit</Button>
        </div>
        <br></br>
        <Dialog.Close asChild>
          <div className="grid place-items-center">
          <Button variant="destructive" size="lg" onClick={() => {
            setLogin({
                      email: {
                        valid: true,
                        text: ""
                      },
                      password: ""
                    })
                    setSignUp({
                      email: {
                        valid: true,
                        text: ""
                      },
                      name: "",
                      password1: "",
                      password2: ""
                    })
          }}>Close</Button>
          </div>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
</>
  )
}

export default Login
