"use client";
import {
  Input,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";

import { div } from "framer-motion/client";
import { Search } from "lucide-react";
import React, { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

export const NavbarContainer = () => {
  const [inputVal, setInputval] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (inputVal.trim() != "") {
      router.push(`/searchanime/${inputVal}`);
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="">
      <Navbar className=" fixed" isBordered>
        <NavbarContent justify="end">
          <Link href={"/"}>
            <NavbarBrand className="  font-bold text-4xl">Anitaro</NavbarBrand>
          </Link>
          <NavbarItem as={div} className=" items-center pr-64  flex">
            <Input
              isRequired
              onKeyDown={handleKeyPress}
              placeholder="search anime"
              variant="bordered"
              className="  w-96"
              onValueChange={setInputval}
            />

            <Search
              onClick={handleSearch}
              className="hover:cursor-pointer ml-4"
              size={30}
            />
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>
  );
};
