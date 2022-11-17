import { useState, useEffect } from 'react'
import './admin.css'
import { Header } from '../../Components/Header'
import { Logo } from '../../Components/Logo'
import { Input } from '../../Components/Input'
import { MdAddLink } from 'react-icons/md'
import { FiTrash2 } from 'react-icons/fi'
import { db } from '../../Services/firebaseConnection'
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc,
} from 'firebase/firestore'
import { toast } from 'react-toastify'


export default function Admin() {
  const [nameInput, setNameInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [backgroundColorInput, setBackgroundColorInput] = useState("#827d7d");
  const [textColorInput, setTextColorInput] = useState('#121212');
  const [links, setLinks] = useState([])

  useEffect(() => {
    const linksRef = collection(db, 'links')
    const queryRef = query(linksRef, orderBy('created', 'asc'))
    // eslint-disable-next-line no-unused-vars
    const unsud = onSnapshot(queryRef, (snapshot) => {
      let lista = [];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color
        })
      })

      setLinks(lista);
    })
  }, [])

  async function handleRegister(e) {
    e.preventDefault();

    if (nameInput === '' || urlInput === '') {
      toast.warn('É obrigatório preencher todos os campos.')
      return;
    }

    addDoc(collection(db, "links"), {
      name: nameInput,
      url: urlInput,
      bg: backgroundColorInput,
      color: textColorInput,
      created: new Date(),
    })
      .then(() => {
        setNameInput('')
        setUrlInput('')
        console.log('Link cadastrado com sucesso')
      })
      .catch((error) => {
        console.log('Algo deu errado ao registrar' + error)
        toast.error('Algo deu errado ao salvar o link ')
      })
  }

  async function handleDeleteLink(id) {
    const docRef = doc(db, 'links', id)
    await deleteDoc(docRef)
  }

  return (
    <div className='admin-container'>
      <Header />
      <Logo />

      <form className='form' onSubmit={handleRegister}>
        <label className='label'>Nome do Link</label>
        <Input
          placeholder='Nome do Link...'
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />

        <label className='label'>URL do Link</label>
        <Input
          type='url'
          placeholder='Digite o url do Link...'
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
        />
        <section className='container-colors'>
          <div>
            <label className='label right'>Fundo do link</label>
            <input
              type="color"
              value={backgroundColorInput}
              onChange={(e) => setBackgroundColorInput(e.target.value)}
            />
          </div>

          <div>
            <label className='label right'>Cor do link</label>
            <input
              type="color"
              value={textColorInput}
              onChange={(e) => setTextColorInput(e.target.value)}
            />
          </div>
        </section>

        {nameInput !== '' && (
          <div className='perview'>
            <label className='label'>Apresewntação prévia do link 👇 </label>
            <article className='list' style={{ marginBottom: 8, marginTop: 8, backgroundColor: backgroundColorInput }}>
              <p style={{ color: textColorInput }}>{nameInput}</p>
            </article>
          </div>
        )}

        <button className='btn-register' type='submit'>
          Cadastrar <MdAddLink size={32} color="#fff" />
        </button>
      </form>

      <h2 className='title'>
        Meus Links
      </h2>

      {links.map((item, index) => (
        <article
          keys={index}
          className='list animate-pop'
          style={{ backgroundColor: item.bg, color: item.color }}>

          <p>{item.name}</p>
          <div>
            <button className='btn-delete' onClick={() => handleDeleteLink(item.id)}>
              <FiTrash2 size={24} color="#fff" />
            </button>
          </div>
        </article>

      ))}
    </div>
  )
}