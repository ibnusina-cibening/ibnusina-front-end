import { ReactEditor, useSlateStatic } from "slate-react"
import YoutubeEmbed from "src/components/YoutubePlay"

export const Element = (props: { attributes: any, children: any, element: any }) => {
    // console.log(props)
    switch (props.element.type) {
        case 'block-quote':
            return <blockquote {...props.attributes}>{props.children}</blockquote>
        case 'bulleted-list':
            // console.log('hello');
            return <ul {...props.attributes}>{props.children}</ul>
        case 'heading-one':
            return <h1 {...props.attributes}>{props.children}</h1>
        case 'heading-two':
            return <h2 {...props.attributes}>{props.children}</h2>
        case 'list-item':
            return <li {...props.attributes}>{props.children}</li>
        case 'numbered-list':
            return <ol {...props.attributes}>{props.children}</ol>
        case 'image':
            return <Image {...props} />;
        case 'video':
            return <Video {...props} />;
        default:
            return <p {...props.attributes}>{props.children}</p>
    }
}



export function Video({ attributes, children, element }: { attributes: any, children: any, element: any }) {
    // const editor = useSlateStatic()
    const editor = useSlateStatic()
    const path = ReactEditor.findPath(editor, element)
    
    const { url } = element
    const youtubeRegex = /^(?:(?:https?:)?\/\/)?(?:(?:www|m)\.)?(?:(?:youtube\.com|youtu.be))(?:\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(?:\S+)?$/
    const matches = url.match(youtubeRegex);
    // const videoUrl = `https://www.youtube.com/embed/${matches[1]}`;
    return (
        <div {...attributes}>
            {children}
            <div contentEditable={false} style={{
                    position: 'relative'
                }}>
                <YoutubeEmbed embedId={matches[1]} />
            </div>
        </div>
    )
}

export const Image = ({ attributes, children, element }: { attributes: any, children: any, element: any }) => {
    const editor = useSlateStatic()
    const path = ReactEditor.findPath(editor, element)

    return (
        <div {...attributes}>
            {children}
            <div
                contentEditable={false}
                style={{
                    position: 'relative',
                    display: 'flex'
                }}
            >
                <img
                    src={element.url}
                    style={{
                    display: 'block',
                    width: '100%',
                    height: 'auto'
                    }}
                />
            </div>
        </div>
    )
}