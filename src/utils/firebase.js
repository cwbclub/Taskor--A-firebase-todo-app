import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import { db } from '../lib/firebase'

export const addToDB = async (uid, task) => {
  const colRef = collection(db, `users/${uid}/tasklists`)
  await addDoc(colRef, {
    text: task,
    status: true,
    timestamp: serverTimestamp(),
  })
}

export const chnageStatus = async (uid, id, status) => {
  const docRef = doc(db, `users/${uid}/tasklists/${id}`)
  await updateDoc(docRef, {
    status: !status,
  })
}

export const deleteTask = async (uid, id) => {
  const docRef = doc(db, `users/${uid}/tasklists/${id}`)
  await deleteDoc(docRef)
}
