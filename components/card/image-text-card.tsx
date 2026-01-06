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
      <article className="overflow-hidden rounded-lg shadow-sm transition hover:shadow-lg">
        <Image alt="" src={image} className="h-56 w-full object-cover" width={256} height={128} />

        <div className="p-4 sm:p-6">
          {time && (
            <time dateTime={time} className="block text-xs">
              {new Date(time).toLocaleDateString()}
            </time>
          )}

          <a href="#">
            <h3 className="mt-0.5 text-lg">{title}</h3>
          </a>

          <p className="mt-2 line-clamp-3 text-sm/relaxed">{description}</p>
        </div>
      </article>
    </>
  );
}
