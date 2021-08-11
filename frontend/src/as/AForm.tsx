import React from 'react'
import { Formik, Field, Form, FormikHelpers } from 'formik'
import { A } from '../types'

type CreateProps = {
  a?: A
  onSubmit: (values: A, helpers: FormikHelpers<A>) => void
}

function AForm({ a, onSubmit }: CreateProps) {
  const initialValues: A = {
    a: a ? a.a : '',
  }

  return (
    <Formik
      initialValues={initialValues}
      validate={() => {
        return {}
      }}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type='text' name='a' placeholder='A' />

          <button type='submit' disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default AForm
