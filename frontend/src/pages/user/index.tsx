import Router from 'next/router'
import React, { useEffect } from 'react'

export default function Admin () {
  useEffect(() => {
    Router.push('/user/default')
  })

  return <div />
}
