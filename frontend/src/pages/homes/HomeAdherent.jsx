import { Helmet } from "react-helmet";
import SideBarAdherent from "../../components/sidebar/SideBarAdherent";
import Contact from "../../components/contact";
import logo from "../../assets/logo.png";

export default function HomeAdherent() {
  return (
    <div className="homeAdherent md:flex ">
      <Helmet>
        <meta charSet="utf-8" />
        <title>AIDNA_COMPTA - Acceuil adhérent</title>
        <meta name="description" content="Page d'accueil adhérent" />
        <link rel="icon" type="image/png" href={logo} />
      </Helmet>
      <div>
        <SideBarAdherent />
      </div>
      <div className=" border pt-2 pb-2 border-black rounded-3xl shadow-lg mt-3 mx-8 md:w-screen">
        <p className="rounded-3xl text-1xl text-center text-green font-semibold p-5">
          Bonjour l'association AIDNA est heureuse de vous compter parmi ses
          adhérents. En tant qu'adhèrent vous pouvez avoir accès au résultat des
          comptes de l'association. Vous pouvez voir le bilan annuel et le bilan
          par projet. Ceci en cliquant sur les boutons. Pour voir les comptes en
          détails il faut en faire la demande par écrit à la présidente à l'aide
          du formulaire de contact. Une visio ou une rencontre sera organisée
          afin de vous montrer l'état des comptes.
        </p>
        <h1 className="h1compo md:mt-40">Laissez-nous un message</h1>
        <div>
          <Contact />
        </div>
      </div>
    </div>
  );
}
