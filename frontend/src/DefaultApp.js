import { useSelector } from 'react-redux';
import AuthRouter from './routes/AuthRouter';
import AppRouter from './routes/AppRouter';

function DefaultApp() {

  const auth = useSelector(state=> state.auth.current);
  
  if(!auth.user){
    return <AuthRouter />
  }

  return (
      <AppRouter />
  )
}

export default DefaultApp