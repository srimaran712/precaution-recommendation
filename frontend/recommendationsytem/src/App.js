import './App.css';
import SearchQuery from './SearchQuery';
import History from './History'
import {useState} from 'react'


function App() {
  const [openTab,setOpenTab]=useState(false)
  return (
    <div className="flex">
      <SearchQuery setOpenTab={setOpenTab}/>
     {openTab &&  <History setOpenTab={setOpenTab}/>}
    </div>
  );
}

export default App;
