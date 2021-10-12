import { Doughnut, Bar } from 'react-chartjs-2'

const ChartWidget = ({ data }) => {
	return (
		<div className="w-full px-2">
			<div className="shadow-sm mb-4">
				<div className="bg-white shadow-md md:shadow-lg">
					<p className="text-mono">{data.label}</p>
					<div className="bg-white shadow-md my-4 px-4 py-2">
						{data.type === 'doughnut' ? <Doughnut data={data.data} /> : <Bar data={data.data} />}
					</div>
				</div>
			</div>
		</div>
	)
}

export default ChartWidget
