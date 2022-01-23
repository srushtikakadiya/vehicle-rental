import React, { Component } from 'react';
import Input from './common/Input';
import Joi from 'joi-browser';
class Form extends Component {
    inputBuilder = (label, name, type='text') => {
        return(
            <Input 
                label={label}
                name={name}
                type={type}
                value={this.state.data[name]}
                error={this.state.error[name]}
                handleChange={this.handleChange}
            />
        )
    }
    handleChange = (e) => {
        const {value, name} = e.currentTarget;

        let err = this.validate(value, name, this.schema);
        const error = {...this.state.error}
        error[name] = err;

        const data = {...this.state.data}
        data[name] = value;
        this.setState({
            data:data,
            error: error
        })
    }

    validate = (value, name, schema) => {
        const {error} = Joi.validate(value, schema[name]);
        if(error) return error.message;
            else return null;
    }
    
    submitDisabler = () => {
        let bool = false;
        const error = this.state.error;
        const data = this.state.data;
        for(let err in error) {
            if(error[err]) {
                bool = true;
            }
        }
        for(let item in data) {
            if(!data[item]) {
                bool = true;
            }
        }
        return bool;
    }
}
 
export default Form;