import React from "react";
import Head from "next/head";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "../styles/globals.css";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
    const [queryClient] = React.useState(() => new QueryClient({ defaultOptions: { queries: { retry: false } } }));

    const [users, setUsers] = React.useState([]);
    const [answers, setAnswers] = React.useState([]);
    const [questions, setQuestions] = React.useState([]);

    return (
        <>
            <Head>
                <title>Limbic Clinic</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <ToastContainer newestOnTop={true} pauseOnHover={false} autoClose={3000} />

            <QueryClientProvider client={queryClient}>
                <AppContext.Provider value={{ users, setUsers, answers, setAnswers, questions, setQuestions }}>
                    <div className="font-Poppins h-screen">
                        <Component {...pageProps} />
                    </div>

                    <ReactQueryDevtools initialIsOpen={false} />
                </AppContext.Provider>
            </QueryClientProvider>
        </>
    );
}

export default MyApp;
