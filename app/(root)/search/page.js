import getSearchAds from "@/actions/get-search-ads";
import Card from "@/app/(root)/_components/card";

export default async function Search({ searchParams }) {
  const ads = await getSearchAds(searchParams);

  if (!ads || !searchParams?.query) {
    return (
      <main>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="flex flex-col gap-8">
            <p className="text-center">No ads found.</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="flex flex-col gap-8">
          {ads && ads.map((ad) => <Card key={ad.id} ad={ad} />)}
        </div>
      </section>
    </main>
  );
}
