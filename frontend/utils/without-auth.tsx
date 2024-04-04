import React from "react";
import { hasCookie } from "cookies-next";
import { NextRouter, useRouter } from "next/router";

const withoutAuth = (WrappedComponent: React.FC) => {
    const NewComponent = () => {
        const router: NextRouter = useRouter();
        const hasAccessToken = hasCookie("access_token");

        if (hasAccessToken) {
            router.replace("/app/find-users");
            return <></>;
        }

        return <WrappedComponent />;
    };

    return NewComponent;
};

export default withoutAuth;
