"use server";
import db from "./firebase.config";
import {
  doc,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  collection,
  getDocs,
  DocumentData,
  query,
  where,
  WhereFilterOp,
  QueryFieldFilterConstraint,
  QueryOrderByConstraint,
  QueryCompositeFilterConstraint,
  QueryLimitConstraint,
  orderBy,
  or,
  limit,
  documentId,
} from "firebase/firestore";
import dbCollections from "@/utilities/constants/dbCollections";
import { FilterArrayType } from "@/utilities/types";

const { COURSE_CATEGORIES } = dbCollections;

export async function updateDocument(
  collectionName: string,
  docId: string,
  updatedData: {
    [key: string]: string | number | boolean;
  }
) {
  const docRef = doc(db, collectionName, docId);
  await updateDoc(docRef, updatedData);
}

export async function addDocumentToDB(
  collectionName: string,
  document: any,
  onSuccess?: (id?: string) => void,
  onError?: (e: any) => void
) {
  try {
    // addDoc(collection(db, <collectionName>), {...data})
    const docRef = await addDoc(collection(db, collectionName), {
      ...document,
      createdAt: new Date().toDateString()
    });
    if (docRef) {
      onSuccess && onSuccess();
      return JSON.stringify(docRef);
    } else {
      onError && onError("no docRef");
    }
  } catch (e) {
    onError && onError(e);
    console.log(`addDocumentToDB failed with error: ${e}`);
  }
}

export async function setDocumentInDB(
  collectionName: string,
  docId: string,
  document: any,
) {
  return new Promise((resolve, reject) => {
    setDoc(doc(db, collectionName, docId), document)
    .then(() => {
      resolve('');
    })
    .catch(() => {
      reject('setDocumentInDB could not set doc in firestore db')
    })
  })
}

export async function getDocumentFromDB(
  collectionName: string,
  docId: string,
) {
  const docRef = doc(db, collectionName, docId);
  const docSnapshot = await getDoc(docRef);
  return new Promise<DocumentData>((resolve, reject) => {
    if (docSnapshot.exists()) {
      resolve(docSnapshot.data());
    } else {
      reject('Could not get document from DB')
    }
  })
}

export async function getRefsWithTextSearch(
  collectionName: string,
  searchTokens: string[],
  queries?: FilterArrayType
) {
  /**
   * queries can only have a "category" field
   * search the collection for documents where category matches the one in queries
   * and keywords contain any of the searchTokens
   */
  const refQuery = queries && queries[0];
  const whereArr: QueryFieldFilterConstraint[] = [];
  if (refQuery) {
    whereArr.push(where(refQuery.field, `${refQuery.operator}` as WhereFilterOp, refQuery.value));
  }
  whereArr.push(where('keywords', 'array-contains-any', searchTokens));

  const q = query(
    collection(db, collectionName),
    ...whereArr
  );

  const snapshot = await getDocs(q);

  const allDocs: DocumentData[] = [];
  snapshot.forEach((doc) => {
    const data = doc.data();
    allDocs.push({
      ...data,
      id: doc.id,
    });
  });
  return allDocs;
}

export async function getCoursesWithTextSearch(
  collectionName: string,
  searchTokens: string[],
  queries?: FilterArrayType
) {
  let collectionWithKeywords = COURSE_CATEGORIES;
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
  orderByField?: string,
  orderDirection?: "asc" | "desc",
  useOR?: boolean,
  limitBy?: number
) {
  const whereArr: QueryFieldFilterConstraint[] = [];
  queries.forEach((query) => {
    whereArr.push(
      where(query.field, `${query.operator}` as WhereFilterOp, query.value)
    );
  });
  const criteria: (
    QueryOrderByConstraint
    | QueryLimitConstraint
  )[] = [];

  if (orderByField) {
    criteria.push(orderBy(orderByField, orderDirection || "desc"));
  }

  if (limitBy) {
    criteria.push(limit(limitBy));
  }

  const combinedQuery = useOR ? query(
    collection(db, collectionName),
    or(...whereArr),
    ...criteria
  ) :
  query(
    collection(db, collectionName),
    ...whereArr,
    ...criteria
  )

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

export async function getAllDocumentsInCollection(
  collectionName: string,
  limitBy?: number
) {
  const collectionRef = collection(db, collectionName);
  const q = limitBy && query(collectionRef, limit(limitBy));

  const snapshot =
    limitBy && q ? await getDocs(q) : await getDocs(collectionRef);
  const allDocs: DocumentData[] = [];
  snapshot.forEach((doc) => {
    allDocs.push({
      ...doc.data(),
      id: doc.id,
    });
  });
  return allDocs;
}
