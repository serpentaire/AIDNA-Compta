import React from 'react';

function SideBarAdherent() {
  return (
    <div>
      <h1 className="rounded-3xl text-1xl text-center text-green font-semibold p-3 md:text-start md:pl-24">
      Espace adhèrent
      </h1>
      <div className="md:w-60 md:w-56 border pt-2 pb-2 border-black hover:scale-105 duration-300 rounded-3xl shadow-2xl lg:max-w-lg mt-3 mx-8">
        <div className="flex flex-col mx-3">
          <div className="flex flex-row justify-around items-center my-3">
            <button className="rounded-full p-2 bg-orange text-white font-bold w-1/2 md:w-3/4" type="button">Bilan Annuel</button>
          </div>
          <div className="flex flex-row justify-around items-center my-3">
            <button className="rounded-full p-2 bg-orange text-white font-bold w-1/2 md:w-3/4">Bilan Projet</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBarAdherent;
