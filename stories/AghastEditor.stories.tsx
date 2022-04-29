import { ComponentMeta, ComponentStory, Meta } from "@storybook/react"
import React from "react"
import { AghastEditor, AghastEditorProps } from "../components/AghastEditor"
import "../styles/globals.css"
import sampleAghast from "../ult_psa_1-3_aghast.json"

export default {
  title: "Example/AghastEditor",
  component: AghastEditor,
} as Meta

const Template: ComponentStory<typeof AghastEditor> = (args) => <AghastEditor {...args} />

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing

export const Basic = (props: AghastEditorProps) => <AghastEditor {...props} />
Basic.args = {
  value: sampleAghast,
  onChange: undefined,
  onChangeAsString: undefined,

  readOnly: false,
  spellCheck: false,
  autoFocus: true,

  children: [],
}

export const ReadOnly = (props: AghastEditorProps) => <AghastEditor {...props} />
ReadOnly.args = {
  value: sampleAghast,
  onChange: undefined,
  onChangeAsString: undefined,

  readOnly: true,
  spellCheck: false,
  autoFocus: true,

  children: [],
}

export const AghastAsStrings = (props: AghastEditorProps) => <AghastEditor {...props} />
AghastAsStrings.args = {
  value: JSON.stringify(sampleAghast),
  onChange: undefined,
  onChangeAsString: undefined,

  readOnly: false,
  spellCheck: false,
  autoFocus: true,

  children: [],
}
