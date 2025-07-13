import React from 'react';

export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-8 lg:py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-6 sm:mb-8 text-center gradient-text text-shadow">
        Contact
      </h1>
      <div className="text-center">
        <p className="text-gray-600 text-lg sm:text-xl font-medium leading-relaxed mb-8 sm:mb-12">
          Get in touch with us for questions, suggestions, or collaboration opportunities.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="glass-effect rounded-2xl p-6 sm:p-8 text-center">
            <h3 className="text-lg sm:text-xl font-bold text-accent-dark mb-3">Email Us</h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Send us an email at <a href="mailto:contact@techcareerguide.com" className="text-accent underline hover:text-accent-dark">contact@techcareerguide.com</a>
            </p>
          </div>
          <div className="glass-effect rounded-2xl p-6 sm:p-8 text-center">
            <h3 className="text-lg sm:text-xl font-bold text-accent-dark mb-3">Follow Us</h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Stay updated with the latest tech career insights and resources.
            </p>
          </div>
          <div className="glass-effect rounded-2xl p-6 sm:p-8 text-center">
            <h3 className="text-lg sm:text-xl font-bold text-accent-dark mb-3">Feedback</h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              We'd love to hear your suggestions for improving our platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 