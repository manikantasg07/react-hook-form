import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Youtubeform } from './components/Youtubeform';
import { Customform } from './components/Customform';
import { ToastContainer } from 'react-toastify';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Youtubeform />
      <Customform />
      <ToastContainer />
    </>
  );
}

export default App;
