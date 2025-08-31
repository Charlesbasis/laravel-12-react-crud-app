import { Link } from '@inertiajs/react';

interface LinkProps {
  active: boolean;
  label: string;
  url: string | null;
}

interface PaginationData {
  links: LinkProps[];
  from: number;
  to: number;
  total: number;
}

function Pagination({ products } : { products: PaginationData }) {
  return (
    <div className='flex gap-2'>
        {products.links.map((link, index) => (
          <Link 
            className={`px-4 py-2 border rounded ${link.active ? 'bg-black text-white' : ''}`}
            href={link.url || '#'}
            key={index}
            dangerouslySetInnerHTML={{ __html: link.label}}
          />
        ))}
    </div>
  )
}

export default Pagination