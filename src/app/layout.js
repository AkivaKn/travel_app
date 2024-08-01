import { auth, signOut } from "../../auth";
import Nav from "./components/Nav";
import "../../styles/globals.css";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const session = await auth();
  return (
    <html lang="en">
      <body>
        <Nav session={session} />
        {children}
      </body>
    </html>
  );
}