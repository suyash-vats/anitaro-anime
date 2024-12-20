import { Copy } from "@/logos/copy";

import { Gitlogo } from "@/logos/gitlogo";

import { Xlogo } from "@/logos/xlogo";

import { Navbar, NavbarBrand } from "@nextui-org/react";

import Link from "next/link";

export const Footer = () => {
  return (
    <Navbar isBordered className="border-t mt-12   font-mono py-4">
      <NavbarBrand className="flex justify-between items-center ">
        <div className="flex items-center space-x-4">
          <Copy />

          <Link
            href="/"
            className="font-bold font-mono text-xl bg-gradient-to-r text-white bg-clip-text text-transparent hover:scale-105 transition-transform"
          >
            アニタロ
          </Link>
        </div>
        <div className="text-white text-sm text-center mt-2 md:mt-0">
          <p>
            Developed by
            <span className="pl-2">
              <a
                target="_blank"
                href="https://github.com/suyash-vats"
                className="hover:underline"
              >
                suyash
              </a>
            </span>
          </p>
        </div>

        <div className="flex items-center space-x-4 text-white">
          <a target="_blank" href="https://github.com/suyash-vats">
            <Gitlogo />
          </a>

          <div className=" -translate-y-1">
            <a target="_blank" href="https://x.com/suyash_vats">
              <Xlogo />
            </a>
          </div>
        </div>
      </NavbarBrand>
    </Navbar>
  );
};
