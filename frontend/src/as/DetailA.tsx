import React from 'react'
import { useParams } from 'react-router-dom'
import client from '../api'
import { useQuery } from 'react-query'
import { A } from '../types'

function DetailA() {
  const { id } = useParams<{ id: string }>()

  const { data, isLoading } = useQuery<A>(['as', id], () =>
    client.get(`/api/v1/as/${id}`).then((response) => response.data)
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  const a = data as A

  return (
    <div>
      <label>{a.a}</label>
      <br />
    </div>
  )
}

export default DetailA
