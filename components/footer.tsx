import { Copy } from "@/logos/copy";
import { Gitlogo } from "@/logos/gitlogo";
import { Xlogo } from "@/logos/xlogo";
import { Navbar, NavbarBrand } from "@nextui-org/react";
import Link from "next/link";

export const Footer = () => {
  return (
    <Navbar
      isBordered
      className="border-t mt-10 font-mono py-6 flex flex-col md:flex-row items-center md:justify-between"
    >
      <div className="flex items-center space-x-4 mb-4 md:mb-0">
        <Copy />
        <Link
          href="/"
          className="font-bold font-mono text-xl bg-gradient-to-r text-white bg-clip-text text-transparent hover:scale-105 transition-transform"
        >
          アニタロ
        </Link>
      </div>

      <div className="text-white text-sm text-center mb-4 md:mb-0">
        <p>
          Developed by
          <span className="pl-2">
            <a
              target="_blank"
              href="https://github.com/akshitvigg"
              className="hover:underline"
            >
              Akshit
            </a>
          </span>
        </p>
      </div>

      <div className="flex items-center space-x-4 text-white">
        <a
          target="_blank"
          href="https://github.com/akshitvigg/anitaro"
          className="hover:scale-110 transition-transform"
        >
          <Gitlogo />
        </a>
        <a
          target="_blank"
          href="https://x.com/AkshitVig4"
          className="hover:scale-110 transition-transform"
        >
          <Xlogo />
        </a>
      </div>
    </Navbar>
  );
};
