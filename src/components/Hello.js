

class Hello extends React.Component {
    render(){
        return(
            <React.Fragment>
                <h2>{this.props.val}</h2>
                <button onClick={this.props.change}>変更</button>
            </React.Fragment>
        )
    }
}