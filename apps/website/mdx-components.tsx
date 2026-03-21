import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold mt-8 mb-3 pb-2 border-b border-current/10">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold mt-6 mb-2">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="mb-4 leading-7">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="mb-4 ml-6 list-disc space-y-1">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-4 ml-6 list-decimal space-y-1">{children}</ol>
    ),
    li: ({ children }) => <li className="leading-7">{children}</li>,
    code: ({ children }) => (
      <code className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 text-sm font-mono">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="mb-4 p-4 rounded-xl bg-[#1e1e2e] text-[#cdd6f4] overflow-x-auto text-sm font-mono">
        {children}
      </pre>
    ),
    table: ({ children }) => (
      <div className="mb-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th className="text-left p-3 border-b-2 border-current/10 font-semibold">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="p-3 border-b border-current/5">{children}</td>
    ),
    hr: () => <hr className="my-8 border-current/10" />,
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-blue-600 dark:text-blue-400 underline underline-offset-2 hover:text-blue-800 dark:hover:text-blue-300"
      >
        {children}
      </a>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mb-4 pl-4 border-l-4 border-blue-500/30 italic">
        {children}
      </blockquote>
    ),
    ...components,
  };
}
