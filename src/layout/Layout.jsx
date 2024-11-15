import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import backgroundImage from "./../assets/bckg1.jpg"; // Replace with your image path

const Layout = () => {
  return (
    <main className="relative min-h-screen flex flex-col">
      {/* Background Image */}
      <div
        className="fixed inset-0 -z-10 blur-sm"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover", // Or "contain" based on your preference
          backgroundPosition: "center",
        }}
      ></div>

      {/* Fixed Navbar */}
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>

      {/* Scrollable Content */}
      <section className="flex flex-grow overflow-y-auto justify-end items-end">
        <div className="container mx-auto px-4 flex  md:px-8 lg:px-12">
          <Outlet />
        </div>
      </section>

      {/* Fixed Footer */}
      <footer className="sticky bottom-0 z-50">
        <Footer />
      </footer>
    </main>
  );
};

export default Layout;
