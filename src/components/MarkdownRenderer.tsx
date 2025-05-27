import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface MarkdownRendererProps {
  content: string;
  isDark: boolean;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  isDark,
}) => (
  <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    rehypePlugins={[rehypeRaw]}
    components={{
      code(props: any) {
        const { inline, className, children, ...rest } = props;
        const match = /language-(\w+)/.exec(className || "");
        return !inline && match ? (
          <SyntaxHighlighter
            style={oneDark}
            language={match[1]}
            PreTag="div"
            className="rounded-lg !bg-gray-900 !mt-2 !mb-2"
            {...rest}
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        ) : (
          <code
            className={`${
              isDark
                ? "bg-gray-800 text-gray-200"
                : "bg-gray-200 text-gray-800"
            } px-1 py-0.5 rounded text-sm ${className}`}
            {...rest}
          >
            {children}
          </code>
        );
      },
      p: ({ children }) => <p className="mb-2 leading-relaxed">{children}</p>,
      ul: ({ children }) => (
        <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>
      ),
      ol: ({ children }) => (
        <ol className="list-decimal list-inside mb-2 space-y-1">
          {children}
        </ol>
      ),
      blockquote: ({ children }) => (
        <blockquote
          className={`border-l-4 ${
            isDark
              ? "border-blue-500 bg-gray-800"
              : "border-blue-500 bg-blue-50"
          } pl-4 py-2 my-2 italic`}
        >
          {children}
        </blockquote>
      ),
      h1: ({ children }) => (
        <h1 className="text-2xl font-bold mb-2">{children}</h1>
      ),
      h2: ({ children }) => (
        <h2 className="text-xl font-bold mb-2">{children}</h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-lg font-bold mb-2">{children}</h3>
      ),
    }}
  >
    {content}
  </ReactMarkdown>
);

export default MarkdownRenderer; 