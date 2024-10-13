import './App.css';
import SearchQuery from './SearchQuery';
import History from './History'
import {useState} from 'react'
import { motion } from "framer-motion";


function App() {
  const [openTab,setOpenTab]=useState(false)
  return (
    <div className="flex">
      <SearchQuery setOpenTab={setOpenTab}/>
     {openTab && <motion.div
            initial={{ opacity: 0, y: 50 }}   // starting state (faded out and shifted down)
            animate={{ opacity: 1, y: 0 }}    // animated to (fully visible and at position)
            exit={{ opacity: 0, y: 50 }}      // exit state (fades out and shifts down)
            transition={{ duration: 0.5, delay: 0.4 }}  // transition speed and delay
          >  <History  setOpenTab={setOpenTab}/>  </motion.div>}
    </div>
  );
}

export default App;
