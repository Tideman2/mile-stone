 //gh G " "
import styles from "../Displays/display1.module.css"

function Layout({children}) {

    return (
        
        <div className={styles.card}>
       <p>dis is d layout component</p>
        {children}
        </div>
       
    )
}

export default Layout