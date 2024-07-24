import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTableOrderById } from "../../../../../../apis/cashier";
import "./OrderDetails.scss";
import ShowDataModal from "../../../../../../components/ui/ShowDataModal/ShowDataModal";
import {
  updateProductQuantityInOrder,
  deleteProductQuantityInOrder,
} from "../../../../../../apis/orders";
import { message, Select } from "antd";
import { useNavigate } from "react-router-dom";
const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [isModalVisible, setisModalVisible] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const getOrderByID = async () => {
      try {
        const res = await getTableOrderById(id);
        console.log(res.data);
        setOrder(res.data);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };
    getOrderByID();
  }, [id]);

  const detailsHeaders = [
    {
      key: "quantity",
      label: "الكمية",
      isInput: true,
    },
  ];

///////////////////////////////////
const { Option } = Select;
const [clientTypes, setClientTypes] = useState([]);
const [clients, setClients] = useState([]);
const [paymentMethods, setPaymentMethods] = useState([]);
const [errors, setErrors] = useState({});
const [addFormVisible, setAddFormVisible] = useState(false);
const [discountReasons, setDiscountReasons] = useState([]);
const [flag, setFlag] = useState(false)
const [printData, setPrintData] = useState();


useEffect(() => {
  const fetchData = async () => {
    await fetchPaymentMethods();
    await fetchDiscountReasons();

  };
  fetchData();
}, []);

const fetchPaymentMethods = async () => {
  try {
    const Token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const response = await fetch(
      `${API_ENDPOINT}/api/v1/store/payment_method`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
    );
    const data = await response.json();
    setPaymentMethods(data.data);
  } catch (error) {
    console.error("Error fetching payment methods:", error);
  }
};

const handlePaymentMethodChange = async (value) => {
  setNewUserValues((prevState) => ({
    ...prevState,
    payment_method_id: value,
  }));
  try {
    const Token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const response = await axios.get(
      `${API_ENDPOINT}/api/v1/store/client_type/payment_method/${value}`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
    );
    setClientTypes(response.data.data);
    console.log("Client dataaaaaa ========>", response.data.data)
  } catch (error) {
    console.error("Error fetching client types for payment method:", error);
  }
};


const handleClientTypeChange = async (value) => {
  setNewUserValues((prevState) => ({
    ...prevState,
    client_type_id: value,
  }));
  try {
    const Token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const response = await axios.get(
      `${API_ENDPOINT}/api/v1/orders/clients/${value}`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
    );
    setClients(response.data.data);
    console.log("Client Data ========>", response.data.data)
    fetchClientType(newUserValues["client_type_id"])
  } catch (error) {
    console.error("Error fetching clients for client type:", error);
  }
};

///////////////////////////////////
  return (
    <div>
      {order.code && (
        <div>
          <h1 className="order-title"> اوردر كود {order.code}</h1>
  {/* ///////////////////////////////////// */}

<div className="form-cashier-product-category">
          
          <div className="form-cashier-select-wrraper">
            <label className="form-cashier-label">طرق الدفع</label>
            <Select
              showSearch
              className="form-cashier-select"
              placeholder="اختر طريقة دفع"
              onChange={handlePaymentMethodChange}
              filterOption={(input, option) => {
              
                return (option?.children ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase());
              }}
              optionFilterProp="children"
            >
              {paymentMethods.map((method) => (
                <Option key={method.id} value={method.id}>
                  {method.name}
                </Option>
              ))}
            </Select>
          </div>
          <div className="form-cashier-select-wrraper">
            <label className="form-cashier-label">نوع العميل</label>
            <Select
              showSearch
              className="form-cashier-select"
              placeholder="اختر نوع العميل"
              onChange={handleClientTypeChange}
              filterOption={(input, option) => {
             
                return (option?.children ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase());
              }}
              optionFilterProp="children"
            >
              {clientTypes.map((type) => (
                <Option key={type.id} value={type.id}>
                  {type.name}
                </Option>
              ))}
            </Select>
            <button
            className="form-cashier-btn"
            onClick={() => setAddFormVisible(!addFormVisible)}
            style={{ width: "100%" }}
          >
            أضف جديد
          </button>
          </div>
          <div className="form-cashier-select-wrraper">
            <label className="form-cashier-label">العميل</label>
            <Select
              showSearch
              className="form-cashier-select"
              placeholder="اختر العميل"
              onChange={(value) => handleNewUserFormChange("client_id", value)}
              filterOption={(input, option) => {
              
                return (option?.children ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase());
              }}
              optionFilterProp="children"
            >
              {clients.map((client) => (
                <Option key={client.id} value={client.id}>
                  {client.name}
                </Option>
              ))}
            </Select>
            
          </div>
        
        </div>








  {/* ///////////////////////////////////// */}

          <div className="order-header">
            {order.comment && <p>ملاحظة: {order.comment}</p>}
            {order.discount !== null && <p>سبب الخصم: {order.discount_name}</p>}
            {order.discount_resones && (
              <p>سبب الخصم: {order.discount_resones}</p>
            )}
             {order.total_price_after_discount && (
              <p>اجمالى السعر بعد الخصم: {order.total_price_after_discount_and_tax}</p>
            )}
            {order.order_date && <p>تاريخ الأوردر: {order.order_date}</p>}
            {order.target_department_name && (
              <p>إسم القسم المراد: {order.target_department_name}</p>
            )}
          </div>
          <h2>المنتجات:</h2>
          <button
            className="add-btn"
            onClick={() => {
              navigate(`/warehouse/cashier/${id}/add-products-to-order`);
            }}
          >
            إضافة منتجات
          </button>
          <ul className="order-details-container">
            {order.products &&
              order.products.map((product, index) => {
                console.log(product);
                return (
                  <li key={index} className="order">
                    <div className="img-container">
                      <img
                        className="product-image"
                        src={product.image}
                        alt={product.name}
                      />
                    </div>
                    <div className="order-details-txt">
                      <p>إسم المنتج: {product.name}</p>
                      <p>السعر: {product.price} جم</p>
                      <p>الكمية: {product.quantity}</p>
                    </div>
                    <div className="product-buttons">

                      <button
                        className="product-button edit"
                        onClick={async () => {
                          setCurrentProductId(product.id);
                          setCurrentProduct(product);
                          setisModalVisible(true);
                        }}
                      >
                        تعديل
                      </button>
                      <button
                        className="product-button delete"
                        onClick={async () => {
                          await deleteProductQuantityInOrder(
                            product.product_id_in_order
                          );
                          window.location.reload();
                        }}
                      >
                        حذف
                      </button>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      )}
      {isModalVisible && (
        <ShowDataModal
          id={currentProductId}
          detailsHeaders={detailsHeaders}
          responseData={currentProduct}
          handleModalVisible={setisModalVisible}
          updateFn={updateProductQuantityInOrder}
          closeAfterEdit={true}
        />
      )}
    </div>
  );
};

export default OrderDetails;
