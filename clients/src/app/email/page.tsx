"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AdminEmail from "./admin-email/AdminEmail";
import UserEmail from "./user-email/UserEmail";

export default function Email() {
    const router = useRouter();
    const [checkAdmin, setCheckAdmin] = useState<any>(null); // Use appropriate type for state

    useEffect(() => {
        async function checkUser() {
            try {
                const res = await fetch("http://localhost:5000/api/user/profile", {
                    method: "GET",
                    credentials: "include",
                });

                if (!res.ok) {
                    router.push("/user/login");
                    return;
                }

                const data = await res.json();
                setCheckAdmin(data);

            } catch (err) {
                if (axios.isAxiosError(err) && err.response) {
                    if (err.response.status === 401 || err.response.status === 403) {
                        router.push("/user/login");
                    }
                } else {
                    alert("Failed to fetch user profile.");
                    console.error(err);
                }
            }
        }

        checkUser();
    }, []);



    if (checkAdmin?.role === "client") {
        return <UserEmail />;
    } else {
        return <AdminEmail />;
    }
}
