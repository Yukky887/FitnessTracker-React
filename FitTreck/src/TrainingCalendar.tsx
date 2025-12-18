export function TrainingCalendar() {
    const weeks = 25;
    const days = 7;

    const cells = Array.from({ length: weeks * days }, (_, index) => index);

    return(
        <div
            className="training-calendar"
            style={{
                display: "grid",
                gridTemplateColumns: `repeat(${weeks}, 12px)`,
                gridTemplateRows: `repeat(${days}, 12px)`,
                gap: 4,
            }}
        >
            {cells.map((cell) => (
                <div
                    key={cell}
                    style={{
                        width: 12,
                        height: 12,
                        borderRadius: 2,
                        backgroundColor: "#202020",
                    }}
                />
            ))}
        </div>
    );
}