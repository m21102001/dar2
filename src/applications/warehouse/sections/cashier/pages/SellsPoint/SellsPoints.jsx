import Table from "../../../../../../components/shared/table/Table";
import "../../../../../../components/shared/table/Table.scss";
import {
    deleteDeaprtment,
    getDeaprtments,
} from "../../../../../../apis/department";
import { useAuth } from "../../../../../../context/AuthContext";
import { useState, useEffect } from "react";
import axios from 'axios'
import { Link, useLocation } from "react-router-dom";
import { API_ENDPOINT } from "../../../../../../../config";
const SellsPoints = () => {
    const item = useLocation()?.state?.item
    console.log('item in menu', item);
    const Token = localStorage.getItem("token") || sessionStorage.getItem("token");
    const { user } = useAuth()
    const tableHeaders = [
        { key: "code", value: "الكود" },
        {
            key: "name",
            value: " الاسم ",
            clickable: true,
            route: "/warehouse/departments/show-departments/product/:id",
        },
        { key: "image", value: "الصوره", type: "image" },
    ];
    const filters = [
        { key: "name", type: "text", placeholder: "إبحث باللإسم", id: "الإسم" },
    ];
    const actions = [
        {
            type: `${user?.permissions.some(
                (permission) => permission.name === "edit department"
            )
                ? "edit"
                : ""
                }`,
            label: "تعديل",
            route: "/warehouse/departments/:id/edit-departments",
        },
        {
            type: `${user?.permissions.some(
                (permission) => permission.name === "delete department"
            )
                ? "delete"
                : ""
                }`,
            label: "حذف",
        },

        {
            type: `${user?.permissions.some(
                (permission) => permission.name === "create department"
            )
                ? "add"
                : ""
                }`,
            label: "إضافة قسم ",
            route: "/warehouse/departments/add-departments",
        },
    ];
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get(`${API_ENDPOINT}/api/v1/store/department`, {

            headers: {
                Authorization: `Bearer ${Token}`,
            },
        }
        )
            .then(res => {
                setData(res?.data?.data)
            })


    }, [])
    console.log('userrrrrrrrrrrrrrrrr', user?.department?.id, 'department id', data[5]?.id);
    return (
        <div>
            <Table
                headers={tableHeaders}
                title=" نقاط البيع"
                filters={filters}
                fetchData={(filterValues, currentPage, setIsLoading) =>
                    getDeaprtments(filterValues, currentPage, setIsLoading)
                }
                actions={actions}
                deleteFn={deleteDeaprtment}
            />
        </div>
    );
};

export default SellsPoints;

