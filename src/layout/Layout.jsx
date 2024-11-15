import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import backgroundImage from "./../assets/bckg1.jpg"; // Replace with your image path

const Layout = () => {
  return (
    <main className="grid min-h-full grid-rows-[auto_1fr_auto]">
      <Navbar />
      <section className="container mx-auto relative z-10">
        <div
          className="fixed inset-0 w-full h-full -z-20 blur-sm"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        <div className="h-full overflow-y-auto no-scrollbar">
          <Outlet />
        </div>

        {/* <ToastContainer /> */}
      </section>
      <Footer />
    </main>
  );
};

export default Layout;
