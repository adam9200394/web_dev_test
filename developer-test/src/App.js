import './App.css';
import Header from './components/Header';
import Selection from './components/Selection';
import AppDataProvider  from './data/context';

function App() {
  return (
    <div className="App" >
      <AppDataProvider>
        <Header title="Selection Box Test_" />
        <Selection />
      </AppDataProvider>
    </div>
  );
}

export default App;
