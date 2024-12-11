
import checkAdmin from '@/Configure/checkAdmin';
import checkApplicants from '@/Configure/checkApplicants';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import Link from "next/link";
import { useEffect, useState } from 'react';

interface EmailsProps {
    checkUser: checkAdmin;
}

export default function Emails({checkUser}: EmailsProps){
    const [aplications, setApplications] = useState<checkApplicants[]>([])

    if (!checkUser) {
        return <div>No user found.</div>; 
    }

    useEffect(() => {
        async function fetchApplications() {
            try {
                const res = await axios.get(`http://localhost:5000/api/job/display-user-appointment/${checkUser?.email}`)
                setApplications(res.data);

            } catch (error) {
                console.error("Error fetching applications:", error);
            }
        }
        fetchApplications()
    })
    return(
        <section className="flex-col p-4  h-full w-full text-black  overflow-y-auto">
        <h2 className="text-xl tracking-wide font-semibold bg-red-600 text-white w-fit rounded-full py-1 px-3">Applications</h2>
        <div className="flex flex-col gap-2 mt-6">
            {aplications.map((application, index) => {
                 const formattedDate = new Intl.DateTimeFormat("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                }).format(new Date(application.date));

               return(<section key={index}
                    className="flex flex-col gap-2 border-[1px] rounded-md py-2 px-4"
                >
                    <div className="flex flex-row justify-between items-center text-xs">
                        <p className="line-clamp-1">{application.fullname}</p>
                        <p>{formattedDate}</p>
                    </div>
                    <h3 className="font-semibold ">{application.job_title}</h3>
                    <div className="px-3 flex justify-end w-full text-xs">
                        <Link href={"/email"} className="bg-black p-2 text-white rounded-md">Check Email</Link>
                    </div>
                </section>
            )})} 
        </div>
    </section>
    )
}