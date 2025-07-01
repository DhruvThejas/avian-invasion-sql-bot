import { useEffect, useState } from 'react';
import { useTheme } from "next-themes";

export default function ThemeButton({ className }: { className?: string }) {
	const [mounted, setMounted] = useState(false);
	const { systemTheme, theme, setTheme } = useTheme();
	const currentTheme = theme === "system" ? systemTheme : theme;

	useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

	return (
		<></>
	);
}