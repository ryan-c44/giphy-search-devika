export interface Gif {
    id: number,
    images: Images
}

export interface Images {
    fixed_height: FixedHeight;
}

export interface FixedHeight {
    url: string;
}