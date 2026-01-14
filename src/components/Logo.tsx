import Image from "next/image";

interface LogoProps {
    width: number;
    height: number;
}

export const Logo: React.FC<LogoProps> = ({ width, height }: LogoProps) => (
  <Image
    src="/assim-ou-assado/logo.svg"
    alt="Assim ou Assado"
    width={width}
    height={height}
    className="w-10 h-10"
    priority />
);
