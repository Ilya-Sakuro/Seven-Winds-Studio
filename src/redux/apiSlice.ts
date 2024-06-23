import { ENTITY_ID } from 'constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type CreateEntityResponse = {
    eID: string;
};
export type Row = {
    id: number;
    rowName: string;
    total: number;
    salary: number | string | undefined;
    mimExploitation: number;
    machineOperatorSalary: number;
    materials: number;
    mainCosts: number;
    supportCosts: number;
    equipmentCosts: number | string | undefined;
    overheads: number | string | undefined;
    estimatedProfit: number | string | undefined;
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
        createRow: builder.mutation<Row, Partial<Omit<Row, 'child'>>>({
            query: body => ({
                url: `/v1/outlay-rows/entity/${ENTITY_ID.id}/row/create`,
                method: 'POST',
                body,
            }),
        }),
        updateRow: builder.mutation<void, { rID: number; row: Partial<Row> }>({
            query: ({ rID, row }) => ({
                url: `/v1/outlay-rows/entity/${ENTITY_ID.id}/row/${rID}/update`,
                method: 'POST',
                body: row,
            }),
        }),

        getEntityRows: builder.query<Row[], void>({
            query: () => `/v1/outlay-rows/entity/${ENTITY_ID.id}/row/list`,
        }),
    }),
});

export const { useGetEntityRowsQuery, useCreateEntityMutation, useCreateRowMutation, useUpdateRowMutation } = apiSlice;
