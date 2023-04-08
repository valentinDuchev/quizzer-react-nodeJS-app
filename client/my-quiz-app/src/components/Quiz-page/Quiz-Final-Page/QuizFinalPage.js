import { useNavigate, useParams } from "react-router-dom";


export const QuizFinalPage = (props) => {

    const result = localStorage.getItem('currentResult')
    const userId = localStorage.getItem('id')
    const userEmail = localStorage.getItem('email')

    const {quizId} = useParams()
    const token = localStorage.getItem('accessToken')

    const navigate = useNavigate();

    const totalQuestionsNumber = localStorage.getItem('questionsNumber')

    const finish = () => {
        console.log('finish')
        console.log(result)

        try {
            console.log(token)
            fetch(`http://localhost:3001/api/quiz/${quizId}/solve`, {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'token': token, 
                    'result': result
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    navigate('/quizes')
                })
                .catch((err) => {
                    console.log(err.message);
                });
        } catch (err) {
            console.log(err)
        }


        console.log(quizId, userEmail, userId)
    }


    return (
        <div>
            Your result is: {result}/{totalQuestionsNumber}
            <button onClick={finish}>Finish quiz</button>
        </div>
    )

}

