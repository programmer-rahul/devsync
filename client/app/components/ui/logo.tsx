import Image from "next/image";

export default function Logo() {
  return (
    <div className="inline-block">
      <h1>
        <Image
          src="/logo/logo.svg"
          width={80}
          height={40}
          alt="log"
          className="w-40"
        />
      </h1>
    </div>
  );
}
