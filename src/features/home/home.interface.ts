export interface NewsApiReq {
    status: string;
    totalResults: number;
    articles: NewsApiArticle[];
}

export interface NewsApiArticle {
    source: Source;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export interface Source {
    id: string | null;
    name: string;
}


export interface NewsApi {
    searchFunction: ({
        query,
        page,
        pageSize,
    }: ParamsType) => Promise<NewsType[]>;
    domain?: string;
}

export interface GuardianArticle {
    id: string;
    type: string;
    sectionId: string;
    sectionName: string;
    webPublicationDate: Date;
    webTitle: string;
    webUrl: string;
    apiUrl: string;
    isHosted: boolean;
    pillarId?: string;
    pillarName?: string;
    thumbnail: string;
}

export interface NewsType {
    id: string;
    title: string;
    url: string;
    source: string;
    description: string;
    publishedAt: string;
    urlToImage: string;
}
export interface ParamsType {
    query?: string;
    skip?: string[];
    page?: number;
    pageSize?: number;
    from?: string;
    to?: string;
    categories?: string[];
    sources?: string[];
}

export interface GetNewsHook {
    loading: boolean;
    error: string | null;
    news: NewsType[];
}

export interface NYTArticleReq {
    status: "OK";
    copyright: string;
    response: {
        docs: NYTArticle[];
        meta: {
            hits: number;
            offset: number;
            time: number;
        };
    };
}

export interface NYTArticle {
    abstract: string;
    web_url: string;
    snippet: string;
    lead_paragraph: string;
    source: string;
    multimedia: NYTMultimedia[];
    headline: {
        main: string;
        kicker: string | null;
        content_kicker: string | null;
        print_headline: string | null;
        name: string | null;
        seo: string | null;
        sub: string | null;
    };
    keywords: NYTKeyword[];
    pub_date: string;
    document_type: string;
    news_desk: string;
    section_name: string;
    subsection_name?: string;
    byline: {
        original: string | null;
        person: NYTBylinePerson[];
        organization: string | null;
    };
    type_of_material: string;
    _id: string;
    word_count: number;
    uri: string;
    print_section?: string;
    print_page?: string;
}

export interface NYTMultimedia {
    rank: number;
    subtype: string;
    caption: string | null;
    credit: string | null;
    type: string;
    url: string;
    height: number;
    width: number;
    legacy?: {
        xlarge?: string;
        xlargewidth?: number;
        xlargeheight?: number;
    };
    subType: string;
    crop_name: string;
}

export interface NYTKeyword {
    name: string;
    value: string;
    rank: number;
    major: string;
}

export interface NYTBylinePerson {
    firstname: string;
    middlename: string | null;
    lastname: string;
    qualifier: string | null;
    title: string | null;
    role: string;
    organization: string;
    rank: number;
}
