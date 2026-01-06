import { LucideIcon } from 'lucide-react';

interface ItemProps {
  title: string;
  icon: LucideIcon;
  description: string;
}

interface Props {
  title: string;
  description: string;
  items: ItemProps[];
}

export default function FeatureGrid({ title, description, items }: Props) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h2 className="text-3xl/tight font-bold sm:text-4xl">{title}</h2>

        <p className="mt-4 text-lg text-pretty">{description}</p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
        {items.map((item) => (
          <div key={item.title} className="rounded-lg border p-6">
            <div className="inline-flex rounded-lg p-3">
              <item.icon />
            </div>
            <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
            <p className="mt-2 text-pretty">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
