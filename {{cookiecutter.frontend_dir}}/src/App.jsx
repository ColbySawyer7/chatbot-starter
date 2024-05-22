import { useEffect } from 'react';
import CragChat from './components/DeepChat';
import Instructions from './components/Instructions';
import Title from './components/Title';

const App = () => {
  return (
    <div className="">
    {/* Title Component Centered */}
    <div className="w-full flex justify-center">
      <Title />
    </div>
    {/* Adjusted Grid Layout Below Title */}
    <div className="w-full max-w-7xl grid grid-cols-3 gap-0">
      {/* Top Left: Instructions justified to the right */}
      {/* Adjust the column span to reduce the width and provide more space for the chat window */}
      <div className="col-span-1 absolute justify-end items-start instructions">
        <Instructions />
      </div>
      
      {/* Right: CragChat occupying 2 columns to utilize the additional space */}
      <div className="absolute chat">
        <CragChat />
      </div>
    </div>
    <div className='footer justify-start'>
    </div>
  </div>
  );
}

export default App;
