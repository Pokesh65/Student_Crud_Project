import './App.css'
import ListOfData from './Components/ListOfDataPage/ListOfData';
import Navbar from './Components/NavbarPage/Navbar';
import Main from './Components/MainPage/Main';
import Update from './Components/UpdatePage/Updatedata';
import Updatedata from './Components/UpdatePage/Updatedata';

function App() {
  return (
    <div className="App" style={{ backgroundColor: "#9B7EBD" }}>
      <div className='Header-container'>
        <Navbar />
      </div>
      <div className='Body-container'>
        <Main />
      
        {/* <Updatedata /> */}
      </div>



    </div>
  );
}

export default App;
