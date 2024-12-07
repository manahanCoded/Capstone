"use client"
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import checkAdmin from "@/Configure/checkAdmin";

interface checkApplicants {
    id: string
    jobid: string
    job_title: string
    email: string
    application: string
    date: string
    resume: string
    fullname: string
}

interface reply {
    admin: string,
    aplicant_name: string,
    reply: string,
    type: string,
    date: String
}

export default function ForumDashboard() {
    const [checkAdmin ,setCheckAdmin] = useState<checkAdmin | null>(null)
    const pathName = usePathname()
    const [applicants, setApplicants] = useState<checkApplicants[]>([])
    const [mail, setMail] = useState<checkApplicants | null>(null);
    const [reply, setReply] = useState({
        admin: "",
        aplicant_name: mail?.fullname,
        reply: "",
        type: "job",
        date: new Date().toISOString().split("T")[0],
    })
    const [successReply, setSuccessReply] = useState(false)

    const router = useRouter()

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
            setReply((prev)=>(({...prev, admin: data.email})))

            if (data.role === "client") {
              router.push("/forum");
            }

    
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

    useEffect(() => {
        const application = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/job/display-appointment");
                setApplicants(res.data);
                setMail(res.data[0]);
            } catch (error) {
                console.error("Error fetching applicants:", error);
            }
        };
        application();
    }, []);

    const handleEmail = (e: React.MouseEvent<HTMLButtonElement>): void => {
        const emailValue: checkApplicants | undefined = applicants.find(
            (applicant) => applicant.id == e.currentTarget.id
        );
        console.log(e.currentTarget.id)

        setMail(emailValue ?? null);
    };

    const formattedDate = mail?.date ? new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    }).format(new Date(mail.date)) : '';

    const handleReply = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const res = await axios.post("http://localhost:5000/api/mail/sendMail", reply, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        })
            setSuccessReply(true)
            setReply({
                admin: checkAdmin?.email || "", 
                aplicant_name: mail?.fullname || "", 
                reply: "", 
                type: "job", 
                date: new Date().toISOString().split("T")[0],
            });
    }

    useEffect(() => {
        if (mail) {
            setReply((prev) => ({
                ...prev,
                aplicant_name: mail.fullname || "",
            }));
        }
    }, [mail]);

    return (
        <div className="mt-14 text-sm">
            <form>
                <MaxWidthWrapper className="h-12 flex flex-row justify-between items-center border-b-2 ">
                    <section className=" flex flex-row justify-between gap-2 overflow-hidden ">
                        <Link href={"/"} className="w-20  flex justify-center items-center hover:text-gray-500 font-semibold  px-3 py-2 cursor-pointer">
                            Accounts
                        </Link>
                        <Link href={"/modules/modules-dashboard"} className={`${pathName === "/modules/modules-dashboard" ? "px-3 py-2 rounded-2xl bg-gray-200 border-[1px]" : ""}w-20  flex justify-center items-center hover:text-gray-500 font-semibold cursor-pointer `}>
                            Module
                        </Link>
                        <Link href={"/forum/forum-dashboard"} className={`${pathName === "/forum/forum-dashboard" ? "px-3 py-2 rounded-2xl bg-gray-200 border-[1px]" : ""}w-20  flex justify-center items-center hover:text-gray-500 font-semibold px-3 py-2  cursor-pointer`}>
                            Forum
                        </Link>
                    </section>
                </MaxWidthWrapper>
            </form>

            <div className="h-screen flex flex-row ">
                <div className="h-full lg:w-[32%] md:w-[52%] flex flex-col border-r-[1px] ">
                    <form className="min-h-12 w-full border-b-[1px]">
                        <MaxWidthWrapper className="h-full flex gap-2 flex-row justify-between items-center ">
                            <div className="flex items-center w-full  border-2 rounded-full pr-2 border-gray-400">
                                <input className="w-full px-4 py-1 rounded-s-full mr-1" placeholder="Search" type="text" />
                                <button><SearchOutlinedIcon className="text-gray-500" /></button>
                            </div>
                            <div className="flex items-center justify-center w-32">
                                <p>All Jobs</p>
                                <ArrowDropDownIcon />
                            </div>
                        </MaxWidthWrapper>
                    </form>
                    <section className="h-full overflow-y-auto py-4 ">
                        <MaxWidthWrapper>
                            {applicants?.map((applicant, index) => {
                                const formattedDate = new Intl.DateTimeFormat('en-US', {
                                    month: 'short',
                                    day: '2-digit',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true,
                                }).format(new Date(applicant.date)); // Format the date

                                return (
                                    <section
                                        key={index}
                                        onClick={handleEmail}
                                        id={applicant.id}
                                        className="p-3 mt-3 flex flex-col gap-2 rounded-sm text-sm cursor-pointer hover:bg-slate-200 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
                                    >
                                        <div className="flex flex-row justify-between">
                                            <h3 className="font-semibold">{applicant.fullname}</h3>
                                            <p className="text-xs text-gray-400">{formattedDate}</p>
                                        </div>
                                        <p className="line-clamp-2 text-xs">{applicant.application}</p>
                                        <p className="bg-black py-1 px-2 rounded-lg text-white text-[10px] font-semibold w-fit">{applicant.job_title}</p>
                                    </section>
                                );
                            })}
                        </MaxWidthWrapper>
                    </section>
                </div>
                <div className="w-full md:flex lg:flex-row flex-col ">
                    <section className="lg:w-2/3 shadow">
                        <MaxWidthWrapper className="p-4 border-b-[1px] flex flex-row justify-between items-center text-xs">
                            <div className="flex flex-row items-center gap-1">
                                <AccountCircleIcon style={{ fontSize: '2.5rem' }} />
                                <div className="flex flex-col">
                                    <p>{mail?.fullname}</p>
                                    <p>{mail?.email}</p>
                                </div>
                            </div>
                            <p>{formattedDate}</p>
                        </MaxWidthWrapper>

                        <MaxWidthWrapper className="p-4">
                            <p>{mail?.fullname}</p>
                            <h2 className="text-md font-semibold">Application Details</h2>
                            <p>{mail?.application}</p>
                            <img src={`http://localhost:5000${mail?.resume}`} alt="Resume" />
                        </MaxWidthWrapper>
                    </section>
                    <section className="sticky top-14 flex items-center lg:w-1/3  h-fit">
                        <form onSubmit={handleReply} className="flex flex-col gap-4 p-4 border-y-[1px] w-full mt-10 ">
                            <textarea className="lg:h-96 h-16 lg:rounded-none rounded-sm w-full  focus:outline-none focus:ring-1 py-4 px-2 focus:ring-black shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
                                placeholder={`Reply to ${mail?.fullname}`}
                                value={reply.reply}
                                required
                                onChange={(e)=>(setReply({...reply, reply: e.target.value}))}
                                ></textarea>
                            <div className="flex flex-row justify-between">
                            <p className="text-green-600" > {successReply? "Reply Sent" : null}</p>
                            <button className=" py-2 px-6 rounded-md font-semibold text-sm text-white bg-black">Send</button>
                            </div>
                        </form>
                    </section>


                </div>
            </div>


        </div >
    )
}
