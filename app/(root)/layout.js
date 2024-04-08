import Navbar from "@/components/navbar";
import getCurrentUser from "@/actions/getCurrentUser";

export default async function RootLayout({ children }) {
  const user = await getCurrentUser();
  return (
    <>
      <Navbar user={user} />
      {children}
    </>
  );
}
