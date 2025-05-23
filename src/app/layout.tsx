import "./globals.css";
import Providers from "../components/Providers";
import Footer from "../components/Footer";
import LayoutWithNavbar from "../components/LayoutWithNavbar";
import LayoutWithLifeInfo from "../components/LayoutWithLifeInfo";

export const metadata = {
  title: "CourseSite",
  description: "Mastering Communication Course",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="flex flex-col min-h-screen bg-black text-gray-100">
        <Providers>
          <LayoutWithNavbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <LayoutWithLifeInfo />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
