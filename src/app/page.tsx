import Image from "next/image";
import Navbar from "./components/navbar/Navbar";
import Layout from "./layout/layout";
import peaceImage from "../../public/images/memoji/peace-bg.png";
import Techstack from "./components/techstack/Techstack";
import Footer from "./components/footer/Footer";
import Projects from "./components/projects/Projects";
import {
  SiPython,
  SiFlask,
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiPostgresql,
} from "react-icons/si";
import CardForm from "./components/cardForm/CardForm";

export default function Home() {
  return (
    <>
      <Layout>
        <div className="flex justify-center mt-12">
          <CardForm />
        </div>
      </Layout>
    </>
  );
}
