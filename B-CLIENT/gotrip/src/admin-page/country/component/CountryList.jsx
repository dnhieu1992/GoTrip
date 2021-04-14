import Grid from '../../../shared/components/grid/Grid'


const CountryList = () => {
    const columns = [
        {
            fieldName: 'Id',
            dataField: 'id',
            isHidden: true
        },
        {
            fieldName: 'Code',
            dataField: 'code'
        },
        {
            fieldName: 'Name',
            dataField: 'name'
        },
        {
            fieldName: 'Status',
            dataField: 'status'
        }
    ];

    const mockDatas = [
        { id: 1, code: 'US', name: 'United States', status: "Actived" },
        { id: 2, code: 'SG', name: 'Singapore', status: "Actived" },
        { id: 3, code: 'GB', name: 'United Kingdom', status: "Actived" },
        { id: 4, code: 'AF', name: 'AFGHANISTAN', status: "Actived" },
        { id: 5, code: 'AX', name: 'ÅLAND ISLANDS', status: "Actived" },
        { id: 6, code: 'AL', name: 'ALBANIA', status: "Actived" },
        { id: 7, code: 'AD', name: 'ANDORRA', status: "Actived" }
    ];

    return (
        <div className="mt-5">
            <Grid data={mockDatas}
                columns={columns}
            />
        </div>
    )
}
export default CountryList;