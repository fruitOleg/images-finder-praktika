import { GlobalStyle } from 'GlobalStyle';
import { fetchImages } from './api';
import {Searchbar} from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ButtonLoadMore } from './Button/Button';
import { Loader } from './Loader/Loader';
import { useState } from 'react';
import { useEffect } from 'react';

export const App = () => {
   const [query, setQuery] = useState('') 
   const [images, setImages] = useState([]) 
   const [page, setPages] = useState(1)
   const [loading, setLoading] = useState(false)


   const handleChangeInput = (e) => {
      setQuery( e.target.value)
     }
   
   const handleSubmitQuery = async evt => {
      evt.preventDefault()

      setImages([])

     const response = await fetchImages(query, 1);

      if (response) {
         setImages([...this.state.images, ...response])
         setPages(page + 1)
       }

      evt.target.reset();
  };
   
   const loadMoreHandler = async () => {
      setPages(page + 1)
     }
   
   const saveQueryParams = (queryStr) => {
      setImages([])
      setQuery(queryStr)
      setPages(1)
     }
   
    useEffect(() => {
    if (query === '') return;

    const loadResult = async () => {
      try {
        setLoading(true);
        const img = await fetchImages(query, page);

        if (img.length) {
          setImages(prevState => (page > 1 ? [...prevState, ...img] : img));
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        
      } finally {
        setLoading(false);
      }
    };
    
    loadResult();
  }, [page, query]);
   
      return (
         <>
            <GlobalStyle />
            <Searchbar onSubmit={handleSubmitQuery} handleChangeQuery={handleChangeInput} saveQueryParams={saveQueryParams} />
           {loading ?  <Loader /> : <ImageGallery images={images}/>}
           {images.length > 0 && <ButtonLoadMore onClick={loadMoreHandler} />}
         </>

 )
};
