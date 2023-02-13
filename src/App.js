import { useState, useEffect } from 'react';
import './app.css'

function App() {
  const [result, setResult] = useState(0);
  const [currency1, setCurrency1] = useState('');
  const [currency2, setCurrency2] = useState('');
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);
  const convert = (from, to) => {
    var requestURL = `https://api.exchangerate.host/convert?from=${from}&to=${to}`; 
    var request = new XMLHttpRequest(); 
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function() {
      var response = request.response;
      setResult( (prev) => (prev = response.result));
      setTo( (prev) => (prev = (response.result * 1).toLocaleString()));
    }
  }

  const optionChangeFrom = (e) => {
    setFrom((prev) => prev=0);
    setTo((prev) => prev=0);
    return setCurrency1( (prev) => (prev = e.target.value))
  }
  const optionChangeTo = (e) => {
    setFrom(prev => (prev=0));
    setTo(prev => (prev=0));
    document.querySelector('#from').value = 1;
    document.querySelector('#from').focus();
    return setCurrency2( (prev) => (prev = e.target.value))
  }

  const changeFrom = (e) => {
    setFrom( (prev) => (prev = e.target.value) );
  }

  useEffect( () => {
    convert(currency1, currency2);
  }, [currency1])
  useEffect( () => {
    convert(currency1, currency2);
  }, [currency2])
  useEffect( () => {
    setTo(prev => (prev = (from * result).toLocaleString()))
  }, [from])

  return (
    <div className='wrap'>
      <h1>환율 계산기</h1>
      <div className='box'>
        <div className='container' id='container1'>
          <input className='currency' id='from' placholder={from} onChange={changeFrom} />
          <span>|</span>
          <select defaultValue='desc' onChange={optionChangeFrom}>
            <option value='desc'>통화를 선택하세요</option>
            <option value='USD'>미국 USD</option>
            <option value='CAD'>캐나다 CAD</option>
            <option value='KRW'>대한민국 KRW</option>
            <option value='MXN'>멕시코 MXN</option>
            <option value='EUR'>유럽연합 EUR</option>
          </select>
        </div>
        <div className='container' id='container2'>
          <input disabled className='currency' id='to' value={to} />
          <span>|</span>
          <select defaultValue='desc' onChange={optionChangeTo}>
            <option value='desc'>통화를 선택하세요</option>
            <option value='USD'>미국 USD</option>
            <option value='CAD'>캐나다 CAD</option>
            <option value='KRW'>대한민국 KRW</option>
            <option value='MXN'>멕시코 MXN</option>
            <option value='EUR'>유럽연합 EUR</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default App;
