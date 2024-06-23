import { ENTITY_ID } from 'constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type CreateEntityResponse = {
    eID: string;
};
export type Row = {
    id: number;
    rowName: string;
    total: number;
    salary: number;
    mimExploitation: number;
    machineOperatorSalary: number;
    materials: number;
    mainCosts: number;
    supportCosts: number;
    equipmentCosts: number;
    overheads: number;
    estimatedProfit: number;
    child: Row[];
};

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://185.244.172.108:8081' }),
    endpoints: builder => ({
        createEntity: builder.mutation<CreateEntityResponse, void>({
            query: () => ({
                url: '/v1/outlay-rows/entity/create',
                method: 'POST',
            }),
        }),
        createRow: builder.mutation<any, any>({
            query: body => ({
                url: `/v1/outlay-rows/entity/${ENTITY_ID.id}/row/create`,
                method: 'POST',
                body,
            }),
        }),
        getEntityRows: builder.query<Row[], void>({
            query: () => `/v1/outlay-rows/entity/${ENTITY_ID.id}/row/list`,
        }),
    }),
});

export const { useGetEntityRowsQuery, useCreateEntityMutation, useCreateRowMutation } = apiSlice;
