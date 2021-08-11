import client from '../api'
import { FormikHelpers } from 'formik'
import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { A, AError } from '../types'
import AForm from './AForm'
import { useHistory } from 'react-router-dom'

function CreateA() {
  const queryClient = useQueryClient()
  const history = useHistory()
  const createA = useMutation<A, AError, A>(
    (values) => {
      return client.post('/api/v1/as', values)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('as')
      },
    }
  )

  const handleSubmit = (values: A, { setSubmitting }: FormikHelpers<A>) => {
    createA.mutate(values)
    setSubmitting?.(false)
    history.push('/as')
  }

  return <AForm onSubmit={handleSubmit} />
}

export default CreateA
