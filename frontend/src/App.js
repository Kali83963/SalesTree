import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { Suspense } from 'react';
import PageLoader from './components/PageLoader/PageLoader';
import DefaultApp from './DefaultApp';


function App() {


  return (
    <Suspense fallback={<PageLoader /> }>
      <DefaultApp />
    </Suspense>
  );
}


export default App;
