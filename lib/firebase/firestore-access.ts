"use server"
import db from "./firebase.config";
import {
  doc,
  getDoc,
  setDoc,
  addDoc,
  collection,
  getDocs,
  DocumentData,
  query,
  where,
  WhereFilterOp,
  QueryFieldFilterConstraint,
  orderBy,
  or,
  documentId,
} from "firebase/firestore";
import dbCollections from "@/utilities/constants/dbCollections";
import { FilterArrayType } from "@/utilities/types";

const { COURSE_CATEGORIES } = dbCollections;

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

export async function setDocumentInDB(
  collectionName: string,
  docId: string,
  document: any
) {
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

export async function getDocumentsWithTextSearch(
  collectionName: string,
  searchType: "courses" | "refs" | "models",
  searchTokens: string[],
  queries?: FilterArrayType
) {
  let collectionWithKeywords = searchType === "courses" && COURSE_CATEGORIES;
  const keywordsCollectionRef = collection(
    db,
    collectionWithKeywords as string
  );
  const keywordMatchQuery = query(
    keywordsCollectionRef,
    where("keywords", "array-contains-any", searchTokens)
  );

  const keywordsQuerySnapshot = await getDocs(keywordMatchQuery);
  const matchedDocIds: string[] = [];
  keywordsQuerySnapshot.forEach((doc) => {
    doc.data().courseIds.forEach((id: string) => {
      matchedDocIds.push(id);
    });
  });

  const mainCollectionRef = collection(db, collectionName);
  const whereArr: QueryFieldFilterConstraint[] = [];
  queries?.forEach((query) => {
    whereArr.push(
      where(query.field, `${query.operator}` as WhereFilterOp, query.value)
    );
  });
  // whereArr.push(
  //   where(documentId(), 'in', matchedDocIds)
  // );

  const combinedQuery = query(
    mainCollectionRef,
    ...whereArr,
    orderBy("rating", "desc") /*orderBy('__name__')*/
  );
  const snapshot = await getDocs(combinedQuery);
  const allDocs: DocumentData[] = [];
  snapshot.forEach((doc) => {
    const data = doc.data();
    matchedDocIds.includes(doc.id) &&
      allDocs.push({
        ...data,
        id: doc.id,
      });
  });
  return allDocs;
}

export async function getDocumentsWithQuery(
  collectionName: string,
  queries: FilterArrayType,
  useOR?: boolean
) {
  const whereArr: QueryFieldFilterConstraint[] = [];
  queries.forEach((query) => {
    whereArr.push(
      where(query.field, `${query.operator}` as WhereFilterOp, query.value)
    );
  });
  const combinedQuery = !useOR
    ? query(
        collection(db, collectionName),
        ...whereArr,
        orderBy("rating", "desc")
      )
    : query(
        collection(db, collectionName),
        or(...whereArr),
        orderBy("rating", "desc")
      );
  const snapshot = await getDocs(combinedQuery);
  const allDocs: DocumentData[] = [];
  snapshot.forEach((doc) => {
    allDocs.push({
      ...doc.data(),
      id: doc.id,
    });
  });
  return allDocs;
}

export async function getAllDocumentsInCollection(collectionName: string) {
  const collectionRef = collection(db, collectionName);
  const snapshot = await getDocs(collectionRef);
  const allDocs: DocumentData[] = [];
  snapshot.forEach((doc) => {
    allDocs.push({
      ...doc.data(),
      id: doc.id,
    });
  });
  return allDocs;
}
