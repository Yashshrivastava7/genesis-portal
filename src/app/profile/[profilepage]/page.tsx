"use client";
import { redirect, useParams } from "next/navigation";
import submitProfile from "./server";
import React, { useState } from "react";
import { useSession } from "next-auth/react";

type gender = {
  gender: "Male" | "Female";
};

export default function ProfilePage() {
  const session = useSession();

  if (session == null) {
    redirect("/login");
  }

  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [gender, setGender] = useState<gender>();
  const [number, setNumber] = useState<number>(1);
  const [linkedin, setLinkedin] = useState<string>("");
  const [github, setGithub] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    let response = submitProfile({
      email: session.data.user.email,
      firstname,
      lastname,
      gender,
      number,
      linkedin,
      github,
    });

    response
      .then((data) => {
        if (data.message == "success") {
          setLoading(false);
          console.log("success");
          window.location.reload();
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }

  if (loading) {
    return <h1 className="m-3 text-center text-3xl">Loading...</h1>;
  }

  return (
    <>
      <h1 className="text-center m-3">Update your information here!</h1>
      <div className="h-screen w-screen flex flex-col items-center">
        <div className="flex flex-col px-8 pb-8 pt-12 rounded-xl space-y-12 w-[500px] h-[500px] bg-[#97FEED] shadow-md">
          <form className="flex flex-col m-0" onSubmit={handleSubmit}>
            <div className="flex justify-between ">
              <input
                type="text"
                name="firstname"
                id="firstname"
                placeholder="First Name"
                onChange={(e) => setFirstname(e.target.value)}
              />

              <input
                type="text"
                name="lastname"
                id="lastname"
                placeholder="Last Name"
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>

            <div className="flex flex-col items-center">
              <label htmlFor="gender">Gender</label>
              <select
                name="gender"
                id="gender"
                value={gender}
                defaultValue={"Select Your Option"}
                onChange={(e) => setGender(e.target.value)}
                placeholder="Select"
              >
                {/* <option value="" disabled selected>Select your option</option> */}
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <label htmlFor="number">Phone Number</label>
            <input
              type="tel"
              name="number"
              id="number"
              onChange={(e) => setNumber(e.target.value)}
            />

            <h1 className="text-center mt-5">Social Media Links</h1>

            <div className="flex flex-col ">
              <input
                type="url"
                name="linkedin"
                id="linkedin"
                placeholder="LinkedIn Profile"
                onChange={(e) => setLinkedin(e.target.value)}
              />
              <input
                type="url"
                name="github"
                id="github"
                placeholder="Github Profile"
                className="mt-5"
                onChange={(e) => setGithub(e.target.value)}
              />
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
