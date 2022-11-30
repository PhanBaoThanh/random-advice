import './App.scss';
import {useState,useEffect,useCallback} from 'react'
import axios from 'axios'
import debounce from 'lodash.debounce'

function App() {
  const [value,setValue] = useState()
  const [isLoading,setIsLoading] = useState(true)

  const fetchApi = async() => {
    await axios.get('https://api.adviceslip.com/advice')
    .then(res => {
      const {advice} = res.data.slip;
      setValue(advice)
    })
    .catch(err => console.log(err))
    setIsLoading(false)
  }

  const debounceDropDown = useCallback(debounce( () => fetchApi(), 600), [])

  const handleClickGetApi = () => {
    setIsLoading(true)
    debounceDropDown()
  }

  useEffect(() => {
    debounceDropDown()
  },[])



  return (
    <div className="App">
      <div className='box'>
        <div className='textZone'>
          {
            isLoading ? (
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="spinner" className="svg" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M304 48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zm0 416c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM48 304c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm464-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM142.9 437c18.7-18.7 18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zm0-294.2c18.7-18.7 18.7-49.1 0-67.9S93.7 56.2 75 75s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zM369.1 437c18.7 18.7 49.1 18.7 67.9 0s18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9z"></path></svg>
            ) : (
              <p className='text'>{value}</p>
            )
          }
        </div>
        <div className='btn'>
          <button onClick={handleClickGetApi} disabled={isLoading} >Random</button>
        </div>
      </div>
    </div>
  );
}

export default App;
