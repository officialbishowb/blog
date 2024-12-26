import Prism from 'prismjs';
import 'prismjs/themes/prism-twilight.css';
import 'prismjs/components/prism-python';

export function highlightCode(contentHtml: string): string {
  const regex = /<code class="language-(.+?)">([\s\S]*?)<\/code>/g;
  return contentHtml.replace(regex, (match, lang, code) => {
    const decodedCode = code
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&');

    // Highlight code using Prism
    const highlightedCode = Prism.highlight(decodedCode, Prism.languages[lang] || Prism.languages.plaintext, lang);

    return `<pre><code class="language-${lang}">${highlightedCode}</code></pre>`;
  });


 }
 

