import { Button, Spin } from 'antd';
import Row from 'components/Row/Row';
import { useGetEntityRowsQuery } from 'redux/apiSlice';
import style from './rows.module.scss';

function Rows() {
    const { data: rows, error, isLoading, refetch } = useGetEntityRowsQuery();

    if (isLoading) {
        return (
            <div className={style.spinWraper}>
                <Spin className={style.spin} size='large' />
            </div>
        );
    }

    if (error) {
        return <div>Error: {error.toString()}</div>;
    }

    return (
        <div className={style.warper}>
            <Button type='primary' onClick={refetch}>
                Refetch
            </Button>
            {rows &&
                rows.map(item => (
                    <Row
                        key={item.id}
                        id={item.id}
                        rowName={item.rowName}
                        salary={item.salary}
                        equipmentCosts={item.equipmentCosts}
                        overheads={item.overheads}
                        estimatedProfit={item.estimatedProfit}
                    />
                ))}
        </div>
    );
}

export default Rows;
