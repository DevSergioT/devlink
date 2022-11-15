import { useState } from 'react';
import './login.css'
import { Logo } from '../../Components/Logo'
import { auth } from '../../Services/firebaseConnection';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { Input } from '../../Components/Input';

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleLogin(e) {

    e.preventDefault();

    if (email === '' || password === '') {
      alert('É obrigatório preencher todos os campos.')
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success('Legal você por aqui novamente!')
        navigate('/admin', { replace: true })
      })
      .catch(() => {
        toast.error('Algo deu errado tente outra vez.')
      })
  }

  return (

    <div className='login-container'>
      <Logo />
      <form className='form' onSubmit={handleLogin}>
        <Input
          type="email"
          placeholder='Digite seu e-mail ...'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder='*******'
          autoComplete='on'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>Entrar</button>
      </form>
    </div>
  )
}