import MaxWidthWrapper from "@/components/MaxWidthWrapper";


const ModalQuiz = ({
  quiz
}: {
  quiz: ()=> void;
}) => {

  return (
    <div className={" fixed inset-0 z-40 bg-[#2a212190] "}>
      <MaxWidthWrapper>
        <section className="w-[60%] h-screen mx-auto flex items-center justify-center backdrop-blur-sm">
            <div className="w-full bg-white">
            <h1>Hello</h1>
            <button onClick={quiz}>
                CLOSE
            </button>
            </div>
        </section>
      </MaxWidthWrapper>
    </div>
  );
}

export default ModalQuiz