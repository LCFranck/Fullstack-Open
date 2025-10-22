
import AnecForm from './components/AnecForm'
import AnecList from './components/AnecList'
import VisibilityFilter from './components/VisibilityFilter'

const App = () => {
 

  return (
    <div>
      <h2>Anecdotes</h2>
      <VisibilityFilter/>
      <AnecList/>
      <AnecForm />
    </div>
  )
}

export default App