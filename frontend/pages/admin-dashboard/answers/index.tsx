import React from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";

import { withAuth } from "../../../utils";
import { AppContext } from "../../../context/AppContext";
import { TextAreaField, SelectField } from "../../../components";
import { userGetAll, questionGetAll, answerCreate } from "../../../api";

import type { NextPage } from "next";
import type { AxiosError, AxiosResponse } from "axios";

const Answer: NextPage = () => {
    const { users, setUsers } = React.useContext(AppContext);
    const { questions, setQuestions } = React.useContext(AppContext);

    useQuery(["users"], userGetAll, {
        onSuccess: (response) => {
            setUsers(response.data.data);
        },
        onError: (error: AxiosError) => {
            toast.error(error.response?.data.message || error.message);
        }
    });

    useQuery(["questions"], questionGetAll, {
        onSuccess: (response: AxiosResponse) => {
            setQuestions(response.data.data);
        },
        onError: (error: AxiosError) => {
            toast.error(error.response?.data.message || error.message);
        }
    });

    const [formData, setFormData] = React.useState({
        text: "",
        user_ref: "",
        question_ref: ""
    });

    const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast.loading("Loading... Please wait");

        mutate(formData);
    };

    const { mutate, isLoading } = useMutation(answerCreate, {
        onSuccess: (response: AxiosResponse) => {
            toast.dismiss();
            toast.success("Answer Created Successfully");

            console.log(response.data.data);

            setFormData({
                text: "",
                user_ref: "",
                question_ref: ""
            });
        },
        onError: (error: AxiosError) => {
            toast.dismiss();
            toast.error(error.response?.data.message || error.message);
        }
    });

    return (
        <>
            <div className="h-full pt-3 mx-4">
                <div className="max-w-8xl m-auto">
                    <h1 className="my-5 text-2xl font-semibold">Manage Answers</h1>
                </div>

                <hr className="my-5 border-2" />

                <div>
                    <h2 className="text-xl font-semibold">Create Answer</h2>

                    <form id="addAnswerForm" className="mb-0 space-y-6" method="POST" onSubmit={HandleSubmit}>
                        <div className="md:flex md:space-x-4 space-y-6 md:space-y-0">
                            <SelectField
                                label="User"
                                value={formData.user_ref}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, user_ref: e.target.value })}
                                required={true}
                                name="user_ref"
                                options={users.map((user: any) => ({ value: user._id, label: user.name }))}
                                placeholder="Select User"
                            />

                            <SelectField
                                label="Question"
                                value={formData.question_ref}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, question_ref: e.target.value })}
                                required={true}
                                name="question_ref"
                                options={questions.map((question: any) => ({ value: question._id, label: question.text }))}
                                placeholder="Select Question"
                            />
                        </div>

                        <TextAreaField
                            label="Answer"
                            value={formData.text}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, text: e.target.value })}
                            required={true}
                            name="text"
                        />

                        <div>
                            <button
                                disabled={isLoading}
                                type="submit"
                                className="w-full flex justify-center py-4 px-4 rounded shadow-sm text-md font-semibold text-white bg-primary hover:bg-secondary mt-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>

                <div className="mt-10">
                    <h2 className="text-xl font-semibold mb-2">Manage User Answers</h2>

                    <ul className="space-y-3">
                        {users.map((user: any) => (
                            <>
                                <li key={user._id}>
                                    <Link href={`/admin-dashboard/answers/user/${user._id}`}>
                                        <a className="text-blue-500">{user.name}</a>
                                    </Link>
                                    <p>{user.email}</p>
                                </li>
                                <hr className="my-5 border-1" />
                            </>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default withAuth(Answer);
