"use client";

import Link from "next/link";
import { Button } from "../ui/button";

export default function GobackOnHommePage () {
  return (
    <div>
      <Link href="/">
        <Button>Go Back</Button>
      </Link>
    </div>
  );
}
