'use client';
import React from 'react';
import NavbarComponent from './Components/HeroComponent/navbar';
import ProjectsComponent from './projects/page';
import HeroComponent from './Components/HeroComponent/hero';
import StackComponent from './Components/HeroComponent/stack';
import ContactComponent from './contact/page';
import ArticleComponent from './Articles/page';
// import createApolloClient from './lib/apolloClient';
// import { ApolloProvider } from '@apollo/client';

// const client = createApolloClient();

function Page() {
  return (
    // <ApolloProvider client={client}>
    <div className="scroll-smooth">
      <main>
        {/* Hero + Stack Combined Section */}
        <section id="hero-stack">
          <div className="flex flex-col">
            <NavbarComponent />
            {/* Hero Section */}
            <HeroComponent />
            {/* Stack Section */}
            <StackComponent />
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects">
          <ProjectsComponent />
        </section>

        <section id="article">
          <ArticleComponent />
        </section>
      </main>

      {/* Contact (Footer) Section */}
      <footer id="contact" className="bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 text-white">
        <ContactComponent />
      </footer>
    </div>
  );
}

export default Page;
