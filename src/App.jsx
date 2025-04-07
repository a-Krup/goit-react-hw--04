
import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import './App.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  
  const accessKey = 'u1G_rZf1UiHkHYgpRPjToRSqezYhMCuh_LMjjlpGTZg'; // Вставте свій ключ

  // Використовуємо useEffect для запиту зображень
  useEffect(() => {
    if (!query) return;  // Якщо запит пустий, не робимо запитів
    
    const fetchImages = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${accessKey}`);
        if (!response.ok) throw new Error('Не вдалося отримати дані');
        
        const data = await response.json();
        setImages(prev => (page === 1 ? data.results : [...prev, ...data.results]));  // Оновлюємо масив зображень
      } catch (err) {
        console.error(err);
        setError('Щось пішло не так! Спробуйте знову.');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [query, page]); // Запит буде відправлятися при зміні query або page

  // Обробка пошукового запиту
  const handleSearchSubmit = (searchQuery) => {
    if (searchQuery.trim() === '') {
      toast.error('Будь ласка, введіть текст для пошуку');
      return;
    }
    setQuery(searchQuery);
    setPage(1);  // Скидаємо сторінку на 1 при новому пошуку
    setImages([]);  // Очищаємо старі результати пошуку
  };

  // Завантаження додаткових зображень
  const handleLoadMore = async () => {
    setPage(prevPage => prevPage + 1);  // Інкрементуємо сторінку
  };

  return (
    <div>
      <Toaster />
      <SearchBar onSubmit={handleSearchSubmit} />
      
      {/* Показуємо Loader, якщо йде завантаження */}
      {loading && <Loader />}
      
      {/* Показуємо помилку, якщо є */}
      {error && <ErrorMessage message={error} />}
      
      {/* Виводимо галерею зображень */}
      <ImageGallery images={images} onImageClick={setSelectedImage} />
      
      {/* Кнопка "Load More", якщо зображення є та завантаження завершено */}
      {images.length > 0 && !loading && <LoadMoreBtn onClick={handleLoadMore} />}
      
      {/* Модальне вікно з зображенням, якщо воно вибране */}
      {selectedImage && <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />}
    </div>
  );
};

export default App;