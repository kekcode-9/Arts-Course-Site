import { 
  User as FirebaseUser,
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import { setDocumentInDB, getDocumentFromDB } from "./firestore-access";
import { auth } from "./firebase.config";
import dbCollections from "@/utilities/constants/dbCollections";

const { STUDENT_APPLICATIONS } = dbCollections;

/**
 * 1. store newly created user to database with their name
 * 2. show sign up success and error components
 * 3. add password validation
 * 4. add login
 * 5. add forgot password
 * 6. verify email on sign up
 */

type updateProfileDataType = {
  name?: string;
  email?: string;
  applicationId?: string;
  applicationType?: string;
};

export function updateAccount(
  updatedData: { [key in keyof updateProfileDataType]: string },
  id: string
) {
  setDocumentInDB("users", id, updatedData);
}

export function getCurrentUser(callback: (user: FirebaseUser) => void) {
  onAuthStateChanged(auth, (user) => user && callback(user));
}

export async function loginUser(email: string, password: string): Promise<any> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user;
    return user;
  } catch (error) {
    console.log(`error signing in: ${error}`);
    return error;
  }
}

export async function logoutUser() {
  await signOut(auth);
}

export function createUser(
  name: string,
  email: string,
  password: string,
  onSuccess: (uid?: string) => void,
  onError: () => void,
  applicationId?: string,
  applicationType?: string
) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      if (applicationId && applicationType) {
        getDocumentFromDB(STUDENT_APPLICATIONS, applicationId)
        .then((docData) => {
          if (docData && docData.email === email) {
            updateAccount(
              {
                name,
                email,
                applicationId: applicationId as string,
                applicationType: applicationType as string,
              },
              user.uid
            );
          }
        })
        .catch((error) => {
          console.log(`application not found: ${error}`);
        })
      } else {
        updateAccount(
          {
            name,
            email,
          },
          user.uid
        );
      }
      onSuccess(user.uid);
    })
    .catch((error) => {
      const { code, message } = error;
      console.log(`error creating user: ${code} | ${message}`);
      onError();
    });
}
