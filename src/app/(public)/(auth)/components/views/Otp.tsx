import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import useJwtAuth from "@auth/services/jwt/useJwtAuth";

export default function Otp() {
  const length = 6;
  const navigate = useNavigate();
  const { user } = useJwtAuth();
  const crm = user?.crm as { isPlatformAdmin?: boolean } | undefined;

  const [otp, setOtp] = useState(Array(length).fill(""));

  const inputsRef = useRef([]);

  useEffect(() => {
    if (crm?.isPlatformAdmin) {
      navigate("/dashboards/project", { replace: true });
    }
  }, [crm?.isPlatformAdmin, navigate]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleContinue = () => {
    navigate("/dashboards/project");
  };

  if (crm?.isPlatformAdmin) {
    return null;
  }

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-slate-50 p-4 sm:p-6 md:p-8">
      {/* OTP verification container */}
      <div className="flex flex-col w-full max-w-md bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-100/80 transition-all duration-300 hover:shadow-2xl">
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-center text-slate-800 tracking-tight">
          Enter 6-digit code
        </h1>
        <p className="text-slate-400 text-sm sm:text-base mt-2 text-center leading-relaxed">
          We sent a verification code to your email
        </p>

        <div className="flex gap-2 sm:gap-3 mt-8 justify-center">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputsRef.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="
                h-12 sm:h-14 w-12 sm:w-14
                rounded-xl
                border-2
                border-slate-200
                text-center
                text-xl sm:text-2xl
                font-bold
                text-slate-700
                bg-slate-50/50
                outline-none
                transition-all
                duration-200
                focus:border-blue-500
                focus:bg-white
                focus:shadow-lg
                focus:shadow-blue-500/10
              "
            />
          ))}
        </div>

        <p className="text-slate-400 text-xs sm:text-sm mt-6 text-center">
          You didn't receive code?{" "}
          <span className="text-blue-500 font-semibold hover:text-blue-600 cursor-pointer transition">
            Resend code
          </span>
        </p>

        <div className="mt-8 w-full">
          <button
            onClick={handleContinue}
            className="py-3 px-6 rounded-2xl bg-blue-500 text-white text-base sm:text-lg w-full font-bold shadow-lg shadow-blue-500/25 hover:bg-blue-600 hover:shadow-blue-600/35 hover:-translate-y-0.5 active:translate-y-0 transition duration-200 cursor-pointer"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
