import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, onSnapshot,
  addDoc, deleteDoc, doc,
  query, where,
  orderBy, serverTimestamp,
  updateDoc
} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyB6y7x2Q0PAo7LJMR7a3tgObj4YZa25Xf4",
  authDomain: "spike-scouting.firebaseapp.com",
  projectId: "spike-scouting",
  storageBucket: "spike-scouting.appspot.com",
  messagingSenderId: "965935049139",
  appId: "1:965935049139:web:f002f51cfd3d8f27fc83c6"
};

// init firebase
initializeApp(firebaseConfig)

// init services
const db = getFirestore()

// collection ref
const colRef = collection(db, 'games')

const addGame = (gameId, markers, cMarkers, won, wewin, autoBalls, climbBar, climbRP, cargoRP, totalRP) => {
  addDoc(colRef, {
    game: gameId,
    markers: markers,
    cMarkers: cMarkers,
    won: won,
    wewin: wewin,
    autoBalls: autoBalls,
    climbBar: climbBar,
    climbRP: climbRP,
    cargoRP: cargoRP,
    totalRP: totalRP,
    flipped: true,
    createdAt: serverTimestamp()
  })
}
export default addGame;