import ProductsDetails from "../_Compenents/ProductsDetails";

async function Home({ params }) {
  const resolveParams = await params;
  return (
    <section>
      <ProductsDetails documentId={resolveParams.documentId} />
    </section>
  );
}
export default Home;
