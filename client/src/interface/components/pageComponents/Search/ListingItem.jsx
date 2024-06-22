import React from 'react'
import PropTypes from 'prop-types'
import Card from './Card'

const ListingItem = ({listing, loading}) => {
  return (
    <div>
      <Card listing={listing} loading={loading}/>
    </div>
  )
}

ListingItem.propTypes = {
  listing: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default ListingItem