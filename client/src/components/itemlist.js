import React, { Component } from "react";
import "path";

export default class ItemList extends React.Component {
	render() {
		return <div>{this.props.text}</div>;
	}
}
