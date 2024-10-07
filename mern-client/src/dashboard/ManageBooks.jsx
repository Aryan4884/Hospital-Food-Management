import React, { useEffect, useState } from 'react'
import { Table } from "flowbite-react";
import { Link } from 'react-router-dom';
import { BASE_URL } from '../helper';
const ManageBooks = () => {
  const [allBooks,setAllBooks]=useState([]);
  useEffect(()=>{
    fetch(`${BASE_URL}/all-books`).then(res=>res.json()).then(data=>setAllBooks(data));
  },[])
  const handleDelete=(id)=>{    
  console.log(id);
  fetch(`${BASE_URL}/book/${id}`,{
    method:"DELETE",
  }).then(res=>res.json()).then(data=> {alert("Book is deleted successfully!")
    //setAllBooks(data);
  })
  }
  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Manage Your Books</h2>
      <Table className='lg:w-[1180px]'>
        <Table.Head>
        <Table.HeadCell>No</Table.HeadCell>
          <Table.HeadCell>Product name</Table.HeadCell>
          <Table.HeadCell>Color</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>
            <span>Edit</span>
          </Table.HeadCell>
        </Table.Head>
        {
          allBooks.map((book,index)=> <Table.Body className="divide-y" key={book._id}>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {index+1}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {book.book_title}
            </Table.Cell>
            <Table.Cell>{book.author}</Table.Cell>
            <Table.Cell>{book.category}</Table.Cell>
            <Table.Cell>$10.00</Table.Cell>
            <Table.Cell>
              <Link href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-5"
              to={`/admin/dashboard/edit-books/${book._id}`}>
                Edit
              </Link>
              <button onClick={()=>handleDelete(book._id)} className='bg-red-600 px-4 py-1 font-semibold text-white rounded-sm hover:bg-sky-600'>
                Delete
              </button>
            </Table.Cell>
          </Table.Row>
          </Table.Body>)
        }
      </Table>

    </div>
  )
}

export default ManageBooks