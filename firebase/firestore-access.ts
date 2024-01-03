"use server"
import db from "./firebase.config";
import { doc, getDoc, setDoc, addDoc, collection } from "firebase/firestore";

export async function addDocumentToDB(
    collection_name: string, 
    document: any,
    onSuccess?: (id?: string) => void,
    onError?: () => void
) {
    try {
        // addDoc(collection(db, <collection_name>), {...data})
        const docRef = await addDoc(collection(db, collection_name), document);
        console.log(`docRef is: ${JSON.stringify(docRef.id)}`);
    } catch (e) {
        console.log(`addDocumentToDB failed with error: ${e}`);
    }
}

export async function setDocumentInDB(collection_name: string, doc_id: string, document: any) {
    try {
        await setDoc(doc(db, collection_name, doc_id), document);
    } catch (e) {
        console.log(`setDocumentInDB failed with error: ${e}`);
    }
}

export default async function getCourses() {
    // pass db, collection name, doc name
    // const docRef = doc(db, "student-application-form", "student-application");
    // const docSnap = await getDoc(docRef);

    // if (docSnap.exists()) {
    //     console.log(`collection is: ${docSnap.data()}`);
    //     return docSnap.data()
    // } else {
    //     console.log('nothing there')
    // }

    // doc(db, collection_name, document_id)
    await setDoc(doc(db, "cities", "new-city-id-1"), {
        'testDoc': 'testin'
    });
    // try {
        // setDoc(doc(collection(db, collection_name)), doc_name)
    //     await setDoc(doc(collection(db, 'test'), 'dummy-doc'), {
    //       Title: "Why you no tell me"
    //     });
    //   } catch (e) {
    //     console.log(`Error adding document: ${JSON.stringify(e)}`);
    //   }
}