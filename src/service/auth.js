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

export const signUp = async (email, password, name, surname, phone, address) => {
    let uid;
    try {
        const register = await createUserWithEmailAndPassword(auth, email, password);
        uid = register.user.uid;
    } catch (error) {
        console.log(`Error occured: ${error}`);
    }

    const sendToDb = await set(child(dbRef, `users/${uid}`), {
        name,
        surname,
        email,
        phone,
        address,
    });

    return { sendToDb, uid };
};

export const login =  async (email, password) => {
    const login =  await signInWithEmailAndPassword(auth, email, password);
    const { uid, accessToken } = login.user;
    const user = { uid, accessToken };
    localStorage.setItem('user', JSON.stringify(user));
    return login;

};

export const getUserInfo = async (uid) => {
    const userInfo = await get(child(dbRef, `users/${uid}`));
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