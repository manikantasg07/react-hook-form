import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

let renderCount = 0;
async function getUserDetails() {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/users/1'
  );
  return response.data;
}

export const Customform = () => {
  // console.log('Rendering');
  // const [formdata, setFormdata] = useState({
  //   username: '',
  //   email: '',
  //   password: '',
  // });
  const usernameRef = useRef('');
  const emailRef = useRef('');
  const channelRef = useRef('');
  const { register, control } = useForm();
  useEffect(() => {
    getUserDetails()
      .then((data) => {
        usernameRef.current.value = data.username;
        emailRef.current.value = data.email;
        channelRef.current.value = data.website;
      })
      .catch((error) => {
        console.log('Error: ', error);
      });
  }, []);
  function submit(event) {
    event.preventDefault();
    let data = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      channel: channelRef.current.value,
    };
    console.log(data);
    if (!data.username || !data.email || !data.channel) {
      toast.error('Required fileds missing');
    }
  }
  renderCount++;
  return (
    <div>
      <h4>Custom form render count {renderCount / 2}</h4>
      <form onSubmit={submit}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" ref={usernameRef} />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" ref={emailRef} />

        <label htmlFor="password">Channel</label>
        <input type="text" id="channel" name="channel" ref={channelRef} />

        <button>Submit</button>
      </form>
    </div>
  );
};
