"use client"

import { useState, useEffect } from "react";
import CodeBlock from "@/components/code-block";
import { GithubIcon, SpinnerIcon } from "@/components/icons";
import { ThemeModeToggle } from "@/components/theme-mode-toggle";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Spinner size="sm" className="bg-black dark:bg-white" />
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center w-full p-6">
      <div className="flex flex-col w-full sm:w-96 lg:w-[650px] gap-8 mt-20">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-start space-x-1 opacity-70">
              <span className="px-2 text-sm bg-zinc-100/60 rounded-lg dark:text-black">New</span>
            </div>

            <div className="flex items-center space-x-1">
              <SpinnerIcon width={30} height={30} color="fill-black dark:fill-white" />
              <h2 className="text-3xl font-semibold">Shadcn Spinner</h2>
            </div>

            <p className="text-lg opacity-70 leading-none">
              Inspired by the Radix UI.
            </p>
          </div>

          <div className="flex flex-col items-end justify-end w-72 gap-4">
            <Link href="https://x.com/alipiopereira7/status/1849664054974935343" target="_blank" className="flex flex-row items-center px-3 py-1.5 bg-zinc-100 dark:bg-zinc-700 rounded-full text-sm font-medium opacity-70">
              View Tweet
            </Link>

            <Link href="https://github.com/allipiopereira/shadcn-spinner" target="_blank" className="flex flex-row items-center px-3 py-1.5 hover:bg-zinc-100 hover:dark:bg-zinc-700 rounded-full text-sm font-medium opacity-70">
              <GithubIcon width={20} height={20} className="mr-1" color="fill-black dark:fill-white" />
              allipiopereira/shadcn-spinner
            </Link>
          </div>
        </div>

        <div className="flex flex-row items-center justify-center gap-7 p-4 bg-zinc-200/50 dark:bg-zinc-950/40 border rounded-xl">
          <Spinner size="sm" className="bg-green-500" />
          <Spinner size="md" className="bg-blue-500" />
          <Spinner size="lg" className="bg-red-500" />

          <Spinner className="w-10 h-10 bg-black dark:bg-white mr-0.5" />

          <Spinner size="lg" className="bg-red-500" />
          <Spinner size="md" className="bg-blue-500" />
          <Spinner size="sm" className="bg-green-500" />
        </div>

        <div>
          <h2 className="text-lg font-semibold">Step 1</h2>
          <h2 className="text-sm font-medium opacity-70 mb-2">
            Adding the component to your project
          </h2>


          <CodeBlock code={`
\`\`\`
bunx shadcn add https://shadcn-spinner.vercel.app/api/r/spinner
\`\`\`
`} />
        </div>

        <div>
          <h2 className="text-lg font-semibold">Step 2</h2>
          <h2 className="text-sm font-medium opacity-70 mb-2">
            Now just use it.
          </h2>

          <CodeBlock code={`
\`\`\`ts
<Spinner size="sm" className="bg-black dark:bg-white" />
\`\`\`
`} />
        </div>
      </div>

      <footer className="flex flex-row items-center mt-20 gap-1">
        Created by
        <Link href="https://github.com/allipiopereira" target="_blank" className="flex flex-row items-center gap-1 px-2 py-0.5 hover:bg-zinc-100 hover:dark:bg-zinc-700 rounded-full">
          <Image src="https://github.com/allipiopereira.png" alt="Alípio Pereira" width={22} height={22} className="rounded-full" />
          <span className="text-sm font-medium">@allpiopereira</span>
        </Link>

        <span className="opacity-50 mr-2">|</span>

        Theme <ThemeModeToggle />
      </footer>
    </main>
  );
}