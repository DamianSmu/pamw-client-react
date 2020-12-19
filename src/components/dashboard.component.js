import React, { Component } from "react";
import parcelService from "../services/parcel.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import _ from 'lodash';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.handleFormParcel = this.handleFormParcel.bind(this);
        this.onChangeReceiver = this.onChangeReceiver.bind(this);
        this.onChangePostOffice = this.onChangePostOffice.bind(this);
        this.onChangeSize = this.onChangeSize.bind(this);

        this.state = {
            parcelList: "",
            receiver: "",
            postOffice: "",
            size: "",
        };
    }

    onChangeReceiver(e) {
        this.setState({
            receiver: e.target.value
        });
    }

    onChangePostOffice(e) {
        this.setState({
            postOffice: e.target.value
        });
    }

    onChangeSize(e) {
        this.setState({
            size: e.target.value
        });
    }

    handleFormParcel(e) {
        e.preventDefault();
        parcelService.addParcel(this.state.receiver, this.state.postOffice, this.state.size, this.state.status).then(response => {
            this.setState({
                receiver: "",
                postOffice: "",
                size: "",
            });
            this.getAllParcels();
        });
    }

    getAllParcels() {
        parcelService.getAll().then(response => {
            this.setState({
                parcelList: response._embedded.parcelList
            });
        });
    }

    componentDidMount() {
        this.getAllParcels();
    }

    deleteParcel(id) {
        parcelService.deleteParcel(id).then(r => {
            this.getAllParcels();
        });
    }

    renderParcel(id, receiver, postOffice, size, status) {
        if (!id) return <div />;

        var statusString = "";

        switch (status) {
            case 'IN_TRANSPORT':
                statusString = "W drodze"
                break;
            case 'DELIVERED':
                statusString = "Dostarczona"
                break;
            case 'PICKED_UP':
                statusString = "Odebrana"
                break;
            case 'CREATED':
                statusString = "Utworzona"
                break;
        }
        return (
            <div className="card card-outline-danger">
                <div className="card-header container-fluid">
                    <div className="row">
                        <div className="col-md-8">
                            <h5>Id: {id}</h5>
                        </div>
                        <div className="col">
                            {status == "CREATED" && (<button type="button" className="close" aria-label="Close" value={id} onClick={(e) => this.deleteParcel(id)} >
                                <span aria-hidden="true">&times;</span>
                            </button>)}
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <h6>Odbiorca: {receiver}</h6>
                    <h6>Skrytka: {postOffice}</h6>
                    <h6>Rozmiar: {size}</h6>
                    <h6>Status: {statusString}</h6>
                </div>
            </div>
        );
    };

    renderFormParcel() {
        return (
            <div className="card card-outline-danger">
                <div className="card-header container-fluid" />
                <div className="card-body">
                    <Form
                        onSubmit={this.handleFormParcel}
                        ref={c => {
                            this.form = c;
                        }}
                    >
                        <div className="form-group row">
                            <label htmlFor="odbiorca" className="col-sm-2 col-form-label">Odbiorca: </label>
                            <div className="col-sm-6">
                                <Input type="text" className="form-control" name="odbiorca" value={this.state.receiver}
                                    onChange={this.onChangeReceiver} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="skrytka" className="col-sm-2 col-form-label">Skrytka: </label>
                            <div className="col-sm-6">
                                <Input type="text" className="form-control" name="skrytka" value={this.state.postOffice}
                                    onChange={this.onChangePostOffice} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="rozmiar" className="col-sm-2 col-form-label">Rozmiar: </label>
                            <div className="col-sm-6">
                                <Input type="text" className="form-control" name="rozmiar" value={this.state.size}
                                    onChange={this.onChangeSize} />
                            </div>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-secondary btn-block">
                                <span>Dodaj</span>
                            </button>
                        </div>

                    </Form>
                </div>
            </div>
        );
    };

    renderParcels() {
        return _.map(this.state.parcelList, key => {
            return (
                <div key={key.id}>
                    {this.renderParcel(
                        key.id,
                        key.receiver,
                        key.postOffice,
                        key.size,
                        key.status
                    )}
                </div>
            );
        });
    }

    render() {
        return (
            <div className="container content">
                <h3>Twoje przesyłki:</h3>
                {this.renderParcels()}
                {this.renderFormParcel()}
            </div>

        )

    }
}
