import React from 'react';
import { useHistory } from 'react-router';
import debounce from '../utils/debounce';

function BookPage() {
  const [searchKey, setSearchKey] = React.useState('');
  const [books, setBooks] = React.useState([]);

  const debounceSetSearchKey = debounce(setSearchKey, 500);

  React.useEffect(() => {
    const search = () => {
      fetch('https://www.googleapis.com/books/v1/volumes?q=' + searchKey)
        .then((res) => res.json())
        .then((res) => {
          console.log(searchKey);
          const _books = (res.items || []).map((item) => {
            return {
              id: item.id,
              title: item.volumeInfo.title,
              subTitle: item.volumeInfo.subtitle,
              thumbnail: item.volumeInfo.imageLinks?.smallThumbnail
            };
          });
          setBooks(_books);
        });
    };
    if (!searchKey || searchKey === '') {
      setBooks([]);
      return;
    }
    if (searchKey.length < 2) {
      return;
    }
    search();
  }, [searchKey]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Kitap Listesi</h1>
      <br />
      <div>
        <input
          placeholder="Kitap bul..."
          style={{ padding: 20, width: 300, border: '1px solid #d9d9d9' }}
          onChange={(e) => debounceSetSearchKey(e.target.value)}
        />
      </div>
      <br />
      <br />
      <div style={{ padding: '5px', width: 800 }}>
        {books.map((book) => (
          <Book book={book} />
        ))}
      </div>
    </div>
  );
}

function Book({ book }) {
  let history = useHistory();
  return (
    <div
      key={book.id}
      style={{
        padding: 10,
        border: '1px solid #d9d9d9',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        minHeight: 100
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          width={75}
          height={150}
          src={
            book.thumbnail ||
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUTNJv25aFcc__cxXqLA1gPvwtrXkGGEnr-w&usqp=CAU'
          }
          alt="book_thumbnail"
        />

        <span style={{ marginLeft: '50px' }}>
          <h2 style={{ color: '#444' }}>{book.title}</h2>
          <p style={{ color: '#aaa' }}>{book.subTitle}</p>
        </span>
      </div>

      <div>
        <button
          style={{
            backgroundColor: 'white',
            padding: 10,
            border: '1px solid #888',
            width: 100,
            fontSize: 18
          }}
          onClick={() => {
            history.push('/step1/' + book.id);
          }}
        >
          Satın Al
        </button>
      </div>
    </div>
  );
}

export default BookPage;
