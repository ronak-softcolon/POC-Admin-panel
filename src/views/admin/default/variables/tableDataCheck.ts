type RowObj = {
	name1: [string, boolean];
	progress: string;
	quantity: number;
	date: string;
	info: boolean;
};

const tableDataCheck: RowObj[] = [
	{
		name1: [ 'Horizon UI PRO', true ],
		quantity: 2458,
		progress: '17.5%',
		date: '12 Jan 2021',
		info: true
	},
	{
		name1: [ 'Horizon UI Free', true ],
		quantity: 1485,
		progress: '10.8%',
		date: '21 Feb 2021',
		info: true
	},
	{
		name1: [ 'Weekly Update', true ],
		quantity: 1024,
		progress: '21.3%',
		date: '13 Mar 2021',
		info: true
	},
	{
		name1: [ 'Venus 3D Asset', true ],
		quantity: 858,
		progress: '31.5%',
		date: '24 Jan 2021',
		info: true
	},
	{
		name1: [ 'Marketplace', true ],
		quantity: 258,
		progress: '12.2%',
		date: '24 Oct 2022',
		info: true
	}
];

export default tableDataCheck;
