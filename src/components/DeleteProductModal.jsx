import { useEffect, useRef} from 'react';
import axios from 'axios';
import { Modal } from 'bootstrap';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function DeleteProductModal({ getProduces, isOpen, setIsOpen,tempProduct }) {
    const deleteProductsModalRef = useRef(null);
    //刪除動作，刪除後會重刷產品頁面和關閉對話框。
    const handleDeleteProduct = async () => {
        try {
            await deleteProduct();
            getProduces();

            handleCloseDelProductModal();
        } catch {
            alert('刪除產品失敗');

        }
    }
    useEffect(() => {
        if (isOpen) {
            const modalInstance = Modal.getInstance(deleteProductsModalRef.current);
            modalInstance.show();
        }
    }, [isOpen])
    const handleCloseDelProductModal = () => {
        if (isOpen) {
            const modalInstance = Modal.getInstance(deleteProductsModalRef.current);
            modalInstance.hide();
            setIsOpen(false);
        }
    }
    useEffect(() => {
        new Modal(deleteProductsModalRef.current, { backdrop: false });

    }, [])

    //刪除產品資料delete
    const deleteProduct = async () => {
        try {
            await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/admin/product/${tempProduct.id}`);

        } catch {
            alert('刪除產品失敗');
        }

    }

    return (<><div
        ref={deleteProductsModalRef}
        className="modal fade"
        id="delProductModal"
        tabIndex="-1"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5">刪除產品</h1>
                    <button
                        onClick={handleCloseDelProductModal}
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div className="modal-body">
                    你是否要刪除
                    <span className="text-danger fw-bold">{tempProduct.title}</span>
                </div>
                <div className="modal-footer">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleCloseDelProductModal}
                    >
                        取消
                    </button>
                    <button onClick={handleDeleteProduct} type="button" className="btn btn-danger">
                        刪除
                    </button>
                </div>
            </div>
        </div>
    </div></>)
}
export default DeleteProductModal;