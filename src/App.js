import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './Router/Router/Route';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className=' '>
      <RouterProvider router={router}/>
      <Toaster />
    </div>
  );
}

export default App;
