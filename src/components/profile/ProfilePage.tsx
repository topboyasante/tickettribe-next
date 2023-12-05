"use client";
import Avatar from "react-avatar";
import { useForm } from "react-hook-form";
import Loader from "../ui/loaders/Loader";
import { useFetchUser } from "@/hooks/useFetch";
import { useEffect } from "react";
import useMutationRequest from "@/hooks/useMutationRequest";

function ProfilePage() {
  const { User, isFetchingUser } = useFetchUser("user");
  const {UpdateProfile,isUpdatingProfile} = useMutationRequest()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<User>({
    defaultValues: { name: User?.name, email: User?.email },
  });

  //Update the form's default values with the data from the API
  useEffect(() => {
    if (User) {
      reset(User);
    }
  }, [User]);

  function onSubmit(data:User){
    const payload = {
      fullName:data.name
    }
    UpdateProfile(payload)
  }

  return (
    <section className="max-w-screen-xl mx-auto p-5">
      {/* Heading */}
      <section className="w-full">
        <img
          src="https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?auto=format&fit=crop&q=80&w=1978&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="user-cover-img"
          className="w-full h-[200px] object-cover"
        />
        <section className="p-5 lg:px-0">
          {isFetchingUser ? (
            <section className="w-full h-full flex justify-center items-center my-5">
              <Loader width="50" height="50" color="#006d77" />
            </section>
          ) : (
            <section>
              <section className="flex items-center gap-3">
                <Avatar
                  name={User?.name}
                  maxInitials={2}
                  size="60"
                  round={true}
                />
                <section>
                  <h2 className="text-xl">{User?.name}</h2>
                  <p className="text-[#777777] text-sm">{User?.email}</p>
                </section>
              </section>
            </section>
          )}
        </section>
      </section>
      <hr className="my-5 dark:border-[#404040]" />
      {/* Content */}
      <section>
        <h1 className="text-2xl font-bold">Edit Profile</h1>
        <br />
        <form onSubmit={handleSubmit(onSubmit)}>
          <section>
            <label htmlFor="description">Name</label>
            <br />
            <input
              type="text"
              className="border-2 dark:border-[#404040] w-full rounded mt-2 px-2 py-1 outline-none appearance-none bg-transparent"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <small className="text-red-600">{errors.name.type}</small>
            )}
          </section>
          <br />
          <section>
            <label htmlFor="description">Email</label>
            <br />
            <input
              type="text"
              disabled
              className="border-2 dark:border-[#404040] w-full rounded mt-2 px-2 py-1 outline-none appearance-none bg-transparent"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <small className="text-red-600">{errors.email.type}</small>
            )}
          </section>
          <br />
          <button
            className="bg-primary-light text-white dark:bg-primary-dark dark:text-black px-4 py-2 rounded"
            disabled={isSubmitting}
            type="submit"
          >
            {isUpdatingProfile ? (
              <Loader width="20" height="20" color="#006d77" />
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </section>
    </section>
  );
}

export default ProfilePage;
