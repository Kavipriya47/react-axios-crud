import './App.css';
import Posts from './components/Posts';
import Comments from './components/Comments';
// The following line can be included in your src/index.js or App.js file
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Posts />
      <Comments />
    </div>
  );
}

export default App;
