"use server"
import db from "./firebase.config";
import { doc, getDoc, setDoc, addDoc, collection } from "firebase/firestore";

export async function addDocumentToDB(
    collectionName: string, 
    document: any,
    onSuccess?: (id?: string) => void,
    onError?: () => void
) {
    try {
        // addDoc(collection(db, <collectionName>), {...data})
        const docRef = await addDoc(collection(db, collectionName), document);
        console.log(`docRef is: ${JSON.stringify(docRef.id)}`);
    } catch (e) {
        console.log(`addDocumentToDB failed with error: ${e}`);
    }
}

export async function setDocumentInDB(collectionName: string, docId: string, document: any) {
    try {
        await setDoc(doc(db, collectionName, docId), document);
    } catch (e) {
        console.log(`setDocumentInDB failed with error: ${e}`);
    }
}

export async function getDocumentFromDB(
    collectionName: string, 
    docId: string, 
    callback?: () => void
) {
    const docRef = doc(db, collectionName, docId);
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
        return docSnapshot.data();
    }
}