import React from 'react'

function UserCard() {
  return (
    <div>
    {/* <img src={`${user.profilePicURL}`} /> */}
    <h3>
        {user.name}
    </h3>
    <h2>
        {email}
    </h2>
    </div>
  )
}

export default UserCard