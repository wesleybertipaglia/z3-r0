import React from "react";

type Props = {
    html: string;
};

const HtmlMessage: React.FC<Props> = React.memo(({ html }) => {
    return (
        <div dangerouslySetInnerHTML={{ __html: html }} />
    );
});

export default HtmlMessage;