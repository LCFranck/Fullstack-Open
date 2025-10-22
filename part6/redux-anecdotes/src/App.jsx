
import AnecForm from './components/AnecForm'
import AnecList from './components/AnecList'
import VisibilityFilter from './components/VisibilityFilter'
import Notification from './components/Notification'


const App = () => {
 

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification/>
      <VisibilityFilter/>
      <AnecList/>
      <AnecForm />
    </div>
  )
}

export default App

