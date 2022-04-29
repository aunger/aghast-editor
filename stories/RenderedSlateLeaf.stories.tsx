import { ComponentMeta, ComponentStory } from "@storybook/react"
import React from "react"
import { Text } from "slate"
import { RenderedSlateLeaf } from "../components/RenderedSlateLeaf"
import "../styles/globals.css"

export default {
  title: "Example/RenderedSlateLeaf",
  component: RenderedSlateLeaf,
} as ComponentMeta<typeof RenderedSlateLeaf>

const Template: ComponentStory<typeof RenderedSlateLeaf> = (args) => <RenderedSlateLeaf {...args} />

export const Unstyled = Template.bind({})
Unstyled.args = {
  attributes: { "data-slate-leaf": true },
  children: "Leaf with base styling",
  leaf: { text: "" } as Text,
}

export const QS = Template.bind({})
QS.args = {
  attributes: { "data-slate-leaf": true },
  children: "Leaf with \\qs (Selah) character styling",
  leaf: { text: "", qs: true } as Text,
}
