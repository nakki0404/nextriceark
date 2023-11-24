import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { HomePageButton } from "@/components/HomePageButton";

interface HomeScrollEventProps {
  position: number;
  image: StaticImageData;
  url: string;
  icon: StaticImageData;
  buttonText: string;
}

export function HomeScrollEvent({
  position,
  image,
  url,
  icon,
  buttonText,
}: HomeScrollEventProps) {
  let scrollIndicator: HTMLElement | null =
    document.getElementById("indicator");

  scrollIndicator
    ? (scrollIndicator.style.opacity = position > 250 ? "1" : "0")
    : null;

  return (
    <div
      id="indicator"
      className="  h-96 w-100%  flex items-center justify-center  opacity-0 transition-opacity duration-500 p-8 m-8"
    >
      <div>
        <div>
          <p>이 상자 얼마에요? 뭐 받아요?</p>
          <p>이 페이지는 평균가로 계산해줍니다</p>
        </div>
        <HomePageButton url={url} icon={icon} buttonText={buttonText} />
      </div>
      <Image
        src={image}
        alt="caculator_manual"
        title="caculator_manual"
        width={500}
        height={500}
      />
    </div>
  );
}
