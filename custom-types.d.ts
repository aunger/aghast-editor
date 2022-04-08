import { BaseEditor, BaseElement, BaseText } from "slate"
import { ReactEditor } from "slate-react"

type HasMarkers = { [key: string]: boolean | string }

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: BaseElement & { type: string; subType?: string; scope?: string; seqId?: string }
    Text: BaseText & HasMarkers
  }
}
