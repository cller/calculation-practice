import { styled, Typography, Grid2, Input, Fab } from "@mui/material";
import { buildPractice } from "./practice";
import PracticeItemView from "./PracticeItemView";
import PracticeSettings from "./PracticeSettings";
import { useState } from "react";

const PracticeOrder = styled(Typography)(() => {
    return {
        border: '1px solid skyblue',
        color: 'skyblue',
        borderRadius: '50%',
        padding: '2px'
    };
});

const PracticePrint = styled(Fab)(({ theme }) => {
    return {
        position: 'fixed',
        right: theme.spacing(1),
        bottom: theme.spacing(1),
        '@media print': {
            display: 'none'
        }
    }
});

const PracticeRoot = styled(Grid2)(({ theme }) => {
    return {
        width: theme.breakpoints.values.md,
        margin: theme.spacing(0, 'auto'),
        padding: '8px'
    };
});

const PracticeHeader = styled(Grid2)(({ theme }) => {
    return {
        marginBottom: theme.spacing(2)
    }
});

export default function PracticePaper() {
    const [practice, setPractice] = useState(buildPractice());

    const items = practice.map((item, index) => {
        return <Grid2 size={3} container key={index} rowSpacing={1} columnSpacing={1} sx={{
            alignContent: 'space-between',
            alignItems: 'center'
        }} >
            <Grid2><PracticeOrder variant="caption">{index + 1}</PracticeOrder></Grid2>
            <Grid2 size="grow">
                <PracticeItemView value={item} loss={3}></PracticeItemView>
            </Grid2>
        </Grid2>
    });

    return <PracticeRoot rowSpacing={2} columnSpacing={1} container>
        <PracticeSettings onChange={setPractice} />
        <PracticePrint onClick={() => window.print()}><Typography>打印</Typography></PracticePrint>
        <PracticeHeader container spacing={2} size={12} sx={{ alignContent: 'space-around' }} >
            <Grid2 size={'auto'}><Typography>日期</Typography></Grid2>
            <Grid2 size={'grow'}><Input fullWidth></Input></Grid2>
            <Grid2 size={'auto'}><Typography>名字</Typography></Grid2>
            <Grid2 size={'grow'}><Input fullWidth></Input></Grid2>
            <Grid2 size={'auto'}><Typography>用时</Typography></Grid2>
            <Grid2 size={'grow'}><Input fullWidth></Input></Grid2>
        </PracticeHeader>
        <Grid2 container rowSpacing={2} columnSpacing={2} sx={{
            alignContent: 'space-around'
        }}>{items}</Grid2>
    </PracticeRoot>
}