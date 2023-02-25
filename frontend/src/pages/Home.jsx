// import SideBarAdherent from "@components/sidebar/SideBarAdherent";
// import SideBarMembreEquipe from "@components/sidebar/SideBarMembreEquipe";
// import SideBarMembreBureau from "@components/sidebar/SideBarMembreBureau";
// import SideBarTresorier from "../components/sidebar/SideBarTresorier";
import SideBarAdmin from "../components/sidebar/SideBarAdmin";

export default function Home() {
  return (
    <div className="footer">
      {/* <SideBarAdherent /> */}
      {/* <SideBarMembreEquipe /> */}
      {/* <SideBarMembreBureau /> */}
      {/* <SideBarTresorier /> */}
      <SideBarAdmin />
    </div>
  );
}
