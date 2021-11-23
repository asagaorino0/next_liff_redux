import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
// import { getFirestore, collection, query, where, onSnapshot } from 'firebase/firestore'
import { getFirestore, collection, addDoc, doc, setDoc, Timestamp, initializeFirestore } from 'firebase/firestore'
import { app } from "../../src/firebaseConfig"
import { FirestoreListType } from '../types/FirestoreListType'
const FirestoreList: React.FC<FirestoreListType> = () => {

    const [tasks, setTasks] = useState<any>([]);
    const [name, setName] = useState<string>("");
    const [uid, setUid] = useState<string>("");

    useEffect(() => {
        const auth = getAuth()

        // login状態が変更されたら
        onAuthStateChanged(auth, (user) => {
            console.log('user:', user)
            console.log('userName:', user?.displayName)
            const name = user?.displayName
            setName(name)
            const uid = user?.uid
            setUid(uid)
            if (user) {
                const db = getFirestore()
                clickButton()
                // loginしてたら
                // let tasks = []
                // const q = query(collection(db, 'tasks'), where('uid', '==', `${user.uid}`))
                // onSnapshot(q, (snapshot) => {
                //     snapshot.docChanges().forEach((change) => {
                //         if (change.type === 'added') {
                //             console.log('added: ', change.doc.data())
                //             tasks.push({
                //                 id: change.doc.id,
                //                 name: change.doc.data().name
                //             })
                //             console.log(tasks)
                //         }
                //     })
                //     setTasks(tasks)
                // })
            }
        })
    }, []);


    const clickButton = () => {
        const db = getFirestore()
        const docRef = setDoc(doc(db, 'users', `${uid}`), {
            uid: uid,
            name: name,
            timestamp: Timestamp.fromDate(new Date()),
        }, { merge: true }//←上書きされないおまじない
        )
        console.log('Document', docRef)
    }

    return (
        <div>
            {name}:
            {uid}
            {tasks.map(val => (
                <div key={val.name}>{val.name}</div>
            ))}
        </div>
    );
}

export default FirestoreList;
