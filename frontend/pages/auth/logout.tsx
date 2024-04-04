import React, { useEffect } from "react";
import type { NextPage } from "next";

import { withAuth } from "../../utils";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import { Loading } from "../../components";

const Logout: NextPage = () => {
    const router = useRouter();

    useEffect(() => {
        setCookie("access_token", "", { expires: new Date(0) });
        router.replace("/");
    }, []);

    return (
        <>
            <main className="flex min-h-screen flex-col items-center p-5">
                <div className="max-w-8xl m-auto">
                    <h3 className="my-5 text-5xl font-semibold">Logging You Out</h3>

                    <Loading isParent={false} />
                </div>
            </main>
        </>
    );
};

export default withAuth(Logout);
