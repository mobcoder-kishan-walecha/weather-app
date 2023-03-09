const PlusButton = (props: any) => {
    return (
        <svg onClick={props.handlePlus} xmlns="" width="16" height="16" fill="" className="bi bi-plus" viewBox="0 0 16 16" style={{ backgroundColor: "gray", marginTop: "10px", cursor:'pointer' }}>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
        </svg >
    )
}

export default PlusButton