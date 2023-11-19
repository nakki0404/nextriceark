import Link from "next/link";
import Image, { StaticImageData } from "next/image";

interface HomePageButtonProps {
  url: string;
  icon: StaticImageData;
  buttonText: string;
}

export function HomePageButton({ url, icon, buttonText }: HomePageButtonProps) {
  return (
    <Link href={url} className=" m-4 flex justify-center">
      <div className="box-border h-24 w-48 border-8 bg-yellow-200 border-yellow-100 border-r-yellow-300 border-b-yellow-300  flex flex-col  transition  hover:-translate-y-1  hover:shadow-2xl duration-300">
        <div className="flex flex-row justify-center p-4 ">
          <Image
            src={icon}
            alt="coin icon by Icons8"
            title="coin icon by Icons8"
            width={32}
            height={32}
          />
          <div className="text-xl  md:table-cell">{buttonText}</div>
        </div>
      </div>
    </Link>
  );
}
