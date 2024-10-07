import React, { useEffect, useState } from 'react'
import { Card } from "flowbite-react";
import { BASE_URL } from '../helper';  // Ensure BASE_URL is correctly imported from your helper file

const Shop = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/all-books`)  // Corrected BASE_URL usage
      .then(res => res.json())
      .then(data => setBooks(data));
  }, []);

  return (
    <div className='mt-28 px-4 lg:px-24'>
      <h2 className='text-5xl font-bold text-center'>
        All Books are Here
      </h2>
      <div className='grid gap-8 my-12 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1'>
        {
          books.map(book => (
            <Card key={book.id}>  {/* Ensure each Card has a unique key */}
              <img src={book.image_url} alt="" className='h-96' />
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <p>
                  {book.book_title}
                </p>
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {book.book_description}
              </p>
              <button className='bg-blue-700 font-semibold text-white py-2 rounded'>Buy Now</button>
            </Card>
          ))
        }
      </div>
    </div>
  );
}

export default Shop;
