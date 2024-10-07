import React, { useEffect,useState} from 'react'
import BookCards from '../Components/BookCards';
import { BASE_URL } from '../helper';
const OtherBooks = () => {
    const [books,setBooks]=useState([]);
    useEffect( ()=>{
        fetch(`${BASE_URL}/all-books`).then(res=>res.json()).then(data=>setBooks(data.slice(5,10)))
    },[])
  return (

    <div>
        <BookCards books={books} headline="Other Books"/>
    </div>
  )
}

export default OtherBooks