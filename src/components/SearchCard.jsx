import React from 'react'

function SearchCard({bill, handleFetch}) {
  return (
    <div>
    <h4>Title: {bill.title}</h4>
    <p>Congress: {bill.bill_id.split("-")[1]}</p>
    <p>Bill type: {bill.bill_type.toUpperCase()}</p>
    <p>Bill number: {bill.bill_slug.replace(/\D/g,'')}</p>
    <button onClick={handleFetch}> Add to Lookup List </button>
    </div>
  )
}

export default SearchCard