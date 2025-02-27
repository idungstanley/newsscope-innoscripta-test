interface Option {
    value: string;
    label: string;
    flag?: string;
}

export interface DropdownInputProps {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
}

export interface SourceType {
    value: string;
    label: string;
}

export interface ArticleCardProps {
    title: string;
    description: string;
    urlToImage?: string;
    source: string;
    publishedAt: string;
    url: string;
}