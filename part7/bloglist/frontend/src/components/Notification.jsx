import "../notification.css";

import { useSelector } from 'react-redux'



const Notification = () => {

  const notification = useSelector(state => state.notification.message)
  const type = useSelector(state => state.notification.type)

  if (!notification) return null // hide when no message

  return (
    <div className={type}>
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