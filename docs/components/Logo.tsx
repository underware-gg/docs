// import React from "react";
// import { Button } from "vocs/components"

type LogoProps = {
  small?: boolean
  big?: boolean
  src?: string
}

function Logo(props: LogoProps) {
  let classNames:string[] = []
  if (props.small) classNames.push('LogoSmall')
  else if (props.big) classNames.push('LogoBig')
  else classNames.push('Logo')
  return <img src={props.src} className={classNames.join(' ')}/>
}

function Underware(props: LogoProps) {
  return <Logo {...props} src="/images/logo_underware.png" />
}

export default {
  Logo,
  Underware,
}
