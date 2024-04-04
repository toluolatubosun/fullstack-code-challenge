import React from "react";
import { hasCookie } from "cookies-next";
import { useQuery } from "@tanstack/react-query";
import { NextRouter, useRouter } from "next/router";

import { userGetMe } from "../api";
import { Loading } from "../components";

import type { AxiosError } from "axios";

const withAuth = (WrappedComponent: React.FC) => {
    const NewComponent = () => {
        const router: NextRouter = useRouter();

        // Check if user has access token
        const hasAccessToken = hasCookie("access_token");

        console.log(hasAccessToken);

        React.useEffect(() => {
            if (!hasAccessToken) {
                // If auth token is not in cookie, redirect to login page
                router.push("/auth/login");
            }
        }, []);

        // If auth token is in cookie, check if it is valid
        const { isLoading } = useQuery(["auth-user"], userGetMe, {
            onError: (error: AxiosError) => {
                const message = error.response ? error.response.data.message : error.message;
                // Handle invalid auth token error and redirect somewhere
                router.push("/");
            },
            enabled: hasAccessToken
        });

        return isLoading ? <Loading isParent={true} /> : <WrappedComponent />;
    };

    return NewComponent;
};

export default withAuth;
