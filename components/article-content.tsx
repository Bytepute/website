import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import remarkGfm from "remark-gfm"

type ArticleContentProps = {
  content: string
}

export function ArticleContent({ content }: ArticleContentProps) {
  return (
    <div className="article-content">
      <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
        {content}
      </Markdown>
    </div>
  )
}
