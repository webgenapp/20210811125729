import client from '../api'
import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import AForm from './AForm'
import { A } from '../types'
import { useQuery, useMutation, useQueryClient } from 'react-query'

function UpdateA() {
  const { id } = useParams<{ id: string }>()
  const queryClient = useQueryClient()
  const history = useHistory()

  const { data, isLoading } = useQuery<A>(['as', id], () =>
    client.get(`/api/v1/as/${id}`).then((response) => response.data)
  )

  const updateA = useMutation<A, any, A>(
    (values: A) =>
      client.put(`/api/v1/as/${id}`, values).then((response) => response.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('as')
      },
    }
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  const a = data as A
  return (
    <AForm
      a={a}
      onSubmit={(values, { setSubmitting }) => {
        updateA.mutate(values)
        setSubmitting?.(false)
        history.push('/as')
      }}
    />
  )
}

export default UpdateA
