 import "../notification.css";



import { useSelector } from 'react-redux'



const Notification = () => {

  const notification = useSelector(state => state.notification)

  if (!notification) return null // hide when no message

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
/*
const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }

  return <div className={type}>{message}</div>;
};

export default Notification;
 */