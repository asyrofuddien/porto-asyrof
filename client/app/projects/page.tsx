'use client';
import React from 'react';
import Image from 'next/image';

const projects = [
  {
    _id: '1',
    project_name: 'Kameuble Website',
    description:
      'Kameuble Website is a furniture marketplace built with Laravel and MySQL, featuring Midtrans for payments and Raja Ongkir API for shipping costs.',
    link: 'https://github.com/asyrofuddien/Meubel_Store',
    image: '/img/kameube.jpg',
  },
  {
    _id: '2',
    project_name: 'Coming Soon',
    description: 'This project is under development and will be revealed soon.',
    link: '#',
    image: 'https://cdn.pixabay.com/photo/2021/08/05/12/36/software-development-6523979_640.jpg',
  },
  {
    _id: '3',
    project_name: 'Library Mobile App',
    description:
      'Access digital books, audiobooks, and media on the go, with easy browsing, searching, and borrowing from local or online libraries.',
    link: 'https://github.com/asyrofuddien/PerpustakaanApp',
    image: 'https://cdn.dribbble.com/users/3475837/screenshots/11355110/media/a451eaee0ef13ee14e124f17990299a9.gif',
  },
];

const ProjectsComponent: React.FC = () => {
  const sortedProjects = [...projects].sort((a, b) => (a.project_name === 'Coming Soon' ? 1 : b.project_name === 'Coming Soon' ? -1 : 0));

  return (
    <div className="scroll-smooth">
      <section id="projects" className="min-h-screen bg-gray-100 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedProjects.map((project) => (
              <div
                key={project._id}
                className={`${
                  project.project_name === 'Coming Soon'
                    ? 'relative bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg shadow-lg overflow-hidden p-6 text-center'
                    : 'bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow'
                }`}
              >
                {project.project_name === 'Coming Soon' ? (
                  <>
                    <div className="relative w-full h-48 rounded-md overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.project_name}
                        layout="fill"
                        objectFit="cover"
                        className="absolute inset-0 opacity-50 hover-zoom"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
                        <h3 className="text-white text-2xl font-bold">Coming Soon</h3>
                      </div>
                    </div>
                    <div className="my-4 h-2 bg-gradient-to-r from-yellow-300 to-yellow-500 animate-pulse rounded"></div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.project_name}</h3>
                    <p className="text-gray-700 mb-4">{project.description}</p>
                    <button disabled className="py-2 px-4 bg-gray-300 text-gray-500 rounded-full cursor-not-allowed">
                      Stay Tuned
                    </button>
                  </>
                ) : (
                  <>
                    <Image
                      src={project.image}
                      alt={project.project_name}
                      width={400}
                      height={192}
                      className="w-full h-48 object-cover rounded-md mb-4 hover-zoom"
                    />
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">{project.project_name}</h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-yellow-500 hover:text-yellow-600 font-medium"
                    >
                      View Project
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

export default ProjectsComponent;
