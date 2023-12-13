"use client";
import Button from "@/components/ui/buttons/Button";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

function ChangePassword() {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showOldPassword, setshowOldPassword] = useState(false);
  const { register, handleSubmit } = useForm<ChangePasswordInput>();
  const { ChangePassword, IsChangingPassword } = useAuth();

  function onSubmit(data: ChangePasswordInput) {
    if (data.newpassword !== data.confirm_password) {
      toast.error("New Passwords are not the same");
      return;
    }
    ChangePassword({
      oldpassword: data.oldpassword,
      newpassword: data.newpassword,
    });
  }

  return (
    <section>
      <section className="max-w-screen-xl mx-auto">
        <section className="p-5">
          <section>
            <h1 className="font-semibold text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-2">
              Change Password
            </h1>
            <p className="text-[#777777]">Change your Password</p>
          </section>
          <hr className="my-5" />
          <section>
            <form onSubmit={handleSubmit(onSubmit)}>
              <section>
                <label htmlFor="password" className="font-semibold">
                  Old Password
                </label>
                <section className="flex items-center border-2 dark:border-[#404040] bg-transparent  w-full rounded px-4 py-2 lg:px-2 lg:py-1">
                  <input
                    type={showOldPassword ? "text" : "password"}
                    placeholder="Enter your old password"
                    className="w-full outline-none bg-transparent dark:text-white"
                    {...register("oldpassword", { required: true })}
                  />
                  <section className="w-[5%] flex justify-center items-center">
                    {showOldPassword ? (
                      <div onClick={() => setshowOldPassword(!showOldPassword)}>
                        <AiOutlineEyeInvisible />
                      </div>
                    ) : (
                      <div onClick={() => setshowOldPassword(!showOldPassword)}>
                        <AiOutlineEye />
                      </div>
                    )}
                  </section>
                </section>
              </section>
              <br />
              <section>
                <label htmlFor="password" className="font-semibold">
                  New Password
                </label>
                <section className="flex items-center border-2 dark:border-[#404040] bg-transparent  w-full rounded px-4 py-2 lg:px-2 lg:py-1">
                  <input
                    type={showPassword1 ? "text" : "password"}
                    placeholder="Enter your new password"
                    className="w-[95%] outline-none bg-transparent dark:text-white"
                    {...register("newpassword", { required: true })}
                  />
                  <section className="w-[5%] flex justify-center items-center">
                    {showPassword1 ? (
                      <div onClick={() => setShowPassword1(!showPassword1)}>
                        <AiOutlineEyeInvisible />
                      </div>
                    ) : (
                      <div onClick={() => setShowPassword1(!showPassword1)}>
                        <AiOutlineEye />
                      </div>
                    )}
                  </section>
                </section>
              </section>
              <br />
              <section>
                <label htmlFor="password" className="font-semibold">
                  Confirm Password
                </label>
                <section className="flex items-center border-2 dark:border-[#404040] bg-transparent  w-full rounded px-4 py-2 lg:px-2 lg:py-1">
                  <input
                    type={showPassword2 ? "text" : "password"}
                    placeholder="Confirm your new password"
                    className="w-[95%] outline-none bg-transparent dark:text-white"
                    {...register("confirm_password", { required: true })}
                  />
                  <section className="w-[5%] flex justify-center items-center">
                    {showPassword2 ? (
                      <div onClick={() => setShowPassword2(!showPassword2)}>
                        <AiOutlineEyeInvisible />
                      </div>
                    ) : (
                      <div onClick={() => setShowPassword2(!showPassword2)}>
                        <AiOutlineEye />
                      </div>
                    )}
                  </section>
                </section>
              </section>
              <br />
              <Button
                size="sm"
                type="primary"
                isPerformingAction={IsChangingPassword}
              >
                Save Changes
              </Button>
            </form>
          </section>
        </section>
      </section>
    </section>
  );
}

export default ChangePassword;
