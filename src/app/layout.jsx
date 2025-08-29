import "./globals.css";

export const metadata = {
  title: "My App",
  description: "Next.js + Tailwind Setup",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body className="bg-gray-950 text-white antialiased">{children}</body>
    </html>
  );
}
