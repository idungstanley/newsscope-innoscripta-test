import { ArticleCardProps } from "../@types/type.interface";
import { handleImageError, truncateText } from "../utils/helpers";

const ArticleCard = ({ title, description, urlToImage, source, publishedAt, url }: ArticleCardProps) => (
  <div className="shadow-gray-400 rounded-lg overflow-hidden shadow-lg h-[370px] bg-white">
    {urlToImage && <img onError={handleImageError} src={urlToImage} alt={title} className="w-full h-48 object-cover" />}
    <div className="p-4">
      <h2 className="font-bold text-lg">{truncateText(title, 50)}</h2>
      <p className="text-sm text-gray-600">{truncateText(description, 70)}</p>
      <div className="mt-2 text-sm text-gray-500 capitalize">
        <span>{source}</span> · <span>{new Date(publishedAt).toLocaleDateString()}</span>
      </div>
      <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
        Read more
      </a>
    </div>
  </div>
);

export default ArticleCard;