import { Route, Routes } from "react-router-dom";
import Products from "./Products";
import Category from "./Category";
import SubCategory from "./SubCategory";
import Manufacture from "./Manufacture";
import AddCategoryForm from "./AddCategoryForm";
import AddSubCategoryForm from "./AddSubCategoryForm";
import AddProductsForm from "./AddProductsForm";
import ProductDetail from "./ProductDetail";
import AddManufactureForm from "./AddManufactureForm";



export function ProductRouter(){
    return(
        <>
            <Routes>
                <Route path="/category" element={<Category />}/>
                <Route path="/category/add" element={<AddCategoryForm />}/>
                <Route path="/subcategory" element={<SubCategory />}/>
                <Route path="/subcategory/add" element={<AddSubCategoryForm />}/>
                <Route path="/product" element={<Products />}/>
                <Route path="/product/add" element={<AddProductsForm />}/>
                <Route path="/product/detail/:id" element={<ProductDetail />}/>
                <Route path="/manufacture" element={<Manufacture />}/>
                <Route path="/manufacture/add" element={<AddManufactureForm />}/>
                <Route path="/*" element={<h1>Not found</h1>}/>
                
                
            </Routes>

        </>
    )

}