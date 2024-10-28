// custom components
import UserProfile from "../UserProfile/UserProfile"
import SearchSong from "../SearchSong/SearchSong"

//error boundary
import ErrorBoundary from "../ErrorBoundrys/ErrorBoundary"

//back stylin
import styles from './display1.module.css'
export default function Display1({}) {

    return (
      <>
      <div className={styles.card}>
      <ErrorBoundary>
        <UserProfile />
      </ErrorBoundary>
      <div className="mt-4">
      <ErrorBoundary fallBack = "Failed to search for song">
        <SearchSong />
      </ErrorBoundary>
      </div>
      
      </div>
      </>
    )
}