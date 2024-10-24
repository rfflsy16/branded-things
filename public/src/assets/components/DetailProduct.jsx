import { useLocation } from "react-router-dom";

const DetailProduct = () => {
  const location = useLocation();
  const { product } = location.state || {};

  if (!product) {
    return <div>Produk tidak ditemukan.</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <img
        src={product.imgUrl}
        alt={product.name}
        className="w-full h-64 object-cover mb-4"
      />
      <p className="text-lg">{product.description}</p>
      <h2 className="text-xl font-bold mt-4">
        Rp {product.price.toLocaleString("id-ID")}
      </h2>
    </div>
  );
};

export default DetailProduct;
