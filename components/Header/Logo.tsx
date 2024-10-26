import React from "react"

export const Logo: React.FC = () => {
  return (
    <div className="ml-6 flex flex-wrap items-center gap-1 whitespace-nowrap text-xs font-medium leading-5 text-gray-200 max-md:max-w-full">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/3c5a90ba6a6f864e7300a9c9069b34bc4e6ef22b4139fb44c8ce58cdf8cf9770?placeholderIfAbsent=true&apiKey=d3a09a2fda7941e0a2c87f17f318ba21"
        className="my-auto aspect-[2.54] w-[71px] shrink-0 self-stretch object-contain"
        alt=""
      />
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/0820cdc920b362be8ae21d5c9742d18bb8ad7fffc219783b69e7aa59d10ce25a?placeholderIfAbsent=true&apiKey=d3a09a2fda7941e0a2c87f17f318ba21"
        className="my-auto aspect-square w-[22px] shrink-0 self-stretch object-contain bg-blend-normal"
        alt=""
      />
      <div className="my-auto flex items-center gap-0.5 self-stretch">
        <div className="my-auto flex w-[103px] gap-2.5 self-stretch rounded-none">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b49d929af25eaac291d4ca81e1040bd561c40f1dc358bb526e9696e40c6a47a8?placeholderIfAbsent=true&apiKey=d3a09a2fda7941e0a2c87f17f318ba21"
            className="aspect-square w-[22px] shrink-0 rounded-none object-contain"
            alt=""
          />
          <div>Nexis.NZT</div>
        </div>
        <div className="my-auto flex h-10 w-7 shrink-0 self-stretch rounded-md bg-white/0 shadow-sm" />
      </div>
    </div>
  )
}
