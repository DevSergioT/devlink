import './header.css'
import { BiLogOut } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { auth } from '../../Services/firebaseConnection'
import { signOut } from 'firebase/auth'




export function Header() {

  async function handleLogout() {
    await signOut(auth)
  }

  return (
    <header className='admin-header'>
      <nav className='nav-header'>
        <button onClick={handleLogout}>
          <BiLogOut size={28} color="#ff0d0d" />
        </button>

        <Link to='/admin'>
          Links
        </Link>

        <Link to='/admin/social'>
          Redes Sociais
        </Link>
      </nav>
    </header>
  )
}