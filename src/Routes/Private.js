import { useState, useEffect } from "react";
import { auth } from "../Services/firebaseConnection";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";


export default function Private({ children }) {

  const [loading, setLoading] = useState(true)
  const [signed, setSigned] = useState(false);

  useEffect(() => {

    async function checklogin() {
      // eslint-disable-next-line no-unused-vars
      const unsub = onAuthStateChanged(auth, (user) => {

        if (user) {
          const userData = {
            uid: user.uid,
            email: user.email
          };

          localStorage.setItem("@datailUser", JSON.stringify(userData))
          setLoading(false);
          setSigned(true)
        } else {
          setLoading(false);
          setSigned(false);
        }

      })
    }

    checklogin();

  }, [])

  if (loading) {
    return (
      <div></div>
    )
  }

  if (!signed) {
    return <Navigate to='/login' />
  }

  return children;
}