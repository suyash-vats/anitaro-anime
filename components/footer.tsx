import { Copy } from "@/logos/copy";
import { Gitlogo } from "@/logos/gitlogo";
import { Xlogo } from "@/logos/xlogo";
import { Navbar, NavbarBrand } from "@nextui-org/react";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="bg-[#1A1F2B] text-[#EEEEEE] py-10 mt-24">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center">
        {/* Left Section - Company Info */}
        <div className="flex flex-col items-start space-y-4 md:w-1/3">
          <div className="flex items-center space-x-3">
            {/* Logo or Icon */}
            <span className="text-[#00ADB5] text-3xl"></span>
            <h2 className="font-semibold text-xl">アニタロ</h2>
          </div>
          <p className="text-sm text-[#EEEEEE]">
            where imagination meets endless possibilities.
          </p>
        </div>

        {/* Middle Section - Company Links */}
        <div className="flex space-x-12 mt-8 md:mt-0">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg text-[#00ADB5]">Company</h3>
            <ul className="space-y-2 text-sm text-[#EEEEEE]">
              <li><Link href="/blog" className="hover:text-[#00ADB5] transition-all duration-300 ease-in-out transform hover:scale-105">Blog</Link></li>
              <li><Link href="/careers" className="hover:text-[#00ADB5] transition-all duration-300 ease-in-out transform hover:scale-105">Careers</Link></li>
              <li><Link href="/pricing" className="hover:text-[#00ADB5] transition-all duration-300 ease-in-out transform hover:scale-105">Pricing</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-2">
            <h3 className="font-semibold text-lg text-[#00ADB5]">Resources</h3>
            <ul className="space-y-2 text-sm text-[#EEEEEE]">
              <li><Link href="/documentation" className="hover:text-[#00ADB5] transition-all duration-300 ease-in-out transform hover:scale-105">Documentation</Link></li>
              <li><Link href="/papers" className="hover:text-[#00ADB5] transition-all duration-300 ease-in-out transform hover:scale-105">Papers</Link></li>
              <li><Link href="/press" className="hover:text-[#00ADB5] transition-all duration-300 ease-in-out transform hover:scale-105">Press Conferences</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-2">
            <h3 className="font-semibold text-lg text-[#00ADB5]">Legal</h3>
            <ul className="space-y-2 text-sm text-[#EEEEEE]">
              <li><Link href="/terms" className="hover:text-[#00ADB5] transition-all duration-300 ease-in-out transform hover:scale-105">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-[#00ADB5] transition-all duration-300 ease-in-out transform hover:scale-105">Privacy Policy</Link></li>
              <li><Link href="/cookies" className="hover:text-[#00ADB5] transition-all duration-300 ease-in-out transform hover:scale-105">Cookies Policy</Link></li>
              <li><Link href="/data-processing" className="hover:text-[#00ADB5] transition-all duration-300 ease-in-out transform hover:scale-105">Data Processing</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section - Copyright and Social Icons */}
      <div className="mt-8 border-t border-[#393E46] pt-4 flex justify-between items-center px-8">
        <p className="text-xs text-[#EEEEEE]">© 2024 Anitaro Inc. All rights reserved.</p>
        <div className="flex space-x-6">
          <Link href="https://github.com/suyash-vats" target="_blank" className="text-[#EEEEEE] hover:text-[#00ADB5] transition-transform transform hover:scale-125 hover:rotate-12 duration-300 ease-in-out">
            <Gitlogo />
          </Link>
          <Link href="https://x.com/suyash_vats" target="_blank" className="text-[#EEEEEE] hover:text-[#00ADB5] transition-transform transform hover:scale-125 hover:rotate-12 duration-300 ease-in-out">
            <Xlogo />
          </Link>
          {/* Add more social icons like Facebook, YouTube */}
          <Link href="https://facebook.com" target="_blank" className="text-[#EEEEEE] hover:text-[#00ADB5] transition-transform transform hover:scale-125 hover:rotate-12 duration-300 ease-in-out">
            <i className="fab fa-facebook"></i>
          </Link>
          <Link href="https://youtube.com" target="_blank" className="text-[#EEEEEE] hover:text-[#00ADB5] transition-transform transform hover:scale-125 hover:rotate-12 duration-300 ease-in-out">
            <i className="fab fa-youtube"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};
