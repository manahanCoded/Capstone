import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function UserEmail(){
    const router = useRouter()
    const [checkUser, setCheckUser] = useState<any>(null);

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
                setCheckUser(data);

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
    }, [router]);

    return(
        <div className="mt-14">
            <h1 className="text-3xl">{checkUser?.email}</h1>
        </div>
    )
}