"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import Spinner from "./Spinner";

export default function RouteChangeFullScreenLoader() {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [lastPath, setLastPath] = useState(pathname);

  useEffect(() => {
    if (pathname !== lastPath) {
      startTransition(() => {
        setLastPath(pathname);
      });
    }
  }, [pathname, lastPath]);

  if (isPending) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-azul3/70 via-azul4/80 to-azul5/70 backdrop-blur-[2px] flex items-center justify-center z-50">
        <div className="text-center">
          <Spinner sizeClass="w-16 h-16" colorClass="border-t-white" />
          <p className="mt-4 text-white/90 text-base font-medium">
            Cargando página...
          </p>
        </div>
      </div>
    );
  }

  return null;
}
