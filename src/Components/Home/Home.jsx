import UserProfile from "../UserProfile/UserProfile"
import bodyStyle from './Home.module.css'

export default function Home({}) {

  
    return (
        <>
       <div id= {bodyStyle.card}>
            <UserProfile />        
        </div>
        </>
    )
}