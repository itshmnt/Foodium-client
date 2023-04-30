import React, { useState } from "react";
import { LoginBg, Logo } from "../assets/index.js";
import { LoginInput } from "../components/index.js";
import { FaEnvelope, FaLock, FcGoogle } from "../assets/icons/index.js";
import { motion } from "framer-motion";
import { buttonClick } from "../animations/index.js";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../config/firebase.config.js";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      firebaseAuth.onAuthStateChanged((cred) => {
        if (cred) {
          cred.getIdToken().then((token) => {
            console.log(token);
          });
        }
      });
    });
  };

  return (
    <div className="w-screen h-screen relative overflow-hidden flex">
      {/* Background Image */}
      <img
        src={LoginBg}
        className="w-full h-full object-cover absolute top-0 left-0"
        alt="Login page background pic"
      />

      {/* Content Box */}
      <div className="flex flex-col items-center bg-lightOverlay w-[80%] md:w-508 h-full z-10 backdrop-blur-md p-4 px-4 py-12 gap-6">
        <div className="flex items-center justify-start gap-4 w-full">
          <img src={Logo} className="w-8" alt="Logo" />

          <p className="text-headingColor font-semibold text-2xl">City</p>
        </div>

        <p className="text-3xl font-semibold text-headingColor">
          Welcome Back!
        </p>

        <p className="text-3xl text-textColor -mt-6">
          {isSignUp ? "Sign up" : "Sign in"} with following
        </p>

        <div className="w-full flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-4">
          <LoginInput
            placeHolder={" Enter Email"}
            icon={<FaEnvelope className="text-xl text-textColor" />}
            inputState={userEmail}
            inputStateFunc={setUserEmail}
            type="email"
            isSignUp={isSignUp}
          />

          <LoginInput
            placeHolder={"Enter Password"}
            icon={<FaLock className="text-xl text-textColor" />}
            inputState={password}
            inputStateFunc={setPassword}
            type="password"
            isSignUp={isSignUp}
          />

          {isSignUp && (
            <LoginInput
              placeHolder={"Cofirm Password"}
              icon={<FaEnvelope className="text-xl text-textColor" />}
              inputState={confirmPassword}
              inputStateFunc={setConfirmPassword}
              type="password"
              isSignUp={isSignUp}
            />
          )}

          {!isSignUp ? (
            <p>
              Doesn&#39;t have an account:{" "}
              <motion.button
                {...buttonClick}
                className="text-red-400 cursor-pointer underline bg-transparent"
                onClick={() => setIsSignUp(true)}
              >
                Create one
              </motion.button>
            </p>
          ) : (
            <p>
              Already have an account:{" "}
              <motion.button
                {...buttonClick}
                className="text-red-400 cursor-pointer underline bg-transparent"
                onClick={() => setIsSignUp(false)}
              >
                Sign-in here
              </motion.button>
            </p>
          )}

          {isSignUp ? (
            <motion.button
              {...buttonClick}
              className="w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-500 transition-all duration-150"
            >
              Sign Up
            </motion.button>
          ) : (
            <motion.button
              {...buttonClick}
              className="w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-500 transition-all duration-150"
            >
              Sign in
            </motion.button>
          )}

          <div className="flex items-center justify-between gap-16">
            <div className="w-24 h-[1px] rounded-md bg-white"></div>
            <p className="text-white">or</p>
            <div className="w-24 h-[1px] rounded-md bg-white"></div>
          </div>

          <motion.div
            {...buttonClick}
            className="flex items-center justify-center px-20 py-2 bg-lightOverlay backdrop-blur-md cursor-pointer rounded-3xl gap-4"
            onClick={loginWithGoogle}
          >
            <FcGoogle className="text-3xl" />
            <p className="capitalize text-base text-headingColor">
              Sign in with Google
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
