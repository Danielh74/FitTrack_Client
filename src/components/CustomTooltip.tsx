const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className='tooltip'>
                <p>{`${label}`}</p>
                <p >{`Weight: ${payload[0].value} kg`}</p>
            </div>
        );
    }

    return null;
};

export default CustomTooltip
