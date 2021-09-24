const CompactWidget = ({data}) => {
    let style = 'text-green-500'
    if (data.change === 0) {
        style = 'text-red-500'
    }

    return (
        <div class="w-full md:w-1/3 lg:w-2/3 px-2">
                <div class="rounded-lg shadow-sm mb-4">
                    <div class="rounded-lg bg-white shadow-md md:shadow-lg relative overflow-hidden">
                        <div class="px-3 pt-8 pb-10 text-center relative z-10">
                            <h4 class="text-sm uppercase text-gray-500 leading-tight">{data.label}</h4>
                            <h3 class="text-3xl text-gray-700 font-semibold leading-tight my-3">{data.value}</h3>
                            <p class={`text-xs ${style} leading-tight`}>{data.percent}</p>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default CompactWidget