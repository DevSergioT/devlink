import './style.css'
import logoimg from '../../imglogo/logoimg.png'


export const Logoimg = () => {
  return (
    <div className='logo-home'>
      <img className='logoimg' src={logoimg} alt='logo sergiodev' />
    </div>
  )
}