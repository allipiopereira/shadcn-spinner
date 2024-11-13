"use client";

import CodeBlock from "@/components/code-block";
import { GithubIcon, SpinnerIcon } from "@/components/icons";
import { ThemeModeToggle } from "@/components/theme-mode-toggle";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingComponents, setLoadingComponents] = useState<boolean>(true);

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
              <span className="px-2 text-sm bg-zinc-100/60 rounded-lg dark:text-black">
                New
              </span>
            </div>

            <div className="flex items-center space-x-1">
              <SpinnerIcon
                width={30}
                height={30}
                color="fill-black dark:fill-white"
              />
              <h2 className="text-3xl font-semibold">Shadcn Spinner</h2>
            </div>

            <p className="text-lg opacity-70 leading-none">
              Inspired by the Radix UI.
            </p>
          </div>

          <div className="flex flex-col items-end justify-end w-72 gap-4">
            <Link
              href="https://x.com/alipiopereira7/status/1849664054974935343"
              target="_blank"
              className="flex flex-row items-center px-3 py-1.5 bg-zinc-100 dark:bg-zinc-700 rounded-full text-sm font-medium opacity-70"
            >
              View Tweet
            </Link>

            <Link
              href="https://github.com/allipiopereira/shadcn-spinner"
              target="_blank"
              className="flex flex-row items-center px-3 py-1.5 hover:bg-zinc-100 hover:dark:bg-zinc-700 rounded-full text-sm font-medium opacity-70"
            >
              <GithubIcon
                width={20}
                height={20}
                className="mr-1"
                color="fill-black dark:fill-white"
              />
              allipiopereira/shadcn-spinner
            </Link>
          </div>
        </div>

        <div className="flex flex-row items-center justify-center gap-7 p-4 bg-zinc-200/50 dark:bg-zinc-950/40 border rounded-xl">
          <Spinner size="sm" loading className="bg-green-500" />
          <Spinner size="md" loading className="bg-blue-500" />
          <Spinner size="lg" loading className="bg-red-500" />

          <Spinner
            loading
            size={"3xl"}
            className="bg-black dark:bg-white mr-0.5"
          />

          <Spinner size="lg" loading className="bg-red-500" />
          <Spinner size="md" loading className="bg-blue-500" />
          <Spinner size="sm" loading className="bg-green-500" />
        </div>

        <div>
          <h2 className="text-lg font-semibold">Step 1</h2>
          <h2 className="text-sm font-medium opacity-70 mb-2">
            Adding the component to your project
          </h2>


          <h2 className="text-sm font-semibold mb-1 mt-3">
            tailwind.config.ts
          </h2>

          <CodeBlock
            code={`
\`\`\`ts
keyframes: {
  'spinner-leaf-fade': {
    '0%, 100%': { opacity: '0' },
    '50%': { opacity: '1' },
  },
},
animation: {
  'spinner-leaf-fade': 'spinner-leaf-fade 800ms linear infinite',
}
\`\`\`
`}
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold">Step 2</h2>
          <h2 className="text-sm font-medium opacity-70">
            Copy and paste the following code into your project.
          </h2>

          <h2 className="text-sm font-semibold mb-1 mt-3">ui/spinner.tsx</h2>
          <CodeBlock
            title="ui/spinner.tsx"
            code={`
\`\`\`ts
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const spinnerVariants = cva("relative block opacity-[0.65]", {
  variants: {
    size: {
      sm: "w-4 h-4",
      md: "w-6 h-6",
      lg: "w-8 h-8",
      xl: "w-10 h-10",
      "2xl": "w-12 h-12",
      "3xl": "w-16 h-16",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof spinnerVariants> {
  loading?: boolean;
  asChild?: boolean;
  children?: React.ReactNode;
  defaultText?: string;
  fallback?: string;
}

const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  (
    {
      className,
      size,
      loading = false,
      asChild = false,
      children,
      defaultText,
      fallback,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "span";

    const renderSpinnerIcon = () => (
      <Comp className={cn(spinnerVariants({ size }))} ref={ref} {...props}>
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className="absolute top-0 left-1/2 w-[12.5%] h-full animate-spinner-leaf-fade"
            style={{
              transform: \`rotate(\${i * 45}deg)\`,
              animationDelay: \`\${-(7 - i) * 100}ms\`,
            }}
          >
            <span
              className={cn("block w-full h-[30%] rounded-full", className)}
            ></span>
          </span>
        ))}
      </Comp>
    );

    if (loading) {
      if (fallback) {
        return (
          <span className="flex items-center gap-2">
            {renderSpinnerIcon()}
            <span>{fallback}</span>
          </span>
        );
      }
      return renderSpinnerIcon();
    }

    return (
      <span className="flex items-center gap-2">
        {defaultText && <span>{defaultText}</span>}
        {children}
      </span>
    );
  }
);

Spinner.displayName = "Spinner";

export { Spinner };


          <CodeBlock code={`
\`\`\`
npx shadcn add https://shadcn-spinner.vercel.app/api/r/spinner
\`\`\`
`}
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold">Step 2</h2>
          <h2 className="text-sm font-medium opacity-70 mb-2">
            Now just use it.
          </h2>

          <div className="h-20 w-full items-center justify-center mt-4">
            <Spinner loading size="sm" className="bg-black dark:bg-white" />
          </div>
          <CodeBlock
            code={`
\`\`\`ts
<Spinner loading size="sm" className="bg-black dark:bg-white" />
\`\`\`
`}
          />
        </div>

        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Use Cases
        </h2>
        <div className="space-y-6">
          <h2 className="text-lg font-semibold">Spinner with default text</h2>
          <h2 className="text-sm font-medium opacity-70 mb-2">
            Now just use it.
          </h2>

          <div className="h-20 space-y-6 w-full items-center justify-center mt-4">
            <Spinner
              loading={loadingComponents}
              defaultText="Default Text"
              size="sm"
              className="bg-black dark:bg-white"
            />
            <Button onClick={() => setLoadingComponents(!loadingComponents)}>
              Set loading state
            </Button>
          </div>
          <CodeBlock
            code={`
\`\`\`ts
<Spinner loading defaultText="Default Text" size="sm" className="bg-black dark:bg-white" />
\`\`\`
`}
          />
        </div>

        <div className="space-y-6">
          <h2 className="text-lg font-semibold">
            Spinner without fallback and with defaultText
          </h2>
          <h2 className="text-sm font-medium opacity-70 mb-2">
            Now just use it.
          </h2>

          <div className="h-20 space-y-6 w-full items-center justify-center mt-4">
            <Spinner
              loading={loadingComponents}
              defaultText="Submit Data"
              size="sm"
              className="bg-black dark:bg-white"
            />
            <Button onClick={() => setLoadingComponents(!loadingComponents)}>
              Set loading state
            </Button>
          </div>
          <CodeBlock
            code={`
\`\`\`ts
<Spinner loading={false} defaultText="Submit Data" size="sm" className="bg-black dark:bg-white" />
\`\`\`
`}
          />
        </div>

        <div className="space-y-6">
          <h2 className="text-lg font-semibold">
            Spinner without fallback and with children
          </h2>
          <h2 className="text-sm font-medium opacity-70 mb-2">
            Now just use it.
          </h2>

          <div className="h-20 space-y-6 w-full items-center justify-center mt-4">
            <Spinner
              loading={loadingComponents}
              className="bg-black dark:bg-white"
            >
              <span className="flex items-center gap-2">
                Send <Send />
              </span>
            </Spinner>
          </div>
          <Button onClick={() => setLoadingComponents(!loadingComponents)}>
            Set loading state
          </Button>
          <CodeBlock
            code={`
\`\`\`ts
<Spinner
  loading={loadingComponents}
  className="bg-black dark:bg-white"
>
  <span className="flex items-center gap-2">
    Send <Send />
  </span>
</Spinner>
\`\`\`
`}
          />
        </div>

        <div className="space-y-6">
          <h2 className="text-lg font-semibold">Spinner with fallback</h2>
          <h2 className="text-sm font-medium opacity-70 mb-2">
            Now just use it.
          </h2>

          <div className="h-20 space-y-6 w-full items-center justify-center mt-4">
            <Button>
              <Spinner
                fallback="Loading..."
                loading={!loadingComponents}
                className="bg-background"
              />
            </Button>
          </div>
          <Button onClick={() => setLoadingComponents(!loadingComponents)}>
            Set loading state
          </Button>
          <CodeBlock
            code={`
\`\`\`ts
<Button>
  <Spinner
    fallback="Loading..."
    loading={true}
    className="bg-background"
  />
</Button>
\`\`\`
`}
          />
        </div>

        <div className="space-y-6">
          <h2 className="text-lg font-semibold">
            Spinner with fallback and text
          </h2>
          <h2 className="text-sm font-medium opacity-70 mb-2">
            Now just use it.
          </h2>

          <div className="h-20 space-y-6 w-full items-center justify-center mt-4">
            <Button>
              <Spinner
                loading={loadingComponents}
                defaultText="Submit Data"
                className="bg-background"
              />
              <Send />
            </Button>
          </div>
          <Button onClick={() => setLoadingComponents(!loadingComponents)}>
            Set loading state
          </Button>
          <CodeBlock
            code={`
\`\`\`ts
<Button>
  <Spinner
    loading={loadingComponents}
    defaultText="Submit Data"
    className="bg-background"
  />
  <Send />
</Button>
\`\`\`
`}
          />
        </div>

        <div className="space-y-6">
          <h2 className="text-lg font-semibold">
            Spinner with fallback and children
          </h2>
          <h2 className="text-sm font-medium opacity-70 mb-2">
            Now just use it.
          </h2>

          <div className="h-20 space-y-6 w-full items-center justify-center mt-4">
            <Button>
              <Spinner
                loading={loadingComponents}
                fallback="Sending..."
                className="bg-background"
              >
                <span>Send</span>
              </Spinner>
            </Button>
          </div>
          <Button onClick={() => setLoadingComponents(!loadingComponents)}>
            Set loading state
          </Button>
          <CodeBlock
            code={`
\`\`\`ts
<Button>
  <Spinner
    loading={loadingComponents}
    fallback="Sending..."
    className="bg-background"
  >
    <span>Send</span>
  </Spinner>
</Button>
\`\`\`
`}
          />
        </div>
      </div>

      <footer className="flex flex-row items-center mt-20 gap-1">
        Created by
        <Link
          href="https://github.com/allipiopereira"
          target="_blank"
          className="flex flex-row items-center gap-1 px-2 py-0.5 hover:bg-zinc-100 hover:dark:bg-zinc-700 rounded-full"
        >
          <Image
            src="https://github.com/allipiopereira.png"
            alt="Alípio Pereira"
            width={22}
            height={22}
            className="rounded-full"
          />
          <span className="text-sm font-medium">@allpiopereira</span>
        </Link>
        <span className="opacity-50 mr-2">|</span>
        Theme <ThemeModeToggle />
      </footer>
    </main>
  );
}
