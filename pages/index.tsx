import Head from "next/head"
//import styles from "../styles/Home.module.css"
import React, { useCallback, useMemo, useState } from "react"
import { Editable, withReact, Slate, RenderElementProps, RenderLeafProps } from "slate-react"
import { createEditor, Descendant, Element } from "slate"
import sampleAghast from "../ult_psa_aghast.json"
import { RenderedSlateLeaf } from "../components/RenderedSlateLeaf"
import { RenderedSlateElement } from "../components/RenderedSlateElement"

export default function Home() {
  const [value, setValue] = useState<Descendant[]>(sampleAghast)

  const renderElement = useCallback((props: RenderElementProps) => <RenderedSlateElement {...props} />, [])
  const renderLeaf = useCallback((props: RenderLeafProps) => <RenderedSlateLeaf {...props} />, [])

  const editor = useMemo(() => {
    const e = withReact(createEditor())
    e.isInline = (n: Element) => n.type === "mark"
    // e.isVoid = (n: Element) => n.type === "mark"
    return e
  }, [])

  return (
    <div>
      <Head>
        <title>AGHAST Editor</title>
        <meta name="description" content="I'm aghast!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="grid grid-cols-2">
        <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
          <Editable
            className="editable"
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            spellCheck={false}
            autoFocus={true}
          />
        </Slate>

        <output>
          <pre className="text-xs">{JSON.stringify(sampleAghast, null, 2)}</pre>
        </output>
      </div>
    </div>
  )
}
