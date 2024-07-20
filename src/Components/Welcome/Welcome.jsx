import styled, { keyframes } from 'styled-components';
import { useNavigate} from 'react-router-dom';

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// Define a styled component
const StyledDiv = styled.div`
  height: 100vh; /* Full viewport height */
  background: linear-gradient(45deg, #000, #0f9d58); /* Gradient background */
  background-size: 400% 400%; /* Background size for animation */
  animation: ${gradientAnimation} 15s ease infinite; /* Animation settings */
`;


export default function Welcome({}) {

let navigate =  useNavigate()
    
function onGetStarted() {
    console.log('Navigating to home')
    navigate('/home')
}

    return (
        <>
        <StyledDiv>
         <div className='flex flex-col md:flex-row md:justify-around items-center justify-center h-screen'>
         <h1 className="text-white md:text-blue-400 text-3xl mb-4 font-extrabold md:p-4 md:rounded md:bg-gradient-to-r from-green-500 to-black">Welcome to Mile...</h1>
          <div className='text-center font-mono'>
          <p className="text-gray-300 text-lg mb-8">Listen to your favorite songs for free</p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto"
      onClick={onGetStarted}>
        Get Started
      </button>
          </div>
         </div>
        </StyledDiv>
        
        </>
    )
}