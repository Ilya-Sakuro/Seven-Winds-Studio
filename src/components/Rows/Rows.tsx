import { Button, Input, Spin } from 'antd';
import classNames from 'classnames';
import { useState } from 'react';

import { useCreateRowMutation, useGetEntityRowsQuery } from 'redux/apiSlice';
import style from './rows.module.scss';

function Rows() {
    const { data: rows, error, isLoading, refetch } = useGetEntityRowsQuery();
    const [createRow] = useCreateRowMutation();
    const [disableToggle, setDisableToggle] = useState(true);
    const [value, setValue] = useState('');

    console.log(disableToggle);

    const handleCreateRow = async () => {
        try {
            const body = {
                equipmentCosts: 0,
                estimatedProfit: 0,
                machineOperatorSalary: 0,
                mainCosts: 0,
                materials: 0,
                mimExploitation: 0,
                overheads: 0,
                parentId: null,
                rowName: '',
                salary: 0,
                supportCosts: 0,
            };
            const result = await createRow(body).unwrap();
            console.log(result);
        } catch (err) {
            console.error('Failed to create row:', err);
        }
    };

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

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return (
        <div className={style.warper}>
            <Button type='primary' onClick={refetch}>
                Refetch
            </Button>
            {rows &&
                rows.map(item => (
                    <div key={item.id} className={style.list}>
                        <img
                            className={style.img}
                            src='../public/Vector.svg'
                            alt='fileIcon'
                            onClick={handleCreateRow}
                        />
                        <Input
                            onDoubleClick={() => setDisableToggle(false)}
                            className={classNames(style.input, style.flexGrow)}
                            placeholder={item.rowName}
                            variant='filled'
                            onChange={handleChange}
                            onBlur={() => setDisableToggle(true)}
                        />
                        <Input
                            onDoubleClick={() => setDisableToggle(false)}
                            className={style.input}
                            readOnly={disableToggle}
                            placeholder={`${item.salary}`}
                            variant='filled'
                            onChange={handleChange}
                            onBlur={() => setDisableToggle(true)}
                        />
                        <Input
                            onDoubleClick={() => setDisableToggle(false)}
                            className={style.input}
                            readOnly={disableToggle}
                            placeholder={`${item.equipmentCosts}`}
                            variant='filled'
                            onChange={handleChange}
                            onBlur={() => setDisableToggle(true)}
                        />
                        <Input
                            onDoubleClick={() => setDisableToggle(false)}
                            className={style.input}
                            readOnly={disableToggle}
                            placeholder={`${item.overheads}`}
                            variant='filled'
                            onChange={handleChange}
                            onBlur={() => setDisableToggle(true)}
                        />{' '}
                        <Input
                            onDoubleClick={() => setDisableToggle(false)}
                            className={style.input}
                            readOnly={disableToggle}
                            placeholder={`${item.estimatedProfit}`}
                            variant='filled'
                            onChange={handleChange}
                            onBlur={() => setDisableToggle(true)}
                        />
                    </div>
                ))}{' '}
        </div>
    );
}

export default Rows;
