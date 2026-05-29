import { useRef, useState } from "react";
import { useNavigate } from "react-router";

export default function Otp() {
  const length = 6;
  const navigate = useNavigate();

  const [otp, setOtp] = useState(
    Array(length).fill("")
  );

  const inputsRef = useRef([]);

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
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleContinue = () => {
    navigate('/dashboards/project');
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full bg-white">
	<div className="p-4 sm:p-6 md:p-8 flex flex-col w-full max-w-md">
		<h1 className="text-2xl sm:text-3xl font-semibold text-center">Enter 6-digit code</h1>
		<p className="text-gray-400 text-sm sm:text-base mt-3 text-center">We sent a verification code to your email</p>
    <div className="flex gap-2 sm:gap-3 mt-6 justify-center">
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
          onChange={(e) =>
            handleChange(e.target.value, index)
          }
          onKeyDown={(e) =>
            handleKeyDown(e, index)
          }
          className="
            h-12 sm:h-14 w-12 sm:w-14
            rounded-xl
		   shadow-xs
		border
		border-gray-200
            text-center
            text-lg sm:text-xl
            font-semibold
            outline-none
            focus:border-blue-500
          "
        />
      ))}
    </div>
	<p className="text-gray-400 text-xs sm:text-sm mt-4 sm:mt-6 text-center">You didn't receive code? <span className="text-blue-400 cursor-pointer">Resend code</span></p>
	<div className="mt-6 sm:mt-10 w-full">
		<button onClick={handleContinue} className="py-2 sm:py-3 px-4 rounded-full bg-blue-500 text-white text-lg sm:text-2xl w-full font-medium hover:bg-blue-600 transition">Continue</button>
	</div>
	</div>
    </div>
  );
}
