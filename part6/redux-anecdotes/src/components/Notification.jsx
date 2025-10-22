
import { useSelector } from 'react-redux'



const Notification = () => {

  const notification = useSelector(state => state.notification)
    
  if (!notification) return null // hide when no message

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

 // const dispatch = useDispatch()
  //dispatch(aChange())
  

    

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification