import React, { useCallback, useMemo, useState } from "react"
import { Editable, withReact, Slate } from "slate-react"
import { createEditor, Descendant, Element } from "slate"
import { RenderedSlateElement } from "./RenderedSlateElement"
import { RenderedSlateLeaf } from "./RenderedSlateLeaf"

export const AghastEditor = ({
  value,
  onChange,
  onChangeAsString,
  children,
  ...props
}: AghastEditorProps) => {
  const editor = useMemo(() => {
    const e = withReact(createEditor())
    e.isInline = (n: Element) => n.type === "mark"
    return e
  }, [])

  const slateValue = useMemo(() => (typeof value == "string" ? JSON.parse(value) : value), [value])

  const slateOnChange = useMemo(() => {
    if (onChangeAsString) {
      if (onChange) {
        return (newValue: Descendant[]) => {
          onChange(newValue)
          onChangeAsString(JSON.stringify(newValue))
        }
      } else {
        return (newValue: Descendant[]) => onChangeAsString(JSON.stringify(newValue))
      }
    } else {
      return onChange
    }
  }, [onChange, onChangeAsString])

  return (
    <Slate editor={editor} value={slateValue} onChange={slateOnChange}>
      <Editable
        className="editable"
        renderElement={RenderedSlateElement}
        renderLeaf={RenderedSlateLeaf}
        {...props}
      />
      {children}
    </Slate>
  )
}

export type AghastEditorProps = {
  value: string | Descendant[]
  onChange?: (value: Descendant[]) => void
  onChangeAsString?: (value: string) => void

  spellCheck?: boolean
  autoFocus?: boolean
  readOnly?: boolean

  children?: React.ReactNode
}
