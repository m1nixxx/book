type Props = {
  src: string;
  alt: string;
};

export function CoverImage({ src, alt }: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className="h-full w-full scale-[1.02] object-cover" />
  );
}
