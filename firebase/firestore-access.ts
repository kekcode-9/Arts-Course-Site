import db from "./firebase.config";
import { doc, getDoc, setDoc, collection } from "firebase/firestore";

export default async function getCourses() {
    const docRef = doc(db, "test", "dummy-doc");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log(`collection is: ${docSnap.data()}`);
        return docSnap.data()
    } else {
        console.log('nothing there')
    }
    // try {
    //     await setDoc(doc(collection(db, 'test'), 'dummy-doc'), {
    //       Title: "Why you no tell me"
    //     });
    //   } catch (e) {
    //     console.log(`Error adding document: ${JSON.stringify(e)}`);
    //   }
}