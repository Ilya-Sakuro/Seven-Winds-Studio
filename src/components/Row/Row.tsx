import { Input, InputRef } from 'antd';
import classNames from 'classnames';
import { useState, useRef } from 'react';
import { Row, useCreateRowMutation, useUpdateRowMutation } from 'redux/apiSlice';
import style from './row.module.scss';

type RowProp = Pick<Row, 'id' | 'rowName' | 'salary' | 'equipmentCosts' | 'overheads' | 'estimatedProfit'>;

function RowComponent({ id, rowName, salary, equipmentCosts, overheads, estimatedProfit }: RowProp) {
    const [createRow] = useCreateRowMutation();
    const [updateRow] = useUpdateRowMutation();
    const [disableToggle, setDisableToggle] = useState({
        rowName: true,
        salary: true,
        equipmentCosts: true,
        overheads: true,
        estimatedProfit: true,
    });
    const [values, setValues] = useState({
        rowName: rowName,
        salary: salary?.toString(),
        equipmentCosts: equipmentCosts?.toString(),
        overheads: overheads?.toString(),
        estimatedProfit: estimatedProfit?.toString(),
    });
    const inputRefs = {
        rowName: useRef<InputRef>(null),
        salary: useRef<InputRef>(null),
        equipmentCosts: useRef<InputRef>(null),
        overheads: useRef<InputRef>(null),
        estimatedProfit: useRef<InputRef>(null),
    };

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

    const handleDoubleClick = (key: keyof typeof inputRefs) => {
        setDisableToggle(prev => ({ ...prev, [key]: false }));
        setTimeout(() => {
            inputRefs[key].current?.focus();
        }, 0);
    };

    const handleBlur = async (key: keyof typeof inputRefs) => {
        setDisableToggle(prev => ({ ...prev, [key]: true }));
        try {
            await updateRow({
                rID: id,
                row: {
                    ...values,
                    rowName: values.rowName,
                    equipmentCosts: Number(values.equipmentCosts),
                    estimatedProfit: Number(values.estimatedProfit),
                    machineOperatorSalary: 0,
                    mainCosts: 0,
                    materials: 0,
                    mimExploitation: 0,
                    overheads: Number(values.overheads),
                    supportCosts: 0,
                },
            }).unwrap();
        } catch (err) {
            console.error('Failed to update row:', err);
        }
    };

    const handleChange = (key: keyof typeof values, value: string) => {
        setValues(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className={style.list}>
            <img className={style.img} src='../public/Vector.svg' alt='fileIcon' onClick={handleCreateRow} />
            <Input
                ref={inputRefs.rowName}
                onDoubleClick={() => handleDoubleClick('rowName')}
                className={classNames(style.input, style.flexGrow)}
                placeholder={rowName}
                value={values.rowName}
                onChange={e => handleChange('rowName', e.target.value)}
                onBlur={() => handleBlur('rowName')}
                readOnly={disableToggle.rowName}
            />
            <Input
                ref={inputRefs.salary}
                onDoubleClick={() => handleDoubleClick('salary')}
                className={style.input}
                placeholder={`${salary}`}
                value={values.salary}
                onChange={e => handleChange('salary', e.target.value)}
                onBlur={() => handleBlur('salary')}
                readOnly={disableToggle.salary}
            />
            <Input
                ref={inputRefs.equipmentCosts}
                onDoubleClick={() => handleDoubleClick('equipmentCosts')}
                className={style.input}
                placeholder={`${equipmentCosts}`}
                value={values.equipmentCosts}
                onChange={e => handleChange('equipmentCosts', e.target.value)}
                onBlur={() => handleBlur('equipmentCosts')}
                readOnly={disableToggle.equipmentCosts}
            />
            <Input
                ref={inputRefs.overheads}
                onDoubleClick={() => handleDoubleClick('overheads')}
                className={style.input}
                placeholder={`${overheads}`}
                value={values.overheads}
                onChange={e => handleChange('overheads', e.target.value)}
                onBlur={() => handleBlur('overheads')}
                readOnly={disableToggle.overheads}
            />
            <Input
                ref={inputRefs.estimatedProfit}
                onDoubleClick={() => handleDoubleClick('estimatedProfit')}
                className={style.input}
                placeholder={`${estimatedProfit}`}
                value={values.estimatedProfit}
                onChange={e => handleChange('estimatedProfit', e.target.value)}
                onBlur={() => handleBlur('estimatedProfit')}
                readOnly={disableToggle.estimatedProfit}
            />
        </div>
    );
}

export default RowComponent;
