import { Grid2, Input, InputProps, styled, Typography } from "@mui/material";
import { PracticeItem } from "./practice";
import { } from '@mui/material/styles';
interface PracticeItemViewProps {
    value: PracticeItem;
    loss: number;
}
type LossProps = InputProps & {
    position: number;
};

const Loss = styled(Input)<LossProps>(({ position }) => {
    return position === 3
        ? {
            ['&::before,&::after']: {
                border: '1px solid',
                borderRadius: '50%',
                textAlign: 'center',
                top: '0'
            },

            ['input']: {
                textAlign: 'center',
            }
        }
        : {};
});

export default function PracticeItemView({ value, loss }: PracticeItemViewProps) {
    return <Grid2 container sx={{
        alignContent: 'space-around',
        alignItems: 'center'
    }}>{
            value.map((item, index) => {
                const control = index === loss ? <Loss position={index} /> : <Typography style={{ textAlign: 'center' }}>{item}</Typography>;
                const style = [1, 3].includes(index) ? { maxWidth: '32px', width: '32px' } : {};
                return <Grid2 key={index} size={'grow'} container sx={{
                    justifyContent: 'center',
                    ...style
                }}  >{control}</Grid2>;
            })
        }
    </Grid2>
}