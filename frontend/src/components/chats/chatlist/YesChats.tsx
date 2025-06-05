type ChatListComponentProps = {
    name: string;
};

const YesChats = ({ name }: ChatListComponentProps) => {
    return (
        <div className="container">
            <p>{name}</p>
        </div>
    );
};

export default YesChats;
