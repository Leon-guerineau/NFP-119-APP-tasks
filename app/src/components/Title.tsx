import React, {FC} from "react";

interface PropTitle {
    title : string;
    subtitle : string;
}

const Title : FC<PropTitle> = ({title, subtitle}) => {
    return (
        <div>
            <h1>{title}</h1>
            <h2>{subtitle}</h2>
        </div>
    )
}

export default Title;