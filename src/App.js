import './App.css';
import { useState, useEffect, useCallback } from 'react';

const Beer = ({beer}) => {
  return (
    <div> 
    <div style={{fontSize: '10pt'}}>{beer.name}</div>
    <img src={beer.image_url} alt='' style={{width: '30px', float: 'left', paddingRight: '10px', paddingBottom: '10px'}}/>
    <p style={{fontSize: '10pt'}}>{beer.tagline}</p>
    </div>
  );
};

function App() {
  const [beers, setBeers] = useState([]);
  const [page, setPage] = useState(1);

   const getBeers = useCallback((pageNum) => {
    let beerUrl = `https://api.punkapi.com/v2/beers?page=${pageNum}`;

    fetch(beerUrl)
      .then((res) => res.json())
      .then((data) => {
        setBeers((prevBeers) => [...beers, ...data]);
      });
   },[beers]);
  

   useEffect(() => {
    const infiniteScroll = () => {
      if(window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
        let newPage = page + 1;
        setPage(newPage);
        getBeers(newPage);
      }};
      
      window.addEventListener('scroll', infiniteScroll);
      getBeers(page)
      console.log(beers);
      console.log(page);
      return () => {
        window.removeEventListener('scroll', infiniteScroll);
      };
   },[page, getBeers, beers]);

  //console.log(beers);
  return (
    <div className="App">
      <p>Beers</p>
      {beers.map((beer, index) => (
        <Beer beer={beer} key={index} />
      ))}
    </div>
  );
}

export default App;
