
import { CATEGORIES_MAP, SOURCES_MAP } from "../constants";
import { ParamsType } from "../features/home/home.interface";

export const TODAY = new Date();
export const WEEK_AGO = new Date();
WEEK_AGO.setDate(WEEK_AGO.getDate() - 7);
const [FROM] = WEEK_AGO.toISOString().split("T");
const [TO] = TODAY.toISOString().split("T");


export const selectNewsIcon = (source: string) => {
    switch (source) {
        case "news":
            return "/news-api.jpg";
        case "nyt":
            return "/new-york-time.png";
        case "guardian":
            return "/guardian.jpg";
        default:
            return "/news.jpg";
    }
};

export const renderSourceName = (source: string) => {
    switch (source) {
        case "bbc":
            return "BBC";
        case "abc":
            return "ABC";
        case "guardian":
            return "Guardian";
        default:
            return "News";
    }
};

export const getQuery = (options = {}) => {
    const params = Object.entries(options).reduce((acc, [key, value]) => {
        if (value) acc.push(`${key}=${encodeURIComponent(value as string)}`);
        return acc;
    }, [] as string[]);
    return params.join("&");
};

export const stringifyArray = (list: string[] = []) => {
    const _list = list.filter(Boolean);

    if (!_list.length) return "";

    return _list.join(",").toString();
};

export const fqTokens = (categories: string[], sources: string[]) => {
    const _categories = stringifyArray(
        categories.map((category) => CATEGORIES_MAP[category as keyof typeof CATEGORIES_MAP])
    );
    const _sources = stringifyArray(sources.map((source) => SOURCES_MAP[source as keyof typeof SOURCES_MAP]));

    const fq = [];
    if (_categories) {
        fq.push(`section_name:(${_categories})`);
    }

    if (_sources) {
        fq.push(`source:(${_sources})`);
    }

    return fq.join(" AND ");
};


export const guardianQueryParams = ({
    query,
    from,
    to,
    categories,
    sources,
    pageSize
}: ParamsType) => {

    return getQuery({
        q: query || "ai",
        "from-date": from || FROM,
        "to-date": to || TO,
        "page-size": pageSize || 20,
        section: stringifyArray(categories),
        "production-office": stringifyArray(sources),
    });
};

export const nytQueryParams = ({
    query,
    from,
    to,
    categories,
}: ParamsType) => {
    const filterQuery: string[] = [];
    if (categories && categories.length > 0) filterQuery.push(`section_name.contains:("${categories.map(c => c).join(",")}")`);

    return getQuery({
        q: query || "ai",
        begin_date: (from || FROM).replace(/-/g, ""),
        end_date: (to || TO).replace(/-/g, ""),
        fq: filterQuery.join(" AND "),
    });
};

export const newsApiQueryParams = ({
    query,
    from,
    to,
    sources,
}: ParamsType) => {

    return getQuery({
        from: from || FROM,
        to: to || TO,
        sortBy: "popularity",
        q: query || "ai",
        sources: stringifyArray(sources),
    });
};

export function truncateText(text: string, maxLength: number) {
    if (text.length <= maxLength) return text;

    const truncated = text.slice(0, maxLength);
    const lastSpace = truncated.lastIndexOf(" ");

    return lastSpace > 0 ? truncated.slice(0, lastSpace) + "..." : truncated + "...";
}

export const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = '/news.jpg';
    event.currentTarget.onerror = null; // Prevent infinite loops
};
