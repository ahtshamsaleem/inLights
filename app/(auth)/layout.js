"use client";


import '@/app/globals.css'


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="w-full    font-Inter bg-gradient-to-bl from-[#ffe4e6]  to-[#ccfbf1] ">
        <div className="py-32 ">{children}</div>
      </body>
    </html>
  );
}
