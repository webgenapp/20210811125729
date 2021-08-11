import React from 'react'
import { useQueryClient, useQuery, useMutation } from 'react-query'
import client from '../api'
import { A } from '../types'
import { useHistory } from 'react-router-dom'

type APreviewProps = {
  a: A
  handleEdit: (a: A) => void
  handleDelete: (a: A) => void
  handleDetail: (a: A) => void
}

function APreview({
  a,
  handleEdit,
  handleDelete,
  handleDetail,
}: APreviewProps) {
  return (
    <>
      {a.a}
      <br />
      <button type='button' onClick={() => handleDetail(a)}>
        detail
      </button>
      <button type='button' onClick={() => handleEdit(a)}>
        edit
      </button>
      <button type='button' onClick={() => handleDelete(a)}>
        delete
      </button>
    </>
  )
}

function ListAs() {
  const history = useHistory()
  const queryClient = useQueryClient() // eslint-disable-line no-unused-vars
  const asQuery = useQuery<A[]>('as', () => {
    return client
      .get('/api/v1/as')
      .then((response) => response.data) as Promise<A[]>
  })

  const deleteA = useMutation<any, any, Partial<A>>(
    ({ id }) => {
      return client.delete(`/api/v1/as/${id}`)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('as')
      },
    }
  )

  const handleEdit = ({ id }: A) => {
    history.push(`/as/update/${id}`)
  }

  const handleDelete = ({ id }: A) => {
    deleteA.mutate({ id })
  }

  const handleDetail = ({ id }: A) => {
    history.push(`/as/detail/${id}`)
  }

  return (
    <>
      <p>{asQuery.data?.length} as</p>
      <ul>
        {asQuery.data?.map((a) => (
          <li key={a.id}>
            <APreview
              a={a}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleDetail={handleDetail}
            />
          </li>
        ))}
      </ul>
    </>
  )
}

export default ListAs
