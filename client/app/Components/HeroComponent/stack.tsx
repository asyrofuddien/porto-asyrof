'use client';

import React from 'react';
import Image from 'next/image';

const StackComponent: React.FC = () => {
  const stacks = [
    { name: 'HTML', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    { name: 'Laravel', logo: 'https://seeklogo.com/images/L/laravel-logo-41EC1D4C3F-seeklogo.com.png' },
    { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'Express', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original-wordmark.svg' },
    { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    { name: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    { name: 'Rest API', logo: 'https://img.icons8.com/?size=100&id=21888&format=png&color=AC4FFF' },
    { name: 'GraphQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg' },
  ];

  return (
    <section className="bg-gray-900 py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-bold text-white mb-8">My Development Stack</h2>
        <div className="relative overflow-hidden">
          {/* Scrolling container */}
          <div className="flex gap-8 animate-scroll">
            {stacks.map((stack, index) => (
              <div
                key={index}
                className="flex flex-col items-center bg-gray-800 rounded-lg p-4 shadow-md transition-transform duration-300 ease-in-out transform hover:scale-110"
                style={{ minWidth: '150px' }}
              >
                <Image src={stack.logo} alt={stack.name} width={64} height={64} className="mb-4" />
                <p className="text-white text-sm font-semibold">{stack.name}</p>
              </div>
            ))}
            {/* Duplicate for infinite scrolling */}
            {stacks.map((stack, index) => (
              <div
                key={`${index}-duplicate`}
                className="flex flex-col items-center bg-gray-800 rounded-lg p-4 shadow-md transition-transform duration-300 ease-in-out transform hover:scale-110"
                style={{ minWidth: '150px' }}
              >
                <Image src={stack.logo} alt={stack.name} width={64} height={64} className="mb-4" />
                <p className="text-white text-sm font-semibold">{stack.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StackComponent;
