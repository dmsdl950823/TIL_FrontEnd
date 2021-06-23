import React, { useState, useEffect } from 'react'

const FriendStatus = ({ friend }) =>  {
  const [isOnline, setIsOnline] = useState(null)

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline)
    }
    ChatAPI.subscribeToFriendStatus(friend.id, handleStatusChange)
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friend.id, handleStatusChange)
    }
  })

  if (isOnline === null) {
    return 'Loading...'
  }
  return isOnline ? 'Online' : 'Offline'
}