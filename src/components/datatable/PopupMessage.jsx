import React from 'react'
import { Dialog } from '@mui/material';
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import {
    TextField,
    Select,
    FormControl,
    InputLabel,
    MenuItem,
    Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    root: {
        // margin: theme.spacing(10),
        backgroundColor: "#326370",
        padding: theme.spacing(10),
    },
    line: {
        borderBottom: "1px solid white",
        margin: "10px 0",
    },
    title: {
        color: "white",
        direction: "rtl",
        marginBottom: theme.spacing(2),
    },
    inputField: {
        marginBottom: theme.spacing(2),
        backgroundColor: "white",
        direction: "rtl",
    },
    addButton: {
        backgroundColor: "#F40057",
        color: "white",
        marginTop: theme.spacing(4),
    },
    content:{
        width:'100%',
        // margin:'50px'
    }
    
}));


export const PopupMessage = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false)
    }
    const handleOpen = () => {
        setOpen(true)
    }

    return (
        <>
            <div 
                className="deleteButton"
                onClick={() => handleOpen()}
            >
                Update
            </div>

                <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    <div className={classes.content}>
                            <div className={classes.root}>
                                <h2 className={classes.title}>اضافة زبون</h2>
                                <div className={classes.line}></div>
                                <Formik
                                
                                    initialValues={{ username: "", salesperson: "" }}
                                    validate={(values) => {
                                        const errors = {};
                                        if (!values.username) {
                                            errors.username = "يرجى تعبئة اسم السمتخدم";
                                        }
                                        if (!values.salesperson) {
                                            errors.salesperson = "يرجى اختيار مسؤول المبيعات";
                                        }
                                        return errors;
                                    }}

                                >

                                    <Form >
                                        <Field
                                            name="username"
                                            as={TextField}
                                            label="اسم المستخدم"
                                            className={classes.inputField}
                                            variant="standard"
                                            fullWidth
                                        />
                                        <FormControl
                                            variant="standard"
                                            className={classes.inputField}
                                            fullWidth
                                        >
                                            <InputLabel id="salesperson-label">
                                                
                                                اختار مسؤول المبيعات
                                            </InputLabel>
                                            <Field
                                                name="salesperson"
                                                as={Select}
                                                labelId="salesperson-label"
                                                label="Salesperson"
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value="1">Salesperson 1</MenuItem>
                                                <MenuItem value="2">Salesperson 2</MenuItem>
                                                <MenuItem value="3">Salesperson 3</MenuItem>
                                            </Field>
                                        </FormControl>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            fullWidth
                                            className={classes.addButton}
                                        >
                                            اضافة
                                        </Button>
                                    </Form>

                                </Formik>
                            </div>
                            </div>
                </Dialog>
        </>
    )
}
