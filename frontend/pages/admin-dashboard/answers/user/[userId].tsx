import React from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@tanstack/react-query";

import { withAuth } from "../../../../utils";
import { AppContext } from "../../../../context/AppContext";
import { answerDelete, answerGetAllByUser, userGetOne } from "../../../../api";

import type { NextPage } from "next";
import type { AxiosError, AxiosResponse } from "axios";

const UserAnswers: NextPage = () => {
    const router = useRouter();
    const { userId } = router.query;
    const { answers, setAnswers } = React.useContext(AppContext);

    const [user, setUser] = React.useState<any>({});
    useQuery(["user", userId], () => userGetOne(userId as string), {
        onSuccess: (response: AxiosResponse) => {
            setUser(response.data.data);
        },
        onError: (error: AxiosError) => {
            toast.error(error.response?.data.message || error.message);
        },
        enabled: !!userId
    });

    useQuery(["answers", userId], () => answerGetAllByUser(userId as string), {
        onSuccess: (response: AxiosResponse) => {
            setAnswers(response.data.data);
        },
        onError: (error: AxiosError) => {
            toast.error(error.response?.data.message || error.message);
        },
        enabled: !!userId
    });

    const { mutate, isLoading } = useMutation(answerDelete, {
        onSuccess: (response: AxiosResponse) => {
            toast.success("Answer Deleted Successfully");
            setAnswers(answers.filter((answer: any) => answer._id !== response.data.data._id) as never[]);
        },
        onError: (error: AxiosError) => {
            toast.error(error.response?.data.message || error.message);
        }
    });

    return (
        <>
            <div className="h-full pt-3 mx-4">
                {user && (
                    <>
                        <h1 className="text-2xl font-semibold text-gray-800">Answers by {user.name}</h1>
                        <div className="mt-4">
                            <p className="text-gray-600">Email: {user.email}</p>
                        </div>
                    </>
                )}

                <hr className="my-5 border-2" />

                <div>
                    <h2 className="text-xl font-semibold text-gray-800">Answers</h2>
                    {answers.length === 0 && (
                        <div className="mt-4">
                            <p className="text-gray-600">No answers available</p>
                        </div>
                    )}

                    {answers.map((answer: any) => (
                        <div key={answer._id} className="bg-white shadow-md rounded-lg p-4 mt-4 space-y-3">
                            <p className="text-gray-800">{answer.text}</p>
                            <p className="text-gray-600">Question: {answer.question_ref.text}</p>
                            <button onClick={() => mutate(answer._id)} disabled={isLoading} className="bg-red-500 text-white px-4 py-2 mt-2 rounded-md">
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default withAuth(UserAnswers);
