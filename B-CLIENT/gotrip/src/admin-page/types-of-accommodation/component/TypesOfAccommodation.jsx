import Grid from '../../../shared/components/grid/Grid';
import { useState } from 'react';

const TypesOfAccommodation = () => {
  const mockDatas = [
    { id: 1, name: 'Hotels', amount: 769854, status: 'Actived' },
    { id: 2, name: 'Apartments', amount: 699393, status: 'Actived' },
    { id: 3, name: 'Resorts', amount: 18212, status: 'Actived' },
    { id: 4, name: 'Villas', amount: 368425, status: 'Actived' },
    { id: 5, name: 'Cabins', amount: 29531, status: 'Actived' },
    { id: 6, name: 'Cottages', amount: 129312, status: 'Actived' },
    { id: 7, name: 'Glamping', amount: 9482, status: 'Actived' },
    { id: 8, name: 'Serviced Apartments', amount: 31594, status: 'Actived' },
  ];
  const [typesOfAccommodationName, settypesOfAccommodationName] = useState('');
  const [data, setData] = useState(mockDatas);
  const columns = [
    {
      fieldName: 'Id',
      dataField: 'id',
      isHidden: true,
    },
    {
      fieldName: 'Name',
      dataField: 'name',
    },
    {
      fieldName: 'Amount',
      dataField: 'amount',
    },
    {
      fieldName: 'Status',
      dataField: 'status',
    },
  ];

  const onHandleNameChange = (e) => {
    settypesOfAccommodationName(e.target.value);
  };

  const onHandleSearch = () => {
    const result = mockDatas.filter((item) => {
      if (
        !typesOfAccommodationName ||
        (typesOfAccommodationName &&
          item.name
            .toLowerCase()
            .indexOf(typesOfAccommodationName.toLowerCase()) > -1)
      ) {
        return item;
      }
    });
    setData(result);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3>Types-of-Accommodation</h3>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-sm-6">
            <div className="form-group row">
              <lable className="col-sm-4">Name</lable>
              <input
                className="form-control col-sm-8"
                value={typesOfAccommodationName}
                onChange={onHandleNameChange}
              />
            </div>
          </div>
          <div className="col-sm-6 dflex justify-content-start">
            <button
              type="button"
              className="btn btn-primary"
              onClick={onHandleSearch}
            >
              Search
            </button>
          </div>
        </div>
        {/* <div className="row">
                    <div className="col-sm-12 d-flex justify-content-center">
                        <button type="button" className = "btn btn-primary" onClick={onHandleSearch}>Search</button>
                    </div>
                </div> */}
      </div>
      <div className="card-body">
        <div className="mt-5">
          <Grid
            data={data}
            columns={columns}
            curentPage={1}
            pageSize={5}
            total={mockDatas.lenght}
          ></Grid>
        </div>
      </div>
    </div>
  );
};
export default TypesOfAccommodation;
