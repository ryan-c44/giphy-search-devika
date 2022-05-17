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

export interface Parameters {
    api_key: string,
    limit: number,
    q?: string
}