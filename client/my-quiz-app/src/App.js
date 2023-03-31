import { Routes, Route } from 'react-router-dom';

import './App.css';

import { Home } from './components/Home/Home';
import { MyProfile } from './components/My-profile/MyProfile';
import  Navigation  from './components/Navigation/Navigation';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Create } from './components/Create/Create-Form/Create';
import { Quizes } from './components/Quizes/Quizes';
import { Ranking } from './components/Ranking/Ranking';
import { QuizPage } from './components/Quiz-home/QuizPage';
import NewModal from './components/Create/Modal/NewModal';



function App() {
  return (
    <div className="App">
      <header className='App-header'>

        <Navigation/>

        
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/my-profile' element={<MyProfile />} />
          <Route path='/create' element={<Create />} />
          <Route path='/quizes/*' element={<Quizes />} />
          <Route path='/ranking' element={<Ranking />} />

          <Route path='/quiz-page/:quizId/:pageType/:questionNumber?' element={<QuizPage />} /> {/* pageType-Home quiz page/Quiz page/Final page ||||| */}

        



        </Routes>


      </header>

    </div>
  );
}

export default App;
