import React, { useState, useEffect } from 'react';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth, db } from "../firebase"
import { getFirestore, collection, query, where, onSnapshot, doc, setDoc, Timestamp, addDoc } from 'firebase/firestore'
// import { User } from "../types/User";
// import { initializeFirestore } from 'firebase/firestore'
// import { getFirestore } from "firebase/firestore"
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// import { getAuth, signInWithRedirect, signOut, GoogleAuthProvider } from "firebase/auth";
// import { getFirestore, collection, addDoc} from 'firebase/firestore'
import { app } from "../firebase"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../store'
import { userSlice } from '../store/user'


function FirestoreList() {
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.user)


    const [tasks, setTasks] = useState([]);
    const [name, setName] = useState<string>();
    const [uid, setUid] = useState();
    const handleConfirm = () => {
        // eslint-disable-next-line
        console.log(user.user.name)
        // const name = user.user.name
        // setName(name)
        // const uid = user?.uid
        // setUid(uid)

    }
    //   const handleUpdate = () => {
    //     dispatch(
    //       userSlice.actions.updateUser({
    //         name: user?.displayName,
    //         age: 28,
    //         email: 'email',
    //         token: 'token',
    //         history: [],
    //       })
    //     )
    //   }
    const handleReset = () => {
        dispatch(userSlice.actions.reset())
    }
    const handleAddHistory = () => {
        dispatch(userSlice.actions.addHistory('push'))
    }


    useEffect(() => {
        const auth = firebaseAuth

        // login状態が変更されたら
        onAuthStateChanged(auth, (user) => {
            console.log('user:', userSlice)
            console.log('userName:', user?.displayName)

            // const handleUpdate = () => {
            dispatch(
                userSlice.actions.updateUser({
                    name: user?.displayName,
                    uid: user?.uid,
                    tasks: [],
                    history: []
                })
            )
            //   }
            // // const name = user?.displayName
            // setName(name)
            // // const uid = user?.uid
            // setUid(uid)
            if (user) {
                // const db = getFirestore()
                clickButton()
                // loginしてたら
                let tasks: any = []
                const q = query(collection(db, 'tasks'), where('uid', '==', `${user.uid}`))
                onSnapshot(q, (snapshot) => {
                    snapshot.docChanges().forEach((change) => {
                        if (change.type === 'added') {
                            console.log('added: ', change.doc.data())
                            tasks.push({
                                id: change.doc.id,
                                name: change.doc.data().name
                            })
                            console.log(tasks)
                            handleConfirm()
                        }
                    })
                    setTasks(tasks)
                })
            }
        })
    }, []);


    const clickButton = () => {
        const setRef = setDoc(doc(db, 'users', `${user.user.uid}`), {
            uid: user.user.uid,
            name: user.user.name,
            timestamp: Timestamp.fromDate(new Date()),
        }, { merge: true }//←上書きされないおまじない
        )
        console.log('user', setRef)
        const docRef = addDoc(collection(db, 'tasks'), {
            uid: user.user.uid,
            id: '003',
            name: user.user.name
        })
        console.log('Document', docRef)
    }

    return (
        <div>
            {user.user.name}:
            {user.user.uid}
            <div>
                {/* <h1>storeの動作確認</h1>
                <button type="button" onClick={handleConfirm}>
                    確認
                </button> */}
                {/* <button type="button" onClick={handleUpdate}>
                    update
                </button> */}
                {/* <button type="button" onClick={handleReset}> */}
                {/* reset
                </button>
                <button type="button" onClick={handleAddHistory}>
                    addHistory
                </button> */}
                <button onClick={clickButton}>Firestore追加</button>
            </div>
            {
                user.user.tasks.map((tasks: any) => {
                    <div key={tasks.name}>{tasks.name}</div>
                })
            }
        </div>
    );
}

export default FirestoreList;
