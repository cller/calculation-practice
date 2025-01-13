import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { ARITHMETIC_OPERATORS, buildPractice, COMPARISON_OPERATORS, DEFAULT_PRACTICE_OPTIONS, PracticeItem, PracticeOptions } from "./practice";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { Grid2, IconButton, styled } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import PracticeSettingsInput, { PracticeSettingsInputProps } from "./PracticeSettingsInput";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const PracticeSetting = styled(IconButton)(({ theme }) => {
    return {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        '@media print': {
            display: 'none'
        }
    };
});

interface PracticeSettingsProps {
    onChange: (newItems: PracticeItem[]) => void
}
export default function PracticeSettings(props: PracticeSettingsProps) {

    const [openSettings, setOpenSettings] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const handleOpen = () => {
        setOpenSettings(true);
    }

    const handleClose = () => {
        setOpenSettings(false);
    }

    const schema = yup.object().shape({
        itemCount: yup.number().required().min(10).default(DEFAULT_PRACTICE_OPTIONS.itemCount),
        min: yup.number().required().min(0).default(DEFAULT_PRACTICE_OPTIONS.min),
        max: yup.number().required().default(DEFAULT_PRACTICE_OPTIONS.max).when('min', {
            is: '',
            then: (_schema) => _schema.min(yup.ref('min')),
            otherwise: (_schema) => _schema.min(0)
        }),
        arithmetics: yup.array(yup.string().oneOf(ARITHMETIC_OPERATORS).required()).required().min(1).max(2).default(DEFAULT_PRACTICE_OPTIONS.arithmetics).required(),
        comparisons: yup.array(yup.string().oneOf(COMPARISON_OPERATORS).required()).required().min(1).max(3).default(DEFAULT_PRACTICE_OPTIONS.comparisons).required(),
        skipRepeat: yup.boolean().default(DEFAULT_PRACTICE_OPTIONS.skipRepeat)
    }, [['min', 'max']]).required();

    const { handleSubmit, control, formState } = useForm<PracticeOptions>({
        defaultValues: DEFAULT_PRACTICE_OPTIONS,
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<PracticeOptions> = (data, event) => {
        event?.preventDefault();
        console.log(formState);
        setSubmitting(true);
        setTimeout(() => {
            props.onChange(buildPractice({ ...DEFAULT_PRACTICE_OPTIONS, ...data }));
            setSubmitting(false);
            handleClose();
        }, 1000);
    };

    const fields: PracticeSettingsInputProps[] = [
        { type: 'number', label: '题目数量', name: 'itemCount' },
        { type: 'number', label: '最小值', name: 'min' },
        { type: 'number', label: '最大值', name: 'max' },
        { type: 'checkbox', label: '算术运算符', name: 'arithmetics', options: ARITHMETIC_OPERATORS.map((item) => ({ label: item, value: item })) },
        { type: 'checkbox', label: '比较运算符', name: 'comparisons', options: COMPARISON_OPERATORS.map((item) => ({ label: item, value: item })) }
    ];

    return <>
        <Dialog open={openSettings} fullWidth={true} maxWidth={"sm"} PaperProps={{
            component: 'form',
            onSubmit: handleSubmit(onSubmit)
        }}>
            <DialogTitle>设置</DialogTitle>
            <DialogContent>
                <Grid2 container rowSpacing={2} columnSpacing={2}>
                    {fields.map((field, index) => {
                        return <Grid2 size={4} key={index}><PracticeSettingsInput  {...field} control={control} disabled={submitting} /></Grid2>
                    })}
                </Grid2>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>取消</Button>
                <Button type="submit" disabled={submitting} loading={submitting}>确认</Button>
            </DialogActions>
        </Dialog>
        <PracticeSetting aria-label="设置" onClick={handleOpen}>
            <SettingsIcon></SettingsIcon>
        </PracticeSetting>
    </>
}