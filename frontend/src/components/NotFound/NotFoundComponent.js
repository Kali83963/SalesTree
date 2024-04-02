import { useNavigate } from 'react-router-dom';


export default function NotFoundComponent({ entity = '' }) {


  const navigate = useNavigate();

  return (
    <div>
      <h1>Error 404</h1>
      <p>Sorry, the page you requested does not exist.</p>
      <button
        type="button"
        onClick={() => {
          navigate('/');
        }}
      >
        Back
      </button>
    </div>
  );  
}