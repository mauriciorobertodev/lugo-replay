import { useEffect, useState } from 'react';

export function useImage(url: string) {
    const [image, setImage] = useState<HTMLImageElement | null>(null);

    useEffect(() => {
        const img = new window.Image();
        img.src = url;
        img.onload = () => setImage(img);
    }, [url]);

    return image;
}
