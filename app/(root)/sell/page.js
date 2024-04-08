import SellForm from "../_components/sell-form";

export default function Sell() {
    return (
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-white bg-gray-900 text-center py-12 px-4 rounded font-bold mb-8 text-4xl">
          Create an ad for your book!
        </div>
        <SellForm />
      </main>
    )
  }
  