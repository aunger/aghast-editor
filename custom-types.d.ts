import { BaseEditor, BaseElement, BaseText } from "slate"
import { ReactEditor } from "slate-react"

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: BaseElement & AghastElement
    Text: BaseText & HasMarkers
  }
}

type HasMarkers = { [key: string]: boolean | string | undefined }

type AghastElement = {
  type: string
  subType?: string
  scope?: string
  seqId?: string
}
