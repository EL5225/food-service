import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthLayout } from "../../layouts";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useOTP } from "../../utils";
import OTPInput from "react-otp-input";
import clsx from "clsx";
import { Spinner } from "../../components";

export const VerifyOTP = () => {
  const [isError, setIsError] = useState(false);
  const [timer, setTimer] = useState(120);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  const email = searchParams.get("email");

  const navigate = useNavigate();

  const { send, verify } = useOTP();

  const inputStyle = clsx(
    "!w-[3rem] p-4 text-lg border border-black rounded-md md:!w-[4rem]",
    {
      "border border-secodary-green-1 ": !isError,
      "border border-red-4 ": isError,
    }
  );
  const containerStyle = clsx("flex justify-center w-full ");

  useEffect(() => {
    if (!email) {
      navigate("/register");
    }
  }, []);

  const countDownTimer = () => setTimer((t) => t - 1);

  useEffect(() => {
    const interval = setInterval(countDownTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleOTP = async () => {
    try {
      await verify({
        email: email,
        otpCode: otp,
      });

      toast.success("Berhasil verifikasi email", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/login");
    } catch (error) {
      setIsError(true);
    }
  };

  useEffect(() => {
    if (otp.length === 6) {
      handleOTP();
    }
  }, [otp]);

  return (
    <AuthLayout title="Verifikasi Email" width="w-fit" noForm={true}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <h3 className="w-[70%] font-medium text-slate-600">
        Silahkan cek email <span className="text-black">{email}</span> untuk
        mendapatkan OTP
      </h3>
      <form className="flex flex-col gap-4 font-semibold" onSubmit={handleOTP}>
        <OTPInput
          renderSeparator={<span className="md:mx-4 mx-1"></span>}
          numInputs={6}
          value={otp}
          onChange={setOtp}
          renderInput={(props) => <input {...props} />}
          containerStyle={containerStyle}
          inputStyle={inputStyle}
        />

        {timer < 0 ? (
          isLoading ? (
            <Spinner width="w-5" height="h-5" />
          ) : (
            <span
              onClick={async () => {
                setIsLoading(true);
                await send({
                  email: email,
                });

                setIsLoading(false);
                setTimer(120);
                toast.success("OTP telah dikirim ulang", {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              }}
              className="hover:underline underline-offset-4 font-semibold cursor-pointer">
              Kirim Ulang
            </span>
          )
        ) : (
          <span className="text-slate-500">{timer}</span>
        )}
      </form>
    </AuthLayout>
  );
};
