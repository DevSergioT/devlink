import { useState, useEffect } from 'react'
import "./home.css"
import { Social } from "../../Components/Social"
import { FaLinkedin, FaGithub, FaFacebook, FaInstagram, } from 'react-icons/fa'
import { getDocs, collection, orderBy, query, doc, getDoc } from 'firebase/firestore'
import { db } from '../../Services/firebaseConnection'


export default function Home() {

  const [links, setLinks] = useState([]);
  const [socialLinks, setSocialLinks] = useState({})

  useEffect(() => {

    function loadLinks() {
      const linksRef = collection(db, "links")
      const queryRef = query(linksRef, orderBy("created", "asc"))


      getDocs(queryRef)
        .then((snapshot) => {
          let lista = [];

          snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              name: doc.data().name,
              url: doc.data().url,
              bg: doc.data().bg,
              color: doc.data().color,
            })
          })

          setLinks(lista);
        })
    }

    loadLinks();

  }, [])

  useEffect(() => {

    function loadSocialLinks() {
      const docRef = doc(db, "social", "link")

      getDoc(docRef)
        .then((snapshot) => {

          if (snapshot.data() !== undefined) {
            setSocialLinks({
              linkedin: snapshot.data().linkedin,
              instagram: snapshot.data().instagram,
              github: snapshot.data().github,
              facebook: snapshot.data().facebook,
            })
          }
        }, [])
    }

    loadSocialLinks();
  }, [])

  return (

    <div className="home-container">

      <h1>Sergio<span className="name">Dev</span></h1>
      <span>Veja meus links!🚀🧑‍🚀</span>

      <main className="links">


        {links.map((item) => (

          <section key={item.id} className="link-area" style={{ backgroundColor: item.bg }}>
            <a href={item.url} target="blank">
              <p className="link-text" style={{ color: item.color }}>{item.name}</p>
            </a>
          </section>
        ))}

        {links.length !== 0 && Object.key(socialLinks).length > 0 && (
          <footer>
            <Social url={socialLinks?.linkedin}>
              <FaLinkedin size={35} color='#0b33cf' />
            </Social>
            <Social url={socialLinks?.github}>
              <FaGithub size={35} color='#110106' />
            </Social>
            <Social url={socialLinks?.facebook}>
              <FaFacebook size={35} color='#3b60f4' />
            </Social>
            <Social url={socialLinks?.instagram}>
              <FaInstagram size={35} color='#e31515' />
            </Social>
          </footer>
        )}

      </main>
    </div>
  )
}