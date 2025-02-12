import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Modal } from 'bootstrap';
import Pagination from '../components/Pagination';
import ProductModal from '../components/Productmodal';
import DeleteProductModal from '../components/DeleteProductModal';
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;


function ProductPage({ isAuth }) {

    const [products, setProducts] = useState([]); //產品列表
    
    const [isProductModalOpen,setIsProductModalOpen]=useState(false);

    const [isProductDeleteModalOpen,setIsProductDeleteModalOpen]=useState(false);
    const [pageInfo, setPageInfo] =
        useState({
            "total_pages": 1,
            "has_pre": false,
            "has_next": false,
            "category": "",
            "current_page": ""
        }); // 分頁資訊
    const getProduces = async (page = 1) => {

        try {
            const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/admin/products?page=${page}`);
            setProducts(res.data.products);

            const { total_pages, has_pre, has_next, category, current_page } = res.data.pagination;

            setPageInfo({
                ...pageInfo,
                total_pages: total_pages,
                has_pre: has_pre,
                has_next: has_next,
                category: category,
                current_page: current_page
            });


        } catch (err) {
            console.log(err);

            alert("取得產品失敗");

        }
    }
    const defaultModalState = {
        imageUrl: "",
        title: "",
        category: "",
        unit: "",
        origin_price: "",
        price: "",
        description: "",
        content: "",
        is_enabled: 0,
        imagesUrl: [""]
    };
    const handlePageChange = (page) => {
        getProduces(page);

    }
    const handleOpenProductModal = (mode, product) => {
        setModalMode(mode);

        switch (mode) {
            case "create":
                setTempProduct(defaultModalState);
                break;
            case "edit":
                setTempProduct(product);
                break;
        }
        setIsProductModalOpen(true);
       
    }
    const handleOpenDelProductModal = (product) => {
        setTempProduct(product);
        
        setIsProductDeleteModalOpen(true);
    }
    const [modalMode, setModalMode] = useState(null);
    const [tempProduct, setTempProduct] = useState(defaultModalState);

    
    useEffect(() => {
        if (isAuth) {
            getProduces();
        }
    }, [isAuth]);

 

 
    
    
  

   



    return (
        <>
            <div className="container py-5">
                <div className="row">
                    <div className="col">
                        <div className="d-flex justify-content-between">

                            <h2>產品列表</h2><button type="button" className="btn btn-primary" onClick={() => { handleOpenProductModal('create') }}>建立新的產品</button>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">產品名稱</th>
                                    <th scope="col">原價</th>
                                    <th scope="col">售價</th>
                                    <th scope="col">是否啟用</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id}>
                                        <th scope="row">{product.title}</th>
                                        <td>{product.origin_price}</td>
                                        <td>{product.price}</td>
                                        <td>{product.is_enabled ? (<span className="text-success">啟用</span>) : '未啟用'} </td>
                                        <td>
                                            <div className="btn-group">
                                                <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => { handleOpenProductModal('edit', product) }}>編輯</button>
                                                <button type="button" onClick={() => { handleOpenDelProductModal(product) }} className="btn btn-outline-danger btn-sm">刪除</button>
                                            </div>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Pagination pageInfo={pageInfo} handlePageChange={handlePageChange}></Pagination>
                </div>
            </div>
          <ProductModal modalMode={modalMode} tempProduct={tempProduct} isOpen={isProductModalOpen} setIsOpen={setIsProductModalOpen} getProduces={getProduces} />
            
           <DeleteProductModal tempProduct={tempProduct} isOpen={isProductDeleteModalOpen} setIsOpen={setIsProductDeleteModalOpen} getProduces={getProduces}></DeleteProductModal>                     
        </>
    )

}

export default ProductPage;