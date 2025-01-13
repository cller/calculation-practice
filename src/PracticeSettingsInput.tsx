import { FC } from "react";
import { useController, UseControllerProps } from "react-hook-form";
import { PracticeOptions } from "./practice";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { FormControl, FormControlLabel, FormGroup, FormLabel } from "@mui/material";

export type PracticeSettingsInputProps = UseControllerProps<PracticeOptions> & { label: string } & ({
    type: 'checkbox',
    options: { label: string, value: unknown }[]
} | {
    type: 'number',
});
const PracticeSettingsInput: FC<PracticeSettingsInputProps> = (props) => {
    const { type } = props;
    const { field, fieldState } = useController(props);
    let control = <TextField {...field} />;

    if (type === 'checkbox') {
        control = <FormControl>
            <FormLabel>{props.label}</FormLabel>
            <FormGroup>
                {props.options.map((option) => {
                    const value = field.value as unknown[] ?? new Array<unknown>();
                    const checked = value.includes(option.value);
                    return <FormControlLabel key={option.label} control={<Checkbox checked={checked} onChange={(e) => {
                        if (e.target.checked) {
                            field.onChange([...value, option.value]);
                        } else {
                            field.onChange(value.filter((x: unknown) => x !== option.value));
                        }
                    }} />} label={option.label} />
                })}
            </FormGroup >
        </FormControl>;
    } else if (type === 'number') {
        control = <FormControl><TextField type="number" variant="filled" error={fieldState.invalid} {...field} label={props.label} helperText={fieldState.error?.message} /></FormControl>;
    }

    return control;
};

export default PracticeSettingsInput;