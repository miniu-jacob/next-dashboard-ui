'use client';
import Image from 'next/image';

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const data = [
    {
        name: 'Jan',
        income: 4000,
        expense: 2400,
    },
    {
        name: 'Feb',
        income: 3000,
        expense: 1398,
    },
    {
        name: 'Mar',
        income: 2000,
        expense: 9800,
    },
    {
        name: 'Apr',
        income: 2780,
        expense: 3908,
    },
    {
        name: 'May',
        income: 1890,
        expense: 4800,
    },
    {
        name: 'Jun',
        income: 2390,
        expense: 3800,
    },
    {
        name: 'Jul',
        income: 3490,
        expense: 4300,
    },
    {
        name: 'Aug',
        income: 3490,
        expense: 4300,
    },
    {
        name: 'Sep',
        income: 4110,
        expense: 5430,
    },
    {
        name: 'Oct',
        income: 5480,
        expense: 2890,
    },
    {
        name: 'Nov',
        income: 3980,
        expense: 5600,
    },
    {
        name: 'Dec',
        income: 5200,
        expense: 2350,
    },
];

const FinanceChart = () => {
    return (
        <div className='bg-white rounded-lg p-4 h-full'>
            <div className='flex justify-between items-center '>
                <h1 className='text-lg font-semibold'>Finance</h1>
                <Image
                    src='/moreDark.png'
                    alt=''
                    width={20}
                    height={20}
                ></Image>
            </div>
            <ResponsiveContainer width='100%' height='90%'>
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                >
                    <CartesianGrid strokeDasharray='3 3' stroke='#ddd' />
                    <XAxis
                        dataKey='name'
                        axisLine={false}
                        tick={{ fill: '#d1d5db' }}
                        tickLine={false}
                        tickMargin={10}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#d1d5db' }}
                        tickMargin={10}
                    />
                    <Tooltip />
                    <Legend
                        align='center'
                        verticalAlign='top'
                        wrapperStyle={{
                            paddingTop: '10px',
                            paddingBottom: '30px',
                        }}

                    />
                    <Line
                        type='monotone'
                        dataKey='income'
                        stroke='#C3EBFA'
                        strokeWidth={5}
                    />
                    <Line type='monotone' dataKey='expense' stroke='#CFCEFF' strokeWidth={5} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default FinanceChart;
