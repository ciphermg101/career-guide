import React from 'react';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-8 lg:py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-6 sm:mb-8 text-center gradient-text text-shadow">
        About
      </h1>
      <div className="text-center">
        <p className="text-gray-600 text-lg sm:text-xl font-medium leading-relaxed">
          Learn more about TechCareer Guide and our mission.
        </p>
        <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="glass-effect rounded-2xl p-6 sm:p-8 text-center">
            <h3 className="text-lg sm:text-xl font-bold text-accent-dark mb-3">Our Mission</h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              To help aspiring tech professionals discover their ideal career path through comprehensive information and curated resources.
            </p>
          </div>
          <div className="glass-effect rounded-2xl p-6 sm:p-8 text-center">
            <h3 className="text-lg sm:text-xl font-bold text-accent-dark mb-3">What We Offer</h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Detailed career profiles, skill requirements, learning paths, and hand-picked resources for 20+ tech roles.
            </p>
          </div>
          <div className="glass-effect rounded-2xl p-6 sm:p-8 text-center">
            <h3 className="text-lg sm:text-xl font-bold text-accent-dark mb-3">Stay Updated</h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              We regularly update our content to reflect the latest trends and requirements in the tech industry.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 