import { render, screen } from "@testing-library/react"
import { composeStories } from "@storybook/testing-react"
import * as stories from "../stories/AghastEditor.stories"

// Every component that is returned maps 1:1 with the stories, but they already contain all decorators from story level, meta level and global level.
const { Basic, ReadOnly, AghastAsStrings } = composeStories(stories)

test("renders basic editor with default args", () => {
  render(<Basic />)
  const titleElement = screen.getByText(/>> Title/)
  expect(titleElement).not.toBeNull()
  const verseElements = screen.getAllByText(/v 3/)
  expect(verseElements).not.toBeNull()
  expect(verseElements[0]).not.toBeNull()
})
