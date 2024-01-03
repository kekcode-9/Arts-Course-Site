import React from 'react'

export default function CurrentUserHome({ params }: { params: { uid: string }}) {
  return (
    <div>Hello user {params.uid}</div>
  )
}
