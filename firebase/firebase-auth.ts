import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDocumentInDB } from "./firestore-access";
import { auth } from "./firebase.config";

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
  application_id?: string;
  application_type?: string;
};

export function updateAccount(
  updatedData: { [key in keyof updateProfileDataType]: string },
  id: string
) {
  const { name, email, application_id, application_type } = updatedData;
  const data: {[key: string]: string} = {
    name: name as string,
    email: email as string,
  };
  if (application_id !== undefined && application_type !== undefined) {
    const application =
      application_type === "student_applications"
        ? "student_application_id"
        : "instructor_application_id";
    data[application] = application_id;
  }

  setDocumentInDB("users", id, data);
}

export function createUser(
  name: string,
  email: string,
  password: string,
  onSuccess: () => void,
  onError: () => void,
  application_id?: string,
  application_type?: string
) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(`user created: ${JSON.stringify(user)}`);
      updateAccount(
        {
          name,
          email,
          application_id: application_id as string,
          application_type: application_type as string,
        },
        user.uid
      );
      onSuccess();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`error creating user: ${errorCode} | ${errorMessage}`);
      onError();
    });
}
