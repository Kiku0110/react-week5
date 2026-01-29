import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router"
import Swal from "sweetalert2";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function SingleProduct(){
    const {id} = useParams();
    const [product, setProduct] = useState();

    useEffect(() => {
        const handleView = async(id) =>{
            try {
                const response = await axios.get(`${API_BASE}/api/${API_PATH}/product/${id}`)
                setProduct(response.data.product);
            } catch (error) {
                console.log(error.response.message);
            }
        }
        handleView(id);
    },[id])

    const addCart = async(id, qty=1) =>{
        const data = {
            product_id: id,
            qty
        }
        try {
            const response = await axios.post(`${API_BASE}/api/${API_PATH}/cart`, {data})
            Swal.fire({
                text: `${response.data.message}`,
                icon: "success"
            });
        } catch (error) {
            Swal.fire({
                text: `${error.response.data.message}`,
                icon: "error"
            });
        }
    }

    return !product?(
        <h2>查無產品</h2>):(
        <div className="container mt-3">
            <div className="card h-100" style={{width:'18rem'}}>
                <img src={product.imageUrl} className="card-img-top" alt={product.title} />
                <div className="card-body">
                    <h5 className="card-title fw-bold">{product.title}</h5>
                    <p className="card-text text-start">{product.description}</p>
                    <p className="card-text text-start">價格：{product.price}</p>
                    <p className="card-text text-start">
                        <small className="text-body-secondary">{product.unit}</small>
                    </p>
                    <button type="button" className="btn btn-dark" onClick={() => addCart(product.id)}>加入購物車</button>
                </div>
            </div>                    
        </div>
    )
        
}

export default SingleProduct