"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 border-b">
        <h1 className="text-xl font-bold">CampusOR</h1>
        <div className="space-x-4">
          <Link href="/login" className="text-sm font-medium">
            Login
          </Link>
          <Link
            href="/login"
            className="bg-black text-white px-4 py-2 rounded-md text-sm"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-4xl md:text-5xl font-bold max-w-3xl">
          Smart Virtual Queue Management for Large Campuses
        </h2>

        <p className="mt-4 max-w-2xl text-gray-600">
          CampusOR replaces physical queues with a real-time digital experience.
          Track your position, get notified, and save time.
        </p>

        <div className="mt-6 flex gap-4">
          <Link
            href="/login"
            className="bg-black text-white px-6 py-3 rounded-md"
          >
            Join Queue
          </Link>
          <button className="border px-6 py-3 rounded-md">
            Learn More
          </button>
        </div>
      </section>
    </main>
  );
}
