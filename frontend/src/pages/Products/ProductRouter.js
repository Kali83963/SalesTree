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
                <Route path="/category" element={<Category  entity={'products/category'}/>}/>
                <Route path="/category/add" element={<AddCategoryForm entity={'products/category/create'} />}/>
                <Route path="/category/edit/:id" element={<AddCategoryForm entity={'products/category'} isEditing={true}/>}/>
                <Route path="/subcategory/" element={<SubCategory entity={'products/subcategory'}/>}/>
                <Route path="/subcategory/add" element={<AddSubCategoryForm entity={'products/subcategory/create'} />}/>
                <Route path="/subcategory/edit/:id" element={<AddSubCategoryForm entity={'products/subcategory'} isEditing={true} />}/>
                <Route path="/product" element={<Products entity={'products/product'} />}/>
                <Route path="/product/add" element={<AddProductsForm entity={'products/product/create'} />}/>
                <Route path="/product/edit/:id" element={<AddProductsForm entity={'products/product'} isEditing={true} />}/>
                <Route path="/product/detail/:id" element={<ProductDetail />}/>
                <Route path="/manufacture" element={<Manufacture entity={'products/manufacture'} />}/>
                <Route path="/manufacture/add" element={<AddManufactureForm  entity={'products/manufacture/create'} />}/>
                <Route path="/manufacture/edit/:id" element={<AddManufactureForm  entity={'products/manufacture'} isEditing={true} />}/>
            </Routes>

        </>
    )

}