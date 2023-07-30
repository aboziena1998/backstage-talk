import { useCallback, useEffect, useRef, useState } from 'react';

function App() {
  const images = [
    {
      src: 'https://backstagetalks.com/img/backstagetalks_cover_issue_7.png',
      color: '#FF608C',
    },
    {
      src: 'https://backstagetalks.com/img/backstagetalks_cover_issue_6.png',
      color: '#FFFFFF',
    },
    {
      src: 'https://backstagetalks.com/img/backstagetalks_cover_issue_5.png',
      color: '#00C1B5',
    },
    {
      src: 'https://backstagetalks.com/img/backstagetalks_cover_issue_4.png',
      color: '#FF6519',
    },
    {
      src: 'https://backstagetalks.com/img/backstagetalks_cover_issue_3.png',
      color: '#FFBE00',
    },
    {
      src: 'https://backstagetalks.com/img/backstagetalks_cover2017.png',
      color: '#1D3FBB',
    },
    {
      src: 'https://backstagetalks.com/img/backstagetalks_cover2016_n.png',
      color: '#E30512',
    },
  ];

  const ref = useRef(null);
  const [activeElement, setActiveElement] = useState(null);
  const [shouldListenScroll, setShouldListenScroll] = useState(false);

  const handleScroll = useCallback(() => {
    if (!shouldListenScroll) return;

    const books = document.querySelectorAll('[data-color]');
    const rect1 = ref.current.getBoundingClientRect();

    let nextActiveElement = null;

    books.forEach(book => {
      const rect2 = book.getBoundingClientRect();
      const isOverlapping = rect1.bottom === rect2.top;

      if (isOverlapping) {
        nextActiveElement = book;
        return;
      }
    });

    const body = document.body;
    if (nextActiveElement !== activeElement) {
      setActiveElement(nextActiveElement);
      if (nextActiveElement) {
        body.style.backgroundColor =
          nextActiveElement.getAttribute('data-color');
      }
    }
  }, [activeElement, shouldListenScroll]);

  useEffect(() => {
    handleScroll();
    if (shouldListenScroll) {
      document.addEventListener('scroll', handleScroll);
    } else {
      document.removeEventListener('scroll', handleScroll);
    }

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, shouldListenScroll]);

  useEffect(() => {
    setShouldListenScroll(true);
  }, [activeElement]);

  return (
    <main className="container">
      <div className="left">
        <h1 className="h1">BACkSTAGE TALK</h1>
        <div>
          <p className="h2">
            Backstage Talks is a magazine of casual, but in depth dialogues on
            design and business. Our decisions shape and influence this complex
            world—to have a chance to make the right ones, we need to talk.
            <a href="">© 2023 Published by Büro Milk</a>
          </p>
          <a href="" className="h2">
            Privacy Policy
          </a>
        </div>
      </div>

      <div className="center">
        <div className="identifier" ref={ref}></div>
        {images.map((img, i) => {
          const order = (i % images.length) + (images.length - i) - i;
          return (
            <section
              id={`Issue ${order}`}
              key={i}
              className="book"
              data-color={img.color}
              data-index={i}
            >
              <img src={img.src} alt="" />
              <h3>Issue # {order}</h3>
            </section>
          );
        })}
      </div>

      <div className="right">
        <h1>BACkSTAGE TALK</h1>
        <div>
          <ul>
            {images.map((img, i) => (
              <li key={i}>
                <a
                  rel="stylesheet"
                  href={`#Issue ${
                    (i % images.length) + (images.length - i) - i
                  }`}
                >
                  Issue # {(i % images.length) + (images.length - i) - i}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}

export default App;
