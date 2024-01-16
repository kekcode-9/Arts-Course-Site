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

const { STUDENT_APPLICATIONS, USERS } = dbCollections;

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
  userName?: string;
  email?: string;
  applicationId?: string;
  applicationType?: string;
};

export function updateAccount(
  isNew: boolean,
  document: { [key in keyof updateProfileDataType]: string },
  id: string
) {
  console.log(`isNew: ${isNew}`)
  if (isNew) {
    setDocumentInDB(USERS, id, document);
  } else {
    getDocumentFromDB(USERS, id).then((docData) => {
      if (docData) {
        const updatedDocument = {
          ...docData,
          ...document,
        };
        setDocumentInDB(USERS, id, updatedDocument);
      }
    });
  }
}

export function getCurrentUser(
  callback: (user: FirebaseUser | null | undefined) => void
) {
  onAuthStateChanged(auth, (user) => callback(user));
}

export async function loginUser(
  email: string,
  password: string,
  applicationId?: string,
  applicationType?: string
): Promise<any> {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    if (applicationId && applicationType) {
      updateAccount(
        false,
        {
          applicationId: applicationId as string,
          applicationType: applicationType as string,
        },
        user.uid
      );
    }
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
  onSuccess: (uid?: string, userName?: string) => void,
  onError: () => void,
  applicationId?: string,
  applicationType?: string
) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userName = name.toLocaleLowerCase().split(" ").join("-");
      updateProfile(user, {
        displayName: userName,
      })
        .then(() => {
          if (applicationId && applicationType) {
            getDocumentFromDB(STUDENT_APPLICATIONS, applicationId)
              .then((docData) => {
                if (docData && docData.email === email) {
                  updateAccount(
                    true,
                    {
                      name,
                      userName,
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
              });
          } else {
            updateAccount(
              true,
              {
                name,
                userName,
                email,
              },
              user.uid
            );
          }
          onSuccess(user.uid, userName);
        })
        .catch((error) => alert(`Account creation failed: ${error}`));
    })
    .catch((error) => {
      const { code, message } = error;
      console.log(`error creating user: ${code} | ${message}`);
      onError();
    });
}
