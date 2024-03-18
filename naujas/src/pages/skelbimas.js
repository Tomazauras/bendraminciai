import { useEffect, useState } from "react";
import "../App.css";
import { db, auth, storage } from "../App";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

function Skelbimas() {
  const [skelbimai, setSkelbimai] = useState([]);
  const skelbimuKolekcijaRef = collection(db, "skelbimai");

  useEffect (() => {
    const getSkelbimai = async () => {
      const data = await getDocs(skelbimuKolekcijaRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setSkelbimai(filteredData);
    }

    getSkelbimai();
  }, [])

  return (
    <div className="App">
      
      <div>
        {skelbimai.map((skelbimas) => (
          <div>
            <h1>Pavadinimas: {skelbimas.pavadinimas}</h1>
            <p>Aprašymas: {skelbimas.aprašymas}</p>
            <p>Kaina: {skelbimas.kaina}</p>
            
          </div>

        ))}
      </div>

    </div>
  );
}

export default Skelbimas;
