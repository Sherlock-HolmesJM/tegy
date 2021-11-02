import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	NextOrObserver,
	User
} from "firebase/auth";

export const onStateChange = (observer: NextOrObserver<User>) =>
	onAuthStateChanged(getAuth(), observer);

const signUp = (email: string, password: string) =>
	createUserWithEmailAndPassword(getAuth(), email, password);

const login = (email: string, password: string) =>
	signInWithEmailAndPassword(getAuth(), email, password);

const logout = () => signOut(getAuth());

const authService = {
	signUp,
	login,
	logout,
	onStateChange
};

export default authService;
