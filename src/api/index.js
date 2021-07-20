import getCustOrders from './frontend/Orders';
import getCustOrder from './frontend/Order';
import { getShopImg } from './frontend/AboutUs';
import { getProductInfo } from './frontend/Product';
import { getCarts, putCartQty, deleteCart, deleteAllCarts, postAddCart } from './frontend/shared';
import postLogin from './backend/Login';
import { postCheck, getUser } from './backend/Backstage';
import { getPageProducts, getAllProducts } from './frontend/Products';
import { postCheckout, postCoupon } from './frontend/Checkout';
import { postUploadImg, postAddProduct, putEditProduct } from './backend/AddProduct/index';
import LogOut from './backend/shared/index';
import { getProducts, deleteProduct } from './backend/Products';
import { getOrders, deleteAllOrders } from './backend/Orders';
import { putEditOrder, delOrder } from './backend/Order';
import { postAddCoupon, getCoupons, editCoupon, deleteCoupon } from './backend/Coupon';

// frontend
export const apiGetProductInfo = getProductInfo;
export const apiGetCarts = getCarts;
export const apiGetPageProducts = getPageProducts;
export const apiGetAllProducts = getAllProducts;
export const apiPutCartQty = putCartQty;
export const apiDeleteCart = deleteCart;
export const apiDeleteAllCarts = deleteAllCarts;
export const apiPostAddCart = postAddCart;
export const apiGetShopImg = getShopImg;
export const apiPostCheckout = postCheckout;
export const apiPostCoupon = postCoupon;
export const apiGetCustOrders = getCustOrders;
export const apiGetCustOrder = getCustOrder;

// backend
export const apiPostLogin = postLogin;
export const apiPostCheck = postCheck;
export const apiGetUser = getUser;
export const apiPostUploadImg = postUploadImg;
export const apiPostAddProduct = postAddProduct;
export const apiLogOut = LogOut;
export const apiGetProducts = getProducts;
export const apiDeleteProduct = deleteProduct;
export const apiPutEditProduct = putEditProduct;
export const apiGetOrders = getOrders;
export const apiDeleteAllOrders = deleteAllOrders;
export const apiPutEditOrder = putEditOrder;
export const apiDelOrder = delOrder;
export const apiPostAddCoupon = postAddCoupon;
export const apiGetCoupons = getCoupons;
export const apiPutEditCoupon = editCoupon;
export const apiDeleteCoupon = deleteCoupon;
