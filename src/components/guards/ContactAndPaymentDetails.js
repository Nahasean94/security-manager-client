import React, {Component} from 'react'
import PropTypes from 'prop-types'
import TextFieldGroup from "../../shared/TextFieldsGroup"
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap"
import validator from 'validator'
import {isEmpty} from 'lodash'

class PersonalDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            cellphone: '',
            postal_address: '',
            errors: {},
            isLoading: false,
            invalid: false

        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

    }

    validateInput(data) {
        let errors = {}

        if (validator.isEmpty(data.postal_address)) {
            errors.postal_address = 'This field is required'
        }
        if (validator.isEmpty(data.cellphone)) {
            errors.last_name = 'This field is required'
        }
        return {
            errors,
            isValid: isEmpty(errors)
        }
    }

    isValid() {
        const {errors, isValid} = this.validateInput(this.state)
        if (!isValid) {
            this.setState({errors})
        }
        return isValid
    }

    onSubmit(e) {
        e.preventDefault()
        if (this.isValid() || !this.state.invalid) {
            this.setState({errors: {}, isLoading: true})
            this.props.registerGuard(this.state).then(
                (teacher) => {
                    this.props.onClose()
                    this.props.addGuard(teacher.data)
                    this.setState({
                        email: '',
                        cellphone: '',
                        postal_address: '',
                        errors: {},
                        isLoading: false,
                        invalid: false
                    })
                },
                err => this.setState({errors: err.response.data, isLoading: false})
            )
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        const {show, onClose} = this.props

        const {errors, isLoading, invalid, email, cellphone, postal_address,} = this.state
        const err = () => {
            for (let prop in errors) {
                if (errors.hasOwnProperty(prop)) {
                    return (<div className="alert alert-danger" role="alert">
                        {errors[prop]}
                    </div>)
                }
            }
        }
        if (show) {
            return (
                <Modal isOpen={show} toggle={onClose} size="lg">
                    <ModalHeader toggle={onClose}>Personal details</ModalHeader>
                    <ModalBody>
                        <TextFieldGroup
                            label="Email"
                            type="text"
                            name="email"
                            value={email}
                            onChange={this.onChange}
                            error={errors.email}
                            disabled={true}
                        />
                        <form onSubmit={this.onSubmit}>
                            <TextFieldGroup
                                label="Phone number"
                                type="number"
                                name="cellphone"
                                value={cellphone}
                                onChange={this.onChange}
                                error={errors.cellphone}
                                disabled={true}
                            />
                            <TextFieldGroup
                                label="Postal address"
                                type="text"
                                name="postal_address"
                                value={postal_address}
                                onChange={this.onChange}
                                error={errors.postal_address}
                                disabled={true}
                            />
                            <div className="form-group row">
                                <div className="col-sm-4 offset-sm-2">
                                    <button disabled={isLoading || invalid} className="btn btn-secondary btn-sm form-control" >Back
                                    </button>
                                </div>
                                <div className="col-sm-4">
                                    <button disabled={isLoading || invalid} className="btn btn-dark btn-sm form-control"
                                            onClick={this.props.showPaymentDetailsModal}>Next
                                    </button>
                                </div>
                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={onClose}>Cancel</Button>{' '}
                    </ModalFooter>
                </Modal>
            )
        }
        else return null
    }

}


PersonalDetails.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    showPaymentDetailsModal: PropTypes.func.isRequired,
    closePaymentDetailsModal: PropTypes.func.isRequired,

}
PersonalDetails.contextTypes = {
    router: PropTypes.object.isRequired

}

export default PersonalDetails