import React, { useState } from "react";
import logo from "../../../assets/logo.png";

function Login() {
  const [hidePassword, setHidePassword] = useState(true);
  function showPassword() {
    setHidePassword(!hidePassword);
  }

  return (
    <div className="login flex justify-center pt-5">
      <form>
        <div className=" w-80 md:w-96 border pt-2 pb-2 border-black rounded-3xl shadow-lg lg:max-w-lg mt-3">
          <div className="flex flex-col mx-3">
            <img src={logo} alt="logo" className="justify-center h-30" />
            <h2 className="rounded-3xl text-1xl text-center text-green font-semibold p-3">
              Login
            </h2>
            <div className="flex flex-row justify-around items-center my-3">
              <input
                required
                className="focus:bg-orange placeholder:italic placeholder:text-white rounded-full p-2 pl-5 bg-orange text-white w-3/4 md:w-3/4"
                type="text"
                id="Email"
                placeholder="Email..."
              />
            </div>
            <div className="relative w-full px-9 md:px-11">
              <input
                required
                className="placeholder:italic placeholder:text-white rounded-full p-2 pl-5 bg-orange text-white w-full"
                type={hidePassword ? "password" : "text"}
                name="password"
                id="password"
                placeholder="Mot de passe..."
              />
              <div>
                <button
                  className="absolute w-[20px] h-[20px] top-0 right-0 py-2 mr-12"
                  onClick={showPassword}
                  type="button"
                >
                  {hidePassword ? (
                    <img
                      src="https://www.svgrepo.com/show/384356/close-cross-eye-hidden-vision.svg"
                      alt="eyeCross"
                    />
                  ) : (
                    <img
                      src="https://www.svgrepo.com/show/384342/eye-look-show-view-visible-visiblity.svg"
                      alt="eyeOpen"
                    />
                  )}
                </button>
              </div>
            </div>
            <div className="flex flex-row justify-around items-center my-3">
              <button
                type="submit"
                className="rounded-full p-2 bg-orange text-white font-bold w-1/2"
              >
                Valider
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
