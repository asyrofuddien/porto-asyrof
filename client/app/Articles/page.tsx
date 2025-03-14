import React from 'react';

interface Article {
  id: string;
  title: string;
  description: string;
  link: string;
  image: string;
}

const articles: Article[] = [
  {
    id: '1',
    title: 'Belajar JavaScript Dasar',
    description:
      'Di video ini, kita akan mempelajari dasar-dasar JavaScript, bahasa pemrograman yang paling populer untuk pengembangan web. Video ini cocok untuk pemula yang ingin memulai perjalanan coding mereka atau untuk kalian yang ingin memperkuat fondasi JavaScript.',
    link: 'https://youtu.be/K-hmqyTAr6Q',
    image: '/img/Javascript.jpg',
  },
  {
    id: '3',
    title: 'Coming Soon',
    description: 'This project is under development and will be revealed soon.',
    link: '#',
    image: 'https://cdn.pixabay.com/photo/2021/08/05/12/36/software-development-6523979_640.jpg',
  },
];

import Image from 'next/image';

const ArticleComponent: React.FC = () => {
  const sortedArticles = [...articles].sort((a, b) => (a.title === 'Coming Soon' ? 1 : b.title === 'Coming Soon' ? -1 : 0));

  return (
    <div className="scroll-smooth">
      <section id="articles" className="min-h-screen bg-[#111827] py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedArticles.map((article) => (
              <div
                key={article.id}
                className={`${
                  article.title === 'Coming Soon'
                    ? 'bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 text-white rounded-lg shadow-lg p-6 text-center'
                    : 'bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow'
                }`}
              >
                {article.title === 'Coming Soon' ? (
                  <>
                    {/* Optimized Image for "Coming Soon" */}
                    <div className="relative w-full h-48 rounded-md overflow-hidden mb-4">
                      <Image src={article.image} alt={article.title} layout="fill" objectFit="cover" className="opacity-50 hover-zoom" />
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
                        <h3 className="text-white text-2xl font-bold">Coming Soon</h3>
                      </div>
                    </div>

                    {/* Animated Shimmer Effect */}
                    <div className="my-4 h-2 bg-gradient-to-r from-yellow-300 to-yellow-500 animate-pulse rounded"></div>

                    {/* Project Title */}
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{article.title}</h3>

                    {/* Project Description */}
                    <p className="text-gray-700 mb-4">{article.description}</p>

                    {/* Placeholder Button */}
                    <button disabled className="py-2 px-4 bg-gray-300 text-gray-500 rounded-full cursor-not-allowed">
                      Stay Tuned
                    </button>
                  </>
                ) : (
                  <>
                    {/* Optimized Image for Other Articles */}
                    <div className="relative w-full h-48 rounded-md mb-4">
                      <Image src={article.image} alt={article.title} layout="fill" objectFit="cover" className="hover-zoom" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">{article.title}</h3>
                    <p className="text-gray-600 mb-4">{article.description}</p>
                    <a
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-yellow-500 hover:text-yellow-600 font-medium"
                    >
                      Read More
                    </a>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArticleComponent;
