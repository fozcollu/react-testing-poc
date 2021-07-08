import React from 'react';
import { useParams } from 'react-router';

const ThankYouPage = () => {
  const [book, setBook] = React.useState(undefined);
  const { bookId } = useParams();

  React.useEffect(() => {
    async function fetchBook() {
      fetch('https://www.googleapis.com/books/v1/volumes/' + bookId)
        .then((res) => res.json())
        .then((_book) => {
          if (_book.error) {
            return Promise.reject('hata2');
          }
          setBook(_book);
        })
        .catch((e) => {
          console.error(e);
        });
    }
    bookId && fetchBook();
  }, [bookId]);

  if (!book) {
    return <div>Loading...</div>;
  }
  return (
    <div>Tebrikler {book.volumeInfo.title} başarıyla satın aldınız...</div>
  );
};

export default ThankYouPage;
