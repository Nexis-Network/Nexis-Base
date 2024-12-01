import type * as React from "react"

import type { ResourceCardProps } from "../../types/referrals"

export const ResourceCard: React.FC<ResourceCardProps> = ({
  title,
  subtitle,
  buttonText,
  points,
  totalPoints,
  epoch,
}) => {
  return (
    <div className="w-full">
      <article className="flex size-full flex-col self-stretch border-r border-[#181F25]/70 bg-transparent px-3 py-4 bg-blend-normal lg:px-4 lg:py-6">
        <header className="flex h-auto w-full flex-col pb-4 bg-blend-normal lg:pb-8">
          <h2 className="text-sm font-medium leading-none tracking-wide text-lime-300">
            {title}
          </h2>
          <h3 className="mt-2 text-2xl font-black leading-none text-gray-100 lg:text-3xl">
            {subtitle}
          </h3>
        </header>

        {buttonText && (
          <button
            type="button"
            className="mt-8 w-full gap-2.5 self-stretch whitespace-nowrap rounded border border-solid border-lime-300 bg-lime-300 px-4 py-3 text-sm font-bold uppercase leading-none tracking-wide text-neutral-950 transition-colors hover:bg-lime-400 lg:mt-20 lg:px-24"
          >
            {buttonText}
          </button>
        )}

        {points !== undefined && (
          <section className="mt-6 lg:mt-9">
            <p className="text-sm font-medium leading-none tracking-wide text-gray-100 text-opacity-60">
              {epoch}
            </p>
            <div className="mt-4 flex w-full gap-2 whitespace-nowrap rounded-full bg-lime-300/30 px-3 py-2 text-xs font-bold leading-none tracking-wide text-lime-300 lg:mt-9 lg:px-4">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/d3a09a2fda7941e0a2c87f17f318ba21/010d894a53edabe4985558a427d4fcd25c45620611631d4e63cedfb8a254cf5b?apiKey=d3a09a2fda7941e0a2c87f17f318ba21&"
                alt=""
                className="aspect-square w-4 shrink-0 object-contain"
              />
              <div className="flex min-h-[14px] items-start self-start pr-1">
                <span>{points}</span>
                <span>/{totalPoints}</span>
              </div>
            </div>
          </section>
        )}
      </article>
    </div>
  )
}
