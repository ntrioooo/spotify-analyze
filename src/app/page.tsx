import Layout from "./layout/layout";
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
