import Head from "next/head"
import React, { useMemo, useState } from "react"
import { diffJson } from "diff"
import { AghastEditor } from "../components/AghastEditor"
import sampleAghast from "../ult_psa_1-3_aghast.json"

const sampleAghastString = JSON.stringify(sampleAghast)

export default function Home() {
  const [output, setOutput] = useState<any>()

  return (
    <div>
      <Head>
        <title>AGHAST Editor</title>
        <meta name="description" content="I'm aghast!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="grid grid-cols-2">
        <AghastEditor value={sampleAghastString} onChange={setOutput} />
        <AghastDiffViewer old={sampleAghast} update={output} />
      </div>
    </div>
  )
}

function AghastDiffViewer(props: { old: any; update: any }) {
  const spans = useMemo(() => {
    if (!props.update || !props.old) return []
    const diffs = diffJson(props.old, props.update, { undefinedReplacement: "undefined" })
    return diffs.map((change, i) => (
      <span
        key={i}
        className={change.added ? "text-green-500" : change.removed ? "text-red-500" : "text-grey-500"}
      >
        {change.value}
      </span>
    ))
  }, [props.old, props.update])
  return (
    <output>
      <pre className="text-xs">{spans}</pre>
    </output>
  )
}
