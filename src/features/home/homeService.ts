import { useState, useEffect } from "react";

import axios from "axios";

import { v4 as uuidv4 } from "uuid";
import { NewsApi, NewsApiReq, NewsType, ParamsType, GetNewsHook, NewsApiArticle, GuardianArticle, NYTArticle } from "./home.interface";
import { guardianQueryParams, newsApiQueryParams, nytQueryParams } from "../../utils/helpers";
import { shuffle } from "../../utils/shuffle";

export const fetchNewsApi = async ({
    query,
    page,
    pageSize,
    from,
    to,
}: ParamsType) => {
    const queryProp = newsApiQueryParams({
        query,
        page,
        pageSize,
        from,
        to,
    });
    const reqUrl = `https://newsapi.org/v2/top-headlines?${queryProp}&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`;

    const response = await axios.get<NewsApiReq>(reqUrl);
    return response.data.articles?.map((article: NewsApiArticle) => ({
        id: uuidv4(),
        title: article.title,
        url: article.url,
        source: "news",
        description: article.description,
        publishedAt: article.publishedAt,
        urlToImage: article.urlToImage,
    }));
};

export const fetchGuardianNews = async ({
    query,
    pageSize,
    from,
    to,
    categories,
    sources,
}: ParamsType) => {
    const queryProp = guardianQueryParams({
        query,
        from,
        to,
        categories,
        pageSize,
        sources,
    });
    const reqUrl = `https://content.guardianapis.com/search?${queryProp}&api-key=${import.meta.env.VITE_GUARDIAN_API_KEY}`;

    const response = await axios.get(reqUrl);
    return response.data.response?.results.map((article: GuardianArticle) => ({
        id: uuidv4(),
        title: article.webTitle,
        url: article.webUrl,
        source: "guardian",
        description: article.webTitle,
        publishedAt: article.webPublicationDate,
        urlToImage: article.thumbnail,
    }));
};

export const fetchNYTNews = async ({
    query,
    pageSize,
    from,
    to,
    categories,
}: ParamsType) => {
    const queryProp = nytQueryParams({
        query,
        from,
        to,
        categories,
        pageSize,
    });

    const reqUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?${queryProp}&api-key=${import.meta.env.VITE_NYT_API_KEY}`;

    const response = await axios.get(reqUrl);
    return response.data.response.docs.map((article: NYTArticle) => ({
        id: uuidv4(),
        title: article.headline.main,
        url: article.web_url,
        source: "nyt",
        description: article.snippet,
        publishedAt: article.pub_date,
        urlToImage: article.multimedia[0]?.url,
    }));
};


export const newsApis: Record<string, NewsApi> = {
    news: {
        searchFunction: fetchNewsApi,
    },
    nyt: {
        searchFunction: fetchNYTNews,
    },
    guardian: {
        searchFunction: fetchGuardianNews,
    },
};


export const useGetNews = ({
    query,
    skip,
    page,
    pageSize,
    from,
    to,
}: ParamsType): GetNewsHook => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [news, setNews] = useState<NewsType[]>([]);

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            setError(null);
            try {
                const searchPromises = Object.entries(newsApis)
                    .filter(([key]) => !skip?.includes(key))
                    .map(([, api]) =>
                        api.searchFunction({ query, page, pageSize, from, to, skip }),
                    );

                const searchResults = await Promise.all(searchPromises);
                setNews(shuffle(searchResults.flat()));
            } catch (error) {
                console.log(error);
                setError("Error occured while fetching news");
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [query, skip?.length, skip, page, pageSize, from, to]);

    return { loading, error, news };
};