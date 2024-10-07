import React from 'react';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const books = [
    {
      _id: "6648d346df7eb95283dcfaaa",
      author: "J.R.R. Tolkien",
      image_url: "https://m.media-amazon.com/images/I/51myt0GXIUL._SY445_SX342_.jpg",
      category: "Fantasy",
      book_description: "An epic fantasy tale about the journey to destroy the One Ring.",
      book_title: "The Lord of the Rings: The Fellowship of the Ring",
      book_pdf_url: "https://example.com/books/fellowship_of_the_ring.pdf"
    },
    {
      _id: "6648d353df7eb95283dcfaab",
      author: "Harper Lee",
      image_url: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1553383690i/2657.jpg",
      category: "Classic Fiction",
      book_description: "A story about racial injustice and childhood innocence in the Deep South.",
      book_title: "To Kill a Mockingbird",
      book_pdf_url: "https://example.com/books/to_kill_a_mockingbird.pdf"
    },
    {
      _id: "6648d360df7eb95283dcfaac",
      author: "F. Scott Fitzgerald",
      image_url: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1490528560i/4671.jpg",
      category: "Classic Literature",
      book_description: "A critique of the American Dream set in the Jazz Age.",
      book_title: "The Great Gatsby",
      book_pdf_url: "https://example.com/books/the_great_gatsby.pdf"
    }
  ];

  const orders = [
    { id: 1, customer: 'Customer One', date: '2023-06-01', total: '$25.00' },
    { id: 2, customer: 'Customer Two', date: '2023-06-05', total: '$40.00' },
    // Add more orders here
  ];

  const bookStatistics = {
    totalBooks: 150,
    booksSold: 120,
    availableStock: 30,
  };

  const barData = {
    labels: ['Total Books', 'Books Sold', 'Available Stock'],
    datasets: [
      {
        label: 'Books',
        data: [bookStatistics.totalBooks, bookStatistics.booksSold, bookStatistics.availableStock],
        backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(255, 206, 86, 0.6)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)', 'rgba(255, 206, 86, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 bg-gray-100 p-6">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <input type="text" placeholder="Search books..." className="px-4 py-2 border rounded"/>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Add Book</button>
          </div>
        </header>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Book Statistics</h2>
          <div className="bg-white p-4 rounded shadow-md">
            <Bar data={barData} />
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Recent Orders</h2>
          <div className="bg-white p-4 rounded shadow-md overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="border-b py-2">Customer</th>
                  <th className="border-b py-2">Date</th>
                  <th className="border-b py-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td className="border-b py-2">{order.customer}</td>
                    <td className="border-b py-2">{order.date}</td>
                    <td className="border-b py-2">{order.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Book List</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map(book => (
              <div key={book._id} className="bg-white p-4 rounded shadow-md">
                <h3 className="text-xl font-semibold">{book.book_title}</h3>
                <p className="text-gray-700">by {book.author}</p>
                <p className="text-gray-500">{book.category}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <aside className="w-1/4 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <nav className="space-y-2">
          <Link to="#" className="block py-2 px-4 bg-gray-700 rounded hover:bg-gray-600">Fiction</Link>
          <Link to="#" className="block py-2 px-4 bg-gray-700 rounded hover:bg-gray-600">Non-Fiction</Link>
          <Link to="#" className="block py-2 px-4 bg-gray-700 rounded hover:bg-gray-600">Science</Link>
          <Link to="#" className="block py-2 px-4 bg-gray-700 rounded hover:bg-gray-600">History</Link>
          {/* Add more categories here */}
        </nav>
      </aside>
    </div>
  );
};

export default Dashboard;
