import React from 'react'
import Card from './Card'

const ListingItem = ({listing}) => {

  return (
    <div>
		<Card listing={listing} />
    </div>
  )
}

export default ListingItem