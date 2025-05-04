import { usePathname } from "next/navigation";

export function useActive(href: string): boolean {
  const pathname = usePathname();

  let active = false;
  if (href === "/") {
    active = pathname === href;
  } else {
    active = pathname.startsWith(href);
  }

  return active;
}
