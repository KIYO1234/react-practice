
import React from 'react';
import {connect} from 'react-redux'
import {change} from '../actions'


class Change extends React.Component {
    render(){
        return(
            <React.Component>
                <div>現在の値は{this.props.val}です</div>
                <button onClick={this.props.change}>変更</button>
            </React.Component>
        )
    }
}

const mapStateToProps = state => ({
  val: state.change.val
})
const mapDispatchToProps = dispatch => ({
  change:()=>dispatch(change()),
})

// export default App;
export default connect(mapStateToProps, mapDispatchToProps)(Change);