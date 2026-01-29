import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function Cart(){
    const [cart, setCart] = useState([]);

    const getCart = async() => {
        try {
            const response = await axios.get(`${API_BASE}/api/${API_PATH}/cart`)
            setCart(response.data.data);
        } catch (error) {
            console.log(error.response.message);
        }
    }

    useEffect(() => {
        const getCart = async() => {
            try {
                const response = await axios.get(`${API_BASE}/api/${API_PATH}/cart`)
                setCart(response.data.data);
            } catch (error) {
                console.log(error.response.message);
            }
        }
        getCart();
    },[])

    const updateCart =async(cardId, productId, qty=1) =>{
        try {
            const data = {
                product_id: productId,
                qty
            }
            // eslint-disable-next-line no-unused-vars
            const response = await axios.put(`${API_BASE}/api/${API_PATH}/cart/${cardId}`, {data})
            getCart();
        } catch (error) {
            console.log(error.response.message)
        }
    }

    const deleteCart =async(cardId) =>{
        try {
        
            const response = await axios.delete(`${API_BASE}/api/${API_PATH}/cart/${cardId}`)
            Swal.fire({
                text: `${response.data.message}`,
                icon: "success"
            });
            getCart();
        } catch (error) {
            Swal.fire({
                text: `${error.response.data.message}`,
                icon: "error"
            });
        }
    }

    const deleteAllCart =async() =>{
        try {
            // eslint-disable-next-line no-unused-vars
            const response = await axios.delete(`${API_BASE}/api/${API_PATH}/carts`)
            Swal.fire({
                text: "已清除購物車內容",
                icon: "success"
            });
            getCart();
        } catch (error) {
            Swal.fire({
                text: `${error.response.data.message}`,
                icon: "error"
            });
        }
    }

    return(
        <>
            <div className="container">
                <h2 className="mt-3">購物車列表</h2>
                <div className="text-end mt-4">
                    <button type="button" className="btn btn-danger" onClick={() => deleteAllCart()}>
                    清空購物車
                    </button>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">品名</th>
                            <th scope="col">數量/單位</th>
                            <th scope="col">小計</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart?.carts?.map(cartItem => (
                                <tr key={cartItem.id}>
                                    <td>
                                    <button 
                                        type="button" 
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={() => deleteCart(cartItem.id)}
                                    >
                                        刪除
                                    </button>
                                    </td>
                                    <th scope="row">{cartItem.product.title}</th>
                                    <td>
                                        <div className="input-group input-group-sm mb-3">
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                aria-label="Sizing example input" 
                                                aria-describedby="inputGroup-sizing-sm" 
                                                defaultValue={cartItem.qty}
                                                onChange={(e) => updateCart(cartItem.id, cartItem.product_id, Number(e.target.value))}
                                            />
                                            <span className="input-group-text" id="inputGroup-sizing-sm">{cartItem.product.unit}</span>
                                        </div>
                                    </td>
                                    <td className="text-end">{cartItem.final_total}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td className="text-end" colSpan="3">
                            總計
                            </td>
                            <td className="text-end">{cart.final_total}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </>
    )
}

export default Cart