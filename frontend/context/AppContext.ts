import React from "react";

export const AppContext = React.createContext<{
    users: any[];
    setUsers: React.Dispatch<React.SetStateAction<never[]>>;

    answers: any[];
    setAnswers: React.Dispatch<React.SetStateAction<never[]>>;

    questions: any[];
    setQuestions: React.Dispatch<React.SetStateAction<never[]>>;
}>({
    users: [],
    setUsers: () => null,

    answers: [],
    setAnswers: () => null,

    questions: [],
    setQuestions: () => null
});