import React, { useState } from 'react'
import { Button, Checkbox, Label,Textarea, Select, TextInput } from "flowbite-react";
import { BASE_URL } from '../helper';
const UploadBook = () => {
  const bookCategories=[
    "Fiction",
    "Non-Fiction",
    "Mystery",
    "Programming",
    "Science Fiction",
    "Fantasy",
    "Horror",
    "Bibliography",
    "AutoBiography",
    "History",
    "Self-help",
    "Memoir",
    "Business",
    "Children Books",
    "Travel",
    "Food",
    "Religion",
    "Art and Design"
  ]
  const [selectedBookCategory,setSelectedBookCategory]=useState(bookCategories[0]);
  const handleChangeSelectedValue=(event)=>{
    setSelectedBookCategory(event.target.value);
  }
  const handleBookSubmit=(event)=>{
    event.preventDefault();
    const form =  event.target;

    const book_title=form.book_title.value;
    const author=form.author.value;
    const image_url=form.image_url.value;
    const category=form.category.value;
    const book_description=form.bookDescription.value;
    const book_pdf_url=form.bookPDFURL.value;

    const bookObj={
      book_title,author,image_url,category,book_description,book_pdf_url
    }
    console.log(bookObj)

    //SEND DATA TO DB
    fetch(`${BASE_URL}/upload-book`,{
      method: "POST",
      headers:{
        "Content-type": "application/json",
      },
      body:JSON.stringify(bookObj)
    }).then(res=>res.json()).then(data=>{
      alert("Book uploaded successfully!!!")
      form.reset()
    })
  }
  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>
        Upload a book
      </h2>
      <form onSubmit={handleBookSubmit} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">
      <div className='flex gap-8'>
      <div className='lg:w-1/2'>
        <div className="mb-2 block">
          <Label htmlFor="book_title" value="Book Title" />
        </div>
        <TextInput id="book_title" name='book_title' type="text" placeholder="Book Name" required />
      </div>
      <div className='lg:w-1/2'>
        <div className="mb-2 block">
          <Label htmlFor="author" value="Author Name" />
        </div>
        <TextInput id="author" name='author' type="text" placeholder="Author Name" required />
      </div>

      </div>
      <div className='flex gap-8'>
      <div className='lg:w-1/2'>
        <div className="mb-2 block">
          <Label htmlFor="image_url" value="Book Image URL" />
        </div>
        <TextInput id="image_url" name='image_url' type="text" placeholder="Book image URL" required />
      </div>
      <div className='lg:w-1/2'>
        <div className="mb-2 block">
          <Label htmlFor="inputState" value="Book Category" />
        </div>
        <Select id='inputState' name='category' className='w-full rounded' value={selectedBookCategory}
        onChange= {handleChangeSelectedValue}>
          {
            bookCategories.map((option)=> <option key={option} value={option}>{option}</option>)
          }
        </Select>
      </div>

      </div>
      <div>
        <div className='mb-2 block'>
          <Label
          htmlFor="bookDescription"
          value="Book Description"
          />
          </div>
      <Textarea  id="bookDescription"
         name="bookDescription" placeholder="Write your book description..." required rows={4} className='w-full' />
        
      </div>

      <div>
        <div className='mb-2 block'>
          <Label
          htmlFor="bookPDFURL"
          value="Book PDF URL"
          />
          </div>
      <Textarea  id="bookPDFURL"
         name="bookPDFURL" placeholder="book pdf url" required type="text"  
         />
         <Button type="submit" className='mt-5 w-full'>
          Upload Book
         </Button>
        
      </div>
    </form>
    </div>
  )
}

export default UploadBook