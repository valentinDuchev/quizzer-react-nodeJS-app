import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow
} from 'mdb-react-ui-kit';

export default function App() {
  return (
    <MDBFooter bgColor='#184464' className='text-center text-lg-left'>
      <MDBContainer className='p-4'>
        <MDBRow>
          <MDBCol lg='6' md='12' className='mb-4 mb-md-0'>
            <h5 className='text-uppercase'>Welcome to Quizzer</h5>

            <p>
             Enjoy challenging yourself by solving and creating different types of quizes on a bunch of different topics with differnet types of difficulty.
            </p>
          </MDBCol>

          <MDBCol lg='6' md='12' className='mb-4 mb-md-0'>
            <h5 className='text-uppercase'>Play and learn at the same time!</h5>

            <p>
              Solve and create as many quizes as possible in order to gain as much rating as possible and become the best QUIZZER!
            </p>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        &copy; {new Date().getFullYear()} Copyright:{' '}
        <a className='text-dark' href='https://mdbootstrap.com/'>
          VALENTIN DUCHEV - SOFTUNI PROJECT SPRING 2023 <br/> valentinducev@gmail.com
        </a>
      </div>
    </MDBFooter>
  );
}