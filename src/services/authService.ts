import {
	getAuth,
	createUserWithEmailAndPassword,
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

const authService = {
	signUp,
	onStateChange
};

export default authService;
