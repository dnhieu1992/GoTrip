import Grid from '../../../shared/components/grid/Grid'
import { useState } from 'react';

const CityList = () => {
  const mockDatas = [
    { id: 1, name: 'Đà Lạt', country: 'Việt Nam', status: "Actived" },
    { id: 2, name: 'TP.Hồ Chí Minh', country: 'Việt Nam', status: "Actived" },
    { id: 3, name: 'New York', country: 'United State', status: "Actived" },
    { id: 4, name: 'Los Angeles', country: 'United State', status: "Actived" },
    { id: 5, name: 'Thượng Hải', country: 'Trung Quốc', status: "Actived" },
    { id: 6, name: 'Bắc Kinh', country: 'Trung Quốc', status: "Actived" },
    { id: 7, name: 'Delhi', country: 'Ấn Độ', status: "Actived" },
    { id: 8, name: 'Mumbai', country: 'Ấn Độ', status: "Actived" },
  ];
  const [cityName, setCityName] = useState("");
  const [cityCountry, setCityCountry] = useState("");
  const [data, setData] = useState(mockDatas);
  const columns = [
    {
      fieldName: 'Id',
      dataField: 'id',
      isHidden: true
    },
    {
      fieldName: 'Name',
      dataField: 'name'
    },
    {
      fieldName: 'Country',
      dataField: 'country'
    },
    {
      fieldName: 'Status',
      dataField: 'status'
    }
  ];

  const onHandleNameChange = (e) => {
    setCityName(e.target.value);
  }

  const onHandleCountryChange = (e) => {
    setCityCountry(e.target.value);
  }

  const onHandleSearch = (e) => {
    const result = mockDatas.filter(item => {
      if ((!cityName || (cityName && item.name.indexOf(cityName) > -1)) && (!cityCountry || (cityCountry && item.country.indexOf(cityCountry) > -1))) {
        return item;
      }
    });
    setData(result);
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3>City</h3>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-sm-6">
            <div className="form-group row">
              <label className="col-sm-4">Name</label>
              <input className="form-control col-sm-8" value={cityName} onChange={onHandleNameChange} />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group row">
              <label className="col-sm-4">Country</label>
              <select className="form-select form-control col-sm-8" aria-label="Default select example" value={cityCountry} onChange={onHandleCountryChange}>
                <option selected hidden>Chọn tên thành phố</option>
                <option value="Việt Nam">Việt Nam</option>
                <option value="United State" >United State</option>
                <option value="Trung Quốc" >Trung Quốc</option>
                <option value="Ấn Độ" >Ấn Độ</option>
              </select>
            </div>
          </div>
        </div>
        <div className="row">
          <div className='col-sm-12 d-flex justify-content-end'>
            <button type="button" className="btn btn-primary" onClick={onHandleSearch}>Search</button>
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="mt-5">
          <Grid data={data}
            columns={columns}
            currentPage={1}
            pageSize={5}
            total={mockDatas.length}
          />
        </div>
      </div>
    </div>
  )
}

export default CityList;