import React from 'react'
import Card from './Card'

const ListingItem = ({listing,loading}) => {

  return (
    <div>
		<Card listing={listing} loading={loading}/>
    </div>
  )
}

export default ListingItem