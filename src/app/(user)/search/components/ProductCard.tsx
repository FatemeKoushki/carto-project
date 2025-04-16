import Image from 'next/image'

type ProductCardProps = {
  name: string
  price: number
  oldPrice?: number
  image: string
}

export default function ProductCard({ name, price, oldPrice, image }: ProductCardProps) {
  return (
    <div className="border rounded p-4 shadow hover:shadow-lg transition relative">
      <Image src={image} alt={name} width={150} height={150} className="mx-auto" />
      <h3 className="font-semibold text-center mt-2">{name}</h3>
      <p className="text-center text-blue-600 font-bold">${price.toLocaleString()}</p>
      {oldPrice && (
        <p className="text-center text-sm line-through text-gray-400">${oldPrice.toLocaleString()}</p>
      )}
      <div className="absolute bottom-2 right-2 text-blue-500 cursor-pointer">🛒</div>
    </div>
  )
}