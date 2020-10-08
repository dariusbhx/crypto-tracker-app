import React, {useState,useEffect} from 'react';
import axios from 'axios'
import './App.css'
import Coin from './Coin'
function App() {

const [coins, setCoins] = useState([]);
const[ search, setSearch] = useState('')
let api_link = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=gbp&order=market_cap_desc&per_page=100&page=1&sparkline=false'



useEffect(() => {
  axios
  .get(api_link)
  .then(res => {
      setCoins(res.data);
  }).catch(error => console.log(error))
});



const handleChange = e => {
  setSearch(e.target.value)
}

const filteredCoins = coins.filter(coin =>
  coin.name.toLowerCase().includes(search.toLowerCase()))
  return (
    <div className="coin-app">
     <div className = "coin-search">
      <h1 className= "coin-text">Search a currency</h1>
      <form>
        <input type= "text" placeholder= "Bitcoin" className = "coin-input" 
            onChange={handleChange}/>
      </form>
     </div>
    {filteredCoins.map(coin => {
      return(
        <Coin  key={coin.id} 
               name={coin.name}  
               price = {coin.current_price} 
               image = {coin.image}
               marketcap ={coin.market_cap}
               symbol = { coin.symbol }
               priceChange = {coin.market_cap_change_percentage_24h}
               volume = {coin.total_volume}/>
      )
    })}
    </div>
  );
}

export default App;
