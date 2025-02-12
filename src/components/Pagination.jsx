function Pagination({pageInfo,handlePageChange}) {

    return (
        <>
            <div className="d-flex justify-content-center">
                <nav>
                    <ul className="pagination">
                        {/* 檢查上一頁標籤是否關閉 */}
                        <li className={`page-item ${!pageInfo.has_pre && 'disabled'}`}>
                            {/* 綁定帶入上一頁的函數和參數 */}
                            <a className="page-link" href="#" onClick={() => handlePageChange(pageInfo.current_page - 1)}>
                                上一頁
                            </a>
                        </li>
                        {/* 渲染頁碼，最後別忘了加return */}
                        {Array.from({ length: pageInfo.total_pages }).map((_, index) => {
                            return (<li key={index} className={`page-item ${pageInfo.current_page === index + 1 && 'active'}`}>
                                <a className="page-link" href="#" onClick={() => handlePageChange(index + 1)}>
                                    {index + 1}
                                </a>
                            </li>)
                        })}


                        {/* 檢查下一頁標籤是否關閉 */}
                        <li className={`page-item ${!pageInfo.has_next && 'disabled'}`}>
                            {/* 綁定帶下一頁的函數和參數 */}
                            <a className="page-link" href="#" onClick={() => handlePageChange(pageInfo.current_page + 1)}>
                                下一頁
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default Pagination;