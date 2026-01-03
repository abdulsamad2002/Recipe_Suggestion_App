
'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const WelcomePage = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/login');
  };

  return (
    <div className="bg-amber-50 min-h-screen flex flex-col justify-between">

      <NavBar />

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center">
        <div className="max-w-3xl mx-auto space-y-8">

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl font-bold text-slate-800 leading-tight">
            Welcome to
            <span className="block text-orange-600 mt-2">Recipe Hub</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Discover delicious recipes from around the world. Save your favorites,
            share your own creations, and explore endless culinary possibilities.
          </p>

          {/* CTA Button */}
          <div className="pt-6">
            <button
              onClick={handleGetStarted}
              className="px-12 py-4 bg-orange-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-orange-700 hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              Get Started
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16">
            <div className="space-y-3">
              <div className="text-4xl">🍳</div>
              <h3 className="text-lg font-semibold text-slate-800">
                Thousands of Recipes
              </h3>
              <p className="text-sm text-slate-600">
                Explore recipes from every cuisine
              </p>
            </div>

            <div className="space-y-3">
              <div className="text-4xl">❤️</div>
              <h3 className="text-lg font-semibold text-slate-800">
                Save Favorites
              </h3>
              <p className="text-sm text-slate-600">
                Keep your best finds in one place
              </p>
            </div>

            <div className="space-y-3">
              <div className="text-4xl">👨‍🍳</div>
              <h3 className="text-lg font-semibold text-slate-800">
                Share Your Recipes
              </h3>
              <p className="text-sm text-slate-600">
                Join our community of food lovers
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default WelcomePage;