"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/utilities/stores/userInfoStore";
import dbCollections from "@/utilities/constants/dbCollections";
import Typography from "../utility-components/typography";
import { getDocumentsWithQuery } from "@/lib/firebase/firestore-access";
import { storeUserInContext } from "@/utilities/store-action-utilities/user-store-actions";
import { getCurrentUser, logoutUser } from "@/lib/firebase/firebase-auth";
import routes from "@/utilities/constants/routes";
import { ACTIONS } from "@/utilities/constants/actions";
import { DocumentData } from "firebase/firestore";
import { FilterArrayType } from "@/utilities/types";
import { Timestamp } from "firebase/firestore";

const { REMOVE_USER } = ACTIONS.USER_ACTIONS;

const { ROOT } = routes;

const { STUDENT_APPLICATIONS, INSTRUCTOR_APPLICATIONS, USERS } = dbCollections;

export default function StatusPage() {
  const router = useRouter();
  const { state, dispatch } = useContext(UserContext);
  const { userId, userEmail, userApplicationType } = state;
  const [applications, setApplications] = useState<DocumentData[]>();
  const [loading, setLoading] = useState(false);

  const getApplications = (
    email: string,
    applicationType: "student_applications" | "instructor_applications"
  ) => {
    const query: FilterArrayType = [
      {
        field: "email",
        operator: "==",
        value: email,
      },
    ];
    const collectionName =
      applicationType === "student_applications"
        ? STUDENT_APPLICATIONS
        : INSTRUCTOR_APPLICATIONS;
    getDocumentsWithQuery(collectionName, query)
      .then((allDocs) => {
        setApplications(allDocs);
        setLoading(false);
      })
      .catch((error) => {
        console.log(`error fetching application status - ${error}`);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    getCurrentUser((user) => {
      if (user?.uid === userId && userId) {
        if (userEmail && userApplicationType) {
          getApplications(
            userEmail,
            userApplicationType as
              | "student_applications"
              | "instructor_applications"
          );
        }
      } else if (user?.uid && !userId) {
        // no user stored in context but someone is logged in
        // storeUserInContext(user, dispatch, (userData) => {
        //   getApplications(userData.email, userData.applicationType);
        // });
      } else if (!user) {
        // user has been logged out
        logoutUser();
        dispatch({
          type: REMOVE_USER,
        });
        router.push(ROOT);
      }
    });
  }, []);

  return (
    <div
      className="flex xsm:items-center justify-center
      w-screen h-screen
      max-xsm:pt-[8.5rem]"
    >
      {applications?.length && userId && (
        <>
          <table
            className="max-xsm:hidden
              min-w-[50%]
              text-left"
          >
            {
              userApplicationType === STUDENT_APPLICATIONS ?
              <thead>
                <tr className="border-b border-b-white">
                  <th className="py-4 pr-12">
                    <Typography isHeader={false}>Course name</Typography>
                  </th>
                  <th className="py-4 pr-12">
                    <Typography isHeader={false}>Time slot</Typography>
                  </th>
                  <th className="max-lg:hidden py-4 pr-12">
                    <Typography isHeader={false}>Created at</Typography>
                  </th>
                  <th className="py-4">
                    <Typography isHeader={false}>Status</Typography>
                  </th>
                </tr>
              </thead> :
              (
                userApplicationType === INSTRUCTOR_APPLICATIONS && (
                  <thead>
                    <tr className="border-b border-b-white">
                      <th className="py-4 pr-12">
                        <Typography isHeader={false}>Subjects</Typography>
                      </th>
                      <th className="max-lg:hidden py-4 pr-12">
                        <Typography isHeader={false}>Created at</Typography>
                      </th>
                      <th className="py-4">
                        <Typography isHeader={false}>Status</Typography>
                      </th>
                    </tr>
                  </thead>
                )
              )
            }
            {applications.map((application, i) => {
              if (userApplicationType === STUDENT_APPLICATIONS) {
                const { course, slot, createdAt, status } = application;
                const timeSlot: string =
                  slot.split("-")[1].split("Every ")[1] +
                  "-" +
                  slot.split("-")[2];
                let courseName = course.split(" with ");
                courseName.splice(courseName.length - 1, 1);
                courseName = courseName.join(" with ");

                return (
                  <tbody key={`application-${i}`}>
                    <tr>
                      <td className="py-4 pr-12">
                        <Typography isHeader={false}>{courseName}</Typography>
                      </td>
                      <td className="py-4 pr-12">
                        <Typography isHeader={false}>{timeSlot}</Typography>
                      </td>
                      <td className="max-lg:hidden py-4 pr-12">
                        <Typography isHeader={false}>{createdAt}</Typography>
                      </td>
                      <td className="py-4">
                        <Typography
                          isHeader={false}
                          additionalClasses="text-golden"
                        >
                          {status}
                        </Typography>
                      </td>
                    </tr>
                  </tbody>
                );
              } else if (userApplicationType === INSTRUCTOR_APPLICATIONS) {
                const { subjects, createdAt, status } = application;

                return (
                  <tbody key={`application-${i}`}>
                    <tr>
                      <td className="py-4 pr-12">
                        <Typography isHeader={false}>{subjects.join(' | ')}</Typography>
                      </td>
                      <td className="max-lg:hidden py-4 pr-12">
                        <Typography isHeader={false}>{createdAt}</Typography>
                      </td>
                      <td className="py-4">
                        <Typography
                          isHeader={false}
                          additionalClasses="text-golden"
                        >
                          {status}
                        </Typography>
                      </td>
                    </tr>
                  </tbody>
                )
              }
            })}
          </table>
          <div
            className="status-card 
              xsm:hidden"
          >
            {applications.map((application, i) => {
              if (userApplicationType === STUDENT_APPLICATIONS) {
                const { course, slot, status } = application;
                const timeSlot: string =
                  slot.split("-")[1].split("Every ")[1] +
                  "-" +
                  slot.split("-")[2];
                let courseName = course.split(" with ");
                courseName.splice(courseName.length - 1, 1);
                courseName = courseName.join(" with ");

                return (
                  <div
                    key={`application-${i}`}
                    className="flex flex-col gap-4
                        py-4 border-b border-b-white"
                  >
                    <div className="flex flex-col gap-2">
                      <Typography isHeader={false}>{courseName}</Typography>
                      <Typography isHeader={false}>{timeSlot}</Typography>
                    </div>
                    <Typography isHeader={false} additionalClasses="text-golden">
                      {status}
                    </Typography>
                  </div>
                );
              } else {
                const { subjects, createdAt, status } = application;

                return (
                  <div
                    key={`application-${i}`}
                    className="flex flex-col gap-4
                        py-4 border-b border-b-white"
                  >
                    <Typography isHeader={false}>{subjects.join(' | ')}</Typography>
                    <Typography isHeader={false}>{createdAt}</Typography>
                    <Typography isHeader={false} additionalClasses="text-golden">
                      {status}
                    </Typography>
                  </div>
                );
              }
            })}
          </div>
        </>
      )}
    </div>
  );
}
