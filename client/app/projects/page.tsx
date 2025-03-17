'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { gql } from '@apollo/client';
import createApolloClient from '../lib/apolloClient';

interface Project {
  _id: string;
  description: string;
  image: string;
  link: string;
  project_name: string;
}

const client = createApolloClient();

const GET_PROJECTS = gql`
  query GetAllProjects {
    GetAllProjects {
      _id
      description
      image
      link
      project_name
    }
  }
`;

const ProjectsComponent: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<{ GetAllProjects: Project[] } | null>(null);

  useEffect(() => {
    client
      .query({ query: GET_PROJECTS })
      .then((result: { data: { GetAllProjects: Project[] } }) => {
        setData(result.data);
        setLoading(false);
      })
      .catch((error: Error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!data || !data.GetAllProjects) {
    return <p>No projects found.</p>;
  }

  const sortedProjects = [...data.GetAllProjects].sort((a, b) => (a.project_name === 'Coming Soon' ? 1 : b.project_name === 'Coming Soon' ? -1 : 0));

  return (
    <div className="scroll-smooth">
      <section id="projects" className="min-h-screen bg-gray-100 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedProjects.map((project) => (
              <div
                key={project._id}
                className={`${project.project_name === 'Coming Soon'
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