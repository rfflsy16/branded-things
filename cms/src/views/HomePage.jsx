import { useEffect, useState } from "react";
import axios from "axios";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);

  async function fetchProduct({ base_url }) {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `${base_url}/apis/branded-things/products`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return <></>;
}
