import { ReactNode } from "react"

function Code({
  children
}: {
  children: ReactNode
}) {
  return (
    <code className='vocs_Code'>
      {children}
    </code>
  )
}

export {
  Code,
}
