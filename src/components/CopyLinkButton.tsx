'use client';
import React, { useState } from 'react';
import { FaCopy as FaCopyLight } from "react-icons/fa6";
import { FaCopy as FaCopyDark } from "react-icons/fa";

interface CopyLinkButtonProps {
    link: string;
}

const CopyLinkButton: React.FC<CopyLinkButtonProps> = ({ link }) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(link);
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    return (
        <button onClick={copyToClipboard}>
            {copied ? <FaCopyDark /> : <FaCopyLight />}
        </button>
    );
};

export default CopyLinkButton;