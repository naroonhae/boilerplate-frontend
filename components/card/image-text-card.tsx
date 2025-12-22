import Image from 'next/image';

interface Props {
  image: string;
  title: string;
  description: string;
  time?: string;
}

export default function ImageTextCard({
  image = 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&amp;fit=crop&amp;q=80&amp;w=1160',
  title,
  description,
  time,
}: Props) {
  return (
    <>
      <article className="overflow-hidden rounded-lg shadow-sm transition hover:shadow-lg dark:shadow-gray-700/25">
        <Image alt="" src={image} className="h-56 w-full object-cover" width={256} height={128} />

        <div className="bg-white p-4 sm:p-6 dark:bg-gray-900">
          {time && (
            <time dateTime={time} className="block text-xs text-gray-500 dark:text-gray-400">
              {new Date(time).toLocaleDateString()}
            </time>
          )}

          <a href="#">
            <h3 className="mt-0.5 text-lg text-gray-900 dark:text-white">{title}</h3>
          </a>

          <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500 dark:text-gray-400">
            {description}
          </p>
        </div>
      </article>
    </>
  );
}
