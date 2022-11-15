import { useEffect, useState } from 'react'
import './networks.css'
import { Header } from '../../Components/Header'
import { Input } from '../../Components/Input'
import { MdAddLink } from 'react-icons/md'
import { db } from '../../Services/firebaseConnection'
import { setDoc, doc, getDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'


export default function Networks() {

  const [facebook, setFacebook] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [instagram, setInstagram] = useState('');
  const [github, setGitHub] = useState("");

  useEffect(() => {

    function loadLinks() {
      const docRef = doc(db, "social", "link")
      getDoc(docRef)
        .then((snapshot) => {

          if (snapshot.data() !== undefined) {
            setFacebook(snapshot.data().facebook)
            setInstagram(snapshot.data().instagram)
            setLinkedin(snapshot.data().linkedin)
            setGitHub(snapshot.data().github)
          }
        })
    }

    loadLinks();

  }, [])


  async function handleSave(e) {
    e.preventDefault();

    setDoc(doc(db, "social", "link"), {
      facebook: facebook,
      instagram: instagram,
      linkedin: linkedin,
      github: github,
    })
      .then(() => {
        console.log('Urls salvas com sucesso')
        toast.success("Seu link foi salvo com sucwsso")
      })
      .catch((error) => {
        console.log('Erro ao salvar' + error)
        toast.error("Algo deu errado tente outra vez")
      })
  }


  return (
    <div className='admin-container'>
      <Header />
      <h1 className='title-social'> Suas redes sociais</h1>

      <form className='form' onSubmit={handleSave}>

        <label className='label'>Link do GitHub</label>
        <Input
          placeholder='Digite a url da rede social...'
          value={github}
          onChange={(e) => setGitHub(e.target.value)}
        />

        <label className='label'>Link do Facebook</label>
        <Input
          placeholder='Digite a url da rede social...'
          value={facebook}
          onChange={(e) => setFacebook(e.target.value)}
        />

        <label className='label'>Link do Instagram</label>
        <Input
          placeholder='Digite a url da rede social...'
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />

        <label className='label'>Link do Linkedin</label>
        <Input
          placeholder='Digite a url da rede social...'
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
        />

        <button type='submit' className='btn-register'>
          Salvar Link  <MdAddLink size={32} color='#fff' />
        </button>

      </form>
    </div>
  )
}