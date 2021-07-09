import firebase from "firebase";

import { firebaseConfig } from "../constants/defaultValues";

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.firestore();
// const messaging = firebase.messaging();
// messaging.getToken({
//   vapidKey:
//     "BNZBnAeYFri_2mqsguVMyHeq06tGC8bgTcxl18tGDDFmPN6kCsxfaOYZ8xydwt41k7SVgX70b5ffNaSEtAP8R8Y",
// });

export { auth, database };
