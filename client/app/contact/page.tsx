import React from 'react';

const ContactComponent: React.FC = () => {
  const contactLinks = [
    {
      platform: 'LinkedIn',
      url: 'https://www.linkedin.com/in/muhammad-asyrofuddien-a7860a148/',
      color: 'bg-blue-700 hover:bg-blue-800',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.452 20.452H16.84v-5.515c0-1.318-.023-3.018-1.843-3.018-1.845 0-2.126 1.442-2.126 2.93v5.604h-3.613V9.914h3.468v1.437h.049c.484-.917 1.67-1.884 3.438-1.884 3.673 0 4.355 2.418 4.355 5.563v6.422zM5.337 8.48c-1.162 0-2.104-.943-2.104-2.106 0-1.162.943-2.104 2.104-2.104 1.162 0 2.104.942 2.104 2.104 0 1.163-.942 2.106-2.104 2.106zM7.5 20.452H3.172V9.914H7.5v10.538zM22.225 0H1.771C.792 0 0 .782 0 1.748v20.505C0 23.218.791 24 1.771 24h20.451c.979 0 1.771-.782 1.771-1.748V1.748C24 .782 23.204 0 22.225 0z" />
        </svg>
      ),
    },
    {
      platform: 'Instagram',
      url: 'https://www.instagram.com/asyroofff/',
      color: 'bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c3.313 0 3.717.013 5.019.072 1.204.058 2.007.25 2.647.528a5.352 5.352 0 0 1 1.928 1.259 5.352 5.352 0 0 1 1.259 1.928c.278.64.47 1.443.528 2.647.059 1.302.072 1.706.072 5.019s-.013 3.717-.072 5.019c-.058 1.204-.25 2.007-.528 2.647a5.352 5.352 0 0 1-1.259 1.928 5.352 5.352 0 0 1-1.928 1.259c-.64.278-1.443.47-2.647.528-1.302.059-1.706.072-5.019.072s-3.717-.013-5.019-.072c-1.204-.058-2.007-.25-2.647-.528a5.352 5.352 0 0 1-1.928-1.259 5.352 5.352 0 0 1-1.259-1.928c-.278-.64-.47-1.443-.528-2.647-.059-1.302-.072-1.706-.072-5.019s.013-3.717.072-5.019c.058-1.204.25-2.007.528-2.647a5.352 5.352 0 0 1 1.259-1.928 5.352 5.352 0 0 1 1.928-1.259c.64-.278 1.443-.47 2.647-.528C8.283.013 8.687 0 12 0zm0 2.197c-3.21 0-3.596.012-4.862.07-1.048.047-1.606.222-1.979.37-.5.195-.857.429-1.234.806-.377.377-.611.734-.806 1.234-.148.373-.323.931-.37 1.979-.058 1.266-.07 1.652-.07 4.862s.012 3.596.07 4.862c.047 1.048.222 1.606.37 1.979.195.5.429.857.806 1.234.377.377.734.611 1.234.806.373.148.931.323 1.979.37 1.266.058 1.652.07 4.862.07s3.596-.012 4.862-.07c1.048-.047 1.606-.222 1.979-.37.5-.195.857-.429 1.234-.806.377-.377.611-.734.806-1.234.148-.373.323-.931.37-1.979.058-1.266.07-1.652.07-4.862s-.012-3.596-.07-4.862c-.047-1.048-.222-1.606-.37-1.979-.195-.5-.429-.857-.806-1.234-.377-.377-.734-.611-1.234-.806-.373-.148-.931-.323-1.979-.37-1.266-.058-1.652-.07-4.862-.07zm0 4.205a5.598 5.598 0 1 1 0 11.196 5.598 5.598 0 0 1 0-11.196zm0 2.197a3.4 3.4 0 1 0 0 6.799 3.4 3.4 0 0 0 0-6.799zm6.912-3.91a1.317 1.317 0 1 1 0-2.634 1.317 1.317 0 0 1 0 2.634z" />
        </svg>
      ),
    },
    {
      platform: 'Email',
      url: 'mailto:asyrofuddien11@gmail.com',
      color: 'bg-gray-700 hover:bg-gray-800',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M0 3v18h24V3H0zm12 11l-8-6h16l-8 6z" />
        </svg>
      ),
    },
    {
      platform: 'CV',
      url: 'https://drive.google.com/uc?id=1IaVr3xEn4s1B0homNsBhWYo2audFe6YU&export=download',
      color: 'bg-gray-800 hover:bg-gray-900',
      icon: <img src="https://img.icons8.com/?size=1500&id=115648&format=png&color=000000" alt="CV" className="h-8 w-8 rounded-full" />,
    },
  ];

  return (
    <section className="py-16 px-6 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-6">Contact</h1>
        <p className="text-lg mb-8">Feel free to reach out to me through any of the platforms below!</p>
        <div className="flex justify-center space-x-8">
          {contactLinks.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-4 rounded-full ${link.color} transition-transform transform hover:scale-110`}
              aria-label={link.platform}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactComponent;
