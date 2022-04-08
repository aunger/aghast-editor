import Head from "next/head"
//import styles from "../styles/Home.module.css"
import React, { useCallback, useMemo, useState } from "react"
import { Editable, withReact, Slate, RenderElementProps, RenderLeafProps } from "slate-react"
import { createEditor, Descendant } from "slate"
import sampleAghast from "../ult_psa_aghast.json"
import { Leaf } from "../components/Leaf"
import { Element } from "../components/Element"

export default function Home() {
  const [value, setValue] = useState<Descendant[]>(sampleAghast)
  const renderElement = useCallback((props: RenderElementProps) => <Element {...props} />, [])
  const renderLeaf = useCallback((props: RenderLeafProps) => <Leaf {...props} />, [])
  const editor = useMemo(() => withReact(createEditor()), [])

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
