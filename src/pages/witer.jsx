import { useEffect, useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { API_ENDPOINT } from "../../config";
const domain = API_ENDPOINT;
const Token = localStorage.getItem("token") || sessionStorage.getItem("token");
const witer = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get(`${domain}/api/v1/store/invoice/filter/get_recipes/out_going_from_to_date/`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        }
      }
    )
      .then(response => {
        setData(response.data)
      })
      .catch(error => {
        console.log('error', error);
      });

  }, [])
  console.log("DATAAAAAAAAAAAAAAA", data);

  const witerArray = [
    {
      id: 1,
      name: 'محمد فاروق وهبي حسام',
      places: 'جاردن 1 ',
    },
    {
      id: 2,
      name: 'محمد فاروق  حسام',
      places: 'الاندلسيه',
    },
    {
      id: 3,
      name: 'محمد فاروق وهبي ',
      places: 'جاردن 1 ',
    },
    {
      id: 4,
      name: 'محمد فاروق  ',
      places: 'جاردن 1 ',
    },
  ]
  return (
    <div className=''>
      <div class="shadow-lg p-3 mb-5 rounded text-center fs-2 fw-bold shifts text-light" >الويتر</div>
      <div className="py-4">
        <Link
         to={'/warehouse/reports/witer/create-new'}>
      <button type="button" class="mx-3 btn btn-outline-success">اضافة ويتر جديد</button>
        </Link>
      </div>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">اسم الكاشير</th>
            <th scope="col">المنفذ</th>
            <th scope="col">الاجرائات</th>
          </tr>
        </thead>
        <tbody>
          {witerArray?.map((item, index) => (
            <tr key={index}>
              <th scope="row">{index +1 }</th>
              <td>{item?.name}</td>
              <td>{item?.places}</td>
              <td>
                <Link 
                to={`/warehouse/reports/witer/update-witer/${item?.id}`}
                state={{item}}
                >
                <button type="button" class="mx-3 btn btn-outline-info">تعديل</button>
                </Link>
                <button type="button" class="mx-3 btn btn-outline-danger">حذف</button>
              </td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  )
}

export default witer
