import { 
    createUserWithEmailAndPassword, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signOut,
    sendPasswordResetEmail } from 'firebase/auth';
import { authActions } from '../store/auth';
import { useDispatch } from 'react-redux';
import { auth } from '../firebase';
import { ref, set, child, get } from 'firebase/database';
import { database } from '../firebase';

const dbRef = ref(database);

export const signUp = (email, password) => {

    const register = createUserWithEmailAndPassword(auth, email, password);
    return register;
};

export const addUserDb = (uid, name, surname, phone, address) => {
    const sendToDb = set(child(dbRef, `users/${uid}`), {
        name,
        surname,
        phone,
        address,
    });

    return sendToDb;
}

export const login = (email, password) => {
    const login = signInWithEmailAndPassword(auth, email, password);
    return login;
};

export const getUserInfo = (uid) => {
    const userInfo = get(child(dbRef, `users/${uid}`));
    return userInfo;
}

export const logout = async () => {
    const logout = await signOut(auth);
    localStorage.removeItem('user');
    return logout;
};

export const resetPassword = async (email) => {
   const resetPass = await sendPasswordResetEmail(auth, email, 
        { url: 'http://localhost:3000/login'}
    );
   return resetPass;
}

function AuthStateOperations(){
   const dispatch = useDispatch();
   
    onAuthStateChanged(auth, (currentUser) => {
        if(currentUser){
            dispatch(authActions.setIsLoggedIn(false))
        }
    })
}