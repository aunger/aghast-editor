import { ComponentMeta, ComponentStory } from "@storybook/react"
import React from "react"
import { RenderedSlateElement } from "../components/RenderedSlateElement"
import "../styles/globals.css"

export default {
  title: "Example/RenderedSlateElement",
  component: RenderedSlateElement,
} as ComponentMeta<typeof RenderedSlateElement>

const Template: ComponentStory<typeof RenderedSlateElement> = (args) => <RenderedSlateElement {...args} />

export const ChapterMark = Template.bind({})
ChapterMark.args = {
  attributes: { "data-slate-node": "element", ref: null },
  children: "c 1",
  element: { type: "mark", scope: "chapter/1", subType: undefined, seqId: undefined, children: [] },
}

export const VerseMark = Template.bind({})
VerseMark.args = {
  attributes: { "data-slate-node": "element", ref: null },
  children: "v 1",
  element: { type: "mark", scope: "verses/1", subType: undefined, seqId: undefined, children: [] },
}

export const UnknownMark = Template.bind({})
UnknownMark.args = {
  attributes: { "data-slate-node": "element", ref: null },
  children: "unknown mark",
  element: { type: "mark", scope: "unknown/scope", subType: undefined, seqId: undefined, children: [] },
}
