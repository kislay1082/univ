import prisma from "@/lib/prismadb";

const getAds = async () => {
  console.log(1)
  try {
    const ads = await prisma.bookAd.findMany({
      where: {
        sold: false,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        Seller: {
          select: {
            id: true,
            name: true,
            image: true,
            rating: true,
            ratingCount: true,
          },
        },
      },
    });

    console.log(ads)

    if (!ads) {
      return null;
    }

    return ads;
  } catch (error) {
    console.log(error)
    return null;
  }
};

export default getAds;
