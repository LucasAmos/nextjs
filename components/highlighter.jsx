import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";

export default function Highlighter({ children }) {
  const code1 = `import AWS from "aws-sdk";

  AWS.config.update({ region: process.env.AWS_REGION });
  const SM = new AWS.SecretsManager();
  
  export default async function handler(): Promise<string> {
    const { SecretString } = await SM.getSecretValue({SecretId: "secret1"}).promise();
    const { SecretString: SecretString2 } = await SM.getSecretValue({SecretId: "secret2"}).promise();
  
    return \`\${SecretString} and \${SecretString2}\`;
  }`;

  return (
    <div style={{ maxWidth: "80%" }}>
      <SyntaxHighlighter
        language="javascript"
        customStyle={{ padding: "none", fontSize: "100%" }}
        style={a11yDark}
        showLineNumbers
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
}
