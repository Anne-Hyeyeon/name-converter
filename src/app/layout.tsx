import { NameDataProvider } from "./context/NameDataContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <NameDataProvider>{children}</NameDataProvider>
      </body>
    </html>
  );
}
