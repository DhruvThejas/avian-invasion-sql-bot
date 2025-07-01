import Link from "next/link";

export const Header = () => {

  return (
    <header className="flex flex-col sm:flex-row sm:justify-between w-full pt-4 pb-8 px-2">
      <Link href="/" className="flex flex-col">
        <h1 className="font-mono sm:text-xl tracking-tight text-white">sqlTranslate</h1>
        <p className="font-mono font-bold text-gray-600">
          Human Language to SQL Translator
        </p>
      </Link>
    </header>
  );
};

