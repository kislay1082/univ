import getAdById from "@/actions/get-ad-by-id";
import Product from "../_components/product";
import getCurrentUser from "@/actions/getCurrentUser";


export default async function Book({ params }) {

  const user = await getCurrentUser();

  const ad = await getAdById(params.id);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Product ad={ad} user={user}/>
    </div>
  );
}
