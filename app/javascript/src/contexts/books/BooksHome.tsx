import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllBooks } from '@/actions/actions/books';
import Button from '@/components/button/Button';
import SidebarMobile from '@/components/layout/sidebar/sidebar-mobile';
import { selectAllBooks } from '@/selectors/books';
import { Book } from '@/types/book';
import { Layout } from 'antd';
const { Header, Content, Footer } = Layout;

const BooksHome = (): JSX.Element => {
  const dispatch = useDispatch();

  const allBooks = useSelector(selectAllBooks);

  useEffect(() => {
    dispatch(getAllBooks());
  }, []);

  const [width, setWidth] = useState(window.outerWidth);

  useEffect(() => {
    const onHandleResize = (e) => {
      setWidth(e.target.outerWidth);
    }
    window.addEventListener('resize', onHandleResize, true)
    return () => {
      window.removeEventListener('resize', onHandleResize, true);
    }
  })

  const renderBooks = () => {
    if (allBooks) {
      return allBooks.map((book: Book) => (
        <p key={`${book.title}_${book.author}`}>
          {book.title} by {book.author}
        </p>
      ));
    }
  };

  const isMobile = width < 500
  console.log(width);
  return (
    <>
      <Layout style={{ minHeight: '100vh', background: '#f8f9fa' }}>
        {isMobile ? (
          <>
            <SidebarMobile />
            <div style={{ 
             textAlign: 'center', 
             position:'absolute', 
             bottom:0, 
             width:'100%' 
          }}>
              <Button customClass="logout" label="LOG OUT" />
            </div>
          </>
        ) : (
          <Layout>
                        <Header />
            <Content>
             <h1>Books</h1>
             <Button label="Test Button" />
             {renderBooks()}
           </Content>
           <Footer style={{ 
             textAlign: 'center', 
             position:'absolute', 
             bottom:0, 
             width:'100%' 
          }}>Demo App ©2021</Footer>
          </Layout>
        )}
      </Layout>
    </>
  );
};

export default BooksHome;
