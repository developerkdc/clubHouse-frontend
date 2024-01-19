import React from 'react';
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import {Pagination, Stack} from "@mui/material";
// import code from "../Paginations/demo-code/basic-pagination.txt";

const BasicPagination = () => {
    return (
        <JumboDemoCard title={"Simple Pagination"}
                       wrapperSx={{backgroundColor: 'background.paper', pt: 1}}>
            <Stack spacing={2}>
                <Pagination count={10}/>
            </Stack>
        </JumboDemoCard>
    );
};

export default BasicPagination;
