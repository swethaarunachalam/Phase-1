// import React, { useEffect, useState } from 'react';
// import Axios from 'axios';

// export const App = () => {
//   const [product, setProduct] = useState(null);

//   const fetchProduct = () => {
//     Axios.get("https://fakestoreapi.com/products/1")
//       .then((res) => {
//         setProduct(res.data); // Correct API response handling
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   };

//   useEffect(() => {
//     fetchProduct(); // Fetch product when component mounts
//   }, []);

//   return (
//     <div className="APP">
//       <h1>Fake Store API Product</h1>
//       <button onClick={fetchProduct}>Generate Product</button>

//       {product && (
//         <div>
//           <h2>{product.title}</h2>
//           <img src={product.image} alt={product.title} width="200px" />
//           <p>{product.description}</p>
//           <p>Price: ${product.price}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;
