import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
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

export const getTaskList = async (uid) => {
  const q = collection(db, `users/${uid}/tasklists`)
  const snapshot = await getDocs(q)
  if (!snapshot.empty) {
    return snapshot.docs.map((item) => ({ ...item.data(), id: item.id }))
  }
}

export const chnageStatus = async (uid, id) => {
  const docRef = doc(db, `users/${uid}/tasklists/${id}`)
  await updateDoc(docRef, {
    status: false,
  })
}
