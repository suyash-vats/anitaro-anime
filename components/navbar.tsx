"use client";

import {
  Input,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@nextui-org/react";
import { Search, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const NavbarContainer = () => {
  const [inputVal, setInputval] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isBlurred, setIsBlurred] = useState(false);
  const router = useRouter();

  const handleSearch = () => {
    if (inputVal.trim() !== "") {
      router.push(`/searchanime/${inputVal}`);
      handleCloseSearch();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const toggleSearch = () => {
    setIsSearchVisible((prev) => !prev);
    if (isMenuOpen) setIsMenuOpen(false);
    if (!isSearchVisible) {
      setTimeout(() => document.querySelector("input")?.focus(), 100);
    }
  };

  const handleCloseSearch = () => {
    setIsSearchVisible(false);
    setInputval("");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsBlurred(true);
      } else {
        setIsBlurred(false);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className={`text-[#FFFFFF] shadow-xl transition-all duration-300 ${
        isBlurred
          ? "bg-[#292e3b]/80 backdrop-blur-lg" // Updated with the new color scheme
          : "bg-[#292e3b]" // Default solid color
      }`}
      maxWidth="full"
    >
      {/* Mobile Menu Toggle */}
      <NavbarContent className="sm:hidden">
        {!isSearchVisible && (
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="text-[#FFFFFF] hover:text-[#FF4D4D] transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          />
        )}
      </NavbarContent>

      {/* Brand Logo */}
      <NavbarBrand className={`${isSearchVisible ? "hidden sm:flex" : "flex"}`}>
        <Link
          href="/"
          className="font-bold font-mono text-3xl bg-gradient-to-r from-[#FF4D4D] to-[#b4c2dc] text-transparent bg-clip-text hover:scale-105 transition-transform duration-300 ease-in-out"
          onClick={handleCloseSearch}
        >
          アニタロ
        </Link>
      </NavbarBrand>

      {/* Center Links */}
      <NavbarContent className="hidden sm:flex gap-8 justify-center">
        {[
          { label: "Anime", href: "/" },
          { label: "Manga", href: "/manga" },
          { label: "Characters", href: "/characters" },
          { label: "Community", href: "/community" },
        ].map((item) => (
          <NavbarItem key={item.label}>
            <Link
              href={item.href}
              className="relative group font-mono text-lg text-[#FFFFFF] hover:text-[#FF4D4D] transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl"
            >
              <span>{item.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FF4D4D] to-[#b4c2dc] group-hover:w-full transition-all duration-300"></span>
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Search and Actions */}
      <NavbarContent justify="end">
        <NavbarItem className="flex gap-4 items-center">
          <div className="hidden sm:block">
            <Input
              classNames={{
                base: "max-w-full sm:max-w-[24rem] h-10 border-2 border-[#b4c2dc] rounded-md focus:ring-2 focus:ring-[#FF4D4D]",
                mainWrapper: "h-full",
                input: "text-base text-[#b4c2dc] placeholder-[#FFFFFF] hover:bg-[#FF4D4D] hover:shadow-lg transition-all duration-300",
                inputWrapper: "h-full",
              }}
              placeholder="Search anime..."
              size="sm"
              startContent={<Search size={18} className="text-[#FFFFFF]" />}
              type="search"
              value={inputVal}
              onChange={(e) => setInputval(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>

          <div className="sm:hidden">
            {!isSearchVisible ? (
              <Button
                isIconOnly
                variant="light"
                onClick={toggleSearch}
                className="text-[#FFFFFF] hover:text-[#FF4D4D] transform hover:scale-110 hover:shadow-xl transition-all duration-300"
              >
                <Search size={20} />
              </Button>
            ) : (
              <Button
                isIconOnly
                variant="light"
                onClick={handleCloseSearch}
                className="text-[#FFFFFF] hover:text-[#FF4D4D] transform hover:scale-110 hover:shadow-xl transition-all duration-300"
              >
                <X size={20} />
              </Button>
            )}
          </div>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Search with Blur Effect */}
      <div
        className={`fixed inset-0 sm:hidden bg-[#292e3b]/90 backdrop-blur-md transition-opacity duration-300 flex items-start pt-16 px-4 ${
          isSearchVisible
            ? "opacity-100 z-50"
            : "opacity-0 pointer-events-none -z-10"
        }`}
      >
        <div className="w-full">
          <Input
            classNames={{
              base: "w-full h-12 border-2 border-[#b4c2dc] rounded-md focus:ring-2 focus:ring-[#FF4D4D]",
              mainWrapper: "h-full",
              input: "text-lg text-[#b4c2dc] placeholder-[#FFFFFF] bg-[#b4c2dc] hover:bg-[#FF4D4D] hover:shadow-lg transition-all duration-300 focus:ring-2 focus:ring-[#FF4D4D]",
              inputWrapper: "h-full",
            }}
            placeholder="Search anime..."
            size="lg"
            startContent={<Search size={20} className="text-[#FFFFFF]" />}
            endContent={
              inputVal && (
                <Button
                  isIconOnly
                  variant="light"
                  size="sm"
                  onClick={() => setInputval("")}
                  className="text-[#FFFFFF]"
                >
                  <X size={16} />
                </Button>
              )
            }
            type="search"
            value={inputVal}
            onChange={(e) => setInputval(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          {inputVal && (
            <Button
              color="primary"
              className="w-full mt-4 bg-gradient-to-r from-[#FF4D4D] to-[#b4c2dc] text-white transform hover:scale-105 hover:shadow-xl transition-all duration-300"
              onClick={handleSearch}
            >
              Search
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <NavbarMenu className="pt-6 bg-[#292e3b]">
        {[
          { label: "Anime", href: "/" },
          { label: "Manga", href: "/manga" },
          { label: "Characters", href: "/characters" },
          { label: "Community", href: "/community" },
        ].map((item) => (
          <NavbarMenuItem key={item.label}>
            <Link
              href={item.href}
              className="w-full text-[#FFFFFF] hover:text-[#FF4D4D] py-2 text-lg transform hover:scale-105 hover:shadow-lg transition-all duration-300"
              onClick={handleCloseSearch}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};
