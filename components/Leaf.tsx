import React from "react"
import { RenderLeafProps } from "slate-react"

export const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  var classnames = []
  if (leaf.qs) classnames.push("character__qs")

  return (
    <span className={classnames.join(" ")} {...attributes}>
      {children}
    </span>
  )
}
