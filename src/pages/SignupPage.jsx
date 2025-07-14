import AuthLayout from "../Layouts/AuthLayout";
import SignupForm from "../components/AuthForms/SignUpForm";

const SignupPage = () => {
  return (
    <AuthLayout>
        <div className=" ">

      <div className="relative flex items-center justify-center h-screen md:right-[50%]">
        
        <div className="-rotate-90 w-[650px] h-[436px] bg-[url('/src/assets/images/SignUp.jpg')] bg-contain bg-no-repeat bg-center rounded-xl shadow-2xl z-0">
        </div>
        <div className="absolute z-10 translate-x-[300px] motion-preset-slide-left">
          <SignupForm />
        </div>
        
      </div>
        </div>
    </AuthLayout>
  );
};

export default SignupPage;
