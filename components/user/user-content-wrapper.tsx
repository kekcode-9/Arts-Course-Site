'use client'
import React, { useContext, useEffect } from 'react';
import { getCurrentUser } from '@/lib/firebase/firebase-auth';
import { getDocumentFromDB } from '@/lib/firebase/firestore-access';
import { UserContext } from '@/utilities/stores/userInfoStore';
import { ACTIONS } from '@/utilities/constants/actions';
import dbCollections from '@/utilities/constants/dbCollections';

const { USERS } = dbCollections;

const { ADD_CURRENT_USER, ADD_APPLICATION_DATA } = ACTIONS.USER_ACTIONS;

export default function UserContentWrapper({
    children
}: {
    children: React.ReactNode
}) {
    const { state, dispatch } = useContext(UserContext);

    const getUser = () => {
        getCurrentUser((user) => {
            if (user) {
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
                    if (userData?.applicationId && userData?.applicationType) {
                        dispatch({
                            type: ADD_APPLICATION_DATA,
                            payload: {
                                applicationId: userData?.applicationId,
                                applicationType: userData?.applicationType
                            }
                        })
                    }
                })
            }
        })
    }

    useEffect(() => {
        // getUser();
    }, []);

  return (
    <div className='user-content-wrapper w-screen h-screen bg-neutral-dark-gray-bg'>
        {children}
    </div>
  )
}
