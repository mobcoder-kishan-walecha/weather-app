import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home';
import Table from './components/table/Index';
import Edit from './components/edit/Index';
import View from './components/view/Index';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/viewtable" element={< Table />} />
        <Route path='/viewtable/:id' element={<View />} />
        <Route path='/edit/:id' element={<Edit />} />
        <Route path="*" element={<p>404 Page Not Found</p>} />
      </Routes>
    </div>
  );
}

export default App;
