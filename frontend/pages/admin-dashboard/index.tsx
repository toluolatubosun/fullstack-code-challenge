import React from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

import { userGetAdminStats } from "../../api";
import { useUser, withAuth } from "../../utils";

import type { NextPage } from "next";
import type { AxiosError, AxiosResponse } from "axios";

interface AdminStats {
    totalUsers: number;
    totalAnswers: number;
    totalQuestions: number;
}

const AdminDashboard: NextPage = () => {
    const { user } = useUser();

    const [adminStats, setAdminStats] = React.useState<AdminStats | null>(null);
    
    useQuery(["admin-stats"], userGetAdminStats, {
        onSuccess: (response: AxiosResponse) => {
            setAdminStats(response.data.data);
        },
        onError: (error: AxiosError) => {
            toast.error(error.response?.data.message || error.message);
        }    
    });

    return (
        <>
            <div className="h-full pt-3 mx-4">
                <div className="max-w-8xl m-auto">
                    <h1 className="my-5 text-2xl font-semibold">Welcome, {user?.name}</h1>
                </div>

                <hr className="my-5 border-2" />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="p-5 bg-gray-100 rounded-lg">
                        <h2 className="text-xl font-semibold">Total Users</h2>
                        <p className="text-3xl font-bold my-2">{adminStats?.totalUsers || 0}</p>
                        <Link href="/admin-dashboard/users">
                            <a className="text-blue-500 underline">Manage Users</a>
                        </Link>
                    </div>
                    <div className="p-5 bg-gray-100 rounded-lg">
                        <h2 className="text-xl font-semibold">Total Questions</h2>
                        <p className="text-3xl font-bold my-2">{adminStats?.totalQuestions || 0}</p>
                        <Link href="/admin-dashboard/questions">
                            <a className="text-blue-500 underline">Manage Questions</a>
                        </Link>
                    </div>
                    <div className="p-5 bg-gray-100 rounded-lg">
                        <h2 className="text-xl font-semibold">Total Answers</h2>
                        <p className="text-3xl font-bold my-2">{adminStats?.totalAnswers || 0}</p>
                        <Link href="/admin-dashboard/answers">
                            <a className="text-blue-500 underline">Manage Answers</a>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default withAuth(AdminDashboard);
