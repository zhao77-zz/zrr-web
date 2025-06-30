import Image from "next/image";
import Link from "next/link";

export interface ExerciseCardProps {
  id: string | number;
  title: string;
  description: string;
  imageUrl?: string;
  link?: string;
  tags?: string[];
}

export default function DdddddExerciseCard({ title, description, imageUrl, link, tags }: ExerciseCardProps) {
  const cardContent = (
    <>
      {imageUrl && (
        <div className="relative w-full h-48">
          <Image
            src={imageUrl}
            alt={title || 'Exercise image'}
            fill
            style={{ objectFit: 'cover' }}
            className="transition-transform duration-500 group-hover:scale-110"
          />
           <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-purple-900/0 to-purple-900/0"></div>
        </div>
      )}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-purple-800 mb-3">{title}</h3>
        <p className="text-purple-600 text-sm mb-4 h-20 overflow-y-auto flex-grow">{description}</p>
        {tags && tags.length > 0 && (
          <div className="mb-5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-purple-700/20 text-purple-700 text-xs font-medium mr-2 px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="mt-auto">
           <div className="font-medium text-purple-700 group-hover:text-orange-500 transition-colors duration-300">
             查看练习 &rarr;
           </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="relative group">
       <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-400 rounded-lg blur opacity-0 group-hover:opacity-75 transition duration-500"></div>
        <div className="relative bg-white/90 backdrop-blur-md rounded-lg shadow-lg overflow-hidden h-full flex flex-col transition-all duration-300 ease-in-out group-hover:shadow-purple-500/30 group-hover:shadow-2xl">
          {link ? (
            <Link href={link} target="_blank" rel="noopener noreferrer" className="flex flex-col h-full">
              {cardContent}
            </Link>
          ) : (
            <div className="flex flex-col h-full">{cardContent}</div>
          )}
        </div>
    </div>
  );
} 