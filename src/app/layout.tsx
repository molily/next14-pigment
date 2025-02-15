import type { Metadata } from "next";
import '@pigment-css/react/styles.css';

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <h1>Layout</h1>
        {children}
      </body>
    </html>
  );
}
