import React from "react";

interface ButtonLinkProps {
  badge?: string;
  url?: string;
  label?: string;
  children: React.ReactNode;
}

export function ButtonLink({ badge, url = "#", label, children }: ButtonLinkProps) {
  return (
    <a href={url} aria-label={label} className="w-full block">
      <button
        className={`w-full h-10 rounded-lg bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700 active:bg-gray-300 dark:active:bg-gray-600 transition-all pl-2 hover:pl-3 text-neutral-700 hover:text-blue-500 dark:text-neutral-300 dark:hover:text-blue-400`}
      >
        <div className="flex items-center justify-between relative mr-2">
          {/* Main Content */}
          <div className="overflow-hidden text-left whitespace-nowrap overflow-ellipsis">
            {children}
          </div>

          {/* Badge */}
          {badge && (
            <div
              className={`transition h-7 ml-4 min-w-[2rem] rounded-lg text-sm font-bold
                text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-blue-500
                flex items-center justify-center`}
            >
              {badge}
            </div>
          )}
        </div>
      </button>
    </a>
  );
};
