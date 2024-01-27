import {
  User as FirebaseUser,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  setDocumentInDB,
  getDocumentFromDB,
  getDocumentsWithQuery,
} from "./firestore-access";
import { auth } from "./firebase.config";
import dbCollections from "@/utilities/constants/dbCollections";
import { FilterArrayType } from "@/utilities/types";
import webStorageItems from "@/utilities/constants/web-storage-items";

const { APPLICATION_EXISTS } = webStorageItems;

const { STUDENT_APPLICATIONS, INSTRUCTOR_APPLICATIONS, USERS } = dbCollections;

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
  id: string,
  callback?: () => void
) {
  if (isNew) {
    setDocumentInDB(USERS, id, document)
      .then(() => {
        callback && callback();
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    getDocumentFromDB(USERS, id).then((docData) => {
      if (docData) {
        const updatedDocument = {
          ...docData,
          ...document,
        };
        /**
         * if updated document has no application id then
         * look for application that matches updatedDocument.email
         */
        setDocumentInDB(USERS, id, updatedDocument)
          .then(() => {
            callback && callback();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  }
}

export function getCurrentUser(
  callback: (user: FirebaseUser | null | undefined) => void
) {
  onAuthStateChanged(auth, (user) => callback(user));
}

function findMatchingApplication(
  email: string,
  uid: string,
  isNew: boolean,
  onSuccessCallback: () => void,
  name?: string,
  userName?: string
) {
  const query = {
    field: "email",
    operator: "==",
    value: email,
  };
  getDocumentsWithQuery(STUDENT_APPLICATIONS, [query])
    .then((allDocs) => {
      if (allDocs.length) {
        localStorage.setItem(APPLICATION_EXISTS, "true");
        const applicationDoc = allDocs[0];
        const { id } = applicationDoc;
        !isNew
          ? updateAccount(
              isNew,
              {
                applicationId: id,
                applicationType: STUDENT_APPLICATIONS,
              },
              uid,
              onSuccessCallback
            )
          : updateAccount(
              isNew,
              {
                name,
                userName,
                email,
                applicationId: id,
                applicationType: STUDENT_APPLICATIONS,
              },
              uid,
              onSuccessCallback
            );
      } else {
        // check if an instructor application exists for the user
        getDocumentsWithQuery(INSTRUCTOR_APPLICATIONS, [query])
          .then((allDocs) => {
            if (allDocs.length) {
              localStorage.setItem(APPLICATION_EXISTS, "true");
              const applicationDoc = allDocs[0];
              const { id } = applicationDoc;
              !isNew
                ? updateAccount(
                    isNew,
                    {
                      applicationId: id,
                      applicationType: INSTRUCTOR_APPLICATIONS,
                    },
                    uid,
                    onSuccessCallback
                  )
                : updateAccount(
                    isNew,
                    {
                      name,
                      userName,
                      email,
                      applicationId: id,
                      applicationType: INSTRUCTOR_APPLICATIONS,
                    },
                    uid,
                    onSuccessCallback
                  );
            } else {
              if (isNew) {
                updateAccount(
                  isNew,
                  {
                    name,
                    userName,
                    email,
                  },
                  uid,
                  onSuccessCallback
                );
              } else {
                onSuccessCallback && onSuccessCallback();
              }
              localStorage.setItem(APPLICATION_EXISTS, "false");
            }
          })
          .catch((error) => {
            onSuccessCallback && onSuccessCallback();
          });
      }
    })
    .catch((error) => {
      onSuccessCallback && onSuccessCallback();
    });
}

export async function loginUser(
  email: string,
  password: string,
  applicationId?: string,
  applicationType?: string,
  onSuccessCallback?: (displayName: string) => void,
  onErrorCallback?: (message: string) => void
): Promise<any> {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    if (applicationId && applicationType) {
      localStorage.setItem(APPLICATION_EXISTS, "true");
      updateAccount(
        false,
        {
          applicationId: applicationId as string,
          applicationType: applicationType as string,
        },
        user.uid,
        () => onSuccessCallback && onSuccessCallback(user.displayName as string)
      );
    } else {
      /**
       * check both student and instructor collections for
       * an application with matching email.
       */
      findMatchingApplication(
        email,
        user.uid,
        false,
        () => onSuccessCallback && onSuccessCallback(user.displayName as string)
      );
    }
    //return user;
  } catch (error) {
    console.log(`error signing in: ${error}`);
    onErrorCallback && onErrorCallback(JSON.stringify(error));
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
  onError: (e: Error) => void,
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
            getDocumentFromDB(applicationType, applicationId)
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
                    user.uid,
                    () => onSuccess(user.uid, userName)
                  );
                }
              })
              .catch((error) => {
                console.log(`application not found: ${error}`);
              });
          } else {
            /**
             * find matching application then update account with it
             */
            findMatchingApplication(
              email,
              user.uid,
              true,
              () => onSuccess(user.uid, userName),
              name,
              userName
            );
          }
          // onSuccess(user.uid, userName);
        })
        .catch((error) => alert(`Account creation failed: ${error}`));
    })
    .catch((error) => {
      const { code, message } = error;
      console.log(`error creating user: ${code} | ${message}`);
      onError(error);
    });
}

export function resetForgottenPassword(email: string) {
  return new Promise((resolve, reject) => {
    getDocumentsWithQuery(USERS, [
      {
        field: "email",
        operator: "==",
        value: email,
      },
    ] as FilterArrayType)
      .then((allDocs) => {
        if (!allDocs.length) {
          reject("no user found with this email id");
        } else {
          sendPasswordResetEmail(auth, email)
            .then(() => {
              return resolve("");
            })
            .catch((error) => {
              reject(error.message);
            });
        }
      })
      .catch((error) => {
        console.log(`error - ${error.message}`);
        reject(error.message);
      });
  });
}
