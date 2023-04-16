import { Routes, Route } from 'react-router-dom';

import './App.css';

import { Home } from './components/Home/Home';
import { MyProfile } from './components/My-profile/MyProfile';
import Navigation from './components/Navigation/Navigation';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Create } from './components/Create/Create-Form/Create';
import { Quizes } from './components/Quizes/Quizes';
import { Ranking } from './components/Ranking/Ranking';
import { QuizPage } from './components/Quiz-home/QuizPage';
import NewModal from './components/Create/Modal/NewModal';
import { Login } from './components/Authentication/Login/Login';
import { Register } from './components/Authentication/Register/Register';
import { useEffect, useState } from 'react';
import useTheme from './hooks/useTheme';
import Protected from './components/Authentication/Protected';
import ProtectedLogin from './components/Authentication/ProtectedLogin';
import useAuth from './hooks/useAuth';



function App() {
  const darkBackground = './cool-background.png';

  const { dark, setDark } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const { auth, setAuth } = useAuth()



  useEffect(() => {
    if (auth.email) {
      setIsLoggedIn(true)
    }

    const email = localStorage.getItem('email')
    const name = localStorage.getItem('name')
    const id = localStorage.getItem('id')
    const accessToken = localStorage.getItem('accessToken')

    if (email && name && id && accessToken) {
      if (!auth.email) {
        setAuth({
          email, name, id, accessToken
        })
      }
    }

  }, [auth, isLoggedIn])
  return (

    <div className="App"
      style={{
        backgroundImage:
        dark
            ? `url(${require("./cool-background1.png")})`
            : `url(${require("./cool-background.png")})`
      }}>
      <header className='App-header'>

        <Navigation />


        <Routes>
          <Route path='/home' element={<Home />} />

          <Route path='/profile/:email'
            element={<Protected
              isLoggedIn={isLoggedIn}>
              <MyProfile />
            </Protected>} />

          <Route path='/create'
            element={<Protected
              isLoggedIn={isLoggedIn}>
              <Create />
            </Protected>} />

          <Route path='/quizes/:filter1?' element={<Quizes />} />
          <Route path='/ranking/:filterTypeUrl?/:filterUrl?' element={<Ranking />} />


          <Route path='/login' element={<ProtectedLogin
            isLoggedIn={isLoggedIn}>
            <Login />
          </ProtectedLogin>} />

          <Route path='/register' element={<ProtectedLogin
            isLoggedIn={isLoggedIn}>
            <Register />
          </ProtectedLogin>} />

          <Route path='/quiz-page/:quizId/:pageType/:questionNumber?' element={<Protected
            isLoggedIn={isLoggedIn}>
            <QuizPage />
          </Protected>} />



        </Routes>


      </header>

    </div>
  );
}

export default App;
