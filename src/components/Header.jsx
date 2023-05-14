import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Avatar, Logo } from "../assets/index.js";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles.js";
import { motion } from "framer-motion";
import { buttonClick, slideTop } from "../animations/index.js";
import { MdLogout, MdShoppingCart } from "../assets/icons/index.js";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
import { app } from "../config/firebase.config.js";
import { setUserNull } from "../context/actions/userActions.js";

const Header = () => {
  const user = useSelector((state) => state.user);
  const [isMenu, setIsMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const firebaseAuth = getAuth(app);
  const signOut = () => {
    firebaseAuth
      .signOut()
      .then(() => {
        dispatch(setUserNull());
        navigate("/login", { replace: true });
      })
      .catch((error) => console.log(error));
  };

  return (
    <header className="fixed backdrop-blur-md z-50 inset-x-0 top-0 flex items-center justify-between px-12 md:px-20 py-6">
      <NavLink to={"/"} className="flex items-center justify-center gap-4">
        <img src={Logo} className="w-12" alt="Logo" />
        <p className="text-headingColor font-semibold text-2xl">City</p>
      </NavLink>

      <nav className="flex items-center justify-center gap-8">
        <ul className="hidden md:flex items-center justify-center gap-16">
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/"}
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/menu"}
          >
            Menu
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/services"}
          >
            Services
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/aboutus"}
          >
            About Us
          </NavLink>
        </ul>

        <motion.div {...buttonClick} className="relative cursor-pointer">
          <MdShoppingCart className="text-3xl text-textColor" />
          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center absolute -top-4 -right-1">
            <p className="text-primary text-base font-semibold">2</p>
          </div>
        </motion.div>

        {user ? (
          <>
            <div
              className="relative cursor-pointer"
              onMouseEnter={() => setIsMenu(true)}
            >
              <div className="w-12 h-12 rounded-full shadow-md cursor-pointer overflow-hidden flex items-center justify-center">
                <motion.img
                  className="w-full h-full object-cover"
                  src={user?.picture ? user?.picture : Avatar}
                  whileHover={{ scale: 1.15 }}
                  referrerPolicy="no-referrer"
                />
              </div>

              {isMenu && (
                <motion.div
                  {...slideTop}
                  className="w-48 px-6 py-4 bg-lightOverlay backdrop-blur-md rounded-md shadow-md absolute top-12 right-0 flex flex-col gap-4"
                  onMouseLeave={() => setIsMenu(false)}
                >
                  <Link
                    className="hover:text-red-500 text-xl text-textColor"
                    to={"/dashboard/home"}
                  >
                    Dashboard
                  </Link>
                  <Link
                    className="hover:text-red-500 text-xl text-textColor"
                    to={"/profile"}
                  >
                    MyProfile
                  </Link>
                  <Link
                    className="hover:text-red-500 text-xl text-textColor"
                    to={"/user-orders"}
                  >
                    Orders
                  </Link>

                  <hr />
                  <motion.div
                    {...buttonClick}
                    onClick={signOut}
                    className="group flex items-center justify-center px-3 py-2 rounded-md shadow-md bg-gray-100 hover:bg-gray-200 gap-3"
                  >
                    <MdLogout className="text-2xl text-textColor group-hover::text-headingColor" />
                    <p className="text-textColor text-xl group-hover:text-headingColor">
                      Sign Out
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </>
        ) : (
          <>
            <NavLink to={"/login"}>
              <motion.button
                {...buttonClick}
                className="px-4 py-2 rounded-md shadow-md bg-lightOverlay border border-red-300 cursor-pointer"
              >
                Login
              </motion.button>
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
