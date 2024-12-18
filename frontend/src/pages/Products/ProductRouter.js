import { Route, Routes } from "react-router-dom";
import { lazy } from 'react';

const Products = lazy(() => import("./Products"));
const Category = lazy(() => import("./Category"));
const SubCategory = lazy(() => import("./SubCategory"));
const Manufacture = lazy(() => import("./Manufacture"));
const AddCategoryForm = lazy(() => import("./AddCategoryForm"));
const AddSubCategoryForm = lazy(() => import("./AddSubCategoryForm"));
const AddProductsForm = lazy(() => import("./AddProductsForm"));
const ProductDetail = lazy(() => import("./ProductDetail"));
const AddManufactureForm = lazy(() => import("./AddManufactureForm"));




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
            </Routes>

        </>
    )

}