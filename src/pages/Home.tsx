import { ChangeEvent, useState } from "react";
import {
  Button,
  DatePicker,
  Dropdown,
  Empty,
  Pagination,
  Spin,
  Statistic,
  Select,
  type MenuProps,
} from "antd";
import { useGetNews } from "../features/home/homeService";
import { selectNewsIcon } from "../utils/helpers";
import { CATEGORIES, DEFAULT_KEYS, MENU_ITEMS } from "../constants";


import useDebounce from "../hooks/useDebounce";
import ArticleCard from "../components/ArticleCard";
import SearchBar from "../components/SearchBar";
import { Loader } from "../components/Loader";

const { RangePicker } = DatePicker;

export default function Home() {
  const [query, setQuery] = useState<string | undefined>();
  const [selectedKeys, setSelectedKeys] = useState<string[]>(DEFAULT_KEYS);
  const [dates, setDates] = useState<[string, string] | undefined>();
  const [skip, setSkip] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const debouncedQuery = useDebounce(query, 500);
  
  const { news, loading } = useGetNews({
    query: debouncedQuery,
    skip,
    page: page,
    pageSize: skip.length ? skip.length * 4 : 3,
    from: dates?.[0],
    to: dates?.[1],
  });

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const onChange = (_: unknown, dateString: [string, string]) => {
    setDates(dateString);
  };

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "all") {
      if (selectedKeys.length === DEFAULT_KEYS.length) {
      // If all are checked, uncheck everything
      setSelectedKeys([]);
      setSkip(DEFAULT_KEYS);
    } else {
      // If some or none are checked, check all
      setSelectedKeys(DEFAULT_KEYS);
      setSkip([]);
    }
    } else if (selectedKeys.includes(e.key)) {
      setSelectedKeys(selectedKeys.filter((key) => key !== e.key));
      setSkip([...skip, e.key]);
    } else {
      setSelectedKeys([...selectedKeys, e.key]);
      setSkip(skip.filter((key) => key !== e.key));
    }
  };


  return (
        <div className="p-8 lg:p-20 space-y-4 lg:space-y-12 bg-[#6b8e23]/10">
          <div className="bg-[url('/images/newspaper-background.jpg')] h-full blur-lg bg-cover bg-center fixed inset-0 -z-10" />
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            <SearchBar value={query as string}
              handleSearchChange={handleSearchChange}/>
        <Dropdown
          menu={{
                items: MENU_ITEMS,
                selectable: true,
                defaultSelectedKeys: DEFAULT_KEYS,
                selectedKeys,
                onClick: handleMenuClick,
          }}
          className="bg-white"
            >
              <Button size="large">News Source</Button>
            </Dropdown>
            <Select
              placeholder="Select a Category"
              size="large"
              className="w-full md:w-[200px]"
              onChange={setQuery}
              options={CATEGORIES}
            />
              <RangePicker
                className="text-gray-800 shadow-2xl border-gray-500 w-full lg:w-fit"
                size="large"
                onChange={onChange}
              />
      </div>
      {loading ? (
        <Loader/>
      ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {news.map(({ id, title, url, source, description, publishedAt, urlToImage }) => (
              <Spin key={id} spinning={loading}>
                <ArticleCard
                  title={title}
                  description={description}
                  urlToImage={urlToImage  || selectNewsIcon(source)}
                  source={source}
                  publishedAt={publishedAt}
                  url={url}
                />
              </Spin>
            ))}
          </div>
      )}
          {!news.length && (
            <div className="p-24 bg-white rounded-md">
              <Empty description="No news found" />
            </div>
          )}
          <div className="flex justify-between items-center bg-white p-4 rounded-md">
            <Pagination
              current={page}
              onChange={setPage}
              total={news.length}
              showSizeChanger={false}
            />
            <Statistic title="Total news" value={news.length} />
          </div>
        </div>
  );
}