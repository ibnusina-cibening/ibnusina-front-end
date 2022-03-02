import { useState, useMemo, useCallback } from 'react'
import { Descendant, BaseEditor, createEditor } from 'slate'
import { ReactEditor } from 'slate-react'
import { Element } from './Element'
import { Slate, Editable, withReact } from 'slate-react'

type CustomElement = { type: 'paragraph'; children: CustomText[] }
type CustomText = { text: string }


declare module 'slate' {
  interface CustomTypes {
      Editor: BaseEditor & ReactEditor
      Element: CustomElement
      Text: CustomText
  }
}

const ReadOnlyExample = ({values}: {values: any}) => {
  // console.log(values)
  const [value, setValue] = useState<Descendant[]>(JSON.parse(values) ?? {
    type: 'paragraph',
    children: [{ text: values }],
  })
  const editor = useMemo(() => withReact(createEditor()), [])
  
  const renderElement = useCallback(props => <Element {...props} />, [])

  return (
    <Slate editor={editor} value={value} onChange={value => setValue(value)}>
      <Editable readOnly renderElement={renderElement}/>
    </Slate>
  )
}

export default ReadOnlyExample