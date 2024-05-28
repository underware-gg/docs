// import React from "react";
// import { Button } from "vocs/components"

type LogoProps = {
  src?: string
  // size
  small?: boolean
  big?: boolean
  // align
  center?: boolean
  left?: boolean
  right?: boolean
}

function Logo(props: LogoProps) {
  let divClasses:string[] = ['flex']
  if (props.center) divClasses.push('justify-center')
  else if (props.right) divClasses.push('justify-right')
  else if (props.left) divClasses.push('justify-left')
  
  let imgClasses: string[] = []
  if (props.small) imgClasses.push('LogoSmall')
  else if (props.big) imgClasses.push('LogoBig')
  else imgClasses.push('Logo')
  
  return (
    <div className={divClasses.join(' ')}>
      <img src={props.src} className={imgClasses.join(' ')} />
    </div>
  )
}

function Underware(props: LogoProps) {
  return <Logo {...props} src="/images/logo_underware.png" />
}

function Pistols(props: LogoProps) {
  return <Logo {...props} src="/images/logo_pistols.png" />
}

function Underdark(props: LogoProps) {
  return <Logo {...props} src="/images/logo_underdark.png" />
}

function Underworld(props: LogoProps) {
  return <Logo {...props} src="/images/logo_underworld.png" />
}

export default {
  Logo,
  Underware,
  Pistols,
  Underdark,
  Underworld,
}
