import React from 'react';
import AboutPic from '../assets/about.png';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className='mt-24'>
      <section className="py-8 px-4 lg:px-0">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8">
          <div className="lg:w-2/5 ml-6 mb-3">
            <img className="rounded-lg w-full" src={AboutPic} alt="About Us" />
          </div>
          <div className="lg:w-1/2 lg:pl-8 lg:text-left mr-14">
            <div className="ms-4">
              <h2 className="text-4xl font-bold mb-4">Our Story</h2>
              <p className="text-lg leading-relaxed mb-4">
                At our bookstore, we are passionate about literature and its profound impact on people's lives. We believe that books have the power to inspire, educate, and transform. Our mission is to provide a curated selection of books across various genres, ensuring there's something for every reader.
              </p>
              <p className="text-lg leading-relaxed mb-4">
                We strive to create a welcoming space where book lovers can explore new worlds, gain knowledge, and connect with like-minded individuals. Whether you're looking for classic literature, gripping fiction, insightful non-fiction, or captivating fantasy, our bookstore is your go-to destination.
              </p>
              <h3 className="text-2xl font-semibold mb-2">Our Mission</h3>
              <p className="text-lg leading-relaxed mb-0">
                Our mission is to foster a love for reading by providing a diverse selection of books that enrich and enlighten our community. We aim to create an inclusive environment where everyone feels welcome to discover, learn, and grow through the power of literature.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Full-width section */}
      <section className="bg-gray-200 py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Join Us Today</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Explore our collection of books and discover stories that captivate and inspire. Join our community of readers and embark on a journey of knowledge and imagination.
          </p>
          <Link to="/" className="inline-block bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors duration-300">
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
