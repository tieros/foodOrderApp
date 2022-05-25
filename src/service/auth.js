import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { authActions } from '../store/auth';
import { useDispatch } from 'react-redux';
import { auth } from '../firebase';
import { ref, set, child } from 'firebase/database';
import { database } from '../firebase';

export const signUp = async (email, password, name, surname, phone, address) => {

    const register = await createUserWithEmailAndPassword(auth, email, password);
    const uid = register.user.uid;
    const dbRef = ref(database);
    const sendToDb = await set(child(dbRef, `users/${uid}`), {
            name,
            surname,
            email,
            phone,
            address,
        });

    return { sendToDb, uid };
}

export const login = (email, password) => {

        const login =  signInWithEmailAndPassword(auth, email, password);
        const uid = login.user.uid;
        return { login, uid };

};

export const logout = async () => {
    const logout = signOut(auth);
    return logout;
};

function AuthStateOperations(){
   const dispatch = useDispatch();
   
    onAuthStateChanged(auth, (currentUser) => {
        if(currentUser){
            dispatch(authActions.setIsLoggedIn(false))
        }
    })
}