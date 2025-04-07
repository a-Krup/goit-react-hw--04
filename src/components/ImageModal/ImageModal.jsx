import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import styles from './ImageModal.module.css';

const ImageModal = ({ image, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Викликаємо useEffect один раз, коли компонент монтується
  useEffect(() => {
    if (image) {
      // Встановлюємо appElement тільки один раз при монтуванні модалки
      Modal.setAppElement('#root');
      setIsModalOpen(true); // Відкриваємо модалку тільки якщо є зображення
    } else {
      setIsModalOpen(false); // Закриваємо модалку, якщо зображення немає
    }
  }, [image]); // Логіка виконання при зміні image

  // Якщо немає зображення, не рендеримо модалку
  if (!image) return null;

  const { alt_description, user, likes, created_at, location, urls } = image;

  return (
    <Modal
      isOpen={isModalOpen} // Модальне вікно відкривається тільки коли є зображення
      onRequestClose={onClose} // Закрити модалку за запитом
      contentLabel="Image Modal"
      appElement={document.getElementById('root')} // Вказуємо корінь додатку для доступності
      shouldCloseOnOverlayClick={true} // Закрити модалку при натисканні на фон
      shouldCloseOnEsc={true} // Закрити модалку при натисканні клавіші Esc
    >
    
      <div className={styles.modalContent}>
        <img src={urls.regular} alt={alt_description || 'Image'} />

        <div className={styles.modalInfo}>
          <h2>{alt_description || 'No description available'}</h2>
          <p className={styles.author}>
            Photo by{' '}
            <a href={user.links.html} target="_blank" rel="noopener noreferrer">
              {user.name}
            </a>
          </p>
          <p className={styles.likes}>Likes: {likes}</p>
          <p className={styles.createdAt}>Created at: {new Date(created_at).toLocaleDateString()}</p>
          {location && (
            <p className={styles.location}>Location: {location.name || 'Unknown'}</p>
          )}
        </div>
 </div> 

        <button className={styles.buttonClose} onClick={onClose}>×</button> {/* Кнопка "X" для закриття */}
     
    </Modal>
  );
};

export default ImageModal;