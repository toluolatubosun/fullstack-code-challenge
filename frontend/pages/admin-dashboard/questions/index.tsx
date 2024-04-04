import React from "react";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { withAuth } from "../../../utils";
import { TextAreaField } from "../../../components";
import { AppContext } from "../../../context/AppContext";
import { questionCreate, questionUpdate, questionGetAll, questionDelete } from "../../../api";

import type { NextPage } from "next";
import type { AxiosError, AxiosResponse } from "axios";

const Question: NextPage = () => {
    const queryClient = useQueryClient();

    const { questions, setQuestions } = React.useContext(AppContext);
    
    const [formData, setFormData] = React.useState({
        text: ""
    });

    const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast.loading("Loading... Please wait");

        createQuestion(formData);
    };

    const { mutate: createQuestion, isLoading: isCreatingQuestion } = useMutation(questionCreate, {
        onSuccess: (response: AxiosResponse) => {
            toast.dismiss();
            toast.success("Question Created Successfully");

            setFormData({
                text: ""
            });

            queryClient.refetchQueries(["questions"]);
        },
        onError: (error: AxiosError) => {
            toast.dismiss();
            toast.error(error.response?.data.message || error.message);
        }
    });

    const { mutate: updateQuestion, isLoading: isUpdatingQuestion } = useMutation(questionUpdate, {
        onSuccess: (response: AxiosResponse) => {
            toast.dismiss();
            toast.success("Question Updated Successfully");
        },
        onError: (error: AxiosError) => {
            toast.dismiss();
            toast.error(error.response?.data.message || error.message);
        }
    });

    const { mutate: deleteQuestion, isLoading: isDeletingQuestion } = useMutation(questionDelete, {
        onSuccess: (response: AxiosResponse) => {
            toast.dismiss();
            toast.success("Question Deleted Successfully");

            setQuestions((prevQuestions) => prevQuestions.filter((prevQuestion: any) => prevQuestion._id !== response.data.data._id));
        },
        onError: (error: AxiosError) => {
            toast.dismiss();
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

    return (
        <>
            <div className="h-full pt-3 mx-4">
                <div className="max-w-8xl m-auto">
                    <h1 className="my-5 text-2xl font-semibold">Manage Questions</h1>
                </div>

                <hr className="my-5 border-2" />
                <div>
                    <h2 className="text-xl font-semibold">Create Questions</h2>

                    <form id="addQuestionForm" className="mb-0 space-y-6 py-3" method="POST" onSubmit={HandleSubmit}>
                        <TextAreaField
                            label="Question Text"
                            value={formData.text}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, text: e.target.value })}
                            required={true}
                            name="text"
                        />

                        <div>
                            <button
                                disabled={isCreatingQuestion}
                                type="submit"
                                className="w-full flex justify-center py-4 px-4 rounded shadow-sm text-md font-semibold text-white bg-primary hover:bg-secondary mt-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>

                <div className="mt-10">
                    <h2 className="text-xl font-semibold">Manage Questions</h2>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        {questions.map((question: any) => (
                            <div key={question._id} className="p-5 bg-gray-100 rounded-lg">
                                <TextAreaField
                                    name="text"
                                    // value={null}
                                    required={true}
                                    label="Question Text"
                                    value={question.text}
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                        setQuestions((prevQuestions) => {
                                            const updatedQuestions = prevQuestions.map((prevQuestion: any) => {
                                                if (prevQuestion._id === question._id) {
                                                    return {
                                                        ...prevQuestion,
                                                        text: e.target.value
                                                    };
                                                }

                                                return prevQuestion;
                                            });

                                            return updatedQuestions as any;
                                        })
                                    }
                                />

                                <div className="flex justify-between mt-3">
                                    <button
                                        disabled={isUpdatingQuestion}
                                        onClick={() => updateQuestion({ id: question._id, data: { text: question.text } })}
                                        className="w-1/2 flex justify-center py-2 px-4 rounded shadow-sm text-md font-semibold text-white bg-primary hover:bg-secondary mt-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
                                    >
                                        Update
                                    </button>
                                    <button
                                        disabled={isDeletingQuestion}
                                        onClick={() => deleteQuestion(question._id)}
                                        className="w-1/2 flex justify-center py-2 px-4 rounded shadow-sm text-md font-semibold text-white bg-red-500 hover:bg-red-600 mt-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default withAuth(Question);
