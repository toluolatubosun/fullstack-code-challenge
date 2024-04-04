import React from "react";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

import { withAuth } from "../../../utils";
import { userGetAll } from "../../../api";
import { AppContext } from "../../../context/AppContext";

import type { NextPage } from "next";
import type { AxiosError, AxiosResponse } from "axios";

const Users: NextPage = () => {
    const { users, setUsers } = React.useContext(AppContext);

   useQuery(["users"], userGetAll, {
        onSuccess: (response: AxiosResponse) => {
            setUsers(response.data.data);
        },
        onError: (error: AxiosError) => {
            toast.error(error.response?.data.message || error.message);
        }
    });

    return (
        <>
            <div className="h-full pt-3 mx-4">
                <div className="max-w-8xl m-auto">
                    <h1 className="my-5 text-2xl font-semibold">Manage User</h1>
                </div>

                <hr className="my-5 border-2" />

                <div>
                    <h2 className="text-xl font-semibold">All Users</h2>

                    <ul className="space-y-3 mt-3">
                        {users.map((user: any) => (
                            <>
                                <li key={user._id}>
                                    <h1 className="text-blue-500">{user.name}</h1>

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

export default withAuth(Users);
