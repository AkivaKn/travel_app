import { auth, signOut } from "../../auth";
import Nav from "./components/Nav";
import "../../styles/globals.css";

export const metadata = {
  title: "WhereToGo",
  description: "Next.js Travel App",
};

export default async function RootLayout({ children }) {
  const session = await auth();
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <Nav session={session} />
        {children}
      </body>
    </html>
  );
}