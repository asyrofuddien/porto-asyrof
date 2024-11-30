import React from 'react';

const HeroComponent: React.FC = () => {
  return (
    <section className="flex flex-col items-center text-center px-6 py-16 bg-gray-900 text-white" id="home">
      <div className="flex flex-col items-center">
        {/* Add your photo */}
        <img
          src="/img/asyrof.png"
          alt="Muhammad Asyrofuddien"
          className="w-40 h-40 rounded-full object-cover border-4 border-yellow-400 shadow-lg"
        />
        <h2 className="text-3xl font-semibold mt-6">I'm</h2>
        <h1 className="text-5xl font-bold mt-2">Muhammad Asyrofuddien</h1>
        <p className="text-gray-300 max-w-md mt-4">
          A backend developer skilled in Node.js, Express, MongoDB, GraphQL, REST APIs, and Laravel, dedicated to building robust and
          scalable systems with over a year of professional experience.
        </p>
      </div>
    </section>
  );
};

export default HeroComponent;
