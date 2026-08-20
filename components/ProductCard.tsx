type Product = {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string;
};

type ProductCardProps = {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps){
    return(
        <article className="group">
            <div className="relative aspect-[4/5 overflow-hidden rounded-2xl bg-neutral-900">
                <img src={product.image} alt={product.name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                 />

                 <button className="absolute bottom-4 left-4 right-4 translate-y-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-black opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                Add to cart
                </button>
            </div>

             <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold">{product.name}</h3>

          <p className="mt-1 text-sm text-neutral-500">
            {product.category}
          </p>
        </div>

        <p className="font-medium">
          ₹{product.price.toLocaleString("en-IN")}
        </p>
      </div>
        </article>
    )
}