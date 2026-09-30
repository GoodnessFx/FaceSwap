import React, { useState } from 'react';

interface AccordionItem {
  id: string;
  question: string;
  answer: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
}

export function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) next.clear();
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div className="divide-y divide-[#E2E8F0] border border-[#E2E8F0] rounded-2xl overflow-hidden">
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        return (
          <div key={item.id}>
            <button
              onClick={() => toggle(item.id)}
              className="w-full flex items-center justify-between px-6 py-4 text-left bg-white hover:bg-[#F8FAFC] transition-colors duration-150 group"
              aria-expanded={isOpen}
            >
              <span className="font-semibold font-display text-[#0B1220] text-sm pr-4 leading-snug group-hover:text-[#4F46E5] transition-colors">
                {item.question}
              </span>
              <ChevronIcon open={isOpen} />
            </button>
            <div
              className={[
                'overflow-hidden transition-all duration-200',
                isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0',
              ].join(' ')}
            >
              <div className="px-6 py-4 text-sm text-[#64748B] leading-relaxed bg-[#F8FAFC] border-t border-[#E2E8F0]">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={['w-4 h-4 text-[#94A3B8] flex-shrink-0 transition-transform duration-200', open ? 'rotate-180' : ''].join(' ')}
      viewBox="0 0 16 16"
      fill="none"
    >
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
