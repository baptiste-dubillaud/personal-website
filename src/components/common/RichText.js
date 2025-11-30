"use client";

import React from "react";

// Basic safe rich text renderer supporting paragraph and list types.
// Converts custom <bold>...</bold> markers to <b> safely without using dangerouslySetInnerHTML.
// Allowed inline elements: b only (extend as needed).

function transformText(text) {
    const parts = [];
    let remaining = text;
    const boldRegex = /<bold>(.*?)<\/bold>/g;
    let lastIndex = 0;
    let match;

    while ((match = boldRegex.exec(remaining)) !== null) {
        const start = match.index;
        const end = boldRegex.lastIndex;
        // plain segment before bold
        const plain = remaining.slice(lastIndex, start);
        if (plain) parts.push(plain);
        // bold content
        parts.push(<b key={`b-${lastIndex}`}>{match[1]}</b>);
        lastIndex = end;
    }
    const tail = remaining.slice(lastIndex);
    if (tail) parts.push(tail);
    return parts.length ? parts : [text];
}

export default function RichText(props) {
    const { type } = props;

    if (type === "paragraph") {
        const { content } = props;
        return <p>{transformText(content)}</p>;
    }

    if (type === "list") {
        const { items = [] } = props;
        return (
            <ul>
                {items.map((item, idx) => (
                    <li key={idx}>
                        <span>{transformText(item.content)}</span>
                        {item.subitems && item.subitems.length > 0 && (
                            <ul>
                                {item.subitems.map((sub, sidx) => (
                                    <li key={sidx}>{transformText(sub)}</li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        );
    }

    return null;
}
