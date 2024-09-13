import { LazyLoadImage } from "react-lazy-load-image-component";

interface Props {
    src: string;
    alt?: string;
    className?: string;
    placeholderSrc?: string;
    style?: React.CSSProperties;
    width?: number;
    height?: number;
}

export function LazyImage({
    src,
    alt = "CoinEcho",
    className = "rounded",
    placeholderSrc,
    style,
    width,
    height,
}: Props) {
    return (
        <LazyLoadImage
            src={src}
            alt={alt}
            className={className}
            placeholderSrc={placeholderSrc}
            style={style}
            width={width}
            height={height}
        />
    );
}
