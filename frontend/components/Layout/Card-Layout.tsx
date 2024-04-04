const CardLayout = (props: any) => {
    return (
        <>
            <div className="h-full">
                <div className="flex flex-col items-center justify-center h-full py-16 min-h-full">
                    <div className={`w-full ${props.large ? "max-w-4xl" : "max-w-lg"}`}>
                        <div className="bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-4 ">{props.children}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CardLayout;
