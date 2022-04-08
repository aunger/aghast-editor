import React from "react"
import { RenderElementProps } from "slate-react"
import { Element as SlateElement } from "slate"

export const Element = (renderElementProps: RenderElementProps) => {
  const Renderer = rendererMap[renderElementProps.element.type] ?? UnknownElement
  return Renderer(renderElementProps)
}

const rendererMap: Record<string, (RenderElementProps) => JSX.Element> = {
  block: AghastBlock,
  mark: AghastMark,
  inlineGraft: InlineGraft,
  blockGraft: BlockGraft,
}

function UnknownElement({ element, attributes, children }: RenderElementProps) {
  const className = ClassNameFromElementAttributes(element)
  return (
    <div className={className} {...attributes}>
      {children}
    </div>
  )
}

function AghastBlock({ element, attributes, children }: RenderElementProps) {
  const HtmlTag = HtmlTagForBlock(element)
  const className = ClassNameFromElementAttributes(element)
  return (
    <HtmlTag className={className} {...attributes}>
      {children}
    </HtmlTag>
  )
}

function AghastMark({ element, attributes, children }: RenderElementProps) {
  const HtmlTag = HtmlTagForMark(element)
  const className = ClassNameFromElementAttributes(element)
  return (
    <HtmlTag className={className} {...attributes}>
      {children}
    </HtmlTag>
  )
}

function InlineGraft({ element, attributes, children }: RenderElementProps) {
  const className = ClassNameFromElementAttributes(element)
  return (
    <aside className={className} {...attributes}>
      <data value={element.seqId}>{children}</data>
    </aside>
  )
}

function BlockGraft({ element, attributes, children }: RenderElementProps) {
  const className = ClassNameFromElementAttributes(element)
  return (
    <aside className={className} {...attributes}>
      <data value={element.seqId}>{children}</data>
    </aside>
  )
}

function HtmlTagForBlock({ scope }: SlateElement) {
  const testForTitle = /^[^/]+\/(qa|[dms]\d?)$/i
  const testForQuote = /^[^/]+\/q[rc\d]?$/i
  if (testForTitle.test(scope)) return "div"
  if (testForQuote.test(scope)) return "blockquote"
  return "p"
}

function HtmlTagForMark(element: SlateElement): "span" {
  // if (element.scope?.startsWith("chapter")) return "b"
  // if (element.scope?.startsWith("verse")) return "sup"
  return "span"
}

function ClassNameFromElementAttributes(element: SlateElement) {
  if (element.type && element.subType) return element.type + "__" + element.subType
  const splitScope = element.scope?.split("/")
  if (element.type == "mark") return splitScope[0]
  return splitScope.join("__")
}
