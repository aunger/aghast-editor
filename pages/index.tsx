import Head from "next/head"
//import styles from "../styles/Home.module.css"
import React, { useCallback, useMemo, useState } from "react"
import { Editable, withReact, Slate, RenderElementProps, RenderLeafProps } from "slate-react"
import { createEditor, Descendant, Element } from "slate"
import sampleAghast from "../ult_psa_aghast.json"
import { RenderedSlateLeaf } from "../components/RenderedSlateLeaf"
import { RenderedSlateElement } from "../components/RenderedSlateElement"
import { diffJson } from "diff"

export default function Home() {
  const [output, setOutput] = useState<Descendant[]>()

  const aghastDiff = useMemo(() => {
    if (!output || !sampleAghast) return <></>
    const diffs = diffJson(sampleAghast, output, { undefinedReplacement: "undefined" })
    if (!diffs) return <></>
    const spans = diffs.map((change, i) => (
      <span
        key={i}
        className={change.added ? "text-green-500" : change.removed ? "text-red-500" : "text-grey-500"}
      >
        {change.value}
      </span>
    ))
    return <pre className="text-xs">{spans}</pre>
  }, [output])

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
        <Slate editor={editor} value={sampleAghast} onChange={setOutput}>
          <Editable
            className="editable"
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            spellCheck={false}
            autoFocus={true}
          />
        </Slate>

        <output>{aghastDiff}</output>
      </div>
    </div>
  )
}
