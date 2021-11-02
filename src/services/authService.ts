import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	NextOrObserver,
	User
} from "firebase/auth";

const onStateChange = (observer: NextOrObserver<User>) =>
	onAuthStateChanged(getAuth(), observer);

const signUp = (email: string, password: string) => {
	return createUserWithEmailAndPassword(getAuth(), email, password).then(
		value => value
	);
};

const login = (email: string, password: string) =>
	signInWithEmailAndPassword(getAuth(), email, password);

const authService = {
	signUp,
	login,
	onStateChange
};

export default authService;
