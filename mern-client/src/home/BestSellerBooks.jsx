import React, { useEffect,useState} from 'react'
import BookCards from '../Components/BookCards';
import { BASE_URL } from '../helper';
const BestSellerBooks = () => {
    const [books,setBooks]=useState([]);
    useEffect( ()=>{
        fetch(`${BASE_URL}/all-books`).then(res=>res.json()).then(data=>setBooks(data))
    },[])
  return (

    <div>
        <BookCards books={books} headline="Best Seller Books"/>
    </div>
  )
}

export default BestSellerBooks