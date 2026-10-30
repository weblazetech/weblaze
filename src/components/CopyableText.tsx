import React, { useState } from 'react';

interface CopyableTextProps {
  text: string;
  displayText?: string;
  href?: string;
  className?: string;
  tooltipPosition?: 'top' | 'bottom';
  iconOnly?: boolean;
}

export default function CopyableText({
  text,
  displayText,
  href,
  className = '',
  tooltipPosition = 'top',
  iconOnly = false,
}: CopyableTextProps): React.JSX.Element {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async (e: React.MouseEvent) => {
    // If it's a direct copy action or button click, prevent default link behavior if clicking the copy icon
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const tooltipClass =
    tooltipPosition === 'top'
      ? '-top-8 left-1/2 -translate-x-1/2'
      : '-bottom-8 left-1/2 -translate-x-1/2';

  return (
    <div className={`relative inline-flex items-center gap-1.5 group/copy ${className}`}>
      {/* If an href is provided and not iconOnly, render as clickable link */}
      {!iconOnly && href ? (
        <a
          href={href}
          className="hover:underline hover:text-[#1E46EB] dark:hover:text-[#67BAF4] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1E46EB] rounded"
        >
          {displayText || text}
        </a>
      ) : !iconOnly ? (
        <span>{displayText || text}</span>
      ) : null}

      {/* Interactive Micro-Copy Trigger Button */}
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? `Copied ${text}` : `Copy ${text} to clipboard`}
        title={copied ? 'Copied!' : 'Click to copy'}
        className={`relative inline-flex items-center justify-center p-1 rounded-md transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#1E46EB] ${
          copied
            ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 scale-105'
            : 'text-[#525866] dark:text-[#94A3B8] hover:text-[#1E46EB] dark:hover:text-[#67BAF4] hover:bg-slate-100 dark:hover:bg-[#1F232F]'
        }`}
      >
        {copied ? (
          /* Spring Animated Checkmark */
          <svg
            className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 animate-[fadeInUp_0.2s_ease-out]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          /* Subtle Copy Icon */
          <svg
            className="w-3.5 h-3.5 transition-transform duration-150 group-hover/copy:scale-110"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
            />
          </svg>
        )}

        {/* Floating Tooltip */}
        {copied && (
          <span
            className={`absolute ${tooltipClass} pointer-events-none px-2 py-0.5 text-[10px] font-bold tracking-wide rounded-md bg-[#0D0D0D] text-white dark:bg-white dark:text-[#0D0D0D] shadow-lg shadow-black/20 whitespace-nowrap z-50 animate-[fadeInUp_0.15s_ease-out]`}
          >
            Copied!
          </span>
        )}
      </button>
    </div>
  );
}
