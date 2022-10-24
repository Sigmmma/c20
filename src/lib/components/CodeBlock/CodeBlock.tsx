import highlight from "./highlight";

export type CodeBlockProps = {
  language?: string;
  code?: string;
};

export default function CodeBlock(props: CodeBlockProps) {
  const language = props.language ?? "plaintext";
  if (!props.code) return null;
  const result = highlight(props.code, language);
  return (
    <pre>
      <code className={`language-${language}`} dangerouslySetInnerHTML={{__html: result}}>
      </code>
    </pre>
  );
}