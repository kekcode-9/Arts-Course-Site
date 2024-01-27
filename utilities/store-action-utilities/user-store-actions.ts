import { actionType } from "../stores/userInfoStore";
import { getCurrentUser } from "@/lib/firebase/firebase-auth";
import { getDocumentFromDB } from "@/lib/firebase/firestore-access";
import dbCollections from "../constants/dbCollections";
import { ACTIONS } from "../constants/actions";
import { User } from "firebase/auth";
import webStorageItems from "../constants/web-storage-items";
import { DocumentData } from "firebase/firestore";

const { USER_EXISTS } = webStorageItems;

const { USERS } = dbCollections;

const { 
    ADD_CURRENT_USER, 
    ADD_APPLICATION_DATA, 
    REMOVE_USER 
} = ACTIONS.USER_ACTIONS;

export function storeUserInContext (
    user: User,
    dispatch: React.Dispatch<actionType>,
    callback?: (userData: DocumentData) => void
) {
    getDocumentFromDB(USERS, user.uid)
    .then((userData) => {
        dispatch({
            type: ADD_CURRENT_USER,
            payload: {
                uid: user.uid,
                name: userData?.name,
                userName: user.displayName,
                userEmail: user.email,
            }
        });
        dispatch({
            type: ADD_APPLICATION_DATA,
            payload: {
                applicationId: userData?.applicationId || undefined,
                applicationType: userData?.applicationType || undefined
            }
        })
        callback && callback(userData as DocumentData);
    })
    .catch((error) => console.log(`storeUserInContext error - ${error}`))
}

export default function getUser(
    dispatch: React.Dispatch<actionType>, 
    successCallback?: (userData?: DocumentData) => void,
    errorCallback?: () => void
) {
    getCurrentUser((user) => {
        if (user) {
            storeUserInContext(user, dispatch, successCallback);
        } else {
            localStorage.setItem(USER_EXISTS, 'false');
            dispatch({
                type: REMOVE_USER
            });
            errorCallback && errorCallback();
        }
    })
}