import getAds from "@/actions/get-ads";
import Card from "./_components/card";

export default async function Home() {
  const ads = await getAds();
  return (
    <main>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-2xl mx-auto gap-x-14 lg:flex lg:items-center lg:max-w-none">
          <div className="relative w-full max-w-xl lg:shrink-0">
            <h1 className="text-4xl sm:text-6xl text-gray-900	font-bold tracking-tight">
              Your next great read is just a connection away!
            </h1>
            <p className="mt-6 leading-8 text-lg text-gray-600 sm:max-w-md lg:max-w-none">
              Uniconnect is a campus-specific portal where students can
              seamlessly buy or sell textbooks within their university
              community, eliminating the hassle of traditional methods.
            </p>
          </div>
          <div className="flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-24 lg:mt-0 lg:pl-0">
            <div className="ml-auto w-44 flex-none pt-32 sm:ml-0 sm:pt-80 lg:order-[9999] lg:pt-36">
              <div className="relative">
                <picture>
                  <img
                    src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;h=528&amp;q=80"
                    alt=""
                    className="aspect-[2/3] w-full rounded-xl bg-gray-900 object-cover shadow-lg"
                  />
                </picture>
              </div>
            </div>
            <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 pt-52 lg:pt-36">
              <div className="relative">
                <picture>
                  <img
                    src="https://images.unsplash.com/photo-1485217988980-11786ced9454?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;h=528&amp;q=80"
                    alt=""
                    className="aspect-[2/3] w-full rounded-xl bg-gray-900 object-cover shadow-lg"
                  />
                </picture>
              </div>
              <div className="relative">
                <picture>
                  <img
                    src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;crop=focalpoint&amp;fp-x=.4&amp;w=396&amp;h=528&amp;q=80"
                    alt=""
                    className="aspect-[2/3] w-full rounded-xl bg-gray-900 object-cover shadow-lg"
                  />
                </picture>
              </div>
            </div>
            <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
              <div className="relative">
                <picture>
                  <img
                    src="https://images.unsplash.com/photo-1670272504528-790c24957dda?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;crop=left&amp;w=400&amp;h=528&amp;q=80"
                    alt=""
                    className="aspect-[2/3] w-full rounded-xl bg-gray-900 object-cover shadow-lg"
                  />
                </picture>
              </div>
              <div className="relative">
                <picture>
                  <img
                    src="https://images.unsplash.com/photo-1670272505284-8faba1c31f7d?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;h=528&amp;q=80"
                    alt=""
                    className="aspect-[2/3] w-full rounded-xl bg-gray-900 object-cover shadow-lg"
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="flex flex-col gap-8">
          {ads && ads.map((ad) => <Card key={ad.id} ad={ad} />)}
        </div>
      </section>
    </main>
  );
}
