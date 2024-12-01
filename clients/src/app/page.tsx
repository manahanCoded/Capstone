
import Link from "next/link";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
//Icons


export default function Home() {
  return (
    <>
    <Navbar/>
    <div className="mt-14 ">
      <MaxWidthWrapper className=" mb-14 w-full flex lg:flex-row flex-col justify-between items-center">
        <section className="w-full px-8 mt-8 mb-14 ">
          <h2 className="md:text-5xl text-4xl mb-4 font-semibold  text-[#333333]">
            Unlock the power of Blockchain
          </h2>
          <h3 className="md:text-2xl text-xl font-semibold py-2 px-6 mb-8  rounded-3xl shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
            Become a <span className="text-red-900">Crypto Warrior</span> Today
          </h3>
          <p className="mb-12">
            Explore blockchain. Whether you’re a beginner or expert, we provide
            the tools and community to help you thrive. Start your web3 journey
            here!
          </p>
          <Link
            href="/modules"
            className="md:text-xl text-lg py-3 px-6 rounded-3xl bg-red-900 hover:bg-red-950 text-white "
          >
            Get Started
          </Link>
        </section>
        <section className="w-full mt-6 flex md:justify-center justify-start ">
          <img
            src="/IMG_Dashboard/main.png"
            alt=""
            className="relative lg:left-0 -left-10 rounded  md:w-[90%] w-full"
          />
        </section>
      </MaxWidthWrapper>

      {/* PAGE 2 */}
      <section className="pt-14 pb-44  bg-gray-100">
        <MaxWidthWrapper className=" mb-10 text-center ">
          <h2 className="md:text-4xl text-2xl font-semibold text-[#333333]">
            Our <span className="text-red-900">Features</span> Specially For You
          </h2>
          <p className="md:text-lg text-md mt-1">
            When Something is easy to read, people might get so caught up in it
            that they mess some of the smaller details.
          </p>
        </MaxWidthWrapper>
        <MaxWidthWrapper className="flex flex-row justify-center items-center md:gap-4">
          <div className="group w-96 flex flex-col items-center ">
            <div className="w-[90%] overflow-hidden">
              <img
                src="/IMG_Dashboard/Features/modules.jpg"
                alt=""
                className="w-full rounded-md object-cover transition-transform duration-300 ease-in-out group-hover:scale-125"
              />
            </div>
            <section className="w-[90%] mt-4 flex md:flex-row flex-col justify-between md:items-center gap-4">
              <div className="">
                <h3 className=" md:text-xl font-semibold">Modules</h3>
                <p className="lg:text-base md:text-sm text-xs text-gray-500">
                  20 Modules 65 lessons
                </p>
              </div>
              <Link
                href="/modules"
                className="md:py-2 py-1 md:px-4 px-2 md:w-fit w-full text-center rounded-md text-white bg-red-900 hover:bg-red-950"
              >
                Visit
              </Link>
            </section>
          </div>

          <div className="group w-96 flex flex-col items-center">
            <div className="w-[90%] overflow-hidden">
              <img
                src="/IMG_Dashboard/Features/demos.jpg"
                alt=""
                className="w-full rounded-md object-cover transition-transform duration-300 ease-in-out group-hover:scale-125"
              />
            </div>
            <section className="w-[90%] mt-4 flex md:flex-row flex-col justify-between md:items-center gap-4">
              <div className="">
                <h3 className=" md:text-xl font-semibold">Demos</h3>
                <p className="lg:text-base md:text-sm text-xs text-gray-500">
                  10 Video demos
                </p>
              </div>
              <Link
                href="/modules"
                className="md:py-2 py-1 md:px-4 px-2 md:w-fit w-full text-center rounded-md text-white bg-red-900 hover:bg-red-950"
              >
                Visit
              </Link>
            </section>
          </div>

          <div className="group w-96 flex flex-col items-center">
            <div className="w-[90%] overflow-hidden">
              <img
                src="/IMG_Dashboard/Features/question.jpg"
                alt=""
                className="w-full rounded-md object-cover transition-transform duration-300 ease-in-out group-hover:scale-125"
              />
            </div>
            <section className="w-[90%] mt-4 flex md:flex-row flex-col justify-between md:items-center gap-4">
              <div className="">
                <h3 className=" md:text-xl font-semibold">Q&A</h3>
                <p className="lg:text-base md:text-sm text-xs text-gray-500">
                  Question and Answers
                </p>
              </div>
              <Link
                href="/modules"
                className="md:py-2 py-1 md:px-4 px-2 md:w-fit w-full text-center rounded-md text-white bg-red-900 hover:bg-red-950"
              >
                Visit
              </Link>
            </section>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Inserted Page */}
      <section className="relative -top-36 pt-14 ">
        <MaxWidthWrapper>
          <div className="flex flex-col justify-center items-center">
            <h3 className="w-fit py-3 px-6 z-10 rounded-2xl text-white bg-[#333333]">
              Partners
            </h3>
            <section className="relative -top-4 bg-white rounded-2xl">
              <div className=" flex flex-row justify-center items-center py-4 lg:px-8 rounded-2xl  shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]">
                <div className="flex flex-row items-center gap-2 md:py-4 md:px-12 px-4 py-2 border-r-2">
                  <img
                    className="md:h-12 h-10 rounded-full"
                    src="/IMG_Dashboard/Partners/cryptoWarriors.jpg"
                    alt=""
                  />
                  <p className="lg:text-xl md:text-lg text-sm">
                    Crypto Warriors
                  </p>
                </div>
                <div className="flex flex-row items-center gap-2 md:py-4 md:px-12 px-4 py-2 border-r-2">
                  <img
                    className="md:h-12 h-10 rounded-full"
                    src="/IMG_Dashboard/Partners/UC.jpg"
                    alt=""
                  />
                  <p className="lg:text-xl md:text-lg text-sm">
                    University of Cordilleras
                  </p>
                </div>
                <div className="flex flex-row items-center gap-2 md:py-4 md:px-12 px-4 ">
                  <img
                    className="md:h-12 h-10 rounded-full"
                    src="/IMG_Dashboard/Partners/UC.jpg"
                    alt=""
                  />
                  <p className="lg:text-xl md:text-lg text-sm">Chain Academy</p>
                </div>
              </div>
            </section>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* PAGE 3 */}
      <section className="relative -top-24 pt-14 ">
        <MaxWidthWrapper>
          <div className="w-full flex md:flex-row flex-wrap justify-center items-center lg:gap-8 gap-2">
            <section className="xl:w-72 lg:w-52 md:w-48 w-56  flex flex-col justify-center items-center gap-1 bg-gray-100">
              <img
                className=""
                src="/IMG_Dashboard/Feedbacks/jaybee.jpg"
                alt=""
              />
              <div className="p-4">
                <h4 className="py-2 lg:text-lg text-sm line-clamp-1 font-semibold text-red-900">
                  Jenna R., Web3 Enthusiast
                </h4>
                <p className="lg:text-base text-xs line-clamp-4 text-gray-800">
                &quot;This platform has been an absolute game-changer for me! I
                  came in knowing almost nothing about Web3, blockchain, and
                  crypto, and the courses here are easy to follow yet incredibly
                  thorough. The step-by-step tutorials make complex topics feel
                  accessible, and there&apos;s always extra material for diving
                  deeper. It&apos;s the perfect place for beginners and enthusiasts
                  alike.&quot;
                </p>
              </div>
            </section>

            <section className="xl:w-72 lg:w-52  md:w-48 w-56  flex flex-col justify-center items-center gap-1 bg-gray-100">
              <div className="p-4">
                <h4 className="py-2 lg:text-lg text-sm line-clamp-1 font-semibold text-red-900">
                  Tom K.
                </h4>
                <p className="lg:text-base text-xs line-clamp-4 text-gray-800">
                  &quot;I love the interactive quizzes and projects! This isn&apos;t just
                  a passive learning experience—you actually get hands-on
                  practice with creating wallets, smart contracts, and even
                  deploying small decentralized apps. The community forum is
                  also a plus; you get to connect with like-minded people and
                  the course instructors are super responsive. I feel much more
                  confident now in understanding Web3.&quot;
                </p>
              </div>
              <img
                className=""
                src="/IMG_Dashboard/Feedbacks/jaybee.jpg"
                alt=""
              />
            </section>

            <section className="xl:w-72 lg:w-52 md:w-48 w-56  flex flex-col justify-center items-center gap-1 bg-gray-100">
              <img
                className=""
                src="/IMG_Dashboard/Feedbacks/jaybee.jpg"
                alt=""
              />
              <div className="p-4">
                <h4 className="py-2 lg:text-lg text-sm line-clamp-1 font-semibold text-red-900">
                  Alex T.
                </h4>
                <p className="lg:text-base text-xs line-clamp-4 text-gray-800">
                  &quot;I love the interactive quizzes and projects! This isn&apos;t just
                  a passive learning experience—you actually get hands-on
                  practice with creating wallets, smart contracts, and even
                  deploying small decentralized apps. The community forum is
                  also a plus; you get to connect with like-minded people and
                  the course instructors are super responsive. I feel much more
                  confident now in understanding Web3.&quot;
                </p>
              </div>
            </section>

            <section className="xl:w-72 lg:w-52 md:w-48 w-56  flex flex-col justify-center items-center gap-1 bg-gray-100">
              <div className="p-4">
                <h4 className="py-2 lg:text-lg text-sm line-clamp-1 font-semibold text-red-900">
                  Sarah M.
                </h4>
                <p className="lg:text-base text-xs line-clamp-4 text-gray-800">
                  &quot;I love the interactive quizzes and projects! This isn&apos;t just
                  a passive learning experience—you actually get hands-on
                  practice with creating wallets, smart contracts, and even
                  deploying small decentralized apps. The community forum is
                  also a plus; you get to connect with like-minded people and
                  the course instructors are super responsive. I feel much more
                  confident now in understanding Web3.&quot;
                </p>
              </div>
              <img
                className=""
                src="/IMG_Dashboard/Feedbacks/jaybee.jpg"
                alt=""
              />
            </section>
          </div>
        </MaxWidthWrapper>
      </section>

      {/*Footer Section */}
      <footer className="text-sm ">
        <MaxWidthWrapper className="">
          <section className="pt-12 pb-8 flex justify-center items-center border-t-2">
            
            <form className="flex flex-row items-center bg-gray-100 md:p-8 p-4 md:gap-8 gap-4">
            <img
              className="md:h-14 h-12"
              src="https://substackcdn.com/image/fetch/w_96,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F051da1ed-7e17-4ab0-9645-3510a8958a7a_1000x1000.png"
              alt=""
            />
              <div className="flex flex-row items-center">
                <input
                  className="h-10 py-2 px-4 border border-r-0 rounded-l-md"
                  placeholder="Get Updates"
                  type="email"
                />
                <button className="h-10 py-1 px-2 rounded-r-md text-white bg-red-900">
                Subscribe Now
                </button>
              </div>
            </form>
          </section>
        </MaxWidthWrapper>
        <MaxWidthWrapper className="h-14 flex flex-row justify-between items-center bg-gray-100  md:text-sm text-xs">
          <Link href="/" className="">
            <p>&copy;2024 cryptowarriors.com</p>
          </Link>

          <div className="flex flex-row  items-center md:gap-8 gap-2">
            <Link
              href="/"
              className="cursor-pointer hover:underline decoration-2 "
            >
              Legal Terms
            </Link>
            <Link
              href="/"
              className="cursor-pointer hover:underline decoration-2 "
            >
              Terms and Conditions
            </Link>
            <Link
              href="/"
              className="cursor-pointer hover:underline decoration-2 "
            >
              Privacy Policy
            </Link>
          </div>

          <div className=" flex flex-row items-center md:gap-4 gap-1">
            <a href="https://www.facebook.com/CryptoWarriors111"><img className="md:h-8 h-6" src="/Icons/facebook.png" alt="" /></a>
            <a href="https://www.linkedin.com/company/cwarriorsph/"><img className="md:h-8 h-6" src="/Icons/linkedin.png" alt="" /></a>
          </div>
        </MaxWidthWrapper>
      </footer>
    </div>
    </>
  );
};


