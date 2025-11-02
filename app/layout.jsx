export const metadata = {
  title: "TTS Szövegformázó",
  description: "Szöveg előkészítő AI hanghoz",
};

export default function RootLayout({ children }) {
  return (
    <html lang="hu">
      <body>{children}</body>
    </html>
  );
}
