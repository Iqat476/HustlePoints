import { Sedgwick_Ave_Display } from "next/font/google";
import Image from "next/image";
import "./globals.css";

const sedgwickSans = Sedgwick_Ave_Display({
  variable: "--font-sedgwick",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata = {
  title: "HustlePoints",
  description: "HustlePoints - do tasks, earn points, use social media",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${sedgwickSans.variable} antialiased`}
      >
        <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
          <Image
            src="/background.jpg"
            alt="Background"
            layout="fill"   
            objectFit="cover" 
            quality={100} 
          />
          <div style={{ position: 'relative', zIndex: 1 }}>
        {children
        }</div>
        </div>
      </body>
    </html>
  );
}
