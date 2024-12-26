import React from 'react';
import { TOCProps } from '../types';

const TOC: React.FC<TOCProps> = ({ headings }) => {
    return (
        <nav className="sticky top-0 border rounded-md m-0 p-0 w-full" style={{ background: "var(--background)", borderColor: "var(--foreground)", borderRadius: "var(--border-radius)" }}>
            <header className="border-b px-1" style={{ borderColor: "var(--foreground)" }}>
                <h2 className="text-xxl text-center" style={{ color: "var(--accent-color)" }}>Table of Contents</h2>
            </header>
            <ul className="list-none m-0 py-2 pr-2 pl-0">
                {headings.map((heading) => (
                    <li key={heading.id} className="pb-2" style={{ color: "var(--gray)", paddingLeft: `${heading.level * .5}em` }}>
                        <a href={`#${heading.id}`} className="hover:underline" style={{ color: "var(--accent-color)" }}>{heading.title}</a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default TOC;
