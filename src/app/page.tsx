import Image from "next/image";
import FormContainer from "./components/formContainer";

export default function Home() {
  return (
     <div className="flex flex-col justify-center items-center w-screen h-screen">  
      <FormContainer />
    </div>
  );
}
